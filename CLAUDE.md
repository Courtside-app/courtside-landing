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
├── src/lib/contacto.ts          # WhatsApp, mail, URL del panel y de la demo (demoUrl): un solo lugar
├── src/layouts/Base.astro       # head, estilos globales (tokens), nav, pie, WhatsApp flotante, aparición al bajar
├── src/components/Foto.astro    # hueco de foto: muestra public/img/<nombre>.* o, si falta, un dibujo de canchas (Cancha.astro)
├── src/pages/index.astro        # portada con foto + Panel de ejemplo, tres capturas (tenis, pádel, academia), quiénes, demo, inteligencia + 6 preguntas, gestión, precio
├── src/pages/club-semilla.astro # página del Programa Clubes Semilla: video (si existe), qué recibe / qué se pide, pasos, formulario → WhatsApp
├── public/img/                  # fotos y capturas (ver «Fotos y video»)
├── public/video/                # club-semilla.mp4 + .jpg, generados
├── video-src/                   # fuente del video: club-semilla.html (escenas) + grabar.cjs (lo arma con Playwright y ffmpeg)
├── public/                      # favicon.svg = logo-mark.svg
└── astro.config.mjs
```

## Fotos y video

Las fotos se cambian **dejando el archivo con el nombre del hueco** en `public/img/` (`.webp`, `.jpg` o `.png`); no hay que tocar código. Mientras falte, `Foto.astro` dibuja canchas en su lugar.

| Archivo                | Dónde se ve                         | Qué tiene que mostrar                                              | Formato           |
| ---------------------- | ----------------------------------- | ------------------------------------------------------------------ | ----------------- |
| `portada`              | Fondo de la portada                 | Club desde arriba o cancha de polvo con gente; oscura a la izquierda (ahí va el texto) | Horizontal, 2400 px |
| `tenis`                | Tarjeta «Tenis»                     | Hoy una foto libre; cuando esté el club demo, captura de Reservas  | 16:10, 1600 px    |
| `padel`                | Tarjeta «Pádel»                     | Hoy una foto libre; después, captura de Reservas de pádel          | 16:10, 1600 px    |
| `academia`             | Tarjeta «Academia»                  | Hoy una foto libre; después, captura de Academia                   | 16:10, 1600 px    |
| `equipo`               | «Hecho por gente de club», cara 1   | En el club: foto real en una cancha                                | Vertical 4:5      |
| `equipo-ia`            | «Hecho por gente de club», cara 2   | En la IA: dando una charla de inteligencia artificial              | Vertical 4:5      |
| `semilla`              | Fondo de `/club-semilla`            | Club al atardecer, clima de arranque                               | Horizontal, 2400 px |
| `demo`                 | Marco de navegador de la demo       | Captura de la demo (hoy, su imagen de vista previa)                | 1200 × 630        |

Una foto con personas identificables (y más si hay menores) necesita el permiso de quienes aparecen antes de publicarse.

De dónde salió lo que hay hoy (nov 2026), todo de uso libre y sin atribución obligatoria:

- `tenis`, `padel`, `academia`: Unsplash (licencia Unsplash), fotos `photo-1554068865-24cecd4e34b8`, `photo-1646649853703-7645147474ba` y `photo-1687206250176-aafc1a5f8d9f`. Se eligieron sin caras reconocibles ni marcas a la vista.
- `equipo` y `equipo-ia`: fotos propias (en la cancha con una clase de fondo, de lejos; y dando una charla sobre agentes de IA).
- `demo`: imagen de vista previa de la demo guiada.
- Música del video: «Upbeat», de Alex Morgan, en Pixabay (licencia de contenido de Pixabay). Está registrada en Content ID de YouTube: si el video se sube a YouTube puede aparecer un reclamo, que se levanta con el certificado de licencia que da Pixabay en la página del tema.

Video de Clubes Semilla: `public/video/club-semilla.mp4` (y `club-semilla.jpg` de portada). Si el archivo no está, la página no muestra el bloque. Se regenera con
`node video-src/grabar.cjs --playwright <carpeta de playwright> --ffmpeg <ffmpeg.exe> --musica video-src/audio/musica.mp3 [--voz locucion.m4a]`
(recorre las animaciones de `video-src/club-semilla.html` cuadro a cuadro; `--prueba` saca un cuadro cada 2 s para revisar). Textos y tiempos de cada escena están en ese HTML.

## Quick Start

```bash
npm install
npm run dev   # http://localhost:4321
npm run build # Static output in dist/
```

## Before publishing

Constants in `src/lib/contacto.ts` (plus `demoUrl`):

| Constant          | What                                                          |
| ----------------- | ------------------------------------------------------------- |
| `contactWhatsApp` | International number without `+` — every CTA becomes a `wa.me` link with a prefilled message |
| `contactEmail`    | Fallback `mailto:` when there is no WhatsApp                  |
| `adminAppUrl`     | Login URL of the admin app once deployed                      |

Each CTA has its own WhatsApp message (`waitlistHref`, `helloHref`; the Clubes Semilla form builds its own). With both contact fields empty the CTAs point to `/club-semilla`, so the page never links to nothing.

## Content rules

- Titular de la portada: **«Inteligencia de negocio para tu club.»** (nov 2026; antes «Conocé cómo va tu club antes de que te lo cuenten»). Pie y descripciones: «Inteligencia para clubes de tenis y pádel». Contrast with the competition (booking apps): «Las apps de reservas te dicen quién jugó. RaketSense te dice cómo va el club.»
- **AI is positioning, not a feature list.** Say the platform is built on the club's real data and designed to work with AI; do not promise specific AI features until they ship.
- **Tone toward coaches and clients is never accusatory**: coaches refer clubs to us. Talk about growing the academy and keeping collections in order, not «who bills» or «who owes».
- **No fixed price on the page**: «abono mensual en pesos ≈ dos alquileres de cancha». No USD amount.
- Spanish (rioplatense: "vos", "mostrador", "socio"). Target: clubs in Argentina, 3–20 courts.
- Lead with the answer, then the data — same as the Panel. The hero mock ("Cómo va el club") is text, not a screenshot, so it stays legible on mobile and in dark mode.
- The **six questions** section mirrors `docs/strategy/README.md §7` in `courtside-admin`. If the Panel changes, change both.
- No screenshots of the player app, no "reservá online", no "app para jugadores", no MercadoPago checkout.
- Two pages (home + `/club-semilla`) and fast: no framework JS, only two tiny inline scripts (reveal on scroll, form → WhatsApp). The form stores nothing: it builds the WhatsApp message.
- The demo link is `demoUrl` in `src/lib/contacto.ts` (guided demo, a separate static site on Cloudflare Pages). Today it points to `raketsense-demo.pages.dev`; switch it to `https://demo.raketsense.com` once that domain answers 200 (the browser frame on the home shows whatever host `demoUrl` has).
- No price and no «meses gratis» on the page (decided 12-nov-2026).

## Deploy

Azure Static Web Apps (`swa-courtside-landing`, rg-courtside-prod). The workflow builds with `npm run build` and uploads `dist/`. No env vars. Custom domain: add it on the Azure resource, then update `adminAppUrl` in `src/lib/contacto.ts`.
