// Merges the two-coder note coding (main pass plus the tail from the last three jobs) into coding.json
// and writes results-coding.md: agreement, mechanical share by arm and round, and paired per-job counts.
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const HERE = dirname(fileURLToPath(import.meta.url));
const rd = (f) => JSON.parse(readFileSync(join(HERE, f), 'utf8'));
const notes = rd('notes.json');
const parts = ['coding-705.json', 'coding-tail.json'].map(rd);
const A = {}, B = {}, final = {};
for (const p of parts) { Object.assign(A, p.A); Object.assign(B, p.B); Object.assign(final, p.final); }
const kind = (c) => (c || '').startsWith('mech') ? 'mechanical' : (c || '').startsWith('taste') ? 'taste' : 'other';
const missing = notes.filter((n) => !final[n.id]);
if (missing.length) console.warn(`${missing.length} notes without a code`, missing.slice(0, 5).map((n) => n.id));

// Cohen's kappa over the notes both coders coded.
function kappa(getA, getB) {
  const ids = notes.map((n) => n.id).filter((id) => A[id] && B[id]);
  const cats = new Set(); const pa = {}, pb = {}; let agree = 0;
  for (const id of ids) { const a = getA(id), b = getB(id); cats.add(a); cats.add(b); pa[a] = (pa[a] || 0) + 1; pb[b] = (pb[b] || 0) + 1; if (a === b) agree++; }
  const n = ids.length; const po = agree / n; let pe = 0; for (const c of cats) pe += ((pa[c] || 0) / n) * ((pb[c] || 0) / n);
  return { n, agree, po, kappa: (po - pe) / (1 - pe) };
}
const kCat = kappa((id) => A[id].category, (id) => B[id].category);
const kKind = kappa((id) => kind(A[id].category), (id) => kind(B[id].category));

