"""QA driver: forces dice so chosen squares are visited, answers cards, screenshots. usage: qa_play.py url size out.png level 'd1,d2,...' [waitms]"""
import sys,asyncio
from playwright.async_api import async_playwright
async def main():
    url,size,out,level,dice=sys.argv[1:6];wait=int(sys.argv[6]) if len(sys.argv)>6 else 9000
    w,h=map(int,size.split('x'))
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--use-angle=swiftshader','--enable-unsafe-swiftshader','--no-sandbox','--ignore-gpu-blocklist'])
        ctx=await b.new_context(viewport={'width':w,'height':h},device_scale_factor=2,is_mobile=w<500,has_touch=w<500)
        pg=await ctx.new_page();errs=[]
        pg.on('console',lambda m:errs.append(m.text) if m.type=='error' else None);pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.goto(url);await pg.wait_for_timeout(2000)
        await pg.evaluate("(a)=>{const R=window.__rta;R.SAVE.unlocked=9;R.SAVE.set.fast=true;if(a.level>0||true)R.startLevel(a.level);a.dice.forEach(d=>R.forced.push(d));document.querySelector('#overlay .go')?.click()}",{'level':int(level),'dice':[int(x) for x in dice.split(',') if x]})
        await pg.wait_for_timeout(600)
        stop=sys.argv[7] if len(sys.argv)>7 else ''
        js="(stop)=>{window.__n=0;window.__iv=setInterval(()=>{const ov=document.querySelector('#overlay .card');if(ov){if(stop&&ov.textContent.includes(stop)){clearInterval(window.__iv);return}const b=ov.querySelector('.opt:not([disabled])')||ov.querySelector('#ok')||ov.querySelector('#go');if(b)b.click();return}const r=document.querySelector('#roll');if(r&&!r.disabled){window.__n++;r.click()}},350)}"
        await pg.evaluate(js,stop)
        await pg.wait_for_timeout(wait);await pg.screenshot(path=out)
        st=await pg.evaluate("JSON.stringify({lv:__rta.LV,rolls:window.__n,p:__rta.G.players.map(p=>[p.pos,p.score,p.bites,p.cp,p.skip]),turn:__rta.G.turn,taken:__rta.G.taken})")
        print(st,'errors',errs[:5]);await b.close()
asyncio.run(main())
