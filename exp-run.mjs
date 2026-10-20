// Runs the proof ablation: every case once with proof on and once with proof off, per model family.
//   node exp-run.mjs --family anthropic|openai --arm on|off|both --parallel 3 [--only id,id] [--dry]
// Each job gets its own project folder under jobs/<family>/<arm>/<case>/ so nothing shares state.
// After a job ends, the signed-off final.html is audited with the proof CLI (never shown to the desks) into audit.json.
import { spawn } from 'node:child_process';
import { mkdirSync, existsSync, cpSync, writeFileSync, readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const DESK = 'C:/Users/adity/Desktop/Adi/deskstudio';
const MODELS = {
  anthropic: null, // the studio preset: opus director, sonnet senior, haiku builder
  openai: 'director=openai/large,senior=openai/mini,builder=openai/mini', // the verified OpenAI configuration (evals/providers/openai-2026-10-19); nano as builder returned no file at the cap and stalled on taste notes in the first three jobs, 01:23 to 01:36 CDT
};
const args = process.argv.slice(2);
const flag = (k) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : null; };
const family = flag('--family');
const arm = flag('--arm') || 'both';
const parallel = Number(flag('--parallel') || 3);
const only = flag('--only') ? flag('--only').split(',') : null;
const dry = args.includes('--dry');
// Per-call timeout in minutes: OpenAI calls answer in seconds and a stalled codex stream must fail fast so resume can retry; the Anthropic director reads screenshots and can take minutes.
const TIMEOUT = { anthropic: '12', openai: '6' };
if (!MODELS.hasOwnProperty(family)) { console.error('--family anthropic|openai'); process.exit(2); }

const cases = JSON.parse(readFileSync(join(HERE, 'cases.json'), 'utf8')).filter(c => !only || only.includes(c.id));
const arms = arm === 'both' ? ['on', 'off'] : [arm];
// Interleave on and off per case so the hour of the night cannot favour one arm.
const work = [];
for (const c of cases) for (const a of arms) work.push({ c, a });

function log(m) { process.stdout.write(`[${new Date().toISOString().slice(11, 19)}] ${m}\n`); }

function run(cmd, cmdArgs, { cwd, logFile }) {
  return new Promise((resolve) => {
    const env = { ...process.env }; delete env.CLAUDECODE; delete env.CLAUDE_CODE_ENTRYPOINT;
    const child = spawn(cmd, cmdArgs, { cwd, env, shell: false, windowsHide: true });
    let out = '';
    child.stdout.on('data', d => { out += d; });
    child.stderr.on('data', d => { out += d; });
    child.on('close', code => { if (logFile) writeFileSync(logFile, out, { flag: 'a' }); resolve({ code, out }); });
    child.on('error', e => { out += `\nspawn error: ${e.message}`; if (logFile) writeFileSync(logFile, out, { flag: 'a' }); resolve({ code: 1, out }); });
  });
}

function jobOf(proj) {
  const jobsDir = join(proj, '.desk', 'jobs');
  if (!existsSync(jobsDir)) return null;
  const ids = readdirSync(jobsDir).sort();
  const id = ids.at(-1);
  if (!id) return null;
  const stateFile = join(jobsDir, id, 'state.json');
  return existsSync(stateFile) ? { id, dir: join(jobsDir, id), state: JSON.parse(readFileSync(stateFile, 'utf8')) } : { id, dir: join(jobsDir, id), state: null };
}

