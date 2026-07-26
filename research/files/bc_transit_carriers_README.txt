British Columbia carriers and their bicycle policies
====================================================

One row per operator: whether it carries bicycles, under what conditions, where
that answer came from, and when a human last checked it. Nobody else publishes
this, which is also why it needs reading with its dates in view.

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

Suggested citation: BC Cycle Tourism Society (2026). British Columbia carriers
and their bicycle policies [data set]. Version 2026-07-25.
https://bccycletourism.ca/research/

HOW TO READ THIS FILE

Carriers: 67 rows, 12 columns.

A blank cell means we have not recorded that thing. It never means zero, and it
never means the answer is no.

Of the 67 carriers here, 30 have had their bicycle policy checked against the
operator's own material, 9 are read from the operator's published description
and not separately checked, and 28 have no bicycle policy on file at all. That
last group is a finding, not an oversight: for much of British Columbia, nobody
publishes this anywhere.

Where we have checked an operator specifically and found that it does not carry
bicycles, that verdict is what the row publishes, and any policy text derived
from the operator's own listing is suppressed. Those two do disagree for at
least one carrier, whose published material still describes reserving a bicycle
space. The checked answer is the one we stand behind.

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

operator
    The carrier. Join the routes file to this file on this column.

modes
    What kinds of service this operator runs, semicolon separated.

n_routes  [count]
    How many of its routes we hold.

n_routes_in_connection_model  [count]
    How many of those are part of the network we route journeys across.

bikes_carried
    yes / yes, with conditions / no / unknown. 'unknown' means we hold no
    bicycle policy for this operator at all, not that bicycles are refused.

bike_policy
    What the operator does with a bicycle, in plain words. Blank where
    bikes_carried is unknown.

restrictions
    The conditions most likely to end a trip at the door: electric bikes
    refused, size or weight limits, some departures only. Repeated from
    bike_policy so they can be scanned on their own.

strongest_condition
    The most demanding thing this policy asks of you: none, fee, preparation
    (bagging or boxing), or restriction. A quick way to sort.

policy_source
    Where the answer came from. 'operator-checked' means a person checked this
    carrier against the operator's own material. 'listing-description' means we
    read it from the operator's published description and did not check it
    separately. 'not-on-file' means we hold nothing.

last_verified  [date]
    When a person last checked. Blank means we hold no date, which for some
    carriers means nobody has checked and for others means the check was not
    dated. Read it with policy_source.

listing_url
    Our page for this operator, where we hold one.

website
    The operator's own website, where we hold one.

The research here uses AI assistance (Claude models, Anthropic) for data
collection, analysis, and writing. Feel free to ask for more details if you are
interested.