// Shares by family, arm, round.
const sum = (a) => a.reduce((s, x) => s + x, 0);
const mean = (a) => (a.length ? sum(a) / a.length : null);
const pct = (k, n) => (n ? `${((100 * k) / n).toFixed(0)}%` : '-');
function share(filter) {
  const ns = notes.filter(filter); const m = ns.filter((n) => kind(final[n.id]) === 'mechanical').length;
  const t = ns.filter((n) => kind(final[n.id]) === 'taste').length; const o = ns.length - m - t;
  return { n: ns.length, m, t, o };
}
const catCount = (filter) => { const c = {}; for (const n of notes.filter(filter)) c[final[n.id]] = (c[final[n.id]] || 0) + 1; return c; };
let md = `# Creative Director note coding\n\nTwo independent readers coded all ${notes.length} notes; a third settled the ${parts.reduce((s, p) => s + p.disagreements, 0)} category disagreements. Codes per note are in coding.json (A, B, final).\n\n`;
md += `## Agreement between the two readers\n\n| Level | Notes | Agreed | Observed agreement | Cohen's kappa |\n|---|---|---|---|---|\n`;
md += `| Fifteen categories | ${kCat.n} | ${kCat.agree} | ${pct(kCat.agree, kCat.n)} | ${kCat.kappa.toFixed(2)} |\n| Mechanical, taste or other | ${kKind.n} | ${kKind.agree} | ${pct(kKind.agree, kKind.n)} | ${kKind.kappa.toFixed(2)} |\n\n`;
md += `## Final codes, all notes\n\n| Category | On | Off | All |\n|---|---|---|---|\n`;
const allCats = [...new Set(notes.map((n) => final[n.id]))].sort();
const cOn = catCount((n) => n.arm === 'on'), cOff = catCount((n) => n.arm === 'off');
for (const c of allCats) md += `| ${c} | ${cOn[c] || 0} | ${cOff[c] || 0} | ${(cOn[c] || 0) + (cOff[c] || 0)} |\n`;
md += `\n## Mechanical share of Creative Director notes by round\n\nPooled across families. Mechanical means a final code in a mech- category.\n\n| Round | On: notes | On: mechanical | On: share | Off: notes | Off: mechanical | Off: share |\n|---|---|---|---|---|---|---|\n`;
const rounds = [1, 2, 3, 4, 5, 6];
for (const r of [...rounds, 'all']) {
  const f = (arm) => (n) => n.arm === arm && (r === 'all' || n.round === r);
  const on = share(f('on')), off = share(f('off'));
  md += `| ${r} | ${on.n} | ${on.m} | ${pct(on.m, on.n)} | ${off.n} | ${off.m} | ${pct(off.m, off.n)} |\n`;
}
md += `\n## By family and arm\n\n| Family | Arm | Notes | Mechanical | Taste | Other | Mechanical share |\n|---|---|---|---|---|---|---|\n`;
for (const fam of ['anthropic', 'openai', 'pooled']) for (const arm of ['on', 'off']) {
  const s = share((n) => n.arm === arm && (fam === 'pooled' || n.family === fam));
  md += `| ${fam} | ${arm} | ${s.n} | ${s.m} | ${s.t} | ${s.o} | ${pct(s.m, s.n)} |\n`;
}
md += `\n## Mechanical categories by arm\n\n| Category | Anthropic on | Anthropic off | OpenAI on | OpenAI off |\n|---|---|---|---|---|\n`;
for (const c of allCats.filter((c) => c.startsWith('mech'))) {
  const g = (fam, arm) => catCount((n) => n.family === fam && n.arm === arm)[c] || 0;
  md += `| ${c} | ${g('anthropic', 'on')} | ${g('anthropic', 'off')} | ${g('openai', 'on')} | ${g('openai', 'off')} |\n`;
}
// Per job counts, paired by case within family.
const jobs = {};
for (const n of notes) { const k = `${n.family}/${n.arm}/${n.case}`; jobs[k] ||= { family: n.family, arm: n.arm, case: n.case, m: 0, t: 0, n: 0 }; jobs[k].n++; if (kind(final[n.id]) === 'mechanical') jobs[k].m++; else if (kind(final[n.id]) === 'taste') jobs[k].t++; }
md += `\n## Per job, paired by case\n\nMean notes per job. A job with no sign-off has zero notes.\n\n| Family | Measure | Mean on | Mean off | Mean diff | Pairs with on < off | Pairs with on > off |\n|---|---|---|---|---|---|---|\n`;
const cases = [...new Set(notes.map((n) => n.case))];
for (const fam of ['anthropic', 'openai', 'pooled']) for (const [label, key] of [['Mechanical CD notes', 'm'], ['Taste CD notes', 't'], ['All CD notes', 'n']]) {
  const on = [], off = [];
  for (const f of fam === 'pooled' ? ['anthropic', 'openai'] : [fam]) for (const c of cases) { on.push((jobs[`${f}/on/${c}`] || {})[key] || 0); off.push((jobs[`${f}/off/${c}`] || {})[key] || 0); }
  const d = on.map((x, i) => x - off[i]);
  md += `| ${fam} | ${label} | ${mean(on).toFixed(2)} | ${mean(off).toFixed(2)} | ${(mean(on) - mean(off)).toFixed(2)} | ${d.filter((x) => x < 0).length}/${d.length} | ${d.filter((x) => x > 0).length}/${d.length} |\n`;
}
const other = notes.filter((n) => kind(final[n.id]) === 'other');
md += `\n## Notes coded other\n\n${other.map((n) => `- ${n.id}: ${n.text.slice(0, 200)}`).join('\n')}\n`;
writeFileSync(join(HERE, 'coding.json'), JSON.stringify({ A, B, final, kappa: { category: kCat, kind: kKind } }, null, 1));
writeFileSync(join(HERE, 'results-coding.md'), md);
console.log(`coded ${Object.keys(final).length} of ${notes.length} notes; kappa category ${kCat.kappa.toFixed(2)}, kind ${kKind.kappa.toFixed(2)}`);
