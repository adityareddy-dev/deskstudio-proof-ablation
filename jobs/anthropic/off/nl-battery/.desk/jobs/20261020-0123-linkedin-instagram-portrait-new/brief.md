<!-- ask: a LinkedIn card and an -->
# Brief: 20261020-0123-linkedin-instagram-portrait-new

## Deliverable
A social card announcing Northlight's new battery option. It is one self-contained HTML file with one `<main data-artboard>`, and it adapts to both sizes through media queries on the same DOM.

## Sizes
- `linkedin`: 1200x627, with a 6% safe zone on all sides.
- `ig-post`: 1080x1350, with a 6% safe zone on the sides and top and 10% at the bottom.

## Copy
These three lines are verbatim and must not be edited, cut or reordered in meaning:
```
Seven years to break even. Then free.
Battery now included.
northlight.energy
```
- The headline is "Seven years to break even. Then free."
- The supporting line is "Battery now included." It is the news, so it must be clearly readable and must not be reduced to a footnote.
- The mark is "northlight.energy". Set it small, in a corner, as text. It must never be the headline.
- No other words go on the card.

## Brand
The brand file is `.desk/DESIGN.md` (Northlight). The three things that matter most here:
1. **Palette.** Warm paper background `#f7f5f0` with text `#161614`. `#d9480f` is the single accent, used once, on the figure ("Seven years") or on "Then free." `#ebe8e0` (surface) and `#6b6a66` (muted) are allowed as secondary tones.
2. **Layout.** Lead with the number. Left aligned, with generous margins on the 8px unit and a 4px radius on inner elements only.
3. **Voice.** Warm, plain and numerate. Avoid sky gradients, sun icons, leaves and any second accent.

## Fonts
- The family is Inter (stack: Inter, Arial, sans-serif). Weights are 600 for the headline and 400 for body.
- I could not confirm at intake whether Inter is bundled. Before building, run `node "C:/Users/adity/Desktop/Adi/deskstudio/scripts/font.mjs" list`.
  - If Inter is listed, every desk inlines it per `procedures/fonts.md`.
  - If it is not listed, every desk uses the same closest bundled grotesque sans from that list. The first desk to check records which family it used in its return, and later desks match it.

## Must be true
**Headline**
- At least 44px tall on `linkedin` and at least 65px on `ig-post`.
- No more than 3 lines on landscape and 4 on portrait.
- Line height 1.0–1.1 and tracking from -0.02em to -0.01em.

**Type**
- Three sizes at most. Nothing readable goes below 24px.
- One typeface, two weights.

**Composition**
- On `ig-post`, the headline sits in the top 40%.
- No empty band taller than a third of the canvas.
- Not centred.

**Colour and contrast**
- One accent, and it appears once.
- Contrast is at least 4.5:1 for body text.

**Excluded**
- Emoji, drop shadows on text, gradients, any border radius on the artboard, and any "Learn more" call to action.
- No logo file exists (the logo path is empty), so the mark is text only.
- Fonts are inline and nothing loads from the network.
- The job runs at most 6 rounds, at studio quality.

## Scope
Quick. There is one asset, the brand exists and the copy is given. The desks are three roughs, then the Art Director, then the Creative Director.
