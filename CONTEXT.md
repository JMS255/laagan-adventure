# Laagan Adventure — Session Context

> Read this at the start of every new session to get fully caught up.
> Last updated: June 3, 2026

---

## Who I Am

James Ignacio — owner of Laagan Adventure, a local travel & tours business in Zamboanga City, Philippines. Running this alongside Craftifyle (photobooth + event photography CRM). Self-taught developer using Claude Code. Also a photographer and sometimes drives tours himself.

---

## What Laagan Adventure Is

A travel and tours website for a local tour operator in Zamboanga City, Philippines. James runs it with Ivy. They offer guided tour packages — island hopping, adventure, culture — centered around the Zamboanga peninsula, including the famous Santa Cruz Island pink sand beach.

**Business model:** Browse tours → booking inquiry → confirmed via Messenger → small deposit via GCash (optional) → balance paid on arrival. GCash deposit flow via Xendit implemented.

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
| Styling | CSS custom properties — shared.css system, NO Tailwind |
| Fonts | Playfair Display (headings) + Plus Jakarta Sans (body) |
| Forms | Formspree (xpwzgwnn) |
| Payments | Xendit (GCash deposits) |
| Hosting | Vercel |
| ISR | revalidate = 60 on all Sanity-powered pages |

---

## Content Architecture — CRITICAL TO UNDERSTAND

### Hybrid: Hardcoded Content + Sanity Prices

All tour content is **hardcoded** in `lib/tours-data.ts`. Sanity only stores price-related fields.

```
lib/tours-data.ts     ← titles, descriptions, photos, itineraries, inclusions (YOU EDIT THIS)
Sanity Studio         ← price, priceNote, badgeLabel, urgencyNote, availableDates (JAMES EDITS)
```

**Why:** Simpler for a small business. James's mom just needs to see a finished product. James maintains the code himself. When James takes his own photos, he just swaps the image URLs in `tours-data.ts`.

**Current photos:** Wikimedia Commons public domain + Unsplash placeholders. Replace with own photos by updating the `P` object URLs in `tours-data.ts`.

### The 7 Tours (all hardcoded in `lib/tours-data.ts`)

| Slug | Title | Duration |
|---|---|---|
| `santa-cruz-island-tour` | Santa Cruz Island Tour | Full Day 6–8 hrs |
| `once-islas-island-hopping` | Once Islas — 11 Islands | Full Day 8–10 hrs |
| `zamboanga-city-heritage-tour` | Zamboanga City Heritage Tour | Half Day 4–5 hrs |
| `merloquet-falls-eco-tour` | Merloquet Falls Eco Tour | Full Day 8–10 hrs |
| `paseo-del-mar-sunset-cruise` | Paseo del Mar Sunset Cruise | Evening 3 hrs |
| `zambasulta-complete-tour` | ZambaSulta — Complete Journey | 7 Days 6 Nights |
| `basilan-day-trip` | Basilan Day Trip | Full Day 8–10 hrs |

**To add prices in Sanity:** Go to `/studio` → Create tour document → set slug to exactly match the slug above → set price.

**To add a new tour:** Add entry to `TOURS_DATA` array in `lib/tours-data.ts` with a new slug. Then create matching Sanity document for the price.

---

## Design System

**Source of truth:** `app/globals.css` — built from `design_handoff_laagan/design-files/shared.css` verbatim + all page-specific inline styles from HTML prototypes.

**Dynamic nav height:** `--strip-h: 42px; --nav-h: calc(68px + var(--strip-h))`. When promo strip is dismissed, `--strip-h` becomes `0px` and `--nav-h` drops to 68px. All page offsets use `var(--nav-h)`.

**Colors:**
- `--navy: #004e64` — primary brand, ocean
- `--navy-2: #003347` — darker navy, hero bg
- `--pink: #d96b8a` — Santa Cruz pink sand, ONLY accent
- `--pink-dark: #bf5070`
- `--pink-light: #fff0f4`
- `--bg-2: #fdf5f7` — soft pink-tinted background
- `--text: #0d2637`
- `--muted: #4e6e80`
- `--border: #e8d5da`

