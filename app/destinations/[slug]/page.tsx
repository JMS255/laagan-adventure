export const revalidate = 60

import Link from 'next/link'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { client, urlFor, TOURS_BY_DESTINATION_QUERY, TESTIMONIALS_QUERY } from '@/lib/sanity'
import { DESTINATIONS, getDestination } from '@/lib/destinations'
import type { Metadata } from 'next'
import type { TourCard, Testimonial } from '@/lib/types'

export async function generateStaticParams() {
  return DESTINATIONS.map(d => ({ slug: d.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const dest = getDestination(slug)
  if (!dest) return {}
  return { title: `${dest.name} Tours — Laagan Adventure`, description: dest.description.slice(0, 155) }
}

export default async function DestinationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const dest = getDestination(slug)
  if (!dest) notFound()

  const [tours, testimonials] = await Promise.all([
    client.fetch(TOURS_BY_DESTINATION_QUERY, { destination: dest.destinationTag }).catch(() => []),
    client.fetch(TESTIMONIALS_QUERY).catch(() => []),
  ])

  return (
    <>
      <Nav />
      <main>

        {/* ── HERO ── */}
        <section style={{ minHeight: '480px', background: dest.heroGradient, display: 'flex', alignItems: 'flex-end', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,15,40,.9) 0%, rgba(0,15,40,.3) 55%, transparent 100%)' }} />
          <div className="container" style={{ position: 'relative', paddingTop: 'calc(var(--nav-h) + 48px)', paddingBottom: '56px' }}>
            <Link href="/" style={{ fontSize: '.75rem', fontWeight: 600, color: 'rgba(255,255,255,.6)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '20px' }}>
              ← Back to Home
            </Link>
            <p style={{ fontSize: '.65rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--pink)', marginBottom: '12px' }}>
              Zamboanga Region · Philippines
            </p>
            <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 800, color: '#fff', letterSpacing: '-.02em', lineHeight: 1.08, marginBottom: '16px' }}>
              {dest.name}
            </h1>
            <p style={{ fontSize: 'clamp(.95rem, 1.8vw, 1.1rem)', color: 'rgba(255,255,255,.75)', lineHeight: 1.7, maxWidth: '560px', marginBottom: '32px' }}>
              {dest.tagline}
            </p>
            <a href="#tours" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '.82rem', fontWeight: 700, color: '#fff', background: 'var(--pink)', padding: '12px 24px', borderRadius: '999px', textDecoration: 'none', transition: 'background .2s' }}>
              See Available Tours ↓
            </a>
          </div>
        </section>

        {/* ── AVAILABLE TOURS ── */}
        <section id="tours" style={{ padding: '80px 0', background: '#fff', scrollMarginTop: 'var(--nav-h)' }}>
          <div className="container">
            <p className="section__label">Book your adventure</p>
            <h2 className="section__title" style={{ marginBottom: '8px' }}>Tours to {dest.name}</h2>
            <p style={{ fontSize: '.9rem', color: 'var(--text-muted)', marginBottom: '48px', maxWidth: '520px', lineHeight: 1.7 }}>
              Every tour is fully guided, includes all permits, and requires no upfront payment.
            </p>

            {(tours as TourCard[]).length > 0 ? (
              <div className="tours-grid">
                {(tours as TourCard[]).map(t => (
                  <Link href={`/tours/${t.slug.current}`} className="tour-card" key={t._id}>
                    <div className="tour-card__img">
                      {t.mainImage
                        ? <img src={urlFor(t.mainImage).width(600).height(450).url()} alt={t.title} />
                        : <div style={{ width: '100%', height: '100%', background: dest.heroGradient }} />
                      }
                    </div>
                    <div className="tour-card__body">
                      <p className="tour-card__tag">{t.destination || dest.name}</p>
                      <h3 className="tour-card__title">{t.title}</h3>
                      <p className="tour-card__desc">{t.tagline}</p>
                      <div className="tour-card__footer">
                        <div>
                          <p className="tour-card__price">₱{t.price?.toLocaleString()}</p>
                          <p className="tour-card__price-note">{t.priceNote}</p>
                        </div>
                        <span className="tour-card__cta">View Tour →</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '56px 32px', background: 'var(--bg-2)', borderRadius: 'var(--rl)', border: '1px solid var(--border)' }}>
                <p style={{ fontSize: '2rem', marginBottom: '12px' }}>🗺️</p>
                <p style={{ fontWeight: 700, color: 'var(--navy)', marginBottom: '8px' }}>Tours coming soon</p>
                <p style={{ fontSize: '.85rem', color: 'var(--text-muted)', marginBottom: '24px' }}>We&apos;re adding tours to {dest.name}. Message us to inquire.</p>
                <a href="https://m.me/61562040673545" target="_blank" rel="noopener noreferrer" className="btn btn--primary">
                  💬 Ask on Messenger
                </a>
              </div>
            )}
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section style={{ padding: '80px 0', background: 'var(--bg-2)' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'start' }} className="story-grid">
              <div>
                <p className="section__label">About this destination</p>
                <h2 className="section__title" style={{ marginBottom: '20px' }}>Why {dest.name}?</h2>
                <p style={{ fontSize: '.95rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '32px' }}>{dest.description}</p>
                <Link href={`/contact?tour=${encodeURIComponent(dest.name)}`} className="btn btn--primary">
                  Plan My Trip Here →
                </Link>
              </div>
              <div>
                <h3 style={{ fontSize: '.75rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: '20px' }}>
                  Why travelers love it
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {dest.highlights.map((h, i) => (
                    <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', fontSize: '.88rem', color: 'var(--text)', lineHeight: 1.6 }}>
                      <span style={{ color: 'var(--pink)', fontWeight: 700, flexShrink: 0, marginTop: '2px' }}>✓</span>
                      {h}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── THINGS TO DO ── */}
        <section style={{ padding: '80px 0', background: '#fff' }}>
          <div className="container">
            <p className="section__label">Experiences</p>
            <h2 className="section__title" style={{ marginBottom: '48px' }}>Top things to do in {dest.name}</h2>
            <div className="why-grid">
              {dest.thingsToDo.map((t, i) => (
                <div key={i} className="why-card">
                  <p className="why-card__icon">{t.icon}</p>
                  <h3 className="why-card__title">{t.title}</h3>
                  <p className="why-card__desc">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BEST TIME + WEATHER ── */}
        <section style={{ padding: '80px 0', background: 'var(--bg-2)' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', maxWidth: '800px' }} className="trust-grid">
              <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--rl)', padding: '32px' }}>
                <p style={{ fontSize: '2rem', marginBottom: '14px' }}>📅</p>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '8px' }}>Best time to visit</h3>
                <p style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--pink)', marginBottom: '10px' }}>{dest.bestTime}</p>
                <p style={{ fontSize: '.85rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>{dest.weatherNote}</p>
              </div>
              <div style={{ background: 'var(--navy)', borderRadius: 'var(--rl)', padding: '32px' }}>
                <p style={{ fontSize: '2rem', marginBottom: '14px' }}>🧳</p>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>Ready to go?</h3>
                <p style={{ fontSize: '.85rem', color: 'rgba(255,255,255,.65)', lineHeight: 1.7, marginBottom: '20px' }}>
                  No upfront payment. No booking fees. Just message us and we&apos;ll plan everything.
                </p>
                <Link href={`/contact?tour=${encodeURIComponent(dest.name)}`} className="btn btn--primary" style={{ fontSize: '.82rem' }}>
                  Start Planning →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── REVIEWS ── */}
        {(testimonials as Testimonial[]).length > 0 && (
          <section style={{ padding: '80px 0', background: '#fff' }}>
            <div className="container">
              <p className="section__label">What travelers say</p>
              <h2 className="section__title" style={{ marginBottom: '40px' }}>Real words from real travelers</h2>
              <div className="reviews-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                {(testimonials as Testimonial[]).slice(0, 3).map(t => (
                  <div key={t._id} className="tcard">
                    <div className="tcard__stars">{'★'.repeat(t.rating ?? 5)}</div>
                    <p className="tcard__quote">&ldquo;{t.review}&rdquo;</p>
                    <div className="tcard__author">
                      <div className="tcard__avatar">{t.name?.[0]}</div>
                      <div>
                        <p className="tcard__name">{t.name}</p>
                        {t.tour && <p className="tcard__role">{t.tour}</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── BOTTOM CTA ── */}
        <section style={{ background: 'var(--navy)', padding: '96px 0' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--pink)', marginBottom: '16px' }}>
              Ready to explore?
            </p>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#fff', letterSpacing: '-.02em', lineHeight: 1.15, marginBottom: '20px', maxWidth: '560px', margin: '0 auto 20px', fontStyle: 'italic' }}>
              Your {dest.name} adventure starts with one message.
            </h2>
            <p style={{ color: 'rgba(255,255,255,.65)', marginBottom: '40px', maxWidth: '420px', margin: '0 auto 40px', lineHeight: 1.7 }}>
              No booking fees. No upfront payment. Tell us what you&apos;re looking for and we&apos;ll plan the perfect trip.
            </p>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href={`/contact?tour=${encodeURIComponent(dest.name)}`} className="btn btn--primary" style={{ fontSize: '.9rem', padding: '16px 36px' }}>
                Plan My Trip →
              </Link>
              <a href="https://m.me/61562040673545" target="_blank" rel="noopener noreferrer" className="btn btn--outline-light">
                Message on Messenger
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
