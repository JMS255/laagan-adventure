# Laagan PH — Session Context

> Read this at the start of every new session to get fully caught up.
> Last updated: June 8, 2026

---

## Who I Am

James Ignacio — owner of Laagan PH (formerly Laagan Adventure), a local travel & tours business in Zamboanga City, Philippines. Running this alongside Craftifyle (photobooth + event photography CRM). Self-taught developer using Claude Code. Also a photographer and sometimes drives tours himself. Co-runs with Ivy Sanchez Eisma.

---

## What Laagan PH Is

A travel and tours website for a local tour operator in Zamboanga City, Philippines. James runs it with Ivy. They offer guided tour packages — island hopping, adventure, culture — centered around the Zamboanga peninsula, including the famous Santa Cruz Island pink sand beach.

**Brand:** Laagan PH (DTI registered under "Laagan Adventure" — legal name stays, brand name updated to Laagan PH). Future rebranding planned when going regional/national.

**Business model:** Browse tours → booking inquiry → confirmed via Messenger → small deposit via GCash (optional) → balance paid on arrival. GCash deposit flow via Xendit implemented.

**Target audience:** Filipino travelers (domestic, mobile-first), OFWs, and international visitors.

---

## Live URLs

- **Site:** laaganadventure.com (custom domain, also on laagan-adventure.vercel.app)
- **Sanity Studio:** laaganadventure.com/studio
- **Repo:** github.com/JMS255/laagan-adventure (branch: master)
- Auto-deploys to Vercel on push to master (2–5 min)
- **Facebook:** facebook.com/profile.php?id=61562040673545 (Laagan.Ph · 118 followers)
- **Google Business Profile:** Created June 2026

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | Next.js 15 App Router + TypeScript |
| CMS | Sanity.io (project ID: o5mustem, dataset: production) |
| Styling | CSS custom properties — shared.css system, NO Tailwind |
| Fonts | Playfair Display (headings) + Plus Jakarta Sans (body) |
| Payments | Xendit (GCash deposits) |
| Email | Resend REST API (raw fetch, no npm package) — `RESEND_API_KEY` env var |
| Analytics | GA4 — measurement ID in `app/layout.tsx` |
| Hosting | Vercel |
| ISR | revalidate = 60 on all Sanity-powered pages |

---

## Brand & Logo

