# Proof ablation results

Generated 2026-10-20T02:30:00-05:00 (America/Chicago) by analyze.mjs from `C:/Users/adity/Desktop/Adi/deskstudio-research/proof-ablation-2026-10-20`. Differences are proof on minus proof off. Exact two-sided Wilcoxon signed-rank p (zeros dropped, average ranks for ties) and exact McNemar p; 95% intervals are seeded percentile bootstraps of the mean paired difference, dz is mean difference over its standard deviation, r is the matched-pairs rank-biserial correlation (positive means on is larger).

Jobs done: 60 of 60. Complete pairs (same family and case done in both arms): 30 (Anthropic 15, OpenAI 15). 

## Jobs not done (skipped)

None, all jobs are done.

## Progress and arm summary (all done jobs)

| Scope | Arm | Jobs | Done | Reached the bar | Mean rounds | Mean cost (USD list) | Mean final average | Mean seconds | Audit failing |
|---|---|---|---|---|---|---|---|---|---|
| Anthropic | on | 15 | 15 | 14/15 (93%) | 3.87 | 0.735 | 8.50 | 282 | 1/15 |
| Anthropic | off | 15 | 15 | 11/15 (73%) | 3.33 | 0.985 | 8.49 | 380 | 14/15 |
| OpenAI | on | 15 | 15 | 3/15 (20%) | 5.47 | 1.413 | 8.47 | 347 | 5/15 |
| OpenAI | off | 15 | 15 | 6/15 (40%) | 4.67 | 1.638 | 8.37 | 392 | 15/15 |
| Pooled | on | 30 | 30 | 17/30 (57%) | 4.67 | 1.074 | 8.49 | 314 | 6/30 |
| Pooled | off | 30 | 30 | 17/30 (57%) | 4.00 | 1.311 | 8.43 | 386 | 29/30 |

### Data warnings

| Job | Warning |
|---|---|
| openai/on/ds-contrib | cost incomplete (some token counts unknown) |
| openai/on/ds-contrib | 2 attempts (resumed) |
| openai/off/nl-city | cost incomplete (some token counts unknown) |
| openai/off/nl-city | 2 attempts (resumed) |
| openai/off/fe-spindle | cost incomplete (some token counts unknown) |
| openai/off/fe-spindle | 2 attempts (resumed) |

## H1. Signed-off work carries faults the director passed

> With proof off, audit failures > 0 in a material share of off-arm jobs; with proof on, zero. The audit is the proof CLI run once on the signed-off final.html with the case copy, never shown to the desks. Signed-off means the job reached the bar; the all-done columns include jobs that hit the round cap under the bar.

| Scope | Arm | Done | Audited | Audit failing (all done) | 95% CI | Audit failures (count) | Reached the bar, audited | Reached and audit failing | 95% CI |
|---|---|---|---|---|---|---|---|---|---|
| Anthropic | on | 15 | 15 | 1/15 (7%) | [0.01, 0.30] | 3 | 14 | 0/14 (0%) | [0.00, 0.22] |
| Anthropic | off | 15 | 15 | 14/15 (93%) | [0.70, 0.99] | 87 | 11 | 11/11 (100%) | [0.74, 1.00] |
| OpenAI | on | 15 | 15 | 5/15 (33%) | [0.15, 0.58] | 12 | 3 | 0/3 (0%) | [0.00, 0.56] |
| OpenAI | off | 15 | 15 | 15/15 (100%) | [0.80, 1.00] | 42 | 6 | 6/6 (100%) | [0.61, 1.00] |
| Pooled | on | 30 | 30 | 6/30 (20%) | [0.10, 0.37] | 15 | 17 | 0/17 (0%) | [0.00, 0.18] |
| Pooled | off | 30 | 30 | 29/30 (97%) | [0.83, 0.99] | 129 | 17 | 17/17 (100%) | [0.82, 1.00] |

### Audit failures by check

Cell: failures (jobs with at least one / jobs audited). All done jobs.

| Check | Anthropic off | OpenAI off | Pooled off | Pooled on |
|---|---|---|---|---|
| contrast | 0 (0/15) | 4 (1/15) | 4 (1/30) | 6 (1/30) |
| palette | 2 (1/15) | 0 (0/15) | 2 (1/30) | 0 (0/30) |
| safe-zone | 82 (14/15) | 34 (15/15) | 116 (29/30) | 9 (5/30) |
| type-scale | 3 (2/15) | 4 (2/15) | 7 (4/30) | 0 (0/30) |

### Audit failures by size

Cell: failures (jobs with at least one / jobs audited). All done jobs.

| Size | Anthropic off | OpenAI off | Pooled off | Pooled on |
|---|---|---|---|---|
| ig-post | 42 (14/15) | 30 (15/15) | 72 (29/30) | 7 (4/30) |
| linkedin | 45 (13/15) | 12 (7/15) | 57 (20/30) | 8 (4/30) |

### Audit failures by brand

Cell: failures (failing jobs / jobs audited for that brand). All done jobs.

| Brand | Anthropic off | OpenAI off | Pooled off | Pooled on |
|---|---|---|---|---|
| deskstudio | 8 (2/3) | 4 (3/3) | 12 (5/6) | 6 (1/6) |
| ferro | 37 (4/4) | 7 (4/4) | 44 (8/8) | 6 (3/8) |
| northlight | 15 (4/4) | 12 (4/4) | 27 (8/8) | 2 (1/8) |
| quill | 27 (4/4) | 19 (4/4) | 46 (8/8) | 1 (1/8) |

