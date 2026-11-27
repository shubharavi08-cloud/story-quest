#!/usr/bin/env python3
"""Gameplay pictures for the Dasara games (img/games/<id>.webp, 800x450).
Serve the site first:  python3 -m http.server 8765   (from the site folder), then:  python3 dasara_shots.py <site folder>
Each game is put into a typical mid-game moment by script, then the play area is captured."""
import asyncio, sys, os
from playwright.async_api import async_playwright
from PIL import Image

SITE = sys.argv[1] if len(sys.argv) > 1 else "."
BASE = "http://localhost:8765/"
HIDE = "document.querySelectorAll('.wow-top,header.top,.hud,.by,.dk-beat').forEach(e=>e.style.display='none');document.body.style.padding='0';"
SHOTS = {
    "navadurga-match": HIDE + """document.head.insertAdjacentHTML('beforeend','<style>.tile{transition:none!important}</style>');
      await new Promise(r=>setTimeout(r,500));tiles.forEach(t=>{t.r=t.hr;t.c=t.hc});
      const a=tiles.find(t=>t.hr===1&&t.hc===1),b=tiles.find(t=>t.hr===2&&t.hc===1),c=tiles.find(t=>t.hr===0&&t.hc===2);
      [a.r,a.c,b.r,b.c]=[b.r,b.c,a.r,a.c];c.r=2;c.c=2;empty={r:0,c:2};tiles.forEach(t=>{place(t);paint(t)});""",
    "climb-himalaya": HIDE + """layout();G.over=false;G.cam=TOP-(H/K)*0.58;G.p.h=TOP-150;G.p.vy=300;G.p.x=280;G.p.face=-1;G.camp=3;G.lotus=9;G.beatDone.near=1;
      await new Promise(r=>setTimeout(r,120));G.over=true;G.cam=TOP-(H/K)*0.58;""",
    "japa-mala": HIDE + """layout();G.phase='input';G.round=5;G.seq=[0,3,5,2,6,1];G.i=3;G.filled=42;G.msg=T(L.you);G.msgT=50;
      await new Promise(r=>setTimeout(r,250));G.glow[2]=1;G.glow[5]=.7;""",
    "ring-the-bell": HIDE + """layout();start();G.lv=1;G.cleared=4;
      [[.12,.55],[.88,.6],[.8,.85],[.2,.8]].forEach(([x,y])=>G.shadows.push({x:x*W,y:y*H,r:38,seed:x*9,hp:1,dead:0}));
      await new Promise(r=>setTimeout(r,1200));G.t=0.05;G.waves.push({x:W/2,y:H*.62,r:170,max:900,c:'#ffd35a',hit:new Set()});
      await new Promise(r=>setTimeout(r,30));G.over=true;""",
    "light-cosmos": HIDE + """layout();start();G.lv=1;G.next=6;G.shown=9;
      await new Promise(r=>setTimeout(r,400));G.over=true;""",
    "lotus-pond": HIDE + """layout();start();G.lv=2;loadLevel();const m=moves(G.pond.g,G.pond.g.length,G.pos[0],G.pos[1]);if(m.length){G.pos=m[0]}
      await new Promise(r=>setTimeout(r,300));""",
    "lions-ride": HIDE + """layout();start();G.lv=3;genLevel();const s=px(G.rider),g=px(GOAL);G.path=[];for(let i=0;i<=40;i++){const t=i/40;G.path.push({x:s.x+(g.x-s.x)*t,y:s.y+(g.y-s.y)*t+Math.sin(t*6)*H*.12})}
      G.rider={x:(s.x+(g.x-s.x)*.35)/W,y:(s.y+(g.y-s.y)*.35+Math.sin(2.1)*H*.12)/H};await new Promise(r=>setTimeout(r,300));G.over=true;""",
    "light-after-darkness": HIDE + """document.querySelector('.pad').style.display='none';layout();start();G.lv=2;loadLevel();G.light=3.4;G.p={x:2,y:1,fx:2,fy:1,t:1};G.sh=[];
      await new Promise(r=>setTimeout(r,300));G.over=true;""",
}


async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(**({"executable_path": "/usr/bin/google-chrome"} if os.path.exists("/usr/bin/google-chrome") else {}))
        c = await b.new_context(viewport={"width": 1100, "height": 760}, device_scale_factor=1)
        await c.route("https://**", lambda r: r.abort())  # no network needed: art and music are local
        for gid, js in SHOTS.items():
            pg = await c.new_page()
            await pg.goto(BASE + gid + ".html")
            await pg.evaluate(f"localStorage.setItem('wow-watched-{gid}','1');localStorage.setItem('dk-sound','0')")
            await pg.reload()
            await pg.wait_for_timeout(1500)
            if await pg.locator(".dk-go").count():
                await pg.click(".dk-go")
            await pg.wait_for_timeout(600)
            await pg.evaluate("(async()=>{" + js + "})()")
            await pg.wait_for_timeout(500)
            box = await pg.locator(".stage").bounding_box()
            png = f"/tmp/{gid}.png"
            await pg.screenshot(path=png, clip=box)
            im = Image.open(png).convert("RGB")
            W, H = im.size
            th = round(W * 9 / 16)
            if th <= H:
                im = im.crop((0, (H - th) // 2 if gid != "navadurga-match" else 0, W, ((H - th) // 2 if gid != "navadurga-match" else 0) + th))
            else:
                tw = round(H * 16 / 9)
                im = im.crop(((W - tw) // 2, 0, (W - tw) // 2 + tw, H))
            out = os.path.join(SITE, "img/games", gid + ".webp")
            im.resize((800, 450), Image.LANCZOS).save(out, "WEBP", quality=82)
            print("wrote", out)
            await pg.close()
        await b.close()

asyncio.run(main())
