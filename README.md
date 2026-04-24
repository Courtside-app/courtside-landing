# Courtside — Landing

Sitio estático de marketing para **Courtside**, el SaaS de gestión integral para clubes de tenis y pádel. Presenta el producto, la propuesta de valor y empuja al visitante al registro en el panel admin.

---

## Sobre Courtside

**Una plataforma, todo tu club.** Courtside reemplaza las planillas, los grupos de WhatsApp y las reservas por teléfono con un sistema web llave en mano, pensado para dueños de clubes de raqueta que hoy pierden horas administrando a mano.

- **Target:** clubes de tenis y pádel de LATAM (principalmente Argentina). Clubes chicos y medianos (5 a 30 canchas, 50 a 1.000 socios).
- **Modelo:** SaaS multi-tenant. Un solo backend + base de datos aísla cada club por `club_id` + RLS.
- **Pricing comercial:** USD 50/mes por club. Sin límite de socios ni canchas. Onboarding self-service en minutos.
- **Idioma/moneda:** español LATAM, ARS/USD configurable por club.

### Propuesta de valor

| Dolor actual del club | Cómo lo resuelve Courtside |
|-----------------------|----------------------------|
| Reservas por WhatsApp y planilla | Reservas online 24/7 desde la PWA del jugador, sin doble booking |
| Cobrar a los socios es un caos | Estado de pago por reserva, historial por socio, integración MercadoPago |
| Academia organizada en cuadernos | Grupos por edad/nivel, inscripciones online, financiero por grupo |
| Torneos en Excel con pérdida de datos | Cuadros automáticos (eliminación seeded, round robin), programación que crea reservas reales, ranking por ronda |
| Sin visibilidad del negocio | Dashboard con ingresos, ocupación y actividad en tiempo real |
| Staff sin agenda clara | Coaches con disponibilidad propia, vista self-service de clases |

### Feature set completo (lo que ya existe en producción)

**Operación diaria**
- Reservas de canchas (tenis y pádel, múltiples superficies) con calendario semanal
- Reservas puntuales, fijas y recurrentes
- Mantenimiento de canchas con costos y estados
- Visor 3D de cancha con secciones clickeables (superficie, red, líneas) para tareas de mantenimiento precisas
- Invitación de socios por email con token
- PWA de jugador instalable desde la invitación (funciona offline)

**Academia**
- Grupos por edad y nivel con entrenador asignado
- Auto-generación de sesiones según horario semanal
- Inscripciones de socios y menores (con guardián)
- Clases privadas: wizard de 4 pasos (coach → fecha/horario → cancha → confirmar)
- Reportería financiera por grupo

**Torneos**
- Ciclo completo: crear → inscribir → cuadro → calendario → resultados
- Formatos: Eliminación seeded, Round Robin, Combinado
- Modalidades: Largo, Largo Fin de Semana, Relámpago (Singles/Dobles)
- Programar un partido **crea una reserva real** de la cancha
- Distribución de puntos de ranking por ronda

**Coaches**
- Perfiles, tarifa horaria, especialidad
- Disponibilidad editable en grilla semanal
- Self-service: el staff gestiona su propia agenda
- KPIs por coach (horas, alumnos activos, ingresos generados)

**Management**
- Dashboard con KPIs, ingresos y ocupación
- CRM de socios con paginación y búsqueda
- Configuración del club (horarios, moneda, categorías de torneo)
- Sistema dual de roles: OWNER, ADMIN, STAFF, COACH, PLAYER, CLIENT
- Suscripción y facturación con MercadoPago
- Asistente AI (Gemini) para consultas en lenguaje natural (plan Pro+)

### Arquitectura del producto (3 aplicaciones)

