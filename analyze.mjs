// Analysis for the proof ablation (see README.md in this folder for the design, measures and hypotheses).
//   node analyze.mjs [--root DIR] [--out DIR]
// Reads jobs/<family>/<arm>/<case>/ (manifest.json, audit.json, .desk/jobs/<jobId>/state.json, run.log),
// writes results.json and results.md next to this file (or into --out). Node 20+, no dependencies.
// Jobs whose manifest is missing or not done are skipped and listed at the top of results.md.
// Differences are always on minus off. Tests are paired within family by case, and pooled.
import { readFileSync, writeFileSync, readdirSync, existsSync, statSync, mkdirSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const argv = process.argv.slice(2);
const flag = (k) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : null; };
const ROOT = resolve(flag('--root') || HERE);
const OUT = resolve(flag('--out') || ROOT);

const FAMILIES = ['anthropic', 'openai'];
const ARMS = ['on', 'off'];
const SCOPES = [...FAMILIES, 'pooled'];
const AXES = ['hierarchy', 'typography', 'spacing', 'colour', 'composition', 'originality', 'brand', 'copy'];
const FAMILY_LABEL = { anthropic: 'Anthropic', openai: 'OpenAI', pooled: 'Pooled' };
// The coding rule for the Creative Director's notes, exactly as set in the analysis plan.
const MECH = /overflow|cut off|clipped|contrast|legib|unreadable|missing|not present|safe zone|edge|bleed|off the palette|off-palette|hex|font size|type scale|too small|smaller than/i;
// Sensitivity coding, reported beside the rule above: the same rule without "edge", which also matches layout talk such as "the right edge" or "left edge at 72px".
const MECH_NO_EDGE = new RegExp(MECH.source.replace('|edge|', '|'), 'i');

// ---------- small helpers ----------
const readText = (p) => { try { return readFileSync(p, 'utf8'); } catch { return null; } };
const readJson = (p) => { const t = readText(p); if (t == null) return null; try { return JSON.parse(t.replace(/^﻿/, '')); } catch { return null; } };
const isDir = (p) => { try { return statSync(p).isDirectory(); } catch { return false; } };
const list = (p) => { try { return readdirSync(p); } catch { return []; } };
const num = (x) => (typeof x === 'number' && Number.isFinite(x) ? x : null);
const sum = (a) => a.reduce((s, x) => s + x, 0);
const mean = (a) => (a.length ? sum(a) / a.length : null);
const median = (a) => { if (!a.length) return null; const s = [...a].sort((x, y) => x - y); const m = s.length >> 1; return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };
const sd = (a) => { if (a.length < 2) return null; const m = mean(a); return Math.sqrt(sum(a.map((x) => (x - m) ** 2)) / (a.length - 1)); };
const inc = (o, k, n = 1) => { o[k] = (o[k] || 0) + n; };

