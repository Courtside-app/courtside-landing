# RaketSense — Landing Page (courtside-landing)

## Product Overview

**RaketSense** (formerly Courtside, renamed Oct 2026 — the repos keep the old name for now) is the **intelligence platform for racquet clubs** (tennis/padel): integral management + analytics, positioned on AI, The buyer and only user is **whoever administers the club** (owner, manager, front desk) — not the player. Operational features (bookings, cash, members, coaches, academy, tournaments) capture the data that feeds the Panel, which is the actual differentiator.

This repo is the **marketing landing page**: a static Astro site that presents the product and drives visitors to **ask for a demo** (onboarding is assisted, one club at a time — there is no public signup).

> Scope and doctrine live in `courtside-admin/docs/strategy/README.md` (E1–E11). Read it before changing the copy: the landing must not promise the player app, online self-service booking or MercadoPago SaaS checkout — those are out of scope on purpose.

This is one of 3 repos:

- `courtside-admin` — NestJS backend + Angular admin web app (the product)
- `courtside-player` — Angular PWA for players — **frozen, out of scope (E3)**
- `courtside-landing` ← you are here

## Tech Stack

- **Framework:** Astro (SSG — zero JS by default, SEO optimized)
- **Styling:** Vanilla CSS in a `<style>` block (no Tailwind). Same visual system as the admin redesign (Sep 2026): near-black ink, **one** orange accent `#e2683a`, 1px hairlines, 5–7px radii, tabular numbers, light + dark via `prefers-color-scheme`.
- **Deploy:** Azure Static Web Apps (Free) via `.github/workflows/azure-static-web-apps.yml`

## Project Structure

```
courtside-landing/
├── src/pages/index.astro   # Single page: nav, hero + Panel mock, 6 questions, inteligencia, gestión integral, cómo empezar, precio + programa Clubes Semilla, footer
├── public/                 # favicon.svg = logo-mark.svg (tennis racket + padel paddle, accent)
├── astro.config.mjs
└── vercel.json
```

## Quick Start

```bash
npm install
npm run dev   # http://localhost:4321
npm run build # Static output in dist/
```

## Before publishing

Three constants at the top of `src/pages/index.astro`:

| Constant          | What                                                          |
| ----------------- | ------------------------------------------------------------- |
| `contactWhatsApp` | International number without `+` — every CTA becomes a `wa.me` link with a prefilled message |
| `contactEmail`    | Fallback `mailto:` when there is no WhatsApp                  |
| `adminAppUrl`     | Login URL of the admin app once deployed                      |

Each CTA has its own WhatsApp message (`demoHref`, `seedHref`). With both contact fields empty the CTAs point to `#semilla` (the clubes-semilla box), so the page never links to nothing — but fill them in before going live.

## Content rules

- Slogan: **«Inteligencia para clubes de tenis y pádel»**. Contrast with the competition (booking apps): «Las apps de reservas te dicen quién jugó. RaketSense te dice cómo va el club.»
- **AI is positioning, not a feature list.** Say the platform is built on the club's real data and designed to work with AI; do not promise specific AI features until they ship.
- **Tone toward coaches and clients is never accusatory**: coaches refer clubs to us. Talk about growing the academy and keeping collections in order, not «who bills» or «who owes».
- **No fixed price on the page**: «abono mensual en pesos ≈ dos alquileres de cancha». No USD amount.
- Spanish (rioplatense: "vos", "mostrador", "socio"). Target: clubs in Argentina, 3–20 courts.
- Lead with the answer, then the data — same as the Panel. The hero mock ("Cómo va el club") is text, not a screenshot, so it stays legible on mobile and in dark mode.
- The **six questions** section mirrors `docs/strategy/README.md §7` in `courtside-admin`. If the Panel changes, change both.
- No screenshots of the player app, no "reservá online", no "app para jugadores", no MercadoPago checkout.
- Keep it one page and fast. If adding interactivity, prefer Astro Islands.

## Deploy

Azure Static Web Apps (`swa-courtside-landing`, rg-courtside-prod). The workflow builds with `npm run build` and uploads `dist/`. No env vars. Custom domain: add it on the Azure resource, then update `adminAppUrl` in `src/pages/index.astro`.
