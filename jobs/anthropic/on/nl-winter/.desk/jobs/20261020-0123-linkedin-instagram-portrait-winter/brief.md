<!-- ask: a LinkedIn card and an -->
**Deliverable.** A social card: one still image for a feed, in two sizes. Topic is winter output: Northlight's panels still pay their way in January. Built to be read in under two seconds on a phone.

**Sizes.** `linkedin` 1200x627 (6% safe zone on all sides) and `ig-post` 1080x1350 (6% sides and top, 10% bottom). One HTML file, one `<main data-artboard>`, media queries on the same DOM.

**Copy.**
```
January still pays.
Snow slides off. The numbers don't.
northlight.energy
```
The user gave this copy, so use it word for word. Line 1 is the headline. Line 2 is the supporting line. Line 3 is the brand mark, set as a small wordmark in a corner. Do not add any other copy.

**Brand.** `.desk/DESIGN.md` (Northlight). Three things matter most here:
1. Warm paper background `#f7f5f0`, foreground `#161614`, and orange `#d9480f` used once, on the one thing to look at.
2. Left aligned with generous margins. Spacing unit 8, radius 4, but no radius on the artboard itself.
3. Voice is warm, plain and numerate. No sky gradients, no sun icons, no leaves, and no second accent.

There is no logo file, so `northlight.energy` is the mark.

**Fonts.** Inter, at 600 for the headline and 400 for body. This brief assumes Inter is bundled but did not check, so confirm with `font.mjs list`. If it is not bundled, every desk uses the same closest bundled grotesque. No desk falls back to Arial on its own. Inline the font per `procedures/fonts.md`.

**Must be true.**
- Do not invent any statistic, kWh or percentage figure. The copy has no number.
  - The single optional extra element must be graphic: a typographic or geometric device in the brand palette.
  - It must not be a made-up figure.
- No snowflake, sun or weather clip art, and no stock illustration.
- Headline minimum heights: about 44px on `linkedin` and about 65px on `ig-post`.
- On portrait, the headline sits in the top 40% and there is no leftover empty band taller than a third of the canvas.
- There is no `taste.md`, and `project.json` sets no constraints.
- Out of scope: animation, carousel, other sizes, new copy.

**Scope.** Quick: one asset, brand exists, copy given. Desks are roughs (ui-designer), Art Director and Creative Director. Quality studio, capped at 6 rounds.
