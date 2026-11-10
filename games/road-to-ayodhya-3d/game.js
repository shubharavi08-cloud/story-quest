/* Road to Ayodhya · Snakes & Ladders Adventure — World of Wonders Studio
   Engine: board, dice, turns, special squares, cards, save. Content lives in ./data/ (levels, questions, text). */
import * as THREE from './three.module.min.js';
import {L,VIRTUES,TROUBLES} from './data/strings.js';
import {LEVELS} from './data/levels.js';
import {QUESTIONS} from './data/questions.js';

const COLORS=['#e0405a','#3a6fd8','#46b882','#9b59d0'];
const QA=new URLSearchParams(location.search).has('qa');
let lang='en';try{lang=localStorage.getItem('sq_lang')||'en'}catch(e){}
{const q=new URLSearchParams(location.search).get('lang');if(['en','hi','kn'].includes(q))lang=q}
if(!L[lang])lang='en';
const t=k=>L[lang][k]??L.en[k], tx=o=>o[lang]||o.en, $=s=>document.querySelector(s), sleep=ms=>new Promise(r=>setTimeout(r,ms));
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* ======================= save (all storage access is guarded: private browsing must not break the game) ======================= */
let SAVE={unlocked:1,stars:[],best:[],set:{fast:false,diff:1,music:true,sfx:true},cur:null,played:0};
try{const s=JSON.parse(localStorage.getItem('rta3d2')||'null');if(s&&s.unlocked){const set=Object.assign({},SAVE.set,s.set||{});SAVE=Object.assign(SAVE,s,{set})}}catch(e){}
function persist(){try{localStorage.setItem('rta3d2',JSON.stringify(SAVE))}catch(e){}}
const SPD=()=>SAVE.set.fast?.45:1;

/* ======================= audio ======================= */
let AC=null,sfxOn=SAVE.set.sfx,musicOn=SAVE.set.music,musicNode=null;
function ac(){if(!AC){try{AC=new (window.AudioContext||window.webkitAudioContext)()}catch(e){}}if(AC&&AC.state==='suspended')AC.resume();return AC}
function tone(f,d=.12,type='triangle',v=.18,when=0,slide=0,dest){if(!sfxOn&&!dest)return;const a=ac();if(!a)return;const o=a.createOscillator(),g=a.createGain();o.type=type;const t0=a.currentTime+when;
 o.frequency.setValueAtTime(f,t0);if(slide)o.frequency.exponentialRampToValueAtTime(Math.max(40,f+slide),t0+d);g.gain.setValueAtTime(0.0001,t0);g.gain.exponentialRampToValueAtTime(v,t0+.01);g.gain.exponentialRampToValueAtTime(.0001,t0+d);
 o.connect(g).connect(dest||a.destination);o.start(t0);o.stop(t0+d+.05)}
function noise(d=.25,v=.12,when=0,hp=800,lp=12000){if(!sfxOn)return;const a=ac();if(!a)return;const b=a.createBuffer(1,Math.max(1,a.sampleRate*d|0),a.sampleRate),ch=b.getChannelData(0);for(let i=0;i<ch.length;i++)ch[i]=(Math.random()*2-1)*(1-i/ch.length);
 const s=a.createBufferSource(),f=a.createBiquadFilter(),f2=a.createBiquadFilter(),g=a.createGain();f.type='highpass';f.frequency.value=hp;f2.type='lowpass';f2.frequency.value=lp;s.buffer=b;g.gain.value=v;s.connect(f).connect(f2).connect(g).connect(a.destination);s.start(a.currentTime+when)}
const SFX={
 dice(){for(let i=0;i<9;i++)noise(.045,.16,i*.075+Math.random()*.02,1500,6000);tone(180,.08,'square',.05,.7)},
 hop(i=0){tone(330+i*12,.09,'sine',.14);noise(.03,.06,0,2000,5000)},
 land(){tone(196,.18,'sine',.16);noise(.12,.05,0,200,1200)},
 ladder(){[523,587,659,784,880,1047,1175].forEach((f,i)=>tone(f,.18,'triangle',.12,i*.08))},
 snake(){tone(820,1.0,'sawtooth',.05,0,-640);noise(1.0,.07,0,2500)},
 hiss(){noise(.5,.06,0,3500)},
 right(){[784,988,1175,1568].forEach((f,i)=>tone(f,.22,'sine',.15,i*.09))},
 wrong(){tone(220,.25,'square',.07);tone(180,.3,'square',.06,.12)},
 bell(){tone(1568,.9,'sine',.1);tone(2093,.7,'sine',.05,.02);tone(3136,.4,'sine',.03,.04)},
 conch(){tone(233,1.6,'sawtooth',.045,0,8);tone(466,1.6,'sine',.06,0,6);tone(349,1.2,'sine',.03,.3)},
 win(){[523,659,784,1047,784,1047,1319].forEach((f,i)=>tone(f,.3,'triangle',.15,i*.12));for(let i=0;i<10;i++)noise(.35,.09,.9+i*.2,300)},
 lose(){[392,349,311,262].forEach((f,i)=>tone(f,.35,'triangle',.12,i*.18))},
 click(){tone(900,.04,'sine',.06)}};
/* Music: soft tanpura drone (Pa–Sa–Sa–Sa) with a slow bansuri-like phrase. Loops while musicOn. */
function startMusic(){const a=ac();if(!a||musicNode)return;const out=a.createGain();out.gain.value=musicOn?.5:0;out.connect(a.destination);musicNode=out;
 const sa=146.83, pa=sa*1.5;let n=0;
 const pluck=(f,v)=>{const t0=a.currentTime;[1,2,3,4].forEach((h,i)=>{const o=a.createOscillator(),g=a.createGain();o.type=i?'sine':'triangle';o.frequency.value=f*h;g.gain.setValueAtTime(.0001,t0);g.gain.exponentialRampToValueAtTime(v/(h*1.4),t0+.03);g.gain.exponentialRampToValueAtTime(.0001,t0+2.6);o.connect(g).connect(out);o.start(t0);o.stop(t0+2.7)})};
 const mel=[0,2,4,7,9,7,4,2,0,null,4,7,9,12,9,7,null,null];const scale=r=>sa*2*Math.pow(2,r/12);let m=0;
 setInterval(()=>{if(!musicOn)return;const seq=[pa/2,sa,sa,sa/2];pluck(seq[n%4],.05);n++;
  if(n%2===0){const r=mel[m++%mel.length];if(r!==null){const t0=a.currentTime,o=a.createOscillator(),g=a.createGain(),v=a.createOscillator(),vg=a.createGain();o.type='sine';o.frequency.value=scale(r);v.frequency.value=5;vg.gain.value=3;v.connect(vg).connect(o.frequency);
   g.gain.setValueAtTime(.0001,t0);g.gain.exponentialRampToValueAtTime(.025,t0+.12);g.gain.exponentialRampToValueAtTime(.0001,t0+1.1);o.connect(g).connect(out);o.start(t0);v.start(t0);o.stop(t0+1.2);v.stop(t0+1.2)}}},700)}
function setMusic(on){musicOn=on;SAVE.set.music=on;persist();if(musicNode)musicNode.gain.value=on?.5:0;syncButtons()}
function setSfx(on){sfxOn=on;SAVE.set.sfx=on;persist();syncButtons()}
function syncButtons(){$('#music').setAttribute('aria-pressed',musicOn);$('#sound').setAttribute('aria-pressed',sfxOn);$('#sound').textContent=sfxOn?'🔊':'🔇'}

/* ======================= 3D scene ======================= */
const canvas=$('#scene');
const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true,powerPreference:'high-performance'});
renderer.setPixelRatio(Math.min(2,devicePixelRatio||1));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;
const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(30,1,.1,200);
scene.add(new THREE.HemisphereLight(0xfff1d6,0x2a1f5c,.95));
const sun=new THREE.DirectionalLight(0xffe2b0,1.5);sun.position.set(-5,14,6);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);
Object.assign(sun.shadow.camera,{left:-8,right:8,top:8,bottom:-8,near:1,far:40});sun.shadow.bias=-.0005;scene.add(sun);