function chicagoStamp(date = new Date()) {
  try {
    const parts = Object.fromEntries(new Intl.DateTimeFormat('en-US', { timeZone: 'America/Chicago', hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'longOffset' }).formatToParts(date).map((p) => [p.type, p.value]));
    const off = (parts.timeZoneName || '').replace('GMT', '') || 'Z';
    return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}${off === '' ? 'Z' : off}`;
  } catch { return date.toISOString(); }
}

// ---------- statistics ----------
function rankAverage(values) {
  const idx = values.map((v, i) => [Math.round(v * 1e9), i]).sort((a, b) => a[0] - b[0]);
  const ranks = new Array(values.length);
  let i = 0;
  while (i < idx.length) {
    let j = i;
    while (j + 1 < idx.length && idx[j + 1][0] === idx[i][0]) j++;
    const r = (i + j) / 2 + 1;
    for (let k = i; k <= j; k++) ranks[idx[k][1]] = r;
    i = j + 1;
  }
  return ranks;
}

// Wilcoxon signed-rank on paired differences (zeros dropped, ties get average ranks).
// Exact two-sided p from the permutation distribution of the observed ranks (so ties are handled exactly) for n up to 30.
function wilcoxon(diffs) {
  const d = diffs.filter((x) => Math.abs(x) > 1e-9);
  const n = d.length;
  const base = { nPairs: diffs.length, n, wPlus: 0, wMinus: 0, T: 0, p: 1, pOnGreater: 1, pOnLess: 1, rankBiserial: null, method: 'exact' };
  if (n === 0) return base;
  const abs = d.map(Math.abs);
  const ranks = rankAverage(abs);
  const wPlus = sum(ranks.filter((_, i) => d[i] > 0));
  const wMinus = sum(ranks.filter((_, i) => d[i] < 0));
  const out = { ...base, wPlus, wMinus, T: Math.min(wPlus, wMinus), rankBiserial: (wPlus - wMinus) / (wPlus + wMinus) };
  if (n <= 30) {
    const r2 = ranks.map((r) => Math.round(r * 2)); // doubled ranks are integers
    const total = sum(r2);
    const counts = new Float64Array(total + 1);
    counts[0] = 1;
    for (const r of r2) for (let s = total; s >= r; s--) counts[s] += counts[s - r];
    const obs = sum(r2.filter((_, i) => d[i] > 0));
    let two = 0, ge = 0, le = 0;
    for (let s = 0; s <= total; s++) {
      const c = counts[s];
      if (Math.abs(2 * s - total) >= Math.abs(2 * obs - total)) two += c;
      if (s >= obs) ge += c;
      if (s <= obs) le += c;
    }
    const N = 2 ** n;
    out.p = Math.min(1, two / N); out.pOnGreater = Math.min(1, ge / N); out.pOnLess = Math.min(1, le / N);
  } else {
    // Beyond the exact range: normal approximation with continuity and tie correction. Not reached with 30 pooled pairs.
    const ties = {}; abs.forEach((v) => inc(ties, Math.round(v * 1e9)));
    const tieTerm = sum(Object.values(ties).map((t) => t ** 3 - t)) / 48;
    const mu = (n * (n + 1)) / 4, sigma = Math.sqrt((n * (n + 1) * (2 * n + 1)) / 24 - tieTerm);
    const z = (Math.abs(wPlus - mu) - 0.5) / sigma;
    out.p = Math.min(1, 2 * (1 - normCdf(z))); out.method = 'normal';
  }
  return out;
}
function normCdf(z) { // Abramowitz-Stegun 7.1.26
  const t = 1 / (1 + 0.2316419 * Math.abs(z)); const dd = 0.3989423 * Math.exp((-z * z) / 2);
  const p = dd * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return z > 0 ? 1 - p : p;
}
function binomCdfHalf(k, n) { // P(X <= k), X ~ Bin(n, 1/2)
  let c = 1, acc = 0;
  for (let i = 0; i <= k; i++) { acc += c; c = (c * (n - i)) / (i + 1); }
  return acc / 2 ** n;
}
function mcnemar(pairs) { // pairs of [onReached, offReached]
  let both = 0, onOnly = 0, offOnly = 0, neither = 0;
  for (const [a, b] of pairs) { if (a && b) both++; else if (a) onOnly++; else if (b) offOnly++; else neither++; }
  const n = onOnly + offOnly;
  const p = n === 0 ? 1 : Math.min(1, 2 * binomCdfHalf(Math.min(onOnly, offOnly), n));
  return { nPairs: pairs.length, both, onOnly, offOnly, neither, discordant: n, reachedOn: both + onOnly, reachedOff: both + offOnly, p };
}
function rngSeeded(seed) { let a = seed >>> 0; return () => { a = (a + 0x6d2b79f5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
function bootstrapCI(d, B = 10000) { // percentile interval of the mean paired difference, seeded so reruns match
  if (d.length < 2) return null;
  const r = rngSeeded(20261020); const means = new Array(B);
  for (let b = 0; b < B; b++) { let s = 0; for (let i = 0; i < d.length; i++) s += d[(r() * d.length) | 0]; means[b] = s / d.length; }
  means.sort((x, y) => x - y);
  return [means[Math.floor(0.025 * B)], means[Math.min(B - 1, Math.floor(0.975 * B))]];
}
function wilson(k, n) {
  if (!n) return null; const z = 1.96, p = k / n, den = 1 + (z * z) / n;
  const c = (p + (z * z) / (2 * n)) / den, h = (z * Math.sqrt((p * (1 - p)) / n + (z * z) / (4 * n * n))) / den;
  return [Math.max(0, c - h), Math.min(1, c + h)];
}
function pairedStats(pairs) { // pairs of [on, off] numbers
  const d = pairs.map(([a, b]) => a - b);
  const s = sd(d);
  return {
    nPairs: pairs.length, meanOn: mean(pairs.map((p) => p[0])), meanOff: mean(pairs.map((p) => p[1])),
    meanDiff: mean(d), medianDiff: median(d), sdDiff: s, dz: s ? mean(d) / s : null, ci95: bootstrapCI(d), wilcoxon: wilcoxon(d),
  };
}

// ---------- reading one job ----------
const cases = readJson(join(ROOT, 'cases.json')) || [];
const caseBrand = new Map(cases.map((c) => [c.id, c.brand]));

function parseLog(text) {
  const out = new Map();
  if (!text) return out;
  for (const line of text.split(/\r?\n/)) {
    const m = /proof round (\d+): (.*)$/.exec(line);
    if (!m) continue;
    const round = Number(m[1]), rest = m[2].trim();
    if (/^pass\b/.test(rest)) out.set(round, { pass: true, checks: [] });
    else if (/^skipped/.test(rest)) out.set(round, { skipped: true, checks: [] });
    else { const mm = /^(\d+) failures?(?: \(([^)]*)\))?/.exec(rest); if (mm) out.set(round, { pass: false, failures: Number(mm[1]), checks: mm[2] ? mm[2].split(',').map((s) => s.trim()).filter(Boolean) : [] }); }
  }
  return out;
}
function parseReports(stateDir, round) { // a saved proof report under renders/round-N/*.json; the *.dom.json files are not reports
  const dir = join(stateDir, 'renders', `round-${round}`);
  const counts = {}; let found = false;
  for (const f of list(dir)) {
    if (!f.endsWith('.json') || f.endsWith('.dom.json')) continue;
    const j = readJson(join(dir, f)); if (!j) continue;
    const fails = Array.isArray(j.renders) ? j.renders.flatMap((r) => r.failures || []) : Array.isArray(j.failures) ? j.failures : null;
    if (!fails) continue;
    found = true; for (const x of fails) inc(counts, (x && x.check) || 'unknown');
  }
  return found ? counts : null;
}
const noteText = (n) => (typeof n === 'string' ? n : n && typeof n === 'object' ? `${n.axis ? n.axis + ': ' : ''}${n.text ?? ''}` : String(n ?? ''));
const dedupeByRound = (arr) => { const m = new Map(); for (const x of arr || []) if (x && num(x.round) != null) m.set(x.round, x); return [...m.values()].sort((a, b) => a.round - b.round); };

function loadJob(family, arm, caseId) {
  const dir = join(ROOT, 'jobs', family, arm, caseId);
  const rec = { key: `${family}/${arm}/${caseId}`, family, arm, case: caseId, brand: caseBrand.get(caseId) || null, done: false, status: '', warnings: [] };
  if (!isDir(dir)) { rec.status = 'not started (no folder)'; return rec; }
  const manifest = readJson(join(dir, 'manifest.json'));
  if (manifest && manifest.brand) rec.brand = manifest.brand;
  const jobsDir = join(dir, '.desk', 'jobs');
  let jobId = manifest && manifest.jobId ? manifest.jobId : null;
  if (!jobId) jobId = list(jobsDir).filter((n) => isDir(join(jobsDir, n))).sort().at(-1) || null;
  const stateDir = jobId ? join(jobsDir, jobId) : null;
  const state = stateDir ? readJson(join(stateDir, 'state.json')) : null;
  const progress = state ? `state ${state.phase}${state.round ? ` round ${state.round}` : ''}` : 'no state yet';
  if (!manifest) { rec.status = state && state.phase === 'done' ? 'finished, manifest pending (audit running)' : `no manifest yet (${progress})`; return rec; }
  if (!manifest.done) { rec.status = manifest.error ? `runner error: ${manifest.error}` : `not done (manifest phase ${manifest.phase || '?'}, exit ${manifest.exit ?? '?'}; ${progress})`; return rec; }
  if (!state) { rec.status = 'manifest says done but state.json is missing or unreadable'; return rec; }

  rec.done = true; rec.status = 'done';
  const w = rec.warnings;
  if (manifest.arm && manifest.arm !== arm) w.push(`manifest arm ${manifest.arm} differs from folder`);
  if (manifest.family && manifest.family !== family) w.push(`manifest family ${manifest.family} differs from folder`);
  if (state.proofMode && state.proofMode !== arm) w.push(`state proofMode ${state.proofMode} differs from folder arm`);
  const dm = String((state.models && state.models.director) || '').split('/')[0];
  if (dm && dm !== family) w.push(`director model ${state.models.director} does not look like family ${family}`);
  if (state.phase !== 'done') w.push(`state phase is ${state.phase}`);
  if (state.maxRounds && state.maxRounds !== 6) w.push(`round cap ${state.maxRounds}, not 6`);
  if (state.signoffBy === 'report') w.push('sign-off by report (director did not see screenshots)');
  if (state.cost && state.cost.complete === false) w.push('cost incomplete (some token counts unknown)');
  if ((manifest.attempts || []).length > 1) w.push(`${manifest.attempts.length} attempts (resumed)`);
  if (manifest.exit != null && ![0, 4].includes(manifest.exit)) w.push(`exit ${manifest.exit}`);

  const scores = dedupeByRound(state.scores);
  const last = scores.length ? scores[scores.length - 1] : null;
  const rounds = num(state.round) ?? (last ? last.round : null);
  rec.jobId = jobId; rec.exit = manifest.exit ?? null; rec.attempts = (manifest.attempts || []).length || null;
  rec.rounds = rounds; rec.maxRounds = state.maxRounds ?? null;
  rec.waitingOn = state.waitingOn ? (state.waitingOn.type || true) : null;
  rec.reached = !!(last && last.pass === true && !state.waitingOn);
  rec.cost = state.cost ? { total: num(state.cost.total), director: num(state.cost.director), senior: num(state.cost.senior), builder: num(state.cost.builder), complete: state.cost.complete !== false } : null;
  rec.seconds = num(manifest.seconds);
  rec.finalAverage = last ? num(last.average) : null;
  rec.finalAxes = last && last.axes ? Object.fromEntries(AXES.map((a) => [a, num(last.axes[a])])) : null;
  rec.firstAverage = scores.length ? num(scores[0].average) : null;
  rec.signOffs = scores.length;
  rec.scoresByRound = scores.map((s) => ({ round: s.round, average: num(s.average), pass: s.pass === true, axes: s.axes || null }));
  rec.signoffBy = state.signoffBy || null;

  // Proof per round: saved reports, else the run log, else the state's own counts.
  const logRows = parseLog(readText(join(dir, 'run.log')));
  rec.proof = dedupeByRound(state.proof).map((p) => {
    const row = { round: p.round, pass: p.pass === true ? true : p.pass === false ? false : null, skipped: !!p.skipped, failures: num(p.failures) ?? 0, checks: [], byCheck: null, source: 'state' };
    if (row.pass === false) {
      const rep = parseReports(stateDir, p.round);
      const lg = logRows.get(p.round);
      if (rep) { row.byCheck = rep; row.checks = Object.keys(rep); row.source = 'report'; }
      else if (lg && lg.checks && lg.checks.length) { row.checks = lg.checks; row.source = 'log'; }
    }
    return row;
  });
  const firstPass = rec.proof.find((p) => p.pass === true);
  const firstRow = rec.proof.find((p) => p.round === 1);
  rec.proofFailedRounds = rec.proof.filter((p) => p.pass === false).length;
  rec.proofFailItems = sum(rec.proof.filter((p) => p.pass === false).map((p) => p.failures));
  rec.firstRoundProofFailed = arm === 'on' && firstRow ? firstRow.pass === false : null;
  rec.roundsToFirstProofPass = arm === 'on' ? (firstPass ? firstPass.round : null) : null;

  // Escalations: unique desk tasks that name an escalation or a pen.
  const seen = new Set(); const esc = { senior: 0, artDirector: 0, rounds: [] };
  for (const d of state.desks || []) {
    const t = String((d && d.task) || ''); if (seen.has(t) || (d.status && d.status !== 'done')) continue;
    const isEsc = t.includes('escalated'), isPen = t.startsWith('pen');
    if (!isEsc && !isPen) continue;
    seen.add(t); if (isPen) esc.artDirector++; else esc.senior++;
    const r = /round (\d+)/.exec(t); if (r) esc.rounds.push(Number(r[1]));
  }
  rec.escalations = { ...esc, total: esc.senior + esc.artDirector };

  // Audit.
  const audit = readJson(join(dir, 'audit.json'));
  if (audit && !audit.error && Array.isArray(audit.renders)) {
    const byCheck = {}, bySize = {}; let total = 0;
    for (const r of audit.renders) for (const f of r.failures || []) { inc(byCheck, f.check || 'unknown'); inc(bySize, r.size || 'unknown'); total++; }
    rec.audit = { available: true, pass: typeof audit.pass === 'boolean' ? audit.pass : total === 0, failures: total, byCheck, bySize, items: audit.renders.flatMap((r) => (r.failures || []).map((f) => ({ size: r.size, check: f.check, text: f.text, reason: f.reason }))) };
  } else if (manifest.audit && !manifest.audit.error && typeof manifest.audit.pass === 'boolean') {
    rec.audit = { available: true, pass: manifest.audit.pass, failures: num(manifest.audit.failures) ?? 0, byCheck: null, bySize: null, items: [], fromManifestOnly: true };
    w.push('audit.json missing or unreadable, using the manifest summary');
  } else {
    rec.audit = { available: false, error: audit && audit.error ? String(audit.error).slice(0, 200) : 'no audit' };
    w.push('no usable audit');
  }

  // Creative Director notes, coded.
  rec.notes = scores.map((s) => {
    const items = (s.notes || []).map(noteText).map((text) => { const m = MECH.exec(text); return { text, class: m ? 'mechanical' : 'taste', term: m ? m[0].toLowerCase() : null, mechanicalNoEdge: MECH_NO_EDGE.test(text) }; });
    return { round: s.round, pass: s.pass === true, mechanical: items.filter((i) => i.class === 'mechanical').length, taste: items.filter((i) => i.class === 'taste').length, mechanicalNoEdge: items.filter((i) => i.mechanicalNoEdge).length, items };
  });
  rec.cdMechanical = sum(rec.notes.map((n) => n.mechanical));
  rec.cdTaste = sum(rec.notes.map((n) => n.taste));
  rec.cdMechanicalNoEdge = sum(rec.notes.map((n) => n.mechanicalNoEdge));
  return rec;
}

// ---------- gather ----------
const expectedIds = cases.map((c) => c.id);
const jobs = [];
for (const family of FAMILIES) for (const arm of ARMS) {
  const found = list(join(ROOT, 'jobs', family, arm)).filter((n) => !n.startsWith('.') && isDir(join(ROOT, 'jobs', family, arm, n)));
  const ids = [...expectedIds, ...found.filter((n) => !expectedIds.includes(n)).sort()];
  for (const id of ids) jobs.push(loadJob(family, arm, id));
}
const done = jobs.filter((j) => j.done);
const skipped = jobs.filter((j) => !j.done);
const inScope = (j, scope) => scope === 'pooled' || j.family === scope;

// Complete pairs: the same family and case done in both arms.
const pairs = [];
for (const family of FAMILIES) for (const id of [...new Set(jobs.filter((j) => j.family === family).map((j) => j.case))]) {
  const on = done.find((j) => j.family === family && j.arm === 'on' && j.case === id);
  const off = done.find((j) => j.family === family && j.arm === 'off' && j.case === id);
  if (on && off) pairs.push({ family, case: id, brand: on.brand || off.brand, on, off });
}
const pairsFor = (scope) => pairs.filter((p) => scope === 'pooled' || p.family === scope);
const incompletePairs = [];
for (const family of FAMILIES) for (const id of [...new Set(jobs.filter((j) => j.family === family).map((j) => j.case))]) {
  const on = jobs.find((j) => j.family === family && j.arm === 'on' && j.case === id), off = jobs.find((j) => j.family === family && j.arm === 'off' && j.case === id);
  if (on && off && !(on.done && off.done)) incompletePairs.push({ family, case: id, on: on.done ? 'done' : on.status, off: off.done ? 'done' : off.status });
}

// ---------- measures ----------
const MEASURES = {
  rounds: (j) => num(j.rounds),
  cost: (j) => (j.cost ? j.cost.total : null),
  costDirector: (j) => (j.cost ? j.cost.director : null),
  costSenior: (j) => (j.cost ? j.cost.senior : null),
  costBuilder: (j) => (j.cost ? j.cost.builder : null),
  signOffs: (j) => num(j.signOffs),
  seconds: (j) => num(j.seconds),
  finalAverage: (j) => j.finalAverage,
  firstAverage: (j) => j.firstAverage,
  escalations: (j) => (j.escalations ? j.escalations.total : null),
  cdMechanical: (j) => num(j.cdMechanical),
  cdTaste: (j) => num(j.cdTaste),
};
function pairedMeasure(scope, getter) {
  const ps = pairsFor(scope).map((p) => [getter(p.on), getter(p.off)]).filter(([a, b]) => a != null && b != null);
  return pairedStats(ps);
}
const h2 = {}, h3 = {}, h4 = {};
for (const scope of SCOPES) {
  h2[scope] = {}; for (const m of ['rounds', 'cost', 'costDirector', 'costSenior', 'costBuilder', 'signOffs', 'seconds', 'escalations']) h2[scope][m] = pairedMeasure(scope, MEASURES[m]);
  h3[scope] = { finalAverage: pairedMeasure(scope, MEASURES.finalAverage), firstAverage: pairedMeasure(scope, MEASURES.firstAverage), axes: {} };
  for (const a of AXES) h3[scope].axes[a] = pairedMeasure(scope, (j) => (j.finalAxes ? j.finalAxes[a] : null));
  const rp = pairsFor(scope).map((p) => [p.on.reached, p.off.reached]);
  h3[scope].reached = mcnemar(rp);
  h4[scope] = { cdMechanicalPerJob: pairedMeasure(scope, MEASURES.cdMechanical), cdTastePerJob: pairedMeasure(scope, MEASURES.cdTaste) };
}

// H1: audit shares and breakdowns.
function auditStats(scope, arm, onlyReached) {
  const js = done.filter((j) => inScope(j, scope) && j.arm === arm && (!onlyReached || j.reached));
  const audited = js.filter((j) => j.audit.available);
  const failing = audited.filter((j) => !j.audit.pass);
  const byCheck = {}, bySize = {}, byBrand = {};
  for (const j of audited) {
    for (const [k, n] of Object.entries(j.audit.byCheck || {})) { byCheck[k] = byCheck[k] || { failures: 0, jobs: 0 }; byCheck[k].failures += n; byCheck[k].jobs++; }
    for (const [k, n] of Object.entries(j.audit.bySize || {})) { bySize[k] = bySize[k] || { failures: 0, jobs: 0 }; bySize[k].failures += n; bySize[k].jobs++; }
    const b = j.brand || 'unknown'; byBrand[b] = byBrand[b] || { failures: 0, jobs: 0, audited: 0 }; byBrand[b].audited++;
    if (!j.audit.pass) { byBrand[b].failures += j.audit.failures; byBrand[b].jobs++; }
  }
  return { jobsDone: js.length, audited: audited.length, failingJobs: failing.length, share: audited.length ? failing.length / audited.length : null, ci95: wilson(failing.length, audited.length), failuresTotal: sum(audited.map((j) => j.audit.failures)), byCheck, bySize, byBrand };
}
const h1 = {};
for (const scope of SCOPES) { h1[scope] = {}; for (const arm of ARMS) h1[scope][arm] = { allDone: auditStats(scope, arm, false), reachedOnly: auditStats(scope, arm, true) }; }

// H2 mechanism (proof on arm only).
function proofStats(scope) {
  const js = done.filter((j) => inScope(j, scope) && j.arm === 'on');
  const withFirst = js.filter((j) => j.firstRoundProofFailed != null);
  const firstFailed = withFirst.filter((j) => j.firstRoundProofFailed);
  const checksRound1 = {}, checksAll = {}, sources = {};
  for (const j of js) for (const p of j.proof) {
    if (p.pass !== false) continue;
    inc(sources, p.source);
    for (const c of p.checks) { inc(checksAll, c); if (p.round === 1) inc(checksRound1, c); }
    if (!p.checks.length) { inc(checksAll, '(check not recorded)'); if (p.round === 1) inc(checksRound1, '(check not recorded)'); }
  }
  const toPass = js.map((j) => j.roundsToFirstProofPass).filter((x) => x != null);
  return {
    onJobs: js.length, jobsWithRound1Proof: withFirst.length, firstRoundFailed: firstFailed.length, firstRoundFailShare: withFirst.length ? firstFailed.length / withFirst.length : null, firstRoundFailCi95: wilson(firstFailed.length, withFirst.length),
    jobsWithAnyProofFail: js.filter((j) => j.proofFailedRounds > 0).length, proofFailedRoundsMean: mean(js.map((j) => j.proofFailedRounds)), proofFailItemsMean: mean(js.map((j) => j.proofFailItems)),
    roundsToFirstProofPassMean: mean(toPass), roundsToFirstProofPassMedian: median(toPass), jobsNeverPassedProof: js.length - toPass.length,
    checkRoundsFiredRound1: checksRound1, checkRoundsFiredAll: checksAll, failingRoundSources: sources,
  };
}
const h2proof = Object.fromEntries(SCOPES.map((s) => [s, proofStats(s)]));

// H4: notes by round and arm.
function notesByRound(scope, arm) {
  const js = done.filter((j) => inScope(j, scope) && j.arm === arm);
  const maxRound = Math.max(1, ...js.map((j) => j.rounds || 0));
  const rows = [];
  for (let r = 1; r <= maxRound; r++) {
    let signOffs = 0, cdMech = 0, cdTaste = 0, cdMechNE = 0, proofRounds = 0, proofItems = 0;
    for (const j of js) {
      const n = j.notes.find((x) => x.round === r); if (n) { signOffs++; cdMech += n.mechanical; cdTaste += n.taste; cdMechNE += n.mechanicalNoEdge; }
      const p = j.proof.find((x) => x.round === r); if (p && p.pass === false) { proofRounds++; proofItems += p.failures; }
    }
    const cdTotal = cdMech + cdTaste;
    const allMech = cdMech + proofItems, all = cdTotal + proofItems;
    rows.push({ round: r, jobsReaching: js.filter((j) => (j.rounds || 0) >= r).length, signOffs, cdNotes: cdTotal, cdMechanical: cdMech, cdTaste, cdMechanicalNoEdge: cdMechNE, cdMechanicalShareNoEdge: cdTotal ? cdMechNE / cdTotal : null, cdMechanicalShare: cdTotal ? cdMech / cdTotal : null, proofFailedRounds: proofRounds, proofItems, mechanicalShareInclProof: all ? allMech / all : null });
  }
  const band = (from, to) => {
    const rs = rows.filter((x) => x.round >= from && x.round <= to);
    const cdMech = sum(rs.map((x) => x.cdMechanical)), cdTaste = sum(rs.map((x) => x.cdTaste)), pi = sum(rs.map((x) => x.proofItems)), ne = sum(rs.map((x) => x.cdMechanicalNoEdge));
    return { cdMechanicalNoEdge: ne, cdMechanicalShareNoEdge: cdMech + cdTaste ? ne / (cdMech + cdTaste) : null, signOffs: sum(rs.map((x) => x.signOffs)), cdNotes: cdMech + cdTaste, cdMechanical: cdMech, cdTaste, cdMechanicalShare: cdMech + cdTaste ? cdMech / (cdMech + cdTaste) : null, proofItems: pi, mechanicalShareInclProof: cdMech + cdTaste + pi ? (cdMech + pi) / (cdMech + cdTaste + pi) : null };
  };
  return { jobs: js.length, rows, bands: { 'round 1': band(1, 1), 'round 2': band(2, 2), 'rounds 3+': band(3, 99), 'all rounds': band(1, 99) } };
}
const h4notes = {}; for (const scope of SCOPES) h4notes[scope] = { on: notesByRound(scope, 'on'), off: notesByRound(scope, 'off') };
const termCounts = {}; let edgeOnly = 0, mechTotal = 0;
for (const j of done) for (const n of j.notes) for (const i of n.items) if (i.term) { inc(termCounts, i.term); mechTotal++; if (!i.mechanicalNoEdge) edgeOnly++; }

// Arm summaries over all done jobs (not just complete pairs).
const armSummary = {};
for (const scope of SCOPES) { armSummary[scope] = {}; for (const arm of ARMS) {
  const js = done.filter((j) => inScope(j, scope) && j.arm === arm);
  const expected = jobs.filter((j) => inScope(j, scope) && j.arm === arm).length;
  armSummary[scope][arm] = { expected, done: js.length, reached: js.filter((j) => j.reached).length, meanRounds: mean(js.map((j) => j.rounds).filter((x) => x != null)), meanCost: mean(js.map(MEASURES.cost).filter((x) => x != null)), meanFinalAverage: mean(js.map((j) => j.finalAverage).filter((x) => x != null)), meanSeconds: mean(js.map((j) => j.seconds).filter((x) => x != null)), auditFailing: js.filter((j) => j.audit.available && !j.audit.pass).length };
} }

// ---------- results.json ----------
const generated = chicagoStamp();
const results = {
  generated, root: ROOT, node: process.version,
  counts: { expectedJobs: jobs.length, done: done.length, skipped: skipped.length, completePairs: pairs.length, completePairsByFamily: Object.fromEntries(FAMILIES.map((f) => [f, pairs.filter((p) => p.family === f).length])) },
  coding: { rule: MECH.source, flags: MECH.flags, sensitivityRuleWithoutEdge: MECH_NO_EDGE.source, matchedTermCounts: termCounts, mechanicalNotes: mechTotal, mechanicalOnlyBecauseOfEdge: edgeOnly },
  skipped: skipped.map((j) => ({ job: j.key, status: j.status })), incompletePairs,
  warnings: done.filter((j) => j.warnings.length).map((j) => ({ job: j.key, warnings: j.warnings })),
  armSummary, h1, h2: { paired: h2, proof: h2proof }, h3, h4: { paired: h4, notes: h4notes },
  pairs: pairs.map((p) => ({ family: p.family, case: p.case, brand: p.brand, on: { rounds: p.on.rounds, cost: p.on.cost && p.on.cost.total, finalAverage: p.on.finalAverage, reached: p.on.reached, auditPass: p.on.audit.available ? p.on.audit.pass : null }, off: { rounds: p.off.rounds, cost: p.off.cost && p.off.cost.total, finalAverage: p.off.finalAverage, reached: p.off.reached, auditPass: p.off.audit.available ? p.off.audit.pass : null } })),
  jobs: done.map((j) => { const { done: _d, ...rest } = j; return rest; }),
};
mkdirSync(OUT, { recursive: true });
writeFileSync(join(OUT, 'results.json'), JSON.stringify(results, null, 1));

// ---------- results.md ----------
const esc = (s) => String(s ?? '').replace(/\|/g, '\\|').replace(/\r?\n/g, ' ');
const f = (x, d = 2) => (x == null || !Number.isFinite(x) ? '-' : x.toFixed(d));
const fp = (p) => (p == null ? '-' : p < 0.001 ? '<0.001' : p.toFixed(3));
const pct = (x) => (x == null ? '-' : `${(x * 100).toFixed(0)}%`);
const frac = (k, n) => (n ? `${k}/${n} (${pct(k / n)})` : `${k}/${n}`);
const ci = (c, d = 2) => (c ? `[${f(c[0], d)}, ${f(c[1], d)}]` : '-');
const sgn = (x, d = 2) => (x == null ? '-' : (x > 0 ? '+' : '') + x.toFixed(d));
function table(headers, rows) {
  if (!rows.length) return '_no rows_\n';
  return [`| ${headers.map(esc).join(' | ')} |`, `|${headers.map(() => '---').join('|')}|`, ...rows.map((r) => `| ${r.map(esc).join(' | ')} |`)].join('\n') + '\n';
}
const L = [];
const P = (s = '') => L.push(s);

P('# Proof ablation results'); P();
P(`Generated ${generated} (America/Chicago) by analyze.mjs from \`${ROOT.replace(/\\/g, '/')}\`. Differences are proof on minus proof off. Exact two-sided Wilcoxon signed-rank p (zeros dropped, average ranks for ties) and exact McNemar p; 95% intervals are seeded percentile bootstraps of the mean paired difference, dz is mean difference over its standard deviation, r is the matched-pairs rank-biserial correlation (positive means on is larger).`); P();
P(`Jobs done: ${done.length} of ${jobs.length}. Complete pairs (same family and case done in both arms): ${pairs.length} (Anthropic ${results.counts.completePairsByFamily.anthropic}, OpenAI ${results.counts.completePairsByFamily.openai}). ${done.length === 0 ? 'No job has finished yet, so every statistic below is empty.' : ''}`); P();

