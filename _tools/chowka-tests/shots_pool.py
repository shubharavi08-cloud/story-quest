from playwright.sync_api import sync_playwright
URL="file:///home/claude/chowka/index.html";O="/home/claude/tests/out/"
F5="{ups:[true,true,true,true,true,false],v:5,extra:true}";F6="{ups:[true,true,true,true,true,true],v:6,extra:true}"
F2="{ups:[true,true,false,false,false,false],v:2,extra:false}";F3="{ups:[true,true,true,false,false,false],v:3,extra:false}"
def game(pg,lang,force,throws,name,types="['human','cpu']",pre=""):
    pg.evaluate(f"()=>{{CB.S.lang='{lang}';CB.S.sound=false;CB.S.size=7;CB.S.count=2;CB.S.types={types};CB.S.entry='easy';CB.DEBUG.fast=false;CB.DEBUG.force=[{force}];CB.start()}}")
    pg.wait_for_timeout(400);pg.click("#hClose");pg.wait_for_timeout(300)
    if pre: pg.evaluate(pre)
    for i in range(throws):
        pg.click("#btnThrow");pg.wait_for_timeout(2400)
        if i==0 and throws>1: pg.screenshot(path=O+name+"_collecting.png")
    pg.screenshot(path=O+name+".png")
    r=pg.evaluate("(()=>{const d=document.querySelector('.dock').getBoundingClientRect(),b=document.getElementById('boardwrap').getBoundingClientRect(),p=document.getElementById('pool').getBoundingClientRect();return {dockBottom:d.bottom,vh:innerHeight,board:[b.top,b.width],poolH:p.height,over:document.documentElement.scrollWidth>innerWidth}})()")
    print(name,r);pg.evaluate("()=>{CB.state().over=true}")
with sync_playwright() as p:
    b=p.chromium.launch()
    for (w,h,tag) in ((390,844,"390"),(360,640,"360x640")):
        pg=b.new_page(viewport={"width":w,"height":h});errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
        pg.goto(URL);pg.wait_for_timeout(300)
        game(pg,"en",F5+","+F2,2,f"pool_7h_5_2_{tag}")
        game(pg,"en",F6+","+F5+","+F3,3,f"pool_7h_6_5_3_{tag}")
        game(pg,"kn",F5+","+F2,2,f"pool_7h_5_2_kn_{tag}")
        game(pg,"hi",F5+","+F2,2,f"pool_7h_5_2_hi_{tag}")
        # greyed chip + tip
        game(pg,"en",F5+","+F2,2,f"pool_tip_{tag}",pre="()=>{const G=CB.state(),P=G.players[0];P.pawns=[G.last-2,G.last-7,G.last,G.last,G.last,G.last];P.hit=true}")
        print("errors",errs);pg.close()
    b.close()
