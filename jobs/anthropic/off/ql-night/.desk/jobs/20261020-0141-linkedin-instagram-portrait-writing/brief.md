<!-- ask: a LinkedIn card and an -->
**Deliverable.**
Social card: one still image for LinkedIn and an Instagram portrait post. One self-contained HTML file, one `<main data-artboard>`, adapting to both sizes with media queries on the same DOM. Theme: writing at night, where the screen dims with the room.

**Sizes.**
- `linkedin` 1200x627, with a 6% safe zone on all sides.
- `ig-post` 1080x1350, with 6% on the sides and top and 10% at the bottom.
- Headline height is at least 44px on linkedin and at least 65px on ig-post.

**Copy.**
```
The page dims with the room.
Night mode is on by default.
quill.app
```
- All three lines are given by the user and appear verbatim.
- Line 1 is the headline and line 2 is the supporting line.
- `quill.app` is the brand mark: small and in a corner. There is no logo file, so it is a text wordmark.
- No other copy and no CTA.

**Brand.**
`.desk/DESIGN.md` (Quill). The three things that matter most here:
1. Dark ink background `#0e0f14` with `#ededf0` text, and one pale blue accent `#7c9cff` used once, on one word or a rule.
2. Large serif headline with air, short lines and an editorial rhythm.
3. A quiet, literary, exact voice: no exclamation marks, no icons, no feature grids, no app screenshots with chrome. Radius is 0.

**Fonts.**
- Brand family: Source Serif 4, headings at 600 and body at 400, inlined as a data URI per `procedures/fonts.md`.
- Bundle status was not checked, because intake ran without tools. The runner confirms it with `node scripts/font.mjs list` before roughs.
- If Source Serif 4 is not bundled, the runner names the closest bundled serif here, and every desk uses that same family. No desk falls back to a network font.

**Must be true.**
- Brand palette only. Tints of brand colours are fine, new hues are not. Muted `#8b8d99` and surface `#171923` are available.
- Contrast holds at low phone brightness: at least 4.5:1 for body text.
- Use one typeface at three sizes.
- No emoji, no drop shadows, no gradient-on-gradient, and no centring except on a single short line.
- The "dims with the room" idea is carried through tone and value within the palette, not through animation, since the card is static.
- On portrait, the headline sits in the top 40%, with no empty band taller than a third of the canvas.
- No network requests and no text in images.
- The loop is capped at 6 rounds.

**Scope.**
Quick: one asset, the brand exists, and the copy is given. Desks are roughs (ui-designer), Art Director and Creative Director.
