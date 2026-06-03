# Laagan Adventure — Session Context

> Read this at the start of every new session to get fully caught up.
> Last updated: June 3, 2026

---

## Who I Am

James Ignacio — owner of Laagan Adventure, a local travel & tours business in Zamboanga City, Philippines. Running this alongside Craftifyle (photobooth + event photography CRM). Self-taught developer using Claude Code.

---

## What Laagan Adventure Is

A travel and tours website for a local tour operator in Zamboanga City, Philippines. James runs it with Ivy. They offer guided tour packages — island hopping, adventure, nature — centered around the Zamboanga peninsula, including the famous Santa Cruz Island pink sand beach.

**Business model:** Browse tours → inquiry via booking widget → confirmed via Messenger → pay on the day (cash or GCash). GCash deposit flow via Xendit already implemented.

**Target audience:** Filipino travelers (domestic, mobile-first), OFWs, and international visitors.

---

## Live URLs

- **Site:** laagan-adventure.vercel.app
- **Sanity Studio:** laagan-adventure.vercel.app/studio
- **Repo:** github.com/JMS255/laagan-adventure (branch: master)
- Auto-deploys to Vercel on push to master (2–5 min)

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | Next.js 15 App Router + TypeScript |
| CMS | Sanity.io (project ID: o5mustem, dataset: production) |
| Styling | CSS custom properties + inline styles — NO Tailwind |
| Fonts | Playfair Display (headings) + Plus Jakarta Sans (body) |
| Forms | Formspree (xpwzgwnn) |
| Payments | Xendit (GCash deposits) |
| Hosting | Vercel |
| ISR | revalidate = 60 on all Sanity-powered pages |

---

## Design System

**Colors (CSS custom properties in `app/globals.css`):**
- `--navy: #004e64` — ocean, primary brand
- `--navy-2: #003347` — darker navy for hero/sidebar
- `--pink: #d96b8a` — Santa Cruz Island pink sand, ONLY accent color
- `--pink-dark: #bf5070`
- `--pink-light: #fff0f4`
- `--bg-2: #fdf5f7` — soft pink-tinted background
- `--text: #0d2637`
- `--text-muted: #4e6e80` (also aliased as `--muted`)
- `--border: #e8d5da`
- `--success: #10b981` · `--warning: #f59e0b` · `--error: #ef4444`

**Fonts:**
- `--font-display`: Playfair Display — all h1/h2, editorial headings
- `--font-sans`: Plus Jakarta Sans — body, UI, forms

**Button classes:**
- `.btn.btn--primary` — pink fill, white text
- `.btn.btn--outline` — navy border, navy text
- `.btn.btn--outline-light` — white border, white text (on dark bg)
- `.btn.btn--sm` / `.btn.btn--lg` / `.btn.btn--full` — size variants

**New component classes added June 3 (from design handoff):**
- `.traveler-grid` / `.traveler-card` / `.traveler-card.is-active`
- `.trust-strip` / `.trust-item` / `.trust-item__icon` / `.trust-item__text`
- `.how-grid` / `.how-step` / `.how-step__num` / `.how-step__time` / `.how-step__title`
- `.dest-features` / `.dest-feature`
- `.booking-sidebar` / `.booking-sidebar__price` / `.booking-sidebar__price-label`
- `.stepper` / `.stepper__btn` / `.stepper__val`
- `.step-progress` / `.step-progress__item` / `.step-progress__num` / `.step-progress__line`
- `.trust-micro`
- `.breadcrumb` / `.breadcrumb__sep`
- `.accordion-item` / `.accordion-trigger` / `.accordion-body`
- `.field` / `.field-row` (form inputs — replaces old `.form-group`)
- `.badge--pink` / `.badge--navy` / `.badge--light` / `.chip` / `.chip--sm`
- `.float-btns` / `.float-btn` / `.float-btn--wa` / `.float-btn--ms`
- `.sticky-bar` / `.sticky-bar__price` / `.sticky-bar__amount`
- `.tour-detail-layout` (replaces old `.tour-detail-grid`)
- `.nav__right` / `.nav__cta` / `.nav__mobile` + `.is-open`
- `.page-top` — use instead of `style={{ paddingTop: 'var(--nav-h)' }}`
- `.section--sm` / `.section--dark` / `.section--darker`
- `.stats-bar` (replaces old `.stats-row`)