P('## Jobs not done (skipped)'); P();
if (!skipped.length) P('None, all jobs are done.');
else {
  const started = skipped.filter((j) => !j.status.startsWith('not started'));
  const notStarted = skipped.filter((j) => j.status.startsWith('not started'));
  if (started.length) P(table(['Job', 'Status'], started.map((j) => [j.key, j.status])));
  if (notStarted.length) {
    P(`Not started (no folder yet), ${notStarted.length} jobs:`); P();
    for (const family of FAMILIES) for (const arm of ARMS) {
      const ids = notStarted.filter((j) => j.family === family && j.arm === arm).map((j) => j.case);
      if (ids.length) P(`- ${family}/${arm}: ${ids.join(', ')}`);
    }
  }
}
P();
P('## Progress and arm summary (all done jobs)'); P();
P(table(['Scope', 'Arm', 'Jobs', 'Done', 'Reached the bar', 'Mean rounds', 'Mean cost (USD list)', 'Mean final average', 'Mean seconds', 'Audit failing'],
  SCOPES.flatMap((s) => ARMS.map((a) => { const x = armSummary[s][a]; return [FAMILY_LABEL[s], a, x.expected, x.done, x.done ? frac(x.reached, x.done) : '-', f(x.meanRounds), f(x.meanCost, 3), f(x.meanFinalAverage), f(x.meanSeconds, 0), x.done ? `${x.auditFailing}/${x.done}` : '-']; }))));