**Key CSS classes:** See the full list in the previous version of this file or in `app/globals.css`. The classes are verbatim from the Claude Design handoff.

**CRITICAL rules:**
- Never add `page-top` to the homepage `<main>` — hero handles its own top padding
- All other pages: first colored section gets `paddingTop: 'calc(var(--nav-h) + Xpx)'` inline — NOT `page-top` on `<main>`
- Never wrap `<TourDayItinerary>` or `<DayItinerary>` in an extra `<h2>` — they render their own headings
- `next/image fill` requires `height: 480px` (not `max-height`) on the gallery parent
- Sanity gallery photos → `/gallery` page ONLY — not the homepage social feed

---

## Key Files

| File | Purpose |
|---|---|
| `lib/tours-data.ts` | **ALL tour content** — 7 tours, photos, descriptions, itineraries, inclusions |
| `lib/types.ts` | TypeScript types. `TourDay` is in `tours-data.ts`, `DayItem` is the Sanity type in `types.ts` — don't confuse them |
| `app/layout.tsx` | Root layout — fonts, BookingProvider, BookingDrawer, float buttons (📱💬), GA4 |
| `app/globals.css` | All CSS |
| `app/page.tsx` | Homepage — hero (static `/images/hero-bg.png`), stats, traveler filter, dest story, how it works, trust strip, testimonials, social feed (placeholder blocks), CTA. NO `page-top` on `<main>` |
| `app/tours/page.tsx` | Tours listing — page-hero + ToursFilter |
| `app/tours/[slug]/page.tsx` | Tour detail — reads from `getTourBySlug()` + Sanity price. Static params from `TOURS_DATA` |
| `app/book/[slug]/page.tsx` | Booking — passes to BookingOverview (3-step single-page flow) |
| `app/contact/page.tsx` | Contact — intent cards, Google Maps iframe (Zamboanga City), FAQ |
| `lib/sanity.ts` | Sanity client + GROQ queries |
| `lib/booking-context.tsx` | Shared booking state (React Context) |
| `lib/promoCodes.ts` | Promo codes: LAAGAN500, SUMMER10, GROUP20, WELCOME200 |

**Components:**
- `Nav.tsx` — Links: Tours | Gallery | Blog | About | Contact. "Book Now" opens BookingDrawer
- `TravelerFilter.tsx` — Homepage tour cards. Reads from `TOURS_DATA`, merges Sanity price
- `ToursFilter.tsx` — Tours page. Reads from `TOURS_DATA`, merges Sanity price. Filter drawer + sort
- `TourGallery.tsx` — Client component. Shows gallery grid + fullscreen lightbox with prev/next
- `TourDetailSidebar.tsx` — Client component. Joiners/Private toggle, steppers, price calc
- `TourItinerary.tsx` — Client accordion for single-day tour hourly schedules
- `TourDayItinerary.tsx` — Client accordion for multi-day tour day-by-day itineraries (hardcoded `TourDay` type)
- `DayItinerary.tsx` — Client accordion for Sanity-based `DayItem` type (multi-day, legacy)
- `BookingOverview.tsx` — 3-step single-page booking flow (all in one page, no URL navigation)
- `BookingDrawer.tsx` — Slide-in drawer. Links `santa-cruz-island-tour` and `zambasulta-complete-tour` to `/book/[slug]`, others to `/contact`
- `Footer.tsx` — 4-col layout. "About" (not "About James & Ivy")
- `TrustStrip.tsx` — 6 items: Free Cancellation, Pay on the Day, Money-Back Guarantee, Weather Guarantee, DTI Registered, Reply Within 24hrs
- `StickyBookBar.tsx` — Mobile sticky bar on tour detail pages
- `PromoStrip.tsx` — Promo bar. Sets `--strip-h: 0px` on dismiss, which updates `--nav-h` dynamically
- `FAQAccordion.tsx` — Expandable FAQ
- `ScrollReveal.tsx` — Framer-motion viewport animations

