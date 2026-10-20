# Desk Studio proof ablation, study record

The complete record of the study behind "The judge cannot see the margin: a paired ablation of a mechanical proof step in a model-run design pipeline" (Aditya Reddy, October 2026). The pipeline is Desk Studio, https://github.com/adityareddy-dev/deskstudio. What is here: `cases.json`, `exp-run.mjs` (the batch runner), `recheck.mjs`, `analyze.mjs`, `notes-extract.mjs`, `coding-summary.mjs`, `figures.mjs`, `render-figs.mjs`, the outputs `results.md`, `results.json`, `results-coding.md`, `recheck-summary.json`, `coding.json`, `notes.json`, the figures, the batch logs, and under `jobs/<family>/<arm>/<case>/` every per-job record including the round renders. `jobs-nano-discarded/` holds the three OpenAI jobs set aside before analysis. The note below was written at 01:25 CDT on 2026-10-20, before any job had finished, and is kept as written apart from the dated change it records.

---

# Proof ablation: does a mechanical proof step change what a design model fixes?

Written 2026-10-20 01:25 CDT, before any job of the study had finished. Jobs started 01:23 CDT on Adi's PC (24 logical CPUs, 31 GB).

## Question

Desk Studio runs a design job as a loop: three roughs, an Art Director's pick, a polish round by a builder model, a mechanical proof of the rendered pixels, and a Creative Director's sign-off against a rubric. Proof fails the round when the real render overflows, breaks the platform's safe zone, has text under the contrast ratio, uses a font size off the brand scale, uses a colour off the palette, or is missing required copy. The question is whether that step changes the outcome, or whether the director models already catch those faults from the screenshots.

## Design

Two arms, paired by case, in two model families.

- Proof on: the shipped pipeline. A failed proof sends its failures to the builder as notes and costs a round.
- Proof off: `desk-run --no-proof`, added for this study (runner/run.mjs). The round still renders, the Creative Director still sees the screenshots and the same rubric, but no check runs and the sign-off prompt says "No mechanical proof ran this round." instead of "Proof passed this round". Nothing else differs.

Fifteen cases (`cases.json`): a LinkedIn card (1200x627) and an Instagram portrait card (1080x1350) for four made-up brands used by the public evals (Northlight, Quill, Ferro, Desk Studio's own), each with three required copy lines. Every case runs once per arm per family, 60 jobs. Round cap 6, the default.

Families: Anthropic at the studio preset (opus director, sonnet senior, haiku builder); OpenAI at the registry's tier mapping (gpt-6-astra director, gpt-6.1-sol senior, gpt-6-luna builder). Same cases, same arms, so the finding is not about one vendor.

Order: on and off interleaved per case, both families concurrently, so the hour of the night cannot favour one arm.

Change, 01:38 CDT, after three OpenAI jobs: the OpenAI builder is gpt-6.1-sol (the mini tier), not gpt-6-luna (nano). With nano as builder the first on-arm job failed twice at the round cap because the builder returned no HTML file, and the first off-arm job spent six rounds on taste notes it could not act on, so both arms would have measured the builder, not the proof step. The verified OpenAI configuration in the public repo (evals/providers/openai-2026-10-19) uses mini as builder and is what the study now runs. Senior and builder are then the same model in the OpenAI family, so the senior escalation at round 4 changes nothing there; in the Anthropic family it moves the pen from haiku to sonnet. The Art Director's pen (the next rung) needs round 7 and cannot occur at a cap of 6 in either family. The three nano jobs are kept under jobs-nano-discarded/ and are not in the analysis. The per-call timeout is 6 minutes for OpenAI (five codex calls stalled for 13 minutes with no output in the first batch) and 12 for Anthropic.

## Measures, per job, from `.desk/jobs/<id>/state.json`

- Reached the bar or not (every axis 8 or above, average 8.5 or above), rounds used, cost at list price (from the CLI token counts).
- Per-axis sign-off scores at the final round, and at every round.
- Proof on: failures per round by check (overflow, safe zone, contrast, type scale, palette, copy).
- Escalations: rounds where the pen went to the senior model or the Art Director.
- The hidden audit (`audit.json`): after the job ends, the proof CLI runs once on the signed-off `final.html` with the case's own copy lines, and the desks never see it. In the on arm this must pass by construction. In the off arm it counts the mechanical faults that reached sign-off.
- The Creative Director's notes, round by round, coded for whether they name a mechanical fault (overflow, cut-off text, contrast, missing copy, wrong colour, wrong size) or a taste fault (hierarchy, composition, originality).

## Hypotheses, stated before the data

H1. With proof off, signed-off work carries mechanical faults the director passed (audit failures > 0 in a material share of off-arm jobs); with proof on, zero.
H2. Proof on uses more rounds and costs more per job, because proof fails rounds the director would have passed.
H3. The director's scores do not fall when proof is off: the rubric average at sign-off is the same or higher, which is what it looks like when a judge cannot see what it is not checking.
H4. The notes differ in kind: with proof on, the builder's notes are mostly mechanical in early rounds and taste in late rounds; with proof off, the director's notes are mostly taste throughout and name mechanical faults rarely.

If H1 fails (the director catches the same faults), the finding is that proof is redundant at these tiers, which is also worth publishing.

## Analysis plan

Paired within family by case: Wilcoxon signed-rank on rounds, cost and average; McNemar on reached-the-bar; counts of audit failures by check in the off arm; a table per family and a pooled one. n = 15 pairs per family, 30 pooled. Effect sizes with the tests; no claim beyond what 15 pairs carry.

## Files

- `cases.json`, `exp-run.mjs`, `batch-*.log`, `jobs/<family>/<arm>/<case>/` with `manifest.json`, `run.log`, `audit.json` and the project's `.desk/`.
- `analyze.mjs` writes `results.json` and `results.md`.
- The runner change is the `--no-proof` flag in the public repo's `runner/run.mjs`, kept on a branch until the write-up is out.
