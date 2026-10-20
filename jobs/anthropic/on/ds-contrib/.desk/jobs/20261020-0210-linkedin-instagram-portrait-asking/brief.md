<!-- ask: a LinkedIn card and an -->
**Deliverable.** Social card: one still image for the feed, asking designers and developers to contribute a desk to Desk Studio. One self-contained HTML file with one artboard that adapts to both sizes on the same DOM.

**Sizes.** `linkedin` (1200x627) and `ig-post` (1080x1350). The safe zone is 6% on all sides for linkedin. For ig-post it is 6% on the sides and top and 10% at the bottom.

**Copy.** Verbatim, and nothing else in text:
```
Add a desk.
One brief file. One registry line.
deskstudio.ai
```
"Add a desk." is the headline. "One brief file. One registry line." is the supporting line. "deskstudio.ai" is the mark or label. It is never the headline.

**Brand.** `.desk/DESIGN.md`. The three rules that matter most here:
- Use only the dark ground #0b0b0c, the text colour #f4f4f5, and muted #8a8a93 or surface #141416.
- Use the accent #ffb000 once, on the one thing to look at.
- Left align, with big type and lots of air. No gradients, blobs, emoji or drop shadows, and radius 0.

**Fonts.** Use Geist, at 600 for the headline and 400 for the body, inlined per `procedures/fonts.md`. If `font.mjs list` shows Geist is not bundled, every desk uses Inter, the brand's next fallback, at the same weights.

**Must be true.**
- The headline is at least about 44px on linkedin and about 65px on ig-post, with tight tracking.
- Use three type sizes at most, and nothing readable below 24px.
- On ig-post, the headline sits in the top 40%, and there is no empty band taller than a third of the canvas.
- Text has contrast of at least 4.5:1.
- There is no logo, because the logo path is empty, so the URL serves as the mark, kept small in a corner.
- All text is real DOM text, with no animation and no network calls.
- Out of scope: any extra copy, CTAs, illustrations or new hues.

**Scope.** Quick. This is one asset across two sizes, the brand exists, and the copy is given. Desks: three roughs, then the Art Director, then the Creative Director, with 6 rounds at most.
