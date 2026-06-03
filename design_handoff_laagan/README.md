# Handoff: Laagan Adventures — Full Website UI/UX Redesign

## Overview

This package contains **high-fidelity HTML prototypes** for the complete redesign of the Laagan Adventures website — a travel & tours booking platform for Zamboanga City, Philippines. The redesign covers 5 core pages with full UX improvements: conversion-optimized hero, traveler filter, tour discovery, sticky booking sidebar, 3-step booking flow, and persistent Messenger/WhatsApp CTAs.

**Live codebase:** https://github.com/JMS255/laagan-adventure  
**Live site:** https://laagan-adventure.vercel.app  
**Sanity Studio:** https://laagan-adventure.vercel.app/studio

---

## About the Design Files

The HTML files in `design-files/` are **design references created as prototypes** — they show the intended look, layout, and interactive behavior. They are **not** production code to copy directly.

Your task is to **recreate these HTML designs inside the existing Next.js 15 App Router codebase** using its established patterns:
- CSS custom properties (in `app/globals.css`) — no Tailwind
- Next.js App Router pages (`app/page.tsx`, `app/tours/page.tsx`, etc.)
- Sanity CMS for dynamic content
- Framer Motion for animations
- Existing component structure in `components/`

The HTML prototypes use vanilla JS for interactivity — in production, replace with React state, hooks, and Next.js navigation.

---

## Fidelity

**HIGH-FIDELITY** — Pixel-perfect mockups with final colors, typography, spacing, and interactions.

Recreate the UI pixel-perfectly using the codebase's existing CSS custom properties system. All design tokens (colors, radii, spacing) are documented below and match `app/globals.css`.

---

## Target Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 15 App Router |
| Styling | CSS custom properties + utility classes (no Tailwind) |
| CMS | Sanity v3 |
| Fonts | Playfair Display (headings) · Plus Jakarta Sans (body) |
| Animation | Framer Motion |
| Payments | Xendit (GCash deposits) |
| Messaging | Facebook Messenger deep-links + WhatsApp |

---

## Design Tokens

Copy these into `app/globals.css` `:root` block (most already exist — verify and add missing ones):

```css
:root {
  /* Colors */
  --navy:       #004e64;   /* Primary brand, ocean — headings, dark structure */
  --navy-2:     #003347;   /* Darker navy — promo strip, dark overlays */
  --pink:       #d96b8a;   /* Pink sand accent — ONLY accent color */
  --pink-dark:  #bf5070;   /* Pink hover state */
  --pink-light: #fff0f4;   /* Input backgrounds, warm tints */
  --bg:         #ffffff;   /* Primary background */
  --bg-2:       #fdf5f7;   /* Alternate section background (warm tint) */
  --bg-card:    #ffffff;   /* Card background */
  --text:       #0d2637;   /* Primary text */
  --text-muted: #4e6e80;   /* Secondary text, labels */
  --border:     #e8d5da;   /* Borders, dividers */

  /* Layout */
  --max-w:      1100px;
  --strip-h:    42px;      /* Promo strip height */
  --nav-bar-h:  68px;      /* Nav bar height */
  --nav-h:      110px;     /* Total header (strip + nav) */
  --r:          12px;      /* Default border radius */
  --rl:         18px;      /* Large border radius (cards) */
}
```

---

## Fonts

Load in `app/layout.tsx` using `next/font/google`:

```tsx
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-display',
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
})
```

Apply in `body` class: `className={`${playfair.variable} ${jakarta.variable}`}`

In CSS:
```css
body { font-family: var(--font-sans); }
h1, h2, h3 { font-family: var(--font-display); }
```

---

## Screens

### 1. Homepage (`app/page.tsx`)

**Reference file:** `design-files/index.html`  
**Purpose:** Create emotional desire in 10 seconds, then guide to booking.

