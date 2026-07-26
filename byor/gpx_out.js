// "Bring Your Own Route" GPX writer (BC-370).
//
// Takes the stops the engine matched and hands back a file the rider can load onto a
// device. Two shapes: their track with our waypoints added, and the waypoints on their
// own (some Garmin units ignore waypoints bundled inside a course file, and a separate
// file is the workaround).
//
// The waypoint half is a port of _trail_gpx() (wwc/build.py:4925) — same lookup tables,
// same element order, same escaping. Do not "improve" the icon encoding: it was verified
// against real RideWithGPS exports, and an earlier sym-only version imported as generic
// markers.
//
// The track half is NOT a port. _trail_gpx() builds the track from scratch, which is right
// on the server where we own the coordinates. Here the rider owns them, and engine.js's
// parser deliberately keeps only latitude and longitude (a linear text scan, because the
// longest fixture on disk is 247,763 points in 12.5 MB). Rebuilding a track from those
// coordinates would silently drop elevation, timestamps, track names and producer
// extensions — their route with its climb profile and history gone. So their bytes are
// copied through untouched and our <wpt> elements are spliced in alongside. Their half is
// safe because it is never rewritten, and it is less code than regenerating it.
//
// Like engine.js: a plain ES module with no dependencies, so the same code runs under Node
// for the harness and in the browser for the real page.

import { describe } from './engine.js';

// Where the tool itself lives. S5 (BC-373) decides the real path in the site's information
// architecture; until then this is a placeholder and the only thing that has to change.
export const TOOL_URL = 'https://bccycletourism.ca/wwc/byor/';

const SITE = 'https://bccycletourism.ca';
const CREATOR = 'BC Bike Stops (bccycletourism.ca)';

// --- icon encoding -------------------------------------------------------------------
//
// Transcribed verbatim from build.py:4858. Two type fields, per RWGPS's own export format:
//
//   <cmt>  = the fine-grained RWGPS POI type   -> drives the RWGPS map icon
//   <type> = the coarser FIT course-point type -> Garmin / Wahoo / FIT consumers
//   <sym>  = always "Dot" in RWGPS files (RWGPS ignores it on import)
//
// Subcategory overrides win over category where a distinct icon actually helps a rider.
// Anything unmapped falls back to generic/generic.
// FIT course-point types: https://github.com/mshroyer/coursepointer/blob/main/docs/point_types.md
//
// verify_gpx_out.mjs asserts these three against build.py itself, so a transcription slip
// fails a test rather than shipping a wrong icon.

export const GPX_POI_DEFAULT = ['generic', 'generic'];

export const GPX_POI_CAT = {
  'Food & Drink':  ['food', 'food'],
  'Accommodation': ['lodging', 'shelter'],
  'Camping':       ['camping', 'campsite'],
  'Supplies':      ['convenience_store', 'store'],   // category display name for the Groceries key
  'Attractions':   ['viewpoint', 'overlook'],
  'Bike Services': ['bike_shop', 'gear'],
  'Transport':     ['transit', 'transport'],
};

export const GPX_POI_SUB = {
  'Café / Coffee':        ['coffee', 'food'],
  'Brewery / Pub':        ['bar', 'food'],
  'Winery / Cidery':      ['winery', 'food'],
  'Library':              ['library', 'info'],
  'Museum / Gallery':     ['monument', 'info'],
  'Park / Nature':        ['park', 'rest_area'],
  'Community Centre':     ['rest_stop', 'rest_area'],
  'Visitor Centre':       ['generic', 'generic'],   // the info "i" is right here
  'Ferry':                ['ferry', 'transport'],
  'Bus / Public Transit': ['transit', 'transport'],
};

export function poiIcon(category, subcategory) {
  return GPX_POI_SUB[subcategory] || GPX_POI_CAT[category] || GPX_POI_DEFAULT;
}
// --- end icon encoding ---------------------------------------------------------------
//
// Everything between the two sentinels above is dependency-free and is spliced verbatim
// into the Bespoke trip page by bespoke_build.py (_gpx_icon_block), so that exporter reuses
// this table instead of keeping a fourth copy. Keep the block self-contained: anything
// added here that references an import will break that build.

