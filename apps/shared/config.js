/* =============================================================
   ZENTRALE KONFIGURATION – Projekt Digital Service
   -------------------------------------------------------------
   HIER trägst du deine Firmendaten, die GENEHMIGTEN
   Affiliate-Links und das ANGEBOT DES TAGES ein. Alle Apps
   lesen aus dieser einen Datei. Was in [ECKIGEN KLAMMERN]
   steht, ist Platzhalter.
   ============================================================= */

window.DS_CONFIG = {

  /* ---- 0. VERSION (bei jeder Änderung hochzählen) ---- */
  version: "2.0.0 · 24.07.2026",

  /* ---- 1. FIRMENDATEN (für Impressum) ---- */
  firma: {
    name:     "Luxfox Limited",
    adresse:  "Unit 1603, 16/F, The L. Plaza, 367–375 Queen's Road Central, Sheung Wan, Hong Kong",
    register: "Business Registration No. 80579643 (Hong Kong)",
    email:    "info@luxfox.net"
  },

  /* ---- 2. AFFILIATE-LINKS ----
     status: "live"  = Link ist genehmigt und eingetragen
     status: "offen" = Anfrage läuft, Link folgt
     Bei "offen" wird der Button dezent deaktiviert. */
  affiliate: {
    wise:        { status: "offen", url: "[WISE-LINK aus Partnerize]" },
    safetywing:  { status: "live", url: "https://safetywing.com/?referenceID=26557404&utm_source=26557404&utm_medium=Ambassador" },
    airalo:      { status: "offen", url: "[AIRALO-LINK]" },
    nordvpn:     { status: "live", url: "https://go.nordvpn.net/aff_c?offer_id=15&aff_id=152036" },
    pacificprime:{ status: "offen", url: "[PACIFIC-PRIME-LINK]" },
    grab:        { status: "offen", url: "[GRAB-LINK]" },
    adsenseId:   "ca-pub-6577595255227351"
  },

  /* ---- WERBUNG (AdSense) in den Apps ----
     Grundeinstellung A = Tools bleiben SAUBER (keine Anzeigen).
     Nur Apps in "showOnApps" zeigen AdSense. showOnAll:true = überall. */
  ads: { showOnAll: false, showOnApps: ["muehle"] },

  /* ---- 3. ANGEBOT DES TAGES (ersetzt "Smoothie des Tages") ----
     Erscheint automatisch dezent in ALLEN Apps.
     WOCHENPLAN: 0=Sonntag, 1=Montag, … 6=Samstag.
       emoji  = Symbol links
       titel  = fette Zeile
       text   = kleine Zeile darunter
       cta    = Button-/Link-Text
       url    = Ziel-Link  ODER  affKey = Schlüssel aus affiliate (nur wenn "live")
     SPEZIAL: Einträge mit festem Datum (JJJJ-MM-TT) übersteuern den Wochenplan.
     Beispiel: heute mal einen Smoothie, morgen eine Software – einfach hier ändern,
     gilt sofort in allen Apps. */
  angebot: {
    aktiv: true,
    wochenplan: {
      1: { emoji:"🥭", titel:"Smoothie des Tages: Mango Sunrise", text:"100blend · 100 % natürlich · 60 THB", cta:"100blend entdecken →", url:"https://100blend.com" },
      2: { emoji:"🛡️", titel:"Sicher surfen in Thailand", text:"Öffentliches WLAN? Mit VPN bist du geschützt.", cta:"NordVPN ansehen →", affKey:"nordvpn" },
      3: { emoji:"🥥", titel:"Smoothie des Tages: Coco Fresh", text:"100blend · kein Pulver, kein Zuckerzusatz", cta:"100blend entdecken →", url:"https://100blend.com" },
      4: { emoji:"🏥", titel:"Krankenversicherung ab 1 Monat", text:"SafetyWing – monatlich kündbar, für Nomaden & Expats.", cta:"Angebot ansehen →", affKey:"safetywing" },
      5: { emoji:"🍓", titel:"Smoothie des Tages: Berry Boost", text:"100blend · Zucker-Ampel: GRÜN", cta:"100blend entdecken →", url:"https://100blend.com" },
      6: { emoji:"🇩🇪", titel:"Deutsche Adressen in Thailand", text:"Bäcker, Ärzte, Visa-Hilfe – auf einer Karte.", cta:"Karte öffnen →", url:"deutsche-adressen.html" },
      0: { emoji:"🆘", titel:"Schon vorgesorgt?", text:"Die digitale Notfallkarte kann Leben retten – 2 Minuten ausfüllen.", cta:"Notfallkarte öffnen →", url:"notfallkarte.html" }
    },
    spezial: [
      /* Beispiel:
      { datum:"2026-08-01", emoji:"🎉", titel:"Neueröffnung 100blend Pattaya", text:"Eröffnungswoche: Gratis-Topping", cta:"Hinkommen →", url:"https://100blend.com" }
      */
    ]
  },

  /* ---- 3b. 100BLEND (Alt-Format, bleibt für Kompatibilität) ---- */
  hundertblend: {
    franchiseLink: "https://100blend.com",
    smoothieDesTages: { name: "Mango Sunrise", emoji: "🥭", preis: "60 THB" }
  },

  /* ---- 4. ANALYTICS (Google Analytics 4) ----
     Sobald du eine GA4-Property hast, hier die Mess-ID eintragen
     (Format G-XXXXXXXXXX) – dann siehst du, welche Apps am
     meisten genutzt werden. Leer = aus. */
  analytics: { gaId: "" },

  /* ---- 5. Standard-Hinweistext für Affiliate-Links ---- */
  affiliateHinweis: "Der Preis bleibt für dich gleich – der Anbieter zahlt mir eine kleine Provision, die hilft, diese App kostenlos zu halten."
};
