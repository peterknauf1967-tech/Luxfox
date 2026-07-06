/* =============================================================
   ZENTRALE KONFIGURATION – Projekt Digital Service
   -------------------------------------------------------------
   HIER trägst du SPÄTER nur noch deine Firmendaten und die
   GENEHMIGTEN Affiliate-Links ein. Alle Apps lesen aus dieser
   einen Datei. Was in [ECKIGEN KLAMMERN] steht, ist Platzhalter.
   ============================================================= */

window.DS_CONFIG = {

  /* ---- 1. FIRMENDATEN (für Impressum) ----
     Eintragen, sobald Osome / Luxfox Limited offiziell steht.
     Quelle: Notion + Google Drive. */
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
    nordvpn:     { status: "offen", url: "[NORDVPN-LINK]" },
    pacificprime:{ status: "offen", url: "[PACIFIC-PRIME-LINK]" },
    grab:        { status: "offen", url: "[GRAB-LINK]" },
    adsenseId:   "ca-pub-6577595255227351"
  },

  /* ---- WERBUNG in den Apps ----
     Grundeinstellung A = Tools bleiben SAUBER (keine Anzeigen).
     Variante B nur für Apps OHNE Affiliate-Einnahme: Dateinamen (ohne .html)
     in "showOnApps" eintragen, z. B. "thai-zahlen". showOnAll:true = überall. */
  ads: { showOnAll: false, showOnApps: ["qr-checker","muehle"] },

  /* ---- 3. 100BLEND (Smoothie des Tages + Franchise) ----
     Smoothie zentral hier ändern -> erscheint in ALLEN Apps. */
  hundertblend: {
    franchiseLink: "https://100blend.com",
    smoothieDesTages: { name: "Mango Sunrise", emoji: "🥭", preis: "60 THB" }
  },

  /* ---- 4. Standard-Hinweistext für Affiliate-Links ---- */
  affiliateHinweis: "Der Preis bleibt für dich gleich – der Anbieter zahlt mir eine kleine Provision, die hilft, diese App kostenlos zu halten."
};
