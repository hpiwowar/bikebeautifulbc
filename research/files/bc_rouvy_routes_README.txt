British Columbia rides on Rouvy
===============================

Every British Columbia ride we could find on Rouvy, the indoor cycling app that
plays video of real roads: the ones Rouvy filmed and the ones riders filmed,
with distance, climbing, where each one runs, and a link.

Published 2026-11-21 by BC Cycle Tourism Society. Preliminary working data,
subject to revision.
https://bccycletourism.ca/research/
Questions, corrections, or collaborations: heather@bccycletourism.ca

LICENCE

Licence: Creative Commons Zero 1.0 Universal (CC0). We have waived our copyright
in this file worldwide. Use it, change it, redistribute it, build on it, sell
it. No permission needed and no conditions attached.
https://creativecommons.org/publicdomain/zero/1.0/

Attribution is not legally required under CC0, but often requested as a
community norm. A citation facilitates transparency and discovery, so thanks in
advance!

Suggested citation: BC Cycle Tourism Society (2026). British Columbia rides on
Rouvy [data set]. Version 2026-11-21. https://bccycletourism.ca/research/

HOW TO READ THIS FILE

45 rows, 17 columns.

A blank cell means we did not record that thing or chose not to publish it. It
never means zero.

45 rides: 26 filmed by Rouvy and 19 filmed by riders. 2 of the rider-filmed
rides are on rail trails.

We read the list from Rouvy's rider map on November 21, 2026, signed in. We kept
every ride that starts in British Columbia and has video.

Distance, climb, maximum grade, name, and created date are Rouvy's. The area and
where_it_runs columns are ours.

The map of these rides is at https://bccycletourism.ca/research/rouvy-bc-routes/

WHAT THIS FILE DOES NOT TELL YOU

This is a list of what is on Rouvy, not a list of good places to ride. Rouvy
mostly films the highway, not the bike route beside it.

Rouvy adds rides and riders add more, so the list goes out of date. The
published date above is when we last read it.

We left out Rouvy's ratings, its descriptions, its time estimates, and riders'
usernames. We also left out rides with no video, such as practice courses that
are a map only.

We are not affiliated with Rouvy. The names and figures are theirs and they can
change them.

COLUMNS

rouvy_id
    Rouvy's own number for the ride. It is the last part of the link.

name
    The ride's name as Rouvy shows it, spelling included (Rouvy writes Toffino
    for Tofino).

filmed_by
    rouvy = an official route, filmed by Rouvy. rider = a community route,
    filmed by a rider and published through Rouvy's Route Creator. In the app,
    community routes are hidden until you switch on Include community routes.

area
    Our own grouping of the rides by part of the province.

where_it_runs
    Which road the ride follows and between where. This is our reading of the
    start and end points, not Rouvy's wording, and nobody has checked each one
    against Rouvy's map.

distance_km  [km]
    Length, as Rouvy states it.

climb_m  [m]
    Total climbing, as Rouvy states it.

max_grade_pct  [%]
    The steepest grade, as Rouvy states it. Official routes only. On rider-
    filmed rides the figure comes from a camera's GPS and one bad reading
    becomes the maximum (one reads 53%), so we leave it blank.

rail_trail
    TRUE for a ride on a gravel rail trail. Every other ride here is on a road.

enhanced_video
    TRUE where Rouvy labels the video Enhanced, meaning it has been remastered.

created  [date]
    The date Rouvy shows the ride as created.

start_lat  [degrees]
    Latitude of the start, WGS84.

start_lon  [degrees]
    Longitude of the start, WGS84.

end_lat  [degrees]
    Latitude of the end, WGS84. Same as the start on a loop or an out-and-back.

end_lon  [degrees]
    Longitude of the end, WGS84.

rouvy_url
    The ride's page on Rouvy.

needs_account
    TRUE where the link only opens for someone signed in to Rouvy. That is every
    rider-filmed ride. Official rides have a public page.

The research here uses AI assistance (Claude models, Anthropic) for data
collection, analysis, and writing. Feel free to ask for more details if you are
interested.