### Logo Design (June 8, 2026)
Custom SVG logo with:
- **Circle badge** — dark navy sky (top) + pink sun semicircle rising from horizon + dark navy ocean (bottom) + white vinta sailing at the waterline (hull + mast + triangular sail + outrigger)
- **Wordmark** — "LAAGAN" in Playfair Display navy + "PH" in pink (#d96b8a), "Travel & Tours · Since 2024" subline

### Logo Files
| File | Use |
|---|---|
| `public/logo-circle.svg` | Circle badge (standalone SVG, 800×980 viewBox) |
| `public/logo-horizontal.svg` | Horizontal wordmark (standalone SVG, 1600×440 viewBox) |
| `logo-concepts.html` | Design preview file (not deployed) |
| `logo-export.html` | PNG download tool — circle 720×880 + horizontal 1600×440 |

### Nav Logo Implementation
Inline SVG in `components/Nav.tsx` — split into:
1. Small circle SVG icon (`width={34} height={34}`, `viewBox="7 7 96 96"`)
2. HTML `.nav__wordmark` div with `.nav__wordmark-name` + `.nav__wordmark-sub` styled text

This allows circle and text to be sized independently.

### Design Tokens (logo colors)
- Sky: `#1a3d52` → `#004e64` gradient
- Ocean: `#004e64` → `#001e2c` gradient
- Pink sun: `#ea8ba0` → `#c95878` gradient
- All white elements use `fill="white"` on dark navy

---

## Content Architecture — CRITICAL TO UNDERSTAND

### Hybrid: Hardcoded Content + Sanity Prices

All tour content is **hardcoded** in `lib/tours-data.ts`. Sanity only stores price-related fields.

```
lib/tours-data.ts     ← titles, descriptions, photos, itineraries, inclusions (YOU EDIT THIS)
Sanity Studio         ← price, priceNote, badgeLabel, urgencyNote, availableDates (JAMES EDITS)
```

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

---

## Design System

**Colors:**
- `--navy: #004e64` — primary brand, ocean
- `--navy-2: #003347` — darker navy, hero bg
- `--pink: #d96b8a` — Santa Cruz pink sand, ONLY accent
- `--pink-dark: #bf5070`
- `--bg-2: #fdf5f7` — soft pink-tinted background
- `--text: #0d2637`
- `--muted: #4e6e80`
- `--border: #e8d5da`

**CRITICAL rules:**
- Never add `page-top` to the homepage `<main>` — hero handles its own top padding
- All other pages: first colored section gets `paddingTop: 'calc(var(--nav-h) + Xpx)'` inline
- Never wrap `<TourDayItinerary>` in an extra `<h2>` — it renders its own headings
- `next/image fill` requires `height: 480px` on the gallery parent
- Sanity gallery photos → `/gallery` page ONLY — not homepage social feed

---

## Key Files

| File | Purpose |
|---|---|
| `lib/tours-data.ts` | **ALL tour content** — 7 tours, photos, descriptions, itineraries, inclusions |
| `lib/types.ts` | TypeScript types |
| `app/layout.tsx` | Root layout — fonts, BookingProvider, BookingDrawer, float buttons, GA4 |
| `app/globals.css` | All CSS |
| `app/page.tsx` | Homepage — hero, stats, traveler filter, social feed (6 real photos), trust strip, CTA |
| `app/tours/[slug]/page.tsx` | Tour detail — JSON-LD TouristTrip schema added |
| `app/api/book/route.ts` | Booking API — sends Resend confirmation email to guest + admin |
| `components/Nav.tsx` | Inline SVG logo (circle icon + HTML wordmark). Links: Tours · Gallery · Blog · About · Contact |
| `components/Footer.tsx` | Circle SVG logo, "Laagan PH", dynamic `{new Date().getFullYear()}` copyright |
| `components/TrustStrip.tsx` | 7 items: Free Reschedule, Pay on the Day, Money-Back Guarantee, Weather Guarantee, DTI Registered, Reply Within 24hrs, Professional Local Guide |
| `components/BookingOverview.tsx` | 3-step booking — GA4 events: begin_checkout, add_contact_info, purchase |

---

## Public Assets

| Path | What |
|---|---|
| `/public/images/hero-bg.png` | Hero background |
| `/public/images/guests-santa-cruz-vinta.jpg` | Real March 2026 booking guests on vinta |
| `/public/images/guests-zamboanga-sign.jpg` | Real guests at Zamboanga City sign |
| `/public/images/panampangan-pier.jpg` | Panampangan Island, Tawi-Tawi |
| `/public/images/panampangan-pier-2.jpg` | Panampangan pier turquoise water |
| `/public/images/merloquet-falls-real.jpg` | Merloquet Falls with people |
| `/public/images/zambasulta-mosque.jpg` | ZambaSulTa blue geodesic dome mosque |
| `/public/images/malamawi-aerial.jpg` | Malamawi Island drone shot, Basilan |
| `/public/images/fort-pilar.jpg` | Fort Pilar shrine |
| `/public/images/basilan-church.jpg` | Sta. Isabel Cathedral |
| `/public/images/basilan-church-interior.jpg` | Church interior pink dome |
| `/public/images/santa-cruz-sign.jpg` | I ♥ Zamboanga sign |
| `/public/images/sulu-monument.jpg` | Sulu monument |
| `/public/logo-circle.svg` | Circle badge logo |
| `/public/logo-horizontal.svg` | Horizontal wordmark logo |
| `/public/gcash-qr.jpg` | GCash QR for booking confirmation |

---

## Sprint Status

| Sprint | Status | Summary |
|---|---|---|
| Sprint 1–6 | ✅ Complete | Full site, booking, SEO, mobile, emotional UX, Xendit GCash |
| Design Sprint | ✅ Complete | Full HTML prototype implementation |
| Bug Fix Sprint | ✅ Complete | Nav gap, mobile layouts, gallery, photos |
| Content Sprint | ✅ Complete | 7 tours built with full itineraries |
| **Sprint 7** | ✅ **Complete** | JSON-LD, GA4 events, Resend email, real photos, logo, branding |

### Sprint 7 — Done (June 8, 2026)
- ✅ JSON-LD TouristTrip structured data on all tour pages
- ✅ GA4 funnel events: `begin_checkout`, `add_contact_info`, `purchase` in BookingOverview
- ✅ Resend confirmation email — guest + admin notification via raw fetch (no npm package)
- ✅ 16 real photos added to `public/images/` (March 2026 booking + location shots)
- ✅ About page fixed — Wikimedia team photo, CSS letter-avatar fallback for founders
- ✅ Custom logo designed in SVG — vinta + pink sun + navy ocean
- ✅ Nav updated — inline SVG circle icon + HTML wordmark
- ✅ Footer updated — logo, "Laagan PH", dynamic copyright year
- ✅ Social feed — 6 real guest/location photos (was colored placeholder blocks)
- ✅ TrustStrip — "Free Reschedule" (was "Free Cancellation"), added "Professional Local Guide"

### What's Still Pending
| Task | Notes |
|---|---|
| Add prices in Sanity for all 7 tours | Go to `/studio` → create tour doc → match slug exactly |
| Add `RESEND_API_KEY` to Vercel env vars | Also verify laaganadventure.com on resend.com |
| Real founder photos on About page | When James/Ivy have photos ready, replace letter-avatar divs |
| "Is Zamboanga Safe?" blog post | Write in Sanity Studio |
| Hero copy rewrite | Current copy is generic placeholder |
| More guest photos | Replace remaining Wikimedia/placeholder images in tours-data.ts |

---

## Booking Flow

```
Nav "Book Now" → BookingDrawer (tour list)
  → /book/[slug] → BookingOverview (3 steps)
    Step 1: Tour details (date, guests, promo code, price breakdown) → GA4: begin_checkout
    Step 2: Your info (name, phone, email, notes) → GA4: add_contact_info
    Step 3: Confirmation (booking ref, Messenger/WhatsApp links, GCash option) → GA4: purchase
  → /api/book → Resend email to guest + jamesignacio255@gmail.com
```

**Promo codes:** LAAGAN500, SUMMER10, GROUP20, WELCOME200 (in `lib/promoCodes.ts`)

---

## Rules (from CLAUDE_RULES.md)

- **Minimal diffs only** — never rewrite a full file for a small fix. 25-line cap
- **Never use `any` or `@ts-ignore`**
- **Build check** (`npx next build`) before every commit
- **One commit per fix**
- **No `page-top` on homepage** — hero handles its own top padding
- **Gallery needs `height: 480px`** — not `max-height`
- **`TourDay` ≠ `DayItem`** — different types, don't mix up
- **Sanity for prices only** — content lives in `lib/tours-data.ts`

---

## How to Start a New Session

1. Read this file ✅
2. Check what's still pending in the sprint table above
3. Read only the relevant files before editing
4. Fix only what's asked — no scope creep
