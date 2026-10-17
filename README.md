# Kaan Semih Kurt — Portfolio Website

**English** | [Türkçe](README.tr.md)

A multi-page portfolio inspired by the clean section layout of my instructor's website, but with a different look of its own (midnight blue, serif headings, blue accents). Live at: https://kaansemihkurt.vercel.app

- **Languages:** Turkish (default), English and Japanese. Use the TR / EN / 日本語 buttons in the top-right corner; your choice is remembered in the browser. A language can also be opened directly with a URL such as `?lang=en`.
- **Theme:** Midnight blue by default; the button in the top-right corner switches to a light blue theme, and the choice is remembered.
- **Pages:** `index.html`, `projeler.html` (projects), `iletisim.html` (contact), plus `mail.html` (e-mail address page).
- **Text:** All translations live in `i18n.js` as key → text pairs. To change a sentence, edit that key's value in all three languages.
- **Contact form:** Powered by Formspree (`https://formspree.io/f/xdekjqaw`).
- **Project preview image:** `img/enflasyon-onizleme.png` (if it can't be found, the image from the live project is loaded instead).

## Deployment
Repository: `kaansemihkurt/portfoy_sitesi`. Every change pushed to the `main` branch is deployed automatically by Vercel.

## Viewing locally
Open `index.html` in your browser. Fonts are loaded from Google Fonts (without an internet connection, system fonts are used).
