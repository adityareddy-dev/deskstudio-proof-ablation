<!-- ask: a LinkedIn card and an -->
## Deliverable
Social card: one still image for the feed, a single self-contained HTML file with one `<main data-artboard>`. It announces that the first three drafts of any piece are free, forever.

## Sizes
`linkedin` 1200x627 (6% safe zone on all sides) and `ig-post` 1080x1350 (6% on the sides and top, 10% at the bottom). Both sizes use the same DOM and switch layout with media queries.

## Copy
```
Three drafts. Free. Always.
Pay when the fourth one matters.
quill.app
```
- **Headline:** "Three drafts. Free. Always."
- **Supporting line:** "Pay when the fourth one matters."
- **Mark:** "quill.app", set small in a corner.

Use the words exactly as given. Do not add a CTA, a "Learn more" or an exclamation mark.

## Brand
Read `.desk/DESIGN.md`. The three things that matter most here:
- **Background and accent:** dark ink background `#0e0f14` with `#ededf0` text, and the pale blue accent `#7c9cff` used once, on one word (for example "Free.") or one rule.
- **Type:** large serif headlines with air, short lines and an editorial rhythm. The spacing unit is 8 and the radius is 0.
- **Voice:** quiet, literary and exact. No icons, feature grids or screenshots. There is no logo file, so the mark is "quill.app" set as text.

## Fonts
- **Family:** Source Serif 4 at 600 for the headline and 400 for the body, inlined per `procedures/fonts.md`.
- **Not checked yet:** intake could not run `font.mjs list`. The runner confirms whether Source Serif 4 is bundled before the roughs start.
- **If it is not bundled:** the runner picks the closest bundled serif once and records it here, so every desk uses the same family. No other typeface is allowed.

## Must be true
- **Layout:** the headline is at least 44px on linkedin and at least 65px on ig-post. On portrait the headline sits in the top 40%, with no leftover empty band taller than a third of the canvas.
- **Type:** three type sizes at most, with nothing readable under 24px. The headline wraps to three lines at most on landscape and four on portrait. Line height is 1.0 to 1.1 with -0.02em to -0.01em tracking above 40px.
- **Colour and finish:** brand palette only, contrast at least 4.5:1, no gradients, no shadows, no emoji, no animation and no network fetches.
- **Out of scope:** other sizes (x, og, square, story), a logo design and any change to the copy.

## Scope
Quick: one asset, the brand exists and the copy is given. The desks are three roughs, then the Art Director, then the Creative Director. Quality is studio and the loop is capped at 6 rounds.
