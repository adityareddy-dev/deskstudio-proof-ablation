<!-- ask: a LinkedIn card and an -->
# Brief: 20261020-0132-linkedin-instagram-portrait-installs

## Deliverable
A social card: one still announcing that Northlight installs are opening in Minneapolis. It is one self-contained HTML file with one `<main data-artboard>`, and media queries adapt the same DOM to both sizes.

## Sizes
- `linkedin`: 1200x627, 6% safe zone on all sides.
- `ig-post`: 1080x1350, 6% safe zone on the sides and top, 10% at the bottom.

## Copy
Use this copy verbatim. Do not add or change any words.

```
Now installing in Minneapolis.
Same panels. Same seven years.
northlight.energy
```

- **Headline:** "Now installing in Minneapolis."
- **Supporting line:** "Same panels. Same seven years."
- **Mark:** "northlight.energy", small and in a corner. It must not be the headline. No CTA is added.

## Brand
The brand file is `.desk/DESIGN.md`. Three things matter most here:
1. **Palette.** Use the warm paper background `#f7f5f0` with foreground `#161614`. Apply a single orange accent, `#d9480f`, once, on the one thing to look at: "Minneapolis" or "seven". Surface `#ebe8e0` and muted `#6b6a66` are allowed.
2. **Layout.** Everything is left aligned with generous margins. Do not use sky gradients, sun icons or leaves.
3. **Voice.** Keep it warm, plain and numerate. Lead with the number where there is one, which here means "seven years" can carry the weight.

## Fonts
- Use Inter: weight 600 for the headline and 400 for body text.
- Inline the font as a data URI per `procedures/fonts.md`.
- If `font.mjs list` shows Inter is not bundled, fall back to the closest bundled neo-grotesque sans. Every desk must use that same family. Arial is the last resort only.

## Must be true
- **Accent and type limits.** Use one accent, applied once, with three type sizes at most.
- **Headline size.** On linkedin the headline is at least 44px high. On ig-post it is at least 65px high, sits in the top 40%, and wraps to no more than 4 lines (3 on linkedin).
- **No dead space on ig-post.** There must be no leftover empty band taller than a third of the canvas.
- **Contrast.** Body text needs at least 4.5:1.
- **Banned elements.** No emoji, no text shadows, no radius on the artboard, no network assets.
- **Text.** All text is real DOM text.
- **Out of scope:** photography, illustration, a logo image (no logo path is set), maps and city imagery.

## Scope
Quick. This is one asset, the brand exists and the copy is given. The desks are three roughs, then the Art Director, then the Creative Director, with the loop capped at 6 rounds.
