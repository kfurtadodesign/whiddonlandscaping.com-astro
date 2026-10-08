# Whiddon Landscaping — brand system

A **brand-only** design system: tokens, type, and effects, with **no runtime
components**. The source repo is an Astro site whose components are `.astro`
files, which cannot be compiled into a browser-renderable bundle. Build with
plain React/HTML elements and style them in the vocabulary below.

`_ds_bundle.js` exists but exports nothing — do not try to import components
from `window.WhiddonBrand`.

## Setup

No provider, no wrapper, no theme context. Link the one stylesheet:

```html
<link rel="stylesheet" href="styles.css">
```

That pulls in, in order: `tokens/brand.css` (custom properties),
`tokens/utilities.css` (the `brand-*` classes), `tokens/effects.css` (base
type, focus ring, mesh orbs), Nunito Sans from Google Fonts, and Font Awesome
6.5.0. Both fonts load remotely — nothing is self-hosted.

Icons are **Font Awesome 6 solid** (`<i class="fa-solid fa-phone">`) and
`fa-brands` for social. No icon component, no SVG sprite.

## Styling idiom

Tailwind utilities for layout and spacing, plus `brand-*` color classes that
this system defines in plain CSS (so they resolve whether or not Tailwind
processes them). Every `brand-*` name below is also available as
`var(--color-brand-*)`.

| Family | Names |
|---|---|
| Blues | `brand-blue` `#1570A6`, `brand-blue-vivid` `#1B8CC4`, `brand-blue-dk` `#0D2B45`, `brand-blue-nav` `#0B639D` |
| Greens | `brand-green` `#2D7034`, `brand-green-dk` `#1a4a1e`, `brand-green-lt` `#3d8f44` |
| Yellows | `brand-yellow` `#F8DA6D`, `brand-yellow-dk` `#D4A017`, `brand-yellow-lt` `#fff07a` |
| Darks | `brand-ink` `#111111`, `brand-ink-deep` `#0A0A0A`, `brand-charcoal` `#1C1C1C`, `brand-navy` `#0D1B2A`, `brand-forest` `#071A09` |
| Light tints | `brand-cream` `#F0F9FF`, `brand-sky-100` `#EFF6FF`, `brand-sky-200` `#E0F2FE`, `brand-sky-300` `#dbeafe` |

Each takes the `bg-`, `text-`, and `border-` prefix (e.g. `bg-brand-yellow`,
`text-brand-ink`, `border-brand-blue-vivid`). Type families: `font-heading`
and `font-body` — both Nunito Sans.

Non-color rules that make something look like this brand:

- **Headings** are `font-heading font-black uppercase tracking-tight leading-none`.
  Section h2 is `text-3xl md:text-5xl`; hero h1 is `text-5xl md:text-7xl`.
- **Eyebrow** above every heading: `font-heading font-black uppercase tracking-widest text-xl`,
  yellow on dark bands, `brand-blue-vivid` on light ones.
- **Small labels, pills, and button text** are `uppercase tracking-widest`
  at `text-xs`/`text-sm` with `font-black` or `font-bold`.
- **Buttons and pills are always `rounded-full`.** Cards are `rounded-2xl`
  (contained) or `rounded-3xl` (image frames); form inputs are `rounded-xl`.
- **Body copy** is sentence case: `text-gray-500` on light bands,
  `text-gray-400` on dark, with `leading-relaxed`.
- **Sections** are `py-20 px-6`, alternating `bg-white` / `bg-brand-ink` /
  `bg-brand-navy` / `bg-brand-cream`, container `max-w-7xl` or `max-w-5xl mx-auto`.

Two effect classes are available: `mesh-orb` with `orb-green` / `orb-blue` /
`orb-yellow` (animated blurred gradient orbs for dark hero backdrops), and
`owner-arrow` (a looping nudge animation).

`reveal` is shipped as a **no-op** — on the live site it starts at `opacity: 0`
and a scroll observer fades it in, which would render permanently invisible
here. It is neutralized so copied markup still shows. Don't use it; write an
observer explicitly if you want scroll animation.

## Where the truth lives

- `styles.css` and the three files it imports under `tokens/` — the authoritative
  token and class list. Read `tokens/utilities.css` for the exact class names.
- `guidelines/patterns.md` — copy-ready markup for the hero, section headers,
  buttons, pills, service cards, testimonial cards, icon medallions, header,
  footer, and form fields. **Read this before building a page**; it stands in
  for the components this system doesn't ship.
- `guidelines/voice.md` — brand voice, the five canonical services, service
  areas, trust claims, and contact facts. Note the positioning constraint:
  this is maintenance and upkeep, never design-and-install.

## Idiomatic snippet

```jsx
<section className="py-20 px-6 bg-white">
  <div className="max-w-5xl mx-auto text-center">
    <p className="text-brand-blue-vivid font-heading font-black uppercase tracking-widest text-xl mb-3">
      The Whiddon Difference
    </p>
    <h2 className="font-heading font-black text-3xl md:text-5xl text-brand-ink mb-4 uppercase tracking-tight leading-none">
      Why Choose Us?
    </h2>
    <p className="text-gray-500 text-base leading-relaxed mb-10">
      Reliable, affordable upkeep that keeps your property looking its best.
    </p>
    <a
      href="#contact"
      className="inline-block bg-brand-yellow hover:bg-brand-yellow-lt text-brand-ink font-heading font-black uppercase tracking-widest text-sm px-8 py-4 rounded-full shadow-lg transition-all duration-200 hover:-translate-y-0.5"
    >
      Get a Free Quote
    </a>
  </div>
</section>
```
