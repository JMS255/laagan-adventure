import 'server-only'
import { getDb } from '@/lib/firebase-admin'
import type { Booking, GalleryItem, PricingTier, TourCard } from '@/lib/types'

/** Price/availability info for a tour, shaped like the old Sanity tour cards so pages need few changes. */
export type TourPricing = TourCard & { pricingTiers: PricingTier[]; availabilityNote?: string }

export interface SiteSettings {
  depositAmount: number
}

export interface NewBooking {
  bookingRef: string
  tourTitle: string
  tourSlug: string
  date: string
  guests: number
  name: string
  phone: string
  email: string
  totalPrice: number
  depositSent: boolean
  promo: string
  notes: string
}

const DEFAULT_DEPOSIT = 500

const refToId = (ref: string): string => ref.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

function toTourPricing(data: FirebaseFirestore.DocumentData): TourPricing {
  return {
    _id: data.slug,
    title: data.title,
    slug: { current: data.slug },
    price: data.price,
    priceNote: data.priceNote,
    badgeLabel: data.badgeLabel,
    urgencyNote: data.urgencyNote,
    availabilityNote: data.availabilityNote,
    availableDates: data.availableDates ?? [],
    featured: data.featured ?? false,
    pricingTiers: data.pricingTiers ?? [],
  }
}

export async function getTourPricing(slug: string): Promise<TourPricing | null> {
  const snap = await getDb().collection('tours').doc(slug).get()
  return snap.exists ? toTourPricing(snap.data() ?? {}) : null
}

export async function getAllTourPricing(): Promise<TourPricing[]> {
  const snap = await getDb().collection('tours').get()
  return snap.docs.map(d => toTourPricing(d.data()))
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const snap = await getDb().collection('settings').doc('site').get()
  return { depositAmount: snap.data()?.depositAmount ?? DEFAULT_DEPOSIT }
}

export async function getGallery(): Promise<GalleryItem[]> {
  const snap = await getDb().collection('gallery').orderBy('order').get()
  return snap.docs.map(d => ({ id: d.id, ...(d.data() as Omit<GalleryItem, 'id'>) }))
}

export async function listBookings(): Promise<Booking[]> {
  const snap = await getDb().collection('bookings').orderBy('submittedAt', 'desc').get()
  return snap.docs.map(d => ({ _id: d.id, ...(d.data() as Omit<Booking, '_id'>) }))
}

export async function saveBooking(booking: NewBooking): Promise<void> {
  await getDb().collection('bookings').doc(refToId(booking.bookingRef)).set({
    ...booking,
    status: 'pending',
    submittedAt: new Date().toISOString(),
  })
}

/** Called by the payment webhook once a deposit is paid. */
export async function markBookingPaid(bookingRef: string): Promise<void> {
  await getDb().collection('bookings').doc(refToId(bookingRef)).set(
    { depositSent: true, status: 'confirmed' },
    { merge: true },
  )
}
