# Laagan Adventure — Session Context

> Read this at the start of every new session to get fully caught up.
> Last updated: June 3, 2026

---

## Who I Am

James Ignacio — owner of Laagan Adventure, a local travel & tours business in Zamboanga City, Philippines. Running this alongside Craftifyle (photobooth + event photography CRM). Self-taught developer using Claude Code.

---

## What Laagan Adventure Is

A travel and tours website for a local tour operator in Zamboanga City, Philippines. James runs it with Ivy. They offer guided tour packages — island hopping, adventure, nature — centered around the Zamboanga peninsula, including the famous Santa Cruz Island pink sand beach.

**Business model:** Browse tours → inquiry via booking widget → confirmed via Messenger → pay on the day (cash or GCash). GCash deposit flow via Xendit implemented.

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

## Design System

**Source of truth:** `app/globals.css` — built from `design_handoff_laagan/design-files/shared.css` verbatim + all page-specific inline styles from HTML prototypes.

**Colors:**
- `--navy: #004e64` — primary brand, ocean
- `--navy-2: #003347` — darker navy, hero bg
- `--pink: #d96b8a` — Santa Cruz pink sand, ONLY accent
- `--pink-dark: #bf5070`
- `--pink-light: #fff0f4`
- `--bg-2: #fdf5f7` — soft pink-tinted background
- `--text: #0d2637`
- `--muted: #4e6e80` (also `--text-muted` — both exist as aliases)
- `--border: #e8d5da`

**Fonts:**
- `--font-display`: Playfair Display — all h1/h2/h3
- `--font-sans`: Plus Jakarta Sans — body, UI, forms

