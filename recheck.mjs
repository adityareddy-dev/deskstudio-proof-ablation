// Re-runs the proof checks offline on every saved round of every job, from the DOM dump and the two renders the
// runner keeps under renders/round-N. Nothing is re-rendered and no model is called. For the on arm this reproduces
// what proof reported; for the off arm it tells how many mechanical faults each round carried while the director scored it.
//   node recheck.mjs  -> jobs/<family>/<arm>/<case>/recheck.json and recheck-summary.json here
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const DESK = 'C:/Users/adity/Desktop/Adi/deskstudio';
const { runChecks } = await import(pathToFileURL(join(DESK, 'proof', 'check.mjs')).href);
const { SIZES } = await import(pathToFileURL(join(DESK, 'proof', 'sizes.mjs')).href);
const { readBrand } = await import(pathToFileURL(join(DESK, 'proof', 'brand.mjs')).href);
const cases = Object.fromEntries(JSON.parse(readFileSync(join(HERE, 'cases.json'), 'utf8')).map(c => [c.id, c]));

const summary = [];
for (const family of ['anthropic', 'openai']) for (const arm of ['on', 'off']) {
  const armDir = join(HERE, 'jobs', family, arm);
  if (!existsSync(armDir)) continue;
  for (const caseId of readdirSync(armDir)) {
    const proj = join(armDir, caseId);
    const jobsDir = join(proj, '.desk', 'jobs');
    if (!existsSync(jobsDir)) continue;
    const jobId = readdirSync(jobsDir).sort().at(-1);
    const rendersDir = join(jobsDir, jobId, 'renders');
    if (!existsSync(rendersDir)) continue;
    const brand = readBrand(join(proj, '.desk', 'DESIGN.md'));
    const mustAppear = cases[caseId]?.mustAppear || [];
    const rounds = readdirSync(rendersDir).filter(d => /^round-\d+$/.test(d)).sort((a, b) => Number(a.slice(6)) - Number(b.slice(6)));
    const out = { family, arm, case: caseId, jobId, rounds: [] };
    for (const r of rounds) {
      const dir = join(rendersDir, r);
      const entry = { round: Number(r.slice(6)), sizes: [], failures: 0, byCheck: {} };
      for (const f of readdirSync(dir).filter(f => f.endsWith('.dom.json'))) {
        const sizeName = f.replace(/\.dom\.json$/, '');
        const size = { name: sizeName, ...SIZES[sizeName] };
        if (!SIZES[sizeName]) continue;
        const dom = JSON.parse(readFileSync(join(dir, f), 'utf8'));
        const renderPng = join(dir, `${sizeName}.png`), backgroundPng = join(dir, `${sizeName}.background.png`);
        if (!existsSync(renderPng) || !existsSync(backgroundPng)) continue;
        let failures;
        try { failures = runChecks({ dom, size, brand, renderPng, backgroundPng, mustAppear }); } catch (e) { failures = [{ check: 'error', text: '', reason: e.message }]; }
        entry.sizes.push({ size: sizeName, failures });
        entry.failures += failures.length;
        for (const x of failures) entry.byCheck[x.check] = (entry.byCheck[x.check] || 0) + 1;
      }
      out.rounds.push(entry);
    }
    writeFileSync(join(proj, 'recheck.json'), JSON.stringify(out, null, 1));
    summary.push({ family, arm, case: caseId, rounds: out.rounds.map(x => ({ round: x.round, failures: x.failures, byCheck: x.byCheck })) });
  }
}
writeFileSync(join(HERE, 'recheck-summary.json'), JSON.stringify(summary, null, 1));
for (const s of summary) process.stdout.write(`${s.family}/${s.arm}/${s.case}: ${s.rounds.map(r => `r${r.round}=${r.failures}${r.failures ? '(' + Object.entries(r.byCheck).map(([k, v]) => `${k} ${v}`).join(', ') + ')' : ''}`).join('  ')}\n`);
