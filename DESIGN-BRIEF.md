# Laagan Adventure — Design Brief for Claude Design
### UI/UX + Feature Requirements
**Use this document to prompt Claude Design for high-fidelity mockups.**

---

## WHO WE ARE

**Laagan Adventure** is a local travel and tours company in **Zamboanga City, Philippines**. We offer guided island adventures — island hopping, cultural tours, adventure packages — centered around **Santa Cruz Island**, the only pink sand beach in Asia (National Geographic Top 21 Beaches in the World, 2017).

**Run by:** James and Ivy — locals who know Zamboanga deeply.
**Audience:** Filipino travelers (domestic, mobile-first), OFWs, and international visitors.
**Business model:** Browse tours → inquire → confirm via Messenger → pay on the day (cash or GCash). Personal, trust-based booking.

---

## CURRENT DESIGN SYSTEM (DO NOT CHANGE THESE)

```
Colors:
--navy:       #004e64  (primary brand, ocean)
--navy-2:     #003347  (darker navy, hero backgrounds)
--pink:       #d96b8a  (Santa Cruz pink sand, only accent)
--pink-dark:  #bf5070
--bg-2:       #fdf5f7  (soft pink-tinted background)
--text:       #0d2637
--text-muted: #4e6e80
--border:     #e8d5da

Fonts:
- Playfair Display — all headings, editorial, h1/h2
- Plus Jakarta Sans — body, UI, forms, everything else

Buttons:
- Primary: pink fill (#d96b8a), white text
- Outline: navy border, navy text (on light bg)
- Outline-light: white border, white text (on dark/navy bg)
```

**Visual identity:** Pink Sand + Ocean palette. Warm, tropical, editorial. No Tailwind — clean CSS. The brand palette matches the actual destination (pink sand + turquoise water + vinta sails).

---

## TONE & FEEL

- Adventurous but approachable
- Warm and local — not corporate
- Premium feel without being intimidating
- Emotional — sell the experience, not just the price
- Trust-first — small local operator, so every element must feel credible

---

## PAGES TO DESIGN

---

### PAGE 1: HOMEPAGE

**Goal:** Create emotional desire in 10 seconds, then guide to booking.

**Structure (top to bottom):**

#### A. Navigation
- Logo left, nav links center/right
- Links: Tours | Destinations | Blog | Contact | "Plan My Trip"
- Phone number visible on desktop: 0905-243-5196
- "Book Now" CTA button — pink, top right
- Frosted-glass effect on scroll
- Mobile: hamburger menu

#### B. Hero Section
- Full-viewport height
- Background: muted looping video of vinta sailing OR pink sand beach (desktop). Static WebP image on mobile.
- Dark scrim overlay (rgba 0,0,0 at 0.4) for text contrast
- **Headline (Playfair Display, large, white):**
  > "The Only Pink Sand Beach in Asia."
- **Subheadline (Plus Jakarta Sans, white, lighter weight):**
  > "Guided island adventures in Zamboanga City, Philippines."
- **One CTA button:** "See Our Tours" — pink, prominent
- **Below headline:** Small trust line — ⭐ 5.0 · National Geographic Best Beach · DTI Accredited

#### C. Social Proof Bar (just below hero)
- 3 numbers in a horizontal strip:
  - "500+ Tours Completed"
  - "5.0 ★ Average Rating"
  - "Since 2022"
- Clean, minimal, navy background or white strip

#### D. Traveler Filter
- Headline: "Find the Perfect Adventure For You"
- 4 card filters in a row (or 2x2 on mobile):
  - 🧍 Solo Traveler
  - 💑 Couple Getaway
  - 👫 Barkada / Group
  - 👨‍👩‍👧 Family & Kids
- Selecting a filter shows relevant tours below
- Cards: icon + label, border highlight on selected

#### E. Featured Tours Grid
- Section label: "OUR TOURS"
- Headline: "Discover Zamboanga's Best Experiences"
- 3 tour cards in a row (2 col tablet, 1 col mobile)
- **Each tour card:**
  - Full-bleed 3:2 image
  - Badge overlay top-left (e.g., "🔥 Most Popular", "⭐ Best Seller")
  - Tour name (Playfair Display)
  - Duration chip + Group type chip
  - Star rating + review count
  - Price per person (prominent, pink)
  - "Check Availability" button — outline style
- "View All Tours" link below grid

#### F. Destination Story (Why Zamboanga?)
- Dark navy background section
- Headline: "A Beach So Rare, National Geographic Noticed."
- Body: 3 short paragraphs or 3 icon+text columns:
  - 🏖 Pink sand from crushed red coral — only one in Asia
  - 🪼 Swim with stingless jellyfish in the lagoon
  - ⛵ Sail on a traditional Tausug vinta
- One CTA: "Plan My Trip"

#### G. How It Works (3-Step Strip)
- Headline: "How It Works"
- 3 steps horizontal:
  1. **Choose your tour** (2 minutes)
  2. **We confirm via Messenger** (within 24 hours)
  3. **Pay on the day** (cash or GCash)
