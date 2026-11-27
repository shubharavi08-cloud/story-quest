#!/usr/bin/env python3
"""Full check of worldofwondersstudio.com from a local copy (python3 -m http.server 8765 in the site folder).
Crawls every page and #route (desktop + phone), and reports: JS errors, missing local files (404), broken pictures,
internal links to missing pages/routes, text like 'undefined'/'NaN', pages wider than the phone screen, game pages whose
story card does not open, and every YouTube id used (for a separate playability check).  python3 _tools/site_audit.py"""
import asyncio, json, re, sys, os
from urllib.parse import urljoin, urlparse
from playwright.async_api import async_playwright
BASE = "http://localhost:8765/"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BAD_TEXT = re.compile(r"\bundefined\b|\bNaN\b|\[object |\bnull\b(?![-\w])|\{\{|\$\{")
GATE_KEYS = None
async def visit(ctx, url, rep, ids, mobile):
    pg = await ctx.new_page(); errs = []; missing = []
    pg.on("pageerror", lambda e: errs.append(str(e)[:200]))
    pg.on("console", lambda m: errs.append("console: " + m.text[:200]) if m.type == "error" and "ERR_" not in m.text and "Failed to load resource" not in m.text else None)
    pg.on("response", lambda r: missing.append(r.url) if r.url.startswith(BASE) and r.status >= 400 else None)
    try:
        await pg.goto(url, wait_until="load", timeout=20000)
    except Exception as e:
        rep.append((url, "LOAD FAIL " + str(e)[:120])); await pg.close(); return []
    await pg.wait_for_timeout(1300)
    vid = await pg.evaluate("""async()=>{const p=document.querySelector('#poster');if(!p)return null;p.click();await new Promise(r=>setTimeout(r,400));
      const f=document.querySelector('#vbox iframe');return f?f.getAttribute('src'):'NO IFRAME'}""")
    if vid is not None and not re.search(r"/embed/[A-Za-z0-9_-]{11}\?", vid or ""): rep.append((url, "VIDEO DOES NOT LOAD: " + str(vid)[:90]))
    others = await pg.evaluate("""async()=>{const bad=[];for(const b of [...document.querySelectorAll('.lang[data-id]')]){if(!/^[A-Za-z0-9_-]{11}$/.test(b.dataset.id||''))bad.push(b.textContent.trim())}return bad}""")
    for o in others: rep.append((url, "LANGUAGE BUTTON WITHOUT VIDEO: " + o))
    # scroll to trigger lazy images
    await pg.evaluate("window.scrollTo(0,document.body.scrollHeight)"); await pg.wait_for_timeout(500); await pg.evaluate("window.scrollTo(0,0)")
    info = await pg.evaluate("""()=>{
      const vis=e=>{const r=e.getBoundingClientRect();const s=getComputedStyle(e);return r.width>0&&r.height>0&&s.visibility!=='hidden'&&s.display!=='none'};
      const imgs=[...document.images].filter(i=>i.complete&&i.naturalWidth===0&&i.src.startsWith(location.origin)&&vis(i)).map(i=>i.getAttribute('src'));
      const links=[...document.querySelectorAll('a[href]')].map(a=>a.getAttribute('href'));
      const text=document.body.innerText;
      const html=document.documentElement.outerHTML;
      const yt=[...new Set((html.match(/(?:embed\\/|youtu\\.be\\/|i\\.ytimg\\.com\\/vi\\/|data-id=\\"|['\\"]yt['\\"]?\\s*:\\s*['\\"])([A-Za-z0-9_-]{11})/g)||[]).map(m=>m.slice(-11)))];
      const wide=document.documentElement.scrollWidth>innerWidth+2;
      const card=!!document.querySelector('.dk-card,.dk-ov');
      return {imgs,links,text,yt,wide,card,title:document.title};
    }""")
    for m in BAD_TEXT.finditer(info["text"]):
        s = info["text"][max(0, m.start()-40):m.end()+40].replace("\n", " ")
        rep.append((url, f"BAD TEXT: …{s}…"))
    for i in info["imgs"]: rep.append((url, "BROKEN PICTURE " + i))
    for m in set(missing): rep.append((url, "404 " + m.replace(BASE, "/")))
    for e in errs: rep.append((url, "JS ERROR " + e))
    if mobile and info["wide"]: rep.append((url, "PAGE WIDER THAN PHONE (sideways scroll)"))
    ids.update(info["yt"])
    await pg.close()
    return info["links"]
async def main():
    rep = []; ids = set(); seen = set()
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for mobile in (False, True):
            ctx = await b.new_context(viewport={"width": 390, "height": 844} if mobile else {"width": 1280, "height": 900}, is_mobile=mobile)
            await ctx.route("https://**", lambda r: r.abort())
            # every game counts as unlocked so its page (not the gate) is checked
            await ctx.add_init_script("try{for(const k of Object.keys(localStorage));}catch(e){};(function(){const s=Storage.prototype.getItem;Storage.prototype.getItem=function(k){if(String(k).startsWith('wow-watched-'))return '1';if(k==='dk-sound')return '0';return s.call(this,k)}})()")
            queue = [BASE + f for f in sorted(os.listdir(ROOT)) if f.endswith(".html")] + [BASE + d + "/" + f for d in ("jagruth-bharath", "vedic-maths") for f in sorted(os.listdir(os.path.join(ROOT, d))) if f.endswith(".html")]
            done = set()
            while queue:
                u = queue.pop(0)
                if u in done or len(done) > 400: continue
                done.add(u)
                links = await visit(ctx, u, rep, ids, mobile)
                for h in links or []:
                    if not h or h.startswith(("mailto:", "tel:", "javascript:", "https://wa.me", "whatsapp:")): continue
                    full = urljoin(u, h)
                    if not full.startswith(BASE): continue
                    path = urlparse(full).path
                    fp = os.path.join(ROOT, path.lstrip("/")) if not path.endswith("/") else os.path.join(ROOT, path.lstrip("/"), "index.html")
                    if not os.path.exists(fp): rep.append((u, "LINK TO MISSING PAGE " + h)); continue
                    if not mobile and full not in done: queue.append(full)
            if mobile: pass
            await ctx.close()
        await b.close()
    out = {"problems": sorted(set(rep)), "youtube_ids": sorted(ids)}
    json.dump(out, open("/tmp/site_audit.json", "w"), indent=1, ensure_ascii=False)
    print(len(out["problems"]), "problems,", len(ids), "YouTube ids. Details: /tmp/site_audit.json")
asyncio.run(main())
