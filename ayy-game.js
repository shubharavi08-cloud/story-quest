/* World of Wonders · Ayyappa step games runtime (on top of dasara-kit.js + ayy-kit.js).
   One call, AG.game({...}), gives a game its canvas, loop, touch, how-to card, song window, tips, sparkles and end card.
   Each step game only writes its own rules: init/start/update/draw/down/move/up. */
(function(){
var AG={};window.AG=AG;
var T=DK.t,$=function(s){return document.querySelector(s)};
AG.FONT='"Baloo 2","Baloo Tamma 2","Baloo Thambi 2","Baloo Tammudu 2",system-ui,sans-serif';
AG.rnd=function(a,b){return a+Math.random()*(b-a)};
AG.clamp=function(v,a,b){return v<a?a:v>b?b:v};
AG.ease=function(u){u=AG.clamp(u,0,1);return u*u*(3-2*u)};
/* text with a dark outline, readable on any painting */
AG.text=function(cx,s,x,y,size,col,o){o=o||{};cx.save();cx.font=(o.w||800)+' '+size+'px '+AG.FONT;cx.textAlign=o.align||'center';cx.textBaseline=o.base||'alphabetic';
 if(o.alpha!=null)cx.globalAlpha=o.alpha;cx.lineJoin='round';var lw=o.lw!=null?o.lw:Math.max(3,size/4.5);if(lw>0){cx.lineWidth=lw;cx.strokeStyle=o.stroke||'rgba(20,8,30,.85)';cx.strokeText(s,x,y)}cx.fillStyle=col||'#fff';cx.fillText(s,x,y);cx.restore()};
/* text wrapped into lines that fit maxW */
AG.wrap=function(cx,s,maxW,size){cx.font='700 '+size+'px '+AG.FONT;var words=String(s).split(' '),lines=[],cur='';words.forEach(function(w){var t=cur?cur+' '+w:w;if(cx.measureText(t).width>maxW&&cur){lines.push(cur);cur=w}else cur=t});if(cur)lines.push(cur);return lines};
AG.panel=function(cx,x,y,w,h,r,o){o=o||{};cx.save();cx.fillStyle=o.fill||'rgba(16,8,30,.62)';cx.beginPath();cx.roundRect(x,y,w,h,r);cx.fill();cx.strokeStyle=o.stroke||'rgba(255,211,90,.45)';cx.lineWidth=o.lw||2;cx.stroke();cx.restore()};
AG.img=function(src){return AY.img(src)};
/* a painting covering the canvas; dim 0..1 darkens it */
AG.bg=function(cx,src,W,H,dim,fy){if(!AY.cover(cx,src,0,0,W,H,fy==null?.5:fy)){var g=cx.createLinearGradient(0,0,0,H);g.addColorStop(0,'#2a1748');g.addColorStop(1,'#120a22');cx.fillStyle=g;cx.fillRect(0,0,W,H)}if(dim){cx.fillStyle='rgba(10,5,20,'+dim+')';cx.fillRect(0,0,W,H)}};

/* parallax silhouettes that tile over 960 px: kind 'hill' (soft ridges) or 'trees' (canopy + a few palms) */
AG.silhouette=function(seed,col,base,amp,kind,H){var c=document.createElement('canvas');c.width=960;c.height=H||760;var x=c.getContext('2d'),r=seed;function rn(){r=(r*16807)%2147483647;return r/2147483647}
 var ph=[rn()*6,rn()*6,rn()*6],P=960;x.fillStyle=col;x.beginPath();x.moveTo(0,c.height);
 for(var i=0;i<=P;i+=4){var y=base;if(kind==='hill')y-=amp*(.55*Math.sin(i/P*6.283*2+ph[0])+.3*Math.sin(i/P*6.283*5+ph[1])+.15*Math.sin(i/P*6.283*11+ph[2]));
  else{y-=amp*(.5+.5*Math.sin(i/P*6.283*3+ph[0]))*.4;y-=Math.abs(Math.sin(i/P*6.283*24+ph[1]))*amp*.35+Math.abs(Math.sin(i/P*6.283*57+ph[2]))*amp*.15}x.lineTo(i,y)}
 x.lineTo(P,c.height);x.fill();
 if(kind==='trees'){for(var k=0;k<6;k++){var tx=(k+.3+rn()*.4)*P/6,th=amp*1.4+rn()*amp;x.fillRect(tx,base-th,5,th);for(var j=0;j<11;j++){var an=-Math.PI*.95+j/10*Math.PI*.9,dx=Math.cos(an),Ln=44+rn()*14;x.beginPath();x.moveTo(tx+2,base-th);x.quadraticCurveTo(tx+2+dx*Ln*.5,base-th-14+Math.abs(dx)*6,tx+2+dx*Ln,base-th+10+Math.abs(dx)*16);x.quadraticCurveTo(tx+2+dx*Ln*.5,base-th-6,tx+2,base-th+4);x.fill()}}}
 return c};
AG.tile=function(cx,img,off){var o=((off%960)+960)%960;cx.drawImage(img,-o,0);cx.drawImage(img,960-o,0)};
/* a dusk or dawn sky with a glowing sun and a few stars */
AG.sky=function(cx,W,h,t,o){o=o||{};var g=cx.createLinearGradient(0,0,0,h);(o.stops||[[0,'#2b1d4a'],[.45,'#a8506a'],[.8,'#f29a5a'],[1,'#ffd08a']]).forEach(function(s){g.addColorStop(s[0],s[1])});cx.fillStyle=g;cx.fillRect(0,0,W,h);
 var sx=o.sx==null?W*.7:o.sx,sy=o.sy==null?h*.5:o.sy,sg=cx.createRadialGradient(sx,sy,8,sx,sy,o.sr||180);sg.addColorStop(0,'rgba(255,240,200,.95)');sg.addColorStop(.15,'rgba(255,220,150,.55)');sg.addColorStop(1,'rgba(255,200,120,0)');cx.fillStyle=sg;cx.fillRect(0,0,W,h);
 for(var i=0;i<(o.stars==null?30:o.stars);i++){cx.fillStyle='rgba(255,255,255,'+(.25+.25*Math.sin(t*2+i))+')';cx.fillRect((i*97)%W,(i*53)%(h*.4),1.5,1.5)}};
AG.haze=function(cx,W,y0,y1,col,a){var g=cx.createLinearGradient(0,y0,0,y1);g.addColorStop(0,'rgba('+col+',0)');g.addColorStop(1,'rgba('+col+','+a+')');cx.fillStyle=g;cx.fillRect(0,y0,W,y1-y0)};
AG.game=function(D){
 var cv=$('#cv'),cx=cv.getContext('2d'),W=D.W||480,H=D.H||760;cv.width=W;cv.height=H;
 var S=null,last=performance.now(),bok=[],parts=[],floats=[];
 for(var i=0;i<22;i++)bok.push({x:Math.random()*W,y:Math.random()*H,r:6+Math.random()*24,v:5+Math.random()*12,a:.04+Math.random()*.1,p:Math.random()*6});
 var api={W:W,H:H,cx:cx,L:D.L,
  t:function(o){return T(o)},
  burst:function(x,y,col,n,sp){for(var i=0;i<(n||16);i++){var a=Math.random()*6.283,v=(sp||1)*(50+Math.random()*170);parts.push({x:x,y:y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-70,l:1,c:col||'#ffd35a',r:2+Math.random()*3})}},
  float:function(s,x,y,col){floats.push({s:s,x:x,y:y,l:1,c:col||'#ffe08a'})},
  tip:function(html,cls){var e=$('#tip');clearTimeout(api._tt);if(!html){e.className='toast2';return}e.innerHTML=html;e.className='toast2 on '+(cls||'');api._tt=setTimeout(function(){e.className='toast2'},cls==='bad'?2600:3800)},
  hud:function(items){$('#hud').innerHTML=items.map(function(x){return '<span>'+x[0]+' <b>'+x[1]+'</b></span>'}).join('')},
  get S(){return S},
  finish:function(stars,paras){if(!S||S.over)return;S.over=true;setTimeout(function(){AY.end({key:D.key,stars:stars,title:T(D.L.endT),art:D.art,paras:(paras||[]).concat([T(D.L.endP)]),shareText:D.L.shareText,again:function(){newGame();intro()}})},D.endDelay==null?900:D.endDelay)},
  good:function(){DK.chime((S&&S.score)||0);DK.vib(12)},bad:function(){DK.oops();DK.vib(50)}
 };
 function newGame(){S={t:0,score:0,over:false,run:false};D.init&&D.init(S,api);applyLang()}
 function pt(e){var r=cv.getBoundingClientRect();return{x:(e.clientX-r.left)*W/r.width,y:(e.clientY-r.top)*H/r.height}}
 cv.addEventListener('pointerdown',function(e){if(!S||S.over)return;DK.ac&&DK.ac();try{cv.setPointerCapture(e.pointerId)}catch(x){}D.down&&D.down(pt(e),S,api)});
 cv.addEventListener('pointermove',function(e){if(!S||S.over)return;D.move&&D.move(pt(e),S,api)});
 cv.addEventListener('pointerup',function(e){if(!S||S.over)return;D.up&&D.up(pt(e),S,api)});
 cv.addEventListener('pointercancel',function(e){if(!S)return;D.up&&D.up(null,S,api)});
 addEventListener('keydown',function(e){if(S&&!S.over&&D.key_&&!DK.isOpen())D.key_(e,S,api)});
 function frame(now){var dt=Math.min(.05,(now-last)/1000);last=now;var t=now/1000;
  if(S){S.t+=dt;if(S.run&&!S.over&&D.update)D.update(dt,S,api)}
  parts.forEach(function(p){p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=360*dt;p.l-=dt*1.3});parts=parts.filter(function(p){return p.l>0});
  floats.forEach(function(f){f.y-=40*dt;f.l-=dt*.9});floats=floats.filter(function(f){return f.l>0});
  cx.clearRect(0,0,W,H);if(S&&D.draw)D.draw(cx,t,S,api);
  if(D.bokeh!==false){cx.save();cx.globalCompositeOperation='lighter';bok.forEach(function(b){b.y-=b.v*dt;if(b.y<-30){b.y=H+30;b.x=Math.random()*W}var g=cx.createRadialGradient(b.x,b.y,0,b.x,b.y,b.r),a=b.a*(.6+.4*Math.sin(t*1.3+b.p));g.addColorStop(0,'rgba(255,200,110,'+a+')');g.addColorStop(1,'rgba(255,200,110,0)');cx.fillStyle=g;cx.beginPath();cx.arc(b.x,b.y,b.r,0,6.283);cx.fill()});cx.restore()}
  parts.forEach(function(p){cx.globalAlpha=Math.max(0,p.l);cx.fillStyle=p.c;cx.beginPath();cx.arc(p.x,p.y,p.r,0,6.283);cx.fill()});cx.globalAlpha=1;
  floats.forEach(function(f){AG.text(cx,f.s,f.x,f.y,24,f.c,{alpha:Math.max(0,f.l)})});
  if(S&&D.overlay)D.overlay(cx,t,S,api);
  requestAnimationFrame(frame)}
 function applyLang(){$('#t-eyebrow').textContent=T(D.L.eyebrow||AG.EYEBROW);$('#t-title').textContent=T(D.L.title);$('#back').textContent=T(AY.ui.back);document.title=T(D.L.title)+' · World of Wonders';if(S&&D.lang)D.lang(S,api)}
 function intro(){AY.how({art:D.art,label:T(D.L.eyebrow||AG.EYEBROW),title:T(D.L.storyT),paras:T(D.L.story),steps:T(D.L.how),demo:D.demo?function(x,w,h,t){D.demo(x,w,h,t,api)}:null,demoH:D.demoH||280,go:T(D.L.go||AG.GO),video:D.video,muted:D.muted,on:function(){S.run=true;D.start&&D.start(S,api)}})}
 DK.onLang(function(){applyLang();if(DK.isOpen()&&S&&!S.run&&!S.over)intro()});
 $('#newgame').onclick=function(){newGame();intro()};
 DK.music(D.key,D.music||{sa:146.83,scale:[0,2,4,7,9,12,14,16],tempo:.7});
 AY.pills($('#langs'));
 /* start after AG.game() has returned, so the game's own code can use its api */
 Promise.resolve().then(function(){newGame();requestAnimationFrame(frame);DK.whenUngated(intro)});
 window.__S=function(){return S};window.__api=api;
 return api};
AG.EYEBROW={en:'Ayyappa season game',kn:'ಅಯ್ಯಪ್ಪ ಸೀಸನ್ ಆಟ',ta:'ஐயப்பன் சீசன் விளையாட்டு',te:'అయ్యప్ప సీజన్ ఆట'};
AG.GO={en:'Start 🙏',kn:'ಶುರು ಮಾಡಿ 🙏',ta:'தொடங்கு 🙏',te:'మొదలు పెట్టు 🙏'};
})();
