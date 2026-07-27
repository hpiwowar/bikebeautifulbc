Places in British Columbia that a cyclist might want
====================================================

Every place in our BC Bike Stops directory: cafes, grocery stores, campgrounds,
places to stay, bike shops, attractions, and the transport that connects them.
One row per place, with where it is, what kind of place it is, and how it treats
an arriving cyclist as far as we know.

Published 2026-07-26 by BC Cycle Tourism Society. Preliminary working data,
subject to revision.
https://bccycletourism.ca/research/
Questions, corrections, or collaborations: heather@bccycletourism.ca

LICENCE

Licence: Open Database Licence (ODbL) 1.0, with the attribution © OpenStreetMap
contributors. Most of these listings began as OpenStreetMap records and still
carry their OpenStreetMap identifier, which makes this a derivative database
rather than a work of our own, so it is share-alike whether we would have chosen
that or not. Use it, redistribute it, build on it. If you publish a database
derived from it, that database has to carry the same licence.

Suggested citation: BC Cycle Tourism Society (2026). Places in British Columbia
that a cyclist might want [data set]. Version 2026-07-26.
https://bccycletourism.ca/research/

HOW TO READ THIS FILE

18524 rows, 19 columns.

A blank cell means we have not recorded that thing. It never means zero, and it
never means the answer is no. Blanks are common here, because most of these
places have never been asked.

Of the 18524 places here, 145 are accredited, 5964 meet the welcoming bar for
their category, 12410 are listed for information with no welcome claim either
way, and 5 are carriers we have checked and found will not take a bicycle.

The tier column is our own four-level assessment, not the operator's claim.
'accredited' means a place has told us it welcomes cyclists and we have quoted
them saying so. 'welcoming' means it meets the amenity bar for its category on
the evidence we hold. 'info' means it is a useful place to know about and we
make no welcome claim either way, which is most of the file. 'unwelcome' is
reserved for the handful of carriers we have checked and found will not take a
bicycle at all.

A tier is not an endorsement and not a rating. It says what we know about how a
place treats an arriving cyclist, and nothing about whether the food is good,
the beds are clean, or the staff are kind. Nobody pays to be in here and nobody
pays to move up.

The places sit in 922 communities. Coverage is uneven: Vancouver alone has 3133,
and many small communities have only whatever OpenStreetMap already held. A
community with few rows is usually a community we have not worked through yet,
not a community with nothing in it.

18112 of the 18524 rows carry an OpenStreetMap identifier. That is what makes
this file a derivative database, and it is why the licence above is share-alike
rather than the public-domain dedication on our other datasets.

225 rows carry an Indigenous role. The indigenous_role column is included,
vetted, and still worth reading carefully. The tags were assigned by matching
listings against Indigenous Tourism BC and Indigenous Tourism Association of
Canada membership and against curated lists, then reviewed against a written
evidence rubric in a vetting pass on 7 July 2026, which corrected twelve records
and removed four outright. It describes ownership, operation, or cultural
subject matter as we could evidence it from public sources. It is not a Nation's
own statement about itself, and where we have it wrong we would like to be told.

6205 rows carry a Google Place ID. Where we hold one, google_place_id is
Google's identifier for the same place, offered so this file can be joined to
other work. The match was made automatically by name and distance and has not
been checked by a person, so some of them are wrong: google_place_id_match_km
gives the distance between our coordinate and Google's, and a large one means
treat the match with suspicion. Nothing else from Google is republished here.

What a place offers a cyclist is not in this file. It is in the companion
amenities file, one row per place and amenity, because there are more than sixty
amenities and a column each would leave a table that is almost entirely empty.

WHAT THIS FILE DOES NOT TELL YOU

This is a collection, not a census. It is the places we have found that a
cyclist might want, in the parts of British Columbia we have worked through so
far. We can tell you what is in it. We cannot tell you what is missing from it,
and coverage is uneven by design: some communities have been gone through
carefully and others have only whatever OpenStreetMap already held.