#### A. Promo Strip (fixed, above nav)
- Height: 42px, background `--navy-2`
- Text: `rgba(255,255,255,0.75)`, 0.72rem, centered
- Content: "400 visitor/day cap on Santa Cruz Island — book ahead"
- `<strong>` tags for bold white emphasis

#### B. Navigation (fixed, frosted glass)
- Height: 68px, background `rgba(255,255,255,0.92)`, `backdrop-filter: blur(16px)`
- Border-bottom: `1px solid rgba(232,213,218,0.5)`
- Left: Logo (34px circle img + "LAAGAN ADVENTURES" text — 0.88rem, 800 weight, 0.04em tracking, uppercase, `--navy`)
- Center: Nav links — Tours | Destinations | Blog | Contact | Plan My Trip (0.8rem, 500 weight, `--text-muted`, hover → `--navy`)
- Right: Phone number (0.78rem, 600 weight) + "BOOK NOW" button (pink, 8px radius, 0.76rem, 800 weight, uppercase, 10px 18px padding)
- Mobile (`<900px`): hamburger toggle → slide-down white menu with links stacked

#### C. Hero Section
- Full viewport height (`min-height: 100svh`)
- Background: looping `<video>` with `poster="/hero-bg.png"` fallback
- Overlay: `linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.08) 35%, rgba(0,0,0,0.62) 100%)`
- Content pinned to bottom: `padding: calc(110px + 56px) 0 80px`
- Eyebrow: `📍 Zamboanga City, Philippines` — 0.72rem, 700 weight, 0.12em tracking, uppercase, `rgba(255,255,255,0.65)`
- **Headline:** `"The Only Pink Sand Beach in Asia."` — Playfair Display, `clamp(3rem, 7vw, 5.5rem)`, 800 weight, -0.03em tracking, white, max-width 680px
- Subheadline: `"Guided island adventures in Zamboanga City, Philippines."` — `clamp(1rem,2vw,1.15rem)`, `rgba(255,255,255,0.82)`
- CTA: `<a>` "See Our Tours →" — pink primary button, `btn--lg` size (18px 40px padding)
- Secondary: "Ask on Messenger 💬" — outline-light button
- Trust line: "⭐ 5.0 · National Geographic Best Beach · DTI Accredited · Pay on the Day" — 0.78rem, `rgba(255,255,255,0.7)`
- Mobile: stack buttons vertically, full-width, border-radius 12px

#### D. Stats Bar
- White background, border-top + border-bottom `1px solid --border`
- 3 stat items with dividers: `500+` Tours Completed · `5.0 ★` Average Rating · `Since '22` Proudly Local
- Numbers: Playfair Display, 2.4rem, 800 weight, `--navy`; accent color `em` → `--pink`
- Labels: 0.7rem, 700 weight, 0.1em tracking, uppercase, `--text-muted`
- Padding per item: 24px 44px

#### E. Traveler Filter + Tour Grid
- Headline: "Discover Zamboanga's Best Experiences" + "View all tours →" link right-aligned
- Sub-label: "Who's this trip for?" (0.85rem, muted)
- **4 Filter Cards** in a 4-column grid (2 cols on mobile):
  - Icons: 🧍 Solo Traveler · 💑 Couple Getaway · 👫 Barkada / Group · 👨‍👩‍👧 Family & Kids
  - Style: white bg, `2px solid --border`, 16px radius, 24px 16px padding, centered
  - Hover: `border-color: --pink`, translateY(-2px), pink shadow
  - Active/selected: `border-color: --pink`, `background: rgba(217,107,138,0.06)`
  - **Behavior:** clicking filters the tour cards grid below (show/hide based on `data-audience` attribute)
- **Tour Cards Grid:** 3 columns (2 tablet, 1 mobile), 28px gap (see Tour Card component below)

