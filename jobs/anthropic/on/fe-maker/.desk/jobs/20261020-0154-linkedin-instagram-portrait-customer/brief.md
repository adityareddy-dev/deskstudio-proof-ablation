<!-- ask: a LinkedIn card and an -->
**Deliverable.** A social card: one still image about a customer who machined a bike crank in a spare bedroom. It is built as one self-contained HTML file with a single `<main data-artboard>`, and it adapts to both sizes on the same DOM.

**Sizes.** `linkedin` is 1200x627 with a 6% safe zone on all sides. `ig-post` is 1080x1350 with 6% on the sides and top and 10% at the bottom.

**Copy.** Verbatim, nothing added:
```
A bike crank, from a spare bedroom.
Aluminium, one afternoon, no shop.
ferro.tools
```
- The first line is the headline and the second is the supporting line.
- `ferro.tools` is the brand mark, set as text, because there is no logo file (`logo.path` is empty). It stays small and in a corner.

**Brand.** `.desk/DESIGN.md` (Ferro). Three things matter most here:
1. White `#ffffff` background and black `#0a0a0a` type. Red `#e5173f` appears once only, on the one thing to look at.
2. Hard edges and a 2px radius at most. Heavy 700 headlines with tight tracking. No rounded cards, soft shadows or pastel.
3. The voice is blunt, technical and confident, with plain figures and no decorative adjectives.

**Fonts.**
- The brand family is Geist, with the stack `Geist, Inter, Arial, sans-serif`.
- I could not run `font.mjs list` at intake, so it is not yet confirmed that Geist is bundled.
- If Geist is bundled, builders inline it per `procedures/fonts.md`. If it is not, every desk uses Inter, inlined the same way, so no desk falls back to Arial on its own.
- Weights are 700 for the headline and 400 for the body. Use three sizes at most.

**Must be true.**
- All three lines appear exactly as given. Do not invent a customer name, a photo, specs or other figures.
- No stock illustration, no emoji, and no "Learn more".
- The headline must be at least 44px on `linkedin` and 65px on `ig-post`. On portrait it sits in the top 40%, and there is no leftover empty band taller than a third of the canvas.
- Use the brand palette only. `taste.md` has no entries and `project.json` has no constraints.
- The job is capped at 6 rounds.

**Scope.** Quick: one asset, the brand exists and the copy is given. The desks are roughs, the Art Director and the Creative Director.
