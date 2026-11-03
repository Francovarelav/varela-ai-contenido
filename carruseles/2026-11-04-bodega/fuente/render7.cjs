const { chromium } = require('/Users/franc/motion-inventario/node_modules/playwright');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport:{width:1080,height:1350} });
  await p.goto('file://' + __dirname + '/carrusel.html', { waitUntil:'load' });
  await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(800);
  for (let i=1;i<=7;i++){ await p.locator('#s'+i).screenshot({ path: `out/0${i}.png` }); }
  await b.close();
})();
