# Fact sheet for the write-up (final data, 60 of 60 jobs, 2026-10-20 02:30 CDT)

Every number here is copied from results.md, results-coding.md or recheck-summary.json in this directory. Cite the table you took a number from in a source comment.

## Design (see README.md, written 01:25 CDT before any job finished, and sections/method.md)
- 15 cases x 2 arms (proof on, proof off) x 2 model families (Anthropic: opus director, sonnet senior, haiku builder; OpenAI: gpt-6-astra director, gpt-6.1-sol senior and builder) = 60 jobs, 30 complete pairs, 15 per family. 0 jobs failed, 3 OpenAI jobs were resumed once (their cost totals are flagged as incomplete).
- Round cap 6. Proof off = the same loop with the checks skipped (`--no-proof`); the round still renders and the Creative Director still scores screenshots; the only prompt difference is one line in the sign-off call.
- Hidden audit: the proof CLI run once on the signed-off final.html with the case's own copy lines; no desk sees it.
- Offline recheck: the checks re-run on every saved round render of every job (both arms), from the saved DOM and pixel captures; reproduces the on-arm proof results exactly.
- Three nano-builder OpenAI jobs were discarded at 01:38 CDT (README change note) before any other OpenAI job finished.

## H1 (confirmed): signed-off work carries faults the director passed. Source: results.md, H1 tables.
- Among jobs that reached the bar (signed off): proof off 17/17 files fail the audit (Anthropic 11/11, OpenAI 6/6); proof on 0/17 (Anthropic 0/14, OpenAI 0/3).
- Among all 30 jobs per arm: off 29/30 fail (Anthropic 14/15, OpenAI 15/15); on 6/30 (Anthropic 1/15, OpenAI 5/15). Every one of the 6 on-arm failures is a job that ended at the six-round cap after a failing proof round, so it was handed back under the bar with the proof report attached, not signed off.
- Audit failures pooled, off arm: safe-zone 116 items in 29/30 jobs, type-scale 7 in 4 jobs, contrast 4 in 1 job, palette 2 in 1 job. On arm: safe-zone 9 in 5 jobs, contrast 6 in 1 job.
- Mean faults in the signed-off file (figure 1): Anthropic off 5.8, Anthropic on 0.2, OpenAI off 2.8, OpenAI on 0.8 (all-jobs means).
- By size (off, pooled): ig-post 72 items in 29/30 jobs, linkedin 57 in 20/30. Every brand failed in every off job except deskstudio (5/6).

## H2 (refuted in direction for cost; rounds not significant). Source: results.md, H2 tables.
- Cost per job (USD list): Anthropic on 0.735 vs off 0.985, diff -0.250, 95% CI [-0.462, -0.053], exact Wilcoxon p = 0.064, dz -0.60. OpenAI on 1.413 vs off 1.638, diff -0.225, CI [-0.513, 0.072], p = 0.169. Pooled diff -0.237, CI [-0.410, -0.058], p = 0.021.
- Rounds: Anthropic 3.87 vs 3.33 (+0.53, CI [-0.53, 1.53], p = 0.265); OpenAI 5.47 vs 4.67 (+0.80, CI [-0.20, 1.93], p = 0.250); pooled +0.67, CI [-0.07, 1.43], p = 0.101.
- Sign-off calls (director tier): Anthropic 1.73 vs 3.33 (p = 0.011); OpenAI 2.93 vs 4.67 (p = 0.013); pooled 2.33 vs 4.00 (p < 0.001, r = -0.76).
- Escalations to the senior pen: Anthropic 0.07 vs 0.87 (p = 0.094); OpenAI 0.33 vs 1.93 (p = 0.005); pooled 0.20 vs 1.40 (p < 0.001, r = -0.91).
- Cost by tier, pooled: director -0.235 (p = 0.008), senior -0.061 (p = 0.014), builder +0.059 (p = 0.003). Proof moves spend from the director tier to the builder tier.
- Wall seconds: pooled 314 vs 386 (-72, CI [-134, -10], p = 0.044).
- Where the on-arm rounds go: first round failed proof in 29/30 jobs; mean 2.33 proof-failed rounds per job, 7.77 failure items per job; rounds to first proof pass mean 2.23, median 2; no job never passed. Checks by job-round, all rounds: safe-zone 63, type-scale 7, contrast 5, overflow 2, copy 1.

