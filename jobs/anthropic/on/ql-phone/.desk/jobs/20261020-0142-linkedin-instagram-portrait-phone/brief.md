<!-- ask: a LinkedIn card and an -->
**Deliverable.** A social card: one still image announcing the Quill phone app, built as one HTML file with one artboard that adapts to each size. The idea behind it is that every sentence you cut is still there, even on the train. Rounds are capped at 6.

**Sizes.** `linkedin` 1200x627 (6% safe zone on all sides) and `ig-post` 1080x1350 (6% on the sides and top, 10% at the bottom).

**Copy.** These are the only words on the card, verbatim:
```
Your drafts, on the train.
Now on your phone.
quill.app
```
The headline is "Your drafts, on the train.", the supporting line is "Now on your phone." and the mark is "quill.app". No other words, no exclamation marks, no CTA. The idea that every cut sentence is still there comes through the composition, not through extra copy.

**Brand.** `.desk/DESIGN.md` (Quill). The three things that matter most here:
1. Dark ink background `#0e0f14`, text in `#ededf0`, and the pale blue accent `#7c9cff` used once, on one word or a rule. `#8b8d99` and `#171923` are tints only.
2. Large serif headlines with air, short lines and an editorial rhythm. The voice is quiet, literary and exact.
3. No feature grids, icons or phone screenshots with chrome. Radius is 0 and spacing works on an 8px unit. There is no logo file (the logo path is empty), so the mark is "quill.app" set small in a corner as live text.

**Fonts.** The brand family is Source Serif 4, weights 600 and 400. Intake has not confirmed whether it is bundled, so the first builder runs `font.mjs list` and records the result in state. If it is bundled, inline it per `procedures/fonts.md`. If it is not, every desk uses the same closest bundled serif, chosen once on rough 1 and recorded in state. Never Georgia or any system font, and no network fonts.

**Must be true.**
- One typeface, two weights (headline 600, body 400) and three type sizes at most.
- Headline at least 44px tall on linkedin and at least 65px on ig-post. It wraps to three lines at most on landscape and four on portrait, with line height 1.0 to 1.1 and tracking of -0.02em to -0.01em.
- On ig-post, the headline sits in the top 40% and no empty band taller than a third of the canvas is left over.
- One accent use only, contrast of at least 4.5:1, and nothing smaller than 24px except a label that isn't needed to read the card.
- Fully self-contained file: no network, all text as real DOM text, no animation, no emoji, no gradient on gradient, no drop shadows.
- No phone mockup with chrome. A bare, chromeless device outline is allowed only if it reads as one quiet element, not a screenshot.
- `taste.md` is empty and `project.json` adds no constraints. Out of scope: other sizes, stories, motion and any extra copy.

**Scope.** Quick: one asset, the brand exists and the copy is given. The desks are roughs, Art Director and Creative Director.
