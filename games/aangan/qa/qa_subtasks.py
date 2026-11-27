import asyncio,json
from playwright.async_api import async_playwright
URL='http://localhost:8765/index.html'; KEY='wow_aangan_v1'
results=[]
def check(name,ok,info=''):
    results.append((name,bool(ok))); print('PASS' if ok else 'FAIL',name,'|',info,flush=True)
BASE=lambda **kw: json.dumps({**dict(mithai=0,warm=0,rooms=[0,0,0],room=0,sub=[[0,0,0,0],[0,0,0,0],[0,0,0,0]],refresh=[0,0,0],seen={'intro':1},lang='en',snd=False,bless='x'),**kw})
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox'])
        pg=await b.new_page(viewport={'width':390,'height':760})
        errs=[]
        pg.on('pageerror',lambda e:errs.append(str(e)))
        pass
        async def load(state):
            await pg.goto(URL); await pg.wait_for_timeout(300)
            await pg.evaluate(f"()=>localStorage.setItem('{KEY}',{json.dumps(state)})")
            await pg.goto(URL); await pg.wait_for_timeout(700)
            await pg.evaluate("()=>{document.getElementById('dim')&&(document.getElementById('dim').style.display='none')}")
        async def click(): await pg.evaluate("document.getElementById('rBtn').click()"); await pg.wait_for_timeout(150)
        async def st(): return json.loads(await pg.evaluate(f"()=>localStorage.getItem('{KEY}')"))
        async def rsub(): return await pg.evaluate("document.getElementById('rSub').textContent")
        await load(BASE(warm=100))
        await click(); s=await st()
        check('first subtask pays share 1 (cost 3)',s['warm']==99 and s['sub'][0][0]==1,f"warm={s['warm']} sub={s['sub'][0][0]}")
        check('rSub shows task 2 of 3',('2 of 3' in await rsub()),await rsub())
        await click(); await click(); s=await st()
        check('third subtask completes stage 0',s['rooms'][0]==1 and s['warm']==97 and s['sub'][0][0]==0,f"rooms={s['rooms']} warm={s['warm']}")
        await load(BASE(warm=10,rooms=[2,0,0]))
        await click(); await click(); s=await st()
        check('cost-10 stage: shares 3 and 3 paid',s['warm']==4 and s['sub'][0][2]==2,f"warm={s['warm']} sub={s['sub'][0][2]}")
        await click(); s=await st()
        check('cost-10 stage: last share 4 completes it',s['warm']==0 and s['rooms'][0]==3,f"warm={s['warm']} rooms={s['rooms']}")
        await load(BASE(warm=0))
        await click(); s=await st()
        check('no warmth: subtask not paid',s['sub'][0][0]==0 and s['warm']==0)
        await load(BASE(rooms=[4,0,0],warm=0))
        vis=await pg.evaluate("getComputedStyle(document.getElementById('rBtn')).display")
        check('completed room shows refreshment button',vis!='none',f'display={vis}; sub={await rsub()}')
        await click(); await pg.wait_for_timeout(300); s=await st()
        check('refreshment marked used',s['refresh'][0]==1,f"refresh={s['refresh']}")
        for lang in ['kn','hi']:
            await load(BASE(warm=50,lang=lang))
            r=await rsub(); check(f'{lang} subtask line renders',('/ 3' in r or '/3' in r) and len(r)>8,r)
            if lang=='kn': await pg.screenshot(path='/home/claude/scratch_aangan/kn_hub.png')
        check('no page errors',len(errs)==0,str(errs[:3]))
        await b.close()
    print('SUMMARY',sum(r[1] for r in results),'/',len(results))
asyncio.run(main())
