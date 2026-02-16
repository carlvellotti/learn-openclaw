import puppeteer from 'puppeteer-core';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const html = `<!DOCTYPE html>
<html><head><style>
* { margin: 0; padding: 0; }
body { width: 512px; height: 512px; overflow: hidden; }
svg { width: 512px; height: 512px; }
</style></head><body>
${fs.readFileSync(path.join(__dirname, 'public', 'favicon.svg'), 'utf8')}
</body></html>`;

const tmpHtml = path.join(__dirname, 'public', '_favicon-tmp.html');
fs.writeFileSync(tmpHtml, html);

const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
  args: ['--no-sandbox']
});

const page = await browser.newPage();

// Generate 512px PNG
await page.setViewport({ width: 512, height: 512 });
await page.goto(`file://${tmpHtml}`, { waitUntil: 'networkidle0' });
await page.screenshot({ path: path.join(__dirname, 'public', 'favicon.png'), type: 'png' });
console.log('Created favicon.png (512x512)');

// Generate 32px for ICO
await page.setViewport({ width: 32, height: 32 });
await page.goto(`file://${tmpHtml}`, { waitUntil: 'networkidle0' });
await page.screenshot({ path: path.join(__dirname, 'public', 'favicon-32.png'), type: 'png' });
console.log('Created favicon-32.png (32x32)');

// Generate 180px for apple-touch-icon
await page.setViewport({ width: 180, height: 180 });
await page.goto(`file://${tmpHtml}`, { waitUntil: 'networkidle0' });
await page.screenshot({ path: path.join(__dirname, 'public', 'apple-touch-icon.png'), type: 'png' });
console.log('Created apple-touch-icon.png (180x180)');

await browser.close();
fs.unlinkSync(tmpHtml);
console.log('Done! Note: favicon.ico needs to be created from favicon-32.png using an ICO converter or just use the PNG.');