// Text-only escaping, matching build.py's _gpx_esc. Quotes are deliberately not escaped
// because this never touches an attribute value — keep it that way.
export function gpxEsc(s) {
  return (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// --- waypoints -----------------------------------------------------------------------
//
// One <wpt> per stop, in GPX 1.1's child order (name, cmt, desc, link, sym, type).
//
// The description carries the subcategory plus the stop's page, because that is what a
// head unit actually renders. The <link> element is the schema-correct home for a URL, but
// of 225 real RWGPS and Adventure Cycling exports on disk not one puts <link> inside a
// <wpt> — so a link-only version would likely render nowhere. Both, therefore.
//
// `entries` arrives already filtered and already capped: the picker (S3, BC-371) decides
// what goes in, this decides what it looks like.

export function waypointXml(entry, poi) {
  const d = describe(entry, poi);
  const [lon, lat] = entry.f.geometry.coordinates;
  const [cmt, typ] = poiIcon(d.category, d.subcategory);
  const label = d.subcategory || d.category || '';
  const url = `${SITE}/wwc/stop/${d.key}/`;
  const out = [
    `<wpt lat="${lat.toFixed(6)}" lon="${lon.toFixed(6)}">`,
    `<name>${gpxEsc(d.name)}</name>`,
    `<cmt>${cmt}</cmt>`,
    `<desc>${gpxEsc(label ? label + ' · ' : '')}bccycletourism.ca/wwc/stop/${d.key}/</desc>`,
    `<link href="${url}"><text>BC Bike Stops</text></link>`,
    '<sym>Dot</sym>',
    `<type>${typ}</type>`,
    '</wpt>',
  ];
  return out.join('\n');
}

export function waypointsXml(entries, poi) {
  return entries.map((e) => waypointXml(e, poi)).join('\n');
}

// --- splicing into the rider's file --------------------------------------------------
//
// Waypoints belong before the first <trk> or <rte>, which is both what the schema wants
// and what puts them after any waypoints the rider's own file already carries (the RWGPS
// fixtures hold 4 and 13 cue POIs each — those survive untouched). A file with neither
// element gets them before </gpx>.
//
// The lookahead is what keeps <trkseg> and <trkpt> from matching, and the optional prefix
// group tolerates <gpx:trk>. Same shape as engine.js's countTag.

const TRACK_START_RE = /<(?:[A-Za-z_][\w.-]*:)?(?:trk|rte)(?=[\s>/])/;
const GPX_CLOSE_RE = /<\/(?:[A-Za-z_][\w.-]*:)?gpx\s*>/;

function insertionPoint(text) {
  const m = TRACK_START_RE.exec(text);
  if (m) return m.index;
  const c = GPX_CLOSE_RE.exec(text);
  if (c) return c.index;
  return text.length;
}

// GPX 1.0 has no <metadata> element at all — name, desc and time are direct children of
// <gpx>. Injecting one would emit invalid XML, so 1.0 files skip the metadata step and get
// waypoints only. There is a real 1.0 file in the fixtures (gpx/RWGPS/Trails BC/
// alternate-trail-salmo.gpx), so this is not a hypothetical.
// Both tests are anchored to the <gpx> tag, because every file's XML declaration says
// version="1.0" and an unanchored test would call all of them GPX 1.0.
function isGpx10(text) {
  return /<gpx\b[^>]*(?:\bversion\s*=\s*["']1\.0["']|GPX\/1\/0)/.test(text.slice(0, 2000));
}

const METADATA_RE = /<(?:[A-Za-z_][\w.-]*:)?metadata(\s[^>]*)?(\/>|>)/;

// GPX 1.1 fixes metadata's child order: name, desc, author, copyright, link*, time,
// keywords, bounds, extensions. So our <link> goes after the last of the first group, not
// simply before </metadata> — the RWGPS fixtures put <time> after <link>, which a naive
// insert would jump in front of.
const META_EARLY_RE = new RegExp(
  '<(?:[A-Za-z_][\\w.-]*:)?(name|desc|author|copyright|link)\\b[^>]*'
  + '(?:/>|>[\\s\\S]*?</(?:[A-Za-z_][\\w.-]*:)?\\1\\s*>)', 'g');

function metadataBlock() {
  return `<metadata>\n<link href="${TOOL_URL}"><text>BC Bike Stops</text></link>\n</metadata>\n`;
}

// Where our metadata link goes, as an offset into the rider's text plus the string to put
// there — an offset rather than a rewritten copy, so a 12.5 MB upload is never duplicated
// just to add one line. Returns null when the file gets left alone.
function toolLinkAt(text) {
  if (isGpx10(text)) return null;
  const link = `<link href="${TOOL_URL}"><text>BC Bike Stops</text></link>`;
  const m = METADATA_RE.exec(text);

  if (!m) {
    // No metadata at all: <metadata> is the first child of <gpx>, so it goes right after
    // the open tag.
    const open = /<(?:[A-Za-z_][\w.-]*:)?gpx\b[^>]*>/.exec(text);
    if (!open) return null;
    return { at: open.index + open[0].length, insert: '\n' + metadataBlock().trimEnd() };
  }
  if (m[2] === '/>') {
    // <metadata/>: replace it, so the length of what it displaces is part of the answer.
    return { at: m.index, insert: metadataBlock().trimEnd(), replace: m[0].length };
  }

  const innerStart = m.index + m[0].length;
  const cm = /<\/(?:[A-Za-z_][\w.-]*:)?metadata\s*>/.exec(text.slice(innerStart));
  if (!cm) return null;                       // unclosed metadata: leave it alone
  const inner = text.slice(innerStart, innerStart + cm.index);

  let at = 0;                                 // before everything, if nothing matches
  META_EARLY_RE.lastIndex = 0;
  let em;
  while ((em = META_EARLY_RE.exec(inner)) !== null) at = em.index + em[0].length;

  // Borrow the indentation of whatever comes next, so the line we add doesn't stand out in a
  // pretty-printed file the rider might open.
  const next = /^\n([ \t]*)/.exec(inner.slice(at));
  const sep = next ? '\n' + next[1] : '\n';
  return { at: innerStart + at, insert: sep + link };
}

// Pieces rather than one string, so a Blob can be built without ever making a second copy of
// a file that may be 12.5 MB. Both insertion points are offsets into the rider's original
// text, and the metadata one always precedes the track, so the whole thing is three slices.
export function combinedParts(originalText, entries, poi) {
  const block = entries.length ? waypointsXml(entries, poi) + '\n' : '';
  const link = toolLinkAt(originalText);
  const trkAt = insertionPoint(originalText);
  if (!link || link.at > trkAt) {
    return [originalText.slice(0, trkAt), block, originalText.slice(trkAt)];
  }
  const after = link.at + (link.replace || 0);
  return [originalText.slice(0, link.at), link.insert, originalText.slice(after, trkAt),
    block, originalText.slice(trkAt)];
}

export function combinedGpx(originalText, entries, poi) {
  return combinedParts(originalText, entries, poi).join('');
}

// --- waypoints on their own ----------------------------------------------------------
//
// Ours end to end, so this one is a straight write in _trail_gpx()'s shape.

export function waypointsOnlyGpx(entries, poi, routeName) {
  const name = (routeName || 'Your route').trim();
  const out = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    `<gpx version="1.1" creator="${CREATOR}" xmlns="http://www.topografix.com/GPX/1/1">`,
    '<metadata>',
    `<name>Stops on ${gpxEsc(name)}</name>`,
    `<link href="${TOOL_URL}"><text>BC Bike Stops</text></link>`,
    '</metadata>',
  ];
  if (entries.length) out.push(waypointsXml(entries, poi));
  out.push('</gpx>');
  return out.join('\n') + '\n';
}

// --- handing it back -----------------------------------------------------------------

// The rider's own filename, so the download lands next to their original and is obvious a
// week later. Anything a filesystem dislikes becomes a dash.
export function downloadNames(originalFilename) {
  let stem = (originalFilename || 'route').replace(/\.gpx$/i, '');
  stem = stem.replace(/[\\/:*?"<>|]+/g, '-').replace(/\s+/g, ' ').trim() || 'route';
  if (stem.length > 80) stem = stem.slice(0, 80).trim();
  return { combined: `${stem}-with-stops.gpx`, waypoints: `${stem}-stops-only.gpx` };
}

// Pulls the <name> out of the rider's metadata, for the waypoints-only file's title. Falls
// back to the filename stem.
export function routeNameFrom(text, filename) {
  const m = /<(?:[A-Za-z_][\w.-]*:)?metadata(?:\s[^>]*)?>[\s\S]*?<(?:[A-Za-z_][\w.-]*:)?name\s*>([\s\S]*?)<\//.exec(text);
  const raw = m ? m[1].trim() : '';
  if (raw) {
    return raw.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
  }
  return (filename || '').replace(/\.gpx$/i, '') || 'Your route';
}

export const GPX_MIME = 'application/gpx+xml';
