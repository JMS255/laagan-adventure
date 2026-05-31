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
| Payments | Xendit (GCash deposits via hosted invoice) |
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
| `SANITY_WRITE_TOKEN` | Sanity API token with write access — used by `/api/book` and `/api/xendit/webhook` |
| `DASHBOARD_PASSWORD` | Password for `/dashboard` (default: `laagan2026`) |
| `XENDIT_SECRET_KEY` | Xendit secret key (`xnd_development_...` for test, `xnd_production_...` for live) |
| `XENDIT_WEBHOOK_TOKEN` | Xendit callback token — from Xendit dashboard → Settings → Webhooks |
| `NEXT_PUBLIC_SITE_URL` | Full site URL e.g. `https://laagan-adventure.vercel.app` (used in Xendit redirect URLs) |

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
  book/paid/page.tsx          Xendit payment redirect landing page
  api/book/route.ts           POST — writes booking to Sanity + Formspree backup
  api/xendit/create/route.ts  POST — creates Xendit invoice, returns payment URL
  api/xendit/webhook/route.ts POST — Xendit callback, confirms booking in Sanity

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
- `status` — `pending | confirmed | cancelled`. Auto-set to `confirmed` when Xendit webhook fires on successful payment. Can also be updated manually in Studio.
- `depositSent` — set to `true` automatically by the Xendit webhook on payment. Not manually verified.

### Site Config (singleton — create only one)
- `tripSmallGroupPrice` / `tripLargeGroupPrice` — Trip Builder pricing (₱)
- `depositAmount` — GCash deposit amount shown after booking (₱). Set to `0` to disable.

---

## Booking flow

```
/tours/[slug]
  → StickyBookBar / JoinersPrivateToggle "Book Now"
  → /book/[slug]?date=&guests=        ← BookingOverview (Step 1)
      • date chips if availableDates set in Sanity, else free date input
  → /book/[slug]/details?...          ← PassengerDetailsForm (Step 2)
  → POST /api/book
      ├── writes Sanity booking document (status: pending)
      └── sends Formspree backup email
  → Success screen
      └── "Pay ₱X via GCash →" button (if depositAmount > 0 in siteConfig)
          → POST /api/xendit/create
              └── creates Xendit invoice → redirects to Xendit hosted checkout
                  → guest pays via GCash
                  → Xendit fires webhook → POST /api/xendit/webhook
                      └── updates Sanity booking: status=confirmed, depositSent=true
                  → redirects to /book/paid?ref=XXXXXX
```

---

## Trip Builder (/contact)

Four destinations → group size → optional spot picker (Zamboanga City only) → date → Messenger deep-link pre-filled with the full trip brief.

Spot list lives in `lib/spots.ts`. Pricing comes from the Sanity `siteConfig` document (falls back to hardcoded values if not set).

---

## Xendit GCash payments

- **Test mode:** uses `xnd_development_...` key. Payments are simulated — no real money moves. Test GCash PIN is `123456`.
- **Live mode:** swap to `xnd_production_...` key in Vercel env vars after Xendit business verification. No code changes needed.
- **Fees:** ~2.5% per GCash transaction (deducted from payout, not charged upfront).
- **Webhook setup:** Xendit dashboard → Settings → Webhooks → add `https://laagan-adventure.vercel.app/api/xendit/webhook` → enable **Invoice paid** → copy callback token → add as `XENDIT_WEBHOOK_TOKEN` in Vercel.

---

## Booking dashboard (/dashboard)

URL: `/dashboard?pw=YOUR_PASSWORD`

Password is set via `DASHBOARD_PASSWORD` env var (default: `laagan2026`). Read-only — shows all bookings ordered newest-first. Deposit column shows ✅ when Xendit payment confirmed, ⏳ when pending. Update status manually in Sanity Studio → Booking → change `Status` → Publish → refresh dashboard.

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
| 6b | Xendit GCash payment integration — hosted checkout, webhook auto-confirm | ✅ |
