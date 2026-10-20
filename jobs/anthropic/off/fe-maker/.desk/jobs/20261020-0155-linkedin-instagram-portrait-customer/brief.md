<!-- ask: a LinkedIn card and an -->
**Deliverable.** Social card: one still per size, a customer story. A Ferro customer machined an aluminium bike crank in a spare bedroom on a desk-sized mill. One headline, one supporting line, the mark. At most one more element, such as the crank as a figure, a spec, or a time.

**Sizes.** `linkedin` 1200x627 (6% safe zone all sides) and `ig-post` 1080x1350 (6% sides and top, 10% bottom). One DOM, adapted with media queries.

**Copy.**
```
A bike crank, from a spare bedroom.
Aluminium, one afternoon, no shop.
ferro.tools
```
The text is verbatim and is all the copy on the card. Do not add a CTA, other words, or emoji. Headline: "A bike crank, from a spare bedroom." Supporting line: "Aluminium, one afternoon, no shop." Mark: "ferro.tools", small, in a corner.

**Brand.** `.desk/DESIGN.md` (Ferro). The three things that matter here:
1. White #ffffff background, black #0a0a0a type, and red #e5173f used once only, on the one thing to look at.
2. Hard edges (radius 2), heavy 700 headlines, tight tracking. No rounded cards, soft shadows or pastel.
3. Voice is blunt and technical. Specs are plain figures, never adjectives.

**Fonts.** The brand family is Geist (700 headline, 400 body). Check with `node "C:/Users/adity/Desktop/Adi/deskstudio/scripts/font.mjs" list`. If Geist is not bundled, every desk uses Inter as the fallback. Inline the font per `procedures/fonts.md`. Use one family with two weights, no network.

**Must be true.**
- The headline is at least 44px on linkedin and at least 65px on ig-post. It wraps to no more than 3 lines on landscape and 4 on portrait.
- Use three type sizes at most.
- On ig-post, no empty band taller than a third of the canvas.
- No stock illustration and no text in images. Any crank figure must be pure HTML/CSS/SVG in the brand palette.
- Contrast is at least 4.5:1 for body text.
- `project.json` sets no constraints and there is no `taste.md`.
- The cap is 6 rounds (`--rounds 6`), quality studio.
- Out of scope: other sizes, a carousel, a customer photo, and naming the customer.

**Scope.** Quick: one asset, the brand exists, and the copy is given. Desks: three roughs, then Art Director, then Creative Director.