if (incompletePairs.length) { P(`Pairs with one or both arms not done: ${incompletePairs.length}. They are left out of every paired test.`); P(); }
const warn = results.warnings;
if (warn.length) { P('### Data warnings'); P(); P(table(['Job', 'Warning'], warn.flatMap((w) => w.warnings.map((x) => [w.job, x])))); }

// H1
P('## H1. Signed-off work carries faults the director passed'); P();
P('> With proof off, audit failures > 0 in a material share of off-arm jobs; with proof on, zero. The audit is the proof CLI run once on the signed-off final.html with the case copy, never shown to the desks. Signed-off means the job reached the bar; the all-done columns include jobs that hit the round cap under the bar.'); P();
P(table(['Scope', 'Arm', 'Done', 'Audited', 'Audit failing (all done)', '95% CI', 'Audit failures (count)', 'Reached the bar, audited', 'Reached and audit failing', '95% CI'],
  SCOPES.flatMap((s) => ARMS.map((a) => { const x = h1[s][a].allDone, y = h1[s][a].reachedOnly; return [FAMILY_LABEL[s], a, x.jobsDone, x.audited, frac(x.failingJobs, x.audited), ci(x.ci95, 2), x.failuresTotal, y.audited, frac(y.failingJobs, y.audited), ci(y.ci95, 2)]; }))));
