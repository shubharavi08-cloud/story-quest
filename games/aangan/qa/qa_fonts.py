import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox'])
        pg=await b.new_page(); fails=[]
        pg.on('requestfailed',lambda r: fails.append((r.url,r.failure)))
        await pg.goto('http://localhost:8781/index.html'); await pg.wait_for_timeout(2500)
        st=await pg.evaluate("[...document.fonts].map(f=>[f.family,f.weight,f.status,f.unicodeRange.slice(0,20)])")
        for s in st: print(s)
        for f in fails[:8]: print('FAIL',f)
        await b.close()
asyncio.run(main())
