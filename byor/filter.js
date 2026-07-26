// "Bring Your Own Route" picker logic (BC-371).
//
// Between the engine (what is near the route) and the writer (what the file looks like)
// sits the question this file answers: which of those stops does the rider actually want?
// Without it the tool hands back everything it found, which is 400 waypoints for a ride
// across North Vancouver and 5,026 for the Trans Canada Trail. Nobody loads that onto a
// head unit.
//
// Decision (Heather, 2026-07-25): nothing is gated except by what the rider picks. There
// is no opinionated default set, no built-in "sensible" categories, no tier shortcut. The
// page opens with nothing selected and a count of zero. Every stop in poi.geojson is
// reachable through some combination of checkboxes.
//
// Like engine.js and gpx_out.js: a plain ES module with no dependencies and no DOM, so the
// same code runs under Node for verify_filter.mjs and in the browser for the real page.

// --- what is on offer ----------------------------------------------------------------
//
// Transport is dropped entirely. poi.geojson carries 6 transport stops, not the 202 in
// wwc_data.json, because 196 of them are taxis, flights, rail and car-share listings that
// have no map point and so never enter the file. Three ferries, two shuttles and one bus
// stop is not a category; giving it a row would spend interface on nothing.

export const EXCLUDED_CATEGORIES = ['Transport'];

// The single match the page runs, in metres. Every narrower radius the rider picks is served
// by filtering that one result rather than matching again — see radius handling below.
export const MATCH_RADIUS_M = 5000;

export const RADIUS_CHOICES_M = [250, 500, 1000, 2000, 5000];

export const TIERS = ['accredited', 'welcoming', 'info'];

// Stops with no subcategory (32 of them, all under Attractions) still need to be selectable,
// so they get a row of their own rather than being quietly unreachable.
export const NO_SUBCATEGORY = -1;
export const NO_SUBCATEGORY_LABEL = '(unspecified)';

// A selection key names a subcategory within its category. Every subcategory in the current
// data belongs to exactly one category, so the category half is redundant today — but it
// costs one character and it means a future subcategory shared between two categories can't
// silently make both rows toggle together.
export function subKey(catIdx, subIdx) {
  return catIdx + ':' + (subIdx === undefined ? NO_SUBCATEGORY : subIdx);
}

function excludedCatIdx(poi) {
  const out = new Set();
  (poi.cats || []).forEach((name, i) => {
    if (EXCLUDED_CATEGORIES.includes(name)) out.add(i);
  });
  return out;
}

// Every category and subcategory the picker offers, with the total number of stops behind
// each one across all of BC. This is what the page can show before anyone has uploaded
// anything, and it fixes the row order: categories by size, subcategories by size within
// them, so the big decisions sit at the top of the list.
export function facets(poi) {
  const skip = excludedCatIdx(poi);
  const cats = new Map();
  for (const f of poi.features) {
    const p = f.properties;
    if (skip.has(p.c)) continue;
    let cat = cats.get(p.c);
    if (!cat) cats.set(p.c, (cat = { idx: p.c, name: poi.cats[p.c], count: 0, subs: new Map() }));
    cat.count++;
    const s = p.s === undefined ? NO_SUBCATEGORY : p.s;
    let sub = cat.subs.get(s);
    if (!sub) {
      cat.subs.set(s, (sub = {
        idx: s,
        key: subKey(p.c, s),
        name: s === NO_SUBCATEGORY ? NO_SUBCATEGORY_LABEL : poi.subcats[s],
        count: 0,
      }));
    }
    sub.count++;
  }
  const out = [...cats.values()].sort((a, b) => b.count - a.count);
  for (const c of out) c.subs = [...c.subs.values()].sort((a, b) => b.count - a.count);
  return out;
}

// Every selection key the picker offers, which is what a "select all" control needs.
export function allSubKeys(poi) {
  const out = [];
  for (const c of facets(poi)) for (const s of c.subs) out.push(s.key);
  return out;
}

export function emptySelection() {
  return {
    subs: new Set(),        // subKey strings
    tiers: new Set(),       // tier names
    radiusM: 1000,
    excluded: new Set(),    // stop keys the rider unchecked one at a time
    cap: 200,
  };
}