Businesses close, move, and change what they offer. An amenity recorded in 2026
may be gone, and a place listed here may no longer exist. Every amenity row
carries the date we recorded it. Read the dates, and check before you rely on a
washroom being there at the end of a long day.

There are no telephone numbers and no email addresses in these files,
deliberately. Website addresses are here, and every listing's page on our own
site is one, so a person who wants to make contact can. A bulk file of contact
details for fifteen thousand small businesses is a different object with
different uses, and we would rather not have made it.

We do not run, own, or represent any of these places, and almost none of them
know they are in here. Corrections are welcome, from anyone, including from the
businesses themselves: heather@bccycletourism.ca

COLUMNS

listing_key
    Our identifier for this place. Stable across rebuilds. Its page on our site
    is at bccycletourism.ca/wwc/stop/ followed by this value. Join the amenities
    and sources files to this file on this column.

name
    What the place is called.

category
    One of seven: Food & Drink, Groceries, Accommodation, Camping, Attractions,
    Bike Services, Transport.

subcategory
    A finer kind of place within the category, 35 of them in all: cafe, bakery,
    provincial park campground, bike shop, museum, and so on. Blank on a few
    rows we could not type more finely.

community
    The town or city the place is in, as we resolved it. Not always the postal
    address's town: a place just outside a small community is attached to the
    community a rider would say it is near.

region
    One of British Columbia's six tourism regions.

lat  [degrees]
    Latitude, WGS 84.

lon  [degrees]
    Longitude, WGS 84.

tier
    Our four-level assessment of how the place treats an arriving cyclist:
    accredited, welcoming, info, or unwelcome. Shown on the site as Accredited,
    Welcoming, Info and Bikes Unwelcome. See the About sheet, and the
    methodology PDF, for what earns each. It is not a rating of the place.

website
    The place's own website, where we hold one.

address
    Street address, where we hold one. Frequently blank, and a blank never means
    the place has no address.

price_band
    Roughly what it costs, in words that suit the category: Cheap eats through
    Fine dining for food, Rock-bottom through Luxury for a bed, Free for most
    public places. Blank for categories where a price band would be meaningless,
    and blank wherever we could not establish one.

ownership
    Who owns it, at the resolution a visitor would care about: an independent
    British Columbia business, a British Columbia chain, a Canadian business, a
    global chain, a nonprofit, or a public body. Public and park ownership is
    split finer in the data: provincial park, provincial recreation site,
    national park, municipal, and so on. Blank on a few rows.

indigenous_role
    Whether the place is Indigenous owned, Indigenous operated, or presents
    Indigenous culture and heritage. Semicolon separated where more than one
    applies. Blank for the great majority, which means only that we hold no such
    record. Read the About sheet before using this column.

osm_id
    The OpenStreetMap element this listing came from, where it came from one: w
    for way, n for node, r for relation, followed by the element id. Present on
    most rows, and the reason this file is licensed the way it is. The About
    sheet gives the count.

origin
    Which population this row entered the directory through: osm, chain (a chain
    location expanded from a brand record), camping_only and camping_rollup
    (campsite sources), transport (the carrier registry behind our trip
    planner), bcparks_addition, or manual (added by a person).

google_place_id
    Google's identifier for the same place, where we have one, so this file can
    be joined to other people's work. Automatically matched and not checked by a
    person. Nothing else from Google is republished here.

google_place_id_match_km  [km]
    How far apart our coordinate and Google's are for that match. Small is
    reassuring; a few kilometres usually means we matched a different branch of
    the same business, and you should decide for yourself whether to trust the
    id. Apply whatever threshold you like: we have deliberately not applied one
    for you.

description
    A short description of the place, written for riders. Drafted by a language
    model from the place's own website and its OpenStreetMap record, and not
    reviewed line by line by a person. Blank where we have none, since a
    sentence assembled from the name and the town would tell you nothing.

The research here uses AI assistance (Claude models, Anthropic) for data
collection, analysis, and writing. Feel free to ask for more details if you are
interested.
