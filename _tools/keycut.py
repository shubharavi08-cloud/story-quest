#!/usr/bin/env python3
"""keycut.py in.jpg prefix N : white-key cut (for objects on pure white), split into N objects left-to-right."""
import sys,numpy as np
from PIL import Image
from scipy import ndimage
src,pre,n=sys.argv[1],sys.argv[2],int(sys.argv[3])
a=np.array(Image.open(src).convert('RGB')).astype(float)
d=np.sqrt(((255-a)**2).sum(-1))           # distance from white
al=np.clip((d-14)/26,0,1)                  # soft edge
al=ndimage.gaussian_filter(al,.6)
# un-premultiply white fringe
rgb=a.copy();m=al>0.02
rgb[m]=np.clip((a[m]-255*(1-al[m,None]))/al[m,None],0,255)
lab,k=ndimage.label(ndimage.binary_dilation(al>.15,iterations=8));objs=ndimage.find_objects(lab)
sizes=[(lab[o]==i+1).sum() for i,o in enumerate(objs)];keep=sorted(sorted(range(k),key=lambda i:-sizes[i])[:n],key=lambda i:objs[i][1].start)
for j,i in enumerate(keep):
  sl=objs[i];msk=(lab[sl]==i+1);A=(al[sl]*msk*255).astype(np.uint8)
  o=Image.fromarray(np.dstack([rgb[sl].astype(np.uint8),A]),'RGBA');name=f'{pre}{j+1}' if n>1 else pre
  o.save(name+'.png');o.save(name+'.webp',quality=90,method=6);print(name,o.size)