#### F. Destination Story (dark navy section)
- Background: `--navy`, padding 96px 0
- Centered headline: `"A Beach So Rare, National Geographic Noticed."` — Playfair, white, italic, clamp(1.8rem,3.5vw,2.8rem)
- Subtext: white at 72% opacity, max-width 560px, centered
- 3-column feature grid below:
  - 🏖 Pink Sand — Only in Asia
  - 🪼 Stingless Jellyfish Lagoon
  - ⛵ Sail on a Tausug Vinta
  - Each: centered icon (2.5rem), bold white title, muted white desc
  - Divided by `1px solid rgba(255,255,255,0.1)` (no border on last item)
- CTA: "Plan My Trip →" — pink primary button, centered, 48px top padding

#### G. How It Works (darker navy section)
- Background: `--navy-2`
- 3 steps in a 3-column grid divided by `rgba(255,255,255,0.12)` borders
- Each step: centered circle number (52px, `rgba(217,107,138,0.2)` bg, `--pink` text) + time label (pink, uppercase, 0.68rem) + white title + muted desc
- Steps: "1 · 2 minutes · Choose Your Tour" · "2 · Within 24 hours · We Confirm via Messenger" · "3 · On the day · Pay on the Day"

#### H. Trust Strip
- White bg, border top+bottom
- 5 columns: ✅ Free Cancellation · 💸 Pay on the Day · 🌦 Weather Guarantee · 🏛 DTI Registered · 💬 Reply Within 24hrs
- Each: icon (1.3rem) + bold navy text (0.78rem), centered, 28px 16px padding, border-right

#### I. Testimonials (3 cards)
- Background: `--bg-2`, 96px padding
- Centered section label + title
- 3-column grid (1 col mobile) — see Testimonial Card component

#### J. Social Proof Strip
- "FOLLOW THE ADVENTURE" label + "@laaganadventure" title
- 6-item grid (3×2) of real Instagram/Facebook photos (placeholder: colored blocks)
- Connect via Facebook/Instagram embed SDK or static screenshots

#### K. Final CTA (dark navy)
- `"Ready to See the Pink Sand?"` — Playfair, italic, white, clamp(2rem,4vw,3.2rem)
- Two buttons: "See Our Tours →" (primary) + "💬 Message Us" (outline-light)
- Note: "No payment required — pay on the day"

---

### 2. Tours Listing (`app/tours/page.tsx`)

**Reference file:** `design-files/tours.html`  
**Purpose:** Help users find the right tour quickly.

#### Page Header
- `--bg-2` background, 40px padding
- Breadcrumb: Home › Tours (0.78rem, `--text-muted`)
- H1: "Explore All Tours" — Playfair, clamp(2rem,4vw,3rem)
- Subline: "Guided adventures across Zamboanga's best destinations"

#### Traveler Filter
- Same 4 filter cards as homepage (compact — no description text in mobile view)
- Behavior: filter the tour grid by `audience` field from Sanity tour documents

#### Filter Bar
- Flex row: left (filter button + applied chip tags) · right (results count + sort dropdown)
- Filter button: "⚙ Filter" — 1.5px border, 8px radius, 0.8rem, 700 weight
- Sort: `<select>` — Most Popular | Price: Low to High | Duration
- Results count: "Showing N tours" — updates dynamically
- Applied filter chips: removable tags with × close button

#### Mobile Filter Drawer (Bottom Sheet)
- Trigger: "⚙ Filter" button opens drawer
- Drawer: slides up from bottom (translateY(100%) → 0), 20px radius top corners, white bg
- Dark semi-transparent overlay behind it
- Sections: Activity Type · Duration · Price Range (pill selects)
- "Apply Filters" button (pink, full width) at bottom
- "Reset" text link in header
- Close on overlay click or apply click

#### Tour Grid
- 3 cols desktop / 2 cols tablet / 1 col mobile, 28px gap
- Use same Tour Card component as homepage
- Connect to Sanity GROQ query: `*[_type == "tour"] | order(featured desc)`
- Filter on client by `audience` array field: `'solo' in audience`, etc.

