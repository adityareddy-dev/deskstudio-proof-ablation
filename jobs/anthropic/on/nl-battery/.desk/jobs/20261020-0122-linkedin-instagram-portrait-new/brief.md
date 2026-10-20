<!-- ask: a LinkedIn card and an -->
# Brief: 20261020-0122-linkedin-instagram-portrait-new

## Deliverable
A social card announcing Northlight's new battery option, built as one artboard per the social-card standard. Its single message is the payback number, with the battery as the news.

## Sizes
- `linkedin` at 1200x627, with a 6% safe zone on all sides.
- `ig-post` at 1080x1350, with 6% on the sides and top and 10% at the bottom.

Both sizes are built on the same DOM using media queries.

## Copy
These three lines are the user's copy. Use them verbatim and do not rewrite them.

```
Seven years to break even. Then free.
Battery now included.
northlight.energy
```

- The headline is "Seven years to break even. Then free." It is 7 words.
- The supporting line is "Battery now included."
- The mark is "northlight.energy". It sits small in a corner and is never the headline.
- Add no other words. There is no CTA, and "Learn more" is banned.

## Brand
`.desk/DESIGN.md` (Northlight). The three rules that matter most here:
1. Use the warm paper background #f7f5f0 with foreground #161614. The single orange accent #d9480f goes only on the figure, which is "Seven years".
2. Lead with the number. Keep everything left aligned with generous margins.
3. Do not use sky gradients, sun icons, leaves, or a second accent. The logo path is empty, so the mark is the text "northlight.energy" set in the brand type.

## Fonts
- The brand family is Inter, with headings at 600 and body at 400. The type scale uses a base of 16 and a ratio of 1.25, and the spacing unit is 8.
- I could not confirm from here that Inter is bundled. The runner should check with `node "C:/Users/adity/Desktop/Adi/deskstudio/scripts/font.mjs" list` before the roughs start.
- If Inter is bundled, inline it per `procedures/fonts.md`.
- If it is not bundled, the runner should pick the closest bundled neo-grotesque sans, record it here, and every desk uses that same family.
- No desk may fall back to Arial or load from the network.

## Must be true
- The card says one thing. Use one typeface in two weights and three sizes at most.
- The headline must be at least 44px on `linkedin` and at least 65px on `ig-post`. It can wrap to 3 lines at most on landscape and 4 at most on portrait.
- On `ig-post`, the headline sits in the top 40%. There must be no empty band taller than a third of the canvas: the figure or the bottom group has to fill that space.
- Contrast must be at least 4.5:1 for body text and 3:1 for the headline, measured against the actual pixels behind the text.
- The file is one self-contained HTML file. It uses one `<main data-artboard>`, all text is real DOM text, and there is no network, no animation, no text shadow, and no artboard radius.
- The job is capped at 6 rounds (`--rounds 6`).
- There is no taste history to apply, and nothing beyond the card itself is in scope.

## Scope
Quick. This is one asset, the brand exists, and the copy is given. The desks are three ui-designer roughs, then the Art Director, then the Creative Director.
