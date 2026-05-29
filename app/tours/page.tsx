export const revalidate = 60

import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ScrollReveal from '@/components/ScrollReveal'
import { client, urlFor, TOURS_QUERY } from '@/lib/sanity'
import type { TourCard } from '@/lib/types'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tours & Packages',
  description: 'Explore our tour packages in Zamboanga City. Santa Cruz Island, city tours, island hopping and more.',
}

export default async function ToursPage() {
  const tours = await client.fetch(TOURS_QUERY).catch(() => [])

  return (
    <>
      <Nav />
      <main style={{ paddingTop: 'var(--nav-h)' }}>

        {/* Header */}
        <div style={{ background: 'var(--navy)', padding: '64px 0 56px' }}>
          <div className="container">
            <p className="section__label">Packages</p>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#fff', letterSpacing: '-.03em', marginBottom: '12px' }}>
              Tours & Packages
            </h1>
            <p style={{ color: 'rgba(255,255,255,.7)', fontSize: '1rem', lineHeight: 1.7, maxWidth: '520px' }}>
              Every tour is guided by locals who know Zamboanga City best. Pick your adventure below.
            </p>
          </div>
        </div>

        {/* Tours Grid */}
        <section className="section">
          <div className="container">
            {tours.length > 0 ? (
              <div className="tours-grid">
                {tours.map((tour: TourCard, i: number) => (
                  <ScrollReveal key={tour._id} delay={i * 0.08}>
                  <Link href={`/tours/${tour.slug.current}`} className="tour-card" style={{ height: '100%' }}>
                    <div className="tour-card__img">
                      {tour.mainImage && (
                        <img src={urlFor(tour.mainImage).width(600).height(450).url()} alt={tour.title} />
                      )}
                    </div>
                    <div className="tour-card__body">
                      <p className="tour-card__tag">{tour.destination || 'Zamboanga City'}</p>
                      <h3 className="tour-card__title">{tour.title}</h3>
                      <p className="tour-card__desc">{tour.tagline}</p>
                      <div className="tour-card__footer">
                        <div>
                          <p className="tour-card__price">₱{tour.price?.toLocaleString()}</p>
                          <p className="tour-card__price-note">{tour.priceNote}</p>
                        </div>
                        <span className="tour-card__cta">View details →</span>
                      </div>
                    </div>
                  </Link>
                  </ScrollReveal>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '96px', background: 'var(--bg-2)', borderRadius: 'var(--rl)', border: '1px solid var(--border)' }}>
                <p style={{ fontSize: '3rem', marginBottom: '16px' }}>🏝️</p>
                <p style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '1.1rem', marginBottom: '8px' }}>Tours coming soon</p>
                <p style={{ color: 'var(--text-muted)' }}>Add packages in the Sanity studio at /studio</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="section section--alt">
          <div className="container" style={{ textAlign: 'center' }}>
            <h2 className="section__title">Can&rsquo;t find what you&rsquo;re looking for?</h2>
            <p className="section__sub" style={{ margin: '0 auto 32px' }}>We offer custom tours for groups. Message us and we&rsquo;ll build the perfect itinerary.</p>
            <Link href="/contact" className="btn btn--primary">Inquire for Custom Tour →</Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
