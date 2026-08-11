Published BC cycling routes — derived metrics
=============================================

Every published cycling route we list for British Columbia, with the
measurements behind its difficulty tier and descriptive labels. The routes are
published by route makers across the province; what we add is one consistent
description of all of them.

Published 2026-08-09 by BC Cycle Tourism Society. Preliminary working data,
subject to revision.
https://bccycletourism.ca/research/
Questions, corrections, or collaborations: heather@bccycletourism.ca

LICENCE

Licence: Creative Commons Zero 1.0 Universal (CC0). We have waived our copyright
in this file worldwide. Use it, change it, redistribute it, build on it, sell
it. No permission needed and no conditions attached.
https://creativecommons.org/publicdomain/zero/1.0/

Contains information from OpenStreetMap, © OpenStreetMap contributors, available
under the Open Database Licence (ODbL) 1.0.
https://opendatacommons.org/licenses/odbl/1-0/

Attribution is not legally required under CC0, but often requested as a
community norm. A citation facilitates transparency and discovery, so thanks in
advance!

Suggested citation: BC Cycle Tourism Society (2026). Published BC cycling routes
— derived metrics [data set]. Version 2026-08-09.
https://bccycletourism.ca/research/

HOW TO READ THIS FILE

One row per route, 320 rows. The same data ships as .xlsx and .csv.

A blank cell means we could not measure that thing, not that it is zero. We
require at least 5 km of a route to be measured before we publish a figure or a
label for it, so short or poorly matched routes are deliberately blank in
places.

Nothing here is inferred from a route's written description.

The route count is 320. Our database holds a handful more that are tagged
mountain-bike routes and left out of the collection we list; this file uses the
same rule the website does, so the two always agree.

Labels are explained for riders at https://bccycletourism.ca/routes/how-we-
describe/

Traffic comfort classes are labelled C1 to C6, our own ladder adapted from HUB
Cycling's bikeway classification.

How every number here is computed, and what its limits are:
https://bccycletourism.ca/research/files/route_ratings_methodology.pdf

WHAT THIS FILE DOES NOT TELL YOU

These numbers are derived from OpenStreetMap. We do not yet record which
OpenStreetMap extract produced any given number, so a route's labels can change
when we rebuild, and this file cannot be exactly reproduced from a dated source.
Recording the extract is planned work, not something already done.

COLUMNS

slug
    Our stable identifier for the route. Its page is
    bccycletourism.ca/route/<slug>/

name
    Route name as we display it (publisher prefixes stripped, a few curated
    corrections).

publisher
    Who published the route.

publisher_id
    Stable identifier for the publisher.

source_url
    The publisher's own page for this route.

regions
    BC tourism region(s) the route runs through, most kilometres first,
    semicolon separated.

communities
    Communities the route passes through, semicolon separated. Blank where we
    have not matched any.

start_locality
    Start locality as given by RideWithGPS. Blank for routes not sourced from
    RideWithGPS.

km  [km]
    Route length, from the matched geometry. For clipped cross-border routes
    this is the BC leg only.

ascent_m  [m]
    Total ascent.

ascent_per_km  [m/km]
    Ascent divided by length. Drives the climbing label.

length_class
    Afternoon (<30 km) / Full day (30-90) / Weekend or more (90-300) /
    Expedition (>300).

bc_fraction  [0-1]
    Share of the route inside BC.

bc_fraction_source
    'measured' = sampled every ~300 m against the provincial boundary.
    'publisher scope' = asserted as 1.0 because the route comes from a BC
    guidebook and was never sampled.

matched_fraction  [0-1]
    Share of the route's GPS track we could match onto OpenStreetMap ways.
    Everything derived from OSM covers this share, not the whole route.

bc_match_rate  [0-1]
    Match rate over the in-BC portion alone.

n_ways  [count]
    Number of distinct OpenStreetMap ways matched.

gap_km  [km]
    Track length with no matched way beneath it.

gap_cause
    Our classification of why the gaps exist (e.g. 'none', ferry, out-of-
    province, missing OSM data).

drift_km  [km]
    Track length where the matched way sits noticeably off the recorded track.

routed_km  [km]
    Length filled in by routing between matched points rather than matched
    directly.

