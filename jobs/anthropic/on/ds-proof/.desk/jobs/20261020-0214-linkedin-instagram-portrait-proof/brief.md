<!-- ask: a LinkedIn card and an -->
# Brief: 20261020-0214-linkedin-instagram-portrait-proof

## Deliverable
A social card: one still image for a feed, built on one DOM. It says one thing: every render is proofed on real pixels before sign-off. It ships as one self-contained `final.html` that adapts to both sizes with media queries.

## Sizes
- `linkedin` is 1200x627, with a 6% safe zone on all sides.
- `ig-post` is 1080x1350, with a 6% safe zone on the sides and top and 10% at the bottom.

## Copy
```
Checked on real pixels.
Overflow, contrast, safe zone, every round.
deskstudio.ai
```
- The headline is "Checked on real pixels."
- The supporting line is "Overflow, contrast, safe zone, every round."
- "deskstudio.ai" is the brand mark, set small in a corner as a text wordmark because there is no logo file.
- Keep all three lines verbatim and add no other words.

## Brand
The brand file is `.desk/DESIGN.md`. Three things matter most here:
1. Use dark `#0b0b0c` with light `#f4f4f5`. The accent `#ffb000` appears once, on the one thing to look at. `#8a8a93` and `#141416` are available for the mark or a surface.
2. Left align, big type and lots of air, on an 8px spacing unit with radius 0.
3. The voice is plain, confident and short. No gradients, blobs, emoji or drop shadows.

## Fonts
- The brand family is Geist, set at weight 600 for the headline and 400 for the body.
- Confirm with `font.mjs list` whether Geist is bundled.
- If Geist is not bundled, every desk uses Inter, the closest bundled family. Inline it per `fonts.md`, with no network fonts.

## Must be true
- **Headline size:** at least about 44px on `linkedin` and 65px on `ig-post`.
- **Headline spacing and wrap:** line height 1.0 to 1.1 with tracking of -0.02em to -0.01em. It wraps to at most 3 lines on landscape and 4 on portrait.
- **Type:** three sizes at most, one typeface, two weights, and nothing readable under 24px.
- **Portrait layout:** the headline sits in the top 40%, and no unshaped empty band is taller than a third of the canvas.
- **Colour and contrast:** use the brand palette only, with contrast of at least 4.5:1 for the body.
- **No text in images, and no animation.**
- **Safe zones:** honour the safe zones listed under Sizes.
- **Out of scope:** extra copy, a CTA, photography, and stock illustration.
- **Round cap:** 6 rounds, set by the user. There are no constraints from `project.json` or `taste.md`.

## Scope
The scope is quick: one asset at two sizes, an existing brand and given copy. Staff the roughs, then the Art Director, then the Creative Director.
