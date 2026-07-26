Every way of getting between two British Columbia communities
=============================================================

One row per journey rather than per pair: every itinerary our trip planner finds
between every pair of communities, in the order it ranks them, with what you
board and whether a bicycle can come. The connections file reports one journey
per pair; this is all of them, so our ranking can be inspected rather than taken
on trust.

Published 2026-07-25 by BC Cycle Tourism Society. Preliminary working data,
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

Suggested citation: BC Cycle Tourism Society (2026). Every way of getting
between two British Columbia communities [data set]. Version 2026-07-25.
https://bccycletourism.ca/research/

HOW TO READ THIS FILE

Journeys: 54318 rows, 13 columns.

A blank cell means we have not recorded that thing. It never means zero, and it
never means the answer is no.

54318 journeys across 10504 community pairs, in the order we rank them. Rank 1
is the journey we would suggest first.

5627 of them cannot be made with a bicycle. They are kept rather than dropped,
so that a service running the route you want and refusing your bicycle is
visible rather than silently absent.

Publishing the whole ranked list, rather than only its winner, is deliberate: it
means our ordering can be checked and argued with.

WHAT THIS FILE DOES NOT TELL YOU

Bicycle policies change, and this is the one place in our research where stale
data has a physical cost. A route measurement that goes out of date is a mild
embarrassment. A bicycle policy that goes out of date leaves somebody standing
at a depot with a loaded bicycle and no way onto the bus. Check the
last_verified column before you rely on a row, and confirm with the operator
before you travel.

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

rank
    Our order of preference for this pair, 1 being the journey we would suggest
    first. See the methodology PDF for what the ranking weighs.

bike_possible  [TRUE/FALSE]
    Whether a bicycle can make this journey. FALSE journeys are kept rather than
    dropped, so you can see that a service runs the route and will not take your
    bicycle.

scheduled_ground_only  [TRUE/FALSE]
    Whether the journey uses only scheduled ground or water service, with no
    flight and no one-way car rental.

boardings  [count]
    How many times you board a scheduled service. Walking or riding between
    nearby stops is not a boarding.

modes
    What you board, in order, semicolon separated.

operators
    Who you travel with, in order, semicolon separated.

journey_km  [km]
    Total distance, including riding between stops. Blank where any boarding has
    no distance recorded, which is most often a SkyTrain leg.

schedule_cautions
    Whether this journey is limited, on-demand, or seasonal. Blank means none of
    the three.

summary
    The one-line description we show a rider for this journey.

The research here uses AI assistance (Claude models, Anthropic) for data
collection, analysis, and writing. Feel free to ask for more details if you are
interested.
