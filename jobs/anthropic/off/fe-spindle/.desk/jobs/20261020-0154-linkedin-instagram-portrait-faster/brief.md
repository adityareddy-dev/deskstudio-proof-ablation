<!-- ask: a LinkedIn card and an -->
**Deliverable.** Social card: one announcement card for a faster spindle that fits every Ferro mill already shipped. It is one self-contained HTML file with one `<main data-artboard>`, adapted to each size with media queries on the same DOM.

**Sizes.** `linkedin` 1200x627 (6% safe zone on all sides) and `ig-post` 1080x1350 (6% on the sides and top, 10% at the bottom).

**Copy.** Verbatim, all three must appear. The headline is the first line, the supporting line is the second, and the mark and URL are the third:
```
24,000 rpm. Fits every Ferro ever made.
Swap it in ten minutes.
ferro.tools
```

**Brand.** `.desk/DESIGN.md` (Ferro). Three rules matter most here:
- Use a white background with black type, and put red `#e5173f` once, only on "24,000 rpm".
- Use hard edges, heavy headlines and tight tracking. The radius is 2 at most, with no soft shadows and no rounded cards.
- Show the spec as a plain figure. The voice is blunt and technical, with no added adjectives.

The logo path is empty, so "ferro.tools" serves as the small corner mark.

**Fonts.** Use Geist, weights 700 and 400. I have not confirmed whether Geist is bundled. If `font.mjs list` does not show it, every desk uses Inter, the next family in the brand stack, and inlines it per `procedures/fonts.md`. There is one typeface and two weights. The headline is 700 with line height 1.0 to 1.1 and tracking of -0.02em. The body is 400 with line height 1.3 to 1.4.

**Must be true.**
- Use at most three type sizes.
- The headline must be at least 44px on linkedin and at least 65px on ig-post. It wraps to three lines at most on linkedin and four at most on ig-post.
- On ig-post, the headline sits in the top 40%, and no empty band may be taller than a third of the canvas.
- Use the brand palette only.
- Do not use emoji, a "Learn more" CTA, or the URL as the headline.
- Out of scope: product photography, other platforms, and animation.
- The job is capped at 6 rounds.

**Scope.** Quick: one asset, the brand exists and the copy is given. The desks are roughs (ui-designer), Art Director and Creative Director.
