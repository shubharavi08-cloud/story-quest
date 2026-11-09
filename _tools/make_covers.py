"""Game pictures for the site tile and portals from a board screenshot + cowrie cutouts.
usage: make_covers.py board.png cutdir woodphoto outdir site_webp"""
import sys
from PIL import Image, ImageFilter, ImageEnhance, ImageOps
board_p,cut,photo,out,site=sys.argv[1:6]
def wood(W,H):
    strip=Image.open(photo).crop((0,1560,1512,2016));strip=strip.resize((W,int(W*456/1512)),Image.LANCZOS)
    w=Image.new("RGB",(W,H));y=0;f=False
    while y<H: w.paste(ImageOps.flip(strip) if f else strip,(0,y));y+=strip.height;f=not f
    return ImageEnhance.Brightness(w).enhance(0.9).convert("RGBA")
def put_board(img,bs,x0,y0):
    b=Image.open(board_p).convert("RGBA").resize((bs,bs),Image.LANCZOS)
    sh=Image.new("RGBA",(bs+80,bs+80),(0,0,0,0));sh.paste((0,0,0,150),(40,52),b.split()[3]);sh=sh.filter(ImageFilter.GaussianBlur(bs//36))
    img.alpha_composite(sh,(x0-40,y0-40));img.alpha_composite(b,(x0,y0))
def put_shells(img,items,scale):
    for name,ang,(x,y) in items:
        c=Image.open(f"{cut}/{name}.png").convert("RGBA")
        c=c.resize((int(c.width*scale),int(c.height*scale)),Image.LANCZOS).rotate(ang,expand=True,resample=Image.BICUBIC)
        s2=Image.new("RGBA",(c.width+60,c.height+60),(0,0,0,0));s2.paste((0,0,0,150),(36,44),c.split()[3]);s2=s2.filter(ImageFilter.GaussianBlur(9))
        img.alpha_composite(s2,(x-30,y-30));img.alpha_composite(c,(x,y))
L=wood(1920,1080);put_board(L,940,1920-940-90,70)
put_shells(L,[("up3",-20,(130,180)),("down2",35,(470,130)),("up3",15,(180,580)),("up3",-55,(500,530))],1.5)
L.convert("RGB").save(f"{out}/cover_1920x1080.jpg",quality=90)
L.convert("RGB").resize((800,450),Image.LANCZOS).save(site,"WEBP",quality=86,method=6)
P=wood(800,1200);put_board(P,700,50,60);put_shells(P,[("up3",-25,(70,830)),("down2",30,(300,800)),("up3",20,(520,840))],1.05)
P.convert("RGB").save(f"{out}/cover_800x1200.jpg",quality=90)
Q=wood(800,800);put_board(Q,560,210,120);put_shells(Q,[("up3",-20,(30,140)),("down2",25,(40,470))],0.95)
Q.convert("RGB").save(f"{out}/cover_800x800.jpg",quality=90)
I=wood(630,500);put_board(I,440,630-440-30,30);put_shells(I,[("up3",-20,(20,60)),("down2",30,(30,280))],0.8)
I.convert("RGB").save(f"{out}/cover_itch_630x500.png")
print("covers done")
