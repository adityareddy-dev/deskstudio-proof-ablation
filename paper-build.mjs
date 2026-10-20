// Builds paper.html and paper.pdf from paper.md: numbers the [key] citations in order of first use,
// appends the reference list from citations-verified.json, strips the source comments, prints through Chrome.
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { marked } from 'marked';
const HERE = dirname(fileURLToPath(import.meta.url));
const { launch } = await import(pathToFileURL('C:/Users/adity/Desktop/Adi/deskstudio/proof/browser.mjs').href);

const md = readFileSync(join(HERE, 'paper.md'), 'utf8').split(String.fromCharCode(13)).join('');
const cites = JSON.parse(readFileSync(join(HERE, 'sections', 'citations-verified.json'), 'utf8'));
const clean = JSON.parse(readFileSync(join(HERE, 'sections', 'references-clean.json'), 'utf8'));
const byKey = Object.fromEntries(cites.map((c) => [c.key, { ...c, reference: clean[c.key] || c.reference }]));
const order = [];
const unknown = new Set();
let body = md.replace(/<!--[\s\S]*?-->\n?/g, '');
body = body.replace(/\[([a-z0-9]+(?:\s*,\s*[a-z0-9]+)*)\]/g, (m, inner) => {
  const keys = inner.split(/\s*,\s*/);
  if (!keys.every((k) => byKey[k])) { keys.filter((k) => !byKey[k] && /^[a-z]+\d{4}[a-z]+$/.test(k)).forEach((k) => unknown.add(k)); return m; }
  return '[' + keys.map((k) => { if (!order.includes(k)) order.push(k); return order.indexOf(k) + 1; }).join(', ') + ']';
});
if (unknown.size) console.warn('unknown citation keys:', [...unknown].join(', '));
const refs = order.map((k, i) => `${i + 1}. ${byKey[k].reference}${byKey[k].url ? ` ${byKey[k].url}` : ''}`).join('\n');
body += `\n\n## References\n\n${refs}\n`;
const unused = cites.map((c) => c.key).filter((k) => !order.includes(k));
if (unused.length) console.warn('verified works not cited:', unused.join(', '));

// Title block from the first lines: # Title, then lines starting with "Author:", "Contact:", "Date:".
const meta = {};
body = body.replace(/^# (.+)\n((?:\w+: .+\n)+)/, (m, title, lines) => { meta.title = title; for (const l of lines.trim().split('\n')) { const [k, ...v] = l.split(': '); meta[k.toLowerCase()] = v.join(': '); } return ''; });
const html = marked.parse(body, { gfm: true });
const css = `
  @page { size: Letter; margin: 0.9in 0.95in; }
  html { font-size: 11pt; }
  body { font-family: Georgia, 'Source Serif 4', 'Times New Roman', serif; color: #111; max-width: 6.6in; margin: 0 auto; padding: 0.4in 0.3in 1in; line-height: 1.42; }
  h1 { font-size: 20pt; line-height: 1.2; margin: 0 0 8pt; font-weight: 600; }
  .byline { font-size: 10.5pt; color: #333; margin: 0 0 18pt; }
  .byline span { display: block; }
  h2 { font-size: 13.5pt; margin: 22pt 0 6pt; font-weight: 600; page-break-after: avoid; }
  h3 { font-size: 11.5pt; margin: 16pt 0 4pt; font-weight: 600; page-break-after: avoid; }
  p { margin: 0 0 8pt; text-align: left; hyphens: auto; }
  .abstract { font-size: 10.5pt; margin: 0 0.25in 14pt; }
  .abstract p:first-child::before { content: 'Abstract. '; font-weight: 600; }
  .summary { font-size: 10pt; color: #333; margin: 0 0.25in 18pt; }
  .summary p::before { content: 'In short. '; font-weight: 600; }
  table { border-collapse: collapse; font-size: 8.6pt; margin: 8pt 0 12pt; width: 100%; page-break-inside: avoid; }
  th, td { border-top: 1px solid #bbb; border-bottom: 1px solid #bbb; padding: 3px 5px; text-align: left; vertical-align: top; }
  th { background: #f3f3f3; font-weight: 600; }
  td:not(:first-child), th:not(:first-child) { text-align: right; white-space: nowrap; }
  td:nth-child(2), th:nth-child(2) { text-align: left; }
  img { max-width: 100%; display: block; margin: 10pt auto 4pt; page-break-inside: avoid; }
  em.caption, p.caption { font-size: 9.5pt; color: #333; margin: 0 0 14pt; }
  code { font-family: Consolas, Menlo, monospace; font-size: 9.5pt; background: #f4f4f4; padding: 0 2px; }
  ol { padding-left: 1.4em; font-size: 9.6pt; }
  ol li { margin-bottom: 4pt; }
  a { color: inherit; text-decoration: none; }
  blockquote { margin: 0 0 8pt 1em; color: #333; }
  hr { border: 0; border-top: 1px solid #bbb; margin: 16pt 0; }
`;
const byline = `<p class="byline"><span>${meta.author || ''}</span><span>${meta.affiliation || ''}</span><span>${meta.contact || ''}</span><span>${meta.date || ''}</span></p>`;
const page = (base) => `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${meta.title || 'Paper'}</title>${base ? `<base href="${base}">` : ''}<style>${css}</style></head><body><h1>${meta.title || ''}</h1>${byline}${html}</body></html>`;
writeFileSync(join(HERE, 'paper.html'), page(''));
const browser = await launch();
const pg = await browser.newPage();
await pg.setContent(page(pathToFileURL(HERE + '/').href), { waitUntil: 'load' });
await pg.pdf({ path: join(HERE, 'paper.pdf'), format: 'Letter', printBackground: true, margin: { top: '0.9in', bottom: '0.9in', left: '0.95in', right: '0.95in' }, displayHeaderFooter: true, headerTemplate: '<div></div>', footerTemplate: '<div style="font-size:8pt;color:#555;width:100%;text-align:center;font-family:Georgia,serif"><span class="pageNumber"></span></div>' });
await browser.close();
console.log(`paper.html and paper.pdf written; ${order.length} references cited`);
