import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
const { launch } = await import(pathToFileURL('C:/Users/adity/Desktop/Adi/deskstudio/proof/browser.mjs').href);
const dir = 'C:/Users/adity/Desktop/Adi/deskstudio-research/proof-ablation-2026-10-20/figures';
const browser = await launch();
const page = await browser.newPage({ deviceScaleFactor: 2 });
for (const f of readdirSync(dir).filter(f => f.endsWith('.svg'))) {
  const svg = readFileSync(join(dir, f), 'utf8');
  const w = Number(/width="(\d+)"/.exec(svg)[1]), h = Number(/height="(\d+)"/.exec(svg)[1]);
  await page.setViewportSize({ width: w, height: h });
  await page.setContent(`<!doctype html><html><body style="margin:0">${svg}</body></html>`);
  await page.screenshot({ path: join(dir, f.replace(/\.svg$/, '.png')), clip: { x: 0, y: 0, width: w, height: h } });
  console.log('rendered', f);
}
await browser.close();
