Re-run after any change to the QUAD or WoW sites (new page, new dates, new prices):
  edit geo_sites.py  ->  python3 geo_build.py quad <quad-site folder>  /  python3 geo_build.py wow <story-quest folder>
It rewrites robots.txt, sitemap.xml, llms.txt and the structured data, and never touches anything else.
Update QUAD dates/prices in geo_sites.py after Batch 1 (the 22/29 Nov masterclass events go stale after those dates).