const world=new THREE.Group();scene.add(world);
const sq=n=>{n=Math.max(1,Math.min(100,n));const r=Math.floor((n-1)/10),c0=(n-1)%10,c=r%2===0?c0:9-c0;return new THREE.Vector3(c-4.5,0,4.5-r)};

/* static helpers */
const woodMat=new THREE.MeshStandardMaterial({color:0x8a4b1c,roughness:.7});
const goldMat=new THREE.MeshStandardMaterial({color:0xe6a85a,roughness:.45,metalness:.2});
let boardGroup=null, hoverables=[], itemObjs={};

/* special squares: picture + soft tile colour. Treasures use the level's own pictures and sit on the board as objects. */
const SQ_ICON={s:'⭐',q:'❓',m:'🔮',b:'🎲',c:'🎯',y:'📜',k:'🚩',o:'🚧'};
const SQ_TINT={s:'#ffe9a8',t:'#ffe2bd',q:'#cfe4ff',m:'#e6d4ff',b:'#d2f3da',c:'#ffd3d3',y:'#fff1cf',k:'#cdeee8',o:'#e3ddd3'};
function itemIcon(lv,n){const ks=Object.keys(lv.sp).filter(k=>lv.sp[k]==='t');return lv.items[Math.max(0,ks.indexOf(String(n)))%lv.items.length]}
const EMOJI='"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif';

/* Board picture: coloured squares + special-square pictures. Numbers are NOT drawn here: they live on their own
   layer that is always drawn above the snakes and ladders, so no number is ever hidden. */
function boardTexture(lv){
 const N=2048,cv=document.createElement('canvas');cv.width=cv.height=N;const c=cv.getContext('2d'),cs=N/10;
 for(let n=1;n<=100;n++){const r=Math.floor((n-1)/10),c0=(n-1)%10,col=r%2===0?c0:9-c0,x=col*cs,y=N-(r+1)*cs,ty=lv.sp[n];
  c.fillStyle=n===100?'#ffd35a':n===1?'#fff3d0':ty?SQ_TINT[ty]:lv.tints[(n+r)%4];c.fillRect(x,y,cs,cs);
  c.strokeStyle='#5a2b1040';c.lineWidth=5;c.strokeRect(x+2.5,y+2.5,cs-5,cs-5);
  }
 const lab=(n,txt,col,size)=>{const p=sq(n);const x=(p.x+5)*cs,y=(p.z+5)*cs;c.fillStyle=col;c.font=`800 ${cs*size}px "Baloo 2","Baloo Tamma 2",sans-serif`;c.textAlign='center';c.textBaseline='bottom';c.fillText(txt,x,y+cs*.47,cs*.92)};
 lab(1,'START','#3a6fd8',.2);lab(100,tx(lv.goal||lv.place).toUpperCase(),'#7a1f14',.2);
 c.font=`${cs*.46}px ${EMOJI}`;c.textAlign='center';c.textBaseline='middle';const g=sq(100);c.fillText(lv.icon,(g.x+5)*cs,(g.z+5)*cs-cs*.1);
 const tex=new THREE.CanvasTexture(cv);tex.colorSpace=THREE.SRGBColorSpace;tex.anisotropy=renderer.capabilities.getMaxAnisotropy();return tex}
/* special-square pictures: their own unlit layer so they stay bright; snakes and ladders still pass over them */
function iconsTexture(lv){const N=1024,cv=document.createElement('canvas');cv.width=cv.height=N;const c=cv.getContext('2d'),cs=N/10;c.textAlign='center';c.textBaseline='middle';
 Object.keys(lv.sp).forEach(k=>{const ty=lv.sp[k];if(ty==='t')return;const p=sq(+k),x=(p.x+5)*cs,y=(p.z+5)*cs;c.fillStyle='#ffffffb0';c.beginPath();c.arc(x+cs*.1,y+cs*.14,cs*.3,0,7);c.fill();c.font=`${cs*.44}px ${EMOJI}`;c.fillText(SQ_ICON[ty],x+cs*.1,y+cs*.17)});
 const tex=new THREE.CanvasTexture(cv);tex.colorSpace=THREE.SRGBColorSpace;tex.anisotropy=renderer.capabilities.getMaxAnisotropy();return tex}
function numbersTexture(){
 const N=2048,cv=document.createElement('canvas');cv.width=cv.height=N;const c=cv.getContext('2d'),cs=N/10;
 c.textAlign='left';c.textBaseline='top';c.lineJoin='round';
 for(let n=1;n<100;n++){const r=Math.floor((n-1)/10),c0=(n-1)%10,col=r%2===0?c0:9-c0,x=col*cs,y=N-(r+1)*cs;
  c.font=`800 ${cs*.4}px "Baloo 2",sans-serif`;c.lineWidth=cs*.085;c.strokeStyle='#fffaf0';c.strokeText(n,x+cs*.07,y+cs*.04);c.fillStyle='#2a1204';c.fillText(n,x+cs*.07,y+cs*.04)}
 const tex=new THREE.CanvasTexture(cv);tex.colorSpace=THREE.SRGBColorSpace;tex.anisotropy=renderer.capabilities.getMaxAnisotropy();return tex}
const numMat=new THREE.MeshBasicMaterial({map:numbersTexture(),transparent:true,depthTest:false,depthWrite:false,toneMapped:false});
const numPlane=new THREE.Mesh(new THREE.PlaneGeometry(10,10),numMat);numPlane.rotation.x=-Math.PI/2;numPlane.position.y=.012;numPlane.renderOrder=5;world.add(numPlane);
function emojiSprite(ch){const c=document.createElement('canvas');c.width=c.height=128;const x=c.getContext('2d');x.font=`96px ${EMOJI}`;x.textAlign='center';x.textBaseline='middle';x.fillText(ch,64,70);
 const tex=new THREE.CanvasTexture(c);tex.colorSpace=THREE.SRGBColorSpace;const s=new THREE.Sprite(new THREE.SpriteMaterial({map:tex,transparent:true,depthTest:false,toneMapped:false}));s.scale.set(.62,.62,1);s.renderOrder=4;return s}

function tubeAlong(points,radius,mat,radial=8){const curve=new THREE.CatmullRomCurve3(points);const m=new THREE.Mesh(new THREE.TubeGeometry(curve,Math.max(8,points.length*6),radius,radial,false),mat);m.castShadow=true;return m}

function makeLadder(a,b,idx){
 const A=sq(a),B=sq(b),g=new THREE.Group(),dir=B.clone().sub(A),len=dir.length(),side=new THREE.Vector3(-dir.z,0,dir.x).normalize().multiplyScalar(.17);
 const H=.22+len*.035,pt=(s,k)=>A.clone().lerp(B,s).add(side.clone().multiplyScalar(k)).setY(.08+Math.sin(s*Math.PI)*H);
 const railPts=k=>Array.from({length:12},(_,i)=>pt(i/11,k));
 g.add(tubeAlong(railPts(1),.045,woodMat),tubeAlong(railPts(-1),.045,woodMat));
 const steps=Math.max(3,Math.round(len/.42));
 for(let i=1;i<steps;i++){const s=i/steps,p1=pt(s,1),p2=pt(s,-1);const r=new THREE.Mesh(new THREE.CylinderGeometry(.028,.028,p1.distanceTo(p2),6),goldMat);
  r.position.copy(p1).add(p2).multiplyScalar(.5);r.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),p2.clone().sub(p1).normalize());r.castShadow=true;g.add(r)}
 g.userData={kind:'ladder',from:a,to:b,title:VIRTUES[idx%VIRTUES.length],path:railPts(0)};g.traverse(o=>{o.userData.owner=g});return g}

