/* World of Wonders + Jagruth Bharath: ONE easy registration for the whole site.
   - Games never ask to sign in. Everything is free to play.
   - A visitor is asked once, ever: inside the "watch the story" screen while the video plays
     (they are waiting anyway), or, on pages without a game, as a small card after 15 s.
   - "Later" closes it for good. The footer "Join the family" form stays for anyone who wants it later.
   - YouTube shares no viewer details with websites, so details can only come from this one form.
   Stored per browser: localStorage wow-user = {name,email,phone}. Games read it with WOWUser(). */
(function(){
  var K='wow-user', ASKED='wow-reg-asked';
  var WOW_FORM='https://docs.google.com/forms/d/e/1FAIpQLSeV4dodbSR8f1BcWVQNgVweNsRgg6dhp3LOIhwQa7_rFtvK5Q/formResponse';
  var WF={name:'entry.1096196436',email:'entry.1796750110',phone:'entry.494562679',consent:'entry.2140252039'};
  var JB_FORM='https://docs.google.com/forms/d/e/1FAIpQLSeESsHlKV8wHYOYMNvMcHe46Kzczl16D8yowZ1iyyQnR4YTDQ/formResponse';
  var JF={name:'entry.1224188147',email:'entry.387413791',lang:'entry.1303391673',consent:'entry.1498714463',event:'entry.1579949603'};
  function get(k){try{return localStorage.getItem(k)}catch(e){return null}}
  function set(k,v){try{localStorage.setItem(k,v)}catch(e){}}
  function user(){var u=null;try{u=JSON.parse(get(K)||'null')}catch(e){}
    if(!u){try{var j=JSON.parse(get('jb_user')||'null');if(j&&j.name){u={name:j.name,email:j.email||'',phone:''};set(K,JSON.stringify(u))}}catch(e){}}
    return u}
  function joined(){return !!user()||get('wow-joined')==='1'}
  window.WOWUser=user; window.WOWJoined=joined;

  var T={
    en:{h:'Join free: one step, all games',p:'New episodes, games and scam alerts reach you first. You will never be asked again.',
        n:'Your name',c:'Email or WhatsApp number',k:'I agree that World of Wonders Studio and Jagruth Bharath may send me updates. Not shared or sold; stop any time.',
        go:'Join free',later:'Later',eN:'Please enter your name.',eC:'Please enter an email or a 10-digit WhatsApp number.',eK:'Please tick the box.',
        wait:'Joining…',ok:'🎉 Welcome to the family, {n}!',fail:'Could not send. Check your internet and try again.'},
    hi:{h:'मुफ़्त जुड़िए: एक बार, सारे खेल',p:'नए एपिसोड, खेल और स्कैम अलर्ट सबसे पहले आप तक पहुँचेंगे। दोबारा नहीं पूछेंगे।',
        n:'आपका नाम',c:'ईमेल या WhatsApp नंबर',k:'मैं सहमत हूँ कि World of Wonders Studio और जागृत भारत मुझे अपडेट भेज सकते हैं। किसी से साझा या बेचा नहीं जाएगा; कभी भी बंद करें।',
        go:'मुफ़्त जुड़िए',later:'बाद में',eN:'कृपया अपना नाम लिखिए।',eC:'कृपया ईमेल या 10 अंकों का WhatsApp नंबर लिखिए।',eK:'कृपया बॉक्स पर टिक कीजिए।',
        wait:'जुड़ रहे हैं…',ok:'🎉 परिवार में स्वागत है, {n}!',fail:'भेज नहीं पाए। इंटरनेट देखकर फिर कोशिश कीजिए।'},
    kn:{h:'ಉಚಿತವಾಗಿ ಸೇರಿ: ಒಮ್ಮೆ ಮಾತ್ರ, ಎಲ್ಲ ಆಟಗಳು',p:'ಹೊಸ ಸಂಚಿಕೆ, ಆಟ ಮತ್ತು ಮೋಸದ ಎಚ್ಚರಿಕೆಗಳು ಮೊದಲು ನಿಮಗೆ ತಲುಪುತ್ತವೆ. ಮತ್ತೆ ಕೇಳುವುದಿಲ್ಲ.',
        n:'ನಿಮ್ಮ ಹೆಸರು',c:'ಇಮೇಲ್ ಅಥವಾ WhatsApp ಸಂಖ್ಯೆ',k:'World of Wonders Studio ಮತ್ತು ಜಾಗೃತ ಭಾರತ ನನಗೆ ಅಪ್‌ಡೇಟ್ ಕಳಿಸಬಹುದು ಎಂದು ಒಪ್ಪುತ್ತೇನೆ. ಯಾರಿಗೂ ಹಂಚುವುದಿಲ್ಲ, ಮಾರುವುದಿಲ್ಲ; ಯಾವಾಗ ಬೇಕಾದರೂ ನಿಲ್ಲಿಸಬಹುದು.',
        go:'ಉಚಿತವಾಗಿ ಸೇರಿ',later:'ನಂತರ',eN:'ದಯವಿಟ್ಟು ನಿಮ್ಮ ಹೆಸರು ಬರೆಯಿರಿ.',eC:'ದಯವಿಟ್ಟು ಇಮೇಲ್ ಅಥವಾ 10 ಅಂಕಿಯ WhatsApp ಸಂಖ್ಯೆ ಬರೆಯಿರಿ.',eK:'ದಯವಿಟ್ಟು ಬಾಕ್ಸ್ ಟಿಕ್ ಮಾಡಿ.',
        wait:'ಸೇರಿಸುತ್ತಿದ್ದೇವೆ…',ok:'🎉 ಕುಟುಂಬಕ್ಕೆ ಸ್ವಾಗತ, {n}!',fail:'ಕಳಿಸಲು ಆಗಲಿಲ್ಲ. ಇಂಟರ್ನೆಟ್ ನೋಡಿ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.'}};
  function lang(){var l=get('jb_lang')||get('wow-lang')||(document.documentElement.lang||'en');l=(l||'en').slice(0,2);return T[l]?l:'en'}
  function esc(s){return String(s).replace(/[<>&"]/g,function(c){return{'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c]})}

  var CSS='.wreg{font-family:Mukta,"Noto Sans Kannada","Noto Sans Devanagari",system-ui,sans-serif;background:#1d1640;color:#fdf3dc;border:2px solid #f6c445;border-radius:20px;padding:16px 18px;box-shadow:0 12px 40px rgba(0,0,0,.45);box-sizing:border-box}'+
   '.wreg *{box-sizing:border-box}.wreg h3{margin:0 0 4px;font:800 20px/1.2 "Baloo 2","Baloo Tamma 2",Mukta,system-ui,sans-serif;color:#ffd35a}.wreg p{margin:0 0 10px;color:#d6cdf0;font-size:15px}'+
   '.wreg .f{display:flex;gap:8px;flex-wrap:wrap}.wreg input[type=text]{flex:1 1 180px;min-height:46px;font:600 16px Mukta,"Noto Sans Kannada",system-ui,sans-serif;border-radius:12px;border:2px solid #5b4d97;background:#120c2e;color:#fff;padding:8px 12px}'+
   '.wreg input[type=text]:focus{outline:none;border-color:#f6c445}.wreg label{display:flex;gap:8px;align-items:flex-start;font-size:13px;color:#c7bce6;margin:10px 0;cursor:pointer}.wreg label input{width:20px;height:20px;flex:none;margin-top:1px;accent-color:#f6c445}'+
   '.wreg .b{display:flex;gap:12px;align-items:center;flex-wrap:wrap}.wreg button{font:800 17px Mukta,system-ui,sans-serif;background:#f6a723;color:#1c1442;border:0;border-radius:999px;padding:11px 26px;min-height:46px;cursor:pointer}'+
   '.wreg .x{background:none;color:#c7bce6;padding:8px 6px;font-weight:600;text-decoration:underline}.wreg .m{min-height:18px;font-size:14px;color:#ffb0a0;margin-top:6px}.wreg .ok{font:800 20px Mukta,system-ui,sans-serif;color:#ffd35a;text-align:center;padding:8px 0}'+
   '#wregSheet{position:fixed;left:50%;bottom:max(14px,env(safe-area-inset-bottom));transform:translate(-50%,140%);width:min(560px,calc(100% - 20px));z-index:9998;transition:transform .45s cubic-bezier(.2,.9,.3,1.2)}#wregSheet.in{transform:translate(-50%,0)}';

  function card(where){
    var t=T[lang()], d=document.createElement('div'); d.className='wreg';
    d.innerHTML='<h3>'+t.h+'</h3><p>'+t.p+'</p><div class="f"><input type="text" id="wrN" autocomplete="name" placeholder="'+esc(t.n)+'" aria-label="'+esc(t.n)+'">'+
      '<input type="text" id="wrC" autocomplete="email" inputmode="email" placeholder="'+esc(t.c)+'" aria-label="'+esc(t.c)+'"></div>'+
      '<label><input type="checkbox" id="wrK"><span>'+t.k+'</span></label><div class="b"><button id="wrGo">'+t.go+'</button><button class="x" id="wrX">'+t.later+'</button></div><div class="m" id="wrM" role="status"></div>';
    set(ASKED,'1'); if(window.WOWHit)WOWHit('reg-shown');
    function close(){var s=document.getElementById('wregSheet');if(s){s.classList.remove('in');setTimeout(function(){s.remove()},500)}else d.remove()}
    d.querySelector('#wrX').onclick=function(){if(window.WOWHit)WOWHit('reg-later');close()};
    d.querySelector('#wrGo').onclick=function(){
      var m=d.querySelector('#wrM'),n=d.querySelector('#wrN').value.trim(),c=d.querySelector('#wrC').value.trim(),em='',ph='';
      if(!n){m.textContent=t.eN;return}
      if(/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(c))em=c;else{ph=c.replace(/[^\d+]/g,'');if(ph.replace('+','').length<10){m.textContent=t.eC;return}}
      if(!d.querySelector('#wrK').checked){m.textContent=t.eK;return}
      var b=this;b.disabled=true;b.textContent=t.wait;
      var w=new FormData();w.append(WF.name,n);w.append(WF.email,em);w.append(WF.phone,ph);w.append(WF.consent,'Agreed (one-time site registration, '+location.pathname+')');
      var jobs=[fetch(WOW_FORM,{method:'POST',mode:'no-cors',body:w})];
      if(/jagruth-bharath/.test(location.pathname)){var j=new URLSearchParams();j.append(JF.name,n);j.append(JF.email,em||ph);j.append(JF.lang,lang());j.append(JF.consent,'yes');j.append(JF.event,'register');jobs.push(fetch(JB_FORM,{method:'POST',mode:'no-cors',body:j}).catch(function(){}))}
      jobs[0].then(function(){
        var u={name:n,email:em,phone:ph};set(K,JSON.stringify(u));set('wow-joined','1');set('jb_user',JSON.stringify({name:n,email:em||ph}));
        if(window.WOWHit){WOWHit('joins');WOWHit('joins-one-time')}
        d.innerHTML='<div class="ok">'+t.ok.replace('{n}',esc(n))+'</div>';
        try{window.dispatchEvent(new CustomEvent('wow-registered',{detail:u}))}catch(e){}
        setTimeout(close,2600);
      }).catch(function(){b.disabled=false;b.textContent=t.go;m.textContent=t.fail});
    };
    if(where)where.appendChild(d);
    else{var s=document.createElement('div');s.id='wregSheet';s.appendChild(d);document.body.appendChild(s);requestAnimationFrame(function(){requestAnimationFrame(function(){s.classList.add('in')})})}
  }

  function boot(){
    if(joined()||get(ASKED)==='1')return;
    if(/\/(privacy|terms|contact|stats)(\.html)?$/.test(location.pathname))return;
    var st=document.createElement('style');st.textContent=CSS;document.head.appendChild(st);
    var shown=false;
    function show(where){if(shown||joined()||get(ASKED)==='1')return;shown=true;card(where)}
    /* the "watch the story" screen: ask while the video plays */
    var mo=new MutationObserver(function(){var g=document.querySelector('#wowGate .in'),go=document.getElementById('wowGateGo');if(g&&go&&!go.disabled){mo.disconnect();show(g)}});
    mo.observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['disabled']});
    /* pages without a game: a small card after 15 s (game pages ask only on the watch screen, so play is never covered) */
    if(!document.querySelector('script[src*="gate.js"][data-key]'))setTimeout(function(){mo.disconnect();show(null)},15000);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
