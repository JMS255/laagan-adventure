/**
 * Central type definitions for Laagan Adventure.
 * Import from here instead of defining inline types in components.
 *
 * When a Sanity schema field changes, update it here — all components
 * that import this type will get the fix automatically.
 */

// ── Sanity image reference ─────────────────────────────────────────
export interface SanityImage {
  _type: 'image'
  asset: { _ref: string; _type: 'reference' }
  hotspot?: { x: number; y: number; height: number; width: number }
}

// ── Tour ──────────────────────────────────────────────────────────
export interface PricingTier {
  label: string
  minPax: number
  maxPax: number
  pricePerPerson: number
}

export interface ItineraryItem {
  time: string
  activity: string
}

export interface DayItem {
  _key: string
  dayLabel: string
  title: string
  description: string
  highlights: string[]
  photo?: SanityImage
}

export interface FAQItem {
  question: string
  answer: string
}

/** Full tour — used on tour detail page */
export interface Tour {
  _id: string
  title: string
  slug: { current: string }
  tagline?: string
  description?: string
  mainImage?: SanityImage
  photos?: SanityImage[]
  duration?: string
  destination?: string
  price?: number
  priceNote?: string
  inclusions?: string[]
  exclusions?: string[]
  itinerary?: ItineraryItem[]
  dayItinerary?: DayItem[]
  pricingTiers?: PricingTier[]
  availabilityNote?: string
  mapQuery?: string
  faq?: FAQItem[]
  featured?: boolean
}

/** Lightweight tour — used in cards, grids, carousels */
export interface TourCard {
  _id: string
  title: string
  slug: { current: string }
  tagline?: string
  mainImage?: SanityImage
  price?: number
  priceNote?: string
  duration?: string
  destination?: string
  featured?: boolean
  audience?: ('solo' | 'couple' | 'barkada' | 'family')[]
  badgeLabel?: string
  urgencyNote?: string
}

// ── Testimonial ───────────────────────────────────────────────────
export interface Testimonial {
  _id: string
  name: string
  tour?: string
  review: string
  rating: number
  photo?: SanityImage
  date?: string
}

// ── Gallery photo ─────────────────────────────────────────────────
export interface GalleryPhoto {
  _id: string
  image: SanityImage
  caption?: string
  destination: string
}

// ── Blog post ─────────────────────────────────────────────────────
export interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  mainImage?: SanityImage
  publishedAt?: string
  tags?: string[]
  body?: object[]
}

// ── Booking / promo ───────────────────────────────────────────────
export interface PromoResult {
  valid: boolean
  label: string
  discount: number
  finalTotal: number
}

// ── Nav tab ───────────────────────────────────────────────────────
export interface NavTab {
  id: string
  label: string
}
