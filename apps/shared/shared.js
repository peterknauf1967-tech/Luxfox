/* Gemeinsame Funktionen – liest aus config.js */
(function(){
  var C = window.DS_CONFIG || {};

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
      ' · <a href="#" onclick="alert(\'Impressum:\\n'+
      (f.name||'')+'\\n'+(f.adresse||'')+'\\n'+(f.register||'')+'\\n'+(f.email||'')+'\');return false;">Impressum</a></p>';
    document.body.appendChild(el);
  };

  // kleine Speicher-Helfer (für PWA, echte Website -> localStorage erlaubt)
  window.dsSave = function(k,v){ try{localStorage.setItem('ds_'+k,JSON.stringify(v));}catch(e){} };
  window.dsLoad = function(k,d){ try{var x=localStorage.getItem('ds_'+k);return x?JSON.parse(x):d;}catch(e){return d;} };
})();
