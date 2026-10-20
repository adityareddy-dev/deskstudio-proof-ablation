// Three SVG figures from the job folders and recheck-summary.json. No library.
//   node figures.mjs  -> figures/fig1-audit.svg, fig2-rounds.svg, fig3-cost.svg
import { readFileSync, writeFileSync, existsSync, readdirSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, 'figures'); mkdirSync(OUT, { recursive: true });
const C = { on: '#2a78d6', off: '#eb6834', ink: '#1a1a19', ink2: '#5f5e58', grid: '#e4e3df', surface: '#ffffff' };
const FONT = 'font-family="Inter, Helvetica, Arial, sans-serif"';
const FAM = { anthropic: 'Anthropic (opus, sonnet, haiku)', openai: 'OpenAI (gpt-6-astra, gpt-6.1-sol, gpt-6.1-sol)' };

// ---- data
const jobs = [];
for (const family of ['anthropic', 'openai']) for (const arm of ['on', 'off']) {
  const armDir = join(HERE, 'jobs', family, arm);
  if (!existsSync(armDir)) continue;
  for (const caseId of readdirSync(armDir)) {
    const proj = join(armDir, caseId);
    const mf = join(proj, 'manifest.json');
    if (!existsSync(mf)) continue;
    const m = JSON.parse(readFileSync(mf, 'utf8'));
    if (!m.done) continue;
    const jobsDir = join(proj, '.desk', 'jobs');
    const jobId = readdirSync(jobsDir).sort().at(-1);
    const s = JSON.parse(readFileSync(join(jobsDir, jobId, 'state.json'), 'utf8'));
    const last = s.scores?.at(-1);
    jobs.push({ family, arm, case: caseId, rounds: s.round, cost: s.cost?.total ?? null, reached: !!(last && last.pass && !s.waitingOn && s.phase === 'done'), audit: m.audit && !m.audit.error ? m.audit.failures : null });
  }
}
const recheck = existsSync(join(HERE, 'recheck-summary.json')) ? JSON.parse(readFileSync(join(HERE, 'recheck-summary.json'), 'utf8')) : [];

