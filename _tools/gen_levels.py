"""Seeded generator for Road to Ayodhya boards: non-crossing snakes/ladders + special squares.
Usage: python3 gen_levels.py > boards.json"""
import random,json,math
def pos(n):
    r=(n-1)//10;c0=(n-1)%10;c=c0 if r%2==0 else 9-c0
    return (c-4.5,4.5-r),r
def segdist(a,b,c,d):
    def pt(p,q,r):
        vx,vy=r[0]-q[0],r[1]-q[1];L=vx*vx+vy*vy
        t=max(0,min(1,((p[0]-q[0])*vx+(p[1]-q[1])*vy)/L)) if L else 0
        return math.hypot(p[0]-q[0]-t*vx,p[1]-q[1]-t*vy)
    def ccw(p,q,r):return (r[1]-p[1])*(q[0]-p[0])>(q[1]-p[1])*(r[0]-p[0])
    if ccw(a,c,d)!=ccw(b,c,d) and ccw(a,b,c)!=ccw(a,b,d):return 0
    return min(pt(a,c,d),pt(b,c,d),pt(c,a,b),pt(d,a,b))
PLAN=[ # ladders,snakes,maxLadderRows,maxSnakeRows,specials
 (5,4,4,3,dict(s=4,t=3,y=2,b=1)),
 (5,5,4,3,dict(q=4,s=3,b=1,c=2,y=1)),
 (5,5,4,4,dict(m=4,t=2,c=2,y=1,s=2)),
 (5,6,4,4,dict(o=3,c=2,q=3,s=2,k=1)),
 (5,6,3,4,dict(m=4,c=3,y=1,s=2,q=2)),
 (4,6,3,5,dict(c=3,q=3,b=2,s=2,k=1)),
 (4,7,3,5,dict(t=4,c=2,q=2,s=2,k=1)),
 (4,7,3,5,dict(k=3,q=3,c=2,m=2,o=2)),
 (4,8,3,6,dict(s=2,t=2,q=3,m=2,b=1,c=3,k=2,y=1))]
def sim(L,S,rng,N=1500):
    j={a:b for a,b in L};j.update({a:b for a,b in S});tot=0
    for _ in range(N):
        p=0;t=0
        while p!=100:
            v=rng.randint(1,6);q=p+v
            if q>100:q=200-q
            while q in j:q=j[q]
            p=q
            if v!=6:t+=1
        tot+=t
    return tot/N
def build(li,rng):
    nl,ns,ml,ms,sp=PLAN[li]
    for attempt in range(4000):
        segs=[];used=set();L=[];S=[];ok=True
        def tryadd(kind,maxr):
            for _ in range(400):
                a=rng.randint(3,88) if kind=='L' else rng.randint(14,98)
                (pa,ra)=pos(a)
                dr=rng.randint(2 if maxr>2 else 1,maxr)
                rb=ra+dr if kind=='L' else ra-dr
                if rb<0 or rb>9:continue
                col=min(9,max(0,int(pa[0]+4.5)+rng.randint(-3,3)))
                b=rb*10+(col if rb%2==0 else 9-col)+1
                if b in(1,100) or a in used or b in used:continue
                if kind=='L' and rb==9 and b>97:continue
                pb,_=pos(b)
                if abs(pb[0]-pa[0])>abs(dr)*1.3+.5:continue
                if any(segdist(pa,pb,c,d)<1.05 for c,d in segs):continue
                # keep endpoints away from other endpoints' squares neighbours
                segs.append((pa,pb));used.update((a,b));(L if kind=='L' else S).append([a,b]);return True
            return False
        order=['L']*nl+['S']*ns;rng.shuffle(order)
        for k in order:
            if not tryadd(k,ml if k=='L' else ms):ok=False;break
        if not ok:continue
        # spread check: at least one snake in the top 3 rows, one ladder starting in the bottom 3 rows
        if not any(s[0]>70 for s in S) or not any(l[0]<30 for l in L):continue
        if li>=5 and not any(s[0]>90 for s in S):continue
        if sum(s[0]>90 for s in S)>(1 if li<5 else 2):continue
        tgt=24+li*2.4
        if abs(sim(L,S,rng,500)-tgt)>3:continue
        break
    free=[n for n in range(4,98) if n not in used]
    spec={}
    for typ,cnt in sp.items():
        for _ in range(cnt):
            for _ in range(300):
                n=rng.choice(free)
                if n in spec or n-1 in spec or n+1 in spec:continue
                if typ=='k' and not 25<n<85:continue
                spec[n]=typ;break
    return dict(L=sorted(L),S=sorted(S,reverse=True),sp={str(k):v for k,v in sorted(spec.items())},twist=round(.15+li*.04,2),avg=round(sim(L,S,rng),1))
out=[build(i,random.Random(2026+i*7)) for i in range(9)]
print(json.dumps(out,separators=(',',':')))
