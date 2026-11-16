#!/usr/bin/env python3
"""Build an Ayyappa step game page from _tools/ayy_src/<key>.js.
The source starts with /*META {json} META*/ (key, title{en,kn,ta,te}, desc, og, genre[], bg) and then the game code (AG.game({...})).
Usage: python3 _tools/ayy_build.py tiger-ride [more keys]   (or --all)"""
import json,sys,os,re,html
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)));SRC=os.path.join(ROOT,'_tools','ayy_src')
KIT='dasara-kit.js?v=6',"ayy-kit.js?v=7","ayy-game.js?v=1"
CSS='''
:root{--display:"Baloo 2","Baloo Tamma 2","Baloo Thambi 2","Baloo Tammudu 2",system-ui,sans-serif}
body{background:linear-gradient(rgba(18,10,40,.8),rgba(18,10,40,.94)),url(%(bg)s) center/cover fixed}
.stage{position:relative;max-width:480px;margin:0 auto;width:100%%;border-radius:26px;overflow:hidden;border:1px solid rgba(255,211,90,.28);box-shadow:0 34px 70px -30px #000;background:#120a22;user-select:none;-webkit-user-select:none}
#cv{position:relative;display:block;width:100%%;height:auto;touch-action:none}
.toast2{position:relative;max-width:456px;margin:10px auto 0;min-height:44px;padding:10px 14px;border-radius:16px;background:rgba(24,12,4,.62);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border:1px solid rgba(255,211,90,.3);color:#fdf3dc;font:600 14.5px/1.35 Mukta,system-ui,sans-serif;transform:translateY(8px);opacity:0;transition:transform .35s cubic-bezier(.2,1.3,.4,1),opacity .25s;pointer-events:none}
.toast2.on{transform:none;opacity:1}.toast2 b{color:#ffd35a}.toast2.good{border-color:rgba(140,230,140,.55)}.toast2.bad{border-color:rgba(255,120,110,.6)}
#hud{margin-bottom:10px}
'''
def build(key):
    src=open(os.path.join(SRC,key+'.js')).read()
    m=re.match(r'\s*/\*META\s*(\{.*?\})\s*META\*/',src,re.S);M=json.loads(m.group(1));code=src[m.end():]
    t=M['title'];e=lambda s:html.escape(s,quote=True)
    ld={"@context":"https://schema.org","@type":"VideoGame","name":t['en'],"url":f"https://worldofwondersstudio.com/{key}.html","genre":M.get('genre',['Educational']),"gamePlatform":"Web browser","inLanguage":["en","kn","ta","te"],"isAccessibleForFree":True,"audience":{"@type":"Audience","audienceType":"Children and families"},"isPartOf":{"@type":"CreativeWorkSeries","name":"Ayyappa season games"},"publisher":{"@id":"https://worldofwondersstudio.com/#org"}}
    out=f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>{e(t['en'])} · World of Wonders</title>
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="description" content="{e(M['desc'])}">
<meta property="og:title" content="{e(t['en'])} · free Ayyappa game">
<meta property="og:description" content="{e(M.get('og',M['desc']))}">
<meta property="og:image" content="https://worldofwondersstudio.com/img/games/{key}.jpg">
<link rel="canonical" href="https://worldofwondersstudio.com/{key}.html">
<link rel="icon" href="img/wow_logo.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;800&family=Baloo+Tamma+2:wght@600;800&family=Baloo+Thambi+2:wght@600;800&family=Baloo+Tammudu+2:wght@600;800&family=Mukta:wght@400;600;700&display=swap">
<link rel="stylesheet" href="dasara.css?v=1">
<link rel="stylesheet" href="family.css?v=20261105c">
<style>{CSS % {'bg':M.get('bg','img/ayyappa/lamps_river.jpg')}}</style>
{''.join(f'<script src="{k}"></script>' for k in KIT)}
<script type="application/ld+json">{json.dumps(ld,ensure_ascii=False)}</script>
<script>window.WOW_REG_LATER=1</script><script src="reg.js?v=3"></script>
<link rel="stylesheet" href="/cursor-wow.css?v=6"></head>
<body>
<a class="wow-top" href="index.html" aria-label="World of Wonders home"><img src="img/wow_banner.jpg?v=2" alt="World of Wonders · Music · Stories · Creation · Inspiration"></a>
<header class="top">
  <a class="back" href="ayyappa.html#steps" id="back">← Ayyappa</a>
  <h1><small id="t-eyebrow">Ayyappa season game</small><span id="t-title">{e(t['en'])}</span></h1>
  <div class="langs" role="group" aria-label="Language" id="langs"></div>
  <button class="pill" id="sound" aria-pressed="true" aria-label="Sound and music">🔊</button>
  <button class="pill" id="newgame" aria-label="New game">↻</button>
</header>
<main class="wrap">
 <div class="hud" id="hud"></div>
 <div class="stage"><canvas id="cv" width="480" height="760" aria-label="{e(t['en'])}"></canvas></div>
 <div class="toast2" id="tip" aria-live="polite"></div>
</main>
<p class="by">A game by <a href="https://www.youtube.com/@WorldofWondersstudio" target="_blank" rel="noopener">World of Wonders</a> Studio · for the Sabarimala season · Swamiye Sharanam Ayyappa</p>
<div id="overlay"></div>
<script>
{code.strip()}
</script>
<footer class="wow-foot"><div class="wf-in">
<a class="wf-brand" href="index.html"><img src="img/wow_logo.png" alt=""><span><b>World of Wonders Studio</b><small>Music · Stories · Creation · Inspiration</small></span></a>
<nav class="wf-links"><a href="index.html">Home</a> · <a href="ayyappa.html">Ayyappa songs and games</a> · <a href="index.html#games">All games</a> · <a href="privacy.html">Privacy</a> · <a href="contact.html">Contact</a> · <a href="https://www.youtube.com/@WorldofWondersstudio" target="_blank" rel="noopener">YouTube</a></nav>
<div class="wf-c">© 2026 World of Wonders Studio · Play, learn and share. By OurSchoolHouse.</div>
</div></footer>
<script src="join.js?v=6" defer></script>
<script src="game-info.js?v=7" data-game="{key}" defer></script>
</body>
</html>
'''
    open(os.path.join(ROOT,key+'.html'),'w').write(out);print('built',key+'.html')
keys=sys.argv[1:]
if keys==['--all']:keys=[f[:-3] for f in sorted(os.listdir(SRC)) if f.endswith('.js')]
for k in keys:build(k)
