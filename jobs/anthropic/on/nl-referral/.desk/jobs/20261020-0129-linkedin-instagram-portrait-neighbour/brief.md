<!-- ask: a LinkedIn card and an -->
**Deliverable.** Social card: one still image for a neighbour referral, built to read in under two seconds in a feed. The idea it has to carry is that one install on a street brings the next one's price down.

**Sizes.** `linkedin` 1200x627 (6% safe zone all sides) and `ig-post` 1080x1350 (6% sides and top, 10% bottom). One HTML file, one `<main data-artboard>`, adapted to each size with media queries on the same DOM.

**Copy.** All of it is given by the user. Use it verbatim, with nothing added or reworded:

```
Your street, one roof at a time.
Every neighbour you bring takes $400 off their quote.
northlight.energy
```

**Brand.** `.desk/DESIGN.md` (Northlight). What matters most here:
1. Lead with the number: $400 is the figure and gets the single orange accent (#d9480f). Nothing else is orange.
2. Warm paper background #f7f5f0 with text in #161614. Use #6b6a66 and #ebe8e0 only for the mark, a label or a block.
3. Left aligned with generous margins. Voice is warm, plain and numerate. No sky gradients, sun icons or leaves.

**Fonts.** Inter, 600 for the headline and 400 for the body, inlined per `procedures/fonts.md`. If `font.mjs list` doesn't include Inter, every desk uses the closest bundled neo-grotesque sans, and the first desk to check names it in its return so the rest match. No Arial fallback in the render.

**Must be true.**
- Follow the social-card standard:
  - Three type sizes at most.
  - The headline is at least 44px on linkedin and at least 65px on ig-post, with portrait headlines in the top 40%.
  - No empty band taller than a third of the portrait canvas.
  - One accent, used once.
  - Contrast at least 4.5:1 for body text.
  - Nothing smaller than 24px except a label.
- The URL is the mark: small and in a corner. It is never the headline or a CTA.
- No logo file exists, so there is no image mark.
- Banned: emoji, illustrations, house or roof icons, sun or leaf imagery, centred layouts, shadows on text, radius on the artboard, "Learn more".
- Self-contained file with no network calls.
- No `taste.md` constraints apply. The cap is 6 rounds.

**Scope.** Quick: one asset, the brand exists and the copy is given. Staff three roughs (each on a different composition pattern, for example stat card on $400, type only, and editorial split), then Art Director, then Creative Director.
