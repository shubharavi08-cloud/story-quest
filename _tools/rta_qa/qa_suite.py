"""Road to Ayodhya automated QA suite. Runs the real game in headless Chrome (turbo test mode) and records every check.
usage: python3 qa_suite.py <base-url> <out-prefix>   → <out>.json and <out>.md"""
import sys,asyncio,json,datetime
from playwright.async_api import async_playwright
BASE,OUT=sys.argv[1],sys.argv[2]
URL=BASE+('&' if '?' in BASE else '?')+'qa&turbo'
R=[];ERRS=[]
def rec(tid,req,proc,exp,act,ok,sev='P1'):
    print(tid,'PASS' if ok else 'FAIL','|',str(act)[:160],flush=True)
    R.append(dict(id=tid,requirement=req,procedure=proc,expected=str(exp),actual=str(act),result='PASS' if ok else 'FAIL',severity_if_fail=sev))
ARGS=['--use-angle=swiftshader','--enable-unsafe-swiftshader','--no-sandbox','--ignore-gpu-blocklist']
TWO="[{name:null,bot:false},{name:'B',bot:false}]"
async def newpage(b,w=390,h=760,init=None,url=None):
    ctx=await b.new_context(viewport={'width':w,'height':h},device_scale_factor=1,is_mobile=w<700,has_touch=w<700)
    if init:await ctx.add_init_script(init)
    pg=await ctx.new_page()
    pg.on('console',lambda m:ERRS.append(m.text) if m.type=='error' else None);pg.on('pageerror',lambda e:ERRS.append(str(e)))
    await pg.goto(url or URL);await pg.wait_for_function("window.__rta&&window.__rta.G",timeout=20000);return ctx,pg
async def start(pg,lv,cfg=TWO):
    await pg.evaluate(f"()=>{{const R=__rta;R.SAVE.set.free=true;R.startLevel({lv});R.setCfg({cfg});document.querySelector('#overlay #go')?.click()}}")
    await pg.wait_for_function("!document.querySelector('#overlay .card')")
async def idle(pg,card_ok=True):
    """wait until the current move has finished, or a card is waiting for the player"""
    for _ in range(200):
        st=await pg.evaluate("({busy:__rta.G.busy,card:!!document.querySelector('#overlay .card'),win:!!__rta.G.winner})")
        if st['card'] or not st['busy']:return st
        await pg.wait_for_timeout(50)
    return st
async def move(pg,frm,die):
    """put the player whose turn it is on square `frm` and roll `die`"""
    await pg.evaluate(f"()=>{{const R=__rta;R.place({frm},R.G.turn);R.forced.length=0;R.forced.push({die});document.querySelector('#roll').click()}}")
    await pg.wait_for_timeout(60);return await idle(pg)