const SNAKE_COLS=[[0x2e8b57,0xa7e36b],[0xc0392b,0xf5b041],[0x6c3fb5,0xd7b8ff],[0x1f6fb2,0x86d0ff],[0xb0306a,0xffb3d1],[0x3b7d2a,0xe9f07a],[0x8a4b1c,0xffd08a],[0x0f7c7c,0x9ef0e6],[0x5b2c83,0xffd35a]];
function snakePoints(a,b,i,twist){const A=sq(a),B=sq(b),d=B.clone().sub(A),len=d.length(),n=new THREE.Vector3(-d.z,0,d.x).normalize();
 const waves=Math.max(1.5,len/1.45)*(1+twist*.6),amp=.24+twist*.32,sgn=i%2?1:-1,pts=[];
 for(let k=0;k<=40;k++){const s=k/40,w=Math.sin(s*Math.PI*waves)*amp*sgn*Math.pow(Math.sin(s*Math.PI),.55);pts.push(A.clone().lerp(B,s).add(n.clone().multiplyScalar(w)).setY(.14+Math.sin(s*Math.PI*waves*2)*.03))}
 return pts}
function makeSnake(a,b,i,twist){
 const pts=snakePoints(a,b,i,twist),curve=new THREE.CatmullRomCurve3(pts),TS=160,RS=10,R=.13;
 const geo=new THREE.TubeGeometry(curve,TS,R,RS,false),pos=geo.attributes.position,cols=[],[c1,c2]=SNAKE_COLS[i%SNAKE_COLS.length],C1=new THREE.Color(c1),C2=new THREE.Color(c2),tmp=new THREE.Vector3();
 for(let s=0;s<=TS;s++){const u=s/TS,ctr=curve.getPointAt(u),taper=s<4?.85+s*.04:1-.78*Math.pow(u,1.15);
  for(let r=0;r<=RS;r++){const k=s*(RS+1)+r;tmp.fromBufferAttribute(pos,k).sub(ctr).multiplyScalar(taper);
   tmp.y*=.8;pos.setXYZ(k,ctr.x+tmp.x,Math.max(.02,ctr.y+tmp.y),ctr.z+tmp.z);const band=(s%12<5),belly=r>RS*.35&&r<RS*.65;const C=(band||belly)?C2:C1;cols.push(C.r,C.g,C.b)}}
 geo.setAttribute('color',new THREE.Float32BufferAttribute(cols,3));geo.computeVertexNormals();
 const mat=new THREE.MeshStandardMaterial({vertexColors:true,roughness:.38,metalness:.08});const body=new THREE.Mesh(geo,mat);body.castShadow=true;
 const g=new THREE.Group();g.add(body);
 // head
 const head=new THREE.Group(),hm=new THREE.MeshStandardMaterial({color:c1,roughness:.35});
 const skull=new THREE.Mesh(new THREE.SphereGeometry(.2,20,14),hm);skull.scale.set(1.35,.72,1);skull.castShadow=true;head.add(skull);
 const eyeW=new THREE.MeshStandardMaterial({color:0xffffff,roughness:.2}),eyeB=new THREE.MeshStandardMaterial({color:0x111111,roughness:.1});
 [-1,1].forEach(s=>{const e=new THREE.Mesh(new THREE.SphereGeometry(.06,10,8),eyeW);e.position.set(.08,.1,s*.1);head.add(e);const p=new THREE.Mesh(new THREE.SphereGeometry(.032,8,6),eyeB);p.position.set(.12,.12,s*.11);head.add(p)});
 const tongue=new THREE.Mesh(new THREE.BoxGeometry(.2,.012,.03),new THREE.MeshStandardMaterial({color:0xe0405a}));tongue.position.set(.33,-.02,0);head.add(tongue);
 const p0=curve.getPointAt(0),p1=curve.getPointAt(.03);const dir=p0.clone().sub(p1).normalize();head.position.copy(p0).add(dir.clone().multiplyScalar(.06)).setY(.17);
 head.rotation.y=Math.atan2(-dir.z,dir.x);g.add(head);
 g.userData={kind:'snake',from:a,to:b,title:TROUBLES[i%TROUBLES.length],path:curve.getSpacedPoints(60),head,tongue,mat};g.traverse(o=>{o.userData.owner=g});return g}

function buildBoard(lv,li){
 if(boardGroup){world.remove(boardGroup);boardGroup.traverse(o=>{o.geometry?.dispose();[].concat(o.material||[]).forEach(m=>{if(m===woodMat||m===goldMat)return;if(m.map&&m.map.dispose)m.map.dispose();if(m.dispose)m.dispose()})})}
 boardGroup=new THREE.Group();hoverables=[];itemObjs={};
 const rim=new THREE.Color(lv.rim);
 const base=new THREE.Mesh(new THREE.BoxGeometry(11,.5,11),new THREE.MeshStandardMaterial({color:rim,roughness:.6}));base.position.y=-.33;base.receiveShadow=true;boardGroup.add(base);
 const trim=new THREE.Mesh(new THREE.BoxGeometry(10.4,.12,10.4),new THREE.MeshStandardMaterial({color:0xf6a723,roughness:.4,metalness:.3}));trim.position.y=-.1;boardGroup.add(trim);
 const topMats=[0,0,0,0,0,0].map(()=>new THREE.MeshStandardMaterial({color:0xc9a46a,roughness:.8}));topMats[2]=new THREE.MeshStandardMaterial({map:boardTexture(lv),roughness:.9});
 const top=new THREE.Mesh(new THREE.BoxGeometry(10,.14,10),topMats);top.position.y=-.07;top.receiveShadow=true;boardGroup.add(top);
 const ic=new THREE.Mesh(new THREE.PlaneGeometry(10,10),new THREE.MeshBasicMaterial({map:iconsTexture(lv),transparent:true,depthWrite:false,toneMapped:false}));ic.rotation.x=-Math.PI/2;ic.position.y=.004;boardGroup.add(ic);
 lv.L.forEach(([a,b],i)=>{const m=makeLadder(a,b,i+li);boardGroup.add(m);hoverables.push(m)});
 lv.S.forEach(([a,b],i)=>{const m=makeSnake(a,b,i+li,lv.twist);boardGroup.add(m);hoverables.push(m)});
 Object.keys(lv.sp).forEach(k=>{if(lv.sp[k]!=='t'||(G&&G.taken[k]))return;const s=emojiSprite(itemIcon(lv,+k)),p=sq(+k);s.position.set(p.x+.1,.3,p.z+.14);boardGroup.add(s);itemObjs[k]=s});
 world.add(boardGroup)}

/* player tokens: flat round counters with the player's letter (or Diya's face), easy to read from above */
function makePawn(p,label){const g=new THREE.Group(),cv=document.createElement('canvas');cv.width=cv.height=160;const x=cv.getContext('2d'),tex=new THREE.CanvasTexture(cv);tex.colorSpace=THREE.SRGBColorSpace;
 const draw=img=>{x.clearRect(0,0,160,160);x.fillStyle='#fff';x.beginPath();x.arc(80,80,78,0,7);x.fill();x.fillStyle=p.color;x.beginPath();x.arc(80,80,66,0,7);x.fill();
  if(img){x.save();x.beginPath();x.arc(80,80,66,0,7);x.clip();x.drawImage(img,2,8,156,156);x.restore()}
  else{x.fillStyle='#fff';x.font='800 92px "Baloo 2",sans-serif';x.textAlign='center';x.textBaseline='middle';x.fillText(label,80,88)}tex.needsUpdate=true};
 draw();if(p.bot){const im=new Image();im.onload=()=>draw(im);im.src='img/diya_wave.png'}
 const side=new THREE.MeshStandardMaterial({color:p.color,roughness:.4,transparent:true}),cap=new THREE.MeshBasicMaterial({map:tex,transparent:true,toneMapped:false});
 const body=new THREE.Mesh(new THREE.CylinderGeometry(.36,.38,.16,40),[side,cap,side]);body.position.y=.08;body.rotation.y=Math.PI/2;body.castShadow=true;body.renderOrder=8;g.add(body);
 const ring=new THREE.Mesh(new THREE.TorusGeometry(.47,.04,8,40),new THREE.MeshBasicMaterial({color:0xffd35a,transparent:true,opacity:0,depthTest:false}));ring.rotation.x=Math.PI/2;ring.position.y=.03;ring.renderOrder=7;g.add(ring);
 g.userData={ring};return g}

