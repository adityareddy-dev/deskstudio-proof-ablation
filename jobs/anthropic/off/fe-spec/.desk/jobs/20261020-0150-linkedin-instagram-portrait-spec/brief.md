<!-- ask: a LinkedIn card and an -->
# Brief: 20261020-0150-linkedin-instagram-portrait-spec

## Deliverable
Social card for a spec reveal: two crops of one card, one for LinkedIn and one for an Instagram portrait post. Both crops come from one self-contained HTML file with one `<main data-artboard>`, adapted to each size with media queries.

## Sizes
- `linkedin`: 1200x627, 6% safe zone on every side.
- `ig-post`: 1080x1350, 6% safe zone at the sides and top, 10% at the bottom.
- The headline must be at least 44px tall on `linkedin` and at least 65px on `ig-post`.

## Copy
These words must appear exactly as written, with nothing added:

```
0.01mm. On your desk.
Steel, not plastic.
ferro.tools
```

- Headline: "0.01mm. On your desk."
- Supporting line: "Steel, not plastic."
- Mark: "ferro.tools", set as a text wordmark because DESIGN.md has no logo file. It goes small, in a corner, and is never the headline.

## Brand
The brand file is `.desk/DESIGN.md` (Ferro). The three things that matter most here:
1. White `#ffffff` background and black `#0a0a0a` type. Red `#e5173f` appears once, on "0.01mm" only.
2. Hard edges: radius 2 at most and only on elements, never on the artboard. Heavy 700 headlines with tight tracking (-0.02em). No rounded cards, soft shadows or pastels.
3. A blunt, technical voice. The figure should look like a plain spec number, and nothing decorative should compete with it.

## Fonts
- The brand family is Geist, with Inter, Arial and sans-serif behind it. Use weight 700 for the headline and 400 for the body.
- Inline the font as a data URI, per `procedures/fonts.md`.
- Check it is bundled with `font.mjs list`. If Geist is not bundled, every desk uses Inter, the next family in the brand stack.

## Must be true
- **Type:** one typeface in two weights and no more than three sizes. Nothing readable under 24px.
- **Colour:** brand palette only, and one accent used once.
- **Layout:**
  - On `ig-post`, the headline sits in the top 40% of the canvas. No empty band taller than a third of the canvas.
  - The `linkedin` headline wraps to three lines at most, and the `ig-post` headline to four.
- **Banned:**
  - Centring everything, emoji, gradients, drop shadows on text, stock illustration, product imagery invented without an asset, any copy beyond the three lines above, and "Learn more".
- **Build:**
  - All text is live DOM text, with no network calls and no animation.
- **Process limits:** taste.md is empty and project.json has no constraints. The job is capped at 6 rounds.

## Scope
Quick: one card in two sizes, the brand exists and the copy is given. The desks are three roughs, then the Art Director, then the Creative Director.