// ---- helpers
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const text = (x, y, t, { size = 12, fill = C.ink, anchor = 'start', weight = 400, dy = 0 } = {}) => `<text x="${x}" y="${y + dy}" font-size="${size}" fill="${fill}" text-anchor="${anchor}" font-weight="${weight}" ${FONT}>${esc(t)}</text>`;
const svgOpen = (w, h) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><rect width="${w}" height="${h}" fill="${C.surface}"/>`;
const mean = a => a.length ? a.reduce((x, y) => x + y, 0) / a.length : 0;
const fmt = n => (Math.round(n * 100) / 100).toFixed(2);
// A deterministic jitter so dots with equal values do not stack.
const jitter = (i, n) => (n <= 1 ? 0 : ((i / (n - 1)) - 0.5) * 22);

// ---- Figure 1: audit failures per signed-off file
function fig1() {
  const W = 760, H = 380, left = 56, top = 44, bottom = 60, right = 20;
  const plotH = H - top - bottom, plotW = W - left - right;
  const groups = [];
  for (const family of ['anthropic', 'openai']) for (const arm of ['on', 'off']) groups.push({ family, arm, items: jobs.filter(j => j.family === family && j.arm === arm && j.audit != null) });
  const maxY = Math.max(4, ...jobs.map(j => j.audit || 0)) + 1;
  const y = v => top + plotH - (v / maxY) * plotH;
  const gx = i => left + plotW * (i + 0.5) / groups.length;
  let s = svgOpen(W, H);
  s += text(left, 22, 'Mechanical faults in the file the Creative Director signed off', { size: 14, weight: 600 });
  s += text(left, 38, 'One dot per job. Filled: reached the bar. Hollow: ended at the six-round cap. Bar: mean.', { size: 11, fill: C.ink2 });
  for (let v = 0; v <= maxY; v += maxY > 12 ? 4 : 2) {
    s += `<line x1="${left}" x2="${W - right}" y1="${y(v)}" y2="${y(v)}" stroke="${C.grid}" stroke-width="1"/>`;
    s += text(left - 8, y(v), String(v), { size: 11, fill: C.ink2, anchor: 'end', dy: 4 });
  }
  groups.forEach((g, i) => {
    const col = C[g.arm];
    const sorted = g.items.slice().sort((a, b) => a.audit - b.audit);
    // Dodge equal values sideways.
    const byVal = {};
    sorted.forEach(j => { (byVal[j.audit] ||= []).push(j); });
    for (const [v, arr] of Object.entries(byVal)) arr.forEach((j, k) => {
      const cx = gx(i) + jitter(k, arr.length), cy = y(Number(v));
      s += j.reached ? `<circle cx="${cx}" cy="${cy}" r="5" fill="${col}" stroke="${C.surface}" stroke-width="2"/>` : `<circle cx="${cx}" cy="${cy}" r="4.5" fill="${C.surface}" stroke="${col}" stroke-width="2"/>`;
    });
    const m = mean(g.items.map(j => j.audit));
    s += `<line x1="${gx(i) - 26}" x2="${gx(i) + 26}" y1="${y(m)}" y2="${y(m)}" stroke="${col}" stroke-width="2.5"/>`;
    s += text(gx(i) + 30, y(m), `mean ${m.toFixed(1)}`, { size: 11, fill: C.ink2, dy: 4 });
    s += text(gx(i), H - bottom + 18, `proof ${g.arm}`, { size: 12, anchor: 'middle', weight: 600, fill: col });
    s += text(gx(i), H - bottom + 34, `${g.items.length} jobs, ${g.items.filter(j => j.audit > 0).length} with faults`, { size: 11, anchor: 'middle', fill: C.ink2 });
  });
  s += text(gx(0.5), H - 8, FAM.anthropic, { size: 11, anchor: 'middle', fill: C.ink2 });
  s += text(gx(2.5), H - 8, FAM.openai, { size: 11, anchor: 'middle', fill: C.ink2 });
  s += text(14, top + plotH / 2, 'faults found by the hidden audit', { size: 11, fill: C.ink2, anchor: 'middle' }).replace('<text ', `<text transform="rotate(-90 14 ${top + plotH / 2})" `);
  return s + '</svg>';
}

// ---- Figure 2: faults per round while the director scores
function fig2() {
  const W = 760, H = 344, left = 48, top = 44, bottom = 66, gap = 40, right = 16, labelW = 64;
  const panelFull = (W - left - right - gap) / 2, panelW = panelFull - labelW, plotH = H - top - bottom;
  const maxR = 6;
  let s = svgOpen(W, H);
  s += text(left, 22, 'Mechanical faults present at each round, re-checked offline on the saved renders', { size: 14, weight: 600 });
  s += text(left, 38, 'Mean faults per job among jobs that reached the round. Under each round: jobs at that round, proof on / proof off.', { size: 11, fill: C.ink2 });
  const maxY = Math.max(4, ...recheck.flatMap(r => r.rounds.map(x => x.failures)));
  ['anthropic', 'openai'].forEach((family, p) => {
    const x0 = left + p * (panelFull + gap);
    const x = r => x0 + (r - 1) / (maxR - 1) * panelW;
    const y = v => top + plotH - (v / maxY) * plotH;
    for (let v = 0; v <= maxY; v += maxY > 12 ? 4 : 2) {
      s += `<line x1="${x0}" x2="${x0 + panelW}" y1="${y(v)}" y2="${y(v)}" stroke="${C.grid}"/>`;
      if (p === 0) s += text(x0 - 8, y(v), String(v), { size: 11, fill: C.ink2, anchor: 'end', dy: 4 });
    }
    for (let r = 1; r <= maxR; r++) s += text(x(r), H - bottom + 16, `round ${r}`, { size: 11, fill: C.ink2, anchor: 'middle' });
    s += text(x0 + panelW / 2, H - bottom + 48, FAM[family], { size: 11, fill: C.ink2, anchor: 'middle' });
    const nAt = {};
    for (const arm of ['on', 'off']) {
      const rows = recheck.filter(r => r.family === family && r.arm === arm);
      const pts = [];
      for (let r = 1; r <= maxR; r++) {
        const vals = rows.map(j => j.rounds.find(k => k.round === r)).filter(Boolean).map(k => k.failures);
        if (vals.length) pts.push({ r, m: mean(vals), n: vals.length });
      }
      if (!pts.length) continue;
      s += `<polyline fill="none" stroke="${C[arm]}" stroke-width="2" points="${pts.map(q => `${x(q.r)},${y(q.m)}`).join(' ')}"/>`;
      for (const q of pts) s += `<circle cx="${x(q.r)}" cy="${y(q.m)}" r="4" fill="${C[arm]}" stroke="${C.surface}" stroke-width="2"><title>${arm}, round ${q.r}: mean ${fmt(q.m)} over ${q.n} jobs</title></circle>`;
      const last = pts.at(-1);
      s += text(x(last.r) + 8, y(last.m), `proof ${arm}`, { size: 11, fill: C[arm], weight: 600, dy: 4 });
      for (const q of pts) (nAt[q.r] ||= {})[arm] = q.n;
    }
    for (let r = 1; r <= maxR; r++) if (nAt[r]) s += text(x(r), H - bottom + 31, `${nAt[r].on ?? '-'} / ${nAt[r].off ?? '-'}`, { size: 10, fill: C.ink2, anchor: 'middle' });
  });
  return s + '</svg>';
}

// ---- Figure 3: cost per job, paired by case
function fig3() {
  const cases = [...new Set(jobs.map(j => j.case))];
  const rowH = 17, top = 44, bottom = 40, left = 150, right = 20, W = 760, gap = 30;
  const panelW = (W - left - right - gap) / 2 - (left - 110);
  const H = top + bottom + cases.length * rowH;
  const maxX = Math.ceil(Math.max(...jobs.map(j => j.cost || 0)) * 2) / 2;
  let s = svgOpen(W, H);
  s += text(20, 22, 'Cost per job at list price, the same case with proof on and off', { size: 14, weight: 600 });
  s += text(20, 38, 'A line joins the two arms of one case. Filled: reached the bar. Hollow: ended at the cap.', { size: 11, fill: C.ink2 });
  ['anthropic', 'openai'].forEach((family, p) => {
    const x0 = (p === 0 ? 110 : 110 + panelW + gap + 60);
    const x = v => x0 + (v / maxX) * panelW;
    for (let v = 0; v <= maxX; v += 0.5) {
      s += `<line x1="${x(v)}" x2="${x(v)}" y1="${top}" y2="${H - bottom}" stroke="${C.grid}"/>`;
      s += text(x(v), H - bottom + 14, `$${v.toFixed(1)}`, { size: 10, fill: C.ink2, anchor: 'middle' });
    }
    s += text(x0 + panelW / 2, H - bottom + 30, FAM[family], { size: 11, fill: C.ink2, anchor: 'middle' });
    cases.forEach((c, i) => {
      const yy = top + i * rowH + rowH / 2;
      if (p === 0) s += text(x0 - 10, yy, c, { size: 10.5, fill: C.ink, anchor: 'end', dy: 4 });
      const on = jobs.find(j => j.family === family && j.arm === 'on' && j.case === c);
      const off = jobs.find(j => j.family === family && j.arm === 'off' && j.case === c);
      if (on && off && on.cost != null && off.cost != null) s += `<line x1="${x(on.cost)}" x2="${x(off.cost)}" y1="${yy}" y2="${yy}" stroke="${C.ink2}" stroke-width="1.5" opacity="0.6"/>`;
      for (const j of [on, off]) if (j && j.cost != null) s += j.reached ? `<circle cx="${x(j.cost)}" cy="${yy}" r="4.5" fill="${C[j.arm]}" stroke="${C.surface}" stroke-width="1.5"><title>${j.family} ${j.arm} ${c}: $${fmt(j.cost)}, ${j.rounds} rounds</title></circle>` : `<circle cx="${x(j.cost)}" cy="${yy}" r="4" fill="${C.surface}" stroke="${C[j.arm]}" stroke-width="2"><title>${j.family} ${j.arm} ${c}: $${fmt(j.cost)}, ${j.rounds} rounds, under the bar</title></circle>`;
    });
  });
  s += `<circle cx="${W - 150}" cy="22" r="4.5" fill="${C.on}"/>` + text(W - 142, 22, 'proof on', { size: 11, dy: 4 }) + `<circle cx="${W - 80}" cy="22" r="4.5" fill="${C.off}"/>` + text(W - 72, 22, 'proof off', { size: 11, dy: 4 });
  return s + '</svg>';
}

writeFileSync(join(OUT, 'fig1-audit.svg'), fig1());
writeFileSync(join(OUT, 'fig2-rounds.svg'), fig2());
writeFileSync(join(OUT, 'fig3-cost.svg'), fig3());
console.log(`figures from ${jobs.length} done jobs and ${recheck.length} rechecked jobs -> ${OUT}`);
