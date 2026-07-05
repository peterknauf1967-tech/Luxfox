/* Gemeinsame Funktionen – liest aus config.js */
(function(){
  var C = window.DS_CONFIG || {};

  // Basis-Pfad des App-Bundles aus dem eigenen <script src> ableiten (portabel,
  // funktioniert für Hub /apps/ und Einzel-Apps /apps/apps/)
  var DS_BASE = (function(){
    var s = document.currentScript;
    if(!s){ var ss=document.getElementsByTagName('script');
      for(var i=0;i<ss.length;i++){ if(/shared\/shared\.js/.test(ss[i].src||'')){ s=ss[i]; break; } } }
    return s ? (s.src||'').replace(/shared\/shared\.js.*$/,'') : '';
  })();

  // Google AdSense laden – NUR wenn eine echte Publisher-ID in config.js steht
  // (Format ca-pub-XXXXXXXXXXXXXXXX). Platzhalter bleibt wirkungslos.
  (function loadAds(){
    var id = (C.affiliate||{}).adsenseId || '';
    if(!/^ca-pub-\d{10,}$/.test(id)) return;
    // Grundeinstellung A: Tools sauber. Nur Apps in ads.showOnApps (oder showOnAll) zeigen Werbung.
    var cfg = C.ads || {};
    var file = (location.pathname.split('/').pop()||'').replace(/\.html?$/i,'').toLowerCase();
    var allow = cfg.showOnAll === true || ((cfg.showOnApps||[]).map(function(s){return (s||'').toLowerCase();}).indexOf(file) !== -1);
    if(!allow) return;
    var a=document.createElement('script');
    a.async=true; a.crossOrigin='anonymous';
    a.src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client='+id;
    document.head.appendChild(a);
  })();

  // 100blend-Widget einfügen (dezent, ans Ende des Hauptbereichs)
  window.injectBlend = function(targetSel){
    if(!C.hundertblend) return;
    var s = C.hundertblend.smoothieDesTages || {};
    var fr = C.hundertblend.franchiseLink || "#";
    var el = document.createElement('div');
    el.className = 'blend';
    el.innerHTML =
      '<div class="emoji">'+(s.emoji||'🥤')+'</div>'+
      '<div class="txt"><b>Smoothie des Tages: '+(s.name||'')+'</b>'+
      '<span>100blend · '+(s.preis||'')+'</span></div>'+
      '<a class="fr" href="'+fr+'" target="_blank" rel="noopener">Take my franchise →</a>';
    var t = document.querySelector(targetSel||'main') || document.body;
    t.appendChild(el);
  };

  // Affiliate-Button: nur aktiv wenn Link genehmigt ("live")
  window.affBtn = function(key, label){
    var a = (C.affiliate||{})[key] || {};
    if(a.status === 'live' && a.url){
      return '<a class="aff" href="'+a.url+'" target="_blank" rel="noopener sponsored">'+label+'</a>';
    }
    return '<a class="aff disabled" title="Partner-Link folgt nach Genehmigung">'+label+' (bald verfügbar)</a>';
  };

  // Standard-Footer mit Impressum + Affiliate-Hinweis
  window.injectFooter = function(){
    var f = C.firma || {};
    var el = document.createElement('footer');
    el.className = 'app';
    el.innerHTML =
      '<p class="muted">'+(C.affiliateHinweis||'')+'</p>'+
      '<p class="muted">© '+(new Date().getFullYear())+' '+(f.name||'')+
      ' · <a href="'+DS_BASE+'impressum.html">Impressum</a>'+
      ' · <a href="'+DS_BASE+'datenschutz.html">Datenschutz</a></p>';
    document.body.appendChild(el);
  };

  // kleine Speicher-Helfer (für PWA, echte Website -> localStorage erlaubt)
  window.dsSave = function(k,v){ try{localStorage.setItem('ds_'+k,JSON.stringify(v));}catch(e){} };
  window.dsLoad = function(k,d){ try{var x=localStorage.getItem('ds_'+k);return x?JSON.parse(x):d;}catch(e){return d;} };
})();