const cols = [['anthropic', 'off'], ['openai', 'off'], ['pooled', 'off'], ['pooled', 'on']];
const cell = (o, auditedN) => (o ? `${o.failures} (${o.jobs}/${auditedN})` : `0 (0/${auditedN})`);
function breakdown(title, keyName, keys, getter) {
  P(`### ${title}`); P();
  P(`Cell: failures (jobs with at least one / jobs audited). All done jobs.`); P();
  if (!keys.length) { P('_no audited jobs yet_'); P(); return; }
  P(table([keyName, ...cols.map(([s, a]) => `${FAMILY_LABEL[s]} ${a}`)], keys.map((k) => [k, ...cols.map(([s, a]) => cell(getter(h1[s][a].allDone, k), h1[s][a].allDone.audited))])));
}
const allKeys = (getter) => [...new Set(SCOPES.flatMap((s) => ARMS.flatMap((a) => Object.keys(getter(h1[s][a].allDone)))))].sort();
breakdown('Audit failures by check', 'Check', allKeys((x) => x.byCheck), (x, k) => x.byCheck[k]);
breakdown('Audit failures by size', 'Size', allKeys((x) => x.bySize), (x, k) => x.bySize[k]);
{
  const brands = [...new Set(done.map((j) => j.brand || 'unknown'))].sort();
  P('### Audit failures by brand'); P();
  P('Cell: failures (failing jobs / jobs audited for that brand). All done jobs.'); P();
  if (!brands.length) { P('_no audited jobs yet_'); P(); }
  else P(table(['Brand', ...cols.map(([s, a]) => `${FAMILY_LABEL[s]} ${a}`)], brands.map((b) => [b, ...cols.map(([s, a]) => { const o = h1[s][a].allDone.byBrand[b]; return o ? `${o.failures} (${o.jobs}/${o.audited})` : '0 (0/0)'; })])));
}

