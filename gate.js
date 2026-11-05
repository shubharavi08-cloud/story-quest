/* World of Wonders: "watch first, then play".
   A game page includes:  <script src="gate.js" data-key="lagori" data-yt='{"en":"ID","hi":"ID"}' data-back="index.html#dv3"></script>
   The game stays covered until the story video (a YouTube embed, so the view counts on YouTube) has been watched to 70% or the end.
   Episode pages can call WOWGate.track(iframe, key) on their own YouTube iframe so a watch there unlocks the game too.
   Remembered per browser (localStorage); a convenience gate, not a security wall. */
(function(){
  var ME=document.currentScript;
  var KEYP='wow-watched-';
  function has(k){try{return localStorage.getItem(KEYP+k)==='1'}catch(e){return false}}
  function mark(k){try{localStorage.setItem(KEYP+k,'1')}catch(e){}}
  function lang(){var l='en';try{l=localStorage.getItem('jb_lang')||localStorage.getItem('wow-lang')||'en'}catch(e){}return /^(en|hi|kn)$/.test(l)?l:'en'}
  var T={
    en:{h:'First, watch the story',p:'The game opens when you have watched the video. Story first, then play!',bar:'Game unlocks at 70%',go:'▶ Play the game',done:'Unlocked! Your game is ready.',yt:'Watch on YouTube ↗',back:'← Back'},
    hi:{h:'पहले कहानी देखिए',p:'वीडियो देखने के बाद गेम खुलेगा। पहले कहानी, फिर खेल!',bar:'70% पर गेम खुलेगा',go:'▶ गेम खेलिए',done:'गेम खुल गया!',yt:'YouTube पर देखें ↗',back:'← वापस'},
    kn:{h:'ಮೊದಲು ಕಥೆ ನೋಡಿ',p:'ವಿಡಿಯೋ ನೋಡಿದ ನಂತರ ಆಟ ತೆರೆಯುತ್ತದೆ. ಮೊದಲು ಕಥೆ, ನಂತರ ಆಟ!',bar:'70% ನಲ್ಲಿ ಆಟ ತೆರೆಯುತ್ತದೆ',go:'▶ ಆಟ ಆಡಿ',done:'ಆಟ ತೆರೆಯಿತು!',yt:'YouTube ನಲ್ಲಿ ನೋಡಿ ↗',back:'← ಹಿಂದೆ'}
  };

  /* load the YouTube IFrame API once */
  var apiReady=null;
  function api(){
    if(apiReady)return apiReady;
    apiReady=new Promise(function(res){
      if(window.YT&&window.YT.Player)return res(window.YT);
      var prev=window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady=function(){if(prev)try{prev()}catch(e){};res(window.YT)};
      var s=document.createElement('script');s.src='https://www.youtube.com/iframe_api';document.head.appendChild(s);
    });
    return apiReady;
  }

  /* watch an existing or new player; call onPct(fraction) and onDone() */
  function watch(target,opts){
    return api().then(function(YT){
      var timer=null,fired=false;
      var p=new YT.Player(target,Object.assign({events:{
        onStateChange:function(e){
          if(e.data===YT.PlayerState.ENDED){finish();return}
          if(e.data===YT.PlayerState.PLAYING&&!timer){timer=setInterval(tick,1000)}
          if(e.data!==YT.PlayerState.PLAYING&&timer){clearInterval(timer);timer=null}
        }}},opts.player||{}));
      function tick(){try{var d=p.getDuration(),t=p.getCurrentTime();if(d>0){var f=t/d;opts.onPct&&opts.onPct(Math.min(1,f/0.7));if(f>=0.7||d-t<5)finish()}}catch(e){}}
      function finish(){if(fired)return;fired=true;if(timer){clearInterval(timer);timer=null}opts.onPct&&opts.onPct(1);opts.onDone&&opts.onDone()}
      return p;
    });
  }

  window.WOWGate={
    watched:has,
    /* for episode pages: iframe src must include enablejsapi=1 */
    track:function(iframe,key){if(!iframe||!key||has(key))return;watch(iframe,{onDone:function(){mark(key)}})}
  };

  /* game-page mode */
  if(!ME||!ME.dataset.key)return;
  var key=ME.dataset.key; if(has(key))return;
  var ids={};try{ids=JSON.parse(ME.dataset.yt||'{}')}catch(e){}
  var L=lang(), t=T[L], vid=ids[L]||ids.en||ids[Object.keys(ids)[0]];
  if(!vid)return; /* no video yet for this game: leave it open */
  var back=ME.dataset.back||'index.html';

  var css=document.createElement('style');
  css.textContent='#wowGate{position:fixed;inset:0;z-index:9999;background:radial-gradient(circle at 50% 0,#2a1f5c,#120c2e 70%);color:#fdf3dc;overflow:auto;font-family:Mukta,"Noto Sans Kannada","Segoe UI",system-ui,sans-serif;padding:max(16px,env(safe-area-inset-top,0px)) max(16px,env(safe-area-inset-right,0px)) 40px max(16px,env(safe-area-inset-left,0px))}'+
   '#wowGate .in{max-width:860px;margin:0 auto;display:flex;flex-direction:column;gap:14px}'+
   '#wowGate h2{font:800 clamp(26px,5vw,40px)/1.1 "Baloo 2","Baloo Tamma 2",system-ui,sans-serif;margin:8px 0 0}'+
   '#wowGate p{margin:0;color:#c7bce6}'+
   '#wowGate .v{position:relative;width:100%;aspect-ratio:16/9;max-height:62vh;border-radius:18px;overflow:hidden;background:#000;border:1px solid rgba(253,243,220,.14)}'+
   '#wowGate .v iframe,#wowGate .v>div{position:absolute;inset:0;width:100%;height:100%;border:0}'+
   '#wowGate .bar{height:12px;border-radius:999px;background:rgba(253,243,220,.12);overflow:hidden}#wowGate .bar i{display:block;height:100%;width:0;background:linear-gradient(90deg,#f6a723,#ffd35a);transition:width .6s}'+
   '#wowGate .row{display:flex;gap:10px;flex-wrap:wrap;align-items:center;justify-content:space-between}'+
   '#wowGate .btn{font:700 17px Mukta,system-ui,sans-serif;background:#f6a723;color:#1c1442;border:0;border-radius:999px;padding:12px 24px;cursor:pointer;text-decoration:none}'+
   '#wowGate .btn[disabled]{opacity:.45;cursor:not-allowed}#wowGate a.lnk{color:#ffd35a}'+
   'html.wow-gated,html.wow-gated body{overflow:hidden}';
  document.head.appendChild(css);
  var g=document.createElement('div'); g.id='wowGate'; g.setAttribute('role','dialog'); g.setAttribute('aria-modal','true');
  g.innerHTML='<div class="in"><a class="lnk" href="'+back+'">'+t.back+'</a><h2>🎬 '+t.h+'</h2><p>'+t.p+'</p>'+
   '<div class="v"><div id="wowGateP"></div></div>'+
   '<div class="row"><span style="flex:1;min-width:180px"><small style="color:#c7bce6">'+t.bar+'</small><div class="bar"><i id="wowGateB"></i></div></span>'+
   '<button class="btn" id="wowGateGo" disabled>'+t.go+'</button></div>'+
   '<a class="lnk" target="_blank" rel="noopener" href="https://youtu.be/'+vid+'">'+t.yt+'</a></div>';
  function mount(){document.body.appendChild(g);document.documentElement.classList.add('wow-gated');
    watch('wowGateP',{player:{videoId:vid,playerVars:{rel:0,playsinline:1,modestbranding:1}},
      onPct:function(f){var b=document.getElementById('wowGateB');if(b)b.style.width=Math.round(f*100)+'%'},
      onDone:function(){mark(key);var b=document.getElementById('wowGateGo');if(b){b.disabled=false;b.textContent=t.go;b.focus()}}});
    document.getElementById('wowGateGo').onclick=function(){g.remove();document.documentElement.classList.remove('wow-gated');try{window.dispatchEvent(new Event('resize'))}catch(e){}};
  }
  if(document.body)mount();else document.addEventListener('DOMContentLoaded',mount);
})();
