# Handoff: Whiddon Landscaping — Homepage Redesign

## Overview
A modern, dark, agency-style homepage for Whiddon Landscaping & Lawn Care LLC (Metro Atlanta). It replaces the current homepage of the Astro site `whiddonlandscaping.com-astro` (live preview: https://whiddonlandscaping-com-astro.vercel.app/). All copy comes from the existing site; branding follows the existing Whiddon brand tokens.

## About the Design Files
`Whiddon Homepage.dc.html` is a **design reference built in HTML**, a prototype that shows the intended look and behavior. It is not production code. Recreate it in the target codebase (the existing **Astro + Tailwind** site), using its established patterns: `Layout.astro`, `Navbar.astro`, `Footer.astro`, `TestimonialCard.astro`, Tailwind utilities, and the `brand-*` color classes. Open the HTML file in a browser to see it running (it needs network access for fonts, icons, and images).

The prototype uses inline styles only, which is a limitation of the prototyping format. In Astro, convert them to Tailwind classes and `brand-*` utilities.

## Fidelity
**High-fidelity.** Colors, typography, spacing, radii, and interactions are final. Recreate them pixel-accurately.

## Global
- Page background `#0A0A0A`. Font: Nunito Sans (400–900) for everything. Icons: Font Awesome 6.5 solid/brands.
- Content container: `max-width: 1280px; margin: 0 auto; padding: 0 24px`.
- Section vertical padding: **128px** (larger than the old site's py-20, for a more editorial feel).
- Headings: weight 900, UPPERCASE, `letter-spacing: -0.03em`, `line-height: 0.88–0.95`.
- Eyebrows: weight 900, 18px, `letter-spacing: 0.25em`, uppercase. Yellow `#F8DA6D` on dark bands, `#1B8CC4` on light bands.
- Buttons/pills are always fully rounded (`9999px`). Cards and image frames use 24px. Inputs use 12px.
- Button text: weight 900, 12–14px, `letter-spacing: 0.2em`, uppercase.
- Primary button: bg `#F8DA6D`, text `#111111`. Hover: bg `#fff07a` and `translateY(-2px)`, 200ms.
- Secondary button (on dark): 2px border `rgba(255,255,255,0.6)`, white text. Hover: bg `rgba(255,255,255,0.1)`.

## Sections (top → bottom)

### 0. Floating CTA
`position: fixed; right: 24px; bottom: 24px; z-index: 60`. Yellow primary pill, "GET A FREE QUOTE →", padding 18px 26px, 13px text, shadow `0 12px 32px rgba(0,0,0,0.35)`. Links to `#contact`.

### 1. Header (floating pill nav)
- Fixed, `top: 16px`, centered, max-width 1280px.
- Pill: `border-radius: 9999px`, bg `rgba(10,10,10,0.55)`, `backdrop-filter: blur(16px)`, 1px border `rgba(255,255,255,0.1)`, padding `10px 10px 10px 24px`.
- Left: `whiddon-logo.svg` at 40px tall.
- Center: links About / Services / Process / Areas. White, 12px, weight 800, `letter-spacing: 0.2em`, uppercase, gap 28px. Hover color `#F8DA6D`.
- Right: 44×44 circular phone icon button (1px border `rgba(255,255,255,0.25)`, links to `tel:+14704433344`), then a yellow "GET A FREE QUOTE" pill (12px, padding 15px 24px).
- Mobile: collapse the center links into a hamburger (yellow, as on the current site).

### 2. Hero (`#top`)
- `min-height: 100vh`, content aligned to the bottom (flex column, `justify-content: flex-end`), padding `160px 24px 48px`.
- Layers, back to front: `#071A09` base → `mesh-orb orb-green / orb-blue / orb-yellow` → `hero-lawn.webp` (object-fit cover) → scrim `linear-gradient(180deg, rgba(10,10,10,.75) 0%, rgba(17,17,17,.35) 40%, rgba(10,10,10,.92) 100%)`.
- Eyebrow row: a 40×2px yellow rule, then "METRO ATLANTA + SURROUNDING AREAS" (14px, weight 900, 0.25em, yellow), gap 12px, margin-bottom 28px.
- H1: `font-size: clamp(52px, 10.5vw, 168px)`, line-height 0.88, `letter-spacing: -0.035em`, margin-bottom 36px. Three lines:
  1. "LAWN & HOME" in white
  2. "MAINTENANCE" as outlined text (`color: transparent; -webkit-text-stroke: 2px #fff`)
  3. "MADE " in white + "EASY." in `#F8DA6D`
- CTA row directly under the H1 (flex, gap 12px, wrap, margin-bottom 48px). The two buttons should sit side by side on desktop and tablet:
  - Primary "GET A FREE QUOTE →": 14px, padding 20px 32px, shadow `0 10px 30px rgba(248,218,109,0.25)`
  - Secondary "📞 (470) 443-3344": padding 18px 30px, links to `tel:+14704433344`
- Bottom bar: 1px top border `rgba(255,255,255,0.15)`, padding-top 32px. Flex with `justify-content: space-between`, gap `24px 48px`, wrap.
  - Lede (flex `1 1 420px`, max-width 620px): "Reliable, affordable lawn maintenance and exterior home upkeep that keep your property looking its best, year-round." `#d1d5db`, 18px, line-height 1.6.
  - Trust pills (gap 8px): "10+ YEARS EXPERIENCE", "LOCALLY OWNED", "LICENSED & INSURED". 2px border `#F8DA6D`, yellow text, 11px, weight 700, 0.12em, padding 8px 16px.
- Optional variant: hide the photo and show only the mesh orbs.

### 3. Marquee strip
- bg `#F8DA6D`, 1px top and bottom borders `#D4A017`, padding 22px 0, overflow hidden.
- Repeating row: the five service names + "Metro Atlanta + Surrounding Areas". Each item is followed by a `fa-leaf` icon in `#2D7034` at 0.5em. Text is `#111111`, weight 900, `clamp(28px, 3.4vw, 48px)`, uppercase, `letter-spacing: -0.02em`, gap/padding 40px.
- Animation: duplicate the list twice and run `translateX(0 → -50%)`, 40s linear infinite. Respect `prefers-reduced-motion` (pause it).

### 4. About (`#about`) — white band
- Two columns (`repeat(auto-fit, minmax(min(100%, 420px), 1fr))`, gap 64px, vertically centered).
- Left: eyebrow "OUR STORY". H2 "THE DEPENDABLE CREW FOR THE **EVERYDAY UPKEEP.**" (the last two words in `#2D7034`), `clamp(36px, 4.6vw, 68px)`, margin-bottom 32px. Two paragraphs in `#6b7280`, 17px, line-height 1.7, max-width 560px:
  - "Whiddon Landscaping & Lawn Care LLC is a family-owned business focused on lawn maintenance and exterior home upkeep across Metro Atlanta + Surrounding Areas."
  - "From routine mowing and seasonal cleanups to pressure washing and roof & gutter cleaning, we keep your lawn and the outside of your home clean, tidy, and well-maintained — so you can enjoy your property without the work."
  - Then a text link "SEE OUR SERVICES →" in `#1570A6`, 13px, weight 900, 0.2em. Hover: gap 10 → 16px.
- Right: `about-taylor.jpg` in a 4:5 frame, radius 24px, bg `#2D7034`, max-width 520px, aligned right. An overlapping badge sits at `left: 0; bottom: 32px`: a dark `#111111` pill containing a 48px yellow circle with a `fa-leaf` icon, then "TAYLOR WHIDDON" (15px, weight 900) over "OWNER" (12px, `#9ca3af`, 0.2em). Shadow `0 20px 40px rgba(0,0,0,0.25)`.
- Stats row (margin-top 112px, 2px top border `#111111`, 4 columns with `auto-fit minmax(200px, 1fr)`). Each stat is a big number (`clamp(48px, 6vw, 88px)`, weight 900, `-0.04em`) with a 12px weight-800 uppercase label in `#6b7280`. The suffix in each number is `#1B8CC4`:
  - "10+" / Years experience
  - "14" / Neighborhoods served
  - "24h" / Quote response
  - "6d" / Days a week, 7am–6pm
  - **Have the client confirm these numbers before launch.**

### 5. Services (`#services`) — `#111111` band
- Header row (space-between, wrap): eyebrow "WHAT WE OFFER" + H2 "DISCOVER / OUR SERVICES" (`clamp(40px, 6vw, 96px)`) on the left. On the right, a lede (max-width 380px, `#9ca3af`): "Lawn maintenance and exterior home upkeep, done right every time. We focus on routine upkeep and basic landscaping touch-ups — not full landscape design or installation."
- Two columns (min 460px, gap 56px):
  - **Left: interactive accordion list.** 1px top border on the list and 1px bottom border on each row (`rgba(255,255,255,0.12)`), row padding 28px 0. Each row has a number "01"–"05" (14px, 32px wide), a title (`clamp(24px, 2.8vw, 40px)`, weight 900, uppercase), and a 48px circular arrow button.
    - Inactive row: number `#6b7280`, title `#9ca3af`, button transparent with a white arrow.
    - Active row: number `#F8DA6D`, title `#FFFFFF`, button bg `#F8DA6D` with an `#111111` arrow rotated −45°. The description expands (max-height 0 → 160px with an opacity fade, 400ms). Description is 15px, `#9ca3af`, margin `16px 72px 0 56px`.
    - Hover **or** click/tap activates a row. The first row is active by default. Color transitions are 300ms.
    - Under the list: a yellow "GET A QUOTE →" pill, margin-top 40px.
  - **Right: sticky image panel** (`position: sticky; top: 120px`), 4:5, radius 24px, bg `#2D7034`. All five images are stacked absolutely. The active one has opacity 1 and scale 1; the others have opacity 0 and scale 1.08 (opacity 500ms, transform 900ms). Bottom overlay: gradient `rgba(10,10,10,.85) → 0`, padding 28px, showing the active number in big yellow (72px) on the left and the active title (12px, 0.2em, white) on the right.
- Services and copy:
  1. **Lawn Maintenance**: "Regular mowing, trimming, and edging on a schedule that fits your lawn, cut to the right height and kept consistently neat and healthy." (`service-mowing.webp`)
  2. **Full-Service Yard Cleanup**: "Seasonal leaf and debris removal, bed clearing, and a complete tidy-up to get your whole yard looking sharp." (`service-cleanup.webp`)
  3. **Landscaping**: "Mulch, pinestraw, rock, fresh flowers, and other basic landscaping touch-ups to refresh your beds and borders." (`service-edging.webp`)
  4. **Pressure Washing**: "Blast away dirt, grime, mold, and buildup from driveways, walkways, patios, decks, and siding, leaving every surface looking new." (`service-pressure-washing.jpg`; this file failed to load from the Vercel preview, so the prototype shows a placeholder. Use the repo's local `/images/` file.)
  5. **Roof & Gutter Cleaning**: "Complete roof debris removal plus a full gutter flush that clears moss, leaves, and buildup, protecting your home top to bottom." (`service-roof-gutter.jpg`; same note as above.)
- Mobile: the columns stack. Consider placing each image inline inside its expanded row instead of using the sticky panel.

### 6. Process (`#process`) — `#F0F9FF` band
- Header: eyebrow "THE PROCESS", H2 "HOW IT WORKS", and a right-hand lede "Getting started is simple. Here's what to expect."
- Four cards (`auto-fit minmax(240px, 1fr)`, gap 16px). Each card: bg white, radius 24px, padding 32px, min-height 300px, flex column with space-between. Top: a 56px icon medallion (bg `#EFF6FF`, icon `#1B8CC4`) and a big number "01"–"04" (64px, `#dbeafe`). Bottom: the title (22px, weight 900, uppercase) and body text (15px, `#6b7280`). Hover: `translateY(-6px)` with shadow `0 24px 48px rgba(13,43,69,0.12)`, 300ms.
  1. `fa-phone`: Call or Request Online / "Reach out by phone or our quote form."
  2. `fa-clipboard-check`: Free Assessment / "We evaluate your property and give a no-obligation quote."
  3. `fa-calendar-check`: Schedule Your Service / "Pick a time that works for you."
  4. `fa-mug-hot`: Enjoy Your Property / "Sit back while we do the work." **This card is inverted:** bg `#0D1B2A`, yellow medallion, number `rgba(255,255,255,0.15)`, body text `#9ca3af`.

### 7. Testimonials — `#0D1B2A` band
- Eyebrow "DON'T TAKE OUR WORD FOR IT".
- Featured quote row (two columns, gap 56px, margin-bottom 64px):
  - Blockquote: "“TAYLOR DOES AMAZING WORK! MY YARD LOOKS BETTER THAN IT **EVER HAS.**”" (the last two words in yellow), `clamp(32px, 4.4vw, 64px)`, weight 900, line-height 1.02.
  - Beside it: 5 yellow stars, "JOANN C.", and "Real reviews from real homeowners across Metro Atlanta + Surrounding Areas."
- Three cards (`auto-fit minmax(260px, 1fr)`, gap 16px): 1px border `rgba(255,255,255,0.12)`, bg `rgba(255,255,255,0.03)`, radius 24px, padding 32px. Each has 5 stars (12px, yellow), the quote (17px, `#e5e7eb`), and the name (12px, weight 900, 0.2em, `#9ca3af`):
  - Shawn T.: "Very professional and reliable. My lawn has never looked this good!"
  - LaTanya M.: "Great communication and quality work. Will definitely use again!"
  - Chandler G.: "Showed up on time, did excellent work, and the price was fair."

### 8. Why Choose Us + Service Areas (`#areas`) — white band
- Two columns (min 460px, gap 72px).
- **Left:** eyebrow "THE WHIDDON DIFFERENCE", H2 "WHY CHOOSE US?" (`clamp(40px, 5vw, 80px)`), then a 2×2 feature grid (gap 36px 32px). Each feature has a green `#2D7034` icon at 22px, a title (18px, weight 900, uppercase), and body text (15px, `#6b7280`):
  - `fa-house-chimney`: Family-Owned & Local / "A local business that cares about the community it serves."
  - `fa-clock`: Reliable & On-Time / "We show up when we say we will, every single time."
  - `fa-tag`: Affordable Pricing / "Fair, transparent pricing with no hidden fees."
  - `fa-thumbs-up`: Satisfaction Guaranteed / "Your satisfaction is our top priority on every job."
- **Right: map card.** Radius 24px, padding 48px 40px, bg `#071A09`, overflow hidden.
  - Background: an OpenStreetMap embed iframe `https://www.openstreetmap.org/export/embed.html?bbox=-84.55,33.62,-84.15,33.88&layer=mapnik`, inset −60px (so the map controls are cropped out), `pointer-events: none`, `aria-hidden`, `filter: grayscale(1) invert(1) contrast(0.9) brightness(0.9)`.
  - Scrim over the map: `linear-gradient(160deg, rgba(7,26,9,.92) 0%, rgba(7,26,9,.72) 45%, rgba(26,74,30,.55) 100%)`.
  - Yellow 18px location dot at `right: 28%; top: 46%`, with ring shadows `0 0 0 8px rgba(248,218,109,.25), 0 0 0 18px rgba(248,218,109,.1)`. It is decorative and placed by eye, so pin it to East Atlanta properly.
  - A static map image or Mapbox/Leaflet with a dark style would be a cleaner production choice.
  - Content: eyebrow "WHERE WE WORK", H3 "SERVING METRO ATLANTA + SURROUNDING AREAS" (`clamp(28px, 3vw, 44px)`), and "We proudly serve homeowners across these neighborhoods and beyond." (`#9ca3af`).
  - Then 14 green pills (bg `#2D7034`, hover `#3d8f44`, white text, 12px, weight 700, 0.08em, padding 9px 18px): East Atlanta, Decatur, Kirkwood, Edgewood, Candler Park, Little Five Points, Reynoldstown, Cabbagetown, Grant Park, Ormewood Park, East Lake, Oakhurst, Avondale Estates, Clarkston.

### 9. Contact / Quote (`#contact`) — `#111111` band
- Two columns (min 400px, gap 64px).
- **Left:** eyebrow "FREE ESTIMATE". H2 "GET A / FREE **QUOTE**" (QUOTE in yellow), `clamp(48px, 7vw, 112px)`, line-height 0.88. Lede: "Tell us what you need and we'll get back to you within 24 hours."
- Below the lede, a contact list: rows with 1px dividers `rgba(255,255,255,0.12)` and padding 22px 0. Each row has a label on the left (12px, `#9ca3af`, 0.2em) and the value on the right (weight 900, white, hover yellow):
  - Phone (470) 443-3344
  - Email whiddonllc@gmail.com
  - Hours Mon–Sat · 7am–6pm
- **Right: form card.** Bg white, radius 24px, padding 40px.
  - Fields in a 2-column grid (min 200px each): Full Name\*, Email Address\*, Phone Number\*, Service Address\*.
  - Labels: 11px, weight 800, 0.18em, uppercase.
  - Inputs: 1px border `#d1d5db`, radius 12px, padding 14px 16px, 15px text. Focus: transparent border with ring `0 0 0 2px #1570A6`.
  - "Services Needed\* — Select all that apply.": 5 toggle chips. Off: white bg, `#d1d5db` border, `fa-plus` icon. On: `#2D7034` bg and border, white text, `fa-check` icon.
  - Message textarea (4 rows). Placeholder: "Lot size, gate code, anything we should know…"
  - Full-width yellow submit button "SEND MY REQUEST →".
- **Validation:** if no service is selected on submit, show "Please select at least one service." (13px, `#b91c1c`). Selecting a chip clears the error. Required fields use native validation.
- **Success state:** the form is replaced by a 64px green check circle, "REQUEST RECEIVED." (36px), "Thanks! We'll get back to you within 24 hours. Need us sooner? Call (470) 443-3344.", and a "SEND ANOTHER →" link that resets the form.
- **Wire the form to the existing site's submission endpoint.** The prototype does not send data.

### 10. Footer — `#0A0A0A`
- 1px top border `rgba(255,255,255,0.08)`, padding 80px 24px 32px.
- Three columns:
  - Logo (48px) + "Lawn maintenance and exterior home upkeep in East Atlanta, Decatur, Kirkwood, and Metro Atlanta + Surrounding Areas."
  - QUICK LINKS (yellow heading): Home, Services, Get a Quote
  - CONTACT US: phone, email, Facebook (`fa-brands fa-facebook`, https://www.facebook.com/whiddonlandscaping)
- Giant wordmark "WHIDDON": `clamp(72px, 19vw, 300px)`, weight 900, `-0.05em`, line-height 0.8, color `#1C1C1C`, centered, nowrap.
- Bottom row: "© 2026 Whiddon Landscaping & Lawn Care LLC. All rights reserved." and "METRO ATLANTA + SURROUNDING AREAS" (12px, `#9ca3af`).

## Interactions & Behavior
- Smooth-scroll anchors: `#top`, `#about`, `#services`, `#process`, `#areas`, `#contact`.
- Services accordion and image crossfade: see section 5.
- Marquee: 40s linear loop. Mesh orbs: animations defined in `effects.css`.
- Hover lifts on buttons (−2px) and process cards (−6px).
- Recommended: add the brand's scroll-reveal (IntersectionObserver + `.reveal`/`.visible`), as on the live site.
- Respect `prefers-reduced-motion`.

## State
- `activeService` (number, default 0): set by hover/click on a service row.
- `selectedServices` (number[]), `showServiceError` (bool), `submitted` (bool).

## Design Tokens (from `tokens/brand.css`)
- Yellow `#F8DA6D` / lt `#fff07a` / dk `#D4A017`
- Green `#2D7034` / lt `#3d8f44` / dk `#1a4a1e`
- Blue `#1570A6` / vivid `#1B8CC4`
- Ink `#111111` / ink-deep `#0A0A0A` / charcoal `#1C1C1C` / navy `#0D1B2A` / forest `#071A09`
- Cream `#F0F9FF` / sky-100 `#EFF6FF` / sky-300 `#dbeafe`
- Grays (Tailwind): 300 `#d1d5db`, 400 `#9ca3af`, 500 `#6b7280`
- Radii: pill 9999px, card/image 24px, input 12px
- Spacing: section padding 128px vertical, container gutter 24px. Gaps used: 8 / 12 / 16 / 24 / 32 / 40 / 48 / 56 / 64 / 72px.

## Assets
All images are in the repo's `/public/images/` folder (the prototype loads them from the Vercel preview):
- `whiddon-logo.svg`, `hero-lawn.webp`, `about-taylor.jpg`
- `service-mowing.webp`, `service-cleanup.webp`, `service-edging.webp`, `service-pressure-washing.jpg`, `service-roof-gutter.jpg`

Icons are Font Awesome 6.5. The map is an OpenStreetMap embed.

## Files
- `Whiddon Homepage.dc.html`: the design prototype (open in a browser). The markup is in the template; data and behavior are in the `Component` class at the bottom.
- `support.js`, `image-slot.js`: prototype runtime only. **Do not port these.**
- `_ds/…/styles.css` + `tokens/`: brand tokens, identical to the repo's `src/styles/global.css` palette.
