// Pulls every Creative Director sign-off note out of the job state files into notes.json for coding.
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const HERE = dirname(fileURLToPath(import.meta.url));
const notes = [];
let jobs = 0;
for (const family of ['anthropic', 'openai']) for (const arm of ['on', 'off']) {
  const armDir = join(HERE, 'jobs', family, arm);
  if (!existsSync(armDir)) continue;
  for (const caseId of readdirSync(armDir)) {
    const proj = join(armDir, caseId);
    const manifest = join(proj, 'manifest.json');
    if (!existsSync(manifest) || !JSON.parse(readFileSync(manifest, 'utf8')).done) continue;
    const jobsDir = join(proj, '.desk', 'jobs');
    const jobId = readdirSync(jobsDir).sort().at(-1);
    const state = JSON.parse(readFileSync(join(jobsDir, jobId, 'state.json'), 'utf8'));
    jobs++;
    for (const s of state.scores || []) {
      (s.notes || []).forEach((text, i) => {
        const m = /^([a-z ]+):\s*(.*)$/s.exec(text);
        notes.push({ id: `${family}/${arm}/${caseId}/r${s.round}/${i + 1}`, family, arm, case: caseId, round: s.round, average: s.average, pass: s.pass, axis: m ? m[1].trim() : null, text: m ? m[2].trim() : text.trim() });
      });
    }
  }
}
writeFileSync(join(HERE, 'notes.json'), JSON.stringify(notes, null, 1));
console.log(`${notes.length} notes from ${jobs} jobs`);
