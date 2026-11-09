"""Turn the standalone Chowka Bhara page into the worldofwondersstudio.com page and a portal (itch/CrazyGames) build.
usage: python3 build_site_game.py src.html site_out.html portal_out.html
"""
import sys, re
src, site_out, portal_out = sys.argv[1:4]
s = open(src, encoding="utf-8").read()

SITE_URL = "https://worldofwondersstudio.com/chowka-bhara.html"
share_start = s.index("<script>\n/* World of Wonders — share & follow panel")
share_end = s.index("</script>", share_start) + len("</script>")
inline_share = s[share_start:share_end]

def common(x):
    x = x.replace('url:"https://claude.ai/artifact/WcFDj44Rd2p1BVazfDAKzS"', 'url:"%s"' % SITE_URL)
    return x

# ---------------- site page ----------------
site = common(s.replace(inline_share, '<script src="wow-share.js?v=1"></script>'))
head_extra = f'''<meta name="description" content="Play Chowka Bhara (Chowka Bara, Ashta Chamma), Karnataka's traditional cowrie board game, free online: 5-house and 7-house boards, 2–4 players, real cowrie shells, in English, ಕನ್ನಡ and हिंदी.">
<link rel="icon" href="img/wow_logo.png">
<link rel="canonical" href="{SITE_URL}">
<meta property="og:title" content="Chowka Bhara · World of Wonders">
<meta property="og:description" content="Karnataka's traditional cowrie board game. Free to play, 2–4 players.">
<meta property="og:image" content="https://worldofwondersstudio.com/img/games/chowka-bhara.webp">
<meta property="og:url" content="{SITE_URL}">
<link rel="stylesheet" href="family.css?v=20261105c">
<script type="application/ld+json">{{"@context":"https://schema.org","@type":"VideoGame","name":"Chowka Bhara","url":"{SITE_URL}","genre":["Board game","Traditional"],"gamePlatform":"Web browser","inLanguage":["en","hi","kn"],"isAccessibleForFree":true,"numberOfPlayers":{{"@type":"QuantitativeValue","minValue":2,"maxValue":4}},"audience":{{"@type":"Audience","audienceType":"Children and families"}},"publisher":{{"@id":"https://worldofwondersstudio.com/#org"}}}}</script>
</head>'''
site = site.replace("</head>", head_extra, 1)
# page scrolls: the game fills the first screen, the About card and footer follow
site = site.replace("html,body{margin:0;height:100%;overflow:hidden}", "html,body{margin:0}\n#app{position:relative;height:100vh;height:100dvh;overflow:hidden}")
site = site.replace("<!-- ============ MENU ============ -->", '<div id="app">\n<!-- ============ MENU ============ -->', 1)
site = site.replace('<div id="throwLayer"></div>', '</div>\n<div id="throwLayer"></div>', 1)
# a way back to the site from the menu
site = site.replace('<div class="langs" id="langs"></div>',
                    '<a href="index.html#games" style="position:absolute;top:16px;left:16px;font-weight:800;font-size:14px;color:#a0527a;text-decoration:none">← Home</a>\n    <div class="langs" id="langs"></div>', 1)
footer = '''<footer class="wow-foot"><div class="wf-in">
<a class="wf-brand" href="index.html"><img src="img/wow_logo.png" alt=""><span><b>World of Wonders Studio</b><small>Music · Stories · Creation · Inspiration</small></span></a>
<nav class="wf-links"><a href="index.html">Home</a> · <a href="index.html#games">Games</a> · <a href="index.html#deepavali">Deepavali</a> · <a href="index.html#dasara">Dasara</a> · <a href="privacy.html">Privacy</a> · <a href="contact.html">Contact</a> · <a href="https://www.youtube.com/@WorldofWondersstudio" target="_blank" rel="noopener">YouTube</a></nav>
<div class="wf-sis">Sister sites: <a href="https://ourschoolhouse.in" target="_blank" rel="noopener">OurSchoolHouse</a> · <a href="https://quadacademy.org" target="_blank" rel="noopener">QUAD Academy</a></div>
<div class="wf-c">© 2026 World of Wonders Studio · Watch the story, play the game, learn together.</div>
</div></footer>
<script src="join.js?v=5" defer></script>
<script src="game-info.js?v=6" data-game="chowka-bhara" defer></script>
</body>'''
site = site.replace("</body>", footer, 1)
open(site_out, "w", encoding="utf-8").write(site)

# ---------------- portal build (self-contained, one file) ----------------
portal = common(s)
open(portal_out, "w", encoding="utf-8").write(portal)
print("site", len(site) // 1024, "KB · portal", len(portal) // 1024, "KB")
