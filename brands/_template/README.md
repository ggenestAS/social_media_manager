# _template — skeleton brand

Copy this folder to add a brand:

```bash
cp -r brands/_template brands/<new-brand>
```

Then fill in, in order:

1. `brand.md` — mission, audience, visual identity, voice, language, CTA rules.
2. `channels.json` — the brand's Postiz channel aliases (`{provider, handle}`).
   All brands share one Postiz workspace; this just declares which channels are
   this brand's.
3. `assets/` — profile photo, cover image, logos.
4. `context/` — product/offer context for accurate copy.
5. `templates/design-system.md` — palette, fonts, shared CSS, visual signatures.
6. `templates/post-types/<type>/` — one folder per post type the brand publishes.
   Each holds `spec.md` (rules) + `template.html` (starter). Rename/replace the
   `example/` folder. **This directory listing is the post-type menu** the
   organic-post skill reads.
7. `templates/content-calendar.template.md` — the brand's planning grid.

`output/` stays empty until you generate content. Keep this `_template` in sync
with the canonical brand shape whenever the structure evolves.