/* dice: separate small renderer */
const dcv=$('#dice'),drend=new THREE.WebGLRenderer({canvas:dcv,antialias:true,alpha:true});drend.setPixelRatio(Math.min(2,devicePixelRatio||1));
const dscene=new THREE.Scene(),dcam=new THREE.PerspectiveCamera(30,1,.1,40);dcam.position.set(0,6.2,3.4);dcam.lookAt(0,0,.15);
const dshadow=new THREE.Mesh(new THREE.CircleGeometry(.62,32),new THREE.MeshBasicMaterial({color:0x000000,transparent:true,opacity:.35,depthWrite:false}));dshadow.rotation.x=-Math.PI/2;dshadow.position.y=-.5;dscene.add(dshadow);
dscene.add(new THREE.HemisphereLight(0xffffff,0x553366,1.1));const dl=new THREE.DirectionalLight(0xffffff,1.4);dl.position.set(-2,4,3);dscene.add(dl);
function faceTex(v){const c=document.createElement('canvas');c.width=c.height=128;const x=c.getContext('2d');x.fillStyle='#fffaf0';x.fillRect(0,0,128,128);x.strokeStyle='#e9d6b0';x.lineWidth=10;x.strokeRect(5,5,118,118);
 const P={1:[[64,64]],2:[[34,34],[94,94]],3:[[30,30],[64,64],[98,98]],4:[[34,34],[94,34],[34,94],[94,94]],5:[[32,32],[96,32],[64,64],[32,96],[96,96]],6:[[34,30],[34,64],[34,98],[94,30],[94,64],[94,98]]}[v];
 x.fillStyle=v===1?'#e0405a':'#3a1d0c';P.forEach(([a,b])=>{x.beginPath();x.arc(a,b,v===1?17:12,0,7);x.fill()});const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return t}
const FACE_VAL=[3,4,1,6,2,5]; // +x,-x,+y,-y,+z,-z
const NORMALS=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]].map(a=>new THREE.Vector3(...a));
const die=new THREE.Mesh(new THREE.BoxGeometry(1,1,1),FACE_VAL.map(v=>new THREE.MeshStandardMaterial({map:faceTex(v),roughness:.35})));dscene.add(die);
die.quaternion.setFromUnitVectors(NORMALS[2],new THREE.Vector3(0,1,0));
function sizeDice(){const r=dcv.getBoundingClientRect();if(!r.width)return;drend.setSize(r.width,r.height,false);dcam.aspect=r.width/r.height;
 const k=r.height<100?1.12:r.height<125?1.25:1;dcam.position.set(0,4.9*k,2.7*k);dcam.lookAt(0,0,-.75*k);dcam.updateProjectionMatrix();trayHalf=Math.max(.6,Math.min(4.5,dcam.aspect*1.15*k))}
let trayHalf=2;
let diceAnim=null;
function rollDie(v){return new Promise(res=>{const k=FACE_VAL.indexOf(v),q=new THREE.Quaternion().setFromUnitVectors(NORMALS[k],new THREE.Vector3(0,1,0));
 q.premultiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,1,0),(Math.random()-.5)*.8));
 const side=Math.random()<.5?-1:1,x0=side*trayHalf,x1=(Math.random()-.5)*.6,z0=(Math.random()-.5)*.6,start=performance.now(),D=1100*(SAVE.set.fast?.6:1);
 const axis=new THREE.Vector3(0,0,-side).add(new THREE.Vector3((Math.random()-.5)*.4,0,(Math.random()-.5)*.4)).normalize();
 diceAnim=now=>{const s=Math.min(1,(now-start)/D),e=1-Math.pow(1-s,3);const spin=new THREE.Quaternion().setFromAxisAngle(axis,(1-e)*Math.PI*6);
  die.quaternion.copy(q).premultiply(spin);die.position.x=x0+(x1-x0)*e;die.position.z=z0*(1-e);const hop=Math.abs(Math.sin(s*Math.PI*3.2))*(1-s)*1.1;die.position.y=hop;
  dshadow.position.x=die.position.x;dshadow.position.z=die.position.z;dshadow.material.opacity=.35-hop*.18;dshadow.scale.setScalar(1-hop*.25);
  if(s>=1){diceAnim=null;die.position.y=0;res()}}})}

/* ======================= layout & camera (board is always seen flat, from straight above) ======================= */
let area={x:0,y:0,w:1,h:1},W=1,H=1,portrait=false;
function layout(){W=innerWidth;H=innerHeight;portrait=W/H<1;renderer.setSize(W,H,false);
 const rail=document.querySelector('.rail').getBoundingClientRect(),top=document.querySelector('.top').getBoundingClientRect().bottom+3;
 if(portrait){area={x:0,y:top,w:W,h:Math.max(160,rail.top-top-4)}}else{area={x:0,y:top,w:Math.max(200,rail.left-6),h:H-top-4}}
 camera.aspect=area.w/area.h;fitCamera();sizeDice();fxSize()}
const camDir=new THREE.Vector3(0,Math.sin(THREE.MathUtils.degToRad(89.3)),Math.cos(THREE.MathUtils.degToRad(89.3)));
let camDist=20;const camTarget=new THREE.Vector3(0,0,0);
function fitCamera(){const corners=[[-5.5,-5.5],[5.5,-5.5],[-5.5,5.5],[5.5,5.5]].map(([x,z])=>new THREE.Vector3(x,0,z));
 let lo=6,hi=90;for(let i=0;i<26;i++){const d=(lo+hi)/2;camera.position.copy(camTarget).addScaledVector(camDir,d);camera.lookAt(camTarget);camera.updateProjectionMatrix();camera.updateMatrixWorld();
  const ok=corners.every(c=>{const p=c.clone().project(camera);return Math.abs(p.x)<.998&&Math.abs(p.y)<.998});if(ok)hi=d;else lo=d}
 camDist=hi}
let shake=0;
function placeCamera(){camera.position.copy(camTarget).addScaledVector(camDir,camDist);if(shake>0){camera.position.x+=(Math.random()-.5)*shake;camera.position.z+=(Math.random()-.5)*shake;shake*=.9;if(shake<.002)shake=0}
 camera.lookAt(camTarget)}

/* screen-space effects (2D overlay) */
const fx=$('#fx'),fc=fx.getContext('2d');let fdpr=1;const parts=[];
function fxSize(){fdpr=Math.min(2,devicePixelRatio||1);fx.width=W*fdpr;fx.height=H*fdpr;fc.setTransform(fdpr,0,0,fdpr,0,0)}
function toScreen(v){const p=v.clone().project(camera);return[area.x+(p.x+1)/2*area.w,area.y+(1-p.y)/2*area.h]}
function burst(x,y,kind='spark',n=30){for(let i=0;i<n;i++){const a=Math.random()*Math.PI*2,sp=kind==='fire'?2+Math.random()*5:kind==='smoke'?.5+Math.random()*1.5:1+Math.random()*4;
 parts.push({x,y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp-(kind==='petal'?1:kind==='smoke'?.8:2),life:1,kind,
  col:kind==='petal'?['#f6a723','#e0405a','#ffd35a','#ff8fb1'][i%4]:kind==='fire'?['#ffd35a','#ff7b54','#7fd3ff','#b98cff','#9cff8a'][Math.random()*5|0]:kind==='smoke'?'#5b2c4a':kind==='green'?'#9cff8a':'#ffd35a',
  r:kind==='petal'?5+Math.random()*4:kind==='smoke'?6+Math.random()*8:2+Math.random()*2.5,rot:Math.random()*6})}}
