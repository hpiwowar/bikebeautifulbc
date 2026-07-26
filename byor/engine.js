// "Bring Your Own Route" matching engine (BC-369).
//
// A rider hands us a GPX. We find the We Welcome Cyclists stops near it. All of this
// runs in the rider's browser against the already-public /wwc/poi.geojson, so their
// track never leaves their laptop.
//
// This file is a plain ES module with no dependencies, which means the exact same code
// runs under Node for the test harness and in the browser for the real page. The timings
// the harness reports are therefore the timings the page will see.
//
// Four steps: parse -> thin -> index -> match.

const DEG2RAD = Math.PI / 180;
const M_PER_DEG_LAT = 111320;      // close enough; the error is under a metre at 500 m

// --- distance ------------------------------------------------------------------------
//
// Straight-line metres between two lat/lon pairs, using the local scale factor at that
// latitude rather than one factor for the whole track. BC runs from 48°N to 60°N, where a
// longitude degree shrinks from 0.67 to 0.50 of a latitude degree, so a track-wide factor
// would be wrong by up to 2x at the ends.
//
// Measured against true geodesic distance at 500 m in eight places across BC and three
// bearings each, the worst error is 1.24 m. BC Albers (EPSG:3005), which the server-side
// code in bespoke/backbone/pois.py uses, comes in at 1.35 m over the same test: it is an
// equal-area projection, so it trades distance fidelity for area fidelity. No projection
// library is worth carrying here.

export function metresBetween(aLat, aLon, bLat, bLon) {
  const midLat = (aLat + bLat) * 0.5 * DEG2RAD;
  const dy = (bLat - aLat) * M_PER_DEG_LAT;
  const dx = (bLon - aLon) * M_PER_DEG_LAT * Math.cos(midLat);
  return Math.sqrt(dx * dx + dy * dy);
}

// --- 1. parse ------------------------------------------------------------------------
//
// Deliberately a linear scan over the raw text, not DOMParser. The longest fixture on
// disk (the open TCT track) holds 247,763 points in 12.5 MB; DOMParser would build a
// quarter-million element nodes for it, which costs more than everything else here put
// together. A scan also runs unchanged under Node, so the harness needs no DOM shim.
//
// Nesting is irrelevant to us, so multi-track and multi-segment files fall out for free.
// Attribute order varies between producers, so lat and lon are pulled independently.
// Namespace prefixes (<gpx:trkpt>) are tolerated.

const PT_RE = /<(?:[A-Za-z_][\w.-]*:)?(trkpt|rtept)\b([^>]*)>/g;
const LAT_RE = /\blat\s*=\s*["']([^"']+)["']/;
const LON_RE = /\blon\s*=\s*["']([^"']+)["']/;

export function parseGpx(text) {
  const lats = [];
  const lons = [];
  let trkpts = 0;
  let rtepts = 0;
  let m;
  PT_RE.lastIndex = 0;
  while ((m = PT_RE.exec(text)) !== null) {
    const attrs = m[2];
    const la = LAT_RE.exec(attrs);
    const lo = LON_RE.exec(attrs);
    if (!la || !lo) continue;
    const lat = parseFloat(la[1]);
    const lon = parseFloat(lo[1]);
    if (!isFinite(lat) || !isFinite(lon)) continue;
    lats.push(lat);
    lons.push(lon);
    if (m[1] === 'trkpt') trkpts++; else rtepts++;
  }
  return {
    lats, lons,
    trkpts, rtepts,
    tracks: countTag(text, 'trk'),
    segments: countTag(text, 'trkseg'),
    routes: countTag(text, 'rte'),
  };
}

function countTag(text, tag) {
  const re = new RegExp('<(?:[A-Za-z_][\\w.-]*:)?' + tag + '(?=[\\s>/])', 'g');
  let n = 0;
  while (re.exec(text) !== null) n++;
  return n;
}

