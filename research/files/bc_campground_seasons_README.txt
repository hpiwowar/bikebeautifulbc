When British Columbia campgrounds open and close
================================================

Every campground in our BC Bike Stops directory, with its season as far as we
could find it: when it opens, when it closes, whether it is open all year,
whether you can camp outside the season, where we read that, and how sure we
are.

Published 2026-10-18 by BC Cycle Tourism Society. Preliminary working data,
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

Suggested citation: BC Cycle Tourism Society (2026). When British Columbia
campgrounds open and close [data set]. Version 2026-10-18.
https://bccycletourism.ca/research/

HOW TO READ THIS FILE

1395 rows, 33 columns.

A blank cell means we have not recorded that thing. It never means zero, and it
never means the answer is no. A blank closing month is a campground whose
closing month we could not find, not one that never closes.

858 of the 1395 campgrounds have a season: 417 with high confidence, 299 medium,
and 142 low. 250 say they are open all year.

The confidence column is our own judgment of the evidence, not the operator's.
'high' means an official source gave this year's dates or said plainly that the
campground is open all year. 'medium' means older dates, or a stated pattern
with no dates. 'low' means the evidence was thin: an indirect hint, a listing
site rather than the campground's own page, or a web search result we could not
confirm on the page it linked to. Patterns across a region hold up well. A
single campground's date can be wrong.

Most rows were read from pages and government records we saved ourselves, and
their quotes come from those copies. About two hundred were found later by AI-
assisted web search, and some of those quotes turned out not to exist on the
page they cited. So we checked every one of them, word for word, against the
live page and our saved copies. Where we could not find the quote, we removed
it, marked the row not_confirmed in quote_check, and lowered its confidence to
low. Not confirmed does not mean wrong. Some of those quotes leave out words
without saying so, or stitch together a table, and the dates they support are
real. Others we could not find at all. The dates stay in either way; treat them
as a lead, not an answer. Of the 213 web-search quotes, 69 could not be
confirmed.

Most Recreation Sites and Trails BC campgrounds post no season at all. They are
mostly unstaffed and usable whenever the road is open and free of snow. A row
with season_status no_posted_season is that: a real campground with no season to
report, not a gap in our work. There are 430 of them.

Recreation Sites records also carry status comments, such as a closure for
wildfire or danger trees. They carry no date and many are years old, so we
removed them from the evidence and notes columns. Check the Recreation Sites and
Trails BC page for current closures.

75 campgrounds have not been looked at yet, mostly because they have no website.
They are in the file with season_status not_checked.

This is written up for riders in our Field Note, Where can I camp this fall? It
counts only high and medium confidence, and it was written before we checked the
web-search quotes, so its numbers differ a little from this file's:

https://bccycletourism.ca/field-note/where-can-i-camp-this-fall/

WHAT THIS FILE DOES NOT TELL YOU

We collected these seasons between 30 September and 2 October 2026, and checked
the web-search quotes against their pages on 18 October 2026. Campgrounds change
their dates every year. The window_year column says which year a stated date
belongs to, and some campgrounds had only last year's dates posted when we
looked.

Check before you go. A campground that was open on these dates in 2026 may open
later, close earlier, or close for a season because of fire, floods, bears, or
spawning salmon. The source_url column is where we found the season, and the
operator's own page is the answer that counts.

We do not run, own, or represent any of these places, and almost none of them
know they are in here. Corrections are welcome, from anyone, including from the
businesses themselves: heather@bccycletourism.ca

COLUMNS

listing_key
    Our identifier for the campground. Joins to listing_key in bc_stops, which
    holds its website, ownership, and amenities, and its page on our site is
    https://bccycletourism.ca/wwc/stop/<listing_key>/.

name
    The campground's name as our directory shows it.

subcategory
    What kind of campground: provincial park, recreation site, private
    campground, and so on.

community
    The community we file it under.

region
    Destination BC tourism region.

lat  [degrees]
    Latitude, WGS84.

lon  [degrees]
    Longitude, WGS84.

osm_id
    The OpenStreetMap record this listing began as, where it began as one (n =
    node, w = way, r = relation). Blank for campgrounds we added ourselves.

season_status
    found: we found a season or a statement that it is open all year.
    no_posted_season: a real record for this campground that posts no season,
    common for Recreation Sites. not_found: we looked and found nothing.
    wrong_match: the listing turned out not to be a campground we could match to
    a source. closed_permanently / closed_temporarily: the operator says so.
    not_checked: we have not looked yet, mostly campgrounds with no website.

confidence
    high, medium, or low. Our judgment of the evidence; see the README. Lowered
    to low wherever quote_check is not_confirmed.

how_found
    saved_source: read by an AI model from operator pages and government records
    we saved. web_search: found later by AI-assisted web search.
    hand_correction: corrected by a person.

quote_check
    Only for web_search rows. confirmed: the quote is on the cited page, word
    for word. not_confirmed: we could not find it there, so the quote (and any
    note repeating it) is removed and confidence lowered. Blank where there was
    no web-search quote to check; other rows' quotes come from our own saved
    copies.

source_type
    Where the season came from: bc_parks (BC Parks data), rec_sites (Recreation
    Sites and Trails BC data), or operator_web (the campground's own website or
    a listing site).

season_summary
    The season in a short phrase, for example 'mid-May to late September'.
    Written by the AI model from the evidence.

year_round
    yes, no, or unknown. yes needs the source to say so, or to give a 1 January
    to 31 December season.

open_month  [1-12]
    Month the season opens, where known.

open_part
    early, mid, or late: which part of open_month.

close_month  [1-12]
    Month the season closes, where known.

close_part
    early, mid, or late: which part of close_month.

open_start  [date]
    First night you can camp, where the source gives an exact date (YYYY-MM-DD).

open_end  [date]
    Last night you can camp, where the source gives an exact date.

serviced_start  [date]
    Start of the staffed season (water on, fees collected), where it differs
    from when you can camp.

serviced_end  [date]
    End of the staffed season.

window_year  [year]
    The year the exact dates belong to. Some campgrounds had only last year's
    dates posted.

next_year_start  [date]
    Opening date for 2027, where already posted.

next_year_end  [date]
    Closing date for 2027, where already posted.

off_season_camping
    Whether you can camp outside the season: allowed_serviced,
    allowed_unserviced, not_allowed, or unknown. Unknown for most.

off_season_notes
    What the source says about camping out of season, such as gate closed but
    walk-in camping allowed.

season_basis
    Whether the season is stated for this campground (site_specific) or for the
    park or operator as a whole.

checked_on  [date]
    When the record was collected. See the README for the full collection
    window.

source_url
    The page or record the season came from. The operator's own page is the
    answer that counts.

evidence
    The words the season was read from, quoted from the source. Removed where
    quote_check is not_confirmed.

notes
    The AI model's own explanation of how it read the evidence and why it chose
    that confidence. Machine-written; read it as reasoning, not as fact.

The research here uses AI assistance (Claude models, Anthropic) for data
collection, analysis, and writing. Feel free to ask for more details if you are
interested.