async function one({ c, a }) {
  const proj = join(HERE, 'jobs', family, a, c.id);
  const manifestFile = join(proj, 'manifest.json');
  if (existsSync(manifestFile)) { const m = JSON.parse(readFileSync(manifestFile, 'utf8')); if (m.done) { log(`${family}/${a}/${c.id}: already done, skipping`); return m; } }
  mkdirSync(join(proj, '.desk'), { recursive: true });
  cpSync(join(DESK, 'evals', 'brands', c.brand, 'DESIGN.md'), join(proj, '.desk', 'DESIGN.md'));
  if (!existsSync(join(proj, 'package.json'))) writeFileSync(join(proj, 'package.json'), JSON.stringify({ name: `ablation-${c.id}`, private: true }));
  const must = c.mustAppear.map(s => `'${s}'`).join(' and ');
  const ask = `${c.ask} Copy that must appear: ${must}.`;
  const runArgs = [join(DESK, 'runner', 'run.mjs'), 'design', ask, '--project', proj, '--quality', 'studio', '--rounds', '6', '--timeout', TIMEOUT[family]];
  if (a === 'off') runArgs.push('--no-proof');
  if (MODELS[family]) runArgs.push('--models', MODELS[family]);
  const manifest = { family, arm: a, case: c.id, brand: c.brand, ask, models: MODELS[family] || 'studio preset', startedAt: new Date().toISOString(), attempts: [] };
  if (dry) { log(`${family}/${a}/${c.id}: node ${runArgs.map(x => (/\s/.test(x) ? JSON.stringify(x) : x)).join(' ')}`); return manifest; }
  log(`${family}/${a}/${c.id}: start`);
  const logFile = join(proj, 'run.log');
  let existing = jobOf(proj);
  let r;
  const t0 = Date.now();
  if (existing && existing.state && existing.state.phase !== 'done') {
    log(`${family}/${a}/${c.id}: resuming ${existing.id} at ${existing.state.phase}`);
    r = await run(process.execPath, [join(DESK, 'runner', 'run.mjs'), 'resume', existing.id, '--project', proj, '--timeout', TIMEOUT[family]], { cwd: DESK, logFile });
  } else {
    r = await run(process.execPath, runArgs, { cwd: DESK, logFile });
  }
  manifest.attempts.push({ code: r.code, seconds: Math.round((Date.now() - t0) / 1000) });
  let job = jobOf(proj);
  // One retry through resume on a failure (a timed-out call, a parse miss), never a fresh job.
  if (r.code === 1 && job && job.state && job.state.phase !== 'done') {
    log(`${family}/${a}/${c.id}: failed at ${job.state.next || job.state.phase}, resuming once`);
    const t1 = Date.now();
    r = await run(process.execPath, [join(DESK, 'runner', 'run.mjs'), 'resume', job.id, '--project', proj, '--timeout', TIMEOUT[family]], { cwd: DESK, logFile });
    manifest.attempts.push({ code: r.code, seconds: Math.round((Date.now() - t1) / 1000), resume: true });
    job = jobOf(proj);
  }
  manifest.exit = r.code;
  manifest.seconds = manifest.attempts.reduce((n, x) => n + x.seconds, 0);
  manifest.jobId = job?.id || null;
  manifest.phase = job?.state?.phase || null;
  manifest.failed = !!(job && job.state && job.state.phase === 'failed');
  if (manifest.failed) manifest.failedAt = `${job.state.next || ''} round ${job.state.round}: ${job.state.waitingOn?.text || ''}`.trim();
  // A job that failed after its one resume is complete for the study: it did not reach the bar, and its last file is audited like any other.
  manifest.done = !!(job && job.state && (job.state.phase === 'done' || job.state.phase === 'failed'));
  manifest.finishedAt = new Date().toISOString();
  // The audit: the proof CLI on the signed-off file, with the case's own copy lines, nothing fed back to the desks.
  if (manifest.done && existsSync(join(proj, job.state.files.final))) {
    const finalFile = join(proj, job.state.files.final);
    const auditOut = join(job.dir, 'renders', 'audit');
    const auditArgs = [join(DESK, 'proof', 'cli.mjs'), 'check', finalFile, '--sizes', job.state.sizes.join(','), '--out', auditOut, '--brand', join(proj, '.desk', 'DESIGN.md'), '--must-appear', ...c.mustAppear];
    const ar = await run(process.execPath, auditArgs, { cwd: proj, logFile: null });
    let audit = null;
    try { audit = JSON.parse(ar.out.slice(ar.out.indexOf('{'))); } catch { audit = { error: ar.out.slice(0, 500) }; }
    writeFileSync(join(proj, 'audit.json'), JSON.stringify(audit, null, 1));
    manifest.audit = audit && !audit.error ? { pass: audit.pass, failures: (audit.renders || []).reduce((n, x) => n + (x.failures?.length || 0), 0) } : { error: true };
  }
  writeFileSync(manifestFile, JSON.stringify(manifest, null, 1));
  const last = job?.state?.scores?.at(-1);
  log(`${family}/${a}/${c.id}: exit ${r.code} in ${manifest.seconds}s, ${job?.state?.round || 0} rounds, average ${last?.average ?? '-'}, cost ${job?.state?.cost?.total?.toFixed?.(2) ?? '-'}, audit ${manifest.audit ? (manifest.audit.pass ? 'pass' : manifest.audit.failures + ' failures') : '-'}`);
  return manifest;
}

const results = [];
let next = 0;
async function worker() {
  while (next < work.length) {
    const item = work[next++];
    try { results.push(await one(item)); } catch (e) { log(`${family}/${item.a}/${item.c.id}: runner error ${e.message}`); results.push({ family, arm: item.a, case: item.c.id, error: e.message }); }
  }
}
await Promise.all(Array.from({ length: Math.min(parallel, work.length) }, worker));
const done = results.filter(r => r.done).length;
log(`${family}: ${done} of ${work.length} done`);
