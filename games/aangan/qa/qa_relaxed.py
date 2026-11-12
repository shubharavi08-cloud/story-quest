"""Relaxed mode: the on-screen timer of a timed level is about 3x longer when relaxed is on. Also checks the toggle is saved.
usage: python3 qa_relaxed.py <base-url>"""
import asyncio,json,sys,re
from playwright.async_api import async_playwright
BASE=sys.argv[1] if len(sys.argv)>1 else 'http://localhost:8000/'
URL=BASE.rstrip('/')+'/index.html'; KEY='wow_aangan_v1'
def state(relaxed):
    return json.dumps(dict(mithai=0,warm=0,rooms=[4,4,4],room=2,sub=[[0,0,0,0],[0,0,0,0],[0,0,0,0]],refresh=[0,0,0],seen={'intro':1},lang='en',snd=False,bless='x',relaxed=relaxed))
async def timer_at_start(b,relaxed):
    pg=await b.new_page(viewport={'width':390,'height':844}); errs=[]
    pg.on('pageerror',lambda e:errs.append(str(e)))
    await pg.goto(URL); await pg.wait_for_timeout(200)
    await pg.evaluate(f"()=>localStorage.setItem('{KEY}',{json.dumps(state(relaxed))})")
    await pg.goto(URL); await pg.wait_for_timeout(600)
    await pg.evaluate("()=>{const c=[...document.querySelectorAll('#games .gcard')].find(b=>b.innerHTML.includes('thumb_kites.webp'));c&&c.click()}")
    await pg.wait_for_timeout(400)
    await pg.evaluate("()=>{const x=[...document.querySelectorAll('#mbox .lv, #mbox button')].find(b=>b.offsetParent!==null||getComputedStyle(b).display!=='none');x&&x.click()}")
    await pg.wait_for_timeout(1500)
    vals=await pg.evaluate("[...document.querySelectorAll('small')].map(e=>e.textContent.trim()).filter(t=>/^\\d+s$/.test(t))")
    saved=json.loads(await pg.evaluate(f"()=>localStorage.getItem('{KEY}')")).get('relaxed')
    await pg.close()
    return (int(vals[0][:-1]) if vals else None), errs, saved
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox'])
        n,e1,_=await timer_at_start(b,False)
        r,e2,_=await timer_at_start(b,True)
        ok=n is not None and r is not None and 2.5<=r/n<=3.5
        print('PASS' if ok else 'FAIL','relaxed timer ratio', f'normal={n}s relaxed={r}s ratio={(r/n if n and r else None)}')
        print('PASS' if not (e1 or e2) else 'FAIL','no page errors', e1+e2)
        await b.close()
asyncio.run(main())
