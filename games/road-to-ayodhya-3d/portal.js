/* World of Wonders · portal adapter (added only to the copies we send to game portals; never used on our own site).
   - Shows ONE ad at a natural break: when the player presses "Play again" / "New game" on an end screen.
   - Pauses every sound while an ad plays (Web Audio + <audio>), as portals require.
   - Tells the portal when gameplay starts and stops.
   Portal is chosen by window.WOW_PORTAL = 'crazygames' | 'gamedistribution' | 'itch'. */
(function(){
  var P=window.WOW_PORTAL||'itch';
  /* ---- track every sound source so we can mute during ads ---- */
  var ctxs=[];
  ['AudioContext','webkitAudioContext'].forEach(function(n){var C=window[n];if(!C)return;
    var W=function(){var c=new (Function.prototype.bind.apply(C,[null].concat([].slice.call(arguments))))();ctxs.push(c);return c};
    W.prototype=C.prototype;try{window[n]=W}catch(e){}});
  function mute(on){ctxs.forEach(function(c){try{on?c.suspend():c.resume()}catch(e){}});
    [].forEach.call(document.querySelectorAll('audio,video'),function(m){if(on){m._wowWas=!m.paused;m.pause()}else if(m._wowWas){m.play().catch(function(){})}})}

  /* ---- portal SDKs behind one tiny interface ---- */
  var ready=Promise.resolve(), api={ad:function(done){done()},start:function(){},stop:function(){}};
  if(P==='crazygames'){
    ready=new Promise(function(res){var s=document.createElement('script');s.src='https://sdk.crazygames.com/crazygames-sdk-v3.js';
      s.onload=function(){try{window.CrazyGames.SDK.init().then(res,res)}catch(e){res()}};s.onerror=res;document.head.appendChild(s)});
    api.ad=function(done){var sdk=window.CrazyGames&&window.CrazyGames.SDK;if(!sdk||!sdk.ad){done();return}var fin=false,end=function(){if(fin)return;fin=true;mute(false);done()};
      try{sdk.ad.requestAd('midgame',{adStarted:function(){mute(true)},adFinished:end,adError:end})}catch(e){end()}};
    api.start=function(){try{window.CrazyGames.SDK.game.gameplayStart()}catch(e){}};
    api.stop=function(){try{window.CrazyGames.SDK.game.gameplayStop()}catch(e){}};
  } else if(P==='gamedistribution'){
    var pending=null;
    window.GD_OPTIONS={gameId:window.WOW_GD_ID||'',onEvent:function(e){
      if(e.name==='SDK_GAME_PAUSE')mute(true);
      if(e.name==='SDK_GAME_START'){mute(false);if(pending){var p=pending;pending=null;p()}}
      if(e.name==='SDK_ERROR'||e.name==='AD_ERROR'){mute(false);if(pending){var q=pending;pending=null;q()}}}};
    ready=new Promise(function(res){var s=document.createElement('script');s.id='gamedistribution-jssdk';s.src='https://html5.api.gamedistribution.com/main.min.js';s.onload=res;s.onerror=res;document.head.appendChild(s)});
    api.ad=function(done){if(typeof window.gdsdk==='undefined'||!window.gdsdk.showAd){done();return}pending=done;
      try{window.gdsdk.showAd().catch(function(){if(pending){pending=null;mute(false);done()}})}catch(e){pending=null;done()}
      setTimeout(function(){if(pending){var p=pending;pending=null;mute(false);p()}},45000)};
  }
  var playing=false;window.WOWPortal={ad:function(done){ready.then(function(){api.stop();playing=false;api.ad(function(){done&&done()})})},
    start:function(){ready.then(function(){if(!playing){playing=true;api.start()}})},stop:function(){ready.then(function(){if(playing){playing=false;api.stop()}})}};

  /* ---- natural break: "Play again" / "New game" buttons ---- */
  var AGAIN=['Play again','फिर से खेलें','ಮತ್ತೆ ಆಡಿ','Next level','अगला स्तर','ಮುಂದಿನ ಹಂತ','Try again','फिर कोशिश करो','ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ','Churn again','फिर से मंथन','ಮತ್ತೆ ಮಥಿಸಿ','New game','↻'];
  var last=0;
  document.addEventListener('click',function(e){
    var b=e.target.closest&&e.target.closest('button,a');if(!b||b._wowPass)return;
    var t=(b.textContent||'').trim();if(AGAIN.indexOf(t)<0&&b.id!=='newgame')return;
    if(Date.now()-last<120000)return;          /* at most one ad every 2 minutes */
    e.preventDefault();e.stopImmediatePropagation();last=Date.now();
    window.WOWPortal.ad(function(){b._wowPass=true;b.click();b._wowPass=false});
  },true);
})();
