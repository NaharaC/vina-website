import puppeteer from 'puppeteer-core';
const dir='/private/tmp/claude-501/-Users-naharagutierrezhidalgo-Desktop-vina-website/329c6121-2d14-47b0-8cff-0e9e5bc2d51b/scratchpad';
const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new', args:['--autoplay-policy=no-user-gesture-required'] });
const errores = [];
for (const [w,h,etq] of [[834,1112,'tab'],[390,844,'mov']]) {
  const p = await b.newPage();
  p.on('pageerror', (e) => errores.push(`${etq}: ${String(e).slice(0,110)}`));
  await p.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
  await p.goto('http://localhost:4321/', { waitUntil: 'domcontentloaded', timeout: 90000 });
  await new Promise(r=>setTimeout(r,7000));
  await p.evaluate(() => { document.documentElement.style.scrollBehavior='auto'; window.scrollTo(0, window.scrollY + document.getElementById('testimonios-titulo').closest('section').getBoundingClientRect().top - 20); });
  await new Promise(r=>setTimeout(r,1500));
  await p.screenshot({ path: `${dir}/cinta-${etq}.png` });
  console.log(etq, '| centrado:', await p.$$eval('.diapositiva', (d) => d.find((x) => x.dataset.activo === 'true')?.querySelector('figcaption p')?.textContent),
    '| scroll horizontal:', await p.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1 ? 'SÍ' : 'no'));
  await p.close();
}
console.log('errores:', errores);
await b.close();