async def who(pg):return await pg.evaluate("__rta.G.turn")
async def P(pg,i):return await pg.evaluate(f"(()=>{{const p=__rta.G.players[{i}];return {{pos:p.pos,score:p.score,bites:p.bites,cp:p.cp,skip:p.skip,items:p.items}}}})()")
async def close_card(pg,right=None):
    """answer/close whatever card is open. right=True picks the correct answer, False a wrong one"""
    for _ in range(120):
        r=await pg.evaluate("""(right)=>{const c=document.querySelector('#overlay .card');if(!c)return 'closed';const ok=c.querySelector('#ok');if(ok){ok.click();return 'ok'}
          const opts=[...c.querySelectorAll('.opt:not([disabled])')];if(opts.length&&opts[0].dataset.i!==undefined&&!c.classList.contains('mg')&&right!==null){(opts.find(o=>(o.dataset.i==='0')===right)||opts[0]).click();return 'ans'}
          const st=[...c.querySelectorAll('.stone:not([disabled])')].sort((a,b)=>a.dataset.n-b.dataset.n)[0];if(st){st.click();return 'stone'}
          const b=[...c.querySelectorAll('button:not([disabled])')].find(x=>!x.dataset.open&&!x.dataset.done);if(b)b.click();return 'click'}""",right)
        if r=='closed':return
        await pg.wait_for_timeout(120)
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path='/usr/bin/google-chrome',args=ARGS)
        ctx,pg=await newpage(b)
        LV=await pg.evaluate("__rta.LEVELS.map(l=>({L:l.L,S:l.S,sp:l.sp,bridge:l.bridge||null,games:l.games}))")
        # T01 numbering
        bad=[]
        for n in range(1,101):
            x,z=await pg.evaluate(f"__rta.sq({n})");r=(n-1)//10;c0=(n-1)%10;c=c0 if r%2==0 else 9-c0
            if abs(x-(c-4.5))>1e-6 or abs(z-(4.5-r))>1e-6:bad.append(n)
        rec('T01','Correct 10 × 10 numbering (1 bottom-left, rows alternate direction, 100 top-left)','Compare the engine position of all 100 squares with the board rule','0 mismatches',f'{len(bad)} mismatches',not bad,'P0')
        # T02 plain movement
        await start(pg,0);occupied={a for a,_ in LV[0]['L']}|{a for a,_ in LV[0]['S']}|{int(k) for k in LV[0]['sp']};bad=[];n_=0
        for frm in range(1,94):
            for die in (1,3,6):
                to=frm+die
                if to in occupied or frm in occupied or (frm*die)%7:continue
                i=await who(pg);await move(pg,frm,die);got=(await P(pg,i))['pos'];n_+=1
                if got!=to:bad.append((frm,die,got))
        rec('T02','Token moves exactly the number rolled','Level 1: %d moves from plain squares with dice 1, 3 and 6'%n_,'all land on start + dice',f'{len(bad)} wrong {bad[:3]}',not bad,'P0')
        # T03 / T04 every ladder and snake on every level
        badL=[];badS=[];nl=ns=0
        for li,lv in enumerate(LV):
            await start(pg,li)
            for a,t in lv['L']:
                i=await who(pg);s0=(await P(pg,i))['score'];await move(pg,a-1,1);q=await P(pg,i);nl+=1
                if q['pos']!=t or q['score']-s0!=10:badL.append((li+1,a,t,q['pos']))
            for a,t in lv['S']:
                await pg.evaluate("__rta.G.players.forEach(p=>p.cp=0)")
                i=await who(pg);b0=(await P(pg,i))['bites'];await move(pg,a-1,1);q=await P(pg,i);ns+=1
                if q['pos']!=t or q['bites']-b0!=1:badS.append((li+1,a,t,q['pos']))
        rec('T03','Every ladder lifts the token to its top and gives +10',f'All 9 levels: land on the foot of each of {nl} ladders','token on ladder top, +10 points',f'{len(badL)} wrong {badL[:3]}',not badL,'P0')
        rec('T04','Every snake drops the token to its tail',f'All 9 levels: land on the head of each of {ns} snakes','token on snake tail, bites +1',f'{len(badS)} wrong {badS[:3]}',not badS,'P0')
        # T05 dice faces
        await start(pg,0);bad=[]
        for die in range(1,7):
            i=await who(pg);await move(pg,20,die);shown=await pg.evaluate("document.querySelector('#rolled').textContent")
            if shown!=str(die):bad.append((die,shown))
            await close_card(pg,True);await idle(pg)
        rec('T05','Dice gives 1 to 6 and the rolled number is shown','Roll each face once; read the number badge in the dice tray','badge shows 1,2,3,4,5,6',f'{len(bad)} wrong {bad}',not bad)
        # T06 turns
        await start(pg,0);await move(pg,20,3);t1=await who(pg);await move(pg,60,6);t2=await who(pg);await move(pg,60,2);t3=await who(pg)
        rec('T06','Turns pass correctly; a six gives another roll','2 players: P1 rolls 3 → P2; P2 rolls 6 → P2 again; P2 rolls 2 → P1','turn 1, 1, 0',f'{t1}, {t2}, {t3}',(t1,t2,t3)==(1,1,0),'P0')
        # T07 double input
        await start(pg,0);await pg.evaluate("()=>{const R=__rta;R.place(20,0);R.forced.length=0;R.forced.push(2,2,2,2);for(let k=0;k<6;k++)document.querySelector('#roll').click()}");await pg.wait_for_timeout(400);await idle(pg)
        pos=(await P(pg,0))['pos'];left=await pg.evaluate("__rta.forced.length")
        rec('T07','Repeated taps on Roll cannot cause a double move','Tap Roll 6 times at once with dice 2 queued','one move only (square 22), 3 dice unused',f'square {pos}, {left} unused',pos==22 and left==3,'P0')
        # T08 bounce + T09 win/unlock/replay
        await start(pg,0);i=await who(pg);await move(pg,98,5);bp=(await P(pg,i))['pos']
        rec('T08','Exact roll needed to finish; extra steps bounce back','From 98 roll 5','square 97',f'square {bp}',bp==97)
        ctx2,pg2=await newpage(b);locked=await pg2.evaluate("()=>{document.querySelector('#overlay #go')?.click();document.querySelector('#lvchip').click();const d=[...document.querySelectorAll('#overlay [data-l]')].map(x=>x.disabled);document.querySelector('#overlay #cl').click();return d}")
        await pg2.evaluate("()=>{const R=__rta;R.place(99,0);R.forced.push(1);document.querySelector('#roll').click()}");await pg2.wait_for_selector('#overlay #nx',timeout=15000)
        sv=await pg2.evaluate("({u:__rta.SAVE.unlocked,s:__rta.SAVE.stars[0],w:!!__rta.G.winner,cur:__rta.SAVE.cur})")
        rec('T09','Reaching 100 wins the level, awards stars and unlocks the next level','New player: check map (only level 1 open), then move 99 → 100','before: only level 1 open; after: winner, stars saved, level 2 unlocked',f"before open={[not x for x in locked].count(True)}; after winner={sv['w']} stars={sv['s']} unlocked={sv['u']}",locked[0] is False and all(locked[1:]) and sv['w'] and sv['u']==2 and sv['s']>=1,'P0')
        await pg2.evaluate("document.querySelector('#overlay #ag').click()");await pg2.wait_for_timeout(300);rp=await pg2.evaluate("({pos:__rta.G.players[0].pos,lv:__rta.LV,w:!!__rta.G.winner})")
        rec('T10','Completed levels can be replayed','On the win card tap Play again','level 1 restarts at square 0',f"level {rp['lv']+1}, square {rp['pos']}",rp['pos']==0 and rp['lv']==0 and not rp['w'])
        # T11 save / restore after refresh
        await pg2.evaluate("()=>{document.querySelector('#overlay #go')?.click();const R=__rta;R.place(30,0);R.forced.push(4);document.querySelector('#roll').click()}");await pg2.wait_for_timeout(1500)
        for _ in range(100):
            if await pg2.evaluate("!__rta.G.busy&&__rta.G.turn===0&&!document.querySelector('#overlay .card')"):break
            await pg2.evaluate("document.querySelector('#overlay #ok')?.click()");await pg2.wait_for_timeout(100)
        before=await pg2.evaluate("JSON.stringify(__rta.G.players.map(p=>[p.pos,p.score]))+__rta.LV");await pg2.reload();await pg2.wait_for_function("window.__rta&&window.__rta.G")
        after=await pg2.evaluate("JSON.stringify(__rta.G.players.map(p=>[p.pos,p.score]))+__rta.LV");intro=await pg2.evaluate("!!document.querySelector('#overlay .card')")
        rec('T11','Progress is saved automatically and restored after a refresh','Play a turn, reload the page','same level, squares and scores; no intro card',f'before {before} after {after} intro={intro}',before==after and not intro,'P0')
        await ctx2.close()
        # T12 special squares
        want={'s':'+10 points','t':'+20 points, treasure removed','k':'checkpoint stored','b':'same player rolls again','y':'story card, +5','m':'mystery card','q':'question card; right answer +15 and 2 steps','o':'question card; wrong answer = miss a turn','c':'mini-game card opens and closes'}
        for ty in want:
            li=next(i for i,l in enumerate(LV) if ty in l['sp'].values());n=int(next(k for k,v in LV[li]['sp'].items() if v==ty))
            await start(pg,li);i=await who(pg);s0=await P(pg,i);st=await move(pg,n-1,1);card=await pg.evaluate("document.querySelector('#overlay .card')?.innerText.slice(0,40).replace(/\\n/g,' ')||''")
            if ty=='q':await close_card(pg,True)
            elif ty=='o':await close_card(pg,False)
            else:await close_card(pg,None)
            await idle(pg);q=await P(pg,i);turn=await who(pg);taken=await pg.evaluate(f"!!__rta.G.taken[{n}]")
            ok={'s':q['score']-s0['score']==10,'t':q['score']-s0['score']==20 and taken,'k':q['cp']==n,'b':turn==i,'y':bool(card) and q['score']-s0['score']==5,'m':bool(card),'q':bool(card) and q['score']-s0['score']>=15 and q['pos']>=n+2,'o':bool(card) and q['skip']==1,'c':bool(card)}[ty]
            rec('T12-'+ty,f'Special square: {want[ty]}',f'Level {li+1}: land on square {n}',want[ty],f"card='{card}' score {s0['score']}→{q['score']} square {q['pos']} cp {q['cp']} skip {q['skip']}",ok)
        # T13 every mini-game
        await start(pg,1);done=[];kinds=['bow','memory','paths','deer','order','team','bridge','dice2']
        for k in kinds:
            await pg.evaluate(f"__rta.game('{k}')");await pg.wait_for_selector('#overlay .card.mg');title=await pg.evaluate("document.querySelector('#overlay .card.mg h3').textContent");await close_card(pg,None)
            for _ in range(100):
                r=await pg.evaluate("window.__mg")
                if r:break
                await pg.wait_for_timeout(100)
            if r and 'ok' in r and not await pg.evaluate("!!document.querySelector('#overlay .card')"):done.append(title)
        rec('T13','Each of the 8 mini-games opens, can be played to the end and returns to the board','Open every mini-game, play it through, close the result','8 mini-games completed',f'{len(done)}: {", ".join(done)}',len(done)==8)
        # T14 checkpoint
        li=next(i for i,l in enumerate(LV) if 'k' in l['sp'].values());k=max(int(a) for a,v in LV[li]['sp'].items() if v=='k');sn=next(((a,t) for a,t in LV[li]['S'] if t<k and a>k),None)
        await start(pg,li);i=await who(pg);await move(pg,k-1,1)
        if sn:
            await pg.evaluate(f"__rta.G.turn={i}");await move(pg,sn[0]-1,1);await pg.wait_for_timeout(600);await idle(pg);q=await P(pg,i)
            rec('T14','A checkpoint stops a snake from pulling the player below it',f'Level {li+1}: reach checkpoint {k}, then land on snake {sn[0]}→{sn[1]}',f'token returns to {k}',f"token on {q['pos']}",q['pos']==k)
        # T15 bridge
        li=next(i for i,l in enumerate(LV) if l['bridge']);stones=[int(a) for a,v in LV[li]['sp'].items() if v=='t'][:3];await start(pg,li)
        for s_ in stones:
            await pg.evaluate("__rta.G.turn=0");await move(pg,s_-1,1);await pg.wait_for_timeout(400);await idle(pg)
        built=await pg.evaluate("__rta.G.bridge");await pg.evaluate("__rta.G.turn=0");a,t=LV[li]['bridge'];await move(pg,a-1,1);q=await P(pg,0)
        rec('T15','Rameswaram: three stones build the bridge, which then works as a ladder',f'Level {li+1}: collect 3 stones, then land on {a}',f'bridge built; token goes {a} → {t}',f"built={built}; token on {q['pos']}",built and q['pos']==t)
        # T16 player configurations
        res=[]
        for cfg,name in [("[{name:null,bot:false},{name:'Diya',bot:true}]",'1 person + Diya'),(TWO,'2 people'),("[{name:null,bot:false},{name:'B',bot:false},{name:'C',bot:false},{name:'Diya',bot:true}]",'3 people + Diya')]:
            await start(pg,0,cfg);n=await pg.evaluate("__rta.G.players.length");await pg.evaluate("()=>{__rta.forced.push(2);document.querySelector('#roll').click()}");await pg.wait_for_timeout(900)
            for _ in range(60):
                if await pg.evaluate("!__rta.G.busy&&!__rta.G.players[__rta.G.turn].bot"):break
                await pg.wait_for_timeout(100)
            cards=await pg.evaluate("document.querySelectorAll('#players .pc').length");moved=await pg.evaluate("__rta.G.players.filter(p=>p.pos>0).length");res.append((name,n,cards,moved))
        ok=all(n==c and m>=1 for _,n,c,m in res)
        rec('T16','Different player set-ups work (person vs Diya, two people, four players)','Start each set-up and play one round','a card and a token per player; turns move on',str(res),ok)
        # T17 buttons and settings
        await start(pg,0);out={}
        for bid,label in [('#m-how','how to play'),('#m-map','journey map'),('#m-who','players'),('#m-ach','badges')]:
            await pg.evaluate("document.querySelector('#menu').click()");await pg.wait_for_selector('#overlay '+bid);await pg.evaluate(f"document.querySelector('#overlay {bid}').click()");await pg.wait_for_timeout(120)
            out[label]=await pg.evaluate("!!document.querySelector('#overlay .card #cl')");await pg.evaluate("document.querySelector('#overlay #cl').click()");await pg.wait_for_timeout(80);await pg.evaluate("document.querySelector('#overlay #cl')?.click()");await pg.wait_for_timeout(80)
        await pg.evaluate("document.querySelector('#music').click();document.querySelector('#sound').click()");tog=await pg.evaluate("[document.querySelector('#music').getAttribute('aria-pressed'),document.querySelector('#sound').getAttribute('aria-pressed'),__rta.SAVE.set.music,__rta.SAVE.set.sfx]")
        await pg.evaluate("document.querySelector('#menu').click()");await pg.wait_for_selector('#overlay #s-lang');await pg.evaluate("document.querySelector('#overlay #s-lang [data-v=kn]').click()");await pg.wait_for_timeout(200);chip=await pg.evaluate("document.querySelector('#lvchip').textContent");await pg.evaluate("document.querySelector('#overlay #s-lang [data-v=en]').click()");await pg.wait_for_timeout(150);await pg.evaluate("document.querySelector('#overlay #cl').click()")
        ok=all(out.values()) and tog==['false','false',False,False] and 'ಹಂತ' in chip
        rec('T17','Every button works: menu, rules, journey map, players, badges, music, sounds, language','Open each menu item and close it; toggle music and sounds; switch to Kannada and back','all open and close; toggles saved; header text changes language',f'{out} toggles={tog} chip="{chip}"',ok)
        await ctx.close()
        # T18 layouts
        bad=[];sizes=[(320,515),(360,640),(375,667),(390,844),(412,915),(768,1024),(800,450),(821,462),(907,510),(1366,768)]
        for w,h in sizes:
            c3,p3=await newpage(b,w,h);await p3.evaluate("document.querySelector('#overlay #go')?.click()");await p3.wait_for_timeout(250)
            m=await p3.evaluate("""()=>{const r=s=>document.querySelector(s).getBoundingClientRect(),W=innerWidth,H=innerHeight,ins=x=>x.left>=-1&&x.top>=-1&&x.right<=W+1&&x.bottom<=H+1;
              const top=r('.top'),rail=r('.rail'),roll=r('#roll'),tray=r('#tray'),pl=r('#players');const portrait=W<H;const board=portrait?Math.min(W,rail.top-top.bottom):Math.min(rail.left,H-top.bottom);
              return {scroll:document.documentElement.scrollWidth>W||document.documentElement.scrollHeight>H,inside:ins(top)&&ins(roll)&&ins(tray)&&ins(pl),board:Math.round(board),roll:[Math.round(roll.width),Math.round(roll.height)]}}""")
            if m['scroll'] or not m['inside'] or m['board']<min(w,h)*0.55 or m['roll'][1]<40:bad.append((w,h,m))
            await c3.close()
        rec('T18','Fits phone, tablet and desktop screens with no scrolling; controls stay on screen',f'Load at {len(sizes)} sizes from 320×515 to 1366×768 (incl. CrazyGames 800×450, 821×462, 907×510)','no scroll, header and controls inside the screen, board at least 55% of the short side',f'{len(bad)} failing {bad[:2]}',not bad)
        # T19 storage blocked (private browsing)
        c4,p4=await newpage(b,390,760,init="Object.defineProperty(window,'localStorage',{get(){throw new Error('blocked')}})")
        await p4.evaluate("()=>{document.querySelector('#overlay #go')?.click();__rta.forced.push(3);document.querySelector('#roll').click()}");await p4.wait_for_timeout(1200);pos=await p4.evaluate("__rta.G.players[0].pos")
        rec('T19','Game works when browser storage is blocked (private browsing)','Make localStorage throw, load, roll 3','game loads and the token moves to 3',f'token on {pos}',pos==3);await c4.close()
        # T20 network + size (standalone build)
        reqs=[];c5=await b.new_context(viewport={'width':390,'height':760});p5=await c5.new_page();sizes_={}
        async def onresp(r):
            try:sizes_[r.url]=len(await r.body())
            except Exception:sizes_[r.url]=0
        p5.on('response',lambda r:asyncio.ensure_future(onresp(r)));p5.on('request',lambda r:reqs.append(r.url))
        t0=datetime.datetime.now();await p5.goto(BASE);await p5.wait_for_selector('#overlay #go');dt=(datetime.datetime.now()-t0).total_seconds();await p5.wait_for_timeout(800)
        origin=BASE.split('/games/')[0];ext=[u for u in reqs if not u.startswith(origin) and not u.startswith('data:')];total=sum(sizes_.values())
        rec('T20','Standalone build makes no outside network requests (fonts and libraries are bundled)','Load the page and list every request','0 requests to other sites',f'{len(reqs)} requests, {len(ext)} external {ext[:2]}',not ext)
        rec('T21','Initial download is small (CrazyGames: 50 MB max, 20 MB target for mobile)','Sum the size of every file loaded at start','under 20 MB',f'{total/1048576:.2f} MB in {len(sizes_)} files; ready in {dt:.1f}s on the test machine',total<20*1048576);await c5.close()
        rec('T22','No console or script errors anywhere in the run','Collect browser errors during all tests above','0 errors',f'{len(ERRS)} {ERRS[:3]}',not ERRS,'P0')
        await b.close()
    json.dump(dict(date=str(datetime.date.today()),url=BASE,results=R),open(OUT+'.json','w'),indent=1,ensure_ascii=False)
    md=['| ID | Requirement | Procedure | Expected | Actual | Result |','|---|---|---|---|---|---|']+[f"| {r['id']} | {r['requirement']} | {r['procedure']} | {r['expected']} | {r['actual'].replace('|','/')} | {r['result']} |" for r in R]
    open(OUT+'.md','w').write('\n'.join(md)+'\n')
    print('TOTAL',sum(r['result']=='PASS' for r in R),'/',len(R))
asyncio.run(main())
