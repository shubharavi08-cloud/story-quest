from playwright.sync_api import sync_playwright
URL="file:///home/claude/chowka/index.html";O="/home/claude/tests/out/"
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={"width":390,"height":844});errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
    pg.goto(URL);pg.wait_for_timeout(300)
    pg.evaluate("()=>{CB.S.lang='en';CB.S.sound=false;CB.S.size=5;CB.S.count=2;CB.S.types=['human','cpu'];CB.S.entry='easy';CB.DEBUG.fast=false;CB.DEBUG.force=[{ups:[true,true,true,true],v:4,extra:true},{ups:[true,false,false,false],v:1,extra:false}];CB.start()}")
    pg.wait_for_timeout(400);pg.screenshot(path=O+"card_pool_line_390.png");pg.click("#hClose");pg.wait_for_timeout(300)
    pg.evaluate("()=>{const G=CB.state(),P=G.players[0];P.pawns=[G.last-1,G.last-3,G.last,G.last];P.hit=true;window.dispatchEvent(new Event('resize'))}")
    pg.click("#btnThrow");pg.wait_for_timeout(2400);pg.click("#btnThrow");pg.wait_for_timeout(2400)
    pg.locator("#pool .pc").first.click();pg.wait_for_timeout(400)
    pg.screenshot(path=O+"pool_greyed_tip_390.png")
    print(pg.inner_text("#tip"),errs);b.close()
