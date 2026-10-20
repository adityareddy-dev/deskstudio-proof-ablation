<!-- ask: a LinkedIn card and an -->
# Brief: 20261020-0148-linkedin-instagram-portrait-saying

## Deliverable
Social card, one still image for feeds. It has a single message: the first three drafts of any piece are free, forever. It is one self-contained HTML file with one `<main data-artboard>` that adapts to both sizes on the same DOM through media queries.

## Sizes
- `linkedin` is 1200x627, with a 6% safe zone on all sides.
- `ig-post` is 1080x1350, with 6% on the sides and top and 10% at the bottom.

## Copy
Verbatim, including punctuation. Nothing else is added.

```
Three drafts. Free. Always.
Pay when the fourth one matters.
quill.app
```

- The headline is the first line.
- The supporting line is the second.
- The brand mark is the third. `quill.app` is the mark only and is never the headline.

## Brand
`.desk/DESIGN.md` (Quill). The three things that matter most here:
1. **Colour.** Use dark ink background `#0e0f14` with foreground `#ededf0`. Use the pale blue accent `#7c9cff` exactly once, on one word or one rule. `#8b8d99` (muted) and `#171923` (surface) are allowed only as tints.
2. **Type and layout.** Set a large serif headline with air, short lines and an editorial rhythm. The radius is 0 and the spacing unit is 8.
3. **Voice.** Keep it quiet, literary and exact. Use no exclamation marks, no feature grids, no icons and no chrome.

## Fonts
- The brand family is Source Serif 4: headline 600, body 400.
- I could not confirm whether it is bundled, because this intake step had no tool access. The runner checks it with `node "C:/Users/adity/Desktop/Adi/deskstudio/scripts/font.mjs" list` before staffing.
- If it is bundled, builders inline it per `procedures/fonts.md`.
- If it is not bundled, the runner names the closest bundled serif here before roughs, and every desk uses that one family.

## Must be true
**Type**
- Use one typeface in two weights and no more than three sizes: headline, supporting, mark.
- The headline is at least about 44px on `linkedin` and about 65px on `ig-post`.
- Headline line height is 1.0 to 1.1, with tracking of -0.02em to -0.01em.
- Body line height is 1.3 to 1.4.
- Nothing readable is under 24px.

**Layout**
- The content block is left-aligned on a column, not centred.
- The headline wraps to at most 3 lines on landscape and 4 on portrait.
- On portrait, the headline sits in the top 40%.
- On portrait, no empty band taller than one third of the canvas may sit between the headline and the bottom group.
- The mark is small and sits in a corner.
- Margins are at least 6% of the short side, and 10% at the bottom on portrait.

**Colour**
- Contrast is at least 4.5:1, measured against the actual pixels.

**Banned**
- Emoji, drop shadows, gradients, artboard radius and stock imagery.
- "Learn more" or any other CTA.
- No taste.md constraints apply.

**Files and rounds**
- The file has no network requests, all text is real DOM text, and nothing animates.
- The round cap is 6, from `--rounds 6`.
- Writing copy beyond the three lines is out of scope.

## Scope
Quick. This is one asset, the brand exists and the copy is given. The desks are three roughs from ui-designer at the senior model, each on a different pattern (suggested: Type only, Editorial split, Frame), then Art Director pick, builder polish, proof, and Creative Director sign-off.