**Layout:** Container = `max-width: 1100px`, padding `32px` (→ `16px` at <600px).

---

## Key Files

| File | Purpose |
|---|---|
| `app/layout.tsx` | Root layout — fonts, BookingProvider, BookingDrawer, stacked float buttons (WhatsApp + Messenger), GA4 |
| `app/globals.css` | All CSS custom properties + all shared component styles |
| `app/page.tsx` | Homepage — hero, stats, traveler filter, spotlights, how it works, trust strip, testimonials, final CTA |
| `app/tours/page.tsx` | Tours listing — breadcrumb header, ToursFilter |
| `app/tours/[slug]/page.tsx` | Tour detail — gallery, metadata chips, urgency bar, two-col layout, sticky sidebar |
| `app/book/[slug]/page.tsx` | Booking step 1 — BookingOverview |
| `app/book/[slug]/details/page.tsx` | Booking step 2 — PassengerDetailsForm |
| `app/book/paid/page.tsx` | Booking confirmation |
| `app/contact/page.tsx` | Contact — 3 intent cards + TripBuilder |
| `lib/sanity.ts` | Sanity client + all GROQ queries |
| `lib/types.ts` | Single source of truth for all TypeScript types |
| `lib/booking-context.tsx` | Shared booking state (React Context) |
| `lib/promoCodes.ts` | Promo code engine (LAAGAN500, SUMMER10, GROUP20, WELCOME200) |

**Components:**
- `Nav.tsx` — frosted-glass nav, `.nav__right`, `.nav__cta`, `.nav__mobile.is-open`
- `TravelerFilter.tsx` — 4 traveler type filter cards + tour grid (homepage)
- `ToursFilter.tsx` — traveler filter + destination pills + sort + results count + mobile bottom sheet drawer
- `HowItWorks.tsx` — `.how-grid/.how-step` 3-step dark section
- `TrustStrip.tsx` — `.trust-strip/.trust-item` 5-point strip
- `BookingOverview.tsx` — step 1 of booking: `.step-progress`, `.stepper`, `.booking-sidebar`, `.trust-micro`
- `PassengerDetailsForm.tsx` — step 2: `.step-progress`, `.field`, `.booking-sidebar`, WhatsApp on confirmation
- `BookingWidget.tsx` — hero widget (createPortal)
- `BookingDrawer.tsx` — slide-in tour selector
- `TourTabs.tsx` — sticky tabs + scrollspy + price/Book CTA
- `DayItinerary.tsx` — expandable day-by-day accordion
- `JoinersPrivateToggle.tsx` — Joiners/Private Charter pricing tabs
- `StickyBookBar.tsx` — mobile sticky bottom bar on tour detail
- `DestinationShowcase.tsx` — 7/5 asymmetric destination grid
- `ScrollReveal.tsx` — framer-motion viewport fade+slide wrapper
- `TestimonialCarousel.tsx`, `Footer.tsx`, `GuestStoryBlock.tsx`

**Booking flow:** BookingWidget → BookingDrawer → `/book/[slug]` (step 1) → `/book/[slug]/details` (step 2) → `/api/book` → confirmation with Messenger + WhatsApp CTAs + Xendit GCash deposit

**Float buttons (layout.tsx):** Stacked — WhatsApp (green, top) + Messenger (blue, bottom). Class `.float-btns`. On mobile, lifts to `bottom: 84px` above sticky bar.

---

## Sanity Schema — Tour Key Fields

`title, slug, featured, mainImage, tagline, description, duration, price, priceNote, destination, audience[], inclusions[], exclusions[], itinerary[]{time, activity}, mapQuery, faq[]{question, answer}, photos[], dayItinerary[]{dayLabel, title, description, highlights, photo}, pricingTiers[]{label, minPax, maxPax, pricePerPerson}, availabilityNote, badgeLabel, urgencyNote, availableDates[]`

---

## Sprint Status

