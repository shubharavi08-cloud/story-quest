import asyncio
from playwright.async_api import async_playwright
KEYS=['road-to-ayodhya','samudra-manthan','lagori','archery','pallanguzhi','catch-drops','navakankari','yamuna-thali']
async def clk(pg,sel,n=1,wait=300):
    for _ in range(n):
        try: await pg.click(sel,timeout=2000)
        except Exception: print('miss',sel)
        await pg.wait_for_timeout(wait)
JOBS={
 'road-to-ayodhya':('road-to-ayodhya.html',[('#start',1,800),('#roll',1,2500),('text=Climb up!',1,800),('#roll',1,2500)]),
 'samudra-manthan':('samudra-manthan.html',[('#go',1,800),('#pr',1,500),('#pl',1,500),('#pr',1,500),('#pl',1,900)]),
 'lagori':('lagori.html',[('#go',1,2500)]),
 'archery':('archery.html',[('#go',1,2000)]),
 'pallanguzhi':('pallanguzhi.html',[('#go',1,2000)]),
 'catch-drops':('catch-drops.html',[('#go',1,5000)]),
 'navakankari':('navakankari.html',[('#go',1,2000)]),
 'yamuna-thali':('yamuna-thali.html',[('#go',1,1500)]),
}
for i in range(1,7): JOBS[f'vm-t{i}']=(f'vedic-maths/#t{i}',[('button:has-text("Round 1")',1,1500),('button:has-text("Let\'s play")',1,1500)])
FIND='''()=>{const c=[...document.querySelectorAll('canvas,svg,[id*=stage],[class*=stage],[class*=board],[id*=board],[class*=arena],[class*=scene],[class*=play],main section,main>div')].filter(e=>e.offsetParent!==null);
let best=null,ba=0;for(const e of c){const r=e.getBoundingClientRect();const a=r.width*r.height;if(r.width>500&&r.height>250&&a>ba&&r.width<1300){ba=a;best=r}}
return best?{x:best.left+scrollX,y:best.top+scrollY,w:best.width,h:best.height}:null}'''
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch();ctx=await b.new_context(viewport={'width':1280,'height':1000},device_scale_factor=1)
        await ctx.add_init_script("for(const k of %r){try{localStorage.setItem('wow-watched-'+k,'1')}catch(e){}}"%KEYS)
        for name,(u,acts) in JOBS.items():
            pg=await ctx.new_page();await pg.goto('http://localhost:8765/'+u);await pg.wait_for_timeout(1500)
            for s,n,w in acts: await clk(pg,s,n,w)
            r=await pg.evaluate(FIND)
            if r:
                w=r['w'];h=min(r['h'],w*9/16);w=h*16/9
                x=r['x']+(r['w']-w)/2;y=r['y']
                await pg.screenshot(path=f'/home/claude/caps3/{name}.png',clip={'x':x,'y':y,'width':w,'height':h},full_page=True)
            else: print('nofind',name)
            await pg.close()
        await b.close()
asyncio.run(main())