## H2. Proof on uses more rounds and costs more

> Rounds to sign-off and cost per job, paired by case within family. Rounds is the job's final round count, cost is the CLI's list-price total.

| Scope | Measure | Pairs | Mean on | Mean off | Mean diff (on-off) | 95% CI | Median diff | dz | W+ | W- | n non-zero | Exact p | r |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Anthropic | Rounds | 15 | 3.87 | 3.33 | +0.53 | [-0.53, 1.53] | 1.00 | 0.25 | 70.5 | 34.5 | 14 | 0.265 | 0.34 |
| Anthropic | Cost (USD list) | 15 | 0.735 | 0.985 | -0.250 | [-0.462, -0.053] | -0.121 | -0.60 | 27.0 | 93.0 | 15 | 0.064 | -0.55 |
| OpenAI | Rounds | 15 | 5.47 | 4.67 | +0.80 | [-0.20, 1.93] | 0.00 | 0.36 | 17.0 | 4.0 | 6 | 0.250 | 0.62 |
| OpenAI | Cost (USD list) | 15 | 1.413 | 1.638 | -0.225 | [-0.513, 0.072] | -0.301 | -0.38 | 35.0 | 85.0 | 15 | 0.169 | -0.42 |
| Pooled | Rounds | 30 | 4.67 | 4.00 | +0.67 | [-0.07, 1.43] | 0.00 | 0.31 | 149.0 | 61.0 | 20 | 0.101 | 0.42 |
| Pooled | Cost (USD list) | 30 | 1.074 | 1.311 | -0.237 | [-0.410, -0.058] | -0.223 | -0.47 | 121.0 | 344.0 | 30 | 0.021 | -0.48 |

### Secondary: cost by tier, sign-off calls, escalations, wall time

| Scope | Measure | Pairs | Mean on | Mean off | Mean diff (on-off) | 95% CI | Median diff | dz | W+ | W- | n non-zero | Exact p | r |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Anthropic | Cost, director | 15 | 0.548 | 0.740 | -0.191 | [-0.350, -0.042] | -0.127 | -0.61 | 27.0 | 93.0 | 15 | 0.064 | -0.55 |
| Anthropic | Cost, senior | 15 | 0.167 | 0.227 | -0.060 | [-0.113, -0.011] | -0.005 | -0.57 | 35.0 | 85.0 | 15 | 0.169 | -0.42 |
| Anthropic | Cost, builder | 15 | 0.020 | 0.018 | +0.002 | [-0.006, 0.008] | 0.007 | 0.12 | 79.0 | 41.0 | 15 | 0.303 | 0.32 |
| Anthropic | Sign-off calls | 15 | 1.73 | 3.33 | -1.60 | [-2.60, -0.67] | -1.00 | -0.82 | 7.0 | 71.0 | 12 | 0.011 | -0.82 |
| Anthropic | Escalations | 15 | 0.07 | 0.87 | -0.80 | [-1.53, -0.13] | 0.00 | -0.56 | 1.5 | 19.5 | 6 | 0.094 | -0.86 |
| Anthropic | Wall seconds | 15 | 282 | 380 | -98 | [-196, -5] | -59 | -0.50 | 31.0 | 89.0 | 15 | 0.107 | -0.48 |
| OpenAI | Cost, director | 15 | 0.992 | 1.271 | -0.279 | [-0.534, -0.022] | -0.311 | -0.53 | 29.0 | 91.0 | 15 | 0.083 | -0.52 |
| OpenAI | Cost, senior | 15 | 0.168 | 0.231 | -0.063 | [-0.117, -0.008] | -0.060 | -0.56 | 26.0 | 94.0 | 15 | 0.055 | -0.57 |
| OpenAI | Cost, builder | 15 | 0.252 | 0.136 | +0.116 | [0.057, 0.170] | 0.129 | 1.01 | 109.0 | 11.0 | 15 | 0.003 | 0.82 |
| OpenAI | Sign-off calls | 15 | 2.93 | 4.67 | -1.73 | [-2.87, -0.47] | -3.00 | -0.72 | 14.5 | 90.5 | 14 | 0.013 | -0.72 |
| OpenAI | Escalations | 15 | 0.33 | 1.93 | -1.60 | [-2.33, -0.80] | -2.00 | -0.98 | 3.0 | 63.0 | 11 | 0.005 | -0.91 |
| OpenAI | Wall seconds | 15 | 347 | 392 | -46 | [-115, 30] | -91 | -0.31 | 40.0 | 80.0 | 15 | 0.277 | -0.33 |
| Pooled | Cost, director | 30 | 0.770 | 1.005 | -0.235 | [-0.383, -0.084] | -0.161 | -0.55 | 106.0 | 359.0 | 30 | 0.008 | -0.54 |
| Pooled | Cost, senior | 30 | 0.168 | 0.229 | -0.061 | [-0.100, -0.024] | -0.031 | -0.57 | 114.0 | 351.0 | 30 | 0.014 | -0.51 |
| Pooled | Cost, builder | 30 | 0.136 | 0.077 | +0.059 | [0.025, 0.095] | 0.011 | 0.59 | 375.0 | 90.0 | 30 | 0.003 | 0.61 |
| Pooled | Sign-off calls | 30 | 2.33 | 4.00 | -1.67 | [-2.40, -0.90] | -2.50 | -0.77 | 42.5 | 308.5 | 26 | <0.001 | -0.76 |
| Pooled | Escalations | 30 | 0.20 | 1.40 | -1.20 | [-1.73, -0.63] | -0.50 | -0.77 | 7.0 | 146.0 | 17 | <0.001 | -0.91 |
| Pooled | Wall seconds | 30 | 314 | 386 | -72 | [-134, -10] | -76 | -0.41 | 135.0 | 330.0 | 30 | 0.044 | -0.42 |

