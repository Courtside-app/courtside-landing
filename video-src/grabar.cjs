// Arma public/video/club-semilla.mp4 (+ portada .jpg) a partir de club-semilla.html.
// Recorre las animaciones cuadro a cuadro (no graba la pantalla), así sale nítido
// y siempre igual.
//
// uso:  node video-src/grabar.cjs [--playwright <carpeta>] [--ffmpeg <ffmpeg.exe>]
//                                 [--voz <audio>] [--musica <audio>] [--prueba]
//   --voz / --musica: se mezclan si se pasan (la música queda baja y se apaga al final).
//   --prueba: saca un cuadro cada 2 s en video-src/_prueba/ para revisar, sin armar el video.
// Necesita Playwright (alcanza el de courtside-admin) y ffmpeg.
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { pathToFileURL } = require('node:url');

const arg = (n, def) => { const i = process.argv.indexOf('--' + n); return i > 0 ? process.argv[i + 1] : def; };
const PRUEBA = process.argv.includes('--prueba');
const { chromium } = require(arg('playwright', 'playwright'));
const FFMPEG = arg('ffmpeg', 'ffmpeg');
const VOZ = arg('voz', '');
const MUSICA = arg('musica', '');

const DURACION = 34000; // ms; tiene que coincidir con la última escena del HTML
const FPS = 30;
const raiz = path.resolve(__dirname, '..');
const cuadros = path.join(__dirname, PRUEBA ? '_prueba' : '_cuadros');
const salida = path.join(raiz, 'public', 'video');

(async () => {
  fs.rmSync(cuadros, { recursive: true, force: true });
  fs.mkdirSync(cuadros, { recursive: true });
  fs.mkdirSync(salida, { recursive: true });

  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1, colorScheme: 'dark' });
  const p = await ctx.newPage();
  await p.goto(pathToFileURL(path.join(__dirname, 'club-semilla.html')).href, { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  await p.evaluate(() => document.getAnimations().forEach((a) => a.pause()));

  const irA = (t) => p.evaluate((ms) => document.getAnimations().forEach((a) => { a.currentTime = ms; }), t);
  const paso = PRUEBA ? 2000 : 1000 / FPS;
  let n = 0;
  for (let t = 0; t < DURACION; t += paso, n++) {
    await irA(t);
    await p.screenshot({ path: path.join(cuadros, `c${String(n).padStart(5, '0')}.jpg`), type: 'jpeg', quality: PRUEBA ? 80 : 95 });
    if (!PRUEBA && n % 150 === 0) console.log(`cuadro ${n} / ${Math.round(DURACION / paso)}`);
  }
  await irA(DURACION - 1);
  await p.screenshot({ path: path.join(PRUEBA ? cuadros : salida, PRUEBA ? 'portada.jpg' : 'club-semilla.jpg'), type: 'jpeg', quality: 88 });
  await b.close();
  if (PRUEBA) { console.log('prueba lista en', cuadros, `(${n} cuadros)`); return; }

  const seg = DURACION / 1000;
  const args = ['-y', '-framerate', String(FPS), '-i', path.join(cuadros, 'c%05d.jpg')];
  const filtros = [];
  let audio = null;
  if (VOZ) args.push('-i', VOZ);
  if (MUSICA) args.push('-i', MUSICA);
  if (VOZ && MUSICA) {
    filtros.push(`[2:a]volume=0.16,afade=t=in:d=1.5,afade=t=out:st=${seg - 2.5}:d=2.5[m]`, `[1:a][m]amix=inputs=2:duration=longest:normalize=0[a]`);
    audio = '[a]';
  } else if (MUSICA) {
    filtros.push(`[1:a]volume=0.8,afade=t=in:d=0.6,afade=t=out:st=${seg - 2.5}:d=2.5[a]`);
    audio = '[a]';
  } else if (VOZ) audio = '1:a';
  if (filtros.length) args.push('-filter_complex', filtros.join(';'));
  args.push('-map', '0:v');
  if (audio) args.push('-map', audio, '-c:a', 'aac', '-b:a', '160k');
  args.push('-c:v', 'libx264', '-preset', 'slow', '-crf', '21', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-t', String(seg), path.join(salida, 'club-semilla.mp4'));
  const r = spawnSync(FFMPEG, args, { stdio: ['ignore', 'ignore', 'pipe'] });
  if (r.status !== 0) { console.error(String(r.stderr).split('\n').slice(-8).join('\n')); process.exit(1); }
  fs.rmSync(cuadros, { recursive: true, force: true });
  const mb = (fs.statSync(path.join(salida, 'club-semilla.mp4')).size / 1048576).toFixed(1);
  console.log(`listo: public/video/club-semilla.mp4 (${seg} s, ${mb} MB${audio ? '' : ', sin audio'})`);
})().catch((e) => { console.error('ERROR', e.message.split('\n')[0]); process.exit(1); });
