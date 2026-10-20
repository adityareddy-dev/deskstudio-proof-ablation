<!-- ask: a LinkedIn card and an -->
# Brief: 20261020-0200-linkedin-instagram-portrait-open

## Deliverable
A social card announcing an open workshop day at the Ferro factory on Saturday November 8. It is one self-contained HTML file with one `<main data-artboard>` on one DOM, and it adapts to both sizes through media queries.

## Sizes
- `linkedin` is 1200x627, with a 6% safe zone on all sides.
- `ig-post` is 1080x1350, with a 6% safe zone on the sides and top and 10% at the bottom.

## Copy
Use this copy verbatim and add no other words.

```
Open workshop. Saturday November 8.
Bring a part. Leave with it cut.
ferro.tools
```

- The headline is "Open workshop. Saturday November 8."
- The supporting line is "Bring a part. Leave with it cut."
- The mark is "ferro.tools", kept small in a corner.

## Brand
The brand file is `.desk/DESIGN.md` (Ferro). Three things matter most here:
1. The card has a white `#ffffff` background and black `#0a0a0a` type. Red `#e5173f` appears once, on the date ("November 8" or "8"). Muted `#737373` and surface `#f2f2f2` are the only other colours allowed.
2. Headlines are heavy at weight 700 with tight tracking. Edges are hard, the radius is 2 or less, and there are no soft shadows, no rounded cards and no pastel.
3. The voice is blunt and technical. There are no added adjectives, and figures are written as plain figures.

`logo.path` is empty. The mark is "ferro.tools" set as text, so do not invent a logo.

## Fonts
- The brand family is Geist, with the stack "Geist, Inter, Arial, sans-serif".
- I have not confirmed whether Geist is bundled. Check with `node "C:/Users/adity/Desktop/Adi/deskstudio/scripts/font.mjs" list`.
- If Geist is not bundled, every desk uses Inter instead.
- Builders inline the font per `procedures/fonts.md`. Use two weights only: 700 for the headline and 400 for the body.

## Must be true
- All three copy lines appear verbatim as real DOM text, inside the safe zones, with no network requests.
- The headline is at least 44px on `linkedin` and at least 65px on `ig-post`. Use three type sizes at most, and no type below 24px except for the mark.
- On portrait, the headline sits in the top 40% of the canvas, and no empty band taller than a third of the canvas is left over.
- There are no emoji, no "Learn more", no gradients, no stock illustration and no URL as the headline.
- There is no `taste.md` on file and `project.json` sets no constraints. The loop is capped at 6 rounds. Only these two sizes are in scope.

## Scope
Quick: one asset, the brand exists and the copy is given. The desks are three roughs, the Art Director and the Creative Director.
