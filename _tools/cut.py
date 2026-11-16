#!/usr/bin/env python3
"""cut.py in.jpg out_prefix [--split N] : remove white background (rembg isnet), trim, optionally split into N objects left-to-right; writes PNG/WebP."""
import sys,numpy as np
from PIL import Image
from rembg import remove,new_session
from scipy import ndimage
S=new_session('isnet-general-use')
src,pre=sys.argv[1],sys.argv[2];n=int(sys.argv[sys.argv.index('--split')+1]) if '--split' in sys.argv else 1
im=Image.open(src).convert('RGB');cut=remove(im,session=S,post_process_mask=True)
a=np.array(cut);al=a[...,3]
if n==1:
  ys,xs=np.where(al>8);box=(xs.min(),ys.min(),xs.max()+1,ys.max()+1);out=[cut.crop(box)]
else:
  lab,k=ndimage.label(ndimage.binary_dilation(al>8,iterations=6));objs=ndimage.find_objects(lab)
  sizes=[(lab[o]==i+1).sum() for i,o in enumerate(objs)];keep=sorted(sorted(range(k),key=lambda i:-sizes[i])[:n],key=lambda i:objs[i][1].start)
  out=[]
  for i in keep:
    sl=objs[i];m=(lab[sl]==i+1);piece=a[sl].copy();piece[...,3]=piece[...,3]*m;out.append(Image.fromarray(piece))
for j,o in enumerate(out):
  name=pre if n==1 else f'{pre}{j+1}';o.save(name+'.png');o.save(name+'.webp',quality=88,method=6);print(name,o.size)