**Type names — do not confuse:**
- `TourDay` → in `lib/tours-data.ts` → for hardcoded multi-day itineraries
- `DayItem` → in `lib/types.ts` → for Sanity-based multi-day itineraries (ZambaSulta Sanity schema)

---

## Public Assets

| Path | What |
|---|---|
| `/public/images/hero-bg.png` | Hero background (static image, no video) |
| `/public/hero-video.mp4` | Not used |
| `/public/gcash-qr.jpg` | GCash QR on booking confirmation |
| `/public/logo.jpg` | Logo circle in nav |
| `/public/images/ivy.jpg` | Ivy's photo (About page — may not exist yet) |
| `/public/images/james.jpg` | James's photo (About page — may not exist yet) |

---

## Booking Flow

```
Nav "Book Now" → BookingDrawer (tour list)
  → /book/[slug] → BookingOverview (3 steps on one page)
    Step 1: Tour details (date, guests, promo code, price breakdown)
    Step 2: Your info (name, phone, email, notes)
    Step 3: Confirmation (booking ref, Messenger/WhatsApp links, GCash deposit option)
  → /api/book (form submission endpoint)
```

**Payment:** Small deposit via GCash (optional, ₱300). Balance on arrival. No Xendit required for basic bookings.

---

## Sprint Status

| Sprint | Status | Summary |
|---|---|---|
| Sprint 1–5 | ✅ Complete | Full site, booking system, SEO, mobile, emotional UX |
| Sprint 6 | ✅ Complete | Xendit GCash deposit |
| Design Sprint | ✅ Complete | Full HTML prototype implementation — class-for-class |
| Bug Fix Sprint | ✅ Complete | Nav gap, mobile layouts, gallery, photos, trust strip |
| **Content Sprint** | ✅ **Complete** | 7 tours built, research from iTravel + Right Deal + ProjectPH |
| Sprint 7 | 🔲 Next | GA4 events, JSON-LD, Sanity CDN, guest emails, domain |

---

## Content Sprint — What Was Done (June 3, 2026)

### Research Sources Used
- iTravel Tourist Lane (DOT-accredited) — itraveltouristlane.com
- Right Deal Travel & Tours — facebook.com/rdttipilbranch
- Guide to the Philippines — Once Islas, ZambaSulta packages
- Lakad Pilipinas — Santa Cruz Island, Once Islas guides
- The Poor Traveler — Zamboanga City guide
- A Wanderful Sole — Tawi-Tawi 3-day budget guide
- 7641islands.ph — Heritage walk details

### Tours Built
All with: tagline, full description, highlights, inclusions/exclusions, itinerary (hourly or day-by-day), what to bring, important notes, 3–4 photos.

1. **Santa Cruz Island** — real entrance fees, boat details, jellyfish lagoon, vinta
2. **Once Islas (11 Islands)** — specific islands named (Sirommon, Baung-Baung, Bisaya-Bisaya), community seafood lunch ₱300
3. **City Heritage Tour** — Fort Pilar entrance fees, Taluksangay Mosque (1885), Yakan weaving, Pasonanca Park
4. **Merloquet Falls** — 370 steps, 500m trail, Taluksangay Mosque side trip
5. **Sunset Cruise** — 3-hour vinta ride, golden hour, best for couples/proposals
6. **ZambaSulta 7-Day** — Panampangan Island sandbar, Simunul Mosque (oldest in PH, built 1380), Bud Bongao, Bajau floating villages, real day-by-day itinerary
7. **Basilan Day Trip** — Malamawi Island, rubber plantation, ro-ro ferry ₱90, specific times

### New Components Created
- `TourGallery.tsx` — photo grid + fullscreen lightbox with prev/next arrows
- `TourItinerary.tsx` — hourly accordion for single-day tours
- `TourDayItinerary.tsx` — day-by-day accordion matching ZambaSulta design (expand all / collapse all)

