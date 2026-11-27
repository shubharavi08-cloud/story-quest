import sys,asyncio
from playwright.async_api import async_playwright
# usage: shot.py url tag WxH[@dpr] ...
async def main():
    url,tag,sizes=sys.argv[1],sys.argv[2],sys.argv[3:]
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--use-angle=swiftshader','--enable-unsafe-swiftshader','--no-sandbox','--ignore-gpu-blocklist'])
        for s in sizes:
            wh,_,dpr=s.partition('@');w,h=map(int,wh.split('x'))
            ctx=await b.new_context(viewport={'width':w,'height':h},device_scale_factor=float(dpr or 1),is_mobile=w<500,has_touch=w<500)
            pg=await ctx.new_page();errs=[]
            pg.on('console',lambda m:errs.append(m.text) if m.type=='error' else None);pg.on('pageerror',lambda e:errs.append(str(e)))
            await pg.goto(url);await pg.wait_for_timeout(2500)
            await pg.screenshot(path=f'/home/claude/shots/{tag}_{wh}_a.png')
            await pg.evaluate("document.querySelector('#overlay .go')?.click()")
            await pg.wait_for_timeout(1500)
            await pg.screenshot(path=f'/home/claude/shots/{tag}_{wh}_b.png')
            print(s,'errors:',errs[:5]);await ctx.close()
        await b.close()
asyncio.run(main())
