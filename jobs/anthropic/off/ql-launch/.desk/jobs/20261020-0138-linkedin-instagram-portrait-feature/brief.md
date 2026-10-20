<!-- ask: a LinkedIn card and an -->
# Brief: 20261020-0138-linkedin-instagram-portrait-feature

## Deliverable
Social card for a Quill feature launch: one self-contained HTML file with a single `<main data-artboard>`. Media queries adapt it to both sizes. It has one headline, one supporting line and a small brand mark. It must read in under two seconds on a phone with the screen dimmed.

## Sizes
- `linkedin`: 1200x627, 6% safe zone on all sides
- `ig-post`: 1080x1350 portrait, 6% safe zone on the sides and top, 10% at the bottom

## Copy
```
Headline:        Cut it. It stays.
Supporting line: Drafts, not versions.
Mark:            quill.app
```
All three are given verbatim. Do not change, add to or drop any of them. Keep the punctuation exactly as written.

## Brand
`.desk/DESIGN.md` (Quill). The three things that matter most here:
1. Dark ink background `#0e0f14` with text in `#ededf0`. Use the pale blue accent `#7c9cff` once only, on one word or one rule.
2. Serif headlines, large, with air, in a short-line editorial rhythm. The voice is quiet, literary and exact.
3. No feature grids, icons, screenshots with chrome or exclamation marks. The radius is 0. The logo path is empty, so `quill.app` set as text is the mark.

## Fonts
Source Serif 4 is the brand family: 600 for the headline, 400 for body and mark. Every desk inlines it as a data URI per `procedures/fonts.md` and loads nothing from the network. If `font.mjs list` shows it isn't bundled, all desks use the closest bundled serif and the runner records that choice here. Every desk uses the same family.

## Must be true
- Brand palette only: background, foreground, one accent. Muted `#8b8d99` and surface `#171923` are allowed as tints. No new hues and no gradients.
- No more than three type sizes. The headline is at least 44px on linkedin and at least 65px on ig-post. Nothing readable is under 24px. Headline line height is 1.0 to 1.1 with tracking of -0.02em to -0.01em.
- On ig-post the headline sits in the top 40%. There is no leftover empty band taller than a third of the canvas: any space has to be deliberately shaped.
- Nothing is centred. The mark stays small and in a corner. No emoji, no text shadows, no "Learn more", and the URL is never the headline.
- Contrast is at least 4.5:1 for body text. All text is real DOM text and nothing is animated.
- Out of scope: other sizes, any copy rewrite, logo design and imagery.

## Scope
Quick. There is one asset, the brand exists and the copy is given. Desks: three roughs from ui-designer, then the Art Director picks, then the Creative Director signs off. The job is capped at 6 rounds.
