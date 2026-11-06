/* World of Wonders: "Join the family" sign-up, stored in a Google Form/Sheet */
/* Visit counting (hits.sh, no cookies, no personal data) + sign-up prompt on game end screens */
var HITS='https://hits.sh/worldofwondersstudio.com/';
function hit(n){try{var i=new Image();i.src=HITS+n+'.svg?r='+Date.now()}catch(e){}}
function once(n){try{if(sessionStorage.getItem('wow-h-'+n))return;sessionStorage.setItem('wow-h-'+n,'1')}catch(e){}hit(n)}
function fromAd(){try{return sessionStorage.getItem('wow-ad')==='1'}catch(e){return false}}
window.WOWHit=hit; window.WOWHitOnce=once;
(function(){
  var page=(location.pathname.replace(/^\/|\.html$/g,'').replace(/\/$/,'').replace(/\//g,'-'))||'index';
  var q=location.search, ref=document.referrer||'';
  var ad=/[?&](gclid|gbraid|wbraid|gad_source|utm_source)=/.test(q)||/googleads|doubleclick|googlesyndication/.test(ref);
  if(ad){try{sessionStorage.setItem('wow-ad','1')}catch(e){}}
  once('visits'); once('page-'+page);
  if(fromAd()) once('visits-from-ad');
  else if(/youtube\.com|youtu\.be/.test(ref)) once('visits-from-youtube');
  var AGAIN=['Play again','फिर से खेलें','ಮತ್ತೆ ಆಡಿ','Churn again','फिर से मंथन','ಮತ್ತೆ ಮಥಿಸಿ'];
  var T={en:{h:'🎁 Want the next story first?',b:'Join free',d:'Parents: get new episodes and games before anyone else.'},
         hi:{h:'🎁 अगली कहानी सबसे पहले चाहिए?',b:'मुफ़्त जुड़ें',d:'माता-पिता: नए एपिसोड और खेल सबसे पहले पाएँ।'},
         kn:{h:'🎁 ಮುಂದಿನ ಕಥೆ ಮೊದಲು ಬೇಕೆ?',b:'ಉಚಿತವಾಗಿ ಸೇರಿ',d:'ಪೋಷಕರೇ: ಹೊಸ ಸಂಚಿಕೆ ಮತ್ತು ಆಟಗಳನ್ನು ಎಲ್ಲರಿಗಿಂತ ಮೊದಲು ಪಡೆಯಿರಿ.'}};
  var ended=false;
  function check(){
    var ov=document.getElementById('overlay'); if(!ov)return;
    var btn=[].slice.call(ov.querySelectorAll('button')).filter(function(b){return AGAIN.indexOf(b.textContent.trim())>=0})[0];
    if(!btn)return;
    if(!ended){ended=true;hit('game-ends');hit('game-end-'+page);if(fromAd())hit('game-ends-from-ad')}
    if(ov.querySelector('.wj-cta'))return;
    var joined=false;try{joined=localStorage.getItem('wow-joined')==='1'}catch(e){}
    if(joined||!document.getElementById('wowJoin'))return;
    var l=(document.documentElement.lang||'en').slice(0,2), t=T[l]||T.en;
    var c=document.createElement('div'); c.className='wj-cta';
    c.style.cssText='margin:14px auto 0;max-width:420px;padding:12px 14px;border-radius:16px;background:#ffffff80;border:2px dashed #f6a723;text-align:center';
    c.innerHTML='<b style="display:block;color:#7a3d00;font-size:17px">'+t.h+'</b><span style="display:block;font-size:13px;opacity:.85;margin:4px 0 10px">'+t.d+'</span>';
    var a=document.createElement('button'); a.type='button'; a.textContent=t.b;
    a.style.cssText='min-height:44px;padding:10px 22px;border:0;border-radius:999px;background:#2ec4a0;color:#0d1a2b;font-weight:800;font-size:16px;cursor:pointer';
    a.onclick=function(){hit('join-prompt-clicks');var j=document.getElementById('wowJoin');ov.innerHTML='';
      if(j){j.scrollIntoView({behavior:'smooth',block:'center'});var n=j.querySelector('input[name=name]');if(n)setTimeout(function(){n.focus()},600)}};
    c.appendChild(a); (btn.parentNode||ov).appendChild(c);
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
        try{localStorage.setItem('wow-joined','1')}catch(e){}
        hit('joins'); if(fromAd())hit('joins-from-ad');
        box.innerHTML='<p class="wj-ok">🎉 Welcome to the World of Wonders family, '+n.replace(/[<>&]/g,'')+'!</p>';
      }).catch(function(){b.disabled=false;b.textContent='Join free';m.textContent='Could not send. Please check your internet and try again.'});
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',build);else build();
})();