// H2
function pairedRows(src, defs) {
  return SCOPES.flatMap((s) => defs.map(([key, label, d]) => { const x = src[s][key]; const w = x.wilcoxon; return [FAMILY_LABEL[s], label, x.nPairs, f(x.meanOn, d), f(x.meanOff, d), sgn(x.meanDiff, d), ci(x.ci95, d), f(x.medianDiff, d), f(x.dz), f(w.wPlus, 1), f(w.wMinus, 1), w.n, fp(w.p), f(w.rankBiserial)]; }));
}
const PH = ['Scope', 'Measure', 'Pairs', 'Mean on', 'Mean off', 'Mean diff (on-off)', '95% CI', 'Median diff', 'dz', 'W+', 'W-', 'n non-zero', 'Exact p', 'r'];
P('## H2. Proof on uses more rounds and costs more'); P();
P('> Rounds to sign-off and cost per job, paired by case within family. Rounds is the job\'s final round count, cost is the CLI\'s list-price total.'); P();
P(table(PH, pairedRows(h2, [['rounds', 'Rounds', 2], ['cost', 'Cost (USD list)', 3]])));
P('### Secondary: cost by tier, sign-off calls, escalations, wall time'); P();
P(table(PH, pairedRows(h2, [['costDirector', 'Cost, director', 3], ['costSenior', 'Cost, senior', 3], ['costBuilder', 'Cost, builder', 3], ['signOffs', 'Sign-off calls', 2], ['escalations', 'Escalations', 2], ['seconds', 'Wall seconds', 0]])));
P('### Where the extra rounds come from (proof-on jobs)'); P();
P(table(['Scope', 'On jobs', 'First round failed proof', '95% CI', 'Jobs with any proof fail', 'Mean proof-failed rounds', 'Mean proof failure items', 'Rounds to first proof pass (mean / median)', 'Never passed proof'],
  SCOPES.map((s) => { const x = h2proof[s]; return [FAMILY_LABEL[s], x.onJobs, frac(x.firstRoundFailed, x.jobsWithRound1Proof), ci(x.firstRoundFailCi95, 2), frac(x.jobsWithAnyProofFail, x.onJobs), f(x.proofFailedRoundsMean), f(x.proofFailItemsMean), `${f(x.roundsToFirstProofPassMean)} / ${f(x.roundsToFirstProofPassMedian, 1)}`, x.jobsNeverPassedProof]; })));
{
  const checks = [...new Set(SCOPES.flatMap((s) => [...Object.keys(h2proof[s].checkRoundsFiredRound1), ...Object.keys(h2proof[s].checkRoundsFiredAll)]))].sort();
  P('Checks that fired, counted as job-rounds in which the check appeared (round 1 only, and every round). Per-round check names come from saved proof reports when present, else from the `proof round N: K failures (checks)` lines in run.log.'); P();
  if (!checks.length) P('_no proof failures recorded yet_');
  else P(table(['Check', ...SCOPES.flatMap((s) => [`${FAMILY_LABEL[s]} round 1`, `${FAMILY_LABEL[s]} all rounds`])], checks.map((c) => [c, ...SCOPES.flatMap((s) => [h2proof[s].checkRoundsFiredRound1[c] || 0, h2proof[s].checkRoundsFiredAll[c] || 0])])));
  const src = {}; for (const s of ['pooled']) for (const [k, n] of Object.entries(h2proof[s].failingRoundSources)) src[k] = n;
  P(`Source of the per-round check names for failing proof rounds: ${Object.keys(src).length ? Object.entries(src).map(([k, n]) => `${k} ${n}`).join(', ') : 'none yet'}.`); P();
}