### Where the extra rounds come from (proof-on jobs)

| Scope | On jobs | First round failed proof | 95% CI | Jobs with any proof fail | Mean proof-failed rounds | Mean proof failure items | Rounds to first proof pass (mean / median) | Never passed proof |
|---|---|---|---|---|---|---|---|---|
| Anthropic | 15 | 14/15 (93%) | [0.70, 0.99] | 14/15 (93%) | 2.13 | 8.40 | 2.40 / 2.0 | 0 |
| OpenAI | 15 | 15/15 (100%) | [0.80, 1.00] | 15/15 (100%) | 2.53 | 7.13 | 2.07 / 2.0 | 0 |
| Pooled | 30 | 29/30 (97%) | [0.83, 0.99] | 29/30 (97%) | 2.33 | 7.77 | 2.23 / 2.0 | 0 |

Checks that fired, counted as job-rounds in which the check appeared (round 1 only, and every round). Per-round check names come from saved proof reports when present, else from the `proof round N: K failures (checks)` lines in run.log.

| Check | Anthropic round 1 | Anthropic all rounds | OpenAI round 1 | OpenAI all rounds | Pooled round 1 | Pooled all rounds |
|---|---|---|---|---|---|---|
| contrast | 0 | 0 | 0 | 5 | 0 | 5 |
| copy | 0 | 1 | 0 | 0 | 0 | 1 |
| overflow | 0 | 1 | 0 | 1 | 0 | 2 |
| safe-zone | 14 | 31 | 15 | 32 | 29 | 63 |
| type-scale | 2 | 3 | 0 | 4 | 2 | 7 |

Source of the per-round check names for failing proof rounds: log 70.

## H3. The director's scores do not fall when proof is off

> Rubric average at sign-off is the same or higher with proof off. Final average is the last sign-off's average; a job with no sign-off has none and drops out of that pair.

| Scope | Measure | Pairs | Mean on | Mean off | Mean diff (on-off) | 95% CI | Median diff | dz | W+ | W- | n non-zero | Exact p | r |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Anthropic | Final average | 15 | 8.50 | 8.49 | +0.01 | [-0.20, 0.17] | 0.00 | 0.02 | 39.5 | 26.5 | 11 | 0.595 | 0.20 |
| OpenAI | Final average | 15 | 8.47 | 8.37 | +0.10 | [-0.05, 0.27] | 0.00 | 0.31 | 44.5 | 21.5 | 11 | 0.355 | 0.35 |
| Pooled | Final average | 30 | 8.49 | 8.43 | +0.05 | [-0.08, 0.17] | 0.00 | 0.15 | 158.5 | 94.5 | 22 | 0.307 | 0.25 |

### Reached the bar (every axis 8 or above, average 8.5 or above, no open wait)

| Scope | Pairs | Reached on | Reached off | Both | On only | Off only | Neither | McNemar exact p |
|---|---|---|---|---|---|---|---|---|
| Anthropic | 15 | 14/15 (93%) | 11/15 (73%) | 10 | 4 | 1 | 0 | 0.375 |
| OpenAI | 15 | 3/15 (20%) | 6/15 (40%) | 2 | 1 | 4 | 8 | 0.375 |
| Pooled | 30 | 17/30 (57%) | 17/30 (57%) | 12 | 5 | 5 | 8 | 1.000 |

### Secondary: first sign-off average and final per-axis means (exploratory, p unadjusted for the eight axes)

