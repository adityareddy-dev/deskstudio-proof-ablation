<!-- ask: a LinkedIn card and an -->
# Brief: 20261020-0201-linkedin-instagram-portrait-open

## Deliverable
A social card: one still image for an open workshop day at the Ferro factory. It is one HTML file with one `<main data-artboard>`, and media queries adapt the same DOM to each size. Command `design`, quality `studio`, capped at 6 rounds.

## Sizes
- `linkedin` 1200x627, with a 6% safe zone on all sides.
- `ig-post` 1080x1350 (Instagram portrait), with a 6% safe zone on the sides and top and 10% at the bottom.

## Copy
These lines are given by the user and must appear verbatim, with no added or changed words:

```
Open workshop. Saturday November 8.
Bring a part. Leave with it cut.
ferro.tools
```

- **Headline:** "Open workshop. Saturday November 8."
- **Supporting line:** "Bring a part. Leave with it cut."
- **Brand mark:** "ferro.tools", small and in a corner. It is never the headline.

## Brand
`.desk/DESIGN.md` (Ferro). The three rules that matter most here:

- **Colour.** Use a white background (#ffffff) with black type (#0a0a0a). Red (#e5173f) appears once, on the date figure "8" or "November 8" only.
- **Shape.** Use hard edges, a heavy 700 headline and tight tracking. Radius stays at 2 or less. No rounded cards, soft shadows or pastel.
- **Voice.** Blunt, technical and confident. There is no logo file (`logo.path` is empty), so "ferro.tools" set in the brand type is the mark.

## Fonts
- **Brand family:** Geist (stack: Geist, Inter, Arial, sans-serif). Use weight 700 for the headline and 400 for body text.
- **Unverified:** I could not run `font.mjs list`, so I don't know whether Geist is bundled.
- **Rule for every desk:** Inline Geist if it is bundled. If it is not, every desk uses Inter, inlined per `procedures/fonts.md`. Never fall back to a system font.

## Must be true
- **Headline size.** The headline is at least 44px tall on linkedin and at least 65px on ig-post. It sits in the top 40% on portrait and wraps to no more than 3 lines on landscape or 4 on portrait.
- **Type scale.** Use three type sizes at most, with nothing readable below 24px.
- **Portrait band.** On ig-post, no empty band taller than a third of the canvas may sit between the headline and the bottom group.
- **Elements.** At most one extra element is allowed, for example a large date figure.
- **Banned.** No emoji, no added CTA, and no "Learn more". No images or illustrations unless they come from brand assets, and none exist.
- **Out of scope.** Story, square and other sizes, animation, and any copy beyond the three lines above. There are no `project.json` constraints and no `taste.md` notes.

## Scope
Quick. This is one asset at two sizes, the brand exists and the copy is given. The job runs roughs, the Art Director and the Creative Director.
