# Courtside — Landing Page (courtside-landing)

## Product Overview

**Courtside** is a **management + analytics platform for racquet clubs** (tennis/padel), USD 50/month per club. The buyer and only user is **whoever administers the club** (owner, manager, front desk) — not the player. Operational features (bookings, cash, members, coaches, academy, tournaments) capture the data that feeds the Panel, which is the actual differentiator.

This repo is the **marketing landing page**: a static Astro site that presents the product and drives visitors to **ask for a demo** (onboarding is assisted, one club at a time — there is no public signup).

> Scope and doctrine live in `courtside-admin/docs/strategy/README.md` (E1–E11). Read it before changing the copy: the landing must not promise the player app, online self-service booking or MercadoPago SaaS checkout — those are out of scope on purpose.

This is one of 3 repos:

- `courtside-admin` — NestJS backend + Angular admin web app (the product)
- `courtside-player` — Angular PWA for players — **frozen, out of scope (E3)**
- `courtside-landing` ← you are here

## Tech Stack

- **Framework:** Astro (SSG — zero JS by default, SEO optimized)
- **Styling:** Vanilla CSS in a `<style>` block (no Tailwind). Same visual system as the admin redesign (Sep 2026): near-black ink, **one** orange accent `#e2683a`, 1px hairlines, 5–7px radii, tabular numbers, light + dark via `prefers-color-scheme`.
- **Deploy:** Vercel (`vercel.json` with `"framework": "astro"`)

## Project Structure

```
courtside-landing/
├── src/pages/index.astro   # Single page: nav, hero + Panel mock, 6 questions, operación, cómo empezar, precio + clubes semilla, footer
├── public/                 # favicon, logo-courtside-mark.svg (recolored to the accent)
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

With both contact fields empty the CTAs point to `#contacto` (the clubes-semilla box), so the page never links to nothing — but fill them in before going live.

## Content rules

- Spanish (rioplatense: "vos", "mostrador", "socio"). Target: clubs in Argentina, 3–20 courts.
- Lead with the answer, then the data — same as the Panel. The hero mock ("Cómo va el club") is text, not a screenshot, so it stays legible on mobile and in dark mode.
- The **six questions** section mirrors `docs/strategy/README.md §7` in `courtside-admin`. If the Panel changes, change both.
- No screenshots of the player app, no "reservá online", no "app para jugadores", no MercadoPago checkout.
- Keep it one page and fast. If adding interactivity, prefer Astro Islands.

## Deploy

Vercel detects Astro automatically. No env vars. Custom domain: add it in Vercel and update `adminAppUrl`.
