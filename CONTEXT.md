# Laagan Adventure — Session Context

> Read this at the start of every new session to get fully caught up.
> Last updated: June 3, 2026

---

## Who I Am

James Ignacio — owner of Laagan Adventure, a local travel & tours business in Zamboanga City, Philippines. Running this alongside Craftifyle (photobooth + event photography CRM). Self-taught developer using Claude Code.

---

## What Laagan Adventure Is

A travel and tours website for a local tour operator in Zamboanga City, Philippines. James runs it with Ivy. They offer guided tour packages — island hopping, adventure, nature — centered around the Zamboanga peninsula, including the famous Santa Cruz Island pink sand beach.

**Business model:** Browse tours → inquiry via booking widget → confirmed via Messenger → pay on the day (cash or GCash). No online payment processing.

**Target audience:** Filipino travelers + tourists discovering Zamboanga experiences. Mobile-first (most users on phone).

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
| Hosting | Vercel |
| ISR | revalidate = 60 on all Sanity-powered pages |

---

## Design System

**Colors (CSS custom properties in app/globals.css):**
- `--navy: #004e64` — ocean, primary brand
- `--navy-2: #003347` — darker navy for hero/sidebar
- `--pink: #d96b8a` — Santa Cruz Island pink sand, only accent color
- `--pink-dark: #bf5070`
- `--bg-2: #fdf5f7` — soft pink-tinted background
- `--text: #0d2637`
- `--text-muted: #4e6e80`
- `--border: #e8d5da`

**Fonts:**
- `--font-display`: Playfair Display — all h1/h2, editorial headings
- `--font-sans`: Plus Jakarta Sans — body, UI, forms

**Button classes:**
- `.btn.btn--primary` — pink fill, white text (main CTA)
- `.btn.btn--outline` — navy border, navy text (secondary on light bg)
- `.btn.btn--outline-light` — white border, white text (on dark/navy bg)

**Layout:** Container = `max-width: 1200px`, padding `32px` (→ `16px` at <600px). No Tailwind — CSS vars only.

---

## Key Files

| File | Purpose |
|---|---|
| `app/layout.tsx` | Root layout — font loading, BookingProvider, BookingDrawer, MessengerFloat, GA4 |
| `app/globals.css` | All CSS custom properties + shared styles |
| `lib/sanity.ts` | Sanity client + all GROQ queries (TOURS_QUERY, TOUR_QUERY, etc.) |
| `lib/types.ts` | Single source of truth for all TypeScript types |
| `lib/booking-context.tsx` | Shared booking state (React Context) |
| `lib/promoCodes.ts` | Promo code engine (LAAGAN500, SUMMER10, GROUP20, WELCOME200) |

**Components:**
- `Nav.tsx` — frosted-glass nav, promo strip, phone `0905-243-5196`, "Plan My Trip" link
- `BookingWidget.tsx` — white card hero widget (tour/date/guests via createPortal dropdowns)
- `BookingDrawer.tsx` — slide-in tour selector from right
- `DatePicker.tsx` — custom calendar (createPortal, light theme)
- `DestinationShowcase.tsx` — 7/5 asymmetric destination grid
- `TourTabs.tsx` — sticky tabs + scrollspy + price/Book CTA on tour pages
- `DayItinerary.tsx` — expandable day-by-day accordion
- `JoinersPrivateToggle.tsx` — Joiners/Private Charter two-tab pricing
- `ContactFlow.tsx` — 3-card intent selector → Messenger deep-links
- `TrustStrip.tsx` — 5 SVG trust points
- `ScrollReveal.tsx` — framer-motion viewport fade+slide wrapper
- `TestimonialCarousel.tsx`, `EasyQuoteModal.tsx`, `MessengerFloat.tsx`, `Footer.tsx`

**Booking flow:** BookingWidget → BookingDrawer → `/book/[slug]` → `/book/[slug]/details` → Formspree → confirmation screen with Messenger CTA

**Formspree endpoint:** `https://formspree.io/f/xpwzgwnn`

**createPortal note:** TourDropdown + DatePicker both use `createPortal` to `document.body` to escape hero `overflow:hidden` — positioning via `getBoundingClientRect()`.

---

## Sanity Schema — Tour Key Fields

`title, slug, featured, mainImage, tagline, description, duration, price, priceNote, destination, inclusions[], exclusions[], itinerary[]{time, activity}, mapQuery, faq[]{question, answer}, photos[], dayItinerary[]{dayLabel, title, description, highlights, photo}, pricingTiers[]{label, minPax, maxPax, pricePerPerson}, availabilityNote`

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
| Sprint 6 | 🔲 Next | Available dates calendar in Sanity, dynamic tour search/filter, GCash deposit flow, Next.js Image rollout + skeletons, booking dashboard |

---

## What to Build Next — Sprint 6

1. **Available dates calendar** — Sanity-managed, shown on tour pages
2. **Dynamic tour search/filter** — `/tours?destination=&month=` URL params
3. **GCash deposit flow** — Xendit integration, deposit link generation
4. **Next.js Image rollout** — replace `<img>` tags + add skeleton loaders
5. **Booking dashboard** — internal view for James/Ivy (confirmed bookings per date)

---

## Rules (from CLAUDE_RULES.md)

- **Minimal diffs only** — never rewrite a full file for a small fix
- **25-line cap** — enter Plan Mode if more than 25 lines need changing
- **Never use `any` or `@ts-ignore`** — write a proper interface or extend `lib/types.ts`
- **Sanity:** targeted GROQ/schema edits only — never rewrite a full query for one field
- **Next.js App Router:** do not convert Server Components to Client Components just to fix state — find the architectural reason first
- **CSS:** prefer adding a targeted class or inline style — never touch unrelated CSS rules
- **Build check** (`npx next build`) before every commit
- **One commit per fix** — small, descriptive message

---

## How to Start a Session

1. Read this file ✅
2. Ask James what he wants to fix or build
3. Check relevant source files before touching anything
4. Fix only what's asked — no scope creep
