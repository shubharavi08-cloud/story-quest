"""Aangan flow tests: every mini-game can be opened from the hub and started, and the house-complete finale plays to the end.
usage: python3 qa_flows.py <base-url e.g. http://localhost:8000/>"""
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
GAME_ROOM={'carrom':0,'rangoli':0,'dosa':1,'spice':1,'kites':2,'mango':2}
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox'])
        pg=await b.new_page(viewport={'width':390,'height':760})
        errs=[]; pg.on('pageerror',lambda e:errs.append(str(e)))
        async def load(s):
            await pg.goto(URL); await pg.wait_for_timeout(250)
            await pg.evaluate(f"()=>localStorage.setItem('{KEY}',{json.dumps(s)})")
            await pg.goto(URL); await pg.wait_for_timeout(600)
        # mini-games: open from the hub card, pick the first level, check the game screen is on
        for g,room in GAME_ROOM.items():
            await load(state(room=room,rooms=[4,4,4]))
            await pg.evaluate(f"()=>{{const c=[...document.querySelectorAll('#games .gcard')].find(b=>b.innerHTML.includes('thumb_{g}.webp'));c&&c.click()}}")
            await pg.wait_for_timeout(500)
            opened=await pg.evaluate("!!document.querySelector('#modal') && getComputedStyle(document.getElementById('modal')).display!=='none'")
            ck(f'{g}: hub card opens the level menu',opened)
            await pg.evaluate("()=>{const x=[...document.querySelectorAll('#mbox button')].find(b=>b.offsetParent!==null&&!/✕|×|Close|बंद|ಮುಚ್ಚಿ/.test(b.textContent));x&&x.click()}")
            await pg.wait_for_timeout(900)
            on=await pg.evaluate(f"document.getElementById('{g}')&&document.getElementById('{g}').classList.contains('on')")
            ck(f'{g}: first level starts and its screen is on',bool(on))
        ck('mini-games: no page errors',len(errs)==0,str(errs[:3]))
        # finale: complete the last stage of the last room, then play through to the house-complete message
        errs.clear()
        await load(state(rooms=[4,4,3],room=2,warm=30))
        for _ in range(3):
            await pg.evaluate("document.getElementById('rBtn').click()"); await pg.wait_for_timeout(200)
        done=False
        for step in range(400):
            await pg.wait_for_timeout(250)
            act=await pg.evaluate("""()=>{
              const vis=e=>{if(!e)return false;const c=getComputedStyle(e),r=e.getBoundingClientRect();return c.display!=='none'&&c.visibility!=='hidden'&&r.width>0&&r.height>0};
              const pick=[...document.querySelectorAll('.stylePick')].find(vis);
              if(pick){pick.click();return 'style'}
              const m=document.getElementById('modal');
              if(vis(m)&&/complete|पूरा|ಪೂರ್ಣ/i.test(m.innerText)) return 'done';
              const mb=[...document.querySelectorAll('#mbox button')].find(vis);
              if(mb){mb.click();return 'modal'}
              if(vis(document.getElementById('scene'))){document.getElementById('scene').click();return 'scene'}
              if(vis(document.getElementById('dim'))){document.getElementById('dim').click();return 'dim'}
              const h=document.getElementById('hub'); if(h&&h.classList.contains('admire')){h.click();return 'admire'}
              return 'wait'}""")
            if act=='done': done=True; break
        ck('finale: style choice, scenes and the house-complete message play through',done,f'steps={step}')
        ck('finale: no page errors',len(errs)==0,str(errs[:3]))
        await b.close()
    print('SUMMARY',sum(r[1] for r in R),'/',len(R))
asyncio.run(main())
