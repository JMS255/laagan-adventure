# Laagan Adventure — Developer Docs

Tour booking website for Laagan Adventure, a Zamboanga City–based tour operator. Built with Next.js App Router, Sanity CMS, and deployed on Vercel.

**Live site:** https://laagan-adventure.vercel.app  
**Sanity Studio:** https://laagan-adventure.vercel.app/studio  
**Booking dashboard:** https://laagan-adventure.vercel.app/dashboard?pw=<DASHBOARD_PASSWORD>

---

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 15 App Router |
| CMS | Sanity v3 (embedded Studio at `/studio`) |
| Styling | CSS custom properties + utility classes in `globals.css` |
| Fonts | Plus Jakarta Sans (body) · Playfair Display (headings) |
| Forms | `POST /api/book` → Sanity + Formspree backup |
| Deployment | Vercel (auto-deploy on push to `master`) |
| Analytics | Google Analytics 4 |

---

## Local setup

```bash
npm install
npm run dev        # http://localhost:3000
```

Studio runs at `http://localhost:3000/studio` — no separate process needed.

---

## Environment variables

Add these to `.env.local` locally and to Vercel → Settings → Environment Variables for production.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID (`o5mustem`) |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset (`production`) |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 Measurement ID |
| `SANITY_WRITE_TOKEN` | Sanity API token with write access — used by `/api/book` |
| `DASHBOARD_PASSWORD` | Password for `/dashboard` (default: `laagan2026`) |

---

## Key files

```
app/
  page.tsx                    Homepage
  tours/page.tsx              Tours listing (ISR 60s)
  tours/[slug]/page.tsx       Tour detail (ISR 60s)
  destinations/[slug]/page.tsx  Destination pages (ISR 60s)
  book/[slug]/page.tsx        Booking step 1 — date + guests
  book/[slug]/details/page.tsx  Booking step 2 — passenger details
  contact/page.tsx            Trip Builder (replaces contact form)
  dashboard/page.tsx          Bookings dashboard (password-protected)
  api/book/route.ts           POST — writes booking to Sanity + Formspree

components/
  TripBuilder.tsx             Interactive trip planner on /contact
  BookingOverview.tsx         Step 1 booking UI (date chips or free input)
  PassengerDetailsForm.tsx    Step 2 form → POST /api/book
  ToursFilter.tsx             Destination pill filter on /tours
  TravelerFilter.tsx          Audience filter on homepage
  StickyBookBar.tsx           Mobile sticky CTA (tour + destination pages)
  Nav.tsx / Footer.tsx

lib/
  sanity.ts                   Sanity client + all GROQ queries
  types.ts                    All shared TypeScript interfaces
  spots.ts                    Zamboanga City spot config for Trip Builder
  promoCodes.ts               Promo code engine

sanity/schemas/
  tour.ts                     Tour document schema
  booking.ts                  Booking document schema
  siteConfig.ts               Site-wide settings (pricing, deposit amount)
  gallery.ts / testimonial.ts / blogPost.ts
```

---

## Sanity content types

### Tour
Core content. Key fields:
- `availableDates` — ISO date strings (`YYYY-MM-DD`). If set, booking page shows date chips instead of free input.
- `badgeLabel` — e.g. `Most Popular`. Renders as pink pill on tour cards.
- `urgencyNote` — e.g. `Only 3 slots left`. Shows below badge.
- `pricingTiers` — per-person pricing by group size.
- `audience` — `solo | couple | barkada | family` (used by homepage filter).

### Booking
Written automatically when a guest submits the booking form. Fields:
- `bookingRef` — auto-generated 6-char code (e.g. `AB12CD`)
- `status` — `pending | confirmed | cancelled` (update manually in Studio)
- `depositSent` — toggled by guest on success screen (unverified, for reference)

### Site Config (singleton — create only one)
- `tripSmallGroupPrice` / `tripLargeGroupPrice` — Trip Builder pricing (₱)
- `depositAmount` — GCash deposit amount shown after booking (₱). Set to `0` to disable.

---

## Booking flow

```
/tours/[slug]
  → StickyBookBar / JoinersPrivateToggle "Book Now"
  → /book/[slug]?date=&guests=      ← BookingOverview (Step 1)
  → /book/[slug]/details?...        ← PassengerDetailsForm (Step 2)
  → POST /api/book
      ├── writes Sanity booking document
      └── sends Formspree backup email
  → Success screen with GCash deposit instructions
```

---

## Trip Builder (/contact)

Four destinations → group size → optional spot picker (Zamboanga City only) → date → Messenger deep-link pre-filled with the full trip brief.

Spot list lives in `lib/spots.ts`. Pricing comes from the Sanity `siteConfig` document (falls back to hardcoded values if not set).

---

## Booking dashboard (/dashboard)

URL: `/dashboard?pw=YOUR_PASSWORD`

Password is set via `DASHBOARD_PASSWORD` env var (default: `laagan2026`). Read-only — shows all bookings ordered newest-first. Update status in Sanity Studio → Booking → change `Status` → Publish → refresh dashboard.

---

## ISR revalidation

Pages that read from Sanity use `export const revalidate = 60`. This means:
- Pages are pre-built as static HTML at deploy time
- After 60 seconds, Next.js silently re-fetches from Sanity in the background
- Publishing a change in Studio appears on the live site within ~60 seconds — no redeploy needed

---

## Sprint history

| Sprint | Theme | Status |
|---|---|---|
| 1 | Foundation — pages, booking system, design system | ✅ |
| 2 | Discovery, booking flow, promo codes, UGC wall | ✅ |
| 3 | SEO — sitemap, OG images, GA4, robots | ✅ |
| 4 | Premium UX — DestinationShowcase, sticky tour tabs, ContactFlow, ScrollReveal | ✅ |
| 5 | Emotional UX — TravelerFilter, HowItWorks, TrustStrip, TestimonialCarousel | ✅ |
| Mobile | Full mobile audit — 375px pass, StickyBookBar, overflow fixes | ✅ |
| 6 | Booking infrastructure — available dates, GCash deposit, booking dashboard | ✅ |
