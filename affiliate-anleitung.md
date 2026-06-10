# 🤝 Affiliate-Anleitung — Krankenversicherung (Luxfox)

Stand: Juni 2026. Diese Datei ist nur für dich (interne Notiz), sie wird nicht auf der Website angezeigt.

---

## 1️⃣ Die drei besten Programme (sofort selbst anmeldbar)

| Anbieter | Provision | Cookie* | Auszahlung | Anmeldung |
|---|---|---|---|---|
| **SafetyWing** | **~10 % laufend** (auch auf Verlängerungen) | bis zu 1 Jahr | PayPal / Bank, **kein** Mindestbetrag | https://safetywing.com/ambassador |
| **Genki** | **5 % laufend**, solange Kunde bleibt | 365 Tage | ab **50 €** | https://genki.world/partners |
| **Cigna Global** | ab **£8 pro Abschluss** (individuell verhandelbar) | 45 Tage | über Affiliate-Netzwerk | https://www.cignaglobal.com/affiliates/sign-up |

\* *Cookie = so lange nach dem Klick zählt ein späterer Abschluss noch für dich.*

**Empfehlung:** Fang mit **SafetyWing** und **Genki** an — die nehmen auch kleine Partner sofort auf, zahlen **laufend** (nicht nur einmal) und passen perfekt zu deiner Langzeit-/Rentner-Zielgruppe in Südostasien. Cigna Global lohnt sich zusätzlich für Premium-/Familienfälle.

---

## 2️⃣ So meldest du dich an (immer gleich)

1. Den Link aus der Tabelle oben öffnen → **„Sign up" / „Become a partner"**
2. Mit deiner E-Mail (peterknauf1967@gmail.com) registrieren
3. **Website angeben:** `https://luxfox.net/versicherung.html`
4. **Auszahlung einrichten:** PayPal-Adresse oder Bankverbindung hinterlegen
5. Nach Freigabe bekommst du deinen **persönlichen Tracking-Link** (sieht z. B. so aus: `https://safetywing.com/?ref=luxfox`)

---

## 3️⃣ Deinen Link in die Website einsetzen

Datei: **`versicherung.html`**. Such die Zeilen mit dem Kommentar `<!-- AFFILIATE: ... -->`.
Direkt darunter steht ein Link wie:

```html
<!-- AFFILIATE: nach Anmeldung bei safetywing.com/ambassador den eigenen Tracking-Link in href eintragen -->
<a class="pc" href="https://safetywing.com" ...>
```

➡️ Ersetze **nur** den Teil in den Anführungszeichen hinter `href=`:

```html
href="https://safetywing.com"   ←  VORHER
href="https://safetywing.com/?ref=DEIN-CODE"   ←  NACHHER
```

Es gibt pro Anbieter **zwei** Stellen (eine in den Partner-Kacheln, eine in der Vergleichstabelle) — beide ersetzen. Wenn du mir die fertigen Links schickst, **setze ich sie für dich ein**.

> 💡 Du musst nichts davon selbst suchen — schick mir einfach die Tracking-Links, dann baue ich sie an allen Stellen sauber ein.

---

## 4️⃣ Anschreiben-Vorlagen (falls du weitere Partner direkt anfragen willst)

### Vorlage A — Anbieter mit Affiliate-Programm (kurz & freundlich)

> **Subject:** Affiliate partnership – expat insurance referral site (luxfox.net)
>
> Dear [Name / Partnerships Team],
>
> I run **Luxfox** (luxfox.net), a small suite of free tools for German-speaking expats and long-stay retirees in Thailand, Vietnam, Cambodia and Laos. One page helps them choose **health insurance**.
>
> I'd like to join your **affiliate / referral programme** and feature [Anbieter] as a recommended provider. Could you let me know:
> - the commission structure (per policy / recurring),
> - the tracking method (link, code, dashboard),
> - and any branding or compliance requirements.
>
> Audience: long-term and retired German-speaking residents in Southeast Asia — a strong fit for international long-stay cover.
>
> Thank you very much. I look forward to working together.
>
> Best regards,
> Peter Knauf — Luxfox Limited
> peterknauf1967@gmail.com

### Vorlage B — Lokaler Makler (Provision für vermittelte Leads)

> **Subject:** Referral partnership – qualified expat insurance leads
>
> Dear [Name],
>
> I run luxfox.net, a free info site for German-speaking expats in Southeast Asia. I'd like to **refer qualified health-insurance leads** to you and agree a **referral fee per completed policy**.
>
> Could you tell me whether you offer a referral arrangement, the fee per policy, and how you'd like leads handed over (form, link or email)?
>
> Best regards,
> Peter Knauf — Luxfox Limited

---

## 5️⃣ Rechtlicher Hinweis (steht schon auf der Seite ✅)

Auf `versicherung.html` ist bereits der Transparenz-Hinweis vorhanden:
> „Keine Versicherungsberatung — nur Orientierung & Weiterleitung. Der Preis ist für dich derselbe; Partner zahlen eine kleine Provision."

Das reicht als Affiliate-Offenlegung für die meisten Programme. Behalte ihn drin.
