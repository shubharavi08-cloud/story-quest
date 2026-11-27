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
    check("4 pawns 5x5",r["pawns5"]==4);check("6 pawns 7x7",r["pawns7"]==6);check("6 cowries 7x7",r["cow7"]==6)
    check("jodi odd blocked",r["jodiOdd"]=="jodiOdd",r);check("jodi half step",r["jodiEven"] and r["jodiEven"]["step"]==1,r)
    check("jodi blocks passing",r["blockPass"]=="block",r);check("jodi blocks landing",r["blockLand"]=="block",r);check("can stop before jodi",r["beforeOk"],r)
    check("gate locked",r["gate"]=="gate",r);check("exact needed",r["exact"]=="exact",r)
    # outer capture of 2 pawns + three-bonus cancel (live flow)
    r2=pg.evaluate("""async()=>{CB.DEBUG.fast=true;CB.S.size=5;CB.S.count=2;CB.S.types=['cpu','cpu'];CB.S.entry='hard';
      CB.DEBUG.force=[{ups:[true,true,true,true],v:4,extra:true},{ups:[true,true,true,true],v:4,extra:true},{ups:[true,true,true,true],v:4,extra:true}];
      CB.DEBUG.log=[];CB.start();await new Promise(r=>setTimeout(r,400));return {three:CB.DEBUG.log.some(x=>x.three===0),p0:CB.state().players[0].pawns}}""")
    check("3 bonus throws cancel turn",r2["three"],r2)
    pg.evaluate("()=>{CB.state().over=true}")
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
    pg.click("#btnThrow");pg.wait_for_timeout(2300);pg.click("#btnThrow");pg.wait_for_timeout(2300)   # step2: chowka then 2 -> pool [4,2]
    check("tut pool chips",pg.evaluate("[...document.querySelectorAll('#pool .pc')].map(b=>b.textContent).join('|')")=="4|2|4+2=6")
    pg.locator(".pawn.can").last.click(force=True);pg.wait_for_timeout(1600);pg.locator(".pawn.can").first.click(force=True);pg.wait_for_timeout(1400)
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