| Sprint | Status | Summary |
|---|---|---|
| Sprint 1 | ✅ Complete | All 7 pages, booking system, Trafalgar-style tour detail, Pink Sand & Ocean palette |
| Sprint 2 | ✅ Complete | Sanity-powered tour grid, full booking flow, promo code engine, DayItinerary accordion, UGC photo wall, Easy Quote modal |
| Sprint 3 | ✅ Complete | Sitemap.xml, robots.ts, OG images, GA4, Formspree update, full mobile responsiveness audit (15 fixes) |
| Sprint 4 | ✅ Complete | Plus Jakarta Sans, DestinationShowcase, sticky TourTabs, JoinersPrivateToggle, ContactFlow, ScrollReveal, frosted-glass nav, TrustStrip, lib/types.ts |
| Sprint 5 | ✅ Complete | TravelerFilter, HowItWorks, hero copy, GuestStoryBlock, urgency badges, TestimonialCarousel 3-col grid |
| Mobile UX | ✅ Complete | 7 layout fixes, verified at 375px — StickyBookBar, photo wall, nav toggle, Messenger float, DayItinerary overflow, nav logo |
| Sprint 6 | ✅ Complete | Xendit GCash deposit integration, available dates calendar in Sanity |
| **Design Sprint** | ✅ **Complete — June 3, 2026** | Full UI/UX overhaul from Claude Design handoff (see below) |
| Sprint 7 | 🔲 Next | SEO + performance + features (see below) |

---

## Design Sprint — What Was Done (June 3, 2026)

### Research Produced
- **`RESEARCH.md`** — Full research document: market research, UI/UX best practices, feature gap analysis. Read before planning Sprint 7.
- **`DESIGN-BRIEF.md`** — Design brief used to prompt Claude Design for the UI handoff.
- **`design_handoff_laagan/`** — HTML prototypes + shared CSS from Claude Design. Source of truth for visual spec.

### Key Research Findings (relevant to dev)
- **Zamboanga hit 721,699 tourists in 2024, +16% YoY** — growing market
- **Zero Zamboanga listings on Klook** — first-mover OTA opportunity
- **Messenger = 79.4% of Filipino internet users** — Messenger-first booking model is correct
- **Santa Cruz Island 400/day cap** — use as authentic urgency signal (not manufactured FOMO)
- **"Is Zamboanga safe?" content** — highest-ROI blog post to write
- **Mobile drives 88% of PH web traffic** — every layout decision must be 375px-first

### Changes Implemented

**`app/globals.css`**
- Added new design tokens: `--muted`, semantic colors, shadows, transitions
- Added 20+ new component classes (see Design System section above)

**`app/layout.tsx`**
- Removed single `MessengerFloat` import
- Added stacked `.float-btns` (WhatsApp green + Messenger blue)

**`app/page.tsx`** (Homepage)
- Hero headline: "The Only Pink Sand Beach in Asia." + trust line
- Stats bar: `.stats-bar` class, Playfair numbers with `<em>` pink accents
- Final CTA: "Ready to See the Pink Sand?" + WhatsApp button

**`components/Nav.tsx`**
- Wrapped phone + book button in `.nav__right`
- `nav__book-btn` → `nav__cta`
- Mobile menu: `nav__mobile-menu` → `nav__mobile.is-open`

**`components/HowItWorks.tsx`**
- Full rewrite: inline styles → `.how-grid/.how-step` CSS classes

**`components/TrustStrip.tsx`**
- Full rewrite: 5-point strip → `.trust-strip/.trust-item` CSS classes

**`components/TravelerFilter.tsx`**
- Filter cards: inline styles → `.traveler-grid/.traveler-card.is-active`
- Badge: inline styles → `.tour-card__badge` + `.badge--pink`

**`app/tours/page.tsx`**
- `paddingTop` → `.page-top`
- New header: `--bg-2` background, breadcrumb, h1, subline

**`components/ToursFilter.tsx`**
- Full rewrite: added traveler filter cards, filter bar, results count, sort dropdown, mobile bottom sheet drawer

**`app/tours/[slug]/page.tsx`** (Tour detail)
- Hero banner → 2-col desktop gallery (large left + 2 stacked right) + breadcrumb
- New tour header: h1 + metadata chips + urgency bar
- `tour-detail-grid` → `tour-detail-layout`
- Sidebar: inline styles → `.booking-sidebar` + `.trust-micro` + meeting point box
- Bottom CTA: added WhatsApp alongside Messenger

**`components/BookingOverview.tsx`** (Booking step 1)
- Added `.step-progress` indicator (3 steps)
- Guest count: inline buttons → `.stepper` component
- Form inputs: `.form-group` → `.field`
- Summary sidebar: inline styles → `.booking-sidebar`
- Trust checklist: inline → `.trust-micro`