// --- narrowing the matches ------------------------------------------------------------
//
// The page matches once at MATCH_RADIUS_M and then filters that one result by distance,
// rather than rebuilding the grid and rematching every time the rider changes the radius.
//
// This is exact, not an approximation, and it is worth saying why. Thinning depends only on
// the interval, never on the radius, so every radius sees the same track points. match()
// records each stop's closest approach to those points. So a stop is within r of the track
// exactly when its recorded distance is <= r, and the wide result filtered to r is the same
// set a match at r would return. verify_filter.mjs asserts this on the Trans Canada Trail
// fixture: 5,026 stops both ways at 1 km, 7,382 at 3 km, identical keys, zero difference in
// every distance.
//
// What it buys: the widest match on the longest fixture on disk is paid once. Measured in
// Chrome on the 12.5 MB open TCT track — 247,763 points, thinned to 24,043, 8,691 stops
// within 5 km — parse 248 ms, thin 19 ms, grid 6 ms, match 356 ms. (Node reports 273 ms for
// the same match; the first match of a session runs several times slower than that while the
// JIT warms up, so the honest figure for a rider's first upload is the higher one.)
//
// After that every radius button is a filter over an array already in hand. Rematching would
// pay the 356 ms on every click instead.
//
// The other end of the scale, also measured in Chrome on that fixture: with no cap and every
// box ticked, the picker lists all 8,685 stops, and a checkbox click costs about 230 ms —
// nearly all of it building that many rows, since a per-item uncheck, which does not relist,
// costs 36 ms. Sluggish rather than broken, and only reachable by turning the cap off.

function catOf(entry) {
  return entry.f.properties.c;
}

function keyOf(entry) {
  const p = entry.f.properties;
  return subKey(p.c, p.s);
}

// Entries in radius, in a chosen subcategory, in a chosen tier — before per-item unchecks
// and before the cap. Excluded categories can never pass, whatever is in the selection.
//
// The two dimensions deliberately treat "nothing ticked" differently, following the rule as
// Heather put it: limited to the categories and subcategories the rider picks, "and tiers if
// they pick those". So no subcategory ticked means an empty file — that is the page having no
// opinion — while no tier ticked means the tier filter is simply off.
//
// The asymmetry is also what stops a dead end that showed up on the first run in a browser:
// tick Café and Ice Cream, tick no tier, and the file is empty while the radius button above
// still reads 40. Three empty boxes that quietly mean "all" is the ordinary faceted-search
// convention, and it is the only reading under which every stop stays reachable without the
// rider having to learn that tier is mandatory.
export function applySelection(entries, poi, sel) {
  const skip = excludedCatIdx(poi);
  const anyTier = sel.tiers.size === 0;
  return entries.filter((e) => !skip.has(catOf(e))
    && e.distM <= sel.radiusM
    && sel.subs.has(keyOf(e))
    && (anyTier || sel.tiers.has(e.f.properties.t)));
}

export function applyExclusions(entries, sel) {
  if (!sel.excluded.size) return entries;
  return entries.filter((e) => !sel.excluded.has(e.f.properties.k));
}

// --- counts next to the checkboxes ----------------------------------------------------
//
// The number beside a row is how many stops that row would add given everything else the
// rider has chosen, which means it does not collapse to zero the moment they uncheck the row
// itself. So a subcategory count respects the radius and the tier boxes but not the
// subcategory boxes, and a tier count respects the radius and the subcategory boxes but not
// the tier boxes. That is ordinary faceted-search behaviour and it is what makes the numbers
// answer "what happens if I turn this on".
//
// Per-item unchecks are deliberately left out. They are an override on individual stops, not
// a filter, and folding them in would make a category count drift away from the number of
// rows visible under it.
//
// An empty dimension counts as unconstrained HERE and nowhere else, and the asymmetry is
// deliberate. For filtering, nothing ticked means nothing selected — that is the whole point
// of a page that opens with no opinion. But for counting it would mean every number on screen
// reads zero before the first click, which is precisely when the rider most needs to know
// what is out there. Seen in the browser and it looks broken. So the numbers answer "what is
// near your route" until a choice narrows them, while the file stays empty until one is made.

function effective(sel, poi) {
  return {
    subs: sel.subs.size ? sel.subs : new Set(allSubKeys(poi)),
    tiers: sel.tiers.size ? sel.tiers : new Set(TIERS),
  };
}