// --- 2. thin -------------------------------------------------------------------------
//
// Keep roughly one point every `intervalM` metres of along-track distance, rather than
// every Nth point: recorded density varies enormously between files (1,007 points for the
// Spirit Trail against 247,763 for the TCT), so a fixed stride would over-thin one and
// barely touch the other. First and last points are always kept.
//
// THINNING LOSES STOPS, and it is worth being exact about how. A stop sitting between two
// kept samples is further from both than it is from the line, so it can fall outside the
// radius and be missed. If kept samples were always `intervalM` apart the loss would be
// confined to stops beyond sqrt(radius^2 - (intervalM/2)^2) — 489.9 m at 100 m spacing and
// a 500 m radius.
//
// But that bound does not hold, and measurement is what showed it: thinning cannot place
// samples closer together than the raw track already does. Where a recorded track is
// sparse, or jumps between segments (the open TCT fixture has 629 of them), the real gap
// between kept samples is the raw gap, which can be kilometres. So misses turn up well
// inside the theoretical band — 414 m on that fixture.
//
// Measured loss against matching the raw track, over four fixtures (thinning_cost.mjs):
//
//   interval    worst loss    match time, worst fixture, Chrome
//   200 m       3.49%         109 ms
//   100 m       0.97%         204 ms      <- default
//   none        0             1,550 ms
//
// 100 m is the pick: it cuts the loss to about a third of what 200 m costs, and the extra
// 95 ms is invisible next to the ~1 s the same file spends being parsed. Matching the raw
// track is exact and still tolerable, if exactness ever matters more than the second.

export function thin(lats, lons, intervalM = 100) {
  const n = lats.length;
  if (n === 0) return { lats: [], lons: [] };
  const outLat = [lats[0]];
  const outLon = [lons[0]];
  let acc = 0;
  for (let i = 1; i < n; i++) {
    acc += metresBetween(lats[i - 1], lons[i - 1], lats[i], lons[i]);
    if (acc >= intervalM) {
      outLat.push(lats[i]);
      outLon.push(lons[i]);
      acc = 0;
    }
  }
  if (n > 1 && (outLat[outLat.length - 1] !== lats[n - 1] || outLon[outLon.length - 1] !== lons[n - 1])) {
    outLat.push(lats[n - 1]);
    outLon.push(lons[n - 1]);
  }
  return { lats: outLat, lons: outLon };
}

// --- 3. index ------------------------------------------------------------------------
//
// Bucket the 18k stops into a coarse lat/lon grid once, so each track point only has to be
// compared against the stops in its own cell and the eight around it.
//
// Cell height is the radius in latitude degrees. Cell width is sized using the cosine of
// the highest latitude in the data, which makes every cell at least `radiusM` wide in
// metres everywhere else (cells get physically wider as you go south, which is harmless).
// That is what guarantees the 3x3 neighbourhood really covers the radius.

export function buildIndex(features, radiusM = 500) {
  let maxAbsLat = 0;
  for (const f of features) {
    const a = Math.abs(f.geometry.coordinates[1]);
    if (a > maxAbsLat) maxAbsLat = a;
  }
  const cellLat = radiusM / M_PER_DEG_LAT;
  const cellLon = radiusM / (M_PER_DEG_LAT * Math.max(Math.cos(maxAbsLat * DEG2RAD), 0.01));

  const cells = new Map();
  for (const f of features) {
    const lon = f.geometry.coordinates[0];
    const lat = f.geometry.coordinates[1];
    const key = Math.floor(lat / cellLat) + ':' + Math.floor(lon / cellLon);
    let bucket = cells.get(key);
    if (!bucket) cells.set(key, (bucket = []));
    bucket.push(f);
  }
  return { cells, cellLat, cellLon, radiusM, count: features.length };
}

