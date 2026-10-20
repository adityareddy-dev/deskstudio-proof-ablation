<!-- ask: a LinkedIn card and an -->
**Deliverable.** Social card: one still announcing that Northlight installs are now open in Minneapolis. Two artboards from one DOM, a landscape card for LinkedIn and a portrait card for the Instagram feed.

**Sizes.** `linkedin` 1200x627, with a 6% safe zone on all sides. `ig-post` 1080x1350, with 6% at the sides and top and 10% at the bottom.

**Copy.** All three lines must appear verbatim, with the given punctuation. The first is the headline, the second is the supporting line and the third is the mark or label. No other words.
```
Now installing in Minneapolis.
Same panels. Same seven years.
northlight.energy
```

**Brand.** `.desk/DESIGN.md` (Northlight). Three things matter most here:
- Warm paper background `#f7f5f0`, foreground `#161614`, and one orange accent `#d9480f` used once, on the figure or the one thing to look at. "Seven years" or "Minneapolis" are the candidates.
- Left aligned with generous margins. Voice is warm, plain and numerate.
- No sky gradients, sun icons or leaves, and never more than one accent.

**Fonts.** Inter at 600 for the headline and 400 for the body, the brand stack being Inter, Arial, sans-serif. Inline Inter per `procedures/fonts.md` if `font.mjs list` shows it bundled. If it is not bundled, the closest bundled neo-grotesk from that list replaces it. Every desk uses that same family, with no Arial fallback in the render.

**Must be true.**
- The job is capped at 6 rounds (job setting, overriding project.json's 8).
- There is no logo file (`logo.path` is empty), so the brand mark is the text "northlight.energy". It stays small and in a corner, and it is never the headline.
- The social-card standard applies in full:
  - The headline is at least 44px on linkedin and 65px on ig-post.
  - On portrait the headline sits in the top 40%, with no leftover empty band taller than a third of the canvas.
  - Three type sizes, two weights, no emoji, no drop shadows.
- Out of scope: other platforms, imagery or photography, a map or city illustration, and new copy.

**Scope.** Quick. This is one asset, the brand exists and the copy is given. Staff three roughs, then the Art Director and the Creative Director.