## Re-breaks (recheck-summary.json, computed 02:36 CDT)
- Mean faults per job by round, offline recheck (jobs at the round in brackets):
  Anthropic on: r1 5.07 (15), r2 0.67 (15), r3 2.00 (12), r4 1.13 (8), r5 0.80 (5), r6 1.00 (3).
  Anthropic off: r1 6.40 (15), r2 6.00 (11), r3 5.11 (9), r4 6.67 (6), r5 5.60 (5), r6 2.75 (4).
  OpenAI on: r1 2.20 (15), r2 0.13 (15), r3 1.60 (15), r4 0.77 (13), r5 2.17 (12), r6 1.00 (12).
  OpenAI off: r1 2.93 (15), r2 3.46 (13), r3 3.92 (13), r4 2.80 (10), r5 2.50 (10), r6 2.44 (9).
- In the on arm, 19 of 30 jobs had a proof failure after an earlier round had passed (33 such rounds): a polish round acting on taste notes re-broke a mechanical rule, most often the safe zone. So the check has to run every round, not once.
- In the off arm, faults rose from one round to the next in 21 of 90 round transitions. No off-arm job was clean at round 1; one on-arm job was (anthropic/on/ql-phone).

## H3 (confirmed): scores do not fall without proof. Source: results.md, H3 tables.
- Final rubric average: Anthropic 8.50 on vs 8.49 off (p = 0.595); OpenAI 8.47 vs 8.37 (p = 0.355); pooled +0.05, CI [-0.08, 0.17], p = 0.307.
- Reached the bar: Anthropic 14/15 on vs 11/15 off (McNemar p = 0.375); OpenAI 3/15 vs 6/15 (p = 0.375); pooled 17/30 in each arm.
- OpenAI jobs mostly end at the cap under the bar in both arms; their final originality axis averages 6.53 (on) and 6.87 (off), and every other axis is 8 or above on average. The OpenAI director holds originality at 6 and the builder does not move it.
- Exploratory: first sign-off average pooled 8.43 on vs 8.27 off (+0.16, CI [0.03, 0.31], p = 0.024, unadjusted). Per-axis finals: no difference beyond noise except OpenAI typography +0.47 (p = 0.063, unadjusted).

## H4 (confirmed with a qualification): the notes differ in kind. Source: results-coding.md.
- Two independent readers coded all 754 Creative Director notes into 15 categories (6 mechanical mirroring the checks, 8 taste, other); a third settled 73 disagreements. Agreement: 90% at category level, Cohen's kappa 0.88; 98% at the mechanical/taste/other level, kappa 0.90.
- Proof off: 68 of 522 director notes (13%) name a mechanical fault (safe zone 28, type scale 20, palette 11, overflow 5, copy 3, contrast 1). Proof on: 3 of 232 (1%). Per job: 2.27 mechanical notes off vs 0.10 on; taste notes 14.9 off vs 7.6 on (the off arm has more sign-offs because every round gets one).
- So the director without proof does name mechanical faults sometimes, about one note in eight, and still signs off 17 of 17 files with faults in them. The faults it names are also the ones it can see at screenshot scale (a size, a colour); the safe zone, a 6% margin, is the one it passes most.
- Proof on, round 1: 109 proof failure items went to the builder across 30 jobs and only 4 director notes exist (one job passed proof at round 1), so 97% of what the builder heard in round 1 was mechanical. From round 2 the director's notes are taste: 0 to 3% mechanical per round.
- Six notes were coded other: the OpenAI off-arm director once asked for "the required overflow, contrast and safe-zone checks" to be run before sign-off, noting "this round has no mechanical proof" (openai/off/ds-proof/r1/4), and three times asked for the embedded font to be verified because "screenshots alone cannot confirm" it. Two Anthropic off-arm notes say the copy is locked and nothing changes.
- The earlier regular-expression coding (results.md H4) overcounted mechanical notes at 18 to 19% because "edge" also matches layout talk ("the right edge of the grid"); the two-reader coding replaces it and both are kept in the record.

## Costs of the study
- Pooled mean cost per job 1.07 on, 1.31 off (list price). Anthropic jobs were paid through a subscription, OpenAI through a subscription too; list prices are what the runner computes, not what was billed.
