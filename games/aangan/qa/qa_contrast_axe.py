import asyncio,json
from playwright.async_api import async_playwright
KEY='wow_aangan_v1'
AXE='/home/claude/scratch_aangan/axe/node_modules/axe-core/axe.min.js'
def st(**kw):
    d=dict(mithai=0,warm=20,rooms=[1,0,0],room=0,sub=[[0,0,0,0],[0,0,0,0],[0,0,0,0]],refresh=[0,0,0],seen={'intro':1},lang='en',snd=False,bless='x'); d.update(kw); return json.dumps(d)
async def audit(pg,label):
    await pg.add_script_tag(path=AXE)
    r=await pg.evaluate("async()=>{const r=await axe.run(document,{runOnly:['color-contrast']});return {v:r.violations.flatMap(x=>x.nodes.map(n=>({t:n.target.join(' '),html:n.html.slice(0,80),msg:n.any.map(a=>a.message).join(' ').slice(0,140)}))),inc:r.incomplete.flatMap(x=>x.nodes.map(n=>({t:n.target.join(' '),html:n.html.slice(0,60)}))),passes:r.passes.reduce((a,x)=>a+x.nodes.length,0)}}")
    print(f"== {label}: failing={len(r['v'])} needs-review={len(r['inc'])} passing={r['passes']}",flush=True)
    for x in r['v'][:12]: print('  FAIL',x['t'][:60],'|',x['html'][:60],'|',x['msg'][:120])
    for x in r['inc'][:6]: print('  REVIEW',x['t'][:60],'|',x['html'][:60])
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox'])
        pg=await b.new_page(viewport={'width':390,'height':844})
        await pg.goto('http://localhost:8810/index.html'); await pg.wait_for_timeout(300)
        await pg.evaluate(f"()=>localStorage.setItem('{KEY}',{json.dumps(st())})")
        await pg.goto('http://localhost:8810/index.html'); await pg.wait_for_timeout(800)
        await audit(pg,'title screen')
        await pg.evaluate("()=>{[...document.querySelectorAll('button')].find(b=>b.offsetParent!==null&&/ಮುಂದುವರಿಸಿ|Continue|जारी|Play|खेलें|ಆಡಿ/.test(b.textContent))?.click()}")
        await pg.wait_for_timeout(1200)
        await audit(pg,'hub (courtyard)')
        await pg.evaluate("()=>{const c=[...document.querySelectorAll('#games .gcard')].find(b=>b.innerHTML.includes('thumb_carrom.webp'));c&&c.click()}")
        await pg.wait_for_timeout(700)
        await audit(pg,'game level menu')
        await pg.evaluate(f"()=>{{localStorage.setItem('{KEY}',{json.dumps(st(lang='hi'))})}}")
        await pg.goto('http://localhost:8810/index.html'); await pg.wait_for_timeout(800)
        await pg.evaluate("()=>{[...document.querySelectorAll('button')].find(b=>b.offsetParent!==null&&/जारी|खेलें|शुरू|आगे/.test(b.textContent))?.click()}")
        await pg.wait_for_timeout(1200)
        await audit(pg,'hub in Hindi')
        await b.close()
asyncio.run(main())