---

### 3. Tour Detail (`app/tours/[slug]/page.tsx`)

**Reference file:** `design-files/tour-detail.html`  
**Purpose:** Convert a browsing visitor into a booking.

#### Image Gallery
- Desktop: 2-column grid — large image left (7fr), 2 small stacked right (3fr), max-height 480px, 10px gap, 20px border-radius
- "📷 View all N photos" button: bottom-right overlay, dark semi-transparent bg, 8px radius
- Mobile: full-width single image, 340px height
- Source: Sanity `photos[]` array via `urlFor(photo).width(800).url()`

#### Tour Header
- H1: Playfair Display, clamp(2rem,4vw,3rem), 800 weight, `--navy`, -0.03em tracking
- Metadata chips: ⏱ Duration · 👥 Group size · 📍 Departs from Paseo del Mar · ⭐ Rating (N reviews) · 🏝 Type
- Chip style: `--bg-2` bg, 1px `--border`, 999px radius, 0.72rem, 600 weight, `--text-muted`
- Urgency bar: `#fff4f7` bg, pink border, 10px radius — "🔥 Most Popular" badge + "Only 400 visitors/day" + "Weekends sell out fast" (right-aligned, muted)

#### Two-Column Layout
- Grid: `1fr 380px`, 56px gap, align-items start
- Mobile (`<900px`): collapse to 1 column, sidebar hides (replaced by sticky bottom bar)

**Left Column sections** (each with bottom border separator, 40px margins):

1. **Overview** — description + 3 unique bullet points with pink accent icons
2. **What's Included** — 2-column grid: ✅ included list + ❌ excluded list (0.88rem text)
3. **Itinerary** — Accordion (default: first item open). Each item: time label + activity name in trigger, details in body. Source from Sanity `itinerary[]`
4. **What to Bring** — 2-column grid of items (0.85rem)
5. **Meeting Point** — `--bg-2` info box, address + Google Maps link (pink, 600 weight)
6. **Cancellation Policy** — `--bg-2` info box, plain language
7. **Reviews** — Rating summary card (big number, stars, count) + 3 review cards (avatar circle + name + date + origin + tour tag + italic quote)

**Right Column: Sticky Booking Sidebar** (`position: sticky; top: 130px`)
- White bg, 1px `--border`, 18px radius, 28px padding, subtle shadow
- Starting price: "₱X,XXX / person" — 2rem, 800 weight, `--pink`
- **Joiners / Private toggle** — 2-column pill toggle (navy bg when active)
  - Joiners: per-person pricing with adult + child steppers
  - Private: flat rate price table (up to 10 pax / 11–15 pax / 16–20 pax)
- **Stepper rows** (see Stepper component): Adults (₱1,500) · Children (₱750)
- Date input (type="date", min=today)
- Price breakdown box (`--bg-2` bg, 10px radius): rows of quantity × price + total
- "Check Availability →" button — pink, full width, 12px radius
- Trust microcopy: "🔒 No payment yet · ✅ Free cancellation · 💬 24hr reply" (0.75rem, `--text-muted`, flex row)
- "Have questions? Message us →" — muted link, centered, bordered top

#### Mobile Sticky Book Bar
- `position: fixed; bottom: 0; left: 0; right: 0`
- White bg, `border-top: 1px solid --border`, `padding: 12px 16px max(12px,env(safe-area-inset-bottom))`
- Left: dynamic price ("₱3,000" — updates with stepper) + "est. for 2 adults" label
- Right: "Check Availability" button (pink, 10px radius, 12px 24px padding)
- Show only on mobile (`<600px`), hidden on desktop
- Add `padding-bottom` to page content to prevent overlap

#### Related Tours
- "You Might Also Like" — 3 smaller tour cards in a row (2 col tablet, 1 mobile)
- Query Sanity for other tours, exclude current slug

---

