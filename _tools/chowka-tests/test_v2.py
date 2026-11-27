import sys
from playwright.sync_api import sync_playwright
URL="file:///home/claude/chowka/index.html";errs=[];ok=[]
def check(name,cond,info=""):
    (ok.append(name) if cond else errs.append(f"FAIL {name} {info}"))
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={"width":390,"height":844})
    pg.on("pageerror",lambda e:errs.append("pageerror "+str(e)))
    pg.goto(URL);pg.wait_for_timeout(300)
    # ---- rule unit tests
    r=pg.evaluate("""()=>{const out={};CB.DEBUG.fast=true;CB.S.sound=false;
      for(const N of [5,7]){CB.S.size=N;CB.S.count=2;CB.S.types=['cpu','cpu'];CB.newGame();const G=CB.state();out['pawns'+N]=G.players[0].pawns.length;out['cow'+N]=G.cowries;out['last'+N]=G.last;}
      CB.S.size=5;CB.newGame();let G=CB.state();const P0=G.players[0],P1=G.players[1];
      // jodi parity & half step
      P0.pawns=[G.gate+1,G.gate+1,0,0];P0.hit=true;
      out.jodiOdd=CB.evalMove(0,G.gate+1,3).why;out.jodiEven=CB.evalMove(0,G.gate+1,2).mv;
      // opponent jodi blocks single pawns passing
      const k=G.players[0].path[G.gate+3];let j=0;for(;j<G.last;j++){const c=P1.path[j];if(c[0]===k[0]&&c[1]===k[1])break}
      P1.pawns=[j,j,0,0];P0.pawns=[G.gate+1,0,0,0];
      out.blockPass=CB.evalMove(0,G.gate+1,3).why;out.blockLand=CB.evalMove(0,G.gate+1,2).why;out.beforeOk=CB.evalMove(0,G.gate+1,1).ok;
      // gate (traditional, no hit)
      P0.pawns=[G.gate-1,0,0,0];P0.hit=false;P1.pawns=[0,0,0,0];out.gate=CB.evalMove(0,G.gate-1,2).why;
      // exact finish
      P0.hit=true;P0.pawns=[G.last-1,0,0,0];out.exact=CB.evalMove(0,G.last-1,2).why;
      return out}""")
    pth=pg.evaluate("()=>[0,1,2,3].map(s=>CB.path(7,s))")
    p=pth[0]
    check("7-house path length 49",len(p)==49,len(p))
    check("7-house middle ring starts on its X corner",p[23]==[6,2] and p[24]==[5,1] and p[25]==[4,1],p[22:27])
    check("7-house middle ring ends beside entry, then up",p[38]==[5,3] and p[39]==[5,2] and p[40]==[4,2],p[37:42])
    check("7-house inner ring clockwise, lotus from below",p[40:49]==[[4,2],[3,2],[2,2],[2,3],[2,4],[3,4],[4,4],[4,3],[3,3]],p[40:])
    check("no house visited twice",len(set(map(tuple,p)))==len(p))
    adj=all(abs(a[0]-b[0])+abs(a[1]-b[1])==1 for q in pth for i,(a,b) in enumerate(zip(q,q[1:])) if i!=23)
    check("all other 7-house steps adjacent (all seats)",adj)
    check("4 pawns 5x5",r["pawns5"]==4);check("6 pawns 7x7",r["pawns7"]==6);check("6 cowries 7x7",r["cow7"]==6)
    check("jodi odd blocked",r["jodiOdd"]=="jodiOdd",r);check("jodi half step",r["jodiEven"] and r["jodiEven"]["step"]==1,r)
    check("jodi blocks passing",r["blockPass"]=="block",r);check("jodi blocks landing",r["blockLand"]=="block",r);check("can stop before jodi",r["beforeOk"],r)
    check("gate locked",r["gate"]=="gate",r);check("exact needed",r["exact"]=="exact",r)
    # outer capture of 2 pawns + three-bonus cancel (live flow)
    r2=pg.evaluate("""async()=>{CB.DEBUG.fast=true;CB.S.size=5;CB.S.count=2;CB.S.types=['cpu','cpu'];CB.S.entry='hard';
      CB.DEBUG.force=[{ups:[true,true,true,true],v:4,extra:true},{ups:[true,true,true,true],v:4,extra:true},{ups:[true,true,true,true],v:4,extra:true}];
      CB.DEBUG.log=[];CB.start();await new Promise(r=>setTimeout(r,400));return {three:CB.DEBUG.log.some(x=>x.three===0),p0:CB.state().players[0].pawns}}""")
    check("3 bonus throws cancel turn (cpu)",r2["three"],r2)
    pg.evaluate("()=>{CB.state().over=true}")
    # ---- pool rule (bonus throws collect, then are spent) : human-driven, fast mode
    pg.evaluate("()=>{CB.state().over=true}")
    JS_HELP="""
      window.TH={
        B:{4:{ups:[true,true,true,true],v:4,extra:true},8:{ups:[false,false,false,false],v:8,extra:true}},
        f(v,extra){return this.B[v]&&extra!==false?this.B[v]:{ups:[true,false,false,false],v,extra:!!extra}},
        setup(entry,N){CB.DEBUG.fast=true;CB.DEBUG.force=[];CB.DEBUG.log=[];CB.DEBUG.done=false;CB.S.size=N||5;CB.S.count=2;CB.S.types=['human','human'];CB.S.entry=entry||'easy';CB.start();return CB.state()},
        until(fn,ms){return new Promise((res,rej)=>{const t0=Date.now();(function loop(){let ok=false;try{ok=fn()}catch(e){}if(ok)return res(true);if(Date.now()-t0>(ms||4000))return rej(new Error('timeout '+fn+' phase='+CB.state().phase+' pool='+CB.pool()));setTimeout(loop,10)})()})},
        async throwN(n){for(let i=0;i<n;i++){await this.until(()=>CB.state().phase==='throw'&&!document.getElementById('btnThrow').disabled);const L0=CB.DEBUG.log.length;document.getElementById('btnThrow').click();await this.until(()=>CB.DEBUG.log.length>L0&&['throw','move'].includes(CB.state().phase)||CB.DEBUG.log.some(x=>x.three!==undefined))}},
        chips(){return [...document.querySelectorAll('#pool .pc')].map(b=>({t:b.textContent,sel:b.classList.contains('sel'),off:b.classList.contains('off')}))},
        chip(label){[...document.querySelectorAll('#pool .pc')].find(b=>b.textContent===label).click()},
        async pawn(k){const G=CB.state(),n=CB.pool().length;document.querySelector('.pawn[data-p="'+G.cur+'"][data-k="'+k+'"]').click();await this.until(()=>CB.pool().length<n&&CB.state().phase!=='anim')},
        tip(){return document.getElementById('tip').textContent}
      };"""
    pg.evaluate(JS_HELP)
    r=pg.evaluate("""async()=>{const o={};let G=TH.setup('easy');CB.DEBUG.force=[TH.f(4),TH.f(2)];
      await TH.throwN(1);o.afterBonus={phase:G.phase,pool:CB.pool().slice(),cur:G.cur,msg:document.getElementById('msg').textContent,pawns:G.players[0].pawns.slice(),dom:TH.chips().map(c=>c.t)};
      document.querySelector('.pawn[data-p="0"][data-k="0"]').click();o.tipCollect=TH.tip();
      await TH.throwN(1);o.pool=CB.pool().slice();o.chips=TH.chips();o.phase=G.phase;o.lbl=document.querySelector('#pool .plbl').textContent;o.msg2=document.getElementById('msg').textContent;
      o.ghosts=document.querySelectorAll('.ghost').length;
      // combined: 4+2=6 on one pawn
      TH.chip('4+2=6');o.selAfter=TH.chips().filter(c=>c.sel).map(c=>c.t);await TH.pawn(0);
      await TH.until(()=>G.cur===1&&G.phase==='throw');o.combined=G.players[0].pawns.slice();o.poolEnd=CB.pool().slice();o.domEnd=TH.chips().length;
      return o}""")
    check("bonus throw: no move yet, throw again",r["afterBonus"]["phase"]=="throw" and r["afterBonus"]["pool"]==[4] and r["afterBonus"]["cur"]==0 and r["afterBonus"]["pawns"]==[0,0,0,0],r["afterBonus"])
    check("bonus message shown","Throw again" in r["afterBonus"]["msg"],r["afterBonus"])
    check("tip while collecting","Throw again" in r["tipCollect"],r["tipCollect"])
    check("pool [4,2] forms",r["pool"]==[4,2] and r["phase"]=="move",r)
    check("chips 4, 2, 4+2=6",[c["t"] for c in r["chips"]]==["4","2","4+2=6"],r["chips"])
    check("first viable chip auto-selected",[c["sel"] for c in r["chips"]]==[True,False,False],r["chips"])
    check("pool label + using message",r["lbl"]=="Your throws:" and r["msg2"].startswith("Using 4:"),r)
    check("ghost shown for selected chip",r["ghosts"]>=1,r)
    check("chip tap selects it",r["selAfter"]==["4+2=6"],r)
    check("combined move: one pawn moves the sum",r["combined"]==[6,0,0,0] and r["poolEnd"]==[] and r["domEnd"]==0,r)
    r=pg.evaluate("""async()=>{const o={};let G=TH.setup('easy');CB.DEBUG.force=[TH.f(4),TH.f(2)];await TH.throwN(2);
      await TH.pawn(0);o.mid={pawns:G.players[0].pawns.slice(),pool:CB.pool().slice(),chips:TH.chips(),phase:G.phase,cur:G.cur};
      await new Promise(r=>setTimeout(r,150));o.noAuto=G.players[0].pawns.slice();
      await TH.pawn(1);await TH.until(()=>G.cur===1&&G.phase==='throw');o.end=G.players[0].pawns.slice();o.throws=CB.DEBUG.log.filter(x=>x.v).length;return o}""")
    check("separate: first value used alone",r["mid"]["pawns"]==[4,0,0,0] and r["mid"]["pool"]==[2] and r["mid"]["phase"]=="move" and r["mid"]["cur"]==0,r["mid"])
    check("separate: remaining chip auto-selected",[(c["t"],c["sel"]) for c in r["mid"]["chips"]]==[("2",True)],r["mid"])
    check("no auto-move when two pawns can use it",r["noAuto"]==[4,0,0,0],r)
    check("separate: second value on another pawn",r["end"]==[4,2,0,0] and r["throws"]==2,r)
    # auto-move: single value, single legal move
    r=pg.evaluate("""async()=>{let G=TH.setup('easy');const P=G.players[0];P.pawns=[3,G.last,G.last,G.last];CB.DEBUG.force=[TH.f(2)];await TH.throwN(1);
      await TH.until(()=>G.cur===1);return P.pawns.slice()}""")
    check("auto-move with one value and one legal move",r[0]==5,r)
    # jodi: odd chips rejected, even sum accepted (half step) ; wrong-number tip
    r=pg.evaluate("""async()=>{const o={};let G=TH.setup('easy');const P=G.players[0];P.pawns=[G.gate+1,G.gate+1,G.last,G.last];P.hit=true;
      CB.DEBUG.force=[TH.f(3,true),TH.f(1)];await TH.throwN(2);o.chips=TH.chips();o.mv=CB.chips()[2].moves.map(m=>({j:m.jodi,s:m.step}));
      TH.chip('3');o.tipOff=TH.tip();o.stillSel=TH.chips().filter(c=>c.sel).map(c=>c.t);
      await TH.pawn(0);await TH.until(()=>G.cur===1);o.pawns=P.pawns.slice();o.gate=G.gate;
      G=TH.setup('easy');const Q=G.players[0];Q.pawns=[G.gate+1,G.gate+1,0,G.last];Q.hit=true;CB.DEBUG.force=[TH.f(3,true),TH.f(1)];await TH.throwN(2);
      o.sel2=TH.chips().filter(c=>c.sel).map(c=>c.t);document.querySelector('.pawn[data-p="0"][data-k="0"]').click();o.tipWrong=TH.tip();o.unmoved=Q.pawns[0]===G.gate+1;
      G.over=true;return o}""")
    check("jodi: odd chips greyed, even sum live",[(c["t"],c["off"]) for c in r["chips"]]==[("3",True),("1",True),("3+1=4",False)],r["chips"])
    check("jodi: sum chip auto-selected",[c["t"] for c in r["chips"] if c["sel"]]==["3+1=4"],r["chips"])
    check("jodi: even sum moves half",r["mv"]==[{"j":True,"s":2}] and r["pawns"][:2]==[r["gate"]+3]*2,r)
    check("greyed chip gives tip and is not selected","No pawn can move 3" in r["tipOff"] and r["stillSel"]==["3+1=4"],r)
    check("wrong-number tip",r["sel2"]==["3"] and "can't use 3" in r["tipWrong"] and r["unmoved"],r)
    # three bonus throws in a row cancel the turn (Traditional), pool discarded, earlier moves of the turn undone
    r=pg.evaluate("""async()=>{const o={};let G=TH.setup('hard');const P0=G.players[0],P1=G.players[1];
      let t=3;for(;t<8;t++)if(!G.safe.has(P0.path[t][0]+','+P0.path[t][1]))break;let j=0;for(;j<G.gate;j++)if(P1.path[j][0]===P0.path[t][0]&&P1.path[j][1]===P0.path[t][1])break;
      P0.pawns=[t-2,0,0,0];P1.pawns=[j,0,0,0];G.snap=JSON.stringify(G.players.map(P=>({p:P.pawns,h:P.hit})));o.start=[P0.pawns.slice(),P1.pawns.slice()];
      CB.DEBUG.force=[TH.f(2),TH.f(4),TH.f(8),TH.f(4)];
      await TH.throwN(1);await TH.pawn(0);await TH.until(()=>G.phase==='throw');o.hit=P1.pawns[0]===0&&P0.hit;o.curAfterHit=G.cur;
      await TH.throwN(2);o.pool2=CB.pool().slice();o.phase2=G.phase;await TH.throwN(1);
      await TH.until(()=>G.cur===1&&G.phase==='throw');o.three=CB.DEBUG.log.some(x=>x.three===0);o.pool=CB.pool().slice();o.end=[P0.pawns.slice(),P1.pawns.slice()];o.hitFlag=P0.hit;o.dom=TH.chips().length;
      // easy mode: three bonus throws do NOT cancel
      G=TH.setup('easy');CB.DEBUG.force=[TH.f(4),TH.f(8),TH.f(4),TH.f(1)];await TH.throwN(4);o.easyPool=CB.pool().slice();o.easyChips=TH.chips().length;o.easyPhase=G.phase;
      o.width=document.getElementById('pool').scrollWidth<=document.querySelector('.dock').clientWidth;G.over=true;return o}""")
    check("capture gives an extra throw (same player)",r["hit"] and r["curAfterHit"]==0,r)
    check("two bonus throws: still collecting",r["pool2"]==[4,8] and r["phase2"]=="throw",r)
    check("3 bonus throws cancel the turn",r["three"] and r["pool"]==[] and r["dom"]==0,r)
    check("cancelled turn fully restored",r["end"]==r["start"] and r["hitFlag"]==False,r)
    check("easy: 3 bonus throws keep the pool",r["easyPool"]==[4,8,4,1] and r["easyPhase"]=="move" and r["easyChips"]>=8 and r["width"],r)
    # capture-bonus throw happens only after the pool is spent
    r=pg.evaluate("""async()=>{const o={};let G=TH.setup('easy');const P0=G.players[0],P1=G.players[1];
      let t=3;for(;t<8;t++)if(!G.safe.has(P0.path[t][0]+','+P0.path[t][1]))break;let j=0;for(;j<G.gate;j++)if(P1.path[j][0]===P0.path[t][0]&&P1.path[j][1]===P0.path[t][1])break;
      P0.pawns=[t-2,0,0,0];P1.pawns=[j,0,0,0];CB.DEBUG.force=[TH.f(4),TH.f(2),TH.f(1)];await TH.throwN(2);
      TH.chip('2');await TH.pawn(0);o.afterHit={phase:G.phase,pool:CB.pool().slice(),cur:G.cur,hit:P1.pawns[0]===0,capt:G.capt,btn:document.getElementById('btnThrow').disabled};
      await TH.pawn(1);await TH.until(()=>G.phase==='throw');o.afterPool={cur:G.cur,pool:CB.pool().slice(),pawns:P0.pawns.slice(),t};
      await TH.throwN(1);o.newPool=CB.pool().slice();o.cur2=G.cur;G.over=true;return o}""")
    check("after a hit the rest of the pool is spent first",r["afterHit"]=={"phase":"move","pool":[4],"cur":0,"hit":True,"capt":True,"btn":True},r["afterHit"])
    check("capture throw comes once the pool is empty",r["afterPool"]["cur"]==0 and r["afterPool"]["pool"]==[] and r["afterPool"]["pawns"][:2]==[r["afterPool"]["t"],4],r["afterPool"])
    check("capture throw starts a new pool",r["newPool"]==[1] and r["cur2"]==0,r)
    # leftover value that no pawn can use is lost, turn passes
    r=pg.evaluate("""async()=>{const o={};let G=TH.setup('easy');const P=G.players[0];P.pawns=[G.last-1,G.last-3,G.last,G.last];P.hit=true;CB.DEBUG.force=[TH.f(4),TH.f(1)];await TH.throwN(2);
      o.chips=TH.chips();await TH.pawn(0);await TH.until(()=>G.cur===1&&G.phase==='throw');o.lost=CB.DEBUG.log.filter(x=>x.lost).map(x=>x.lost);o.pawns=P.pawns.map(x=>G.last-x);o.pool=CB.pool().slice();G.over=true;return o}""")
    check("only usable chip is live",[(c["t"],c["off"],c["sel"]) for c in r["chips"]]==[("4",True,False),("1",False,True),("4+1=5",True,False)],r["chips"])
    check("unusable rest of pool is lost, turn passes",r["lost"]==[[4]] and r["pawns"]==[0,3,0,0] and r["pool"]==[],r)
    # 7 houses: 5 then 2 -> chips 5, 2, 5+2=7 ; chips render in Kannada digits
    r=pg.evaluate("""async()=>{const o={};let G=TH.setup('hard',7);CB.DEBUG.force=[{ups:[true,true,true,true,true,false],v:5,extra:true},{ups:[true,true,false,false,false,false],v:2,extra:false}];await TH.throwN(2);
      o.chips=TH.chips().map(c=>c.t);G.over=true;CB.S.lang='kn';G=TH.setup('easy',5);CB.DEBUG.force=[TH.f(4),TH.f(2)];await TH.throwN(2);o.kn=TH.chips().map(c=>c.t);o.knLbl=document.querySelector('#pool .plbl').textContent;
      G.over=true;CB.S.lang='en';return o}""")
    check("7 houses: pool chips 5, 2, 5+2=7",r["chips"]==["5","2","5+2=7"],r)
    check("Kannada chips",r["kn"]==["೪","೨","೪+೨=೬"] and r["knLbl"]=="ನಿಮ್ಮ ಸಂಖ್ಯೆಗಳು:",r)
    # a "human" played by random taps through the DOM never stalls (both boards)
    for N,e in ((5,"hard"),(7,"hard"),(7,"easy")):
        try:
            r=pg.evaluate("""async([N,e])=>{let G=TH.setup(e,N);let idle=0,last='',moves=0,maxPool=0;const t0=Date.now();
              while(!CB.DEBUG.done&&Date.now()-t0<100000){
                const sig=G.phase+G.cur+CB.pool()+CB.DEBUG.log.length;if(sig===last)idle++;else{idle=0;last=sig}
                if(idle>400)return {stall:{phase:G.phase,cur:G.cur,pool:CB.pool(),chips:TH.chips(),p:G.players.map(P=>P.pawns)}};
                maxPool=Math.max(maxPool,CB.pool().length);
                if(G.phase==='throw'&&!document.getElementById('btnThrow').disabled)document.getElementById('btnThrow').click();
                else if(G.phase==='move'){const live=[...document.querySelectorAll('#pool .pc:not(.off)')];if(live.length&&Math.random()<.6)live[Math.floor(Math.random()*live.length)].click();
                  const can=[...document.querySelectorAll('.pawn.can')];if(can.length){can[Math.floor(Math.random()*can.length)].click();moves++}}
                await new Promise(r=>setTimeout(r,2));}
              return {done:CB.DEBUG.done,moves,maxPool,throws:CB.DEBUG.log.filter(x=>x.v).length,lost:CB.DEBUG.log.filter(x=>x.lost).length}}""",[N,e])
            print("random human game",N,e,r)
            check(f"random human game finishes N={N} {e}",r.get("done") is True,r)
        except Exception as ex: errs.append(f"random human game N={N} {e}: {ex}")
        pg.evaluate("()=>{CB.state().over=true;document.getElementById('ovWin').classList.remove('on')}")
    # ---- full CPU games
    import collections;stats=collections.defaultdict(list)
    for N in (5,7):
      for cnt in (2,4):
        for e in ("hard","easy"):
          for rep in range(2):
            pg.evaluate(f"()=>{{CB.DEBUG.force=[];CB.DEBUG.fast=true;CB.DEBUG.done=false;CB.DEBUG.log=[];CB.S.size={N};CB.S.count={cnt};CB.S.entry='{e}';CB.S.types=['cpu','cpu','cpu','cpu'];CB.start()}}")
            try:
              pg.wait_for_function("CB.DEBUG.done===true",timeout=120000)
              s=pg.evaluate("()=>({w:CB.state().winner,t:CB.DEBUG.log.filter(x=>x.v).length,h:CB.DEBUG.log.filter(x=>x.hit).length,th:CB.DEBUG.log.filter(x=>x.three!==undefined).length,lost:CB.DEBUG.log.filter(x=>x.lost).length})")
              stats[(N,cnt,e)].append(s)
            except Exception as ex: errs.append(f"game stuck N={N} cnt={cnt} {e}: "+str(pg.evaluate("()=>({ph:CB.state().phase,p:CB.state().players.map(P=>P.pawns)})")))
            pg.evaluate("document.getElementById('ovWin').classList.remove('on')")
    for k,v in stats.items(): print(k,"throws/game",round(sum(x['t'] for x in v)/len(v)),"hits",round(sum(x['h'] for x in v)/len(v),1),"cancelled turns",sum(x['th'] for x in v),"lost leftovers",sum(x['lost'] for x in v),"winners",[x['w'] for x in v])
    # ---- tutorial walk-through (normal speed)
    pg.evaluate("()=>{CB.DEBUG.fast=false;CB.S.lang='en'}");pg.reload();pg.wait_for_timeout(300)
    pg.click("#btnTut");pg.wait_for_timeout(400);pg.screenshot(path="/home/claude/tests/out/tut0.png")
    pg.click("#cNext");pg.wait_for_timeout(300)
    def throw_and_move(shot=None):
        pg.click("#btnThrow");pg.wait_for_timeout(2300)
        if shot: pg.screenshot(path=shot)
        pg.locator(".pawn.can").last.click(force=True);pg.wait_for_timeout(1600)
    # wrong tap tip: tap a yellow pawn before throwing
    pg.evaluate("()=>document.querySelector('.pawn[data-p=\"1\"]').click()");pg.wait_for_timeout(200)
    tiptxt=pg.inner_text("#tip");check("tip on wrong pawn",("idle" not in tiptxt) and len(tiptxt)>5,tiptxt)
    throw_and_move("/home/claude/tests/out/tut1.png")      # step1 -> auto next
    # step2: Chowka then 2 -> pool [4,2], use the chips
    pg.click("#btnThrow");pg.wait_for_timeout(2300)
    check("tut: chowka -> throw again, nothing moved",pg.evaluate("(()=>{const G=CB.state();return G.phase==='throw'&&CB.pool().join()==='4'&&G.players[0].pawns.join()==='3,0,0,0'})()"))
    check("tut: coach after chowka","Throw again before moving" in pg.inner_text("#coach"),pg.inner_text("#coach"))
    pg.screenshot(path="/home/claude/tests/out/tut2_chowka_390.png")
    pg.click("#btnThrow");pg.wait_for_timeout(2300)
    check("tut: pool chips",pg.evaluate("[...document.querySelectorAll('#pool .pc')].map(b=>b.textContent).join('|')")=="4|2|4+2=6")
    check("tut: coach after second throw","You have 4 and 2" in pg.inner_text("#coach"),pg.inner_text("#coach"))
    pg.screenshot(path="/home/claude/tests/out/tut2_pool_390.png")
    check("tut: board and dock on screen",pg.evaluate("(()=>{const d=document.querySelector('.dock').getBoundingClientRect(),c=document.getElementById('coach').getBoundingClientRect();return d.bottom<=innerHeight&&c.top>=0})()"))
    pg.locator(".pawn.can").last.click(force=True);pg.wait_for_timeout(1600)     # uses 4
    check("tut: step waits until pool is empty",pg.evaluate("(()=>{const G=CB.state();return CB.Tut.i===2&&CB.pool().join()==='2'&&G.phase==='move'})()"),pg.evaluate("[CB.Tut.i,CB.pool(),CB.state().phase]"))
    pg.locator(".pawn.can").first.click(force=True);pg.wait_for_timeout(1400)    # uses 2
    check("tut: step 2 done after both numbers",pg.evaluate("CB.Tut.i===3&&CB.pool().length===0"),pg.evaluate("[CB.Tut.i,CB.pool()]"))
    throw_and_move("/home/claude/tests/out/tut3.png")      # step3 capture
    check("tutorial capture done",pg.evaluate("CB.state().players[0].hit"))
    pg.click("#cNext");pg.wait_for_timeout(300)             # -> safe houses
    pg.screenshot(path="/home/claude/tests/out/tut4.png");pg.click("#cNext");pg.wait_for_timeout(300)
    throw_and_move("/home/claude/tests/out/tut5.png")      # jodi
    check("jodi moved together",pg.evaluate("(()=>{const G=CB.state();return G.players[0].pawns[0]===G.gate+2&&G.players[0].pawns[1]===G.gate+2})()"))
    pg.click("#cNext");pg.wait_for_timeout(300)
    throw_and_move()                                        # finish
    pg.wait_for_timeout(500);pg.screenshot(path="/home/claude/tests/out/tut7.png")
    check("tutorial end card",pg.locator("#cPlay").count()==1)
    pg.click("#cPlay");pg.wait_for_timeout(500);pg.screenshot(path="/home/claude/tests/out/card_start.png")
    check("how-to card at start",pg.evaluate("document.getElementById('ovHow').classList.contains('on')"))
    pg.click("#hClose");pg.wait_for_timeout(400)
    # tap pawn before throw -> tip ; throw button during move -> tip
    pg.evaluate("()=>document.querySelector('.pawn[data-p=\"0\"]').click()");pg.wait_for_timeout(200)
    check("throw-first tip",len(pg.inner_text("#tip"))>5)
    pg.screenshot(path="/home/claude/tests/out/tip.png")
    b.close()
print("PASSED:",len(ok));print("\n".join(errs) if errs else "NO ERRORS")
