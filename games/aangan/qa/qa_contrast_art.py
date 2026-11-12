import asyncio,json,io
import numpy as np
from PIL import Image
from playwright.async_api import async_playwright
KEY='wow_aangan_v1'
def st(**kw):
    d=dict(mithai=0,warm=20,rooms=[1,0,0],room=0,sub=[[0,0,0,0],[0,0,0,0],[0,0,0,0]],refresh=[0,0,0],seen={'intro':1},lang='en',snd=False,bless='x'); d.update(kw); return json.dumps(d)
def lum(c):
    c=np.asarray(c,dtype=float)/255.0
    c=np.where(c<=0.03928,c/12.92,((c+0.055)/1.055)**2.4)
    return 0.2126*c[...,0]+0.7152*c[...,1]+0.0722*c[...,2]
def hexrgb(h):
    h=h.lstrip('#'); return [int(h[i:i+2],16) for i in (0,2,4)]
async def run(pg,label):
    items=await pg.evaluate("""()=>[...document.querySelectorAll('h1,h2,h3,p,span,b,div,button,label')].filter(e=>{const t=[...e.childNodes].filter(n=>n.nodeType===3).map(n=>n.textContent.trim()).join('');if(!t)return false;const r=e.getBoundingClientRect();if(r.width<20||r.height<10)return false;const cs=getComputedStyle(e);if(cs.display==='none'||cs.visibility==='hidden'||+cs.opacity===0)return false;return r.top>=0&&r.bottom<=innerHeight&&r.left>=0&&r.right<=innerWidth}).map((e,i)=>{e.setAttribute('data-ac',i);const cs=getComputedStyle(e);const r=e.getBoundingClientRect();return {i,t:e.textContent.trim().slice(0,30),color:cs.color,x:r.left,y:r.top,w:r.width,h:r.height,fs:parseFloat(cs.fontSize),fw:+cs.fontWeight}})""")
    if not items: print(label,'no items'); return
    # screenshot with all text transparent, to sample backgrounds
    await pg.add_style_tag(content="*{color:transparent!important;text-shadow:none!important;-webkit-text-fill-color:transparent!important}")
    png=await pg.screenshot(); img=np.asarray(Image.open(io.BytesIO(png)).convert('RGB')).astype(float)
    await pg.evaluate("()=>document.querySelectorAll('style').forEach(s=>{if(s.textContent.includes('transparent!important'))s.remove()})")
    worst=[]
    for it in items:
        x0,y0=int(max(0,it['x'])),int(max(0,it['y'])); x1,y1=int(min(img.shape[1],it['x']+it['w'])),int(min(img.shape[0],it['y']+it['h']))
        if x1-x0<4 or y1-y0<4: continue
        reg=img[y0:y1,x0:x1].reshape(-1,3); L=lum(reg)
        if not it['color'].startswith('rgb'): continue
        vals=[float(v) for v in it['color'][it['color'].index('(')+1:it['color'].index(')')].split(',')[:3]]
        fg=float(lum(np.array(vals)))
        # worst background = the brightest or darkest 10th percentile, whichever gives the lower contrast with the text
        bgs=[np.percentile(L,10),np.percentile(L,90)]
        ratios=[(max(fg,b)+0.05)/(min(fg,b)+0.05) for b in bgs]
        r=min(ratios); need=3.0 if (it['fs']>=24 or (it['fs']>=18.66 and it['fw']>=700)) else 4.5
        if r<need: worst.append((round(r,2),need,it['t'],it['fs'],round(it['y'])))
    print(f"== {label}: {len(items)} text items checked, below target: {len(worst)}")
    for w in sorted(worst)[:10]: print('  ',w)
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox'])
        pg=await b.new_page(viewport={'width':390,'height':844})
        await pg.goto('http://localhost:8815/index.html'); await pg.wait_for_timeout(300)
        await pg.evaluate(f"()=>localStorage.setItem('{KEY}',{json.dumps(st())})")
        await pg.goto('http://localhost:8815/index.html'); await pg.wait_for_timeout(900)
        await run(pg,'title screen')
        await pg.goto('http://localhost:8815/index.html'); await pg.wait_for_timeout(600)
        await pg.evaluate("()=>{[...document.querySelectorAll('button')].find(b=>b.offsetParent!==null&&/ಮುಂದುವರಿಸಿ|Continue/.test(b.textContent))?.click()}")
        await pg.wait_for_timeout(1200)
        await run(pg,'hub')
        await b.close()
asyncio.run(main())
