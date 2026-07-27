British Columbia transit routes, for cyclists
=============================================

Every scheduled passenger service we have found that a cyclist could use to get
around British Columbia. Buses, ferries, inland ferries, water taxis, trains,
SkyTrain, flights, ride-share and one-way rental car corridors. Its ordered
stops and their locations are the companion stops file.

Published 2026-07-26 by BC Cycle Tourism Society. Preliminary working data,
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
routes, for cyclists [data set]. Version 2026-07-26.
https://bccycletourism.ca/research/

HOW TO READ THIS FILE

Routes: 326 rows, 14 columns.

A blank cell means we have not recorded that thing. It never means zero, and it
never means the answer is no.

There is no feed. The registry behind these files is kept by hand, assembled
service by service from operator websites, regional transit schedules, tourism
listings, ferry timetables, and telephone calls. It is a collection, not a
census: we cannot know what we have missed, so treat every count as a floor,
never a total.

This is topology, not a timetable. We record which services exist, where they
stop, and in what order. We do not record when they depart. Because there are no
departure times here, this is not General Transit Feed Specification (GTFS) data
and cannot be loaded by GTFS tools. Where one of our columns means the same
thing as a GTFS field, we have borrowed the GTFS name so it reads familiarly.

Of the 326 routes, 267 are part of the network we route journeys across. The
rest are published too, each with the reason we set it aside, because what was
excluded is part of the picture.

Each route's stops, in order, are in the companion stops file.

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
    Our identifier for this route. Stable across rebuilds. Join the stops file
    to this file on this column.

mode
    One of: bus, local-bus, ferry, inland-ferry, water-taxi, air, intercity-
    train, local-train, skytrain, carpool, rental-car.

operator
    Who runs the service. Join the carriers file to this file on this column.

route_name
    The route as the operator names it, or as we describe it where the operator
    gives it no name.

region
    The corridor this route belongs to. Usually a tourism region; for flights
    and cross-border coaches it is 'air' or 'cross-border' instead, which is how
    the source records them.

frequency
    daily, limited (does not run every day), on-demand (call to arrange), or
    seasonal-varies (runs daily in season only). Blank where we have not
    established it.

n_stops  [count]
    How many stops we hold for this route, including both ends.

origin
    Community of the first stop, in the direction the source lists it. Services
    generally run both ways.

destination
    Community of the last stop, in the direction the source lists it.

in_connection_model  [TRUE/FALSE]
    Whether this route is part of the network we route journeys across. FALSE
    routes are still published here, with a reason, because knowing what we set
    aside is part of the picture.

not_in_model_because
    Why a route is not in the model. Blank when it is.

counts_for_connectivity  [TRUE/FALSE]
    Whether this route counts when asking how well a community is served by
    scheduled transport that takes bicycles. Excludes routes not in the model,
    routes whose operator we have checked and found does not take bicycles, and
    flights and one-way car rentals (both self-transport, not scheduled
    service).

bikes_carried
    The operator's bicycle answer, copied from the carriers file. See that file
    for the conditions and for how old the answer is.

rider_note
    A practical note we show riders about this specific route. Blank for most
    routes.

The research here uses AI assistance (Claude models, Anthropic) for data
collection, analysis, and writing. Feel free to ask for more details if you are
interested.
