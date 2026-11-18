// Genera public/og.png (1200×630): la tarjeta que arman WhatsApp, LinkedIn y demás al pegar el link.
// Uso: node scripts/og.mjs — correrlo si cambia el titular o la marca. `sharp` viene con Astro.
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import sharp from 'sharp';

const landing = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const ARCILLA = ['#c4582e', '#bb5129', '#cc6236'];
const canchas = [];
for (let fila = 0; fila < 6; fila++) {
  for (let col = 0; col < 4; col++) {
    const color = ARCILLA[(fila + col) % ARCILLA.length];
    canchas.push(
      `<g transform="translate(${col * 556} ${fila * 300})"><rect width="512" height="256" rx="4" fill="${color}"/><use href="#lineas"/></g>`,
    );
  }
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <g id="lineas" fill="none" stroke="#fff" stroke-opacity="0.92" stroke-width="2.5">
      <rect x="89.5" y="51" width="333" height="154"/>
      <line x1="89.5" y1="70" x2="422.5" y2="70"/>
      <line x1="89.5" y1="186" x2="422.5" y2="186"/>
      <line x1="166" y1="70" x2="166" y2="186"/>
      <line x1="346" y1="70" x2="346" y2="186"/>
      <line x1="166" y1="128" x2="346" y2="128"/>
      <line x1="256" y1="42" x2="256" y2="214" stroke-width="3.5"/>
    </g>
    <linearGradient id="velo" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0" stop-color="#0a0a0a"/>
      <stop offset="0.5" stop-color="#0a0a0a"/>
      <stop offset="0.78" stop-color="#0a0a0a" stop-opacity="0.35"/>
      <stop offset="1" stop-color="#0a0a0a" stop-opacity="0.1"/>
    </linearGradient>
    <mask id="corte" maskUnits="userSpaceOnUse" x="0" y="0" width="48" height="48">
      <rect width="48" height="48" fill="#fff"/>
      <circle cx="39.2" cy="12.6" r="6.4" fill="#000"/>
    </mask>
  </defs>

  <rect width="1200" height="630" fill="#15110e"/>
  <g transform="translate(520 -140) rotate(-16 400 400) scale(0.62)">${canchas.join('')}</g>
  <rect width="1200" height="630" fill="url(#velo)"/>

  <g transform="translate(64 56) scale(1.25)">
    <g fill="none" stroke="#f2f2f0" stroke-width="3.5" stroke-linecap="round" mask="url(#corte)">
      <circle cx="24" cy="24" r="19"/>
      <path d="M5.8 29.2 C12.5 31.4 15.5 22.6 21.2 23.6 C27.2 24.7 31 15.6 39.2 12.6"/>
    </g>
    <circle cx="39.2" cy="12.6" r="5" fill="#e2683a"/>
  </g>
  <text x="138" y="98" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="700" fill="#f2f2f0">Raket<tspan fill="#e2683a">Sense</tspan></text>

  <text font-family="Arial, Helvetica, sans-serif" font-size="74" font-weight="700" fill="#f2f2f0" letter-spacing="-1.5">
    <tspan x="64" y="296">Inteligencia</tspan>
    <tspan x="64" y="378">de negocio</tspan>
    <tspan x="64" y="460" fill="#e2683a">para tu club.</tspan>
  </text>

  <text x="64" y="566" font-family="Arial, Helvetica, sans-serif" font-size="27" font-weight="700" fill="#c9c9c4">Tenis · Pádel · raketsense.com</text>
</svg>`;

const destino = path.join(landing, 'public', 'og.png');
await sharp(Buffer.from(svg)).png({ compressionLevel: 9, palette: true, colours: 128 }).toFile(destino);
const meta = await sharp(destino).metadata();
console.log(destino, `${meta.width}x${meta.height}`, meta.format);
