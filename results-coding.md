# Creative Director note coding

Two independent readers coded all 754 notes; a third settled the 73 category disagreements. Codes per note are in coding.json (A, B, final).

## Agreement between the two readers

| Level | Notes | Agreed | Observed agreement | Cohen's kappa |
|---|---|---|---|---|
| Fifteen categories | 754 | 681 | 90% | 0.88 |
| Mechanical, taste or other | 754 | 740 | 98% | 0.90 |

## Final codes, all notes

| Category | On | Off | All |
|---|---|---|---|
| mech-contrast | 0 | 1 | 1 |
| mech-copy | 1 | 3 | 4 |
| mech-overflow | 0 | 5 | 5 |
| mech-palette | 0 | 11 | 11 |
| mech-safe-zone | 2 | 28 | 30 |
| mech-type-scale | 0 | 20 | 20 |
| other | 0 | 6 | 6 |
| taste-brand | 0 | 6 | 6 |
| taste-colour | 5 | 11 | 16 |
| taste-composition | 105 | 205 | 310 |
| taste-copy | 0 | 7 | 7 |
| taste-hierarchy | 6 | 17 | 23 |
| taste-originality | 46 | 69 | 115 |
| taste-spacing | 39 | 54 | 93 |
| taste-typography | 28 | 79 | 107 |

## Mechanical share of Creative Director notes by round

Pooled across families. Mechanical means a final code in a mech- category.

| Round | On: notes | On: mechanical | On: share | Off: notes | Off: mechanical | Off: share |
|---|---|---|---|---|---|---|
| 1 | 4 | 0 | 0% | 124 | 16 | 13% |
| 2 | 73 | 0 | 0% | 114 | 16 | 14% |
| 3 | 45 | 1 | 2% | 91 | 13 | 14% |
| 4 | 48 | 1 | 2% | 73 | 11 | 15% |
| 5 | 35 | 1 | 3% | 62 | 8 | 13% |
| 6 | 27 | 0 | 0% | 58 | 4 | 7% |
| all | 232 | 3 | 1% | 522 | 68 | 13% |

## By family and arm

| Family | Arm | Notes | Mechanical | Taste | Other | Mechanical share |
|---|---|---|---|---|---|---|
| anthropic | on | 102 | 2 | 100 | 0 | 2% |
| anthropic | off | 234 | 36 | 196 | 2 | 15% |
| openai | on | 130 | 1 | 129 | 0 | 1% |
| openai | off | 288 | 32 | 252 | 4 | 11% |
| pooled | on | 232 | 3 | 229 | 0 | 1% |
| pooled | off | 522 | 68 | 448 | 6 | 13% |

## Mechanical categories by arm

| Category | Anthropic on | Anthropic off | OpenAI on | OpenAI off |
|---|---|---|---|---|
| mech-contrast | 0 | 0 | 0 | 1 |
| mech-copy | 1 | 2 | 0 | 1 |
| mech-overflow | 0 | 4 | 0 | 1 |
| mech-palette | 0 | 0 | 0 | 11 |
| mech-safe-zone | 1 | 16 | 1 | 12 |
| mech-type-scale | 0 | 14 | 0 | 6 |

## Per job, paired by case

Mean notes per job. A job with no sign-off has zero notes.

| Family | Measure | Mean on | Mean off | Mean diff | Pairs with on < off | Pairs with on > off |
|---|---|---|---|---|---|---|
| anthropic | Mechanical CD notes | 0.13 | 2.40 | -2.27 | 9/15 | 0/15 |
| anthropic | Taste CD notes | 6.67 | 13.07 | -6.40 | 10/15 | 4/15 |
| anthropic | All CD notes | 6.80 | 15.60 | -8.80 | 10/15 | 3/15 |
| openai | Mechanical CD notes | 0.07 | 2.13 | -2.07 | 10/15 | 1/15 |
| openai | Taste CD notes | 8.60 | 16.80 | -8.20 | 11/15 | 4/15 |
| openai | All CD notes | 8.67 | 19.20 | -10.53 | 11/15 | 3/15 |
| pooled | Mechanical CD notes | 0.10 | 2.27 | -2.17 | 19/30 | 1/30 |
| pooled | Taste CD notes | 7.63 | 14.93 | -7.30 | 21/30 | 8/30 |
| pooled | All CD notes | 7.73 | 17.40 | -9.67 | 21/30 | 6/30 |

## Notes coded other

- anthropic/off/ds-launch/r2/5: the given lines are locked verbatim by the brief, so make no change this round. "A design studio inside your coding agent." describes rather than claims, which caps this axis at 8.
- anthropic/off/ds-launch/r6/4: verbatim lines hold. "Free, MIT, out now." stays, and the headline claim is plain, so there is no change in scope. The cap stays at 8 until a copy desk tightens it.
- openai/off/ds-proof/r1/4: Run the required overflow, contrast and safe-zone checks on both sizes before sign-off; this round has no mechanical proof.
- openai/off/nl-battery/r1/5: After embedding Inter’s two required weights, render both sizes again to verify the intended letterforms and weight; screenshots alone cannot confirm offline font availability.
- openai/off/nl-battery/r5/5: Verify the embedded font contains both required weights, then render both sizes again; screenshots alone cannot confirm offline font availability.
- openai/off/nl-referral/r2/6: Inline both verified Inter weights before rerendering; confirm offline rendering preserves them, since screenshots cannot establish font embedding.