### 4. Booking Flow (`app/book/[slug]/page.tsx` + `app/book/[slug]/details/page.tsx`)

**Reference file:** `design-files/booking.html`  
**Purpose:** Complete a booking in 3 steps with zero friction.

#### Minimal Header
- White, 68px, logo left + phone number right
- No full nav — remove distractions during checkout

#### Step Progress Indicator
- 3 steps: ① Tour Details → ② Your Info → ③ Confirm
- Active step: pink fill circle + dark text
- Done step: navy fill circle
- Future step: grey border circle + muted text
- Lines connecting steps: `1px solid --border`

#### Step 1: Tour Details
- **Tour summary card** (always visible): gradient/photo thumbnail + tour name + type label + "Change" link (pink, right-aligned)
- **Date picker** — `type="date"`, min=today, `--pink-light` bg, pink focus border
- **Guest steppers** (2 rows):
  - Adults (13+, ₱1,500/person)
  - Children (4–12, ₱750/child)
  - Each row: label + description left, Stepper component right, 12px 0 padding, bottom border
- **Promo code** — collapsible: "Have a promo code?" toggle link → reveals input + "Apply" button inline
- **Price breakdown box** (`--bg-2`, 10px radius): rows + bold total row. Updates dynamically as steppers change.
- CTA: "Continue to Your Info →" — pink, full width, 12px radius
- Trust microcopy below: "🔒 No payment required yet · ✅ Free cancellation · 💬 24hr reply"

#### Step 2: Your Info
- "← Back" link (muted, top of card)
- Tour summary card (compact — same as step 1 with date/guests + price right-aligned)
- Fields:
  - Full Name* — `autocomplete="name"`
  - Phone Number* — `type="tel"`, `autocomplete="tel"`
  - Email Address — `type="email"`, `autocomplete="email"` (optional)
  - Special Requests — `<textarea>` rows=3, optional
- Consent notice box (light pink bg, 1px pink border, 0.82rem, muted) — plain language about no payment
- CTA: "Confirm Booking →" — pink, full width, 12px radius
- Trust microcopy below

**Server action (`/api/book`):** POST with tour, date, guests, name, phone, email → creates Sanity booking doc (status: pending) + Formspree backup email

#### Step 3: Confirmation
- **Success checkmark:** 80px circle, `#10b981` bg, white ✓, 800 weight, green glow shadow
- H2: "Booking Received!" — Playfair, 1.8rem, `--navy`
- Description: "We'll reach out via Messenger or phone within 24 hours"
- **Booking reference:** mono font, 1.2rem, 800 weight, 0.08em tracking — `#LA-XXXXXX` in `--bg-2` box with border
- **Booking summary box:** Tour | Date | Guests | Est. Total — 2-column rows
- **Messenger CTA button:** `#0084ff` bg, white text, 1.2rem icon, 16px 24px padding, 12px radius — deep-link with pre-filled message including booking ref
- **WhatsApp button:** `#25d366` bg, same style (secondary)
- **GCash Deposit box** (optional, shown if `siteConfig.depositAmount > 0`):
  - 2-column grid: QR code image (`/gcash-qr.jpg`) + 4 numbered steps
  - Step numbers: 22px pink circles, bold text
  - "I've Paid — Notify Laagan Adventures" button → Messenger deep-link with "I've paid" message

---

### 5. Contact (`app/contact/page.tsx`)

**Reference file:** `design-files/contact.html`  
**Purpose:** Route visitors to the right channel quickly.

#### 3 Intent Cards (grid, 3 cols → 1 col mobile)
Each card: white bg, 2px `--border`, 18px radius, 32px 28px padding, centered, `display:flex;flex-direction:column`
- Hover: pink border, pink shadow, translateY(-3px), 0.2s

1. **📅 Book a Tour** → "Browse Tours →" link to `/tours` + "or message us directly →" Messenger link
2. **❓ Ask a Question** → `#0084ff` Messenger button + WhatsApp link (green)
3. **🤝 Partner With Us** → toggles partner inquiry form below

