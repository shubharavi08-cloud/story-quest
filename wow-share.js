/* World of Wonders — share & follow panel. Drop into any WoW game.
   Usage:
     include /shared/wow-share.js with a script tag, then:
     WOWShare.init({ title:{en:"Chowka Bhara",kn:"ಚೌಕಾಬಾರ",hi:"चौका बारा"},
                     text:{en:"Come play…",kn:"…",hi:"…"}, url:"https://…", lang:"en" });
     WOWShare.open();            // from any button
     WOWShare.setLang("kn");     // when the game switches language
   On worldofwondersstudio.com the page's own address is shared; elsewhere the given url. */
(function () {
  "use strict";
  var LINKS = {
    youtube: "https://www.youtube.com/@WorldofWondersstudio",
    whatsappChannel: "https://whatsapp.com/channel/0029VbDbyex4o7qNAsIg0H21",
    site: "https://worldofwondersstudio.com"
  };
  var TXT = {
    en: { share: "Share", head: "Share this game", wa: "WhatsApp", fb: "Facebook", copy: "Copy link", copied: "Copied!",
          more: "More…", follow: "Follow World of Wonders", yt: "YouTube channel", wac: "WhatsApp channel", close: "Close" },
    kn: { share: "ಹಂಚಿಕೊಳ್ಳಿ", head: "ಈ ಆಟವನ್ನು ಹಂಚಿಕೊಳ್ಳಿ", wa: "ವಾಟ್ಸಾಪ್", fb: "ಫೇಸ್‌ಬುಕ್", copy: "ವಿಳಾಸ ನಕಲಿಸಿ", copied: "ನಕಲಾಯಿತು!",
          more: "ಇನ್ನಷ್ಟು…", follow: "ನಮ್ಮನ್ನು ಹಿಂಬಾಲಿಸಿ", yt: "ಯೂಟ್ಯೂಬ್ ವಾಹಿನಿ", wac: "ವಾಟ್ಸಾಪ್ ವಾಹಿನಿ", close: "ಮುಚ್ಚಿ" },
    hi: { share: "शेयर करें", head: "इस खेल को शेयर करें", wa: "व्हाट्सऐप", fb: "फ़ेसबुक", copy: "लिंक कॉपी करें", copied: "कॉपी हो गया!",
          more: "और…", follow: "World of Wonders को फ़ॉलो करें", yt: "यूट्यूब चैनल", wac: "व्हाट्सऐप चैनल", close: "बंद करें" }
  };
  var cfg = { title: {}, text: {}, url: "", lang: "en" }, root = null;

  var CSS = "#wowShare{position:fixed;inset:0;z-index:9999;display:none;align-items:flex-end;justify-content:center;background:rgba(30,10,40,.55);font-family:inherit}" +
    "#wowShare.on{display:flex}" +
    "#wowShare .ws-box{width:min(440px,100%);background:#fffaf2;border-radius:24px 24px 0 0;padding:18px 18px calc(18px + env(safe-area-inset-bottom));box-shadow:0 -10px 40px rgba(0,0,0,.3);animation:wsUp .25s ease-out}" +
    "@keyframes wsUp{from{transform:translateY(40px);opacity:0}to{transform:none;opacity:1}}" +
    "#wowShare h3{margin:0 0 12px;font-size:20px;color:#2b1d3a;text-align:center}" +
    "#wowShare .ws-row{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:14px}" +
    "#wowShare .ws-b{display:flex;flex-direction:column;align-items:center;gap:6px;padding:12px 4px;border-radius:16px;background:#fff;border:2px solid #f0e2cc;color:#2b1d3a;text-decoration:none;font-weight:700;font-size:14px;cursor:pointer;font-family:inherit}" +
    "#wowShare .ws-i{width:40px;height:40px;border-radius:50%;display:grid;place-items:center;color:#fff;font-size:20px}" +
    "#wowShare .ws-f{display:flex;gap:10px}" +
    "#wowShare .ws-f a{flex:1;display:flex;align-items:center;gap:8px;padding:10px 12px;border-radius:14px;background:#f3e6d3;color:#2b1d3a;text-decoration:none;font-weight:700;font-size:14px}" +
    "#wowShare .ws-lab{font-size:13px;font-weight:700;color:#8a6f8f;margin:2px 0 8px 2px}" +
    "#wowShare .ws-x{display:block;width:100%;margin-top:14px;padding:12px;border:0;border-radius:14px;background:#2b1d3a;color:#fff;font-weight:800;font-size:16px;font-family:inherit;cursor:pointer}";

  var ICON = {
    wa: '<svg viewBox="0 0 24 24" width="22" height="22" fill="#fff"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2.1 1-2.4c.3-.3.6-.3.8-.3h.6c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.8-1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.3z"/></svg>',
    fb: '<svg viewBox="0 0 24 24" width="22" height="22" fill="#fff"><path d="M14 8V6.5c0-.8.2-1.2 1.4-1.2H17V2.1C16.6 2 15.5 2 14.3 2 11.7 2 10 3.6 10 6.4V8H7v3.5h3V22h4V11.5h2.9L17.3 8H14z"/></svg>',
    link: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></svg>',
    yt: '<svg viewBox="0 0 24 24" width="22" height="22"><rect x="2" y="5" width="20" height="14" rx="4" fill="#ff0000"/><path d="M10 9v6l5-3z" fill="#fff"/></svg>'
  };

  function t() { return TXT[cfg.lang] || TXT.en; }
  function pick(o) { return (o && (o[cfg.lang] || o.en)) || ""; }
  function shareUrl() {
    try { if (/(^|\.)worldofwondersstudio\.com$/.test(location.hostname)) return location.origin + location.pathname; } catch (e) {}
    return cfg.url || LINKS.site;
  }
  function render() {
    if (!root) return;
    var T = t(), url = shareUrl(), msg = pick(cfg.text) + " " + url;
    var canNative = !!(navigator.share) && window.self === window.top;
    root.innerHTML = '<div class="ws-box" role="dialog" aria-label="' + T.head + '"><h3>' + T.head + '</h3>' +
      '<div class="ws-row">' +
      '<a class="ws-b" target="_blank" rel="noopener" href="https://wa.me/?text=' + encodeURIComponent(msg) + '"><span class="ws-i" style="background:#25d366">' + ICON.wa + '</span>' + T.wa + '</a>' +
      '<a class="ws-b" target="_blank" rel="noopener" href="https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url) + '"><span class="ws-i" style="background:#1877f2">' + ICON.fb + '</span>' + T.fb + '</a>' +
      (canNative
        ? '<button class="ws-b" data-ws="native"><span class="ws-i" style="background:#7b5cff">⤴</span>' + T.more + '</button>'
        : '<button class="ws-b" data-ws="copy"><span class="ws-i" style="background:#ff7a00">' + ICON.link + '</span><span class="ws-cl">' + T.copy + '</span></button>') +
      '</div>' +
      (canNative ? '<div class="ws-row" style="grid-template-columns:1fr"><button class="ws-b" data-ws="copy" style="flex-direction:row;justify-content:center"><span class="ws-cl">' + T.copy + '</span></button></div>' : '') +
      '<div class="ws-lab">' + T.follow + '</div>' +
      '<div class="ws-f"><a target="_blank" rel="noopener" href="' + LINKS.youtube + '">' + ICON.yt + T.yt + '</a>' +
      '<a target="_blank" rel="noopener" href="' + LINKS.whatsappChannel + '"><span class="ws-i" style="background:#25d366;width:24px;height:24px">' + ICON.wa.replace(/22/g, "14") + '</span>' + T.wac + '</a></div>' +
      '<button class="ws-x" data-ws="close">' + T.close + '</button></div>';
  }
  function copy(btn) {
    var url = shareUrl(), done = function () { var l = btn.querySelector(".ws-cl"); if (l) l.textContent = t().copied; };
    try { navigator.clipboard.writeText(url).then(done, fallback); } catch (e) { fallback(); }
    function fallback() {
      var i = document.createElement("textarea"); i.value = url; i.style.position = "fixed"; i.style.opacity = "0";
      document.body.appendChild(i); i.select(); try { document.execCommand("copy"); done(); } catch (e) {} i.remove();
    }
  }
  function ensure() {
    if (root) return;
    var st = document.createElement("style"); st.textContent = CSS; document.head.appendChild(st);
    root = document.createElement("div"); root.id = "wowShare"; document.body.appendChild(root);
    root.addEventListener("click", function (e) {
      if (e.target === root) return close();
      var b = e.target.closest("[data-ws]"); if (!b) return;
      var a = b.getAttribute("data-ws");
      if (a === "close") close();
      else if (a === "copy") copy(b);
      else if (a === "native") navigator.share({ title: pick(cfg.title), text: pick(cfg.text), url: shareUrl() }).catch(function () {});
    });
  }
  function close() { if (root) root.classList.remove("on"); }
  window.WOWShare = {
    init: function (o) { for (var k in o) cfg[k] = o[k]; ensure(); render(); },
    open: function () { ensure(); render(); root.classList.add("on"); },
    close: close,
    setLang: function (l) { cfg.lang = l; render(); },
    links: LINKS,
    get t() { return t().share; }
  };
})();