function burstAt(v,kind,n){const[x,y]=toScreen(v);burst(x,y,kind,n)}
function fxDraw(){fc.clearRect(0,0,W,H);for(let i=parts.length-1;i>=0;i--){const p=parts[i];p.x+=p.vx;p.y+=p.vy;p.vy+=p.kind==='petal'?.04:p.kind==='smoke'?-.02:.08;p.vx*=.98;
  p.life-=p.kind==='petal'?.008:p.kind==='smoke'?.02:.018;p.rot+=.1;if(p.life<=0){parts.splice(i,1);continue}fc.globalAlpha=Math.max(0,p.life)*(p.kind==='smoke'?.5:1);
  if(p.kind==='petal'){fc.save();fc.translate(p.x,p.y);fc.rotate(p.rot);fc.fillStyle=p.col;fc.beginPath();fc.ellipse(0,0,p.r,p.r*.55,0,0,7);fc.fill();fc.restore()}
  else{fc.fillStyle=p.col;fc.beginPath();fc.arc(p.x,p.y,p.r*(p.kind==='smoke'?(2-p.life):1),0,7);fc.fill()}}fc.globalAlpha=1}

/* ======================= game state ======================= */
let G=null,LV=0,playerCfg=[{name:null,bot:false},{name:'Diya',bot:true}];
const pawnMeshes=[];
function pawnSpot(i){const p=G.players[i],base=sq(p.pos||1),same=G.players.filter(q=>(q.pos||1)===(p.pos||1)),k=same.indexOf(p),n=same.length;
 if(n>1){const a=k/n*Math.PI*2+.6;base.x+=Math.cos(a)*.25;base.z+=Math.sin(a)*.25}return base}
function displayName(p){return p.name===null?t('youWord'):p.name}
const humans=()=>G.players.filter(q=>!q.bot).length;

function startLevel(li,restore){
 LV=li;const lv=LEVELS[li];
 G={players:playerCfg.map((c,i)=>({name:c.name,bot:c.bot,color:COLORS[i],pos:0,score:0,bites:0,items:0,cp:0,skip:0,done:{}})),turn:0,busy:false,winner:null,taken:{},usedQ:[],extra:false,intro:false};
 if(restore){G.turn=restore.turn||0;G.taken=restore.taken||{};restore.players.forEach((s,i)=>G.players[i]&&Object.assign(G.players[i],s))}
 buildBoard(lv,li);
 pawnMeshes.forEach(m=>world.remove(m));pawnMeshes.length=0;
 G.players.forEach((p,i)=>{const m=makePawn(p,(displayName(p)[0]||'?').toUpperCase());pawnMeshes.push(m);world.add(m);m.position.copy(pawnSpot(i))});
 $('#rolled').className='';renderUI();setHint(true);
 if(restore){WOW.start();maybeBot();return}
 saveCur();showIntro()}

/* level introduction: one card, one tap to start */
function showIntro(){const lv=LEVELS[LV];G.intro=true;const kinds=[...new Set(Object.values(lv.sp))];
 const c=overlay(`<div class="big">${lv.icon}</div><span class="tag">${t('level')} ${LV+1} / ${LEVELS.length}</span><h3>${tx(lv.place)}</h3><p>${tx(lv.line)}</p>
  <div class="small">${t('newHere')}</div><ul class="legend">${kinds.map(k=>`<li><span>${k==='t'?lv.items[0]:SQ_ICON[k]}</span><div><b>${t('sqName')[k]}</b> · ${t('sqDesc')[k]}</div></li>`).join('')}</ul>
  <button class="go" id="go">${t('letsGo')}</button>`);
 const go=()=>{if(!G.intro)return;G.intro=false;closeOv();firstGesture();SFX.conch();WOW.start();setHint(true);maybeBot()};
 c.querySelector('#go').onclick=go;c.querySelector('#go').focus()}

/* remember the game in progress so a refresh or a closed tab continues where it stopped */
function saveCur(){if(!G||G.winner)return;SAVE.cur={lv:LV,turn:G.turn,taken:G.taken,cfg:playerCfg,players:G.players.map(p=>({pos:p.pos,score:p.score,bites:p.bites,items:p.items,cp:p.cp,skip:p.skip,done:p.done}))};persist()}

/* ======================= UI ======================= */
function renderUI(){
 $('#roll').textContent=G&&G.busy?t('rolling'):t('roll');document.documentElement.lang=lang;document.title=t('title')+' · Snakes & Ladders Adventure';
 $('#lvchip').textContent=`${LEVELS[LV].icon} ${t('level')} ${LV+1}/${LEVELS.length} · ${tx(LEVELS[LV].place)}`;
 $('#prog').innerHTML=LEVELS.map((_,i)=>`<span class="${i===LV?'cur':(SAVE.stars[i]?'done':'')}"></span>`).join('');
 $('#menu').title=t('menu');$('#music').title=t('music');$('#sound').title=t('sound');
 if(!G)return;const lead=Math.max(...G.players.map(p=>p.pos||0));
 $('#players').innerHTML=G.players.map((p,i)=>`<div class="pc ${i===G.turn&&!G.winner?'turn':''}">${lead>0&&(p.pos||0)===lead&&G.players.filter(q=>(q.pos||0)===lead).length===1?`<span class="crown" title="${t('ahead')}">👑</span>`:''}<span class="av" style="background:${p.color}">${p.bot?'<img src="img/diya_wave.png" alt="">':esc((displayName(p)[0]||'?').toUpperCase())}</span><span class="nm"><b>${esc(displayName(p))}</b><small>${p.pos||0} / 100 · <em>⭐ ${p.score}</em></small></span></div>`).join('')}
function setHint(first){if(!G||G.winner)return;const p=G.players[G.turn];
 $('#hint').textContent=first&&!p.bot&&!SAVE.played?(matchMedia('(pointer:coarse)').matches?t('tipStart').replace(/\s*\([^)]*\)/,'').split(/[.!।]/)[0]+'!':t('tipStart')):p.bot?t('botTurn')(displayName(p)):t('yourTurn')(humans()>1?displayName(p):(p.name===null?null:p.name));
 $('#roll').disabled=G.busy||p.bot;$('#roll').classList.toggle('pulse',!G.busy&&!p.bot);renderUI()}
let toastT=null;function toast(msg,cls='',ms=1900){const d=$('#toast div');d.className='';d.textContent=msg;void d.offsetWidth;d.className='on '+cls;clearTimeout(toastT);toastT=setTimeout(()=>d.className=cls,ms)}
function overlay(html,cls=''){$('#overlay').innerHTML=`<div class="ov"><div class="card ${cls}">${html}</div></div>`;return $('#overlay .card')}
function closeOv(){$('#overlay').innerHTML=''}
const ovOpen=()=>!!$('#overlay').innerHTML;

/* ======================= moves ======================= */
function animate(fn,ms){ms*=SPD();return new Promise(res=>{const t0=performance.now();(function st(now){const s=Math.min(1,(now-t0)/ms);fn(s);if(s<1)requestAnimationFrame(st);else res()})(performance.now())})}
async function hopTo(i,target){const p=G.players[i],m=pawnMeshes[i];let step=0;const dir=target>p.pos?1:-1;
 while(p.pos!==target){const from=m.position.clone();p.pos+=dir;const to=sq(p.pos);
  await animate(s=>{m.position.lerpVectors(from,to,s);const h=Math.sin(s*Math.PI);m.position.y=h*.5;m.scale.setScalar(1+h*.28)},160);SFX.hop(step++)}
 m.scale.setScalar(1);const end=pawnSpot(i);await animate(s=>{m.position.lerp(end,s)},90);burstAt(m.position,'spark',8);SFX.land();renderUI()}
