# Kaan Semih Kurt — Portfolio Website

**English** | [Türkçe](README.tr.md)

![version](https://img.shields.io/badge/version-2.1.0-5ea6ff) ![Next.js](https://img.shields.io/badge/Next.js-16-000) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-336791)

A multi-page portfolio with a database and an admin panel, built with **Next.js (App Router)** and **PostgreSQL (Neon)**. Midnight blue design, serif headings, blue accents. Live at: https://kaansemihkurt.vercel.app

> Version 2.1.0 was built as an individual assignment for the course *BVA 2205 Cyber Security and IT Law* (Manisa Celal Bayar University).

## Features

- **Languages:** Turkish (default), English and Japanese via the TR / EN / 日本語 buttons; the choice is remembered. A language can also be opened with `?lang=en`.
- **Theme:** Midnight blue by default, with a light blue theme toggle that is remembered.
- **FAQ from the database:** questions and answers are stored in PostgreSQL and managed from the admin panel; only published entries are shown on the site.
- **Contact form:** messages are saved to the database (with KVKK consent) and read in the admin panel.
- **Admin panel:** password login, sessions, FAQ management, messages and a security log.

## Pages

| Path | Content |
|---|---|
| `/` | Home, including "Featured questions" from the database |
| `/projeler` | Projects |
| `/sss` | FAQ grouped by category (published entries only) |
| `/iletisim` | Contact form → `iletisim_mesajlari` table |
| `/aydinlatma-metni` | KVKK privacy notice, including cross-border data transfer |
| `/mail.html` | E-mail address page |
| `/giris` | Admin login |
| `/admin` | Dashboard: unread messages and FAQ count |
| `/admin/sss` | FAQ list (JOIN), add, edit, delete, publish / unpublish |
| `/admin/mesajlar` | Contact messages: mark as read, delete |
| `/admin/guvenlik` | Last 20 login attempts and IPs with the most failed attempts |

## Security

- Every query is parameterised (`` sql`... ${value}` ``); SQL is never built by string concatenation (SQL injection protection).
- Passwords are stored only as **bcrypt** hashes (cost 12).
- Session tokens are generated with `crypto.randomBytes(32)`, stored in the `oturumlar` table for 2 hours and kept in an **httpOnly**, `sameSite=lax`, `secure` (in production) cookie.
- Every `/admin` page **and** every Server Action checks the session on its own.
- A failed login only says "E-mail or password is incorrect" (protection against user enumeration); unknown e-mails are still compared against a dummy hash so response times don't leak which accounts exist.
- **Brute-force lock:** after 5 failed attempts for the same e-mail within 15 minutes, login is temporarily locked. Every attempt is logged in `giris_denemeleri`.
- Contact form fields are validated **on the server** as well (empty / too long / invalid e-mail / missing consent), with a honeypot field against bots.
- The database URL lives in `.env.local`, which is never committed (`.gitignore`).

## Project structure

```
app/
  (site)/          public pages (shared header and footer)
  giris/           login page and logout action
  admin/           admin panel
components/        reusable components
lib/db.js          Neon connection
lib/auth.js        session check
lib/sozluk.js      TR / EN / JA texts
sql/tablolar.sql   all CREATE TABLE statements
sql/sorgular.sql   assignment SQL queries
public/            static files (images, mail.html)
```

## Running locally

```bash
npm install
# copy .env.example to .env.local and set DATABASE_URL to your Neon connection string
npm run dev
```

Then open http://localhost:3000.

## Deployment

Repository: `kaansemihkurt/portfoy_sitesi`. Every push to `main` is deployed automatically by Vercel. `DATABASE_URL` must be set under *Vercel → Settings → Environment Variables*. Server functions run in Frankfurt (`fra1`, see `vercel.json`), close to the Neon database (AWS eu-central-1).

## Release notes

### 2.1.0 — Database and admin panel
- Moved from static HTML to **Next.js (App Router)**; the design, the three languages and the theme toggle were kept.
- Added a **PostgreSQL (Neon)** database: `yoneticiler`, `oturumlar`, `iletisim_mesajlari`, `sss_kategorileri`, `sss`, `giris_denemeleri`.
- New **FAQ** page (`/sss`) and a **Featured questions** section on the home page, both read from the database; opening a question increases its click count.
- The **contact form** now saves messages to the database instead of Formspree. Fields were reduced to name, e-mail, message and KVKK consent (data minimisation), with server-side validation.
- New **admin panel**: bcrypt login, session table, httpOnly cookie, logout, dashboard, FAQ management (add / edit / delete / publish) and message management (mark as read / delete).
- New **brute-force protection** and a **security log** page (`/admin/guvenlik`).
- New **KVKK privacy notice** page (`/aydinlatma-metni`) including cross-border data transfer information (KVKK art. 9).
- SQL files added under `sql/`.

### 2.0.0 — Midnight blue redesign
- Multi-page static site (home, projects, contact) with a midnight blue design.
- Turkish, English and Japanese language support; light / dark theme toggle.
- Contact form via Formspree.
