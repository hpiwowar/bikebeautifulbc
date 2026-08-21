What each place in British Columbia offers a cyclist
====================================================

One row per place and per amenity, rather than a column per amenity: there are
more than sixty amenities and no place has more than a handful, so a wide table
would be mostly empty. In this shape it pivots. Join it to the places file on
listing_key.

Published 2026-08-15 by BC Cycle Tourism Society. Preliminary working data,
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

Suggested citation: BC Cycle Tourism Society (2026). What each place in British
Columbia offers a cyclist [data set]. Version 2026-08-15.
https://bccycletourism.ca/research/

HOW TO READ THIS FILE

55186 rows, 7 columns.

A blank cell means we have not recorded that thing. It never means zero, and it
never means the answer is no. Blanks are common here, because most of these
places have never been asked.

55186 rows across 18618 places, which is about three amenities each. Most places
have a handful; a few have twenty.

332 of the rows are FALSE, meaning we established that the place does not have
that amenity. A place with no row for an amenity is not a FALSE: it means nobody
has established it either way, and the two must not be merged.

The source column is worth reading before drawing conclusions. An amenity marked
from an 'inferred:' source was applied by a rule about that kind of place, not
found for that particular place.

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
    The place. Join to the places file on this column.

amenity
    The thing being recorded: Washrooms, Water bottle refill, Covered bike
    parking, Showers, Laundry, and around sixty more. Which ones are even asked
    about depends on the category.

amenity_kind
    'required for the tier' means this amenity is one of the ones a place in
    this category has to have to reach the welcoming tier. 'extra' means it is
    recorded when we find it but is not part of that bar.

value  [TRUE/FALSE]
    Whether the place has it. FALSE is a real answer, meaning we looked and it
    does not, and it is different from the place having no row for that amenity
    at all, which means nobody has established it either way.

detail
    What we know beyond yes or no: where the rack is, whether the shower costs
    money, which months the water is on. Blank on most rows.

source
    Where the answer came from. 'osm' and 'osm:' followed by a tag name are
    OpenStreetMap. A model name such as 'sonnet_4.6' means a language model read
    the place's website and said so. 'inferred:' followed by a reason means we
    applied a rule about that kind of place rather than finding evidence for
    this one, and 'derived:' means we computed it from another field we hold.
    'manual' means a person entered it. 'camping:' and 'bcparks_api' are the
    campsite sources.

date  [date]
    When the answer was recorded. Blank where the source did not carry one.

The research here uses AI assistance (Claude models, Anthropic) for data
collection, analysis, and writing. Feel free to ask for more details if you are
interested.