| Scope | Measure | Pairs | Mean on | Mean off | Mean diff (on-off) | 95% CI | Median diff | dz | W+ | W- | n non-zero | Exact p | r |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Anthropic | First sign-off average | 15 | 8.42 | 8.27 | +0.15 | [-0.04, 0.41] | 0.00 | 0.32 | 44.0 | 22.0 | 11 | 0.357 | 0.33 |
| OpenAI | First sign-off average | 15 | 8.44 | 8.28 | +0.17 | [0.00, 0.33] | 0.25 | 0.50 | 81.0 | 24.0 | 14 | 0.075 | 0.54 |
| Pooled | First sign-off average | 30 | 8.43 | 8.27 | +0.16 | [0.03, 0.31] | 0.07 | 0.39 | 245.0 | 80.0 | 25 | 0.024 | 0.51 |
| Anthropic | Final hierarchy | 15 | 8.93 | 8.93 | 0.00 | [-0.20, 0.20] | 0.00 | 0.00 | 1.5 | 1.5 | 2 | 1.000 | 0.00 |
| Anthropic | Final typography | 15 | 8.33 | 8.40 | -0.07 | [-0.67, 0.47] | 0.00 | -0.06 | 17.5 | 18.5 | 8 | 1.000 | -0.03 |
| Anthropic | Final spacing | 15 | 7.93 | 8.00 | -0.07 | [-0.27, 0.13] | 0.00 | -0.15 | 2.0 | 4.0 | 3 | 1.000 | -0.33 |
| Anthropic | Final colour | 15 | 8.93 | 9.00 | -0.07 | [-0.20, 0.00] | 0.00 | -0.26 | 0.0 | 1.0 | 1 | 1.000 | -1.00 |
| Anthropic | Final composition | 15 | 7.87 | 7.87 | 0.00 | [-0.40, 0.40] | 0.00 | 0.00 | 5.0 | 5.0 | 4 | 1.000 | 0.00 |
| Anthropic | Final originality | 15 | 8.07 | 7.80 | +0.27 | [-0.07, 0.60] | 0.00 | 0.38 | 12.5 | 2.5 | 5 | 0.313 | 0.67 |
| Anthropic | Final brand | 15 | 9.00 | 9.00 | 0.00 | [0.00, 0.00] | 0.00 | - | 0.0 | 0.0 | 0 | 1.000 | - |
| Anthropic | Final copy | 15 | 8.93 | 8.93 | 0.00 | [-0.20, 0.20] | 0.00 | 0.00 | 1.5 | 1.5 | 2 | 1.000 | 0.00 |
| OpenAI | Final hierarchy | 15 | 9.00 | 9.00 | 0.00 | [0.00, 0.00] | 0.00 | - | 0.0 | 0.0 | 0 | 1.000 | - |
| OpenAI | Final typography | 15 | 8.73 | 8.27 | +0.47 | [0.13, 0.80] | 0.00 | 0.63 | 32.0 | 4.0 | 8 | 0.063 | 0.78 |
| OpenAI | Final spacing | 15 | 8.33 | 8.13 | +0.20 | [0.00, 0.40] | 0.00 | 0.48 | 6.0 | 0.0 | 3 | 0.250 | 1.00 |
| OpenAI | Final colour | 15 | 9.20 | 9.00 | +0.20 | [-0.07, 0.47] | 0.00 | 0.36 | 12.0 | 3.0 | 5 | 0.375 | 0.60 |
| OpenAI | Final composition | 15 | 8.00 | 7.87 | +0.13 | [-0.13, 0.40] | 0.00 | 0.26 | 7.5 | 2.5 | 4 | 0.625 | 0.50 |
| OpenAI | Final originality | 15 | 6.53 | 6.87 | -0.33 | [-0.80, 0.13] | 0.00 | -0.34 | 5.0 | 16.0 | 6 | 0.313 | -0.52 |
| OpenAI | Final brand | 15 | 8.93 | 8.80 | +0.13 | [-0.13, 0.40] | 0.00 | 0.26 | 7.5 | 2.5 | 4 | 0.625 | 0.50 |
| OpenAI | Final copy | 15 | 9.00 | 9.00 | 0.00 | [0.00, 0.00] | 0.00 | - | 0.0 | 0.0 | 0 | 1.000 | - |
| Pooled | Final hierarchy | 30 | 8.97 | 8.97 | 0.00 | [-0.10, 0.10] | 0.00 | 0.00 | 1.5 | 1.5 | 2 | 1.000 | 0.00 |
| Pooled | Final typography | 30 | 8.53 | 8.33 | +0.20 | [-0.17, 0.53] | 0.00 | 0.20 | 92.0 | 44.0 | 16 | 0.229 | 0.35 |
| Pooled | Final spacing | 30 | 8.13 | 8.07 | +0.07 | [-0.10, 0.23] | 0.00 | 0.15 | 14.0 | 7.0 | 6 | 0.688 | 0.33 |
| Pooled | Final colour | 30 | 9.07 | 9.00 | +0.07 | [-0.10, 0.23] | 0.00 | 0.15 | 14.0 | 7.0 | 6 | 0.688 | 0.33 |
| Pooled | Final composition | 30 | 7.93 | 7.87 | +0.07 | [-0.17, 0.30] | 0.00 | 0.10 | 21.5 | 14.5 | 8 | 0.789 | 0.19 |
| Pooled | Final originality | 30 | 7.30 | 7.33 | -0.03 | [-0.33, 0.27] | 0.00 | -0.04 | 31.0 | 35.0 | 11 | 0.973 | -0.06 |
| Pooled | Final brand | 30 | 8.97 | 8.90 | +0.07 | [-0.07, 0.20] | 0.00 | 0.18 | 7.5 | 2.5 | 4 | 0.625 | 0.50 |
| Pooled | Final copy | 30 | 8.97 | 8.97 | 0.00 | [-0.10, 0.10] | 0.00 | 0.00 | 1.5 | 1.5 | 2 | 1.000 | 0.00 |

## H4. The notes differ in kind

> With proof on the builder's notes are mostly mechanical early and taste late; with proof off the director's notes are mostly taste and rarely name a mechanical fault. A Creative Director note is coded mechanical if it matches `overflow|cut off|clipped|contrast|legib|unreadable|missing|not present|safe zone|edge|bleed|off the palette|off-palette|hex|font size|type scale|too small|smaller than` (case-insensitive), taste otherwise. "No edge" repeats the share with the term `edge` removed, because it also matches layout talk such as "the right edge" or "left edge at 72px". "Incl. proof" adds the proof failure items sent to the builder on the on arm, all mechanical by construction. Pooled across families, all done jobs.

| Round | On: jobs reaching | On: proof items | On: CD mechanical | On: CD taste | On: CD mechanical share | On: CD share, no edge | On: mechanical share incl. proof | Off: jobs reaching | Off: CD mechanical | Off: CD taste | Off: CD mechanical share | Off: CD share, no edge |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 30 | 109 | 1 | 3 | 25% | 0% | 97% | 30 | 27 | 97 | 22% | 5% |
| 2 | 30 | 12 | 14 | 59 | 19% | 3% | 31% | 24 | 20 | 94 | 18% | 3% |
| 3 | 27 | 48 | 13 | 32 | 29% | 7% | 66% | 22 | 19 | 72 | 21% | 2% |
| 4 | 21 | 19 | 7 | 41 | 15% | 0% | 39% | 16 | 14 | 59 | 19% | 4% |
| 5 | 17 | 30 | 5 | 30 | 14% | 9% | 54% | 15 | 5 | 57 | 8% | 0% |
| 6 | 15 | 15 | 4 | 23 | 15% | 0% | 45% | 13 | 11 | 47 | 19% | 3% |
| all | 30 | 233 | 44 | 188 | 19% | 3% | 60% | 30 | 96 | 426 | 18% | 3% |