#### Partner Inquiry Form (collapsible, hidden by default)
- Fields: Name/Organization + Contact Number (2-col) + Email + Textarea
- "Send Inquiry →" button + trust microcopy

#### Contact Info Strip
- 4-column grid with borders (2 col on tablet, 1 col on mobile)
- 📞 Phone · 💬 Messenger · 📱 WhatsApp · 📍 Location

#### FAQ Cards
- 3-col grid (1 col mobile), white, 1px border, 12px radius
- Q&A pairs — source from Sanity if FAQ schema exists

---

## Shared Components

### Tour Card
```
<div class="tour-card"> — border 1px --border, 18px radius, white bg
  <div class="tour-card__img"> — aspect-ratio: 3/2, overflow hidden, relative
    <img> — object-fit cover, scale(1.06) on hover (0.5s ease)
    <div class="badge"> — absolute top-left, pink or navy pill
  <div class="tour-card__body"> — 20px padding, flex column, 8px gap
    <h3 class="tour-card__name"> — Playfair, 1.08rem, 800 weight, --navy
    <div class="tour-card__chips"> — flex wrap, 6px gap
    <div class="tour-card__rating"> — stars (#f5a623) + count text
    <div class="tour-card__footer"> — flex space-between, border-top
      Price: 1.2rem, 800 weight, --pink
      "Check Availability" btn: --outline style, btn--sm
```
Hover: translateY(-5px), box-shadow 0 20px 56px rgba(0,50,80,0.12)

### Testimonial Card
```
white bg, 1px border, 18px radius, 28px padding, flex column 16px gap
★★★★★ — #f5a623, 0.95rem, 2px letter-spacing
Quote — 0.88rem, italic, --text-muted, flex:1
Author row — 42px circle avatar (pink-tinted) + name (0.85rem, bold, navy) + origin (0.72rem, muted) + tour tag (0.7rem, pink, uppercase)
```

### Stepper Component
```
display:flex, align-items:center, gap:14px
− button: 34px circle, 1.5px border, hover → navy fill
N value: 1rem, 800 weight, min-width 24px, centered
+ button: same as −
React: useState for value, disable − when at min, + when at max
```

### Accordion Item
```
border-bottom: 1px solid --border
Trigger: flex space-between, 16px 0 padding, 0.9rem, bold, navy
Chevron SVG: rotate(180deg) when open, 0.25s transition
Body: 0.88rem, --text-muted, 1.75 line-height, padding-bottom 20px
Only show one open at a time (accordion group behavior)
```

---

## Interactions & Behavior

### Traveler Filter
- Click card: add `is-active` class (pink border + pink-tinted bg)
- Click same card again: deselect, show all tours
- Filter tour cards: show/hide based on `data-audience` attribute containing the filter value
- On tour detail: could connect to `/tours?filter=barkada` routing

### Booking Step Navigation
- Step 1 → 2: validate date is set + adults ≥ 1, then show step 2, update progress
- Step 2 → 3: validate name + phone fields, then POST to `/api/book`, show confirmation
- Step 2 ← back: show step 1 again
- Scroll to top on each step transition

### Price Calculator
- On Adults stepper change: `total = adults * 1500 + children * 750`
- Update breakdown rows + total + mobile sticky bar price dynamically
- Show/hide children row based on count > 0

### Mobile Filter Drawer
- Open: translateY(100%) → 0, show dark overlay (opacity 0 → 0.4)
- Close: overlay click, "Reset" click, "Apply Filters" click
- Filter pills: toggle `is-active` class on click

### Joiners / Private Toggle (Tour Detail Sidebar)
- Click Joiners: show stepper view, hide flat-rate table
- Click Private: show flat-rate table, hide steppers
- Active button: `background: --navy; color: #fff`

---

## Mobile-First Rules (from brief)

