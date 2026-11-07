/* World of Wonders · page ads (Google AdSense), family-safe settings.
   OFF until the AdSense publisher ID is filled in below. When it is:
   1. set CLIENT to 'ca-pub-XXXXXXXXXXXXXXXX'
   2. add  <script src="ads.js" defer></script>  to the pages that should show ads
   3. put  <div class="wow-ad"></div>  where an ad may appear (below content, never inside a game board)
   4. add ads.txt at the site root:  google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0  */
(function(){
  var CLIENT = '';            // ← publisher ID goes here after AdSense approval
  if(!CLIENT) return;
  if(window.WOW_PORTAL) return;  // portal builds use the portal's own ads
  var w = window;
  w.adsbygoogle = w.adsbygoogle || [];
  // child-directed + non-personalised for every ad on this site
  w.adsbygoogle.requestNonPersonalizedAds = 1;
  var s = document.createElement('script');
  s.async = true; s.crossOrigin = 'anonymous';
  s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + CLIENT;
  document.head.appendChild(s);
  var st = document.createElement('style');
  st.textContent = '.wow-ad{max-width:980px;margin:22px auto;min-height:120px;text-align:center}.wow-ad::before{content:"Advertisement";display:block;font:600 11px/1.6 Poppins,sans-serif;letter-spacing:.08em;text-transform:uppercase;opacity:.55}';
  document.head.appendChild(st);
  function fill(){
    document.querySelectorAll('.wow-ad:not([data-done])').forEach(function(box){
      box.setAttribute('data-done','1');
      var ins = document.createElement('ins');
      ins.className = 'adsbygoogle'; ins.style.display = 'block';
      ins.setAttribute('data-ad-client', CLIENT);
      ins.setAttribute('data-ad-format', 'auto');
      ins.setAttribute('data-full-width-responsive', 'true');
      ins.setAttribute('data-tag-for-child-directed-treatment', '1');
      box.appendChild(ins);
      try{ (w.adsbygoogle = w.adsbygoogle || []).push({}); }catch(e){}
    });
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fill); else fill();
})();
