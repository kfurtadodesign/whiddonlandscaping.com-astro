# Whiddon Landscaping — Claude Code Build Instructions

## Context

Build a **3-page static marketing website** for Whiddon Landscaping & Lawn Care LLC using Astro.
This file is the authoritative spec. Build everything described here, in order.

---

## Contact Info (use everywhere)

- **Business name:** Whiddon Landscaping & Lawn Care LLC
- **Phone:** (470) 443-3344 → link as `tel:+14704433344`
- **Email:** whiddonllc@gmail.com → link as `mailto:whiddonllc@gmail.com`
- **Facebook:** https://www.facebook.com/whiddonlandscaping

---

## Tech Stack

- **Framework:** Astro (already initialized in this directory)
- **Styling:** Tailwind CSS v3 via `@astrojs/tailwind`
- **Icons:** Font Awesome 6 Free (via CDN in `<head>`)
- **Forms:** Mailgun (Netlify/Vercel-compatible) — for now, the form should POST to a placeholder endpoint `/api/contact`. Add a note in the form component that Mailgun integration is needed.
- **Deployment target:** Vercel (static output, no SSR adapter needed)
- **Images:** Place all images in `public/images/`. Use descriptive `alt` text. Generate placeholder images if none exist.

---

## Step 1 — Initialize Astro

Run this command to scaffold (the directory already has CLAUDE.md, so use the `--force` flag):

```bash
PATH="/opt/homebrew/bin:$PATH" npm create astro@latest -- --template minimal --no-install --no-git --typescript strict --force 2>&1
```

Then install dependencies:

```bash
PATH="/opt/homebrew/bin:$PATH" npm install
PATH="/opt/homebrew/bin:$PATH" npx astro add tailwind --yes
```

---

## Step 2 — Install Font Awesome

Add to `src/layouts/Layout.astro` `<head>`:

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
```

---

## Step 3 — Design System (Tailwind Config)

Edit `tailwind.config.mjs` to extend with these custom colors:

```js
colors: {
  brand: {
    green:      '#2D7034',  // Forest green (logo)
    'green-dk': '#1a4a1e',  // Dark green
    'green-lt': '#3d8f44',  // Light green hover
    blue:       '#1570A6',  // Sky blue (logo, darkened for a11y)
    gold:       '#D4A017',  // Golden yellow (logo, darkened for a11y)
    cream:      '#F8F5F0',  // Warm off-white background
    charcoal:   '#1C1C1C',  // Body text
  }
}
```

Font families:
```js
fontFamily: {
  heading: ['"Plus Jakarta Sans"', 'sans-serif'],
  body:    ['Inter', 'sans-serif'],
}
```

---

## Step 4 — Global CSS (`src/styles/global.css`)

Create this file and import it in the layout:

```css
/* Scroll reveal animation */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Smooth scrolling */
html { scroll-behavior: smooth; }

body {
  font-family: 'Inter', sans-serif;
  color: #1C1C1C;
  background-color: #F8F5F0;
}

