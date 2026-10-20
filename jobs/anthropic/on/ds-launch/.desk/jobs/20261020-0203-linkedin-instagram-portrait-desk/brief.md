<!-- ask: a LinkedIn card and an -->
# Brief: 20261020-0203-linkedin-instagram-portrait-desk

## Deliverable
A social card announcing that Desk Studio is out, free and open source. It is one self-contained HTML file with one `<main data-artboard>`, and the same DOM adapts to both sizes through media queries.

## Sizes
`linkedin` (1200x627, 6% safe zone on all sides) and `ig-post` (1080x1350, 6% safe zone on the sides and top, 10% at the bottom).

## Copy
```
A design studio inside your coding agent.
Free, MIT, out now.
deskstudio.ai
```
- The headline is "A design studio inside your coding agent." The supporting line is "Free, MIT, out now." The mark or label is "deskstudio.ai".
- Use these words verbatim and add no other words.
- The only exception is the name "Desk Studio", which may be set as a small wordmark. This is optional because `DESIGN.md` has no logo file.

## Brand
`.desk/DESIGN.md`. The three things that matter most here:
1. **Palette.** The background is #0b0b0c, the text is #f4f4f5, and #ffb000 is the accent. The accent appears once, on the one thing to look at. That is either "out now" or "Free, MIT", and never both.
2. **Layout.** Left aligned, big type, lots of air. Radius is 0 and the spacing unit is 8.
3. **Banned.** No gradients, blobs, emoji or drop shadows. The voice is plain and confident.

## Fonts
- The brand family is Geist, with Inter as its second choice. Weights are 600 for the headline and 400 for body text.
- Whether Geist is bundled was not checked at intake because there was no tool access. The runner must check with `font.mjs list` before staffing.
- If Geist is not bundled, every desk uses Inter.
- Builders inline the font per `procedures/fonts.md`, with no network fonts.

## Must be true
- **Composition**
  - The headline is at least 44px on linkedin and at least 65px on ig-post, with line height 1.0 to 1.1 and tracking of -0.02em to -0.01em.
  - The headline runs at most 3 lines on linkedin and at most 4 on ig-post.
  - On ig-post the headline sits in the top 40%, and no empty band between it and the bottom group may be taller than a third of the canvas.
- **Type and colour**
  - Use three sizes at most and nothing under 24px. The only exception is a non-essential label, which may go down to 20px.
  - Contrast is at least 4.5:1 for body text.
  - Use the brand palette only.
- **Banned**
  - The URL is not the headline.
  - No "Learn more".
  - No centred layout.
  - The brand mark is no wider than 12% of the card.
  - No text in images and no animation.
- **Settings**
  - Quality is studio: director runs on opus, senior on sonnet, builder on haiku.
  - The loop is capped at 6 rounds.
  - `taste.md` is empty.
- **Out of scope:** other sizes, a carousel and new copy.

## Scope
Quick: one asset, the brand exists and the copy is given. Desks are roughs from ui-designer, the Art Director and the Creative Director.
