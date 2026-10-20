<!-- ask: a LinkedIn card and an -->
**Deliverable.** A social card: one still image, a single artboard, read in under two seconds. The subject is proof on real pixels, meaning every render is checked before sign-off. One self-contained HTML file whose layout adapts to each size through media queries on the same DOM.

**Sizes.** `linkedin` 1200x627, with a 6% safe zone on all sides. `ig-post` 1080x1350, with 6% on the sides and top and 10% at the bottom.

**Copy.** Use these words verbatim and add no others:
```
Checked on real pixels.
Overflow, contrast, safe zone, every round.
deskstudio.ai
```
Roles: the first line is the headline, the second is the supporting line, and the third is the brand mark, kept small and in a corner.

**Brand.** `.desk/DESIGN.md`. Three things matter most. First, use a dark field (#0b0b0c) with #f4f4f5 text and #8a8a93 for the muted line. Second, put the accent #ffb000 on one element only, the thing to look at, which is likely "real pixels." or one proof mark. Third, left-align with big type and lots of air, radius 0, an 8px spacing grid, and no gradients, blobs, emoji or drop shadows.

**Fonts.** Use Geist, with headline weight 600 and body weight 400. If `font.mjs list` does not show Geist as bundled, every desk uses Inter, the next family in the brand stack, inlined per `procedures/fonts.md`. Arial is the last fallback.

**Must be true.** Use only the brand palette: one accent, no new hues, tints allowed. Use three type sizes at most:
- The headline is at least 44px on linkedin and at least 65px on ig-post, with line height 1.0 to 1.1 and tracking -0.02em to -0.01em.
- The supporting line is at least 24px.
- The mark is at least 20px.

Everything stays inside the safe zones. On ig-post the headline sits in the top 40%, and no empty band may be taller than a third of the canvas. Body contrast must be at least 4.5:1. Nothing beyond the three copy lines plus at most one extra element. Out of scope: other sizes, animation, images of text, and a logo file (none exists).

**Scope.** Quick. One asset, the brand exists and the copy is given. Staff: roughs (ui-designer), then the Art Director, then the Creative Director. The cap is 6 rounds.