export function tally(entries, poi, sel) {
  const skip = excludedCatIdx(poi);
  const on = effective(sel, poi);
  const subs = new Map();
  const tiers = new Map();
  const cats = new Map();
  for (const e of entries) {
    const p = e.f.properties;
    if (skip.has(p.c) || e.distM > sel.radiusM) continue;
    const k = keyOf(e);
    if (on.tiers.has(p.t)) {
      subs.set(k, (subs.get(k) || 0) + 1);
      cats.set(p.c, (cats.get(p.c) || 0) + 1);
    }
    if (on.subs.has(k)) tiers.set(p.t, (tiers.get(p.t) || 0) + 1);
  }
  return { subs, cats, tiers };
}

// How many stops each radius button would reach, for the same reason: the rider can see what
// widening costs before they widen it. Respects the subcategory and tier choices.
export function radiusTally(entries, poi, sel) {
  const skip = excludedCatIdx(poi);
  const on = effective(sel, poi);
  const out = new Map(RADIUS_CHOICES_M.map((r) => [r, 0]));
  for (const e of entries) {
    const p = e.f.properties;
    if (skip.has(p.c) || !on.subs.has(keyOf(e)) || !on.tiers.has(p.t)) continue;
    for (const r of RADIUS_CHOICES_M) if (e.distM <= r) out.set(r, out.get(r) + 1);
  }
  return out;
}

// --- the cap --------------------------------------------------------------------------
//
// A hard limit, because a head unit that chokes on the file is a worse outcome than a file
// with fewer stops in it, and because a thousand-waypoint map is unreadable anyway.
//
// The rider sets the number. That keeps it consistent with the rest of the picker — nothing
// here is gated except by their own choices — and the number that suits a Garmin Edge is not
// the number that suits a phone.
//
// Entries arrive sorted nearest-to-the-track, so the cap keeps the closest. On a long route
// that clusters: the nearest 200 stops on a 500 km trail can all sit in the one town the
// track happens to thread through, and the rest of the province gets nothing. Spreading them
// along the route instead was considered and not built, because it would have the tool
// quietly deciding which stops matter, which is exactly what the honest message below exists
// to avoid. Narrowing the categories is the rider's lever, and the message says so.
//
// No backfill. Unchecking a stop while the cap is biting does not pull another up from below
// the line: "193 of 200" is predictable, and a list that reshuffles under the cursor is not.
// That is entirely a matter of ordering — the cap is applied before the rider's individual
// unchecks, so an unchecked stop spends its slot rather than freeing it. Doing it the other
// way round reads as harmless and isn't: verify_filter.mjs caught exactly that, where
// unchecking three stops silently pulled three unfamiliar ones in from below the cut.

export function applyCap(entries, cap) {
  if (!cap || entries.length <= cap) return { kept: entries, dropped: 0 };
  return { kept: entries.slice(0, cap), dropped: entries.length - cap };
}

// Says what the cap did, not how many waypoints end up in the file. Those are different
// numbers the moment the rider unchecks anything — cap 25 with three unchecked writes 22 —
// and this message claiming to hold 25 while the summary beside it says 22 is exactly the
// dishonesty the cap message exists to avoid. The file count belongs to the summary; the cap
// owns matched, kept and dropped, none of which unchecking changes.
export function capMessage(matched, cap, dropped) {
  if (!dropped) return '';
  return `${matched.toLocaleString()} stops match what you've picked. The cap keeps the `
    + `${cap.toLocaleString()} closest to your route and leaves ${dropped.toLocaleString()} `
    + `out. Turn off a category, or choose a smaller distance, to decide which ones stay.`;
}

// --- everything, in the order it happens ----------------------------------------------
//
// One call per change to the picker, cheap enough to run on every checkbox click: the widest
// match is already in hand, and this is three passes over it.

export function pick(entries, poi, sel) {
  const selected = applySelection(entries, poi, sel);
  const { kept, dropped } = applyCap(selected, sel.cap);
  const final = applyExclusions(kept, sel);
  return {
    entries: final,
    // What the rider sees listed, which is the capped set *before* their unchecks. An
    // unchecked stop has to stay on screen, greyed, or there is no way to change your mind
    // about it.
    listed: kept,
    matched: selected.length,
    unchecked: kept.length - final.length,
    dropped,
    message: capMessage(selected.length, sel.cap, dropped),
  };
}
