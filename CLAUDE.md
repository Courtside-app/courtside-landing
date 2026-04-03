# Courtside — Landing Page (courtside-landing)

## Product Overview

**Courtside** is a multi-tenant SaaS platform for tennis/padel clubs ($50/month per club). This repo is the **marketing landing page**: a static Astro site that presents the product and drives signups to the admin app.

This is one of 3 repos:
- `courtside-admin` — NestJS backend + Angular admin web app
- `courtside-player` — Angular PWA for players
- `courtside-landing` ← you are here (Astro marketing site)

## Tech Stack

- **Framework:** Astro (SSG — zero JS by default, SEO optimized)
- **Styling:** Vanilla CSS in `<style>` blocks (no Tailwind — keep it simple)
- **Deploy:** Vercel (`vercel.json` with `"framework": "astro"`)

## Project Structure

```
courtside-landing/
├── src/
│   └── pages/
│       └── index.astro     # Single page (V1) — hero, features, 2-app section, pricing, footer
├── public/
│   ├── favicon.ico
│   └── favicon.svg
├── astro.config.mjs
└── vercel.json
```

## Quick Start

```bash
npm install
npm run dev   # http://localhost:4321
npm run build # Static output in dist/
```

## Current V1 Content

- **Hero** — tagline + CTA → admin signup
- **Features grid** — 6 features (reservas, socios, academia, torneos, dashboard, PWA)
- **Two-app section** — admin panel vs player app
- **Pricing** — USD 50/mes, feature list, CTA
- **Footer**

The `adminAppUrl` variable at the top of `index.astro` controls where CTAs point. Update it after Vercel deploy.

## Deploy

Vercel detects Astro automatically via `vercel.json`. No env vars needed.

## Development Notes

- All content is in Spanish (target market: LATAM tennis/padel clubs)
- Keep pages minimal and fast — Astro default is zero client-side JS
- If adding interactivity, prefer Astro Islands with a minimal framework
- SEO: update `<meta name="description">` and `<title>` when content evolves
- Future: add a contact/demo form, testimonials, custom domain