**Key CSS classes (use these, don't write inline styles):**
- Layout: `.container`, `.section`, `.section--dark`, `.section--darker`, `.section--alt`, `.section--sm`, `.page-top`
- Buttons: `.btn.btn--primary`, `.btn.btn--outline`, `.btn.btn--outline-light`, `.btn.btn--sm`, `.btn.btn--lg`, `.btn.btn--full`
- Nav: `.site-header`, `.promo-strip`, `.nav`, `.nav__logo`, `.nav__links`, `.nav__right`, `.nav__cta`, `.nav__phone`, `.nav__toggle`, `.nav__mobile.is-open`
- Tour cards: `.tour-card`, `.tour-card__img`, `.tour-card__img-bg`, `.tour-card__badge`, `.tour-card__body`, `.tour-card__name`, `.tour-card__chips`, `.tour-card__rating`, `.tour-card__stars`, `.tour-card__footer`, `.tour-card__price`, `.tour-card__price-note`
- Badges/chips: `.badge.badge--pink`, `.badge.badge--navy`, `.badge.badge--light`, `.chip`, `.chip--sm`
- Traveler filter: `.traveler-grid`, `.traveler-card`, `.traveler-card.is-active`, `.traveler-card__icon`, `.traveler-card__label`, `.traveler-card__desc`
- Trust: `.trust-strip`, `.trust-item`, `.trust-item__icon`, `.trust-item__text`, `.trust-micro`
- How It Works: `.how-grid`, `.how-step`, `.how-step__num`, `.how-step__time`, `.how-step__title`, `.how-step__desc`
- Destination story: `.dest-features`, `.dest-feature`, `.dest-feature__icon`, `.dest-feature__title`, `.dest-feature__desc`
- Stats: `.stats-bar`, `.stat-item`, `.stat-item__num` (use `<em>` for pink accent), `.stat-item__label`, `.stat-divider`
- Testimonials: `.tcard`, `.tcard__stars`, `.tcard__quote`, `.tcard__author`, `.tcard__avatar`, `.tcard__name`, `.tcard__meta`, `.tcard__tour-tag`
- Tour detail: `.gallery`, `.gallery__main`, `.gallery__thumbs`, `.gallery__thumb`, `.tour-header`, `.tour-title`, `.tour-meta`, `.urgency-bar`, `.detail-grid`, `.detail-section`, `.detail-section__title`, `.inc-grid`, `.inc-list`, `.review-card`, `.review-avatar`, `.review-name`, `.review-date`, `.review-tour`, `.review-text`, `.rating-summary`, `.rating-big`
- Booking: `.booking-sidebar`, `.sidebar-price-label`, `.sidebar-price`, `.tour-type-toggle`, `.tt-btn`, `.stepper-row`, `.stepper-label`, `.stepper-sub`, `.price-breakdown`, `.price-breakdown-row`, `.price-breakdown-total`, `.info-box`
- Booking flow: `.booking-page`, `.booking-header`, `.booking-container`, `.booking-card`, `.tour-summary`, `.promo-toggle`, `.promo-field`, `.price-box`, `.price-row`, `.price-total-row`, `.confirm-check`, `.booking-ref`, `.confirm-summary`, `.confirm-row`, `.ms-btn`, `.wa-btn`, `.gcash-box`, `.gcash-grid`, `.gcash-step`, `.gcash-step-num`
- Tours listing: `.page-hero`, `.filter-bar`, `.filter-bar__left`, `.filter-bar__right`, `.filter-btn`, `.sort-select`, `.results-count`, `.active-chip`, `.tours-grid-full`, `.filter-drawer`, `.filter-drawer-overlay`, `.filter-pill`, `.filter-pill.is-active`
- Contact: `.intent-grid`, `.intent-card`, `.intent-card__icon`, `.intent-card__title`, `.intent-card__desc`, `.contact-info-grid`, `.contact-info-item`, `.partner-form`
- Forms: `.field`, `.field-row` (replaces old `.form-group`)
- Stepper: `.stepper`, `.stepper__btn`, `.stepper__val`
- Step progress: `.step-progress`, `.step-progress__item.is-active`, `.step-progress__item.is-done`, `.step-progress__num`, `.step-progress__line`
- Breadcrumb: `.breadcrumb`, `.breadcrumb__sep`
- Float buttons: `.float-btns`, `.float-btn`, `.float-btn--wa`, `.float-btn--ms`
- Sticky bar: `.sticky-bar`, `.sticky-bar__price`, `.sticky-bar__amount`, `.sticky-bar__note`
- Footer: `.footer`, `.footer__grid` (4-col: 2fr 1fr 1fr 1fr), `.footer__brand-name`, `.footer__brand-desc`, `.footer__social`, `.footer__social-link`, `.footer__col-title`, `.footer__links`, `.footer__bottom`

**IMPORTANT:** `page-top` class adds `margin-top: var(--nav-h)`. Do NOT apply to pages whose first section is full-screen (homepage hero). Apply to all other pages.

---

## Key Files

| File | Purpose |
|---|---|
| `app/layout.tsx` | Root layout — fonts, BookingProvider, BookingDrawer, float buttons (emoji 📱💬), GA4 |
| `app/globals.css` | All CSS — shared.css base + all page-specific styles |
| `app/page.tsx` | Homepage — hero (static bg image), stats, traveler filter, dest story, how it works, trust strip, testimonials, social feed (placeholder blocks), CTA |
| `app/tours/page.tsx` | Tours listing — page-hero, ToursFilter |
| `app/tours/[slug]/page.tsx` | Tour detail — gallery, tour-header, urgency-bar, detail-grid, TourDetailSidebar, related tours |
| `app/book/[slug]/page.tsx` | Booking entry — passes tour to BookingOverview |
| `app/contact/page.tsx` | Contact — intent cards, partner form, contact-info-grid, FAQ |
| `lib/sanity.ts` | Sanity client + all GROQ queries |
| `lib/types.ts` | Single source of truth for all TypeScript types |
| `lib/booking-context.tsx` | Shared booking state (React Context) |
| `lib/promoCodes.ts` | Promo code engine (LAAGAN500, SUMMER10, GROUP20, WELCOME200) |

**Components:**
- `Nav.tsx` — frosted-glass nav, `nav__right`, `nav__cta`, `nav__mobile.is-open`. Links: Tours | Gallery | Blog | About | Contact
- `TravelerFilter.tsx` — homepage traveler cards + tour grid (`.tours-grid`)
- `ToursFilter.tsx` — tours page: traveler filter (compact) + filter bar + sort + `.tours-grid-full` + mobile drawer
- `TourDetailSidebar.tsx` — client component: Joiners/Private toggle, steppers, price calc, date input
- `BookingOverview.tsx` — single-page 3-step booking flow (all steps on one page, no URL navigation between steps)
- `BookingDrawer.tsx` — slide-in drawer from nav "Book Now". Links to `/book/[slug]` for tours with slugs, `/contact` for custom tours. Slugs: `santa-cruz-island-tour`, `zambasulta-complete-tour`
- `Footer.tsx` — 4-column footer with `footer__col-title` and `footer__social-link`
- `HowItWorks.tsx` — REMOVED as standalone component, inlined into page.tsx
- `TrustStrip.tsx` — REMOVED as standalone component, inlined into page.tsx
- `StickyBookBar.tsx` — mobile sticky bottom bar on tour detail pages
- `DayItinerary.tsx` — expandable day-by-day accordion (has its own heading — don't add a wrapper `<h2>`)
- `FAQAccordion.tsx` — expandable FAQ sections
- `JoinersPrivateToggle.tsx` — kept for backwards compat but TourDetailSidebar handles pricing now
- `ScrollReveal.tsx` — framer-motion viewport fade+slide

**Booking flow:** BookingWidget → BookingDrawer → `/book/[slug]` → BookingOverview (3 steps in one page: Tour Details → Your Info → Confirm with Messenger/WhatsApp/GCash)

**Float buttons (layout.tsx):** Emoji-based — 📱 WhatsApp (green) above 💬 Messenger (blue). On mobile lifts to `bottom: 84px`.

---

## Public Assets

| Path | What |
|---|---|
| `/public/images/hero-bg.png` | Hero background image (static, no video) |
| `/public/hero-video.mp4` | Hero video (NOT used — static image preferred) |
| `/public/gcash-qr.jpg` | GCash QR code shown on booking confirmation |
| `/public/logo.jpg` | Logo (34px circle in nav) |

**Hero setup:** Uses static `hero-bg.png` only. Video removed. `.hero__bg` div with `backgroundImage: "url('/images/hero-bg.png')"`. No `page-top` on homepage `<main>`.

---

## Sanity Schema — Tour Key Fields

`title, slug, featured, mainImage, tagline, description, duration, price, priceNote, destination, audience[], inclusions[], exclusions[], itinerary[]{time, activity}, mapQuery, faq[]{question, answer}, photos[], dayItinerary[]{dayLabel, title, description, highlights, photo}, pricingTiers[]{label, minPax, maxPax, pricePerPerson}, availabilityNote, badgeLabel, urgencyNote, availableDates[]`

**Gallery in Sanity:** For tourist-submitted photos only — appears on `/gallery` page, NOT on the homepage social feed. The homepage `@laaganadventure` section uses placeholder colored blocks.

---

## Sprint Status

| Sprint | Status | Summary |
|---|---|---|
| Sprint 1–5 | ✅ Complete | Full site, booking system, SEO, mobile audit, emotional UX |
| Mobile UX | ✅ Complete | Verified at 375px |
| Sprint 6 | ✅ Complete | Xendit GCash deposit integration |
| **Design Sprint** | ✅ **Complete** | Full HTML prototype implementation — class-for-class from Claude Design |
| Sprint 7 | 🔲 Next | SEO (JSON-LD), GA4 funnel events, Sanity CDN, guest email, slot capacity |

---

## Design Sprint — What Was Done (June 3, 2026)

### Approach
Implemented using "transcription mode" — HTML to JSX class-for-class with no improvisation. `shared.css` from `design_handoff_laagan/` was the CSS source of truth.

### Files Changed
- `globals.css` → shared.css verbatim + all page-specific `<style>` tags from HTML prototypes
- `app/page.tsx` → exact match to `index.html`
- `components/TravelerFilter.tsx` → `traveler-grid/traveler-card`, tour cards with new class names
- `app/tours/page.tsx` → `page-hero`, breadcrumb
- `components/ToursFilter.tsx` → filter-bar, `tours-grid-full`, filter drawer, filter-pills
- `app/tours/[slug]/page.tsx` → gallery, tour-header, urgency-bar, detail-grid, inc-grid, review-card
- `components/TourDetailSidebar.tsx` → NEW — sidebar-price, tour-type-toggle, stepper-row, price-breakdown
- `components/BookingOverview.tsx` → single-page 3-step flow — booking-card, tour-summary, stepper, promo-toggle, price-box, confirm-check, ms-btn/wa-btn, gcash-box
- `app/contact/page.tsx` → intent-grid/intent-card, contact-info-grid, map-placeholder, FAQ
- `components/Footer.tsx` → 4-col with footer__col-title, footer__social-link
- `app/layout.tsx` → emoji float buttons

### Bug Fixes Applied After Design Sprint
| Bug | Fix |
|---|---|
| Duplicate "Day-by-Day Itinerary" heading | Removed wrapper `<h2>` — DayItinerary has its own heading |
| Gallery showing as thin strip | Changed `.gallery` from `max-height:480px` to `height:480px` + `height:100%` on `.gallery__main` |
| White gap between nav and hero | Removed `page-top` from homepage `<main>` — hero pads its own content for nav |
| Hero video playing wrong content | Removed video entirely, using static `/images/hero-bg.png` |
| Nav "Plan My Trip" | Changed to "Contact" |
| BookingDrawer → Contact page | Fixed links to go to `/book/[slug]` for tours with slugs |
| Homepage social feed showing gallery photos | Gallery photos belong on `/gallery` only — social feed uses placeholder blocks |

---

## What to Build Next — Sprint 7

### Quick Wins (high ROI, low effort)
| Task | Why | Effort |
|---|---|---|
| **GA4 funnel events** | Can't optimize without knowing where users drop off | 1 day |
| **JSON-LD structured data** | Free Google rich snippets (TouristTrip + LocalBusiness + FAQPage) | 1 day |
| **`useCdn: true` on Sanity** | Cuts 200–400ms latency, currently bypassing CDN | 30 min |
| **Guest booking confirmation email (Resend)** | Guests get nothing after booking | 1 day |
| **"Is Zamboanga safe?" blog post** | Highest-ROI content — unblocks hesitant visitors | Writing only |
| **Canonical URLs in generateMetadata** | Prevents duplicate indexing from booking param URLs | 2 hrs |

### Medium-Term
| Task | Why | Effort |
|---|---|---|
| **Slot capacity / "X spots left"** | Santa Cruz 400/day cap — authentic urgency | 1 week |
| **Destination guide pages** | `/destinations/[slug]` exists but not wired up | 1 week |
| **On-demand ISR via Sanity webhook** | Tour pages update instantly on publish | 3 hrs |
| **Next.js `<Image>` for photo walls** | LCP improvement — still using `<img>` tags | 1 day |

### Custom Domain
Get `laaganadventure.com` on Namecheap (~$10/year). Add in Vercel Settings → Domains.

---

## Rules (from CLAUDE_RULES.md)

- **Minimal diffs only** — never rewrite a full file for a small fix
- **25-line cap** — enter Plan Mode if more than 25 lines need changing
- **Never use `any` or `@ts-ignore`**
- **No inline styles** — use existing CSS classes from globals.css first
- **CSS:** prefer adding a class over inline styles
- **Build check** (`npx next build`) before every commit
- **One commit per fix**
- **Use `.page-top`** on all pages EXCEPT homepage (hero handles its own top padding)
- **Use `.field`** for form inputs, not `.form-group`
- **DayItinerary** has its own heading — don't wrap it in another `<h2>`
- **Gallery photos** in Sanity → `/gallery` page only, NOT homepage social feed
- **`useCdn: false`** currently on Sanity client — still needs to be changed to `true`

---

## How to Start a Session

1. Read this file ✅
2. Check `RESEARCH.md` if planning SEO, content, or features
3. Check `design_handoff_laagan/README.md` for visual spec reference
4. Ask James what to fix or build
5. Check relevant source files before touching anything
6. Fix only what's asked — no scope creep
