# CLAUDE.md — Projekt-Notizen für Luxfox

Diese Datei wird von Claude bei jedem neuen Chat in diesem Projekt automatisch
gelesen. Sie sorgt dafür, dass die wichtigsten Infos immer bekannt sind — auch
wenn ein alter Chat „voll" wird oder du einen neuen startest.

> Du kannst diese Datei jederzeit bearbeiten. Ergänze gern, was Claude über dein
> Projekt wissen soll (z. B. Geschäftliches, Vorlieben, geplante Funktionen).

## Was ist Luxfox?

- **Luxfox Limited** — Motto: „Light · Health · Digital"
- Eine **statische Website**, gehostet über **GitHub Pages** (siehe `CNAME`).
- Enthält u. a. einen **Euro-Baht-Währungsrechner** als installierbare App (PWA)
  mit geprüften Diensten/Tools für Expats in Thailand.
- Sprache der Inhalte: überwiegend **Deutsch**.

## Aufbau (wichtigste Dateien)

- `index.html` — Startseite (Luxfox Limited)
- `app.html` — Euro-Baht-Rechner (Start der PWA, siehe `manifest.json`)
- `app/index.html` — Unterseite der App
- `shop.html` — Shop-Seite (Bilder in `shop-img/`)
- `wirkung.html`, `nir-konzept.html` — Inhaltsseiten
- `manifest.json`, `sw.js` — PWA-Konfiguration (Installierbarkeit, Offline)
- `sitemap.xml`, `robots.txt`, `.nojekyll` — SEO / GitHub-Pages-Steuerung
- `luxfox-logo.png`, `luxfox-logo.svg` — Logos

## Technik / Wichtig zu wissen

- **Kein Build-System**, kein npm — reines HTML/CSS/JS. Änderungen wirken direkt.
- **Veröffentlichen = nach `main` pushen.** GitHub Pages stellt `main` automatisch
  online. Es gibt **keine automatischen Tests (CI)** in diesem Repo.
- `.nojekyll` ist vorhanden, damit GitHub Pages die Dateien unverändert ausliefert.
- Berechtigungen für Claude Code sind in `.claude/settings.json` hinterlegt
  (Routine-Befehle laufen ohne Nachfrage, Gefährliches ist gesperrt).

## Arbeitsweise / Vorlieben

- Antworten und Erklärungen bitte auf **Deutsch**, gut verständlich.
- Bei Änderungen an der Website: erst kurz erklären, was geändert wird, dann umsetzen.
- Vor dem Veröffentlichen (`push` nach `main`) Bescheid geben.

<!--
  TODO (von dir auszufüllen, wenn du magst):
  - Worum geht es bei Luxfox geschäftlich genau?
  - Gibt es feste Farben/Schriften/Designregeln?
  - Welche Funktionen sind als Nächstes geplant?
-->
