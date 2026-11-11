import { notFound } from 'next/navigation'
import BookingOverview from '@/components/BookingOverview'
import { getSiteSettings, getTourPricing } from '@/lib/db'
import { DEFAULT_DEPOSIT_RULE } from '@/lib/deposit'
import { getTourBySlug } from '@/lib/tours-data'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const title = getTourBySlug(slug)?.title
  return { title: title ? `Book — ${title}` : 'Book a Tour' }
}

export default async function BookPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ date?: string; guests?: string }>
}) {
  const { slug }         = await params
  const { date, guests } = await searchParams

  const hardcoded = getTourBySlug(slug)
  if (!hardcoded) notFound()
  const pricing = await getTourPricing(slug).catch(() => null)
  const { depositRule } = await getSiteSettings().catch(() => ({ depositRule: DEFAULT_DEPOSIT_RULE }))

  const tour = {
    _id: slug,
    title: hardcoded.title,
    slug: { current: slug },
    destination: hardcoded.destination,
    duration: hardcoded.duration,
    price: pricing?.price,
    priceNote: pricing?.priceNote ?? 'per person',
    pricingTiers: pricing?.pricingTiers,
  }

  return (
    <BookingOverview
      tour={tour}
      thumbUrl={hardcoded.mainImage}
      depositRule={depositRule}
      initialDate={date ?? ''}
      initialGuests={Number(guests) || 2}
    />
  )
}
