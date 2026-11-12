import asyncio,json
from playwright.async_api import async_playwright
U='http://localhost:8769/'
res=[]
def ck(n,ok,i=''): res.append(ok); print('PASS' if ok else 'FAIL',n,'|',i,flush=True)
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox'])
        ctx=await b.new_context(viewport={'width':390,'height':760})
        pg=await ctx.new_page(); errs=[]
        pg.on('pageerror',lambda e:errs.append(str(e)))
        r=await pg.goto(U+'index.html'); ck('index loads',r.status==200)
        m=await pg.evaluate("async()=>{const r=await fetch('manifest.webmanifest');return r.ok?await r.json():null}")
        ck('manifest valid',m and m['display']=='standalone' and len(m['icons'])==2,str(m and m['name']))
        for ic in ['icons/icon-192.png','icons/icon-512.png']:
            st=await pg.evaluate(f"async()=>(await fetch('{ic}')).status"); ck(f'icon {ic}',st==200)
        await pg.wait_for_function("navigator.serviceWorker.ready.then(()=>true)",timeout=20000)
        await pg.wait_for_timeout(4000)
        n=await pg.evaluate("caches.open('aangan-v2').then(c=>c.keys()).then(k=>k.length)")
        ck('service worker cached the shell',n>=80,f'cached={n}')
        await ctx.set_offline(True)
        await pg.reload(); await pg.wait_for_timeout(1200)
        title=await pg.title(); btn=await pg.evaluate("!!document.querySelector('#langs')||!!document.body.innerText.length")
        ck('reloads offline',btn,f'title={title!r}')
        bg=await pg.evaluate("getComputedStyle(document.body).backgroundImage.length>0||document.querySelectorAll('canvas').length>=0")
        ck('no page errors offline',len(errs)==0,str(errs[:2]))
        await b.close()
    print('SUMMARY',sum(res),'/',len(res))
asyncio.run(main())
