<!-- ask: a LinkedIn card and an -->
# Brief: 20261020-0126-linkedin-instagram-portrait-winter

## Deliverable
A social card: one still image about winter output, showing that Northlight panels still pay their way in January. It is one HTML file with one `<main data-artboard>` that adapts to both sizes through media queries on the same DOM.

## Sizes
- `linkedin`: 1200x627, 6% safe zone on all sides.
- `ig-post`: 1080x1350, 6% on the sides and top, 10% at the bottom.

## Copy
Every word must appear verbatim. Do not add a CTA, a figure or any other line.
```
January still pays.
Snow slides off. The numbers don't.
northlight.energy
```
- "January still pays." is the headline.
- "Snow slides off. The numbers don't." is the supporting line.
- "northlight.energy" is the mark, small and in a corner. It is never the headline.

## Brand
`.desk/DESIGN.md` (Northlight). The three things that matter most here:
1. Warm paper background `#f7f5f0` with foreground `#161614`. The one orange accent `#d9480f` goes on a single focal word or element. In this copy that is "January" or "pays". Never use two accents.
2. Left aligned with generous margins. The voice is warm, plain and numerate.
3. No sky gradients, sun icons, leaves or other winter clichés. Snowflakes count as clichés by the same logic.

## Fonts
- The brand family is Inter, at weight 600 for the headline and 400 for the body, with a 16px base and a 1.25 ratio.
- I could not confirm at intake whether Inter is bundled.
- The first builder must run `node "C:/Users/adity/Desktop/Adi/deskstudio/scripts/font.mjs" list` and inline Inter per `procedures/fonts.md`.
- If Inter is not bundled, the runner names one bundled neo-grotesque before the roughs start, and every desk uses that same family.

## Must be true
- One typeface and two weights, with three sizes at most.
- Headline height: at least about 44px on `linkedin` and at least about 65px on `ig-post`.
- Headline line height 1.0 to 1.1, tracking -0.02em to -0.01em.
- No text under 24px. The 20px exception applies only to a non-essential label.
- Contrast at least 4.5:1 for the body.
- On `ig-post`:
  - The headline sits in the top 40%.
  - No band of leftover space taller than a third of the canvas between the headline and the bottom group.
- No emoji, no text shadow, no radius on the artboard, no images of text, no network fonts or assets, no animation.
- Out of scope: photography, illustration, any invented statistic, and copy changes.
- No constraints from `project.json` and no `taste.md`.
- Quality is studio and the round cap is 6.

## Scope
Quick. This is one asset at two sizes, the brand exists and the copy is given. The desks are three roughs by the ui-designer, then the Art Director for the pick, then the Creative Director for sign-off.
