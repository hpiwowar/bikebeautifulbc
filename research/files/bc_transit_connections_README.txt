Getting between British Columbia communities with a bicycle
===========================================================

One row for every ordered pair of the 104 communities our trip planner covers:
whether a cyclist can get from one to the other on scheduled service, how many
times they would board, and what runs. The question this was built to answer is
not where the buses go, it is where a bicycle is allowed to go with you.

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

Suggested citation: BC Cycle Tourism Society (2026). Getting between British
Columbia communities with a bicycle [data set]. Version 2026-07-26.
https://bccycletourism.ca/research/

HOW TO READ THIS FILE

Connections: 10710 rows, 22 columns.

A blank cell means we have not recorded that thing. It never means zero, and it
never means the answer is no.

There is no feed. The registry behind these files is kept by hand, assembled
service by service from operator websites, regional transit schedules, tourism
listings, ferry timetables, and telephone calls. It is a collection, not a
census: we cannot know what we have missed, so treat every count as a floor,
never a total.

Every one of the 10710 pairs is reachable somehow. 206 cannot be done with a
bicycle by any means we can find, and a further 1617 can only be done by flying
or by renting a car one way. That is 1823 pairs, or 17% of the province's
community pairs, with no scheduled ground or water service that will carry a
bicycle.

Rows are directional. A service that runs one way does not always run the other,
so both directions of a pair appear and can differ.

Each row describes two journeys. The first is chosen by a neutral rule anyone
can reproduce: the fewest boardings, ties broken by distance. The second, in the
recommended_ columns, is the journey we would actually suggest. Every journey we
considered is in the companion journeys file, in rank order.

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

from_community
    Where the journey starts.

from_id
    Our identifier for that community.

to_community
    Where it ends.

to_id
    Our identifier for that community.

crow_km  [km]
    Straight-line distance between the two communities. Not a travel distance.

bike_reachable  [TRUE/FALSE]
    Whether any journey we can find gets a bicycle from one to the other,
    counting flights and one-way car rentals.

bike_reachable_without_flying  [TRUE/FALSE]
    Whether any journey does it on scheduled ground or water service alone. This
    is the column to use when asking how connected a place really is: a flight
    is one boarding to anywhere, and a one-way car rental is self-transport
    rather than a service.

n_options  [count]
    How many distinct journeys we found, including ones a bicycle cannot make.

n_options_with_bike  [count]
    How many of those a bicycle can make.

n_options_without_flying  [count]
    How many of those use scheduled ground or water service alone.

boardings  [count]
    Fewest boardings on any ground or water journey a bicycle can make. Walking
    or riding between nearby stops is not a boarding, so 0 means the two are
    close enough to simply ride between. Blank where there is no such journey.

modes
    What you board on that journey, in order, semicolon separated.

operators
    Who you travel with on that journey, in order, semicolon separated.

journey_km  [km]
    Total distance of that journey, including any riding or self-transport
    between stops. Blank where any part of the journey has no distance recorded,
    which is always a SkyTrain leg: we hold no distances for SkyTrain at all.
    Half the journeys here are blank for this reason, and a blank is better than
    a total that quietly leaves a leg out.

schedule_cautions
    Whether that journey is limited (does not run every day), on-demand (call to
    arrange), or seasonal. Blank means none of the three apply.

everyday_option_exists  [TRUE/FALSE]
    Whether at least one ground or water journey runs daily, year round, without
    needing to be arranged. FALSE means every way of making this trip has a
    scheduling catch.

recommended_summary
    The journey we would suggest first, in a line. This is our own
    recommendation, taken from the best-ranked journey a bicycle can make, and
    unlike the columns above it reflects our preferences rather than a neutral
    rule. Every journey we considered, in rank order, is in the journeys file.

recommended_boardings  [count]
    How many times you board on our suggested journey.

recommended_modes
    What you board on it, in order.

recommended_operators
    Who you travel with on it, in order.

recommended_journey_km  [km]
    Its total distance, blank where any boarding is unmeasured.

recommended_schedule_cautions
    Whether it is limited, on-demand, or seasonal.

The research here uses AI assistance (Claude models, Anthropic) for data
collection, analysis, and writing. Feel free to ask for more details if you are
interested.
