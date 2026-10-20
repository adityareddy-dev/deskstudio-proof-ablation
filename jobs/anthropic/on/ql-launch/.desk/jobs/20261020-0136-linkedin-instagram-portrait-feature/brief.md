<!-- ask: a LinkedIn card and an -->
**Deliverable.** A social card for a feature launch. It is one still per size, built from one HTML file with one `<main data-artboard>`, and adapts with media queries on the same DOM.

**Sizes.** `linkedin` is 1200x627, with a 6% safe zone on all sides. `ig-post` is 1080x1350, with 6% on the sides and top and 10% at the bottom.

**Copy.** Use it verbatim with no additions. The user gave all three lines, so this is not draft copy. The roles below follow the standard.
```
Cut it. It stays.        (headline)
Drafts, not versions.    (supporting line)
quill.app                (mark, small, in a corner, never the headline)
```

**Brand.** `.desk/DESIGN.md` (Quill).
1. Dark ink background `#0e0f14` with light text `#ededf0`. The pale blue accent `#7c9cff` appears once, on one word or one rule. Use the brand palette only, with no new hues.
2. Serif headlines, large and with air. The rhythm should be short-line and editorial, and the voice quiet, literary and exact.
3. Radius is 0 and spacing works on an 8px unit. There is no logo file, so the mark is `quill.app` set as text.

**Fonts.** Use Source Serif 4: weight 600 for the headline and 400 for the body. Intake could not confirm that it is bundled. The first builder checks with `font.mjs list` and inlines it per `fonts.md`. If it is not bundled, the builder picks the closest bundled serif and records it in state, and every later desk uses that same family. Do not fall back to system Georgia.

**Must be true.**
- **No banned elements.** No exclamation marks, feature grids, icons, emoji, screenshots, drop shadows on text, gradient-on-gradient or centred-everything.
- **Type and size limits.** Use three sizes at most and one typeface in two weights.
- **Headline size.**
  - On `linkedin`, the headline is at least about 44px and wraps to three lines at most.
  - On `ig-post`, it is at least about 65px, sits in the top 40%, wraps to four lines at most, and leaves no unshaped empty band taller than a third of the canvas.
- **Text size and contrast.** No readable text below 24px, and body contrast is at least 4.5:1.
- **Delivery.**
  - The file has no network calls and no animation.
  - The loop is capped at 6 rounds (`--rounds 6`), and quality is studio.
- **Scope limits.** There is no `taste.md` and there are no `project.json` constraints. Out of scope: product imagery and any copy beyond the three lines.

**Scope.** Quick: one asset, the brand exists, and the copy is given. Staff three roughs, then the Art Director, then the Creative Director.
