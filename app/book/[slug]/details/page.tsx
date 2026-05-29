import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import PassengerDetailsForm from '@/components/PassengerDetailsForm'
import { client, TOUR_QUERY } from '@/lib/sanity'
import { getPricePerPerson, applyPromo } from '@/lib/promoCodes'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const tour = await client.fetch(TOUR_QUERY, { slug }).catch(() => null)
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
  const tour                               = await client.fetch(TOUR_QUERY, { slug }).catch(() => null)
  if (!tour) notFound()

  const guests         = Math.max(1, Number(g) || 2)
  const pricePerPerson = price ? Number(price) : getPricePerPerson(tour.pricingTiers, tour.price, guests)
  const subtotal       = pricePerPerson * guests
  const { discount, finalTotal } = applyPromo(subtotal, promo ?? '')

  return (
    <>
      <Nav />
      <main style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh' }}>
        <PassengerDetailsForm
          tourTitle={tour.title}
          tourSlug={tour.slug.current}
          date={date ?? ''}
          guests={guests}
          promo={promo ?? ''}
          pricePerPerson={pricePerPerson}
          totalPrice={finalTotal}
          discount={discount}
        />
      </main>
      <Footer />
    </>
  )
}
