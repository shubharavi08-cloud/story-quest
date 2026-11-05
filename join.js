/* World of Wonders: "Join the family" sign-up, stored in a Google Form/Sheet */
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
        box.innerHTML='<p class="wj-ok">🎉 Welcome to the World of Wonders family, '+n.replace(/[<>&]/g,'')+'!</p>';
      }).catch(function(){b.disabled=false;b.textContent='Join free';m.textContent='Could not send. Please check your internet and try again.'});
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',build);else build();
})();
