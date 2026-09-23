# Courtside — Landing

Sitio estático de marketing para **Courtside**: gestión y analítica para clubes de tenis y pádel. Presenta el producto y lleva al visitante a **pedir una demo** (el onboarding es asistido; no hay registro público).

## Qué es Courtside

Una plataforma para **quien administra el club**: reservas, caja, socios, canchas, profesores, academia y torneos en un solo lugar, y un Panel que cada mañana dice cómo viene el mes y qué hay que resolver. El socio no es usuario: sigue reservando por WhatsApp o en el mostrador; el staff carga, el Panel responde.

- **Target:** clubes de tenis y pádel de Argentina, 3 a 20 canchas.
- **Modelo:** SaaS multi-tenant (un backend + una base, aislado por `club_id`). USD 50/mes por club, sin límite de canchas ni socios.
- **Etapa (sep 2026):** clubes semilla con condiciones especiales a cambio de feedback real.

## Las seis respuestas del Panel

| Pregunta | Fuente |
| --- | --- |
| ¿De dónde viene la plata? | Ingresos por fuente: alquiler, academia, buffet, torneos |
| ¿Cuándo tengo las canchas vacías? | Ocupación por día y hora |
| ¿Gané o perdí este mes? | Ingresos vs egresos con costos reales |
| ¿Quién dejó de venir? | Socios en riesgo |
| ¿Qué profesor factura? | Horas, alumnos e ingreso por profesor vs lo que se le paga |
| ¿Quién me debe? | Cuenta corriente por familia, tope de fiado |

## Desarrollo

```bash
npm install
npm run dev     # http://localhost:4321
npm run build   # dist/
```

Antes de publicar, completar `contactWhatsApp`, `contactEmail` y `adminAppUrl` al principio de `src/pages/index.astro`. Ver `CLAUDE.md` para las reglas de contenido.

## Deploy

Vercel (framework Astro, sin variables de entorno). Dominio propio desde el panel de Vercel.
