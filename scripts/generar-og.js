// Genera public/og-image.jpg (imagen que se ve al compartir el enlace en WhatsApp, redes, etc.)
// a partir de scripts/og-image.html. Requiere Playwright: npx playwright install chromium (solo una vez).
const path = require('path');
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.goto('file://' + path.join(__dirname, 'og-image.html'));
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(__dirname, '..', 'public', 'og-image.jpg'), type: 'jpeg', quality: 90 });
  await browser.close();
  console.log('Listo: public/og-image.jpg');
})();
