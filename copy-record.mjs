// Copies the study record into the private eightfold repo without the renders:
// scripts, results, figures, sections, logs, and per job the manifest, run log, audit, recheck,
// events, brief, state, signed-off final.html and handback.
import { cpSync, mkdirSync, existsSync, readdirSync, statSync, rmSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
const HERE = dirname(fileURLToPath(import.meta.url));
const DEST = process.argv[2];
if (!DEST) { console.error('usage: node copy-record.mjs <dest dir>'); process.exit(2); }
const copy = (rel) => { const s = join(HERE, rel); if (!existsSync(s)) return; const d = join(DEST, rel); mkdirSync(dirname(d), { recursive: true }); cpSync(s, d, { recursive: true }); };
if (existsSync(DEST)) rmSync(DEST, { recursive: true });
mkdirSync(DEST, { recursive: true });
for (const f of readdirSync(HERE)) {
  if (/\.(mjs|json|md|log|html|pdf)$/.test(f) && f !== 'package-lock.json' && f !== 'notes-prev.json' && f !== 'notes-new.json') copy(f);
}
copy('sections'); copy('figures'); for (const f of readdirSync(join(HERE, 'jobs-nano-discarded'))) if (f.endsWith('.log')) copy(join('jobs-nano-discarded', f));
let jobs = 0, files = 0;
for (const rootName of ['jobs', 'jobs-nano-discarded']) for (const family of ['anthropic', 'openai']) for (const arm of ['on', 'off']) {
  const armDir = join(HERE, rootName, family, arm);
  if (!existsSync(armDir)) continue;
  for (const c of readdirSync(armDir)) {
    const p = join(rootName, family, arm, c); jobs++;
    for (const f of ['manifest.json', 'run.log', 'audit.json', 'recheck.json', '.desk/events.jsonl', '.desk/project.json']) if (existsSync(join(HERE, p, f))) { copy(join(p, f)); files++; }
    const jd = join(HERE, p, '.desk', 'jobs');
    if (existsSync(jd)) for (const id of readdirSync(jd)) for (const f of ['brief.md', 'state.json']) if (existsSync(join(jd, id, f))) { copy(join(p, '.desk', 'jobs', id, f)); files++; }
    const od = join(HERE, p, '.desk', 'out');
    if (existsSync(od)) for (const id of readdirSync(od)) for (const f of ['final.html', 'handback.md']) if (existsSync(join(od, id, f))) { copy(join(p, '.desk', 'out', id, f)); files++; }
  }
}
const size = (d) => readdirSync(d).reduce((s, f) => { const p = join(d, f); const st = statSync(p); return s + (st.isDirectory() ? size(p) : st.size); }, 0);
console.log(`${jobs} jobs, ${files} job files, ${(size(DEST) / 1048576).toFixed(1)} MB at ${relative(process.cwd(), DEST) || DEST}`);