h1, h2, h3, h4 {
  font-family: 'Plus Jakarta Sans', sans-serif;
}
```

Add this IntersectionObserver script inline at the bottom of `Layout.astro`:

```html
<script>
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
</script>
```

---

## Step 5 — Layout (`src/layouts/Layout.astro`)

Props: `title`, `description`

### Navbar
- Sticky top, `backdrop-blur` + semi-transparent `bg-brand-green-dk/95` on scroll
- Left: SVG/text logo "Whiddon Landscaping"
- Center (desktop): Nav links — Home, Services, Contact
- Right: "Get a Free Quote" green button → `/contact`
- Mobile: hamburger menu (toggle with vanilla JS `<script>` in the component)
- Logo text color white; links white with hover underline

### Footer
- Dark green background (`bg-brand-green-dk`)
- 3 columns: Logo + tagline | Quick Links | Contact Info
- Bottom bar: `© 2025 Whiddon Landscaping & Lawn Care LLC. All rights reserved.`
- SEO tagline: "Lawn care services in East Atlanta, Decatur, Kirkwood, and surrounding Metro Atlanta areas."
- Social icons: Facebook link with Font Awesome icon

---

## Step 6 — Pages

### `src/pages/index.astro` — Home

#### Section 1: Hero
- Full-bleed background image: `public/images/hero-lawn.jpg` (generate or placeholder)
- Dark overlay (`bg-black/50`)
- Headline: `Beautiful Lawns Without the Hassle`
- Sub: `Reliable, affordable lawn care that keeps your yard looking its best—without you lifting a finger.`
- Two buttons: "Get a Free Quote" (solid green → `/contact`) | "Call Now" (outline white → `tel:+14704433344`)
- `<h1>` tag on headline

#### Section 2: Trust Bar
- Light cream background
- Centered: ⭐⭐⭐⭐⭐ (gold stars via Font Awesome `fa-star`) + "Trusted by homeowners across Metro Atlanta"
- 3 stat pills: "10+ Years Experience" | "100% Satisfaction Guaranteed" | "Licensed & Insured"

#### Section 3: About
- Two-column: text left, image right (image: `public/images/about-mowing.jpg`)
- Heading: `About Whiddon Landscaping`
- Body copy:
  > Whiddon Landscaping & Lawn Care LLC is a family-owned business committed to keeping Metro Atlanta lawns healthy, green, and beautiful. We handle every job with attention to detail—from routine mowing to seasonal cleanups—so you can enjoy your outdoor space without the work.
- CTA link: "Learn about our services →" → `/services`

#### Section 4: Services Grid
4-card grid (2×2 on mobile, 4-across on desktop):
| Icon (FA) | Title | Description |
|---|---|---|
| `fa-scissors` | Lawn Mowing | Regular mowing on a schedule that fits your lawn's needs. |
| `fa-leaf` | Trimming & Edging | Clean, sharp edges along driveways, sidewalks, and beds. |
| `fa-broom` | Yard Cleanups | Seasonal cleanups to keep your yard tidy year-round. |
| `fa-calendar-check` | Routine Maintenance | Ongoing care plans so your lawn always looks its best. |

Each card: white bg, green icon, hover shadow lift animation.

#### Section 5: Testimonials
2×2 grid of review cards (or horizontal scroll on mobile):
| Stars | Quote | Name |
|---|---|---|
| ⭐⭐⭐⭐⭐ | "Taylor does amazing work! My yard looks better than it ever has. Highly recommend!" | JoAnn C. |
| ⭐⭐⭐⭐⭐ | "Very professional and reliable. My lawn has never looked this good!" | Shawn T. |
| ⭐⭐⭐⭐⭐ | "Great communication and quality work. Will definitely use again!" | LaTanya M. |
| ⭐⭐⭐⭐⭐ | "Showed up on time, did excellent work, and the price was fair." | Chandler G. |

#### Section 6: Service Areas
- Heading: `Serving Metro Atlanta`
- Pill/badge layout for these neighborhoods:
  East Atlanta, Decatur, Kirkwood, Edgewood, Candler Park, Little Five Points, Reynoldstown, Cabbagetown, Grant Park, Ormewood Park, East Lake, Oakhurst, Avondale Estates, Clarkston
- Green pill badges with hover effect

#### Section 7: Why Choose Us
4 icon + text items:
- 🏡 `fa-house` — Family-Owned & Local
- 📅 `fa-calendar` — Reliable & On-Time
- 💰 `fa-tag` — Affordable Pricing
- ✅ `fa-shield-halved` — Satisfaction Guaranteed

#### Section 8: Final CTA Banner
- Full-width green (`bg-brand-green`) section
- Heading: `Ready for a Beautiful Lawn?`
- Sub: `Get your free quote today — no obligation.`
- Button: "Request a Free Quote" → `/contact`

---

### `src/pages/services.astro` — Services

**SEO:** title=`Our Services — Whiddon Landscaping` | description=`Professional lawn mowing, trimming, edging, cleanups and maintenance in Metro Atlanta.`

#### Section 1: Page Hero
- Smaller hero, green gradient background
- `<h1>`: `Our Lawn Care Services`
- Sub: `Everything your lawn needs — done right, every time.`

#### Section 2: Services Detail
5 expanded service cards (alternating layout: image left/right):
1. **Lawn Mowing** — `public/images/service-mowing.jpg` — Regular mowing based on your lawn's growth rate. We cut to the right height for your grass type, leaving clippings mulched for a healthier lawn.
2. **Trimming** — `public/images/service-trimming.jpg` — String trimming around trees, fences, flower beds, and any area the mower can't reach.
3. **Edging** — `public/images/service-edging.jpg` — Sharp, clean edges along all hard surfaces—driveways, sidewalks, curbs, and beds—for that polished, professional look.
4. **Yard Cleanups** — `public/images/service-cleanup.jpg` — Seasonal leaf removal, debris clearing, and general tidy-up to keep your property looking sharp.
5. **Routine Maintenance** — `public/images/service-maintenance.jpg` — Ongoing weekly or biweekly care plans that keep your lawn consistently healthy and beautiful.

#### Section 3: How It Works (4-step process)
Numbered steps with icons:
1. `fa-phone` — **Call or Request Online** — Reach out by phone or our quote form.
2. `fa-clipboard-list` — **Free Assessment** — We evaluate your lawn and give a no-obligation quote.
3. `fa-calendar-check` — **Schedule Your Service** — Pick a time that works for you.
4. `fa-star` — **Enjoy Your Lawn** — Sit back while we do the work.

#### Section 4: CTA
Same green CTA banner as homepage → `/contact`

---

### `src/pages/contact.astro` — Contact / Get a Quote

**SEO:** title=`Get a Free Quote — Whiddon Landscaping` | description=`Request a free lawn care quote from Whiddon Landscaping in Metro Atlanta. Call (470) 443-3344 or fill out our form.`

#### Section 1: Page Hero
- Green gradient hero
- `<h1>`: `Get a Free Quote`
- Sub: `We'll get back to you within 24 hours.`

