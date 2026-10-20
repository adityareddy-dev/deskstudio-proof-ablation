<!-- ask: a LinkedIn card and an -->
# Brief: 20261020-0139-linkedin-instagram-portrait-writing

## Deliverable
Social card. One still, self-contained HTML file per the social-card standard, on the theme of writing at night: the screen dims with the room. Command `design`, quality `studio`, capped at 6 rounds.

## Sizes
- `linkedin` at 1200x627, with a 6% safe zone on all sides.
- `ig-post` at 1080x1350, with a 6% safe zone on the sides and top and 10% at the bottom.
- Both sizes use the same DOM and adapt with media queries.

## Copy
```
The page dims with the room.
Night mode is on by default.
quill.app
```
- **Roles.** "The page dims with the room." is the headline (6 words). "Night mode is on by default." is the supporting line. "quill.app" is the brand mark, set as text because `DESIGN.md` has no logo path.
- **Verbatim.** Use every line exactly as written, with the full stops kept and no exclamation marks. No other words appear on the card.

## Brand
- **File.** `.desk/DESIGN.md` (Quill).
- **Palette.** Dark ink background `#0e0f14`, foreground `#ededf0`, and one pale blue accent `#7c9cff` used once, on a single word (for example "dims") or a single rule. Muted `#8b8d99` and surface `#171923` are the only other colours allowed, and tints of these are fine.
- **Type and rhythm.** Serif headlines, large, with air. Short lines and an editorial rhythm.
- **Voice.** Quiet, literary and exact. The artboard radius is 0.
- **Don'ts.** No feature grids, icons, screenshots with chrome, or exclamation marks.

## Fonts
- **Family.** Source Serif 4, at weight 600 for the headline and 400 for the body. Builders inline it per `procedures/fonts.md`.
- **Bundling not checked.** Intake had no tool access, so I could not run `font.mjs list`. Before roughs, the runner checks whether Source Serif 4 is bundled. If it is not, the runner names the closest bundled serif here, and all desks use that one family.
- **Georgia.** It is not a valid fallback, because the standard does not allow network or system font dependence.

## Must be true
- **Hierarchy.** One headline, one supporting line and the brand mark. Nothing else is required, though at most one quiet element evoking a dimming page or room is allowed.
- **Headline size.** At least about 44px on `linkedin` and about 65px on `ig-post`.
- **Headline position.** On `ig-post` it sits in the top 40%, and no empty band taller than a third of the canvas sits unshaped.
- **Type limits.** One typeface, two weights and three sizes. Readable text is at least 24px.
- **Contrast.** Text is at least 4.5:1 against the actual pixels behind it. Any "dimming" effect must not push text below that ratio.
- **Brand mark.** Small and in a corner. Layouts are left-aligned on a column, not centred.
- **Banned.** No emoji, gradient-on-gradient, text shadow, or border radius on the artboard.
- **Out of scope.** Other sizes, animation and imagery from outside the file.
- **Taste and constraints.** `taste.md` and the constraints in `project.json` add nothing.

## Scope
Quick. This is one asset, the brand exists and the copy is given. Staff the roughs, the Art Director and the Creative Director.
- **Roughs.** The ui-designer makes three directions, drawn from the standard's patterns: type only, editorial split, and full bleed with scrim or frame.
