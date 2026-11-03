// Carrusel estilo Varelta (aprobado 3-nov-2026).
// Uso: node marca/render-varelta.cjs carruseles/<carpeta>
// Lee <carpeta>/carrusel.html (secciones <section class="s" id="s1".."sN">) y escribe
// <carpeta>/01.png … NN.png (1080×1350) y <carpeta>/hoja.jpg (hoja de contacto).
// Revisa solo: fuentes, imágenes, márgenes, encimados, titulares de >2 renglones y texto desbordado.
// Sale con código 1 si hay ERRORES: corrígelos y vuelve a correrlo antes de publicar.
const { chromium } = require('playwright');
const fs = require('node:fs'), path = require('node:path'), url = require('node:url');

(async () => {
  const dir = path.resolve(process.argv[2] || '.');
  const html = path.join(dir, 'carrusel.html');
  if (!fs.existsSync(html)) { console.error('No existe ' + html); process.exit(2); }
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
  await p.goto(url.pathToFileURL(html).href, { waitUntil: 'load' });
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(500);

  const rep = await p.evaluate(async () => {
    const E = [], W = [];
    // Fuentes
    if (!document.fonts.check('700 60px "Inter Tight"')) E.push('La fuente Inter Tight no cargó (revisa la ruta a ../../marca/varelta.css).');
    if (!document.fonts.check('500 20px "JetBrains Mono"')) E.push('La fuente JetBrains Mono no cargó.');
    // Imágenes <img>
    document.querySelectorAll('img').forEach(i => { if (!i.complete || !i.naturalWidth) E.push('Imagen rota: ' + i.getAttribute('src')); });
    // Fondos con url()
    const bgs = new Set();
    document.querySelectorAll('.foto,[style*="url("]').forEach(el => {
      const m = getComputedStyle(el).backgroundImage.match(/url\("?([^")]+)"?\)/); if (m && !m[1].startsWith('data:')) bgs.add(m[1]);
    });
    for (const u of bgs) {
      const ok = await new Promise(r => { const im = new Image(); im.onload = () => r(im.naturalWidth > 0); im.onerror = () => r(false); im.src = u; });
      if (!ok) E.push('Foto de fondo rota: ' + u);
    }
    const SEL = 'h1,h2,.card,.nota,.ref,.pill,.bl,.cc,.ejemplo,.fila,.msg,.eyebrow>div,.marca>img,.sigue>div,.medida,.cursor b,.libre';
    const secs = [...document.querySelectorAll('section.s')];
    secs.forEach((s, k) => {
      const n = 'Lámina ' + String(k + 1).padStart(2, '0');
      const S = s.getBoundingClientRect();
      const items = [...s.querySelectorAll(SEL)].filter(el => el.offsetParent !== null || getComputedStyle(el).position === 'fixed');
      const name = el => (el.className && typeof el.className === 'string' ? '.' + el.className.split(' ')[0] : el.tagName.toLowerCase()) + ' «' + (el.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 28) + '»';
      const R = el => { const r = el.getBoundingClientRect(); return { x: r.left - S.left, y: r.top - S.top, w: r.width, h: r.height }; };
      // Márgenes: 40 px mínimo al borde
      items.forEach(el => {
        const r = R(el);
        if (r.x < 40 || r.y < 40 || r.x + r.w > S.width - 40 || r.y + r.h > S.height - 40)
          E.push(`${n}: ${name(el)} se sale del margen de 40 px (x ${Math.round(r.x)}–${Math.round(r.x + r.w)}, y ${Math.round(r.y)}–${Math.round(r.y + r.h)}).`);
      });
      // Encimados entre piezas que no se contienen
      for (let i = 0; i < items.length; i++) for (let j = i + 1; j < items.length; j++) {
        const a = items[i], c = items[j];
        if (a.contains(c) || c.contains(a)) continue;
        const A = R(a), C = R(c);
        const ix = Math.max(0, Math.min(A.x + A.w, C.x + C.w) - Math.max(A.x, C.x));
        const iy = Math.max(0, Math.min(A.y + A.h, C.y + C.h) - Math.max(A.y, C.y));
        const area = ix * iy, menor = Math.min(A.w * A.h, C.w * C.h);
        if (menor && area / menor > 0.06) E.push(`${n}: se enciman ${name(a)} y ${name(c)} (${Math.round(100 * area / menor)} %).`);
      }
      // Titulares: máximo 2 renglones
      s.querySelectorAll('h1,h2').forEach(h => {
        const lh = parseFloat(getComputedStyle(h).lineHeight) || parseFloat(getComputedStyle(h).fontSize);
        const lineas = Math.round(h.getBoundingClientRect().height / lh);
        if (lineas > 2) E.push(`${n}: el titular ocupa ${lineas} renglones (máximo 2). Acórtalo.`);
      });
      // Texto desbordado dentro de su caja
      s.querySelectorAll('.card,.nota,.bl,.cc,.pill,.ejemplo,.msg').forEach(el => {
        if (el.scrollWidth > el.clientWidth + 2 || el.scrollHeight > el.clientHeight + 2) E.push(`${n}: el texto se desborda en ${name(el)}.`);
      });
      // Texto demasiado chico
      s.querySelectorAll('*').forEach(el => {
        if (!el.childNodes.length || ![...el.childNodes].some(t => t.nodeType === 3 && t.textContent.trim())) return;
        const fs = parseFloat(getComputedStyle(el).fontSize);
        if (fs < 13) W.push(`${n}: texto de ${fs}px (mínimo 13): «${el.textContent.trim().slice(0, 30)}»`);
      });
      if ((s.innerText || '').includes('�')) E.push(`${n}: hay caracteres rotos (�).`);
    });
    return { E, W, n: secs.length };
  });

  const secs = await p.$$('section.s');
  for (let i = 0; i < secs.length; i++) await secs[i].screenshot({ path: path.join(dir, String(i + 1).padStart(2, '0') + '.png') });

  // Hoja de contacto (4 columnas, 1/3 de tamaño)
  const imgs = secs.map((_, i) => 'data:image/png;base64,' + fs.readFileSync(path.join(dir, String(i + 1).padStart(2, '0') + '.png')).toString('base64'));
  const cols = Math.min(4, imgs.length), filas = Math.ceil(imgs.length / cols);
  const hp = await b.newPage({ viewport: { width: cols * 360 + (cols + 1) * 10, height: filas * 450 + (filas + 1) * 10 } });
  await hp.setContent(`<body style="margin:0;background:#222;display:grid;grid-template-columns:repeat(${cols},360px);gap:10px;padding:10px">${imgs.map(u => `<img src="${u}" style="width:360px;height:450px">`).join('')}</body>`);
  await hp.waitForTimeout(400);
  await hp.screenshot({ path: path.join(dir, 'hoja.jpg'), type: 'jpeg', quality: 82 });
  await b.close();

  console.log(`${rep.n} láminas → ${dir}`);
  rep.W.forEach(w => console.log('AVISO  ' + w));
  rep.E.forEach(e => console.log('ERROR  ' + e));
  console.log(rep.E.length ? `\n${rep.E.length} errores: corrígelos y vuelve a renderizar.` : '\nRevisión automática: sin errores. Ahora mira hoja.jpg.');
  process.exit(rep.E.length ? 1 : 0);
})();
