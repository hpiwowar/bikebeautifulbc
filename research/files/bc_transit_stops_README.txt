British Columbia transit stops, in order, with locations
========================================================

Every stop on every service in the routes file, in the order the service calls
at them, with a coordinate and an honest statement of how precise that
coordinate is. Join it to the routes file on route_id.

Published 2026-09-02 by BC Cycle Tourism Society. Preliminary working data,
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

Suggested citation: BC Cycle Tourism Society (2026). British Columbia transit
stops, in order, with locations [data set]. Version 2026-09-02.
https://bccycletourism.ca/research/

HOW TO READ THIS FILE

Stops: 1019 rows, 9 columns.

A blank cell means we have not recorded that thing. It never means zero, and it
never means the answer is no.

There is no feed. The registry behind these files is kept by hand, assembled
service by service from operator websites, regional transit schedules, tourism
listings, ferry timetables, and telephone calls. It is a collection, not a
census: we cannot know what we have missed, so treat every count as a floor,
never a total.

245 of the 1019 stops are placed at the middle of their community rather than at
the stop itself. The location_precision column says which is which; do not treat
a centroid as a platform location.

54 stops have no coordinate at all, and every one of them belongs to a service
set aside from the model.

WHAT THIS FILE DOES NOT TELL YOU

Bicycle policies change, and this is the one place in our research where stale
data has a physical cost. A route measurement that goes out of date is a mild
embarrassment. A bicycle policy that goes out of date leaves somebody standing
at a depot with a loaded bicycle and no way onto the bus. Check the
last_verified column in the carriers file before you rely on a row, and confirm
with the operator before you travel.

We do not run any of these services. Operators change their routes, their
seasons and their bicycle rules without telling us. Corrections are welcome and
we would rather hear about a wrong row than not.

COLUMNS

route_id
    The route this stop belongs to. Join to the routes file on this column.

stop_sequence  [count]
    Position along the route, starting at 1, in the direction the source lists
    it.

stop_name
    The stop as the operator names it.

community
    The community the stop serves. Several stops in one town share a community.

node_id
    Our identifier for the place this stop is. Two operators calling the same
    terminal different names share one node_id, which is what makes connections
    between them findable.

stop_lat  [degrees]
    Latitude, WGS 84. Blank where we have no location, which happens only on
    routes outside the model.

stop_lon  [degrees]
    Longitude, WGS 84.

location_type
    What kind of place the coordinate is: town, dock, airport, and so on.

location_precision
    'stop' means the coordinate is the terminal or stop itself. 'community
    centroid' means we know the town but not where in it the service stops, so
    the point is the middle of the community. Blank where there is no
    coordinate.

The research here uses AI assistance (Claude models, Anthropic) for data
collection, analysis, and writing. Feel free to ask for more details if you are
interested.
