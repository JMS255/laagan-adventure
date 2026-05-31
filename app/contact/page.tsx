import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import TripBuilder from '@/components/TripBuilder'
import { client, SITE_CONFIG_QUERY } from '@/lib/sanity'
import { PRICING_FALLBACK } from '@/lib/spots'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Plan My Trip — Laagan Adventure',
  description: 'Build your perfect Zamboanga tour. Pick your destination, group size, and stops — we\'ll confirm everything on Messenger.',
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ tour?: string }>
}) {
  const { tour } = await searchParams

  const config = await client.fetch(SITE_CONFIG_QUERY).catch(() => null)
  const pricing = {
    small: { label: '2–5 pax', price: config?.tripSmallGroupPrice ?? PRICING_FALLBACK.small.price },
    large: { label: '6+ pax',  price: config?.tripLargeGroupPrice ?? PRICING_FALLBACK.large.price },
  }

  return (
    <>
      <Nav />
      <main style={{ paddingTop: 'var(--nav-h)', background: 'var(--bg-2)', minHeight: '100vh' }}>

        {/* Header */}
        <div style={{ background: 'var(--navy)', padding: '72px 0 100px', textAlign: 'center' }}>
          <div className="container" style={{ maxWidth: '600px' }}>
            <p className="section__label">Laagan Adventure · Zamboanga City</p>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#fff', letterSpacing: '-.03em', lineHeight: 1.15, marginBottom: '14px' }}>
              Plan your perfect<br />
              <span style={{ color: 'var(--pink)', fontStyle: 'italic' }}>Zamboanga adventure.</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,.6)', fontSize: '.95rem', lineHeight: 1.7 }}>
              Pick your destination, choose your stops, set your date.<br />
              We&apos;ll confirm everything on Messenger.
            </p>
          </div>
        </div>

        {/* Builder card — overlaps header */}
        <div className="container" style={{ marginTop: '-56px', paddingBottom: '64px' }}>
          <div style={{
            background: '#fff',
            borderRadius: '28px',
            padding: '52px 40px',
            boxShadow: '0 12px 60px rgba(0,40,70,.12)',
            border: '1px solid var(--border)',
          }}>
            <TripBuilder pricing={pricing} initialTour={tour} />
          </div>
        </div>

      </main>
      <Footer />
    </>
  )
}
