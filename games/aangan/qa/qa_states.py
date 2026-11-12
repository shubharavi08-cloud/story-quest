"""Aangan state tests: room/stage progression, refreshment, locks, house completion, persistence, languages.
usage: python3 qa_states.py <base-url e.g. http://localhost:8000/>"""
import asyncio,json,sys
from playwright.async_api import async_playwright
BASE=sys.argv[1] if len(sys.argv)>1 else 'http://localhost:8000/'
URL=BASE.rstrip('/')+'/index.html'; KEY='wow_aangan_v1'
R=[]
def ck(n,ok,info=''):
    R.append((n,bool(ok))); print('PASS' if ok else 'FAIL',n,'|',info,flush=True)
def state(**kw):
    base=dict(mithai=0,warm=0,rooms=[0,0,0],room=0,sub=[[0,0,0,0],[0,0,0,0],[0,0,0,0]],refresh=[0,0,0],seen={'intro':1},lang='en',snd=False,bless='x')
    base.update(kw); return json.dumps(base)
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox'])
        pg=await b.new_page(viewport={'width':390,'height':760})
        errs=[]; pg.on('pageerror',lambda e:errs.append(str(e)))
        async def load(s):
            await pg.goto(URL); await pg.wait_for_timeout(250)
            await pg.evaluate(f"()=>localStorage.setItem('{KEY}',{json.dumps(s)})")
            await pg.goto(URL); await pg.wait_for_timeout(600)
        async def click(): await pg.evaluate("document.getElementById('rBtn').click()"); await pg.wait_for_timeout(120)
        async def st(): return json.loads(await pg.evaluate(f"()=>localStorage.getItem('{KEY}')"))
        async def rsub(): return await pg.evaluate("document.getElementById('rSub').textContent")
        async def locks(): return await pg.evaluate("document.querySelectorAll('.rtab.lock').length")

        await load(state(warm=0))
        ck('fresh: room 1 stage 1 subtask 1/3 shown',"1 / 3" in (await rsub()) or "1 of 3" in (await rsub()) or "1 / 3" in (await rsub()),await rsub())
        ck('fresh: rooms 2 and 3 locked',await locks()==2,f'locks={await locks()}')

        await load(state(warm=12))
        for i in range(12): await click()
        s=await st()
        ck('12 warmth: stage 1 (3) done, stage 2 (6) done, stage 3 first share (3 of 10) paid',
           s['rooms']==[2,0,0] and s['warm']==0 and s['sub'][0][2]==1,f"rooms={s['rooms']} warm={s['warm']} sub={s['sub'][0]}")

        await load(state(warm=100,rooms=[2,0,0]))
        await locks()
        ck('room 2 still locked until room 1 has 3 stages',await locks()==2,f'locks={await locks()}')
        await load(state(warm=100,rooms=[3,0,0]))
        ck('room 2 unlocks after room 1 reaches stage 3',await locks()==1,f'locks={await locks()}')

        await load(state(warm=0,rooms=[4,0,0]))
        vis=await pg.evaluate("getComputedStyle(document.getElementById('rBtn')).display")
        ck('room complete: refreshment button visible',vis!='none',vis)
        await click(); s=await st()
        ck('refreshment: used flag set after one press',s['refresh'][0]==1,f"refresh={s['refresh']}")
        await pg.wait_for_timeout(300)
        vis=await pg.evaluate("getComputedStyle(document.getElementById('rBtn')).display")
        ck('refreshment: button hidden after use',vis=='none',vis)

        await load(state(warm=40,rooms=[0,0,0],sub=[[2,0,0,0],[0,0,0,0],[0,0,0,0]]))
        ck('persist: partial subtask progress shown after reload',"3 / 3" in (await rsub()) or "3 of 3" in (await rsub()),await rsub())
        await click(); s=await st()
        ck('persist: last subtask finishes stage 1 after reload',s['rooms'][0]==1 and s['sub'][0][0]==0,f"rooms={s['rooms']} sub={s['sub'][0]}")

        await load(state(warm=30,rooms=[4,4,3],room=2))
        for i in range(3): await click()
        await pg.wait_for_timeout(300); s=await st()
        ck('house: final room stage completes and saves all rooms',s['rooms']==[4,4,4],f"rooms={s['rooms']}")
        await pg.wait_for_timeout(9000)
        styled=await pg.evaluate("[...document.querySelectorAll('.stylePick')].filter(e=>e.offsetParent!==null).length")
        ck('house: style picker is visible after final stage',styled>0,f'visible stylePick={styled}')

        for lang in ['en','hi','kn']:
            await load(state(warm=5,lang=lang))
            t=await pg.evaluate("document.getElementById('rTitle').textContent")
            ck(f'language {lang}: stage title renders',len(t)>0,t)
        ck('no page errors across all states',len(errs)==0,str(errs[:3]))
        await b.close()
    print('SUMMARY',sum(r[1] for r in R),'/',len(R))
asyncio.run(main())
