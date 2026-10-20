<!-- ask: a LinkedIn card and an -->
# Brief: 20261020-0129-linkedin-instagram-portrait-neighbour

**Deliverable.** A social card for a neighbour referral offer: one install on a street brings the next neighbour's price down. It is one self-contained HTML file with one `<main data-artboard>` and the same DOM at both sizes, adapted with media queries.

**Sizes.** `linkedin` (1200x627, 6% safe zone on all sides) and `ig-post` (1080x1350, 6% on the sides and top, 10% on the bottom).

**Copy.** All three lines are given by the user and must appear verbatim. No other text goes on the card.

```
Your street, one roof at a time.
Every neighbour you bring takes $400 off their quote.
northlight.energy
```

Roles: the first line is the headline (seven words), the second is the supporting line, and `northlight.energy` is the brand mark. The mark is set small in a corner and is never the headline.

**Brand.** `.desk/DESIGN.md` (Northlight). The three things that matter most here:
1. Warm paper background `#f7f5f0`, ink `#161614`, and a single accent `#d9480f`. The accent goes on "$400" and nowhere else.
2. Lead with the number, left aligned, with generous margins.
3. No sky gradients, sun icons, or leaves. The voice is warm, plain and numerate.

**Fonts.** Inter, at 600 for the headline and 400 for the body, inlined per `procedures/fonts.md`. Intake had no tool access, so it has not been checked whether Inter is bundled. The first desk runs `font.mjs list`. If Inter is missing, every desk falls back to Arial, the next family in the brand stack, so the whole job uses one face.

**Must be true.**
- Quality is studio. The round cap is 6, set by the user and overriding the default of 8.
- Use one typeface, two weights and three sizes at most.
- The headline is at least 44px tall on `linkedin` and at least 65px on `ig-post`.
- On `ig-post`, the headline sits in the top 40% of the canvas. No empty band taller than a third of the canvas.
- Use only the brand palette. No logo file exists, so the mark is the text `northlight.energy`.
- Banned: stock illustration, house or roof clip-art, emoji, drop shadows, centred layout, and "Learn more".
- Out of scope: other sizes, captions or post copy, and any terms or fine print for the offer.

**Scope.** Quick. This is one asset with an existing brand and the copy given. The desks are roughs, Art Director and Creative Director.
