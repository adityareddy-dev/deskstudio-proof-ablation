<!-- ask: a LinkedIn card and an -->
# Brief: 20261020-0149-linkedin-instagram-portrait-spec

## Deliverable
Social card for a spec reveal, built as one self-contained HTML artboard that adapts to both sizes with media queries on the same DOM. It says one thing: the precision figure, on a desk-sized machine.

## Sizes
`linkedin` 1200x627 (6% safe zone on all sides) and `ig-post` 1080x1350 (6% safe zone on the sides and top, 10% at the bottom).

## Copy
```
0.01mm. On your desk.
Steel, not plastic.
ferro.tools
```
Use these exactly, with no other words. "0.01mm. On your desk." is the headline, "Steel, not plastic." is the supporting line, and "ferro.tools" is the mark or label. There is no logo file (`logo.path` is empty), so "ferro.tools" is set as type, small and in a corner.

## Brand
`.desk/DESIGN.md` (Ferro). What matters most here:
1. White background (#ffffff), black type (#0a0a0a), and red (#e5173f) only on the number "0.01mm". Nowhere else.
2. Hard edges, a heavy headline at weight 700, tight tracking. Radius is 2 at most, and 0 on the artboard.
3. Specs as plain figures, voice blunt and technical. Muted #737373 and surface #f2f2f2 are allowed as supporting tones only.

## Fonts
The brand family is Geist (the stack also lists Inter and Arial). Builders check whether Geist is bundled with `font.mjs list` and inline it per `procedures/fonts.md`. If Geist is not bundled, every desk uses Inter, the closest bundled family, at weights 700 and 400. Nothing else.

## Must be true
- Headline height is at least 44px on linkedin and at least 65px on ig-post. Tracking is -0.02em to -0.01em and line height 1.0 to 1.1.
- Three type sizes at most, one accent used once, and no text below 24px except the "ferro.tools" label (20px or more).
- On ig-post, the headline sits in the top 40%, and no empty band taller than a third of the canvas is left between the headline and the bottom group.
- None of these: rounded cards, soft shadows, pastel, gradients, emoji, centred layouts, a drop shadow on text, new hues, or any adjectives or copy beyond the three lines above.
- No network: everything inline, real DOM text, no animation.
- Out of scope: product photography and generated imagery. Any visual element has to be built from type, rules or plain geometry in the palette.
- Rounds are capped at 6.

## Scope
Quick: one asset, the brand exists and the copy is given. Desks are roughs from ui-designer, then the Art Director, then the Creative Director.
