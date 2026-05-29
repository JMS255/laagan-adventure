import Link from 'next/link'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { client, urlFor, TOUR_QUERY, TOURS_QUERY } from '@/lib/sanity'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  const tours = await client.fetch(TOURS_QUERY)
  return tours.map((t: { slug: { current: string } }) => ({ slug: t.slug.current }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const tour = await client.fetch(TOUR_QUERY, { slug })
  if (!tour) return {}
  return {
    title: tour.title,
    description: tour.tagline || tour.description,
  }
}

export default async function TourDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const tour = await client.fetch(TOUR_QUERY, { slug })
  if (!tour) notFound()

  return (
    <>
      <Nav />
      <main style={{ paddingTop: 'var(--nav-h)' }}>

        {/* Hero Image */}
        <div style={{ height: '420px', background: 'var(--navy)', overflow: 'hidden', position: 'relative' }}>
          {tour.mainImage && (
            <img src={urlFor(tour.mainImage).width(1200).height(500).url()} alt={tour.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: .75 }} />
          )}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,39,68,.85) 0%, transparent 60%)' }} />
          <div className="container" style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', width: '100%' }}>
            <p style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--pink)', marginBottom: '8px' }}>
              {tour.destination || 'Zamboanga City'}
            </p>
            <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 800, color: '#fff', letterSpacing: '-.03em', lineHeight: 1.15 }}>
              {tour.title}
            </h1>
          </div>
        </div>

        {/* Content */}
        <section className="section">
          <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '56px', alignItems: 'start' }}>

            {/* Left */}
            <div>
              <Link href="/tours" style={{ fontSize: '.78rem', fontWeight: 600, color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '32px', textDecoration: 'none' }}>
                ← All Tours
              </Link>

              {tour.tagline && (
                <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '32px', fontStyle: 'italic' }}>{tour.tagline}</p>
              )}

              {tour.description && (
                <div style={{ marginBottom: '40px' }}>
                  <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '12px' }}>About this tour</h2>
                  <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>{tour.description}</p>
                </div>
              )}

              {/* Itinerary */}
              {tour.itinerary?.length > 0 && (
                <div style={{ marginBottom: '40px' }}>
                  <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '20px' }}>Itinerary</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {tour.itinerary.map((item: { time: string; activity: string }, i: number) => (
                      <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', padding: '14px 16px', background: 'var(--bg-2)', borderRadius: 'var(--r)', border: '1px solid var(--border)' }}>
                        <span style={{ fontSize: '.75rem', fontWeight: 700, color: 'var(--pink)', background: 'rgba(217,107,138,.1)', padding: '4px 10px', borderRadius: '999px', whiteSpace: 'nowrap', flexShrink: 0 }}>{item.time}</span>
                        <span style={{ fontSize: '.88rem', color: 'var(--text)', lineHeight: 1.5 }}>{item.activity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Inclusions / Exclusions */}
              {(tour.inclusions?.length > 0 || tour.exclusions?.length > 0) && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                  {tour.inclusions?.length > 0 && (
                    <div>
                      <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '14px' }}>✅ Inclusions</h2>
                      <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', listStyle: 'none' }}>
                        {tour.inclusions.map((item: string) => (
                          <li key={item} style={{ fontSize: '.85rem', color: 'var(--text-muted)', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                            <span style={{ color: '#16a34a', flexShrink: 0 }}>✓</span> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {tour.exclusions?.length > 0 && (
                    <div>
                      <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '14px' }}>❌ Exclusions</h2>
                      <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', listStyle: 'none' }}>
                        {tour.exclusions.map((item: string) => (
                          <li key={item} style={{ fontSize: '.85rem', color: 'var(--text-muted)', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                            <span style={{ color: '#dc2626', flexShrink: 0 }}>✕</span> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Photo gallery */}
              {tour.photos?.length > 0 && (
                <div style={{ marginTop: '40px' }}>
                  <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '16px' }}>More Photos</h2>
                  <div className="gallery-grid">
                    {tour.photos.map((photo: object, i: number) => (
                      <div key={i} className="gallery-item">
                        <img src={urlFor(photo).width(400).height(300).url()} alt={`${tour.title} photo ${i + 1}`} loading="lazy" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Booking Card */}
            <div style={{ position: 'sticky', top: 'calc(var(--nav-h) + 24px)', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--rl)', padding: '28px', boxShadow: '0 8px 32px rgba(26,39,68,.08)' }}>
              <p style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--pink)', marginBottom: '8px' }}>
                {tour.duration || 'Full Day Tour'}
              </p>
              <p style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--navy)', letterSpacing: '-.03em', marginBottom: '4px' }}>
                ₱{tour.price?.toLocaleString()}
              </p>
              {tour.priceNote && (
                <p style={{ fontSize: '.78rem', color: 'var(--text-muted)', marginBottom: '24px' }}>{tour.priceNote}</p>
              )}
              <Link
                href={`/contact?tour=${encodeURIComponent(tour.title)}`}
                className="btn btn--primary"
                style={{ width: '100%', justifyContent: 'center', marginBottom: '12px' }}
              >
                Book This Tour →
              </Link>
              <a
                href="https://m.me/61562040673545"
                target="_blank" rel="noopener noreferrer"
                className="btn btn--outline"
                style={{ width: '100%', justifyContent: 'center', fontSize: '.8rem' }}
              >
                Ask a Question
              </a>
              <p style={{ fontSize: '.72rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '14px' }}>
                No payment required to inquire · Reply within 24 hours
              </p>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
