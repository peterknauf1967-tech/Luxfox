# CLAUDE.md

Guidance for AI assistants (and humans) working in this repository.

## What this is

The corporate / marketing website for **Luxfox Limited** (Hong Kong), served at
**luxfox.net**. It is a **static, hand-written multi-page site** — no framework,
no build step, no package manager, no dependencies. Every page is a single,
fully self-contained `.html` file with its CSS in an inline `<style>` block and
its JS in an inline `<script>` block at the bottom.

Hosting: **GitHub Pages** from the repo root. The `CNAME` file (`luxfox.net`)
binds the custom domain. There is no Jekyll config and no CI workflow — pushing
to the published branch deploys the site directly. Open any `.html` file in a
browser to preview; there is nothing to compile or run.

Repository: `peterknauf1967-tech/luxfox`.

## Pages

| File | Purpose | Theme | Language |
|------|---------|-------|----------|
| `index.html` | Corporate landing: three "venture" cards (NIR therapy, 100blend franchise, Expat App), app detail, contact. Includes a hidden password-gated admin panel. | Green `#1FC76A` + gold `#C9A450` on near-black | EN default, DE toggle |
| `shop.html` | NIR / red-light product shop. Product grid + cart that checks out via WhatsApp. Marked "Konzept-Entwurf" (concept draft). | Orange `#E8791E` on dark | German only |
| `nir-konzept.html` | Long-form NIR concept/landing page (science, products, FAQ, contact). Linked from `shop.html` as "Wirkung". Marked "Konzept-Entwurf". | Orange `#E8791E` on dark | German only |
| `wirkung.html` | Standalone "NIR Anwendung" (effects/usage) page with serif typography and Google Fonts. **Currently orphaned** — not linked from any other page (only links back to `index.html`). | Orange `#FF6600`, Cormorant Garamond + DM Sans | DE default, EN toggle |

Assets:
- `luxfox-logo.png` — primary logo used in nav across pages (rendered as a round avatar).
- `luxfox-logo.svg` — vector logo.
- `shop-img/` — eight product photos (`panel-*.jpg`, `mask-*.jpg`, `cap.jpg`, `belt.jpg`, `knee.jpg`) referenced by the product array in `shop.html`. Note: these are placeholder/concept images (credited to "Cavlon") and must be licensed or replaced before any live shop.

## Conventions

**Self-contained pages.** Each page owns its full styling and scripting. There
is no shared CSS/JS file. When you change a visual element that appears on
multiple pages (e.g. the nav logo, a color), you must edit **each page
individually** — they do not import from one another. Don't introduce a build
step or split files out unless explicitly asked.

**CSS variables per page.** Every page defines its own palette in a `:root`
block, and the palettes differ deliberately (`index.html` is green/gold;
`shop.html` and `nir-konzept.html` are orange `#E8791E`; `wirkung.html` is
orange `#FF6600`). Prefer the page's existing `var(--…)` tokens over hard-coded
colors. Layout is plain CSS grid/flex with `clamp()` for fluid type and
`@media` queries for mobile.

**Coding style.** CSS in `index.html`, `shop.html`, `nir-konzept.html` is
written **densely** (multiple declarations per line, minimal whitespace);
`wirkung.html` uses expanded multi-line CSS. Match the style of the file you are
editing. Vanilla JS only (DOM APIs, `IntersectionObserver`, `localStorage`,
template literals) — no libraries.

**Internationalization — two different patterns, by page:**
- `index.html`: elements are marked `data-lang="en"` / `data-lang="de"`; CSS
  shows/hides based on `body.lang-de`. `setLang('en'|'de')` toggles the class
  and persists to `localStorage` key **`lf-lang`**. Default is **EN**.
- `wirkung.html`: elements use `.en` / `.de` classes toggled by `body.lang-de`,
  via its own `setLang()`. Default is **DE** (`<body class="lang-de">`).
- `shop.html` and `nir-konzept.html` are **German-only** (no toggle).

When adding bilingual copy to `index.html`, always add **both** the `en` and
`de` variant of any user-visible string, or one language will show a gap.

**Contact details are repeated literally** across pages (not centralized).
Keep them consistent everywhere if they change:
- Email: `peter@luxfox.net`
- WhatsApp: `+66 96 296 1811` → used in `wa.me/66962961811` links
- Company address: Unit 1603, 16/F, The L. Plaza, 367–375 Queen's Road Central, Sheung Wan, Hong Kong
- Director: Peter Knauf

**Shop behavior (`shop.html`).** Products live in the `products` array inside
the inline script (id, cat, name, img, price, desc, specs). Categories are
`panel` / `maske` / `wearable`, filtered by the buttons. The cart is in-memory
only (no persistence, no payment); checkout builds a pre-filled **WhatsApp
message** (`buildCheckout`) to `WHATSAPP = "66962961811"`. To add a product, add
an array entry and drop its image in `shop-img/`.

**Admin panel (`index.html`).** The footer lock icon opens a password modal; on
success it reveals an internal business dashboard (venture todos, supplier
contacts). The password is **client-side and base64-obfuscated only**
(`atob('THV4Zm94MjAyNiE=')` → `Luxfox2026!`). This is *not* real security —
anyone can read it in the page source. Do **not** put genuinely sensitive
secrets here, and don't treat it as protected. The panel content is German.

**Medical/legal framing.** Luxfox NIR/red-light products are positioned as
**wellness/lifestyle products, not medical devices**. Pages carry disclaimers
to that effect (see `shop.html` footer). Preserve this framing — do not add
medical claims (diagnosis, treatment, cure) to product copy.

## Git & workflow

- Active development branch for this work: **`claude/claude-md-docs-lyO1B`**.
  Develop, commit, and push there. Do not push to `main` without explicit
  permission, and do not open a PR unless asked.
- Push with `git push -u origin <branch>`; retry transient network failures with
  exponential backoff.
- Commit messages in this repo are typically **German, terse, and ASCII-safe**
  (umlauts spelled out, e.g. "gross", "doppelt", "Loesung"). Each describes a
  concrete visual/content change (e.g. `Logo: 100px (doppelt so gross)`). Match
  that style.
- Since GitHub Pages deploys straight from the branch, every pushed change to
  the published branch is effectively a production deploy — review visible
  output before pushing.

## Quick checklist before finishing a change

1. Edited the right file(s)? Cross-page elements (logo, nav, colors, contact
   info) usually need the same edit in **every** page.
2. For `index.html` text changes: added **both** `en` and `de` variants?
3. Used the page's existing CSS variables and matched its code-density style?
4. Didn't introduce a build tool, dependency, or shared asset file?
5. Kept product wellness (non-medical) framing and consistent contact details.
