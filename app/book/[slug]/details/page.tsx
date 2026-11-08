import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import PassengerDetailsForm from '@/components/PassengerDetailsForm'
import { getTourPricing, getSiteSettings } from '@/lib/db'
import { getTourBySlug } from '@/lib/tours-data'
import { getPricePerPerson, applyPromo } from '@/lib/promoCodes'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const tour = getTourBySlug(slug)
  return { title: tour ? `Passenger Details — ${tour.title}` : 'Passenger Details' }
}

export default async function BookDetailsPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ date?: string; guests?: string; promo?: string; price?: string }>
}) {
  const { slug }                           = await params
  const { date, guests: g, promo, price }  = await searchParams
  const hardcoded = getTourBySlug(slug)
  if (!hardcoded) notFound()
  const [pricing, config] = await Promise.all([
    getTourPricing(slug).catch(() => null),
    getSiteSettings().catch(() => null),
  ])
  const tour = { title: hardcoded.title, slug: { current: slug } }

  const guests         = Math.max(1, Number(g) || 2)
  const pricePerPerson = price ? Number(price) : getPricePerPerson(pricing?.pricingTiers, pricing?.price ?? 0, guests)
  const subtotal       = pricePerPerson * guests
  const { discount, finalTotal } = applyPromo(subtotal, promo ?? '')
  const depositAmount  = config?.depositAmount ?? 500

  return (
    <>
      <Nav />
      <main className="page-top" style={{ minHeight: '100vh' }}>
        <PassengerDetailsForm
          tourTitle={tour.title}
          tourSlug={tour.slug.current}
          date={date ?? ''}
          guests={guests}
          promo={promo ?? ''}
          pricePerPerson={pricePerPerson}
          totalPrice={finalTotal}
          discount={discount}
          depositAmount={depositAmount}
        />
      </main>
      <Footer />
    </>
  )
}
