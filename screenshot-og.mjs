import puppeteer from 'puppeteer-core';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const htmlFile = path.join(__dirname, 'public', 'og-image-split.html');
const outputFile = path.join(__dirname, 'public', 'og-preview.png');

const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
  args: ['--no-sandbox']
});

const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630 });
await page.goto(`file://${htmlFile}`, { waitUntil: 'networkidle0', timeout: 20000 });

// Wait extra time for web fonts to load
await new Promise(r => setTimeout(r, 3000));
await page.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 1000));

await page.screenshot({ path: outputFile, type: 'png' });
console.log(`Screenshot saved to ${outputFile}`);
await browser.close();