// H3
P('## H3. The director\'s scores do not fall when proof is off'); P();
P('> Rubric average at sign-off is the same or higher with proof off. Final average is the last sign-off\'s average; a job with no sign-off has none and drops out of that pair.'); P();
P(table(PH, pairedRows(h3, [['finalAverage', 'Final average', 2]])));
P('### Reached the bar (every axis 8 or above, average 8.5 or above, no open wait)'); P();
P(table(['Scope', 'Pairs', 'Reached on', 'Reached off', 'Both', 'On only', 'Off only', 'Neither', 'McNemar exact p'],
  SCOPES.map((s) => { const m = h3[s].reached; return [FAMILY_LABEL[s], m.nPairs, frac(m.reachedOn, m.nPairs), frac(m.reachedOff, m.nPairs), m.both, m.onOnly, m.offOnly, m.neither, fp(m.p)]; })));
P('### Secondary: first sign-off average and final per-axis means (exploratory, p unadjusted for the eight axes)'); P();
P(table(PH, [...pairedRows(h3, [['firstAverage', 'First sign-off average', 2]]), ...SCOPES.flatMap((s) => AXES.map((a) => { const x = h3[s].axes[a], w = x.wilcoxon; return [FAMILY_LABEL[s], `Final ${a}`, x.nPairs, f(x.meanOn), f(x.meanOff), sgn(x.meanDiff), ci(x.ci95), f(x.medianDiff), f(x.dz), f(w.wPlus, 1), f(w.wMinus, 1), w.n, fp(w.p), f(w.rankBiserial)]; }))]));

