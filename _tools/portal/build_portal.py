#!/usr/bin/env python3
"""Make a game-portal copy of one of our games (CrazyGames, GameDistribution, itch.io).

  python3 _tools/portal/build_portal.py <game> <portal> [--gd-id <GameDistribution game id>]
  game   = road-to-ayodhya | lagori | catch-drops | climb-himalaya | ... (the .html name)
  portal = crazygames | gamedistribution | itch
Output: dist/portal/<portal>/<game>.zip  (index.html + only the files the game uses)

What changes in the portal copy (our own site stays as it is):
  - no "watch the video to unlock" gate, no site counter/sign-up, no next-game links, no site header/footer
  - links back to our site are removed (portals do not allow outside links); a plain credit line stays
  - the portal's own ad SDK is added; ONE ad shows only when a player taps Play again / New game
  - all sound pauses while an ad plays
"""
import os, re, shutil, sys, zipfile

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
args = sys.argv[1:]
if len(args) < 2:
    sys.exit(__doc__)
game, portal = args[0], args[1]
gd_id = args[args.index("--gd-id") + 1] if "--gd-id" in args else ""
assert portal in ("crazygames", "gamedistribution", "itch"), portal
src = os.path.join(ROOT, game + ".html")
html = open(src, encoding="utf-8").read()

# ---- strip site-only parts
html = re.sub(r'<script src="(gate|join|game-info|next)\.js[^"]*"[^>]*>\s*</script>\s*', "", html)
html = re.sub(r'<a class="wow-top".*?</a>\s*', "", html, flags=re.S)
html = re.sub(r'<footer class="wow-foot">.*?</footer>\s*', "", html, flags=re.S)
html = re.sub(r'<!-- geo:start.*?geo:end -->\s*', "", html, flags=re.S)
html = re.sub(r'<link rel="canonical"[^>]*>\s*', "", html)
html = re.sub(r'<p class="by">.*?</p>', '<p class="by">A game by World of Wonders Studio · watch the full story on YouTube: World of Wonders Studio</p>', html, flags=re.S)
# back links and any link to our site -> inert
html = re.sub(r'href="(index\.html[^"]*|https://worldofwondersstudio\.com[^"]*|https://www\.youtube\.com[^"]*|vedic-maths/[^"]*)"', 'href="#" data-off="1"', html)
# end-card buttons that would leave the game (Next: ... / All Dasara games) become plain "Play again" alternatives: hide them
html = html.replace("</head>", "<style>a[data-off],.dk-go[href]{display:none!important}</style>\n</head>", 1)

# ---- portal adapter first in <head> (must wrap AudioContext before games create one)
inject = "<script>window.WOW_PORTAL=%r;window.WOW_GD_ID=%r;</script>\n<script src=\"portal.js\"></script>\n" % (portal, gd_id)
html = re.sub(r"(<head[^>]*>)", r"\1\n" + inject, html, count=1)

# ---- collect the files the game really uses
def refs(text):
    found = set(re.findall(r'''["'(]((?:img|audio|music|jagruth-bharath/img)/[\w./\-]+\.(?:png|jpe?g|webp|svg|mp3|m4a|ogg|gif))''', text))
    found |= set(re.findall(r'''(?:src|href)="([\w\-]+\.(?:js|css))(?:\?[^"]*)?"''', text))
    return found

files, todo = set(), refs(html)
while todo:
    f = todo.pop()
    if f in files:
        continue
    p = os.path.join(ROOT, f)
    if not os.path.exists(p):
        continue
    files.add(f)
    if f.endswith((".js", ".css")):
        todo |= refs(open(p, encoding="utf-8").read())
# Dasara games load their day painting + music by key at run time
m = re.search(r"DK\.music\('([\w\-]+)'", html)
if m:
    files.add("audio/dasara/%s.mp3" % m.group(1))
    files |= {os.path.join("img/dasara", x) for x in os.listdir(os.path.join(ROOT, "img/dasara"))}
files = {f for f in files if os.path.exists(os.path.join(ROOT, f))}

# ---- write the zip
out_dir = os.path.join(ROOT, "dist", "portal", portal)
os.makedirs(out_dir, exist_ok=True)
html = re.sub(r'(src|href)="([\w\-]+\.(?:js|css))\?[^"]*"', r'\1="\2"', html)
zpath = os.path.join(out_dir, game + ".zip")
with zipfile.ZipFile(zpath, "w", zipfile.ZIP_DEFLATED) as z:
    z.writestr("index.html", html)
    z.write(os.path.join(ROOT, "_tools/portal/portal.js"), "portal.js")
    for f in sorted(files):
        z.write(os.path.join(ROOT, f), f)
size = os.path.getsize(zpath) / 1e6
print(f"{zpath}  {len(files) + 2} files  {size:.1f} MB")
if size > 20:
    print("WARNING: over 20 MB (CrazyGames mobile limit)")
