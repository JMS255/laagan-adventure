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
      <main className="page-top" style={{ background: 'var(--bg-2)', minHeight: '100vh' }}>

        {/* Header */}
        <div style={{ background: 'var(--navy)', padding: '64px 0 96px', textAlign: 'center' }}>
          <div className="container" style={{ maxWidth: '600px' }}>
            <p className="section__label" style={{ textAlign: 'center' }}>Plan My Trip</p>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#fff', letterSpacing: '-.03em', lineHeight: 1.15, marginBottom: '14px', fontFamily: 'var(--font-display, Georgia), serif', fontStyle: 'italic' }}>
              Ready to See the Pink Sand?
            </h1>
            <p style={{ color: 'rgba(255,255,255,.65)', fontSize: '.95rem', lineHeight: 1.7 }}>
              Pick your tour, choose your date, and we&apos;ll confirm on Messenger within 24 hours.
            </p>
          </div>
        </div>

        {/* 3 Intent cards — overlaps header */}
        <div className="container" style={{ marginTop: '-48px', paddingBottom: '32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }} className="contact-intent-grid">

            {/* Book a tour */}
            <div style={{ background: '#fff', border: '2px solid var(--border)', borderRadius: '18px', padding: '32px 28px', display: 'flex', flexDirection: 'column', gap: '12px', transition: 'all .2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--pink)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.transform = 'none'; }}>
              <p style={{ fontSize: '2rem' }}>📅</p>
              <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--navy)' }}>Book a Tour</h2>
              <p style={{ fontSize: '.85rem', color: 'var(--text-muted)', lineHeight: 1.65, flex: 1 }}>Browse our packages and reserve your spot — confirmed via Messenger.</p>
              <a href="/tours" className="btn btn--primary btn--sm" style={{ alignSelf: 'flex-start' }}>Browse Tours →</a>
            </div>

            {/* Ask a question */}
            <div style={{ background: '#fff', border: '2px solid var(--border)', borderRadius: '18px', padding: '32px 28px', display: 'flex', flexDirection: 'column', gap: '12px', transition: 'all .2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--pink)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.transform = 'none'; }}>
              <p style={{ fontSize: '2rem' }}>❓</p>
              <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--navy)' }}>Ask a Question</h2>
              <p style={{ fontSize: '.85rem', color: 'var(--text-muted)', lineHeight: 1.65, flex: 1 }}>Not sure where to start? Message us — real people, fast replies.</p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <a href="https://m.me/61562040673545" target="_blank" rel="noopener noreferrer" className="btn btn--sm" style={{ background: '#0084ff', color: '#fff', borderRadius: '999px', alignSelf: 'flex-start' }}>💬 Messenger</a>
                <a href="https://wa.me/639052435196" target="_blank" rel="noopener noreferrer" className="btn btn--sm" style={{ background: '#25d366', color: '#fff', borderRadius: '999px', alignSelf: 'flex-start' }}>WhatsApp</a>
              </div>
            </div>

            {/* Partner */}
            <div style={{ background: '#fff', border: '2px solid var(--border)', borderRadius: '18px', padding: '32px 28px', display: 'flex', flexDirection: 'column', gap: '12px', transition: 'all .2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--pink)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.transform = 'none'; }}>
              <p style={{ fontSize: '2rem' }}>🤝</p>
              <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--navy)' }}>Partner With Us</h2>
              <p style={{ fontSize: '.85rem', color: 'var(--text-muted)', lineHeight: 1.65, flex: 1 }}>Hotels, agencies, or schools — let&apos;s build something together.</p>
              <a href="mailto:laaganadventure@gmail.com" className="btn btn--outline btn--sm" style={{ alignSelf: 'flex-start' }}>Send Email →</a>
            </div>

          </div>
        </div>

        {/* Builder card */}
        <div className="container" style={{ paddingBottom: '64px' }}>
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
