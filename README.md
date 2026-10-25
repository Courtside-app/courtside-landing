# RaketSense — Landing

Sitio estático de marketing para **RaketSense** (antes Courtside): inteligencia para clubes de tenis y pádel. Presenta el producto y ofrece dos puertas de entrada: **lista de espera** y **Programa Clubes Semilla**, las dos por WhatsApp (el onboarding es asistido; no hay registro público).

## Qué es RaketSense

Una plataforma para **quien administra el club**: reservas, caja, socios, canchas, profesores, academia y torneos en un solo lugar, y un Panel que cada mañana dice cómo viene el mes y qué hay que resolver. El socio no es usuario: sigue reservando por WhatsApp o en el mostrador; el staff carga, el Panel responde.

- **Target:** clubes de tenis y pádel de Argentina, 3 a 20 canchas.
- **Modelo:** SaaS multi-tenant (un backend + una base, aislado por `club_id`). Suscripción mensual por club, a precio fijo (el monto no se publica); sin límite de canchas ni socios.
- **Etapa (oct 2026):** pre-lanzamiento, programa Clubes Semilla con condiciones especiales a cambio de feedback real.

## Las seis respuestas del Panel

| Pregunta | Fuente |
| --- | --- |
| ¿De dónde viene la plata? | Ingresos por fuente: alquiler, academia, buffet, torneos |
| ¿Cuándo tengo las canchas vacías? | Ocupación por día y hora |
| ¿Gané o perdí este mes? | Ingresos vs egresos con costos reales |
| ¿Quién dejó de venir? | Socios en riesgo |
| ¿Cómo crece la academia? | Alumnos, clases y grupos por profesor, mes a mes |
| ¿Cómo vienen los cobros? | Cuenta corriente por familia, saldos y cobro desde la caja |

## Desarrollo

```bash
npm install
npm run dev     # http://localhost:4321
npm run build   # dist/
```

Antes de publicar, completar `contactWhatsApp`, `contactEmail` y `adminAppUrl` al principio de `src/pages/index.astro`. Ver `CLAUDE.md` para las reglas de contenido.

## Deploy

Azure Static Web Apps, tier Free, recurso `swa-courtside-landing` en `rg-courtside-prod` (mismo grupo que la API). El Action `.github/workflows/azure-static-web-apps.yml` publica en cada push a `master`; necesita el secret `AZURE_STATIC_WEB_APPS_API_TOKEN`. Dominio propio: pendiente, se agrega desde el recurso en Azure y después se ajusta `adminAppUrl`.
