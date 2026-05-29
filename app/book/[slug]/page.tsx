import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import BookingOverview from '@/components/BookingOverview'
import { client, TOUR_QUERY } from '@/lib/sanity'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const tour = await client.fetch(TOUR_QUERY, { slug }).catch(() => null)
  return { title: tour ? `Book — ${tour.title}` : 'Book a Tour' }
}

export default async function BookPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ date?: string; guests?: string }>
}) {
  const { slug }          = await params
  const { date, guests }  = await searchParams
  const tour              = await client.fetch(TOUR_QUERY, { slug }).catch(() => null)
  if (!tour) notFound()

  return (
    <>
      <Nav />
      <main style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh' }}>
        <BookingOverview
          tour={tour}
          initialDate={date ?? ''}
          initialGuests={Number(guests) || 2}
        />
      </main>
      <Footer />
    </>
  )
}