**`components/PassengerDetailsForm.tsx`** (Booking step 2)
- Added `.step-progress` (step 1 done, step 2 active)
- Breadcrumb: inline → `.breadcrumb`
- Form inputs: `.form-group` → `.field`
- Summary sidebar: inline styles → `.booking-sidebar`
- Confirmation screen: added WhatsApp button alongside Messenger

**`app/book/paid/page.tsx`**
- `paddingTop` → `.page-top`
- Added WhatsApp button to confirmation

**`app/contact/page.tsx`**
- `paddingTop` → `.page-top`
- Added 3 intent cards: Book a Tour / Ask a Question / Partner With Us
- "Ask a Question" card has both Messenger + WhatsApp buttons

---

## What to Build Next — Sprint 7

### Quick Wins (do first — high ROI, low effort)

| Task | Why | Effort |
|---|---|---|
| **GA4 funnel events** | Can't optimize without knowing where users drop off | 1 day |
| **JSON-LD structured data** | Free Google rich snippets (TouristTrip + LocalBusiness + FAQPage) | 1 day |
| **Canonical URLs in generateMetadata** | Prevents duplicate indexing from booking param URLs | 2 hrs |
| **`useCdn: true` on Sanity** | Currently bypassing CDN — cuts 200–400ms latency | 30 min |
| **WhatsApp button** | Already added to most pages — verify everywhere | Done ✅ |
| **"Is Zamboanga safe?" blog post** | Highest-ROI content piece — unblocks hesitant visitors | Content only |
| **Title tag rewrite** | "Tour Name — ₱X/person | Laagan Adventure Zamboanga" format | 2 hrs |

### Medium-Term (Sprint 7 core)

| Task | Why | Effort |
|---|---|---|
| **Slot capacity / "X spots left"** | Santa Cruz 400/day cap — real urgency signal | 1 week |
| **Destination guide pages** | `/destinations/[slug]` route exists, not wired up — long-tail SEO | 1 week |
| **On-demand ISR via Sanity webhook** | Tour pages update seconds after Sanity edit | 3 hrs |
| **Guest booking confirmation email (Resend)** | Guests get nothing — "did my booking go through?" problem | 1 day |
| **Replace photo wall `<img>` with `next/image`** | LCP improvement | 1 day |
| **Booking dashboard revenue metrics** | Monthly revenue, avg booking value, revenue by tour | 1 day |
| **FAQ JSON-LD on tour pages** | Rich snippets in Google search results | 3 hrs |

### 6–12 Month Horizon
- **Klook listing** — zero Zamboanga competition, 51% growth in PH
- **Consistent TikTok/YouTube content** — own "Zamboanga travel" organic search
- **Couples package** — pink sand is intrinsically romantic, 42.1% of adventure travelers are couples
- **Halal tourism package** — underserved Southeast Asian market
- **Referral/loyalty program** — promo code infrastructure already built

---

## Security Issue — Fix Before Sharing Dashboard

**CRITICAL:** The dashboard password falls back to hardcoded `'laagan2026'` and is passed as a GET query parameter (`?pw=laagan2026`). It shows up in server logs, browser history, and analytics. Replace with a session cookie or POST form before sharing the dashboard URL externally.

---

## Rules (from CLAUDE_RULES.md)

- **Minimal diffs only** — never rewrite a full file for a small fix
- **25-line cap** — enter Plan Mode if more than 25 lines need changing
- **Never use `any` or `@ts-ignore`** — write a proper interface or extend `lib/types.ts`
- **Sanity:** targeted GROQ/schema edits only — never rewrite a full query for one field
- **Next.js App Router:** do not convert Server Components to Client Components just to fix state — find the architectural reason first
- **CSS:** use existing component classes from globals.css before writing inline styles — they exist now
- **Build check** (`npx next build`) before every commit
- **One commit per fix** — small, descriptive message
- **Use `.page-top` class** instead of `style={{ paddingTop: 'var(--nav-h)' }}`
- **Use `.field` class** for form inputs instead of `.form-group`

---

## How to Start a Session

1. Read this file ✅
2. Check `RESEARCH.md` if planning SEO, content, or features
3. Check `design_handoff_laagan/README.md` if doing UI work
4. Ask James what he wants to fix or build
5. Check relevant source files before touching anything
6. Fix only what's asked — no scope creep
