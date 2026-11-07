/* After a Deepavali game, lead to the NEXT story's Watch & play section (index.html#dvN: watch the episode, then its game),
   never straight into the next game. Top-bar link + a button on the end screen (shown when a "Play again" button appears).
   The last story game leads to the grand finale, which has no video. */
(function(){
  var ORDER=['road-to-ayodhya','samudra-manthan','lagori','archery','pallanguzhi','catch-drops','navakankari','yamuna-thali','finale'];
  var f=(location.pathname.split('/').pop()||'').replace('.html','');
  var i=ORDER.indexOf(f); if(i<0||i>=ORDER.length-1) return;
  var nxt=ORDER[i+1], ep=i+2, toFinale=(nxt==='finale');
  var T={en:{g:'Next: Episode '+ep+' · Watch & play',fin:'Grand finale'},
         hi:{g:'आगे: एपिसोड '+ep+' · देखें और खेलें',fin:'ग्रैंड फिनाले'},
         kn:{g:'ಮುಂದೆ: ಸಂಚಿಕೆ '+ep+' · ನೋಡಿ ಮತ್ತು ಆಡಿ',fin:'ಗ್ರ್ಯಾಂಡ್ ಫಿನಾಲೆ'}};
  var href=toFinale?nxt+'.html':'index.html#dv'+ep;
  function t(){var l=(document.documentElement.lang||'en').slice(0,2);return T[l]||T.en}
  var css=document.createElement('style');
  css.textContent='.nx-top{margin-left:auto;white-space:nowrap}.nx-box{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin-top:14px}'+
    '.nx-box a{display:inline-flex;align-items:center;min-height:46px;padding:10px 20px;border-radius:999px;font-weight:800;text-decoration:none;font-size:16px}'+
    '.nx-box .nx-g{background:#f6a723;color:#1c1442;box-shadow:0 6px 18px -6px #f6a723}.nx-box .nx-e{background:transparent;color:#ffd35a;border:2px solid #ffd35a88}';
  document.head.appendChild(css);
  var back=document.getElementById('back');
  var top=document.createElement('a'); top.className=(back?back.className+' ':'')+'nx-top'; top.href=href;
  function paintTop(){ var v=(toFinale?t().fin:t().g)+' →'; if(top.textContent!==v) top.textContent=v }
  paintTop(); if(back&&back.parentNode){ back.parentNode.insertBefore(top, back.nextSibling) }
  var AGAIN=['Play again','फिर से खेलें','ಮತ್ತೆ ಆಡಿ','Churn again','फिर से मंथन','ಮತ್ತೆ ಮಥಿಸಿ'];
  var ov=document.getElementById('overlay');
  function check(){
    paintTop(); if(!ov) return;
    var btn=[].slice.call(ov.querySelectorAll('button')).filter(function(b){return AGAIN.indexOf(b.textContent.trim())>=0})[0];
    var box=ov.querySelector('.nx-box');
    if(btn&&!box){
      box=document.createElement('div'); box.className='nx-box';
      box.innerHTML='<a class="nx-g" href="'+href+'">'+(toFinale?'🏆 '+t().fin:'🎬 '+t().g)+' →</a>';
      (btn.parentNode||ov).appendChild(box);
    }
  }
  var pend=false; new MutationObserver(function(){ if(pend) return; pend=true; requestAnimationFrame(function(){ pend=false; check() }) }).observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['lang','class','style','hidden']});
  check();
})();