// --- 4. match ------------------------------------------------------------------------
//
// For each thinned track point, walk the 3x3 cell neighbourhood and keep any stop within
// the radius. A stop near a doubling-back route matches many times, so results are
// deduped by stop key, keeping the closest approach. That minimum distance is also the
// ranking a later session needs when it caps how many waypoints go into the file.
//
// "Near" here is straight-line distance, not riding distance: a stop 400 m away on the far
// side of a river reads as close. That is a known v1 limitation and the page has to say so.

export function match(index, lats, lons, radiusM = index.radiusM) {
  const { cells, cellLat, cellLon } = index;
  const found = new Map();
  for (let i = 0; i < lats.length; i++) {
    const lat = lats[i];
    const lon = lons[i];
    const cy = Math.floor(lat / cellLat);
    const cx = Math.floor(lon / cellLon);
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        const bucket = cells.get((cy + dy) + ':' + (cx + dx));
        if (!bucket) continue;
        for (const f of bucket) {
          const d = metresBetween(lat, lon, f.geometry.coordinates[1], f.geometry.coordinates[0]);
          if (d > radiusM) continue;
          const k = f.properties.k;
          const prev = found.get(k);
          // ptIdx is the track point of the closest approach, so a caller can say how far
          // ALONG the route a stop sits, not just how far off it. For a route that passes
          // a stop twice, this is the closer pass, not the first one.
          if (prev === undefined || d < prev.distM) found.set(k, { f, distM: d, ptIdx: i });
        }
      }
    }
  }
  return [...found.values()].sort((a, b) => a.distM - b.distM);
}

// Cumulative along-track metres for each point. One caveat rides along: where a file
// jumps between disconnected segments, the straight-line gap is counted too, so "km
// along" in a many-segment file can run slightly long.
export function alongDistances(lats, lons) {
  const out = new Float64Array(lats.length);
  for (let i = 1; i < lats.length; i++) {
    out[i] = out[i - 1] + metresBetween(lats[i - 1], lons[i - 1], lats[i], lons[i]);
  }
  return out;
}

// --- the whole thing -----------------------------------------------------------------

export function findStopsNearGpx(gpxText, poi, opts = {}) {
  const intervalM = opts.intervalM ?? 100;
  const radiusM = opts.radiusM ?? 500;
  const t = {};
  let t0 = now();

  const parsed = parseGpx(gpxText);
  t.parseMs = now() - t0; t0 = now();

  const thinned = thin(parsed.lats, parsed.lons, intervalM);
  t.thinMs = now() - t0; t0 = now();

  const index = opts.index ?? buildIndex(poi.features, radiusM);
  t.indexMs = now() - t0; t0 = now();

  const matches = match(index, thinned.lats, thinned.lons, radiusM);
  const along = alongDistances(thinned.lats, thinned.lons);
  for (const m of matches) m.alongM = along[m.ptIdx];
  t.matchMs = now() - t0;
  t.totalMs = t.parseMs + t.thinMs + t.indexMs + t.matchMs;

  return {
    matches,
    timings: t,
    stats: {
      rawPoints: parsed.lats.length,
      trkpts: parsed.trkpts, rtepts: parsed.rtepts,
      tracks: parsed.tracks, segments: parsed.segments, routes: parsed.routes,
      thinnedPoints: thinned.lats.length,
      stopsIndexed: index.count,
      matched: matches.length,
      routeM: along.length ? along[along.length - 1] : 0,
      intervalM, radiusM,
    },
  };
}

function now() {
  return (typeof performance !== 'undefined' ? performance.now() : Date.now());
}

// Names for a match, resolved through the lookup tables that ride along in poi.geojson.
export function describe(entry, poi) {
  const p = entry.f.properties;
  return {
    key: p.k,
    name: p.n,
    category: (poi.cats && poi.cats[p.c]) || String(p.c),
    subcategory: p.s === undefined ? '' : ((poi.subcats && poi.subcats[p.s]) || String(p.s)),
    tier: p.t,
    distM: entry.distM,
    alongM: entry.alongM,
  };
}