async function glideTo(i,n){const m=pawnMeshes[i],from=m.position.clone();G.players[i].pos=n;const to=pawnSpot(i);await animate(s=>{m.position.lerpVectors(from,to,s);m.position.y=Math.sin(s*Math.PI)*.8;m.scale.setScalar(1+Math.sin(s*Math.PI)*.3)},600);m.scale.setScalar(1);renderUI()}
async function followPath(i,path,ms,lift){const m=pawnMeshes[i];const curve=new THREE.CatmullRomCurve3(path.map(v=>v.clone()));
 await animate(s=>{const e=s<.5?2*s*s:1-Math.pow(-2*s+2,2)/2;const v=curve.getPointAt(e);m.position.set(v.x,v.y+lift,v.z);if(Math.random()<.4)burstAt(m.position,lift>.2?'green':'smoke',1)},ms)}
function addScore(p,n,at){p.score+=n;if(at)burstAt(at,'spark',14);renderUI()}

/* ---------- cards ---------- */
function pickQ(){const ok=q=>!q.d||q.d<=SAVE.set.diff+1;let pool=QUESTIONS.map((_,i)=>i).filter(i=>ok(QUESTIONS[i])&&!G.usedQ.includes(i));
 if(!pool.length){G.usedQ=[];pool=QUESTIONS.map((_,i)=>i).filter(i=>ok(QUESTIONS[i]))}const q=pool[Math.random()*pool.length|0];G.usedQ.push(q);return QUESTIONS[q]}
/* question card → resolves true / false */
function quiz(icon,tag,rightMsg,wrongMsg){const Q=pickQ(),order=[0,1,2].sort(()=>Math.random()-.5);WOW.stop();
 return new Promise(res=>{const c=overlay(`<span class="tag">${icon} ${tag}</span><h3>${tx(Q.q)}</h3><div class="opts">${order.map(i=>`<button class="opt" data-i="${i}">${tx(Q.a[i])}</button>`).join('')}</div><p id="fb"></p>`);
  const choose=i=>{c.querySelectorAll('.opt').forEach(b=>{b.disabled=true;if(+b.dataset.i===0)b.classList.add('right');else if(+b.dataset.i===i)b.classList.add('wrong')});
   const ok=i===0;c.querySelector('#fb').textContent=ok?rightMsg:wrongMsg(tx(Q.a[0]));ok?SFX.right():SFX.wrong();
   if(ok){const r=c.getBoundingClientRect();burst(r.left+r.width/2,r.top+40,'spark',40)}
   c.insertAdjacentHTML('beforeend',`<button class="go" id="ok">${t('ok')}</button>`);const b=c.querySelector('#ok');b.focus();b.onclick=()=>{closeOv();WOW.start();res(ok)}};
  c.querySelectorAll('.opt').forEach(b=>b.onclick=()=>choose(+b.dataset.i))})}
/* simple picture + text card → resolves when closed */
function infoCard(icon,tag,title,text){WOW.stop();return new Promise(res=>{const c=overlay(`<div class="big">${icon}</div><span class="tag">${tag}</span>${title?`<h3>${title}</h3>`:''}<p>${text}</p><button class="go" id="ok">${t('ok')}</button>`);
 const b=c.querySelector('#ok');b.focus();b.onclick=()=>{closeOv();WOW.start();res()}})}

/* ---------- what happens on the square a player stops on ---------- */
async function resolveSquare(i,depth=0){const p=G.players[i],lv=LEVELS[LV],m=pawnMeshes[i];if(p.pos>=100)return;
 const lad=hoverables.find(h=>h.userData.kind==='ladder'&&h.userData.from===p.pos),snk=hoverables.find(h=>h.userData.kind==='snake'&&h.userData.from===p.pos);
 if(lad){toast(`🪜 ${t('ladderUp')} ${lad.userData.from} → ${lad.userData.to} · ${tx(lad.userData.title)}`,'ladder',2300);SFX.ladder();glowObj(lad,0x46b882);
  await followPath(i,lad.userData.path,1000,.25);p.pos=lad.userData.to;m.position.copy(pawnSpot(i));addScore(p,10,m.position);return resolveSquare(i,depth+1)}
 if(snk){toast(`🐍 ${t('snakeDown')} ${snk.userData.from} → ${snk.userData.to} · ${tx(snk.userData.title)}`,'snake',2300);SFX.snake();shake=.25;p.bites++;snk.userData.bite=performance.now();glowObj(snk,0xe0405a);
  await followPath(i,snk.userData.path,1300,.1);p.pos=snk.userData.to;m.position.copy(pawnSpot(i));burstAt(m.position,'smoke',14);renderUI();
  if(p.cp>p.pos){await sleep(350*SPD());toast(t('cpSave'),'ladder');SFX.right();await glideTo(i,p.cp)}return}
 const ty=lv.sp[p.pos];if(!ty||depth>2)return;const n=p.pos,key=ty+n;
 if(ty==='s'){if(!p.done[key]){p.done[key]=1;addScore(p,10,m.position);toast('⭐ +10');SFX.bell()}}
 else if(ty==='t'){if(!G.taken[n]){G.taken[n]=1;p.items++;const s=itemObjs[n];if(s){boardGroup.remove(s);delete itemObjs[n]}addScore(p,20,m.position);toast(`${itemIcon(lv,n)} ${t('treasure')} +20`);SFX.right()}}
 else if(ty==='k'){if(p.cp<n){p.cp=n;toast(t('cpSet'));SFX.bell();burstAt(m.position,'green',20)}}
 else if(ty==='b'){G.extra=true;toast(t('bonusRoll'));SFX.right()}
 else if(ty==='y'){if(!p.done[key]){p.done[key]=1;addScore(p,5);const sc=lv.scenes.length?lv.scenes[Object.keys(p.done).filter(k=>k[0]==='y').length%lv.scenes.length]:lv.line;
   if(!p.bot)await infoCard('📜',`${t('storyTag')} · ${tx(lv.place)}`,'',tx(sc));else toast('📜 '+t('storyTag'))}}
 else if(ty==='m'){const r=Math.random(),o=r<.3?'mPts':r<.6?'mFwd':r<.8?'mRoll':'mBack';
  if(!p.bot)await infoCard('🔮',t('sqName').m,'',t(o));else toast('🔮 '+t(o),'',2000);
  if(o==='mPts')addScore(p,20,m.position);else if(o==='mRoll')G.extra=true;
  else{await hopTo(i,Math.max(1,Math.min(100,n+(o==='mFwd'?3:-2))));return resolveSquare(i,depth+1)}}
 else if(ty==='q'||ty==='c'){const big=ty==='c',pts=big?25:15,steps=big?3:2;
  const ok=p.bot?Math.random()<lv.bot:await quiz(SQ_ICON[ty],t('sqName')[ty],big?t('qRight').replace('15','§').replace('2',steps).replace('§',pts):t('qRight'),t('wrong'));
  if(p.bot)toast(`${SQ_ICON[ty]} ${displayName(p)}: ${ok?'✓':'✗'}`);
  if(ok){addScore(p,pts,m.position);await hopTo(i,Math.min(100,n+steps));return resolveSquare(i,depth+1)}}
 else if(ty==='o'){const ok=p.bot?Math.random()<lv.bot:await quiz('🚧',t('sqName').o,t('oRight'),t('oWrong'));
  if(!ok){p.skip=1;if(p.bot)toast('🚧 '+t('skip')(displayName(p)))}else if(p.bot)toast('🚧 ✓')}}
function glowObj(g,col){g.traverse(o=>{if(o.material&&o.material.emissive){o.material.emissive.setHex(col);o.material.emissiveIntensity=.6}});setTimeout(()=>g.traverse(o=>{if(o.material&&o.material.emissive)o.material.emissiveIntensity=0}),1300)}

