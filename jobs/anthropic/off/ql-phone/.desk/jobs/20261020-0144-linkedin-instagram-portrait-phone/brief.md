<!-- ask: a LinkedIn card and an -->
# Brief: 20261020-0144-linkedin-instagram-portrait-phone

## Deliverable
A social card set: one still announcing the Quill phone app, built to the social-card standard. The idea is that every cut sentence is still there, even on the train. One artboard per file that adapts by media query, one message, read in under two seconds.

## Sizes
`linkedin` 1200x627 (6% safe zone on all sides) and `ig-post` 1080x1350 (6% on the sides and top, 10% at the bottom).

## Copy
```
Your drafts, on the train.
Now on your phone.
quill.app
```
Use these verbatim, with no additions. The headline is "Your drafts, on the train." The supporting line is "Now on your phone." "quill.app" is the small mark or label and is never the headline. The cut-sentences idea is the concept and is not extra copy. No exclamation marks and no CTA.

## Brand
`.desk/DESIGN.md` (Quill).
1. A dark ink background `#0e0f14` with `#ededf0` text and one `#7c9cff` accent, used once, on one word or one rule.
2. Large serif headlines with air, short lines and an editorial rhythm. The voice is quiet, literary and exact.
3. No feature grids, icons, device screenshots with chrome, or radius (radius is 0). There is no logo file, so the wordmark is set as text.

## Fonts
Use Source Serif 4: heading weight 600, body 400. Inline it per `procedures/fonts.md`. Bundling has not been checked yet. The runner should run `font.mjs list` before roughs. If Source Serif 4 is missing, every desk uses the closest bundled serif the list shows, and that choice is recorded here so all three roughs match. Georgia is not an option, because the output needs an inline font with no network access.

## Must be true
- Use only the brand palette.
- Three type sizes at most.
- Minimum headline height: 7% of the short side on `linkedin` and 6% on `ig-post`.
- The headline sits in the top 40% on portrait, and no empty band taller than a third of the canvas.
- No phone mockup with chrome, no emoji, no gradient background, no text shadow.
- One self-contained HTML file, no network access, all text as real DOM text.
- Out of scope: other sizes, motion, and new copy.

## Scope
Quick: one asset, the brand exists and the copy is given. Desks are roughs (ui-designer), Art Director, and Creative Director. Six rounds.