- Simple icons, numbered, clean

#### H. Trust Strip
- 5 trust points in a row (collapses to 2-3 col on mobile):
  - ✅ Free Cancellation
  - ✅ Pay on the Day
  - ✅ Weather Guarantee
  - ✅ DTI Registered
  - ✅ Reply Within 24hrs

#### I. Testimonials
- Section label: "WHAT TRAVELERS SAY"
- Headline: "Real Stories from Real Guests"
- 3-column testimonial cards (1 col mobile):
  - Reviewer avatar (initials circle if no photo)
  - Name + origin city (e.g., "Maria G. — Davao City")
  - Star rating (5 stars)
  - Review text (2–4 sentences)
  - Tour name tag below

#### J. Instagram/Facebook Feed Strip
- Section label: "FOLLOW THE ADVENTURE"
- Live feed embed of recent guest photos
- Caption: "Tag us @laaganadventure"
- Background: light pink tint (#fdf5f7)

#### K. Final CTA Section
- Full-width, navy background
- Headline: "Ready to See the Pink Sand?"
- Subline: "Book your adventure today. We'll confirm within 24 hours."
- Two buttons: "See Our Tours" (primary, pink) | "Message Us" (outline, white)

#### L. Footer
- Logo + tagline
- Nav links
- Contact: phone, Messenger, WhatsApp, email
- Social: Facebook, Instagram, TikTok
- DTI number + copyright

---

### PAGE 2: TOURS LISTING (/tours)

**Goal:** Help users find the right tour quickly. Filter + browse.

**Structure:**

#### A. Page Header
- Headline: "Explore All Tours"
- Subline: "Guided adventures across Zamboanga's best destinations"
- Breadcrumb: Home > Tours

#### B. Traveler Filter (same as homepage)
- 4 filter chips: Solo | Couple | Barkada | Family

#### C. Filter + Sort Bar
- Filter button (opens bottom sheet on mobile): "Filter" with icon
- Sort dropdown: "Most Popular | Price: Low to High | Duration"
- Results count: "Showing 5 tours"
- Applied filter chips appear as removable tags

#### D. Tour Cards Grid
- Same card design as homepage grid
- 3 col desktop / 2 col tablet / 1 col mobile
- Cards: image, badge, name, duration, price, rating, CTA

#### E. Filter Bottom Sheet (Mobile)
- Slides up from bottom
- Sections: Activity Type | Duration | Price Range | Group Size
- "Apply Filters" button (full width, pink) at bottom
- "Reset" text link top right

---

### PAGE 3: TOUR DETAIL PAGE (/tours/[slug])

**Goal:** Convert a browsing visitor into a booking. Everything on this page must build desire then remove friction.

**Structure:**

#### A. Breadcrumb
Home > Tours > [Tour Name]

#### B. Image Gallery
- Desktop: 2-column grid (1 large left, 2 small right stacked)
- Mobile: Full-width swipeable carousel with dot indicators
- "View all X photos" button opens a lightbox
- Real guest photos preferred over professional shots

#### C. Tour Header
- Tour name (Playfair Display, large)
- Metadata chips in a row:
  - ⏱ Duration
  - 👥 Group size
  - 📍 Departs from Paseo del Mar
  - ⭐ Rating + review count
- Urgency badge (if applicable): "🔥 Most Popular" | "Only 4 spots left"

#### D. Two-Column Layout (Desktop): Left content / Right sticky sidebar

**Left column:**

**Overview tab:**
- 100–150 word description, second person ("You'll..."), sensory language
- What makes this tour unique (3 bullet points with icons)

**Inclusions/Exclusions:**
- ✅ Included items (bulleted list)
- ❌ Not included (bulleted list)

**Itinerary accordion:**
- Day-by-day expandable sections
- Each day: time, activity, highlights

**What to Bring accordion:**
- Packing list: sunscreen, swimwear, cash, etc.

**Meeting Point:**
- Static map image (not iframe)
- "Departs from Paseo del Mar Jetty, Zamboanga City"
- Link: "Open in Google Maps"

**Cancellation Policy:**
- Clean, plain-language box
- "Free cancellation up to 24 hours before your tour"

**Reviews section:**
- Rating summary: X.X ★ based on N reviews
- 3–5 individual review cards (name, date, star, text, tour)
- "See all reviews on Facebook" link with Facebook icon

**Right sidebar (sticky on desktop):**
- Price display: "From ₱X / person"
- Pricing tiers if applicable (Joiners vs Private)
- Date selector (calendar)
- Group size selector (stepper: - / N / +)
- Total price calculation
- "Check Availability" button (pink, full width, large)
- OR "Reserve My Spot" if date is selected
- Below button:
  - 🔒 Secure booking
  - ✅ Free cancellation
  - 💬 Reply within 24hrs
- "Have questions? Message us" — Messenger + WhatsApp icons

**Mobile:** Sticky bottom bar throughout the page
- Left: "From ₱X / person"
- Right: "Check Availability" button (pink)

#### E. Related Tours
- Section: "You Might Also Like"
- 2–3 tour cards (same card design)

---

### PAGE 4: BOOKING FLOW (/book/[slug])

**Goal:** Complete a booking in 3 steps with zero friction and full trust.

**Design requirements:**
- Clean, minimal — no distractions
- Step progress indicator at top: ① Tour Details → ② Your Info → ③ Confirm
- Mobile single-column only
- Trust signals adjacent to every CTA

#### Step 1: Tour Details
- Tour summary card: image thumbnail, name, date, group size, price
- Date picker (calendar, light theme, touch-friendly)
- Group size stepper (Adults / Children)
- Promo code field (collapsible: "Have a promo code?")
- Price breakdown: Base × guests + any extras = Total
- "Continue to Details" button (pink, full width)

#### Step 2: Your Information
- Fields: Full Name | Email | Phone Number | Special Requests (optional)
- Input type attributes correct (tel, email)
- Autofill-compatible
- "Back" link top left
- Booking summary sidebar/card (collapsed on mobile, expandable)
- "Confirm Booking" button (pink, full width)

#### Step 3: Confirmation Screen
- ✅ Large checkmark or celebration animation
- "Booking Received!"
- Summary: Tour | Date | Guests | Reference number
- "We'll confirm via Messenger within 24 hours."
- Big Messenger CTA button: "Open Messenger"
- WhatsApp alternative button: "Message on WhatsApp"
- "Add to Google Calendar" link
- Share button: "Tell your friends about this trip"

#### GCash Deposit Flow (if triggered)
- Full-screen overlay or dedicated page
- GCash QR code display
- Amount to pay (deposit only, not full amount)
- "I've paid — notify James/Ivy" button
- Instructions: "Send your GCash screenshot to confirm"

---

### PAGE 5: CONTACT PAGE

**Goal:** Route visitors to the right channel quickly.

**Structure:**
- 3 intent selector cards:
  - 📅 "I want to book a tour" → Messenger deep-link
  - ❓ "I have a question" → WhatsApp / Messenger
  - 🤝 "I want to partner with you" → Email form
- Each card: icon, title, description, CTA button
- Below: Phone number, email, address, Google Maps embed

---

## FLOATING ELEMENTS (SITE-WIDE)

#### Messenger Float Button
- Fixed bottom-right
- Facebook Messenger blue circle icon
- Tooltip on hover: "Chat with us"

#### WhatsApp Float Button
- Fixed bottom-right, above Messenger button
- WhatsApp green circle icon
- `https://wa.me/639052435196`

#### Sticky Book Bar (Tour Detail page — mobile only)
- Fixed at bottom of viewport
- Left: "From ₱X / person"
- Right: "Check Availability" — pink button
- Background: white with top border shadow

---

## KEY UX RULES FOR CLAUDE DESIGN

1. **Mobile first.** Design at 375px width first. Every element must work on a budget Android phone.
2. **Thumb zone.** Primary CTAs (Book, Continue, Confirm) must be in the lower half of the screen on mobile.
3. **Minimum touch targets:** 44px height on all buttons, filters, and interactive elements.
4. **No dropdowns for group size** — use a stepper (− / N / +).
5. **Filters on mobile** = bottom sheet drawer, not sidebar.
6. **Price always visible** near the CTA — never make users hunt for the price.
7. **Authentic urgency only** — "Only 400 visitors/day on Santa Cruz Island" is real. No fake countdown timers.
8. **GCash first** in any payment context — it's used by 94 million Filipinos.
9. **Messenger + WhatsApp** always accessible — persistent float buttons site-wide.
10. **Trust signals adjacent to every CTA** — lock icon, free cancellation, 24hr reply.
11. **Playfair Display for all headings** — editorial feel. Plus Jakarta Sans for all body/UI.
12. **Pink (#d96b8a) is the only accent** — used for primary buttons and section labels only. Don't dilute it.
13. **Images must show people in the experience**, not empty landscapes.
14. **No stock photos** — real vinta boats, real pink sand, real guests.

---

## WHAT MAKES LAAGAN ADVENTURE UNIQUE (USE IN DESIGN)

- **The only pink sand beach in Asia** — National Geographic Top 21 Beaches in the World
- **400 visitor/day cap** — genuine scarcity, positions the destination as exclusive
- **Stingless jellyfish lagoon** — swim with jellyfish that cannot sting you
- **Vintas** — colorful traditional Tausug outrigger sailboats, visual icon specific to Zamboanga
- **"Asia's Latin City"** — Chavacano, the only Spanish-based creole in Asia
- **Sama-Bangingi community guides** — responsible tourism, social impact
- **Pay on the day** — no scam risk, radical trust signal

---

## REFERENCE SITES (STUDY THESE FOR INSPIRATION)

- **Trafalgar** — editorial layout, story-led hero, tour card design
- **G Adventures** — responsible tourism narrative, real people photography
- **Intrepid Travel** — filter UI, detail page structure
- **Viator** — tour card anatomy, review integration
- **GetYourGuide** — booking flow, step progress indicator, pricing clarity
- **Airbnb Experiences** — mobile booking UX, trust signals at checkout