rideable_km  [km]
    Matched length on ways classed rideable.

unmatched_km  [km]
    Matched-track length we could not assign to a way.

ferry_km  [km]
    Length on ferry links.

cross_border_km  [km]
    Length outside British Columbia.

unpaved_pct  [%]
    Share of measured length on unpaved surface. Blank when under 5 km could be
    measured.

unpaved_pct_source
    'osm' (our own measurement, preferred), else the publisher's own figure from
    'ridewithgps' or 'BIKEPACKING.com'.

rugg_dom  [0-4]
    Dominant ruggedness level by distance. 0 paved, 1 smooth unpaved, 2 loose, 3
    chunky, 4 near-mountain-bike.

rugg_max  [0-4]
    Roughest level holding at least 10% of the route, so a short chunky stretch
    still shows. Drives the surface labels.

rugg_p75  [0-4]
    'Typical rough': the roughest level whose share, counting everything
    rougher, reaches 25%. Drives the difficulty tier. Smooth flat separated
    gravel is demoted one level first, so this is not raw ruggedness.

steep_pct  [%]
    Share of measured length at 8% grade or steeper, segment by segment. Not an
    average gradient.

remote_share  [%]
    Share of measured length running far from services.

comfort_comfy_pct  [%]
    Share of classified length on low-traffic riding. Drives the traffic label
    at 75% and 45%.

comfort_onaxis_km  [km]
    Classified length the share above is taken over. Blank under 5 km, which is
    why some routes have no traffic label.

traffic_floor  [score]
    Minimum difficulty score imposed by sustained stressful-road riding. Raises
    a tier, never softens one. Blank when it does not apply.

fastroad
    'mostly' or 'sections' when the route carries meaningful fast-road riding,
    blank when it is clean.

fast_km  [km]
    Length on the two least comfortable classes combined.

fast_rated  [TRUE/FALSE]
    Whether the route had enough classified length to judge fast roads at all.
    FALSE means unknown, not clean.

source_difficulty  [score]
    The publisher's own rating, mapped onto our score scale, used as a floor.
    Blank where the publisher gave none or gave an ambiguous combination.

singletrack_pct  [%]
    Publisher-reported singletrack share. Only BIKEPACKING.com supplies this.

tier
    The published difficulty tier: Easy, Moderate, Ambitious, Challenging, or
    Epic.

tier_surface_term  [0-3]
    Surface contribution to the tier score.

tier_climb_term  [0-3]
    Climbing contribution.

tier_singletrack_term  [0-1]
    Singletrack contribution.

tier_remoteness_term  [0-2]
    Remoteness contribution.

tier_decisive_floor
    Which floor, if any, actually raised the tier above what the measurements
    alone gave: publisher, traffic, or distance.

tier_floor_reason
    For a distance floor, which threshold tripped it: km, ascent, or beyond-bc.

comfort_label
    The published traffic label.

surface_labels
    Every descriptive label shown on the route's card, semicolon separated.

difficulty_sentence
    The one-line explanation shown on the route page.

comfort_km_c1  [km]
    Classified length in traffic comfort class C1 (separated paths, or slow
    streets with few cars).

comfort_km_c2  [km]
    Classified length in traffic comfort class C2 (sharing light traffic, or
    bike lanes on calm roads).

comfort_km_c3  [km]
    Classified length in traffic comfort class C3 (sharing busier traffic, or
    bike lanes on busy roads).

comfort_km_c4  [km]
    Classified length in traffic comfort class C4 (fast or heavy traffic, a
    painted line at most).

comfort_km_c5  [km]
    Classified length in traffic comfort class C5 (highway-speed traffic, 60+
    km/h, a painted line at most).

comfort_km_c6  [km]
    Classified length in traffic comfort class C6 (fast highway traffic, 70+
    km/h, a painted line at most).

comfort_km_backcountry  [km]
    Classified length in traffic comfort class BACKCOUNTRY (bare track, beyond
    traffic data; off the ladder).

comfort_km_forbidden  [km]
    Classified length in traffic comfort class FORBIDDEN (cycling not permitted;
    off the ladder).

The research here uses AI assistance (Claude models, Anthropic) for data
collection, analysis, and writing. Feel free to ask for more details if you are
interested.
