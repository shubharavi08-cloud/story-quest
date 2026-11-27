"""QA: land player 1 on given squares and play whatever card opens. usage: qa_square.py url outprefix 'level:square,level:square,...'"""
import sys,asyncio,json
from playwright.async_api import async_playwright
async def main():
    url,out,cases=sys.argv[1],sys.argv[2],[tuple(map(int,c.split(':'))) for c in sys.argv[3].split(',')]
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--use-angle=swiftshader','--enable-unsafe-swiftshader','--no-sandbox','--ignore-gpu-blocklist'])
        ctx=await b.new_context(viewport={'width':320,'height':515},device_scale_factor=2,is_mobile=True,has_touch=True)
        pg=await ctx.new_page();errs=[]
        pg.on('console',lambda m:errs.append(m.text) if m.type=='error' else None);pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.goto(url);await pg.wait_for_timeout(2000)
        for lv,sqn in cases:
            await pg.evaluate("([lv,n])=>{const R=window.__rta;R.SAVE.unlocked=9;R.SAVE.set.fast=true;R.startLevel(lv);document.querySelector('#overlay .go')?.click();R.place(n-1);R.forced.length=0;R.forced.push(1);document.querySelector('#roll').click()}",[lv,sqn])
            card=None
            for _ in range(40):
                await pg.wait_for_timeout(300)
                card=await pg.evaluate("document.querySelector('#overlay .card')?.innerText.slice(0,60)||''")
                busy=await pg.evaluate("__rta.G.busy")
                if card or not busy:break
            await pg.wait_for_timeout(500);await pg.screenshot(path=f'{out}_{lv}_{sqn}.png')
            for _ in range(80):
                done=await pg.evaluate("""()=>{const c=document.querySelector('#overlay .card');if(!c)return 'closed';const ok=c.querySelector('#ok');if(ok){ok.click();return 'ok'}
                  const st=[...c.querySelectorAll('.stone:not([disabled])')].sort((a,b)=>a.dataset.n-b.dataset.n)[0];if(st){st.click();return 'stone'}
                  const b=[...c.querySelectorAll('button:not([disabled])')].find(x=>!x.dataset.open&&!x.dataset.done);if(b)b.click();return 'click'}""")
                if done in('ok','closed'):break
                await pg.wait_for_timeout(300)
            for _ in range(40):
                await pg.wait_for_timeout(300)
                if not await pg.evaluate("__rta.G.busy && __rta.G.turn===0"):break
            st=await pg.evaluate("JSON.stringify(__rta.G.players.map(p=>[p.pos,p.score,p.skip,p.cp]))+' stones '+__rta.G.stones+' bridge '+__rta.G.bridge")
            print(lv,sqn,'|',(card or '').replace('\n',' / '),'|',st)
        print('errors',errs[:6]);await b.close()
asyncio.run(main())
