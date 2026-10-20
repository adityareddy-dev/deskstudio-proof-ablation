<!-- ask: a LinkedIn card and an -->
# Brief: 20261020-0210-linkedin-instagram-portrait-asking

## Deliverable
Social card: one still image asking designers and developers to contribute a desk to Desk Studio. It has one artboard, one HTML file, and adapts to two sizes from the same DOM. It must read in under two seconds on a phone.

## Sizes
- `linkedin` is 1200x627, with a 6% safe zone on all sides.
- `ig-post` is 1080x1350, with a 6% safe zone on the sides and top and 10% at the bottom.

## Copy
```
Add a desk.
One brief file. One registry line.
deskstudio.ai
```
- The copy above is verbatim from the user. No desk may reword it.
- The headline is "Add a desk." and the supporting line is "One brief file. One registry line."
- `deskstudio.ai` is the brand mark and sign-off. It sits small, in a corner, and is never the headline.
- No other words, and no CTA like "Learn more".

## Brand
`.desk/DESIGN.md`. The three things that matter most here:
1. Dark ground `#0b0b0c` with foreground `#f4f4f5`. Muted `#8a8a93` and surface `#141416` are available.
2. The accent `#ffb000` is used once only, on the one thing to look at.
3. Left aligned, big type, lots of air, radius 0. The voice is plain and short. No gradients, blobs, emoji or drop shadows.

## Fonts
- The brand family is Geist, at weights 600 and 400.
- Check `font.mjs list`. If Geist is bundled, inline it per `procedures/fonts.md`.
- If Geist is not bundled, every desk uses Inter, at the same weights. If Inter is not bundled either, every desk uses the closest bundled neo-grotesque.
- All desks must use the same family. No network fonts.

## Must be true
**Type:**
- One typeface, two weights, three sizes at most.
- The headline is at least 44px tall on `linkedin` and at least 65px on `ig-post`. Tracking is −0.02em to −0.01em and line height is 1.0 to 1.1.
- Nothing readable is under 24px.

**Composition:**
- On `ig-post` the headline sits in the top 40%.
- No empty band taller than a third of the canvas. Either shape the air or fill it.
- No centred layout.

**Colour and contrast:**
- Brand palette only.
- Contrast is at least 4.5:1 for body text.

**Mark:**
- There is no logo file. The brand appears only as the small `deskstudio.ai` text.

**Out of scope:**
- Imagery, illustration, stock art and animation.
- Extra copy and extra sizes.

**Rounds and taste:**
- The rounds cap is 6.
- `taste.md` is empty and `project.json` has no constraints.

## Scope
Quick: one asset, the brand exists and the copy is given. The desks are three roughs, the Art Director and the Creative Director. The owning builder is ui-designer.
