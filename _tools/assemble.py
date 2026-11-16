#!/usr/bin/env python3
"""assemble.py OUT.jpg  -> joins the latest browser chunk results (C0:,C1:,...) saved by the tool bridge into one image."""
import sys,glob,json,base64,os,re
files=sorted(glob.glob('/tmp/claude-tool-results/*/mcp-remote-devices-Claude_Browser__javascript_tool-*.txt')+glob.glob('/tmp/claude-tool-results/*/toolu_*.json'),key=os.path.getmtime)
parts={}
for f in reversed(files):
    try:t=json.load(open(f))[0]['text']
    except Exception:continue
    m=re.match(r'"?C(\d+):',t)
    if not m:continue
    i=int(m.group(1))
    if i in parts:break   # reached an older set
    body=t[len(m.group(0)):].split('\n')[0].rstrip('"')
    parts[i]=body
    os.rename(f,f+'.used')
n=max(parts)+1;assert sorted(parts)==list(range(n)),sorted(parts)
data=base64.b64decode(''.join(parts[i] for i in range(n)))
open(sys.argv[1],'wb').write(data);print(sys.argv[1],len(data),'bytes from',n,'chunks')