### Architecture Decision
Hybrid content model:
- `lib/tours-data.ts` — all content hardcoded (James edits this file when he takes his own photos)
- Sanity — price, priceNote, badgeLabel, urgencyNote only

---

## Bug Fixes Applied (June 3, 2026)

| Bug | Fix |
|---|---|
| White gap on every page | `--nav-h` now dynamic: `calc(68px + var(--strip-h))`. First sections own their `paddingTop` |
| Testimonials broken on mobile | Added `.tcard-grid` CSS class — 1 column on ≤600px |
| Tours grid mobile | CSS override — 1 column on ≤600px |
| Contact FAQ grid mobile | `.faq-grid-3` class — 1 column on ≤600px |
| Footer overlapping sticky bar | `.footer { padding-bottom: 88px }` on ≤600px |
| "Plan a Custom Trip" button mobile | Wrapped in flex container with `flex-wrap: wrap` |
| Gallery height collapse | `.gallery { height: 480px }` + `.gallery__main { height: 100% }` |
| "View all photos" non-functional | Replaced with `TourGallery` lightbox component |
| Meeting Point section on tour detail | Removed entirely |
| "Pay on the Day" messaging | Replaced with "small deposit + balance on arrival" language |
| Money-Back Guarantee | Added as 6th item to trust strip alongside Pay on the Day |
| Trust strip 6 items | CSS updated to `repeat(6,1fr)` |
| Nav "Plan My Trip" | Changed to "Contact" |
| BookingDrawer wrong destination | Links to `/book/[slug]` not `/contact` |
| Homepage social feed using gallery | Reverted to placeholder colored blocks |
| Itinerary accordion non-interactive | Replaced with `TourItinerary` client component |
| Footer "About James & Ivy" | Changed to "About" |
| Map on contact page | Real Google Maps iframe (Zamboanga City) |

---

## What to Build Next — Sprint 7

| Task | ROI | Effort |
|---|---|---|
| **Get custom domain** `laaganadventure.com` on Namecheap + connect to Vercel | High | 30 min |
| **Add prices in Sanity** for all 7 tours | Critical | 30 min |
| **GA4 funnel events** (view_item, begin_checkout, booking_submitted) | High | 1 day |
| **JSON-LD structured data** (TouristTrip + LocalBusiness + FAQPage) | High | 1 day |
| **`useCdn: true`** on Sanity client | Medium | 30 min |
| **Guest confirmation email** via Resend | High | 1 day |
| **"Is Zamboanga Safe?" blog post** | High | Writing only |
| **Replace placeholder photos** with James's own photography | High | When ready |
| **About page** — real story of James & Ivy, photos | Medium | 1 day |

---

## Rules (from CLAUDE_RULES.md)

- **Minimal diffs only** — never rewrite a full file for a small fix. 25-line cap
- **Never use `any` or `@ts-ignore`**
- **No inline styles** — use existing CSS classes from globals.css first
- **Build check** (`npx next build`) before every commit
- **One commit per fix**
- **No `page-top` on homepage** — hero handles its own top padding
- **No extra `<h2>` wrapping** DayItinerary or TourDayItinerary — they have their own headings
- **Gallery needs `height: 480px`** — not `max-height`, for `next/image fill` to work
- **Gallery photos in Sanity → `/gallery` only** — not homepage social feed
- **`TourDay` ≠ `DayItem`** — different types, don't mix up
- **Tours content in `lib/tours-data.ts`** — this is the source of truth for content
- **Sanity for prices only** — price, priceNote, badgeLabel, urgencyNote, availableDates

---

## How to Start a New Session

1. Read this file ✅
2. Check `design_handoff_laagan/README.md` if touching UI
3. Read `lib/tours-data.ts` top-level to see all tours
4. Ask James what to fix or build
5. Read only the relevant files before editing
6. Fix only what's asked — no scope creep