// H4
P('## H4. The notes differ in kind'); P();
P(`> With proof on the builder's notes are mostly mechanical early and taste late; with proof off the director's notes are mostly taste and rarely name a mechanical fault. A Creative Director note is coded mechanical if it matches \`${MECH.source}\` (case-insensitive), taste otherwise. "No edge" repeats the share with the term \`edge\` removed, because it also matches layout talk such as "the right edge" or "left edge at 72px". "Incl. proof" adds the proof failure items sent to the builder on the on arm, all mechanical by construction. Pooled across families, all done jobs.`); P();
{
  const on = h4notes.pooled.on, off = h4notes.pooled.off;
  const maxR = Math.max(on.rows.length, off.rows.length);
  const rows = [];
  for (let r = 1; r <= maxR; r++) {
    const a = on.rows[r - 1], b = off.rows[r - 1];
    rows.push([r, a ? a.jobsReaching : 0, a ? a.proofItems : 0, a ? a.cdMechanical : 0, a ? a.cdTaste : 0, a ? pct(a.cdMechanicalShare) : '-', a ? pct(a.cdMechanicalShareNoEdge) : '-', a ? pct(a.mechanicalShareInclProof) : '-', b ? b.jobsReaching : 0, b ? b.cdMechanical : 0, b ? b.cdTaste : 0, b ? pct(b.cdMechanicalShare) : '-', b ? pct(b.cdMechanicalShareNoEdge) : '-']);
  }
  const A = on.bands['all rounds'], B = off.bands['all rounds'];
  rows.push(['all', on.jobs, A.proofItems, A.cdMechanical, A.cdTaste, pct(A.cdMechanicalShare), pct(A.cdMechanicalShareNoEdge), pct(A.mechanicalShareInclProof), off.jobs, B.cdMechanical, B.cdTaste, pct(B.cdMechanicalShare), pct(B.cdMechanicalShareNoEdge)]);
  P(table(['Round', 'On: jobs reaching', 'On: proof items', 'On: CD mechanical', 'On: CD taste', 'On: CD mechanical share', 'On: CD share, no edge', 'On: mechanical share incl. proof', 'Off: jobs reaching', 'Off: CD mechanical', 'Off: CD taste', 'Off: CD mechanical share', 'Off: CD share, no edge'], rows));
}
P('### Early against late rounds, by family'); P();
P(table(['Scope', 'Arm', 'Band', 'Sign-offs', 'CD notes', 'CD mechanical', 'CD taste', 'CD mechanical share', 'CD share, no edge', 'Proof items', 'Mechanical share incl. proof'],
  SCOPES.flatMap((s) => ARMS.flatMap((a) => Object.entries(h4notes[s][a].bands).map(([name, x]) => [FAMILY_LABEL[s], a, name, x.signOffs, x.cdNotes, x.cdMechanical, x.cdTaste, pct(x.cdMechanicalShare), pct(x.cdMechanicalShareNoEdge), a === 'on' ? x.proofItems : '-', a === 'on' ? pct(x.mechanicalShareInclProof) : '-'])))));
P('### Paired: Creative Director notes per job'); P();
P(table(PH, pairedRows(h4, [['cdMechanicalPerJob', 'Mechanical CD notes per job', 2], ['cdTastePerJob', 'Taste CD notes per job', 2]])));
{
  const terms = Object.entries(termCounts).sort((a, b) => b[1] - a[1]);
  P(`Terms that triggered the mechanical code (every note, so the coding can be audited; the full note text and code are in results.json under each job): ${terms.length ? terms.map(([t, n]) => `${t} ${n}`).join(', ') : 'none yet'}. ${edgeOnly} of the ${mechTotal} mechanical notes matched only on \`edge\`, which also matches layout wording such as "right edge", so the no-edge shares sit beside the specified ones.`); P();
}

// Per-job table
P('## Per-job table'); P();
P('Final axes are in the order hierarchy, typography, spacing, colour, composition, originality, brand, copy. Proof column is round:checks(failure items) for failing rounds, `ok` for a pass, `skip` when proof was off. CD notes are round:mechanical/taste. Audit is `pass` or failure count with checks.'); P();
const jobRows = done.slice().sort((a, b) => a.family.localeCompare(b.family) || a.case.localeCompare(b.case) || a.arm.localeCompare(b.arm)).map((j) => {
  const proofCell = j.arm === 'off' ? 'skip' : j.proof.map((p) => (p.pass ? `${p.round}:ok` : p.pass === false ? `${p.round}:${p.checks.length ? p.checks.join('+') : '?'}(${p.failures})` : `${p.round}:-`)).join(' ') || '-';
  const auditCell = !j.audit.available ? 'n/a' : j.audit.pass ? 'pass' : `${j.audit.failures}: ${Object.entries(j.audit.byCheck || {}).map(([k, n]) => `${k}x${n}`).join(', ') || 'see json'}`;
  return [j.family, j.arm, j.case, j.reached ? 'yes' : 'no', j.rounds ?? '-', j.cost ? f(j.cost.total, 3) : '-', f(j.finalAverage, 2), j.finalAxes ? AXES.map((a) => j.finalAxes[a] ?? '-').join('/') : '-', proofCell, j.escalations.total ? `${j.escalations.senior}s ${j.escalations.artDirector}pen` : '0', auditCell, j.notes.map((n) => `${n.round}:${n.mechanical}/${n.taste}`).join(' ') || '-'];
});
P(table(['Family', 'Arm', 'Case', 'Reached', 'Rounds', 'Cost (USD list)', 'Final avg', 'Final axes', 'Proof by round', 'Escalations', 'Audit', 'CD notes (mech/taste)'], jobRows));
writeFileSync(join(OUT, 'results.md'), L.join('\n'));
console.log(`analyze: ${done.length} of ${jobs.length} jobs done, ${pairs.length} complete pairs, ${skipped.length} skipped. Wrote ${join(OUT, 'results.json')} and ${join(OUT, 'results.md')}`);
