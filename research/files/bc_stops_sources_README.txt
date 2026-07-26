Where each fact about each place came from
==========================================

One row per place and per field, naming the source that supplied that field's
current value. Published because this directory merges OpenStreetMap, automated
enrichment, human review, and hand-added records field by field, and because the
licence on the whole depends on which parts are OpenStreetMap's. Join it to the
places file on listing_key.

Published 2026-07-25 by BC Cycle Tourism Society. Preliminary working data,
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

Suggested citation: BC Cycle Tourism Society (2026). Where each fact about each
place came from [data set]. Version 2026-07-25.
https://bccycletourism.ca/research/

HOW TO READ THIS FILE

66205 rows, 3 columns.

A blank cell means we have not recorded that thing. It never means zero, and it
never means the answer is no. Blanks are common here, because most of these
places have never been asked.

66205 rows: one for every field of every place where we hold a value at all. A
field with no row is a field we hold nothing for.

This is the file that makes the licence legible. Rows sourced 'osm' are
OpenStreetMap's, and the rest are ours or our contributors'.

It is also the honest answer to how much of this directory was written by a
language model rather than by a person. Most of the descriptions were.

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
details for twelve thousand small businesses is a different object with
different uses, and we would rather not have made it.

We do not run, own, or represent any of these places, and almost none of them
know they are in here. Corrections are welcome, from anyone, including from the
businesses themselves: heather@bccycletourism.ca

COLUMNS

listing_key
    The place. Join to the places file on this column.

field
    Which field of the places file this row is about: name, description,
    website, or address.

source
    What supplied that field's current value. 'osm' is OpenStreetMap.
    'enrichment' is our own automated pass over the place's website. A model
    name such as 'sonnet_4.6', 'haiku_4.5' or 'opus_4.6' names the language
    model that produced it. 'review_edit' and 'manual' mean a person typed it.
    'camping', 'bcparks_api' and 'ptboard-icb' are specific outside sources.
    Blank where we did not record one.

The research here uses AI assistance (Claude models, Anthropic) for data
collection, analysis, and writing. Feel free to ask for more details if you are
interested.
