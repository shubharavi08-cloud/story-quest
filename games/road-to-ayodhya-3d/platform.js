/* Road to Ayodhya · platform adapter layer.
   The game engine never talks to a publisher SDK directly: it calls window.WOWPortal (below).
   Exactly ONE adapter is active, chosen by window.WOW_PORTAL (set in index.html by the build):
     'standalone'        no SDK, no ads, no network calls (our own sites, OSH)
     'crazygames'        CrazyGames HTML5 SDK v3
     'poki'              Poki SDK v2
     'gamedistribution'  GameDistribution HTML5 SDK
   Only the chosen SDK script is ever loaded. If an SDK fails to load, the game still runs. */
(function(){
  var P=window.WOW_PORTAL||'standalone';

  /* ---- sound: every AudioContext is tracked so it can be silenced during ads or by the portal's mute setting ---- */
  var ctxs=[],adMute=false,portalMute=false,muteCb=[];
  ['AudioContext','webkitAudioContext'].forEach(function(n){var C=window[n];if(!C)return;
    var W=function(){var c=new (Function.prototype.bind.apply(C,[null].concat([].slice.call(arguments))))();ctxs.push(c);if(adMute||portalMute){try{c.suspend()}catch(e){}}return c};
    W.prototype=C.prototype;try{window[n]=W}catch(e){}});
  function applyMute(){var on=adMute||portalMute;ctxs.forEach(function(c){try{on?c.suspend():(document.hidden||c.resume())}catch(e){}});muteCb.forEach(function(f){try{f(on)}catch(e){}})}

  /* ---- one small interface; each adapter fills in what its portal needs ---- */
  var A={ready:Promise.resolve(),loaded:function(){},start:function(){},stop:function(){},ad:function(done){done()},pauseOnHide:true};
  function loadScript(src,id){return new Promise(function(res){var s=document.createElement('script');if(id)s.id=id;s.src=src;s.onload=function(){res(true)};s.onerror=function(){res(false)};document.head.appendChild(s)})}

  if(P==='crazygames'){
    var CG=function(){return window.CrazyGames&&window.CrazyGames.SDK};
    A.pauseOnHide=false;                       /* CrazyGames tracks focus itself; it asks games not to send stop on blur */
    A.ready=loadScript('https://sdk.crazygames.com/crazygames-sdk-v3.js').then(function(ok){if(!ok||!CG())return;
      return CG().init().then(function(){var g=CG().game;try{g.loadingStart()}catch(e){}
        try{portalMute=!!(g.settings&&g.settings.muteAudio);applyMute();g.addSettingsChangeListener&&g.addSettingsChangeListener(function(s){portalMute=!!s.muteAudio;applyMute()})}catch(e){}},function(){})});
    A.loaded=function(){try{CG().game.loadingStop()}catch(e){}};
    A.start=function(){try{CG().game.gameplayStart()}catch(e){}};
    A.stop=function(){try{CG().game.gameplayStop()}catch(e){}};
    A.ad=function(done){var sdk=CG();if(!sdk||!sdk.ad){done();return}var fin=false,end=function(){if(fin)return;fin=true;adMute=false;applyMute();done()};
      try{sdk.ad.requestAd('midgame',{adStarted:function(){adMute=true;applyMute()},adFinished:end,adError:end})}catch(e){end()}};
  }
  else if(P==='poki'){
    var PK=function(){return window.PokiSDK};
    A.ready=loadScript('https://game-cdn.poki.com/scripts/v2/poki-sdk.js').then(function(ok){if(!ok||!PK())return;return PK().init().then(function(){},function(){})});
    A.loaded=function(){try{PK().gameLoadingFinished()}catch(e){}};
    A.start=function(){try{PK().gameplayStart()}catch(e){}};
    A.stop=function(){try{PK().gameplayStop()}catch(e){}};
    /* Poki decides whether an ad is shown; we only signal the natural break and never run our own ad timer */
    A.ad=function(done){var sdk=PK();if(!sdk||!sdk.commercialBreak){done();return}var fin=false,end=function(){if(fin)return;fin=true;adMute=false;applyMute();done()};
      try{sdk.commercialBreak(function(){adMute=true;applyMute()}).then(end,end)}catch(e){end()}};
  }
  else if(P==='gamedistribution'){
    var pending=null,release=function(){adMute=false;applyMute();if(pending){var p=pending;pending=null;p()}};
    window.GD_OPTIONS={gameId:window.WOW_GD_ID||'',onEvent:function(e){
      if(e.name==='SDK_GAME_PAUSE'){adMute=true;applyMute()}
      if(e.name==='SDK_GAME_START'||e.name==='SDK_ERROR'||e.name==='AD_ERROR')release()}};
    A.ready=loadScript('https://html5.api.gamedistribution.com/main.min.js','gamedistribution-jssdk');
    A.ad=function(done){if(typeof window.gdsdk==='undefined'||!window.gdsdk.showAd){done();return}pending=done;
      try{window.gdsdk.showAd().catch(release)}catch(e){release()}
      setTimeout(release,45000)};
  }

  var playing=false;
  window.WOWPortal={
    name:P, pauseOnHide:A.pauseOnHide,
    loaded:function(){A.ready.then(function(){A.loaded()})},                                   /* the game is ready to play */
    start:function(){A.ready.then(function(){if(!playing){playing=true;A.start()}})},           /* the player is playing */
    stop:function(){A.ready.then(function(){if(playing){playing=false;A.stop()}})},             /* menu, card, level end */
    breakAd:function(done){A.ready.then(function(){if(playing){playing=false;A.stop()}A.ad(function(){done&&done()})})},  /* natural break between levels */
    onMute:function(fn){muteCb.push(fn)}
  };
})();