const forced=[];   /* QA only: queued dice values (?qa) */
async function takeTurn(){
 if(!G||G.busy||G.winner||G.intro)return;G.busy=true;$('#roll').disabled=true;$('#roll').classList.remove('pulse');$('#roll').textContent=t('rolling');SAVE.played=1;
 const i=G.turn,p=G.players[i];G.extra=false;
 const v=forced.length&&i===0?forced.shift():1+Math.floor(Math.random()*6);$('#rolled').className='';SFX.dice();await rollDie(v);$('#rolled').textContent=v;$('#rolled').className='on';
 if(p.pos===0){p.pos=1;pawnMeshes[i].position.copy(pawnSpot(i));if(v>1)await hopTo(i,v);else renderUI()}
 else if(p.pos+v>100){const back=200-(p.pos+v);await hopTo(i,100);toast(t('bounce'));SFX.wrong();await hopTo(i,back)}
 else await hopTo(i,p.pos+v);
 await resolveSquare(i);renderUI();
 if(p.pos===100){G.winner=p;G.busy=false;return endLevel(p)}
 if(v===6&&!G.extra)toast(t('six'));
 if(v!==6&&!G.extra)nextTurn();
 G.busy=false;saveCur();setHint();maybeBot()}
function nextTurn(){for(let k=0;k<G.players.length;k++){G.turn=(G.turn+1)%G.players.length;const q=G.players[G.turn];if(q.skip){q.skip=0;toast('🚧 '+t('skip')(displayName(q)),'',1600)}else return}}
async function maybeBot(){if(!G||G.winner||G.intro)return;const p=G.players[G.turn];if(p.bot){await sleep(800*SPD());if(!ovOpen())takeTurn();else{const w=setInterval(()=>{if(!ovOpen()){clearInterval(w);takeTurn()}},300)}}}

/* ======================= level end ======================= */
function stars(p){return 1+(p.score>=60?1:0)+(p.bites<=1?1:0)}
function starHtml(n){return `<div class="stars">${[0,1,2].map(i=>`<i class="${i<n?'on':''}">★</i>`).join('')}</div>`}
function endLevel(p){WOW.stop();SAVE.cur=null;persist();renderUI();$('#hint').textContent='';const lv=LEVELS[LV],last=LV===LEVELS.length-1;
 if(!p.bot){p.score+=50;const s=stars(p);SAVE.stars[LV]=Math.max(SAVE.stars[LV]||0,s);SAVE.best[LV]=Math.max(SAVE.best[LV]||0,p.score);SAVE.unlocked=Math.max(SAVE.unlocked,Math.min(LEVELS.length,LV+2));persist();SFX.win();renderUI();
  for(let k=0;k<(last?12:6);k++)setTimeout(()=>burst(W*(.15+Math.random()*.7),H*(.15+Math.random()*.35),'fire',60),k*260);setTimeout(()=>burst(W/2,H*.2,'petal',last?140:70),300);
  setTimeout(()=>{const c=overlay(`${last?'<img class="hero" src="img/return.jpg" alt="">':`<div class="big">${lv.icon}</div>`}<span class="tag">${t('level')} ${LV+1} · ${tx(lv.place)}</span><h3>${t('winTitle')(esc(displayName(p)),tx(lv.goal||lv.place))}</h3>${starHtml(s)}
   <p><b>${t('score')}: ${p.score}</b></p><p>${last?t('finalText'):t('stepText')}</p><p class="small">${t('starsRule')}</p><div class="stack ${last?"":"row"}">${last?'':`<button class="go" id="nx">${t('next')}</button>`}<button class="go alt" id="ag">${t('again')}</button><button class="go ghost" id="mp">${t('map')}</button></div>`);
   c.querySelector('#nx')?.addEventListener('click',()=>{closeOv();startLevel(LV+1)});c.querySelector('#ag').onclick=()=>{closeOv();startLevel(LV)};c.querySelector('#mp').onclick=()=>showMap(true)},900)}
 else{SFX.lose();setTimeout(()=>{const c=overlay(`<div class="big">${lv.icon}</div><span class="tag">${t('level')} ${LV+1} · ${tx(lv.place)}</span><h3>${t('loseTitle')(esc(displayName(p)))}</h3><p>${t('loseText')}</p><div class="stack"><button class="go" id="ag">${t('retry')}</button><button class="go ghost" id="mp">${t('map')}</button></div>`);
   c.querySelector('#ag').onclick=()=>{closeOv();startLevel(LV)};c.querySelector('#mp').onclick=()=>showMap(true)},700)}}

/* ======================= menu, journey map, players, rules ======================= */
function showMap(mustPick){SFX.click();WOW.stop();const c=overlay(`<span class="tag">🗺️ ${t('journey')}</span><h3>${t('mapTitle')}</h3><div class="map">${LEVELS.map((l,i)=>{const open=i<SAVE.unlocked,s=SAVE.stars[i]||0;
 return `<button data-l="${i}" class="${i===LV?'cur':''}" ${open?'':'disabled title="'+t('locked')+'"'}><b>${open?l.icon:'🔒'}</b>${i+1}. ${tx(l.place)}<small>${'★'.repeat(s)}${'☆'.repeat(3-s)}</small></button>`}).join('')}</div>
 <p class="small">${t('locked')}</p>${mustPick===true?'':`<button class="go ghost" id="cl">${t('close')}</button>`}`);
 c.querySelectorAll('[data-l]').forEach(b=>b.onclick=()=>{closeOv();startLevel(+b.dataset.l)});const cl=c.querySelector('#cl');if(cl)cl.onclick=resume}
function resume(){closeOv();if(G&&!G.winner&&!G.intro)WOW.start()}
function showHow(){SFX.click();const c=overlay(`<span class="tag">❔ ${t('howTitle')}</span><p style="margin-top:8px">${t('rules')}</p><ul class="legend">${Object.keys(SQ_TINT).map(k=>`<li><span>${k==='t'?LEVELS[LV].items[0]:SQ_ICON[k]}</span><div><b>${t('sqName')[k]}</b> · ${t('sqDesc')[k]}</div></li>`).join('')}</ul>
 <p class="small">${t('starsRule')}</p><button class="go" id="cl">${t('close')}</button>`);c.querySelector('#cl').onclick=showMenu}
function showMenu(){if(G&&(G.busy||G.intro))return;SFX.click();WOW.stop();
 const seg=(id,opts,cur)=>`<div class="seg" id="${id}">${opts.map(([v,l])=>`<button data-v="${v}" aria-pressed="${String(v)===String(cur)}">${l}</button>`).join('')}</div>`,onoff=[[1,t('on')],[0,t('off')]];
 const c=overlay(`<span class="tag">☰ ${t('menu')}</span>
  <div class="setrow" style="margin-top:10px"><label>${t('language')}</label>${seg('s-lang',[['en','EN'],['hi','हिं'],['kn','ಕನ್ನಡ']],lang)}</div>
  <div class="setrow"><label>${t('music')}</label>${seg('s-mus',onoff,musicOn?1:0)}</div>
  <div class="setrow"><label>${t('sound')}</label>${seg('s-sfx',onoff,sfxOn?1:0)}</div>
  <div class="setrow"><label>${t('fast')}</label>${seg('s-fast',onoff,SAVE.set.fast?1:0)}</div>
  <div class="setrow"><label>${t('qLevel')}</label>${seg('s-diff',t('diff').map((l,i)=>[i,l]),SAVE.set.diff)}</div>
  <div class="stack row" style="margin-top:4px"><button class="go" id="m-how">❔ ${t('howTitle')}</button><button class="go alt" id="m-map">🗺️ ${t('journey')}</button><button class="go alt" id="m-who">👥 ${t('playersBtn')}</button></div>
  <div class="stack" style="margin-top:8px"><button class="go ghost" id="m-re">↺ ${t('restart')}</button><button class="go ghost" id="cl">${t('close')}</button></div>`);
 const on=(id,fn)=>c.querySelectorAll('#'+id+' button').forEach(b=>b.onclick=()=>{SFX.click();fn(b.dataset.v);if(id!=='s-lang')c.querySelectorAll('#'+id+' button').forEach(x=>x.setAttribute('aria-pressed',x===b))});
 on('s-lang',v=>{lang=v;try{localStorage.setItem('sq_lang',lang)}catch(e){}buildBoard(LEVELS[LV],LV);renderUI();setHint();showMenu()});
 on('s-mus',v=>{firstGesture();setMusic(v==='1')});on('s-sfx',v=>setSfx(v==='1'));on('s-fast',v=>{SAVE.set.fast=v==='1';persist()});on('s-diff',v=>{SAVE.set.diff=+v;persist()});
 c.querySelector('#m-how').onclick=showHow;c.querySelector('#m-map').onclick=()=>showMap();c.querySelector('#m-who').onclick=showSetup;
 c.querySelector('#m-re').onclick=()=>{closeOv();startLevel(LV)};c.querySelector('#cl').onclick=resume}

