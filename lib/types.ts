/**
 * Central type definitions for Laagan Adventure.
 * Import from here instead of defining inline types in components.
 *
 * When a field changes, update it here — all components that import
 * the type will get the fix automatically.
 */

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

export interface FAQItem {
  question: string
  answer: string
}

/** Full tour — used on tour detail page */
/** Lightweight tour — used in cards, grids, carousels */
export interface TourCard {
  _id: string
  title: string
  slug: { current: string }
  tagline?: string
  price?: number
  priceNote?: string
  duration?: string
  destination?: string
  featured?: boolean
  audience?: ('solo' | 'couple' | 'barkada' | 'family')[]
  badgeLabel?: string
  urgencyNote?: string
  availableDates?: string[]
}

// ── Booking ───────────────────────────────────────────────────────
export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled'

/** Steps the team ticks off for each booking */
export interface BookingChecklist {
  replied: boolean
  depositReceived: boolean
  dateSecured: boolean
  boatBooked: boolean
  guideAssigned: boolean
  reminderSent: boolean
  tourDone: boolean
}

export interface Booking {
  _id: string
  bookingRef: string
  status: BookingStatus
  tourSlug?: string
  notes?: string
  promo?: string
  assignedTo?: string
  checklist?: Partial<BookingChecklist>
  internalNotes?: string
  updatedAt?: string
  updatedBy?: string
  tourTitle: string
  date: string
  guests: number
  name: string
  phone: string
  email?: string
  totalPrice: number
  depositDue?: number
  depositSent: boolean
  submittedAt: string
}

/** Gallery photo stored in the database; `src` is a file under /public */
export interface GalleryItem {
  id: string
  src: string
  caption?: string
  destination?: string
  order: number
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
