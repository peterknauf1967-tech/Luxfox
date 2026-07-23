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
  var DS_FILE = (location.pathname.split('/').pop()||'index.html').toLowerCase();

  // kleine Speicher-Helfer (localStorage, nur auf dem Gerät des Nutzers)
  window.dsSave = function(k,v){ try{localStorage.setItem('ds_'+k,JSON.stringify(v));}catch(e){} };
  window.dsLoad = function(k,d){ try{var x=localStorage.getItem('ds_'+k);return x?JSON.parse(x):d;}catch(e){return d;} };

  /* ---------- MEIN PROFIL (geteilte Grunddaten aller Apps) ----------
     Einmal in mein-profil.html ausfüllen -> jede App kann die Daten
     mit Zustimmung des Nutzers verwenden. Bleibt komplett auf dem Gerät. */
  window.DS_PROFIL = {
    fields: ['name','geb','blut','diag','med','all','k1','k2','kv','gewicht','groesse'],
    raw: function(){ return dsLoad('profil', null); },
    get: function(){ var p = dsLoad('profil', null); return (p && p.consent) ? p : null; },
    set: function(patch){
      var p = dsLoad('profil', {}) || {};
      for(var k in patch){ if(patch.hasOwnProperty(k)) p[k]=patch[k]; }
      p.stand = new Date().toISOString().slice(0,10);
      dsSave('profil', p); return p;
    },
    hasData: function(){ var p=dsLoad('profil',null); return !!(p && (p.name||p.blut||p.med)); },
    url: function(){ return DS_BASE + 'apps/mein-profil.html'; }
  };

  // Hinweis-Box "Profil nutzen / anlegen" für Apps mit Personendaten
  window.dsProfilHint = function(targetSel){
    var el = document.createElement('div');
    if(DS_PROFIL.get()){
      el.className = 'note';
      el.innerHTML = '✅ <b>Mein Profil</b> ist verbunden – deine Grunddaten wurden übernommen. <a href="'+DS_PROFIL.url()+'">Profil bearbeiten</a>';
    } else {
      el.className = 'note';
      el.innerHTML = '💡 Tipp: Lege einmal <a href="'+DS_PROFIL.url()+'"><b>Mein Profil</b></a> an – dann sind deine Grunddaten in allen Apps automatisch eingetragen (bleibt nur auf deinem Gerät).';
    }
    var t = document.querySelector(targetSel||'main') || document.body;
    t.insertBefore(el, t.firstChild);
  };

  /* ---------- NUTZUNGSZÄHLER (lokal) + GOOGLE ANALYTICS ---------- */
  (function trackUse(){
    try{
      var stats = dsLoad('stats', {});
      var s = stats[DS_FILE] || {n:0};
      s.n++; s.l = new Date().toISOString().slice(0,10);
      stats[DS_FILE] = s; dsSave('stats', stats);
    }catch(e){}
    var ga = (C.analytics||{}).gaId || '';
    if(/^G-[A-Z0-9]{6,}$/.test(ga)){
      var g=document.createElement('script'); g.async=true;
      g.src='https://www.googletagmanager.com/gtag/js?id='+ga;
      document.head.appendChild(g);
      window.dataLayer=window.dataLayer||[];
      window.gtag=function(){dataLayer.push(arguments);};
      gtag('js', new Date()); gtag('config', ga);
    }
  })();

  // Google AdSense laden – NUR wenn eine echte Publisher-ID in config.js steht
  // (Format ca-pub-XXXXXXXXXXXXXXXX). Platzhalter bleibt wirkungslos.
  (function loadAds(){
    var id = (C.affiliate||{}).adsenseId || '';
    if(!/^ca-pub-\d{10,}$/.test(id)) return;
    // Grundeinstellung A: Tools sauber. Nur Apps in ads.showOnApps (oder showOnAll) zeigen Werbung.
    var cfg = C.ads || {};
    var file = DS_FILE.replace(/\.html?$/i,'');
    var allow = cfg.showOnAll === true || ((cfg.showOnApps||[]).map(function(s){return (s||'').toLowerCase();}).indexOf(file) !== -1);
    if(!allow) return;
    var a=document.createElement('script');
    a.async=true; a.crossOrigin='anonymous';
    a.src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client='+id;
    document.head.appendChild(a);
  })();

  /* ---------- ANGEBOT DES TAGES (zentral aus config.js) ----------
     Heute Smoothie, morgen Software: config.js -> angebot ändern,
     gilt sofort in allen Apps. Spezial-Datum übersteuert Wochenplan. */
  function angebotHeute(){
    var A = C.angebot || {};
    if(A.aktiv === false) return null;
    var heute = new Date();
    var iso = heute.getFullYear()+'-'+('0'+(heute.getMonth()+1)).slice(-2)+'-'+('0'+heute.getDate()).slice(-2);
    var sp = (A.spezial||[]).filter(function(x){return x && x.datum===iso;});
    if(sp.length) return sp[0];
    var w = (A.wochenplan||{})[heute.getDay()];
    if(w) return w;
    // Fallback: alter "Smoothie des Tages"
    var s = (C.hundertblend||{}).smoothieDesTages;
    if(s) return { emoji:s.emoji||'🥤', titel:'Smoothie des Tages: '+(s.name||''), text:'100blend · '+(s.preis||''), cta:'Take my franchise →', url:(C.hundertblend||{}).franchiseLink||'#' };
    return null;
  }
  function angebotLink(a){
    if(a.affKey){
      var af = (C.affiliate||{})[a.affKey] || {};
      return (af.status==='live' && af.url) ? af.url : null;
    }
    if(!a.url) return null;
    if(/^https?:\/\//.test(a.url)) return a.url;
    return DS_BASE + 'apps/' + a.url;   // App-interner Link, funktioniert aus Hub & Apps
  }
  window.injectAngebot = function(targetSel){
    if(window.__dsAngebot) return; window.__dsAngebot = true;
    var a = angebotHeute(); if(!a) return;
    // Eigenwerbung nicht auf der eigenen Seite zeigen -> Fallback Smoothie
    if(a.url && !/^https?:/.test(a.url) && a.url.toLowerCase()===DS_FILE){
      var s=(C.hundertblend||{}).smoothieDesTages||{};
      a = { emoji:s.emoji||'🥤', titel:'Smoothie des Tages: '+(s.name||''), text:'100blend · '+(s.preis||''), cta:'100blend entdecken →', url:(C.hundertblend||{}).franchiseLink||'https://100blend.com' };
    }
    var link = angebotLink(a);
    var el = document.createElement('div');
    el.className = 'blend';
    el.innerHTML =
      '<div class="emoji">'+(a.emoji||'⭐')+'</div>'+
      '<div class="txt"><b>'+(a.titel||'')+'</b>'+
      '<span>'+(a.text||'')+'</span></div>'+
      (link ? '<a class="fr" href="'+link+'" '+(/^https?:/.test(link)?'target="_blank" rel="noopener"':'')+'>'+(a.cta||'Mehr →')+'</a>' : '');
    var t = document.querySelector(targetSel||'main') || document.body;
    t.appendChild(el);
  };
  // Rückwärts-Kompatibilität: alle Apps rufen injectBlend() auf
  window.injectBlend = window.injectAngebot;
  // Sicherheitsnetz: Seiten ohne injectBlend-Aufruf bekommen das Angebot automatisch
  document.addEventListener('DOMContentLoaded', function(){ try{ injectAngebot('main'); }catch(e){} });

  // Affiliate-Button: nur aktiv wenn Link genehmigt ("live")
  window.affBtn = function(key, label){
    var a = (C.affiliate||{})[key] || {};
    if(a.status === 'live' && a.url){
      return '<a class="aff" href="'+a.url+'" target="_blank" rel="noopener sponsored">'+label+'</a>';
    }
    return '<a class="aff disabled" title="Partner-Link folgt nach Genehmigung">'+label+' (bald verfügbar)</a>';
  };

  // Standard-Footer mit Impressum + Affiliate-Hinweis + Profil-Link + Version
  window.injectFooter = function(){
    var f = C.firma || {};
    var el = document.createElement('footer');
    el.className = 'app';
    el.innerHTML =
      '<p class="muted">'+(C.affiliateHinweis||'')+'</p>'+
      '<p class="muted">© '+(new Date().getFullYear())+' '+(f.name||'')+
      ' · <a href="'+DS_BASE+'impressum.html">Impressum</a>'+
      ' · <a href="'+DS_BASE+'datenschutz.html">Datenschutz</a>'+
      ' · <a href="'+DS_BASE+'apps/mein-profil.html">Mein Profil</a></p>'+
      '<p class="muted" style="opacity:.6">Version '+(C.version||'')+'</p>';
    document.body.appendChild(el);
  };
})();
