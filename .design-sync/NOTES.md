# design-sync notes

## Shape: brand-only (decided 2026-10-08)

This repo is an Astro static site, not a component library. Its UI lives in
`.astro` files, which the Astro compiler processes for its own SSR pipeline and
which **cannot** be compiled into the browser-renderable JS bundle that
claude.ai/design loads components from. `package-build.mjs` does not apply —
it would report `[ZERO_MATCH]` (no PascalCase `.d.ts` exports).

The user was offered three paths (brand-only / port the components to React /
stop) and chose **brand-only**: ship tokens, type, effects, and guidelines; no
components. Re-ask before changing this.

## Why the layout is hand-produced

- `ds-bundle/tokens/brand.css` — transcribed from the `@theme` block in
  `src/styles/global.css`.
- `ds-bundle/tokens/utilities.css` — **generated**, run
  `node .design-sync/gen-utilities.mjs` after editing `brand.css`.
- `ds-bundle/tokens/effects.css` — ported from the rest of `global.css`.
- `ds-bundle/README.md` — `.design-sync/conventions.md` + a generated body,
  stitched by hand (no converter run to stitch it).
- `_ds_sync.json` is **intentionally omitted**: with no components there is
  nothing for a re-sync to skip, so the next run re-verifies everything. That
  is the correct, documented safe state.

## Gate

`node .design-sync/validate-brand.mjs ds-bundle` must exit 0 before upload.
It checks the `styles.css` `@import` closure resolves, every shipped CSS file
parses (via the `lightningcss` that ships with Tailwind v4), every `var()`
resolves, every name the docs enumerate is defined in the shipped CSS, quoted
hex values match the token definitions, and `.reveal` is not shipped invisible.
Both halves have been negative-tested — they do fail when they should.

## Findings worth keeping

- **Tailwind v4 tree-shakes `@theme`.** The compiled site CSS
  (`dist/_astro/*.css`) contains only `--color-brand-green` and
  `--color-brand-green-dk`, because those are the only theme vars the markup
  references. Do **not** source tokens from the build output — transcribe the
  `@theme` block in `src/styles/global.css` instead.
- **The site does not use its own `brand-*` utilities.** Zero occurrences of
  `bg-brand-*` / `text-brand-*` etc.; everything is arbitrary hex
  (`bg-[#111111]`, `text-[#F8DA6D]`, ...). The design system documents the
  `brand-*` names as the canonical vocabulary because the design agent needs
  names, and ships them as plain CSS classes so they resolve without a Tailwind
  build. Consider adopting them in the site too — it would make the two agree.
- **Surface tokens added at sync time.** `brand-blue-nav` `#0B639D`,
  `brand-ink` `#111111`, `brand-ink-deep` `#0A0A0A`, `brand-forest` `#071A09`,
  `brand-navy` `#0D1B2A`, `brand-yellow-lt` `#fff07a`, `brand-sky-100/200/300`.
  These carry most of the page's surfaces but have no name in the repo's
  `@theme`. Values are verbatim from the source. If they get added to
  `global.css`, keep the names identical.
- **`.reveal` is shipped neutralized.** On the site it is `opacity: 0` until the
  `IntersectionObserver` in `Layout.astro` adds `.visible`. Designs have no such
  observer, so shipping it verbatim would render content permanently invisible.
  It ships as a visible no-op and the README tells the agent not to use it.
- **A `*/` inside a CSS comment broke `utilities.css`.** The generated header
  originally read `bg-brand-*/text-brand-*`, whose `*/` terminated the comment
  early and invalidated the rest of the file. Caught by the lightningcss parse
  check, not by grep. `gen-utilities.mjs` carries a warning about it.
- **Fonts are remote, not self-hosted.** Nunito Sans (Google Fonts) and Font
  Awesome 6.5.0 (cdnjs) load via `@import url(...)` in `styles.css`, matching
  the live site's `<link>` tags. Both need network access at render time. If
  offline rendering ever matters, self-host the woff2 files into `fonts/`.
- **No browser render check was run.** `playwright` is not installed in this
  repo and a brand-only bundle has no component previews to screenshot. The
  static gate above is the substitute. If components are ever added, install
  playwright and use the real render check.

## Environment

- Node 24.18.1 (repo pins `engines.node >= 22.12.0`); `package-lock.json` →
  `npm ci`. `node_modules` was already installed and was not reinstalled.
- `ds-bundle/` is gitignored — it is regenerable output.
