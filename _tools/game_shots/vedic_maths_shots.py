import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch();ctx=await b.new_context(viewport={'width':1280,'height':1000})
        for i in range(1,7):
            pg=await ctx.new_page();await pg.goto(f'http://localhost:8765/vedic-maths/#t{i}');await pg.wait_for_timeout(1200)
            await pg.click('button:has-text("Round 1")');await pg.wait_for_timeout(1200)
            t=await pg.eval_on_selector_all('button','e=>e.filter(b=>b.offsetParent).map(b=>(b.id||"")+":"+b.textContent.trim().slice(0,25))')
            print(i,t[:10])
            btn=[x for x in t if 'play' in x.lower() or 'cart' in x.lower()]
            if btn:
                bid=btn[0].split(':')[0]
                if bid: await pg.click('#'+bid)
                else: await pg.click('button:has-text("%s")'%btn[0].split(':',1)[1][:8])
                await pg.wait_for_timeout(1800)
            r=await pg.evaluate('''()=>{const e=[...document.querySelectorAll('section,div')].filter(e=>e.offsetParent&&!e.hidden).map(e=>[e,e.getBoundingClientRect()]).filter(([e,r])=>r.width>900&&r.height>350&&r.width<1250).sort((a,b)=>a[1].height*a[1].width-b[1].height*b[1].width)[0];if(!e)return null;const r=e[1];return {x:r.left+scrollX,y:r.top+scrollY,w:r.width,h:r.height}}''')
            w=r['w'];h=min(r['h'],w*9/16);w=h*16/9
            await pg.screenshot(path=f'/home/claude/caps3/vm-t{i}.png',clip={'x':r['x']+(r['w']-w)/2,'y':r['y'],'width':w,'height':h},full_page=True)
            await pg.close()
        await b.close()
asyncio.run(main())
