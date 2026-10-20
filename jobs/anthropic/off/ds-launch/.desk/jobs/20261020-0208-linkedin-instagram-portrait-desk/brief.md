<!-- ask: a LinkedIn card and an -->
# Brief: 20261020-0208-linkedin-instagram-portrait-desk

## Deliverable
A launch social card announcing that Desk Studio is out, free and open source. It is one self-contained HTML file with one `<main data-artboard>`, and media queries adapt it to both sizes. It must read in under two seconds on a phone feed.

## Sizes
- `linkedin`: 1200x627, safe zone 6% on all sides
- `ig-post`: 1080x1350, safe zone 6% on the sides and top, 10% at the bottom

## Copy
```
A design studio inside your coding agent.
Free, MIT, out now.
deskstudio.ai
```
- The headline is "A design studio inside your coding agent."
- The supporting line is "Free, MIT, out now."
- "deskstudio.ai" is the small line. It is never the headline.
- Brand mark: the wordmark "Desk Studio", set as live text. There is no logo file (`logo.path` is empty). This is draft copy, and a copy desk may improve it.
- Use the copy verbatim, with no edits to the three given lines.

## Brand
`.desk/DESIGN.md`. Three things matter most:
1. **Palette.** Background #0b0b0c, text #f4f4f5, muted #8a8a93, surface #141416. Use the accent #ffb000 once, on the one thing to look at (most likely "Free, MIT, out now." or one word of it).
2. **Layout.** Left-aligned, big type, lots of air. Radius 0, on an 8px grid.
3. **Bans.** No gradients, blobs, emoji or drop shadows. The voice is plain, confident and short.

## Fonts
- The brand family is Geist (600 headline, 400 body), with Inter as the fallback.
- Builders confirm with `font.mjs list` and inline per `procedures/fonts.md`.
- If Geist is not bundled, every desk uses Inter, which is the closest bundled family.
- Use one family, two weights and three sizes at most.

## Must be true
- Headline height is at least about 44px on linkedin and at least about 65px on ig-post. Line height is 1.0 to 1.1 and tracking is -0.02em. The headline wraps to no more than 3 lines on landscape and 4 on portrait.
- On ig-post, the headline sits in the top 40%, and there is no unshaped empty band taller than a third of the canvas.
- The mark stays small, in a corner, and under 12% of the width.
- Nothing is readable below 24px.
- Contrast is at least 4.5:1.
- Out of scope: other sizes, imagery, illustration, animation, and a "Learn more" CTA.
- `taste.md` is empty, and `project.json` sets no constraints.

## Scope
Quick. This is one asset, the brand exists and the copy is given. The desks are roughs (ui-designer), the Art Director and the Creative Director. Quality is studio, with a cap of 6 rounds.