#### Section 2: Two-Column Layout

**Left — Quote Form:**
Fields (all required):
- Full Name (text)
- Email Address (email)
- Phone Number (tel)
- Service Address (text)
- Service Needed (select): Lawn Mowing | Trimming & Edging | Yard Cleanup | Routine Maintenance | Other
- Message / Additional Info (textarea, optional)
- Submit button: "Send My Request" (green)

Form action: POST to `/api/contact` (placeholder — note Mailgun integration needed).
Add honeypot field for spam: `<input type="text" name="_gotcha" style="display:none" />`

**Right — Contact Info Sidebar:**
- Phone: (470) 443-3344 with `tel:` link and `fa-phone` icon
- Email: whiddonllc@gmail.com with `mailto:` link and `fa-envelope` icon
- Facebook: link to https://www.facebook.com/whiddonlandscaping with `fa-facebook` icon
- Hours: Monday–Saturday 7am–6pm

#### Section 3: Testimonials
2 review cards:
- LaTanya M. — "Great communication and quality work. Will definitely use again!"
- Chandler G. — "Showed up on time, did excellent work, and the price was fair."

---

## Step 7 — Reusable Components

Create these in `src/components/`:

| File | Notes |
|---|---|
| `Navbar.astro` | Mobile hamburger via vanilla `<script>`. Active link detection via `Astro.url`. |
| `Footer.astro` | Dark green, 3-col, copyright. |
| `ServiceCard.astro` | Props: `icon`, `title`, `description`. |
| `TestimonialCard.astro` | Props: `name`, `quote`, `stars` (default 5). |
| `CTABanner.astro` | Props: `heading`, `sub`, `buttonText`, `buttonHref`. |

---

## Step 8 — Images

Place real or placeholder images in `public/images/`. Required filenames:
- `hero-lawn.jpg`
- `about-mowing.jpg`
- `service-mowing.jpg`
- `service-trimming.jpg`
- `service-edging.jpg`
- `service-cleanup.jpg`
- `service-maintenance.jpg`

If images don't exist, use a green placeholder div with the filename as a label so the layout is visible.

---

## Step 9 — SEO

Every page must have in `<head>`:
```html
<meta name="description" content="..." />
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:type" content="website" />
```

---

## Step 10 — Verification

After building:
```bash
PATH="/opt/homebrew/bin:$PATH" npm install
PATH="/opt/homebrew/bin:$PATH" npm run build
PATH="/opt/homebrew/bin:$PATH" npm run dev
```

Confirm:
- All 3 pages render without errors
- Nav links work (Home → `/`, Services → `/services`, Contact → `/contact`)
- All CTA buttons link correctly
- Phone links use `tel:+14704433344`
- Email links use `mailto:whiddonllc@gmail.com`
- Mobile hamburger menu opens/closes
- Form fields validate (required attributes)
- No TypeScript or Astro check errors
