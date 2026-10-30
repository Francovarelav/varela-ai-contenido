// Uso: node marca/render-carrusel.mjs carruseles/<fecha>
// Lee <carpeta>/slides.json y escribe <carpeta>/01.png … NN.png (1080×1350).
import { chromium } from 'playwright';
import fs from 'node:fs'; import path from 'node:path'; import url from 'node:url';
const dir = path.resolve(process.argv[2]);
const raiz = path.dirname(url.fileURLToPath(import.meta.url));
const data = JSON.parse(fs.readFileSync(path.join(dir, 'slides.json'), 'utf8'));
const abs = p => url.pathToFileURL(path.resolve(dir, p)).href;
data.logo = url.pathToFileURL(path.join(raiz, 'varelta-logo-recorte.png')).href;
data.slides.forEach(s => { if (s.foto) s.foto = abs(s.foto); });
const html = fs.readFileSync(path.join(raiz, 'plantilla-carrusel.html'), 'utf8')
  .replace('<script>', `<script>window.SLIDES=${JSON.stringify(data)};</script><script>`);
const tmp = path.join(dir, '_render.html'); fs.writeFileSync(tmp, html);
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
await p.goto(url.pathToFileURL(tmp).href); await p.waitForLoadState('networkidle'); await p.evaluate(() => document.fonts.ready);
const secs = await p.$$('section');
for (let i = 0; i < secs.length; i++) await secs[i].screenshot({ path: path.join(dir, String(i + 1).padStart(2, '0') + '.png') });
await b.close(); fs.unlinkSync(tmp); console.log('ok', secs.length, 'láminas');