### Early against late rounds, by family

| Scope | Arm | Band | Sign-offs | CD notes | CD mechanical | CD taste | CD mechanical share | CD share, no edge | Proof items | Mechanical share incl. proof |
|---|---|---|---|---|---|---|---|---|---|---|
| Anthropic | on | round 1 | 1 | 4 | 1 | 3 | 25% | 0% | 76 | 96% |
| Anthropic | on | round 2 | 9 | 37 | 9 | 28 | 24% | 3% | 10 | 40% |
| Anthropic | on | rounds 3+ | 16 | 61 | 17 | 44 | 28% | 7% | 40 | 56% |
| Anthropic | on | all rounds | 26 | 102 | 27 | 75 | 26% | 5% | 126 | 67% |
| Anthropic | off | round 1 | 15 | 62 | 19 | 43 | 31% | 6% | - | - |
| Anthropic | off | round 2 | 11 | 56 | 12 | 44 | 21% | 4% | - | - |
| Anthropic | off | rounds 3+ | 24 | 116 | 35 | 81 | 30% | 4% | - | - |
| Anthropic | off | all rounds | 50 | 234 | 66 | 168 | 28% | 5% | - | - |
| OpenAI | on | round 1 | 0 | 0 | 0 | 0 | - | - | 33 | 100% |
| OpenAI | on | round 2 | 14 | 36 | 5 | 31 | 14% | 3% | 2 | 18% |
| OpenAI | on | rounds 3+ | 30 | 94 | 12 | 82 | 13% | 2% | 72 | 51% |
| OpenAI | on | all rounds | 44 | 130 | 17 | 113 | 13% | 2% | 107 | 52% |
| OpenAI | off | round 1 | 15 | 62 | 8 | 54 | 13% | 3% | - | - |
| OpenAI | off | round 2 | 13 | 58 | 8 | 50 | 14% | 2% | - | - |
| OpenAI | off | rounds 3+ | 42 | 168 | 14 | 154 | 8% | 1% | - | - |
| OpenAI | off | all rounds | 70 | 288 | 30 | 258 | 10% | 2% | - | - |
| Pooled | on | round 1 | 1 | 4 | 1 | 3 | 25% | 0% | 109 | 97% |
| Pooled | on | round 2 | 23 | 73 | 14 | 59 | 19% | 3% | 12 | 31% |
| Pooled | on | rounds 3+ | 46 | 155 | 29 | 126 | 19% | 4% | 112 | 53% |
| Pooled | on | all rounds | 70 | 232 | 44 | 188 | 19% | 3% | 233 | 60% |
| Pooled | off | round 1 | 30 | 124 | 27 | 97 | 22% | 5% | - | - |
| Pooled | off | round 2 | 24 | 114 | 20 | 94 | 18% | 3% | - | - |
| Pooled | off | rounds 3+ | 66 | 284 | 49 | 235 | 17% | 2% | - | - |
| Pooled | off | all rounds | 120 | 522 | 96 | 426 | 18% | 3% | - | - |

### Paired: Creative Director notes per job

| Scope | Measure | Pairs | Mean on | Mean off | Mean diff (on-off) | 95% CI | Median diff | dz | W+ | W- | n non-zero | Exact p | r |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Anthropic | Mechanical CD notes per job | 15 | 1.80 | 4.40 | -2.60 | [-4.73, -0.60] | -1.00 | -0.62 | 19.0 | 72.0 | 13 | 0.065 | -0.58 |
| Anthropic | Taste CD notes per job | 15 | 5.00 | 11.20 | -6.20 | [-11.13, -2.07] | -2.00 | -0.66 | 9.0 | 69.0 | 12 | 0.016 | -0.77 |
| OpenAI | Mechanical CD notes per job | 15 | 1.13 | 2.00 | -0.87 | [-1.93, 0.13] | 0.00 | -0.41 | 16.5 | 49.5 | 11 | 0.170 | -0.50 |
| OpenAI | Taste CD notes per job | 15 | 7.53 | 17.20 | -9.67 | [-14.60, -4.53] | -10.00 | -0.94 | 11.0 | 109.0 | 15 | 0.003 | -0.82 |
| Pooled | Mechanical CD notes per job | 30 | 1.47 | 3.20 | -1.73 | [-2.93, -0.60] | -1.00 | -0.51 | 66.0 | 234.0 | 24 | 0.014 | -0.56 |
| Pooled | Taste CD notes per job | 30 | 6.27 | 14.20 | -7.93 | [-11.40, -4.60] | -7.00 | -0.81 | 38.0 | 340.0 | 27 | <0.001 | -0.80 |

Terms that triggered the mechanical code (every note, so the coding can be audited; the full note text and code are in results.json under each job): edge 120, bleed 5, safe zone 5, missing 3, contrast 3, legib 2, clipped 1, overflow 1. 116 of the 140 mechanical notes matched only on `edge`, which also matches layout wording such as "right edge", so the no-edge shares sit beside the specified ones.