1. **375px base** — design starts at 375px, scales up
2. **Touch targets:** 44px minimum height on all buttons, links, filters
3. **Stepper not dropdown** for guest count everywhere
4. **Filters on mobile** = bottom sheet drawer, never a sidebar
5. **Price always visible** near every CTA
6. **Sticky book bar** on tour detail mobile (price left, CTA right, fixed bottom)
7. **GCash first** in payment contexts — 94 million Filipino users
8. **Messenger + WhatsApp** float buttons site-wide (bottom-right stack: WhatsApp above Messenger)
9. **Trust signals** adjacent to every CTA button
10. **Safe area inset:** `padding-bottom: max(12px, env(safe-area-inset-bottom))` on sticky bars

---

## Urgency & Trust Signals

Use only **authentic urgency** (real, verifiable facts):
- "400 visitors/day cap on Santa Cruz Island" — real government limit
- "Weekends sell out fast" — real, based on demand
- "National Geographic Top 21 Beaches in the World" — real 2017 citation

**Never use:** countdown timers, fake "only 2 left" counters, fake FOMO

Trust signals to show near every CTA:
- 🔒 No payment required yet (or: No payment now)
- ✅ Free cancellation
- 💬 Reply within 24hrs

---

## Float Buttons (Site-wide)

Place in root layout (`app/layout.tsx`) outside page content:

```tsx
// Fixed bottom-right, z-index 400
// Stack vertically with 10px gap
// WhatsApp: #25d366, href="https://wa.me/639052435196"  
// Messenger: #0084ff, href="https://m.me/61562040673545"
// Each: 52px circle, box-shadow 0 4px 16px rgba(0,0,0,0.22)
// Hover: scale(1.1)
// On mobile: bottom: 84px (above sticky book bar)
```

---

## Assets

| Asset | Path in codebase | Notes |
|---|---|---|
| Logo | `/public/logo.jpg` | Use as 34px circle in nav. Request SVG version for crispness |
| Hero background | `/public/hero-bg.png` | Fallback for hero video |
| Hero video | `/public/hero-video.mp4` | Looping, muted, autoplay, playsInline |
| GCash QR | `/public/gcash-qr.jpg` | Display on booking confirmation screen |
| Fonts | Google Fonts via `next/font` | Playfair Display + Plus Jakarta Sans |

---

## Files in This Package

| File | Description |
|---|---|
| `design-files/index.html` | Homepage — all 11 sections |
| `design-files/tours.html` | Tours listing with filter drawer |
| `design-files/tour-detail.html` | Tour detail with sticky sidebar |
| `design-files/booking.html` | 3-step booking flow with GCash confirmation |
| `design-files/contact.html` | Contact with intent cards |
| `design-files/shared.css` | All shared component styles |
| `design-files/shared.js` | Nav toggle, accordion, stepper, filter JS |

---

## Implementation Order (Recommended)

1. **Update `app/globals.css`** with new tokens + component classes from `shared.css`
2. **Update `components/Nav.tsx`** — add phone number, fix mobile menu, promo strip
3. **Update `app/page.tsx`** — homepage sections in order (hero → stats → filter → tours → story → how → trust → testimonials → CTA)
4. **Update `app/tours/page.tsx`** — filter bar + drawer + tour grid
5. **Update `app/tours/[slug]/page.tsx`** — gallery + two-col layout + sticky sidebar + mobile bar
6. **Update booking pages** — step progress + steppers + confirmation with GCash
7. **Update `app/contact/page.tsx`** — intent cards + form
8. **Update `components/Footer.tsx`** — 4-column layout
9. **Add float buttons** to `app/layout.tsx`
10. **Test mobile at 375px** for all pages

---

## Contact for Design Questions

**Designer:** Claude Design System (Laagan Adventures project)  
**GitHub:** https://github.com/JMS255/laagan-adventure  
**Figma:** Not available — use HTML reference files as source of truth
