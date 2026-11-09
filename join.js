/* World of Wonders: "Join the family" sign-up, stored in a Google Form/Sheet */
/* Visit counting (hits.sh, no cookies, no personal data) + sign-up prompt on game end screens */
(function(){ /* private scope: never overwrite a game's own globals (e.g. hit) */
var HITS='https://hits.sh/worldofwondersstudio.com/';
function hit(n){try{var i=new Image();i.src=HITS+n+'.svg?r='+Date.now()}catch(e){}}
function once(n){try{if(sessionStorage.getItem('wow-h-'+n))return;sessionStorage.setItem('wow-h-'+n,'1')}catch(e){}hit(n)}
function fromAd(){try{return sessionStorage.getItem('wow-ad')==='1'}catch(e){return false}}
window.WOWHit=hit; window.WOWHitOnce=once;
(function(){
  var page=(location.pathname.replace(/^\/|\.html$/g,'').replace(/\/$/,'').replace(/\//g,'-'))||'index';
  var q=location.search, ref=document.referrer||'';
  var src=((q.match(/[?&](?:utm_source|src)=([^&]*)/)||[])[1]||'').toLowerCase();
  var ad=/[?&](gclid|gbraid|wbraid|gad_source)=/.test(q)||/[?&]utm_medium=(cpc|paid|ppc)/i.test(q)||/googleads|doubleclick|googlesyndication/.test(ref);
  if(ad){try{sessionStorage.setItem('wow-ad','1')}catch(e){}}
  once('visits'); once('page-'+page);
  try{if(!localStorage.getItem('wow-seen')){localStorage.setItem('wow-seen','1');once('new-visitors')}else once('returning-visitors')}catch(e){}
  if(fromAd()) once('visits-from-ad');
  else if(/^(wa|whatsapp)/.test(src)||/whatsapp|wa\.me/.test(ref)) once('visits-from-whatsapp');
  else if(/^(yt|youtube)/.test(src)||/youtube\.com|youtu\.be/.test(ref)) once('visits-from-youtube');
  else if(/^(ig|instagram|fb|facebook)/.test(src)||/instagram\.com|facebook\.com/.test(ref)) once('visits-from-social');
  else if(/google\.|bing\.|duckduckgo|yahoo\./.test(ref)) once('visits-from-search');
  else if(/itch\.io|crazygames/.test(ref)) once('visits-from-gameportals');
  else if(!ref&&!src) once('visits-direct');
  var AGAIN=['Play again','फिर से खेलें','ಮತ್ತೆ ಆಡಿ','Churn again','फिर से मंथन','ಮತ್ತೆ ಮಥಿಸಿ'];
  var YT='https://www.youtube.com/@WorldofWondersstudio?sub_confirmation=1', WA='https://whatsapp.com/channel/0029VbDbyex4o7qNAsIg0H21';
  var T={en:{h:'🪔 Loved it? A new story and game comes every festival.',s:'Subscribe on YouTube',w:'Follow on WhatsApp',e:'or get updates by email',
             bar:'🎮 Your free games are unlocked!',bp:'Play Road to Ayodhya',bx:'Close'},
         hi:{h:'🪔 मज़ा आया? हर त्योहार पर नई कहानी और नया खेल आता है।',s:'YouTube पर सब्सक्राइब करें',w:'WhatsApp पर फ़ॉलो करें',e:'या ईमेल से अपडेट पाएँ',
             bar:'🎮 आपके मुफ़्त खेल खुल गए हैं!',bp:'अयोध्या की राह खेलें',bx:'बंद करें'},
         kn:{h:'🪔 ಇಷ್ಟವಾಯಿತೇ? ಪ್ರತಿ ಹಬ್ಬಕ್ಕೂ ಹೊಸ ಕಥೆ ಮತ್ತು ಹೊಸ ಆಟ ಬರುತ್ತದೆ.',s:'YouTube ನಲ್ಲಿ ಸಬ್‌ಸ್ಕ್ರೈಬ್ ಮಾಡಿ',w:'WhatsApp ನಲ್ಲಿ ಫಾಲೋ ಮಾಡಿ',e:'ಅಥವಾ ಇಮೇಲ್ ಮೂಲಕ ಅಪ್‌ಡೇಟ್ ಪಡೆಯಿರಿ',
             bar:'🎮 ನಿಮ್ಮ ಉಚಿತ ಆಟಗಳು ತೆರೆದಿವೆ!',bp:'ಅಯೋಧ್ಯೆಯ ದಾರಿ ಆಡಿ',bx:'ಮುಚ್ಚಿ'}};
  function tt(){var l=(document.documentElement.lang||'en').slice(0,2);try{l=localStorage.getItem('wow-lang')||l}catch(e){}return T[(l||'en').slice(0,2)]||T.en}
  function btn(txt,bg,fg,href,name){var a=document.createElement('a');a.textContent=txt;a.href=href;a.target='_blank';a.rel='noopener';
    a.style.cssText='display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:10px 18px;border-radius:999px;font-weight:800;font-size:15px;text-decoration:none;background:'+bg+';color:'+fg;
    a.onclick=function(){hit(name);if(fromAd())hit(name+'-from-ad')};return a}
  /* ad visitors landing on the home page: point them straight at the games */
  (function(){
    if(!fromAd()||page!=='index')return;try{if(sessionStorage.getItem('wow-bar-x'))return}catch(e){}
    var t=tt(), b=document.createElement('div'); b.id='wowAdBar';
    b.style.cssText='position:fixed;left:10px;right:10px;bottom:10px;z-index:9999;display:flex;flex-wrap:wrap;gap:8px;align-items:center;justify-content:center;padding:10px 12px;border-radius:18px;background:#1c1442f2;color:#fff;box-shadow:0 10px 30px #0008;font:700 15px system-ui,sans-serif';
    var s=document.createElement('span');s.textContent=t.bar;b.appendChild(s);
    var p=btn(t.bp+' →','#f6a723','#1c1442','road-to-ayodhya.html','ad-bar-play');p.target='';b.appendChild(p);
    var x=document.createElement('button');x.type='button';x.textContent='✕';x.setAttribute('aria-label',t.bx);
    x.style.cssText='background:none;border:0;color:#fff;font-size:18px;cursor:pointer;padding:6px';
    x.onclick=function(){b.remove();try{sessionStorage.setItem('wow-bar-x','1')}catch(e){}};b.appendChild(x);
    document.body.appendChild(b);
  })();
  var ended=false;
  function check(){
    var ov=document.getElementById('overlay'); if(!ov)return;
    var again=[].slice.call(ov.querySelectorAll('button')).filter(function(b){return AGAIN.indexOf(b.textContent.trim())>=0})[0];
    if(!again)return;
    if(!ended){ended=true;hit('game-ends');hit('game-end-'+page);if(fromAd())hit('game-ends-from-ad')}
    if(ov.querySelector('.wj-cta'))return;
    var t=tt(), c=document.createElement('div'); c.className='wj-cta';
    c.style.cssText='margin:14px auto 0;max-width:440px;padding:12px 14px;border-radius:16px;background:#ffffff80;border:2px dashed #f6a723;text-align:center';
    c.innerHTML='<b style="display:block;color:#7a3d00;font-size:16px;margin-bottom:10px">'+t.h+'</b>';
    var row=document.createElement('div');row.style.cssText='display:flex;flex-wrap:wrap;gap:8px;justify-content:center';
    row.appendChild(btn('▶ '+t.s,'#e62117','#fff',YT,'sub-clicks'));
    row.appendChild(btn('📲 '+t.w,'#25d366','#0d1a2b',WA,'wa-clicks'));
    c.appendChild(row);
    var joined=false;try{joined=localStorage.getItem('wow-joined')==='1'}catch(e){}
    if(!joined&&document.getElementById('wowJoin')){
      var e=document.createElement('button');e.type='button';e.textContent=t.e;
      e.style.cssText='margin-top:8px;background:none;border:0;color:#7a3d00;text-decoration:underline;font-size:13px;cursor:pointer';
      e.onclick=function(){hit('join-prompt-clicks');var j=document.getElementById('wowJoin');ov.innerHTML='';
        if(j){j.scrollIntoView({behavior:'smooth',block:'center'});var n=j.querySelector('input[name=name]');if(n)setTimeout(function(){n.focus()},600)}};
      c.appendChild(document.createElement('br'));c.appendChild(e);
    }
    (again.parentNode||ov).appendChild(c);
  }
  var pend=false; new MutationObserver(function(){if(pend)return;pend=true;requestAnimationFrame(function(){pend=false;check()})}).observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['class','style','hidden']});
})();
(function(){
  var ACTION='https://docs.google.com/forms/d/e/1FAIpQLSeV4dodbSR8f1BcWVQNgVweNsRgg6dhp3LOIhwQa7_rFtvK5Q/formResponse';
  var F={name:'entry.1096196436',email:'entry.1796750110',phone:'entry.494562679',consent:'entry.2140252039'};
  var CONSENT='I am the parent/guardian and agree that World of Wonders Studio may contact me about new episodes, games and books.';
  function done(){try{return localStorage.getItem('wow-joined')==='1'}catch(e){return false}}
  function build(){
    var host=document.querySelector('.wow-foot .wf-in'); if(!host||document.getElementById('wowJoin'))return;
    var box=document.createElement('div'); box.id='wowJoin'; box.className='wf-join';
    if(done()){box.innerHTML='<p class="wj-ok">✨ You are part of the World of Wonders family. Thank you!</p>';}
    else box.innerHTML=
      '<h3>Join the World of Wonders family</h3>'+
      '<p class="wj-sub">Free. Get new episodes, games and book launches first. For parents.</p>'+
      '<form novalidate>'+
      '<input name="name" autocomplete="name" placeholder="Parent\'s name *" required>'+
      '<input name="email" type="email" autocomplete="email" placeholder="Email">'+
      '<input name="phone" type="tel" autocomplete="tel" inputmode="tel" placeholder="WhatsApp / phone">'+
      '<label class="wj-c"><input type="checkbox" name="consent"> I am the parent/guardian and agree to be contacted by World of Wonders Studio.</label>'+
      '<button type="submit">Join free</button><p class="wj-msg" role="status"></p></form>';
    var brand=host.querySelector('.wf-brand'); host.insertBefore(box, brand?brand.nextSibling:host.firstChild);
    var f=box.querySelector('form'); if(!f)return;
    f.addEventListener('submit',function(e){
      e.preventDefault(); var m=f.querySelector('.wj-msg');
      var n=f.name.value.trim(), em=f.email.value.trim(), ph=f.phone.value.replace(/[^\d+]/g,'');
      if(!n){m.textContent='Please enter your name.';return}
      if(!em&&!ph){m.textContent='Please give an email or a WhatsApp/phone number.';return}
      if(em&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)){m.textContent='That email looks incomplete.';return}
      if(ph&&ph.replace('+','').length<10){m.textContent='Please check the phone number.';return}
      if(!f.consent.checked){m.textContent='Please tick the parent/guardian box.';return}
      var d=new FormData(); d.append(F.name,n); d.append(F.email,em); d.append(F.phone,ph); d.append(F.consent,CONSENT);
      var b=f.querySelector('button'); b.disabled=true; b.textContent='Joining…';
      fetch(ACTION,{method:'POST',mode:'no-cors',body:d}).then(function(){
        try{localStorage.setItem('wow-joined','1');localStorage.setItem('wow-user',JSON.stringify({name:n,email:em,phone:ph}))}catch(e){}
        hit('joins'); if(fromAd())hit('joins-from-ad');
        box.innerHTML='<p class="wj-ok">🎉 Welcome to the World of Wonders family, '+n.replace(/[<>&]/g,'')+'!</p>';
      }).catch(function(){b.disabled=false;b.textContent='Join free';m.textContent='Could not send. Please check your internet and try again.'});
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',build);else build();
})();
})();
