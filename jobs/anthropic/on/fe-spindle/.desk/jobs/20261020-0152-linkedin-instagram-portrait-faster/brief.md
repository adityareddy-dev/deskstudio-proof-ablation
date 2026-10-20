<!-- ask: a LinkedIn card and an -->
**Deliverable.** Social card. One still announcing a faster spindle that fits every Ferro mill already shipped. It is built as one self-contained HTML file whose single artboard adapts to both sizes with media queries.

**Sizes.** `linkedin` 1200x627, with a 6% safe zone on all sides. `ig-post` 1080x1350, with 6% on the sides and top and 10% at the bottom.

**Copy.** The user supplied this copy. Use it verbatim, with nothing added or reworded:

```
24,000 rpm. Fits every Ferro ever made.
Swap it in ten minutes.
ferro.tools
```

The first line is the headline. The second line is the supporting line. `ferro.tools` is the mark: small, in a corner, never the headline. No CTA is added.

**Brand.** `.desk/DESIGN.md`, Ferro. Three things matter most:
- The background is white `#ffffff` with black type `#0a0a0a`. Red `#e5173f` appears once, on "24,000 rpm" only.
- Edges are hard (radius 2 at most) and headlines are heavy at 700 with tight tracking. There are no rounded cards, soft shadows or pastels.
- The voice is blunt and technical: specs as plain figures, no adjectives.

**Fonts.** The brand family is Geist, with Inter as the next brand fallback. Builders confirm with `font.mjs list` whether Geist is bundled.
- If Geist is bundled, inline it per `procedures/fonts.md`.
- If it is not, every desk uses Inter.
- Use weights 700 and 400 only.

**Must be true.**
- The copy is exact.
- There is one accent and three type sizes at most.
- The headline is at least 44px on linkedin and at least 65px on ig-post. It runs 3 lines at most on linkedin and 4 at most on ig-post.
- On ig-post the headline sits in the top 40%, with no leftover empty band taller than a third of the canvas.
- There is no logo file, so `ferro.tools` set as type is the mark.
- No imagery is supplied, so no stock or AI product shots. Type, figure and shape only.
- There are no emoji, gradients, text shadows or artboard radius.
- The file works offline, with no network requests and no animation.
- The job is capped at 6 rounds.

**Scope.** Quick: one asset, the brand exists and the copy is given. Desks are roughs from ui-designer, then the Art Director and the Creative Director.