```
┌────────────────────┐    ┌────────────────────┐    ┌────────────────────┐
│  Landing (Astro)   │    │  Admin (Angular)   │    │  Player (PWA)      │
│  courtside-landing │    │  courtside-admin   │    │  courtside-player  │
│  → este repo       │    │                    │    │                    │
│                    │    │  Dueño + staff     │    │  Socios del club   │
│  Marketing + CTA   │    │  Web desktop       │    │  Instalable móvil  │
└─────────┬──────────┘    └──────────┬─────────┘    └──────────┬─────────┘
          │                          │                          │
          └─── CTA "Probalo" ────────┤                          │
                                     │                          │
                          ┌──────────▼──────────────────────────▼─────┐
                          │  Backend NestJS + Supabase (PostgreSQL)   │
                          │         Multi-tenant por club_id + RLS   │
                          └───────────────────────────────────────────┘
```

### Identidad de marca

- **Nombre:** Courtside (antes *CourtMaster Pro* — nombre descartado)
- **Tagline:** "Gestioná tu club sin complicaciones"
- **Tono:** profesional, directo, español rioplatense informal ("tus jugadores", "reservá", "probalo")
- **Paleta actual** (a iterar en Design):
  - Verde primario `#166534` (cancha de tenis)
  - Verde claro `#16a34a` (hover/accent)
  - Verde sutil `#f0fdf4` (fondos de sección)
  - Texto `#111827` / muted `#6b7280`
  - Bordes `#e5e7eb`
- **Tipografía:** system sans-serif hoy; abierto a custom
- **Iconografía:** emojis en V1 (🎾 👥 🏫 🏆 📊 📲) — a iterar hacia iconos custom/Lucide

---

## Sobre este repo

Sitio estático construido con **Astro** (SSG — zero JS por default, SEO-friendly). Una sola página (`index.astro`) con hero, grid de features, sección dual-app, pricing y footer.

### Stack

- **Framework:** Astro (SSG)
- **Estilos:** CSS vanilla en `<style>` scoped — no Tailwind, la V1 se mantiene simple
- **Deploy:** Vercel (`vercel.json` con `"framework": "astro"`)

### Estructura

```
courtside-landing/
├── src/
│   └── pages/
│       └── index.astro        # V1: hero + features + apps + pricing + footer
├── public/
│   └── favicon.{ico,svg}
├── astro.config.mjs
├── vercel.json
└── CLAUDE.md                  # Contexto del repo para Claude Code
```

### Quick Start

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # salida estática en dist/
npm run preview    # preview del build
```

### Config clave

El link de CTA está en el frontmatter de `src/pages/index.astro`:

```astro
---
const adminAppUrl = 'https://courtside-admin.vercel.app';
---
```

Actualizar cuando cambien dominios.

### Deploy

Vercel detecta Astro automáticamente via `vercel.json`. Sin env vars.

---

## Roadmap del sitio

- [ ] Iterar diseño con **Claude Design** (coherencia visual con admin + player)
- [ ] Custom domain (`courtside.app` o similar)
- [ ] Sección de testimonios de clubes piloto
- [ ] Formulario de demo/contacto (Islands de Astro + endpoint serverless)
- [ ] Screenshots reales del admin y la PWA
- [ ] Blog/recursos para SEO
- [ ] Página dedicada de pricing con comparativa de planes (cuando se abran más tiers)
- [ ] OG image + metadatos sociales
- [ ] Internacionalización (es-AR → es, en)

## Notas de implementación

- Todo el contenido en español LATAM
- Mantener el sitio minimal — Astro por default no emite JS al cliente
- Si se necesita interactividad, usar Astro Islands con framework mínimo (no agregar React/Vue full)
- SEO: actualizar `<meta name="description">` y `<title>` cuando evolucione el producto
- Branding compartido con admin y player — cualquier cambio visual debe reflejarse en los otros repos

## Repos relacionados

- [`courtside-admin`](../courtside-admin) — backend NestJS + panel admin Angular
- [`courtside-player`](../courtside-player) — PWA Angular para socios del club

## Licencia

Private — All rights reserved.