function showSetup(){SFX.click();let cnt=playerCfg.length;const prev=[...playerCfg.map(c=>({...c}))];while(prev.length<4)prev.push({name:t('name')(prev.length),bot:false});
 const c=overlay(`<span class="tag">👥 ${t('playersBtn')}</span><h3>${t('setupTitle')}</h3><p>${t('setupText')}</p><div class="count">${[1,2,3,4].map(n=>`<button data-n="${n}" aria-pressed="${n===cnt}">${n}</button>`).join('')}</div>
  <div class="setup" id="rows"></div><div class="stack"><button class="go" id="st">${t('start')}</button><button class="go ghost" id="cl">${t('close')}</button></div>`);
 const rows=()=>{c.querySelector('#rows').innerHTML=prev.slice(0,cnt).map((r,i)=>`<div class="row"><span class="dot" style="background:${COLORS[i]}"></span><input type="text" id="pn${i}" maxlength="14" value="${esc(r.name===null?t('youWord'):r.name)}"><select id="pb${i}"><option value="h" ${r.bot?'':'selected'}>${t('human')}</option><option value="b" ${r.bot?'selected':''}>${t('bot')}</option></select></div>`).join('')};
 const collect=()=>{for(let i=0;i<cnt;i++){const n=c.querySelector('#pn'+i),b=c.querySelector('#pb'+i);if(n){const v=n.value.trim();prev[i].name=(i===0&&(v===''||v===t('youWord')))?null:(v||t('name')(i));prev[i].bot=b.value==='b'}}};
 rows();c.querySelectorAll('.count button').forEach(b=>b.onclick=()=>{collect();cnt=+b.dataset.n;c.querySelectorAll('.count button').forEach(x=>x.setAttribute('aria-pressed',x===b));rows()});
 c.querySelector('#cl').onclick=showMenu;
 c.querySelector('#st').onclick=()=>{collect();let list=prev.slice(0,cnt);if(cnt===1)list.push({name:'Diya',bot:true});if(list.every(x=>x.bot))list[0].bot=false;playerCfg=list;closeOv();startLevel(LV)}}

/* ======================= portal hooks ======================= */
const WOW={start(){try{window.WOWPortal&&WOWPortal.start&&WOWPortal.start()}catch(e){}},stop(){try{window.WOWPortal&&WOWPortal.stop&&WOWPortal.stop()}catch(e){}}};

/* ======================= input ======================= */
const firstGesture=()=>{ac();startMusic()};
const tryRoll=()=>{if(!$('#roll').disabled&&!ovOpen()){firstGesture();takeTurn()}};
$('#roll').onclick=tryRoll;$('#tray').onclick=tryRoll;
addEventListener('keydown',e=>{if(e.target.tagName==='INPUT'||e.target.tagName==='SELECT')return;
 if(e.key===' '||e.key==='Enter'){if(ovOpen())return;e.preventDefault();tryRoll()}
 if(e.key==='Escape'&&ovOpen()&&$('#overlay #cl'))$('#overlay #cl').click();
 if((e.key==='m'||e.key==='M')&&!ovOpen())showMenu()});
addEventListener('pointerdown',firstGesture,{once:true});
$('#sound').onclick=()=>{setSfx(!sfxOn);SFX.click()};
$('#music').onclick=()=>{firstGesture();setMusic(!musicOn)};
$('#menu').onclick=showMenu;$('#lvchip').onclick=()=>{if(G&&(G.busy||G.intro))return;showMap()};
const ray=new THREE.Raycaster(),mv=new THREE.Vector2();const tip=$('#tip');
canvas.addEventListener('pointermove',e=>{if(e.pointerType!=='mouse')return;
 mv.set((e.clientX-area.x)/area.w*2-1,-(e.clientY-area.y)/area.h*2+1);ray.setFromCamera(mv,camera);const hit=ray.intersectObjects(hoverables,true)[0];
 if(hit){const o=hit.object.userData.owner.userData;tip.textContent=`${o.kind==='snake'?'🐍':'🪜'} ${tx(o.title)} · ${o.from} → ${o.to}`;tip.style.display='block';tip.style.left=Math.min(W-tip.offsetWidth-8,e.clientX+14)+'px';tip.style.top=(e.clientY+14)+'px'}
 else tip.style.display='none'});
canvas.addEventListener('pointerleave',()=>{tip.style.display='none'});
document.addEventListener('visibilitychange',()=>{if(AC){document.hidden?AC.suspend():AC.resume()}if(document.hidden)WOW.stop();else if(G&&!G.winner&&!G.intro&&!ovOpen())WOW.start()});

/* ======================= loop ======================= */
function frame(ts){requestAnimationFrame(frame);placeCamera();if(diceAnim)diceAnim(ts);
 if(G){G.players.forEach((p,i)=>{const r=pawnMeshes[i]?.userData.ring;if(r){const on=i===G.turn&&!G.winner&&!G.busy;r.material.opacity=on?.6+.4*Math.sin(ts/220):0;r.scale.setScalar(1+.08*Math.sin(ts/220))}})}
 hoverables.forEach((h,k)=>{const u=h.userData;if(u.kind==='snake'){const b=u.bite&&ts-u.bite<900?(ts-u.bite)/900:1;u.head.scale.setScalar(1+(b<1?Math.sin(b*Math.PI)*.5:0));u.tongue.scale.x=.5+.5*Math.abs(Math.sin(ts/170+k*1.7))}});
 Object.values(itemObjs).forEach((s,k)=>{const z=.62+.05*Math.sin(ts/380+k);s.scale.set(z,z,1)});
 renderer.setViewport(0,0,W,H);renderer.setScissorTest(false);renderer.clear();
 renderer.setViewport(area.x,H-area.y-area.h,area.w,area.h);renderer.setScissor(area.x,H-area.y-area.h,area.w,area.h);renderer.setScissorTest(true);renderer.render(scene,camera);renderer.setScissorTest(false);
 drend.render(dscene,dcam);fxDraw()}

/* ======================= boot ======================= */
addEventListener('resize',layout);try{new ResizeObserver(()=>layout()).observe(document.querySelector('.rail'))}catch(e){}
syncButtons();renderUI();layout();
{const cur=SAVE.cur;if(cur&&LEVELS[cur.lv]&&cur.cfg&&cur.players&&cur.players.some(p=>p.pos>0)){playerCfg=cur.cfg;startLevel(cur.lv,cur)}else startLevel(Math.min(SAVE.unlocked-1,LEVELS.length-1))}
requestAnimationFrame(frame);
document.fonts?.ready?.then(()=>{numMat.map.dispose();numMat.map=numbersTexture();numMat.needsUpdate=true;if(G)buildBoard(LEVELS[LV],LV)});
if(QA)window.__rta={get G(){return G},get LV(){return LV},startLevel,takeTurn,LEVELS,forced,SAVE};