## Per-job table

Final axes are in the order hierarchy, typography, spacing, colour, composition, originality, brand, copy. Proof column is round:checks(failure items) for failing rounds, `ok` for a pass, `skip` when proof was off. CD notes are round:mechanical/taste. Audit is `pass` or failure count with checks.

| Family | Arm | Case | Reached | Rounds | Cost (USD list) | Final avg | Final axes | Proof by round | Escalations | Audit | CD notes (mech/taste) |
|---|---|---|---|---|---|---|---|---|---|---|---|
| anthropic | off | ds-contrib | yes | 3 | 0.828 | 8.50 | 9/8/8/9/8/8/9/9 | skip | 0 | 5: safe-zonex5 | 1:1/3 2:1/2 3:0/4 |
| anthropic | on | ds-contrib | yes | 4 | 0.707 | 8.50 | 9/8/8/9/8/8/9/9 | 1:safe-zone(8) 2:ok 3:safe-zone(3) 4:ok | 0 | pass | 2:0/5 4:1/3 |
| anthropic | off | ds-launch | no | 6 | 1.593 | 7.88 | 9/9/7/9/6/6/9/8 | skip | 3s 0pen | pass | 1:1/3 2:1/4 3:2/4 4:3/2 5:1/3 6:2/2 |
| anthropic | on | ds-launch | yes | 6 | 0.945 | 8.50 | 9/8/8/9/8/8/9/9 | 1:safe-zone(2) 2:ok 3:safe-zone+copy(7) 4:ok 5:overflow+safe-zone(3) 6:ok | 0 | pass | 2:3/1 4:1/4 6:1/3 |
| anthropic | off | ds-proof | yes | 1 | 0.571 | 8.63 | 9/9/8/9/8/8/9/9 | skip | 0 | 3: palettex2, safe-zonex1 | 1:0/3 |
| anthropic | on | ds-proof | yes | 2 | 0.608 | 8.63 | 9/9/8/9/8/8/9/9 | 1:safe-zone(6) 2:ok | 0 | pass | 2:0/3 |
| anthropic | off | fe-event | no | 6 | 1.519 | 8.38 | 9/7/8/9/8/8/9/9 | skip | 3s 0pen | 7: safe-zonex7 | 1:1/3 2:1/6 3:0/4 4:3/5 5:1/7 6:2/2 |
| anthropic | on | fe-event | yes | 2 | 0.553 | 8.63 | 9/9/8/9/8/8/9/9 | 1:safe-zone+type-scale(7) 2:ok | 0 | pass | 2:1/2 |
| anthropic | off | fe-maker | yes | 5 | 1.182 | 8.63 | 9/9/8/9/8/8/9/9 | skip | 0 | 10: safe-zonex10 | 1:1/4 2:3/2 3:3/2 4:3/2 5:0/3 |
| anthropic | on | fe-maker | no | 6 | 0.717 | 7.50 | 8/6/7/9/6/7/9/8 | 1:safe-zone+type-scale(5) 2:ok 3:safe-zone(5) 4:type-scale(4) 5:ok 6:safe-zone(3) | 0 | 3: safe-zonex3 | 2:1/4 5:1/5 |
| anthropic | off | fe-spec | yes | 2 | 0.716 | 8.50 | 9/8/8/9/8/8/9/9 | skip | 0 | 7: safe-zonex5, type-scalex2 | 1:2/3 2:0/4 |
| anthropic | on | fe-spec | yes | 3 | 0.625 | 8.63 | 9/9/8/9/8/8/9/9 | 1:safe-zone(5) 2:safe-zone(2) 3:ok | 0 | pass | 3:1/2 |
| anthropic | off | fe-spindle | yes | 4 | 1.031 | 8.63 | 9/9/8/9/8/8/9/9 | skip | 1s 0pen | 13: safe-zonex13 | 1:2/7 2:3/7 3:3/2 4:2/1 |
| anthropic | on | fe-spindle | yes | 3 | 0.581 | 8.50 | 9/8/8/9/8/8/9/9 | 1:safe-zone(11) 2:safe-zone(3) 3:ok | 0 | pass | 3:0/4 |
| anthropic | off | nl-battery | no | 6 | 1.621 | 8.25 | 9/8/8/9/7/7/9/9 | skip | 3s 0pen | 1: safe-zonex1 | 1:2/3 2:1/4 3:2/3 4:0/5 5:2/3 6:3/2 |
| anthropic | on | nl-battery | yes | 5 | 0.966 | 8.50 | 9/8/8/9/8/8/9/9 | 1:safe-zone(5) 2:ok 3:safe-zone(6) 4:ok 5:ok | 0 | pass | 2:1/3 4:2/2 5:0/4 |
| anthropic | off | nl-city | yes | 3 | 0.849 | 8.63 | 9/9/8/9/8/8/9/9 | skip | 0 | 7: safe-zonex7 | 1:3/1 2:1/5 3:2/1 |
| anthropic | on | nl-city | yes | 4 | 0.762 | 8.50 | 9/8/8/9/8/8/9/9 | 1:safe-zone(2) 2:ok 3:safe-zone(2) 4:ok | 0 | pass | 2:0/4 4:0/4 |
| anthropic | off | nl-referral | no | 6 | 1.525 | 8.25 | 8/8/8/9/8/7/9/9 | skip | 3s 0pen | 3: safe-zonex3 | 1:0/4 2:0/4 3:0/5 4:0/7 5:0/5 6:0/5 |
| anthropic | on | nl-referral | yes | 3 | 0.598 | 8.50 | 9/8/8/9/8/8/9/9 | 1:safe-zone(5) 2:safe-zone(1) 3:ok | 0 | pass | 3:1/3 |
| anthropic | off | nl-winter | yes | 1 | 0.560 | 8.75 | 9/8/9/9/9/8/9/9 | skip | 0 | 4: safe-zonex4 | 1:0/2 |
| anthropic | on | nl-winter | yes | 4 | 0.870 | 8.50 | 9/9/8/8/8/8/9/9 | 1:safe-zone(9) 2:safe-zone(1) 3:safe-zone(1) 4:ok | 1s 0pen | pass | 4:2/2 |
| anthropic | off | ql-free | yes | 1 | 0.573 | 8.63 | 9/9/8/9/8/8/9/9 | skip | 0 | 8: safe-zonex7, type-scalex1 | 1:1/2 |
| anthropic | on | ql-free | yes | 5 | 0.805 | 8.63 | 9/9/8/9/8/8/9/9 | 1:safe-zone(2) 2:safe-zone(1) 3:ok 4:safe-zone(2) 5:ok | 0 | pass | 3:2/1 5:2/2 |
| anthropic | off | ql-launch | yes | 3 | 0.949 | 8.63 | 9/8/8/9/8/9/9/9 | skip | 0 | 2: safe-zonex2 | 1:2/1 2:1/3 3:1/2 |
| anthropic | on | ql-launch | yes | 6 | 0.740 | 8.75 | 9/9/8/9/8/9/9/9 | 1:safe-zone(5) 2:safe-zone(2) 3:ok 4:safe-zone(3) 5:safe-zone(1) 6:ok | 0 | pass | 3:2/2 6:0/2 |
| anthropic | off | ql-night | yes | 1 | 0.547 | 8.50 | 9/8/8/9/8/8/9/9 | skip | 0 | 11: safe-zonex11 | 1:1/3 |
| anthropic | on | ql-night | yes | 2 | 0.592 | 8.50 | 9/8/8/9/8/8/9/9 | 1:safe-zone(4) 2:ok | 0 | pass | 2:1/3 |
| anthropic | off | ql-phone | yes | 2 | 0.708 | 8.63 | 9/9/8/9/8/8/9/9 | skip | 0 | 6: safe-zonex6 | 1:2/1 2:0/3 |
| anthropic | on | ql-phone | yes | 3 | 0.959 | 8.75 | 9/9/8/9/8/9/9/9 | 1:ok 2:ok 3:ok | 0 | pass | 1:1/3 2:2/3 3:1/1 |
| openai | off | ds-contrib | no | 6 | 1.700 | 8.38 | 9/8/8/10/8/6/9/9 | skip | 3s 0pen | 1: safe-zonex1 | 1:0/4 2:0/3 3:1/3 4:0/3 5:0/5 6:0/4 |
| openai | on | ds-contrib | no | 6 | 1.051 | 8.13 | 9/8/8/10/7/6/8/9 | 1:safe-zone(2) 2:type-scale(2) 3:ok 4:ok 5:safe-zone(1) 6:ok | 0 | pass | 3:0/3 4:0/3 6:1/4 |
| openai | off | ds-launch | no | 6 | 1.575 | 8.25 | 9/8/8/9/8/6/9/9 | skip | 3s 0pen | 2: safe-zonex1, type-scalex1 | 1:1/4 2:2/2 3:1/4 4:0/4 5:0/3 6:0/4 |
| openai | on | ds-launch | no | 6 | 1.274 | 8.63 | 9/9/9/10/8/6/9/9 | 1:safe-zone(4) 2:ok 3:ok 4:ok 5:type-scale+safe-zone(9) 6:ok | 2s 0pen | pass | 2:0/1 3:0/5 4:0/3 6:0/2 |
| openai | off | ds-proof | no | 6 | 1.856 | 8.13 | 9/8/8/9/8/6/8/9 | skip | 3s 0pen | 1: safe-zonex1 | 1:2/2 2:0/5 3:0/4 4:1/4 5:0/1 6:0/5 |
| openai | on | ds-proof | no | 6 | 0.845 | 8.63 | 9/9/9/10/8/6/9/9 | 1:safe-zone(1) 2:ok 3:contrast+safe-zone+type-scale(11) 4:contrast(6) 5:contrast(6) 6:contrast(6) | 1s 0pen | 6: contrastx6 | 2:0/2 |
| openai | off | fe-event | yes | 1 | 0.640 | 8.75 | 9/9/9/9/8/8/9/9 | skip | 0 | 1: safe-zonex1 | 1:1/1 |
| openai | on | fe-event | no | 6 | 1.299 | 8.75 | 9/9/9/10/8/7/9/9 | 1:safe-zone(2) 2:ok 3:safe-zone(1) 4:ok 5:overflow+safe-zone(7) 6:ok | 0 | pass | 2:0/3 4:0/2 6:0/2 |
| openai | off | fe-maker | yes | 3 | 1.074 | 8.75 | 9/9/9/9/8/8/9/9 | skip | 0 | 1: safe-zonex1 | 1:1/3 2:2/2 3:1/1 |
| openai | on | fe-maker | yes | 3 | 0.870 | 8.88 | 9/9/9/9/9/8/9/9 | 1:safe-zone(2) 2:ok 3:ok | 0 | pass | 2:0/2 3:0/1 |
| openai | off | fe-spec | no | 6 | 1.847 | 8.00 | 9/8/7/9/7/6/9/9 | skip | 3s 0pen | 1: safe-zonex1 | 1:1/5 2:2/4 3:0/6 4:0/5 5:0/7 6:1/3 |
| openai | on | fe-spec | no | 6 | 1.218 | 8.13 | 9/9/7/9/7/6/9/9 | 1:safe-zone(4) 2:ok 3:ok 4:safe-zone(2) 5:ok 6:safe-zone(2) | 0 | 2: safe-zonex2 | 2:1/0 3:0/3 5:0/3 |
| openai | off | fe-spindle | no | 6 | 1.769 | 8.25 | 9/8/8/9/8/6/9/9 | skip | 3s 0pen | 4: safe-zonex4 | 1:1/2 2:0/4 3:1/2 4:1/2 5:0/3 6:0/4 |
| openai | on | fe-spindle | no | 6 | 1.274 | 8.25 | 9/8/8/9/8/6/9/9 | 1:safe-zone(4) 2:ok 3:ok 4:safe-zone(1) 5:ok 6:safe-zone(1) | 0 | 1: safe-zonex1 | 2:1/2 3:3/1 5:0/4 |
| openai | off | nl-battery | no | 6 | 2.534 | 8.00 | 9/7/8/9/8/6/8/9 | skip | 3s 0pen | 2: safe-zonex2 | 1:0/5 2:0/5 3:0/4 4:0/5 5:1/4 6:0/5 |
| openai | on | nl-battery | yes | 3 | 1.376 | 8.88 | 9/9/9/9/9/8/9/9 | 1:safe-zone(2) 2:ok 3:ok | 0 | pass | 2:0/2 3:1/0 |
| openai | off | nl-city | no | 6 | 2.299 | 8.25 | 9/8/8/9/7/7/9/9 | skip | 3s 0pen | 4: safe-zonex4 | 1:0/3 2:1/5 3:1/5 4:1/2 5:0/5 6:1/3 |
| openai | on | nl-city | no | 6 | 2.062 | 8.38 | 9/9/8/9/8/6/9/9 | 1:safe-zone(1) 2:ok 3:safe-zone(2) 4:ok 5:safe-zone(1) 6:ok | 0 | pass | 2:0/3 4:0/3 6:1/2 |
| openai | off | nl-referral | yes | 3 | 1.300 | 8.63 | 9/8/9/9/8/8/9/9 | skip | 0 | 2: safe-zonex2 | 1:0/5 2:0/6 3:0/3 |
| openai | on | nl-referral | no | 6 | 2.123 | 8.63 | 9/9/9/9/8/7/9/9 | 1:safe-zone(1) 2:ok 3:ok 4:ok 5:ok 6:ok | 2s 0pen | pass | 2:0/3 3:2/2 4:0/2 5:1/3 6:0/2 |
| openai | off | nl-winter | no | 6 | 2.402 | 8.00 | 9/8/8/8/8/6/8/9 | skip | 3s 0pen | 4: safe-zonex4 | 1:0/6 2:1/4 3:1/3 4:0/5 5:0/1 6:1/5 |
| openai | on | nl-winter | no | 6 | 1.679 | 8.38 | 9/9/8/9/8/6/9/9 | 1:safe-zone(2) 2:ok 3:safe-zone(1) 4:ok 5:ok 6:safe-zone(2) | 0 | 2: safe-zonex2 | 2:1/2 4:0/3 5:1/2 |
| openai | off | ql-free | no | 6 | 1.555 | 8.25 | 9/8/8/9/8/6/9/9 | skip | 3s 0pen | 3: safe-zonex3 | 1:0/3 2:0/4 3:0/3 4:0/2 5:0/4 6:1/3 |
| openai | on | ql-free | no | 6 | 1.723 | 8.25 | 9/8/8/9/8/6/9/9 | 1:safe-zone(2) 2:ok 3:safe-zone(1) 4:ok 5:ok 6:safe-zone(1) | 0 | 1: safe-zonex1 | 2:0/4 4:1/2 5:0/4 |
| openai | off | ql-launch | yes | 3 | 1.356 | 8.63 | 9/9/8/9/8/8/9/9 | skip | 0 | 5: safe-zonex2, type-scalex3 | 1:0/4 2:0/3 3:0/3 |
| openai | on | ql-launch | no | 6 | 1.478 | 8.38 | 9/9/8/9/8/6/9/9 | 1:safe-zone(2) 2:ok 3:safe-zone(1) 4:ok 5:contrast(2) 6:ok | 0 | pass | 2:1/2 4:0/4 6:0/3 |
| openai | off | ql-night | yes | 5 | 1.999 | 8.63 | 9/9/8/9/8/8/9/9 | skip | 2s 0pen | 4: safe-zonex4 | 1:1/4 2:0/3 3:0/4 4:0/5 5:0/3 |
| openai | on | ql-night | yes | 4 | 1.660 | 8.50 | 9/9/8/8/8/8/9/9 | 1:safe-zone(3) 2:ok 3:type-scale(7) 4:ok | 0 | pass | 2:1/2 4:0/4 |
| openai | off | ql-phone | yes | 1 | 0.658 | 8.63 | 9/9/8/9/8/8/9/9 | skip | 0 | 7: contrastx4, safe-zonex3 | 1:0/3 |
| openai | on | ql-phone | no | 6 | 1.260 | 8.25 | 9/8/8/9/8/6/9/9 | 1:safe-zone(1) 2:ok 3:ok 4:safe-zone(1) 5:ok 6:ok | 0 | pass | 2:0/3 3:0/4 5:0/3 6:1/3 |
