export const revalidate = 60

import Link from 'next/link'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import TourTabs from '@/components/TourTabs'
import FAQAccordion from '@/components/FAQAccordion'
import QuickInquiryButton from '@/components/QuickInquiryButton'
import { client, urlFor, TOUR_QUERY, SIMILAR_TOURS_QUERY, TESTIMONIALS_QUERY } from '@/lib/sanity'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  const tours = await client.fetch(`*[_type == "tour"]{ slug }`).catch(() => [])
  return tours.map((t: { slug: { current: string } }) => ({ slug: t.slug.current }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const tour = await client.fetch(TOUR_QUERY, { slug }).catch(() => null)
  if (!tour) return {}
  return { title: tour.title, description: tour.tagline || tour.description }
}

const SCROLL_OFFSET = 'calc(var(--nav-h) + 72px)'

export default async function TourDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [tour, testimonials, similarTours] = await Promise.all([
    client.fetch(TOUR_QUERY, { slug }).catch(() => null),
    client.fetch(TESTIMONIALS_QUERY).catch(() => []),
    client.fetch(SIMILAR_TOURS_QUERY, { slug }).catch(() => []),
  ])

  if (!tour) notFound()

  const hasInclusions = tour.inclusions?.length > 0 || tour.exclusions?.length > 0

  const tabs = [
    { id: 'about', label: 'Your Tour' },
    ...(hasInclusions ? [{ id: 'included', label: "What's Included" }] : []),
    { id: 'reviews', label: 'Reviews' },
  ]

  return (
    <>
      <Nav />
      <main style={{ paddingTop: 'var(--nav-h)' }}>

        {/* ── HERO ── */}
        <div style={{ height: '480px', background: 'var(--navy-2)', overflow: 'hidden', position: 'relative' }}>
          {tour.mainImage && (
            <img
              src={urlFor(tour.mainImage).width(1400).height(600).url()}
              alt={tour.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: .6 }}
            />
          )}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(0,25,45,.95) 0%, rgba(0,25,45,.35) 55%, transparent 100%)',
          }} />
          <div className="container" style={{
            position: 'absolute', bottom: '44px',
            left: '50%', transform: 'translateX(-50%)', width: '100%',
          }}>
            {tour.destination && (
              <span style={{
                display: 'inline-block',
                fontSize: '.65rem', fontWeight: 700, letterSpacing: '.12em',
                textTransform: 'uppercase', color: '#fff',
                background: 'var(--pink)', padding: '5px 14px', borderRadius: '999px',
                marginBottom: '14px',
              }}>
                {tour.destination}
              </span>
            )}
            <h1 style={{
              fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
              fontWeight: 800, color: '#fff',
              letterSpacing: '-.02em', lineHeight: 1.08,
              marginBottom: '16px', maxWidth: '720px',
            }}>
              {tour.title}
            </h1>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
              {tour.duration && (
                <span style={{ fontSize: '.85rem', color: 'rgba(255,255,255,.8)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  🕐 {tour.duration}
                </span>
              )}
              {tour.price && (
                <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>
                  From ₱{tour.price.toLocaleString()}
                  {tour.priceNote && (
                    <span style={{ fontSize: '.78rem', fontWeight: 400, opacity: .7 }}> · {tour.priceNote}</span>
                  )}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ── STICKY TABS ── */}
        <TourTabs tabs={tabs} />

        {/* ── MAIN CONTENT ── */}
        <div className="container">
          <div className="tour-detail-grid">

            {/* ── LEFT: CONTENT ── */}
            <div>

              {/* About */}
              <section id="about" style={{ scrollMarginTop: SCROLL_OFFSET, paddingTop: '8px' }}>
                <Link href="/tours" style={{
                  fontSize: '.78rem', fontWeight: 600, color: 'var(--text-muted)',
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  marginBottom: '28px', textDecoration: 'none',
                }}>
                  ← All Tours
                </Link>

                {tour.tagline && (
                  <p style={{
                    fontSize: '1.15rem', color: 'var(--navy)', lineHeight: 1.7,
                    marginBottom: '16px', fontStyle: 'italic', fontWeight: 500,
                  }}>
                    {tour.tagline}
                  </p>
                )}
                {tour.description && (
                  <p style={{ fontSize: '.95rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '40px' }}>
                    {tour.description}
                  </p>
                )}
              </section>

              {/* Itinerary */}
              {tour.itinerary?.length > 0 && (
                <section style={{ marginBottom: '48px', scrollMarginTop: SCROLL_OFFSET }}>
                  <h2 style={{
                    fontSize: '1.15rem', fontWeight: 700, color: 'var(--navy)',
                    marginBottom: '6px', letterSpacing: '-.01em',
                  }}>
                    Your Itinerary
                  </h2>
                  <p style={{ fontSize: '.82rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
                    What you&rsquo;ll see and do on this tour
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 24px' }}>
                    {tour.itinerary.map((item: { time: string; activity: string }, i: number) => (
                      <div key={i} style={{
                        display: 'flex', gap: '12px', alignItems: 'flex-start',
                        padding: '14px 0',
                        borderBottom: '1px solid var(--border)',
                      }}>
                        <span style={{ color: 'var(--pink)', fontSize: '.9rem', flexShrink: 0, marginTop: '2px' }}>📍</span>
                        <div>
                          {item.time && (
                            <span style={{
                              fontSize: '.68rem', fontWeight: 700, color: 'var(--pink)',
                              letterSpacing: '.06em', textTransform: 'uppercase',
                              display: 'block', marginBottom: '3px',
                            }}>
                              {item.time}
                            </span>
                          )}
                          <span style={{ fontSize: '.88rem', color: 'var(--text)', lineHeight: 1.55 }}>
                            {item.activity}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Travel Highlights (inclusions checklist) */}
              {tour.inclusions?.length > 0 && (
                <section style={{ marginBottom: '48px' }}>
                  <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '6px' }}>
                    Travel Highlights
                  </h2>
                  <p style={{ fontSize: '.82rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
                    Everything covered in your tour price
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 16px' }}>
                    {tour.inclusions.map((item: string) => (
                      <div key={item} style={{
                        display: 'flex', gap: '10px', alignItems: 'flex-start',
                        fontSize: '.88rem', color: 'var(--text)', lineHeight: 1.5,
                      }}>
                        <span style={{ color: '#16a34a', flexShrink: 0, fontSize: '1rem', marginTop: '1px' }}>✓</span>
                        {item}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Map */}
              {tour.mapQuery && (
                <section style={{ marginBottom: '48px' }}>
                  <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '6px' }}>
                    Where You&rsquo;re Going
                  </h2>
                  <p style={{ fontSize: '.82rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                    {tour.mapQuery}
                  </p>
                  <div style={{
                    borderRadius: 'var(--rl)', overflow: 'hidden',
                    border: '1px solid var(--border)', height: '380px',
                  }}>
                    <iframe
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(tour.mapQuery)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                      width="100%"
                      height="100%"
                      style={{ border: 0, display: 'block' }}
                      allowFullScreen
                      loading="lazy"
                      title={`Map for ${tour.title}`}
                    />
                  </div>
                </section>
              )}

              {/* Photo Gallery */}
              {tour.photos?.length > 0 && (
                <section style={{ marginBottom: '48px' }}>
                  <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '16px' }}>
                    More Photos
                  </h2>
                  <div className="gallery-grid">
                    {tour.photos.map((photo: object, i: number) => (
                      <div key={i} className="gallery-item">
                        <img
                          src={urlFor(photo).width(400).height(300).url()}
                          alt={`${tour.title} photo ${i + 1}`}
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* FAQ */}
              <section style={{ marginBottom: '56px' }}>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '6px' }}>
                  Frequently Asked Questions
                </h2>
                <p style={{ fontSize: '.82rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
                  Everything you need to know before booking
                </p>
                <FAQAccordion faqs={tour.faq} />
              </section>

            </div>

            {/* ── RIGHT: STICKY BOOKING CARD ── */}
            <div>
              <div style={{
                position: 'sticky',
                top: 'calc(var(--nav-h) + 72px)',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--rl)',
                padding: '28px',
                boxShadow: '0 8px 40px rgba(0,40,70,.09)',
              }}>
                {tour.duration && (
                  <p style={{
                    fontSize: '.65rem', fontWeight: 700, letterSpacing: '.12em',
                    textTransform: 'uppercase', color: 'var(--pink)', marginBottom: '8px',
                  }}>
                    {tour.duration}
                  </p>
                )}
                {tour.price ? (
                  <>
                    <p style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--navy)', letterSpacing: '-.03em', lineHeight: 1 }}>
                      ₱{tour.price.toLocaleString()}
                    </p>
                    {tour.priceNote && (
                      <p style={{ fontSize: '.78rem', color: 'var(--text-muted)', marginTop: '4px', marginBottom: '24px' }}>
                        {tour.priceNote}
                      </p>
                    )}
                  </>
                ) : (
                  <p style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '24px' }}>
                    Contact us for pricing
                  </p>
                )}

                <Link
                  href={`/contact?tour=${encodeURIComponent(tour.title)}`}
                  className="btn btn--primary"
                  style={{ width: '100%', justifyContent: 'center', marginBottom: '10px', borderRadius: '10px', fontFamily: 'inherit' }}
                >
                  Book This Tour →
                </Link>
                <QuickInquiryButton tourName={tour.title} />
                <a
                  href="https://m.me/61562040673545"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--outline"
                  style={{ width: '100%', justifyContent: 'center', fontSize: '.82rem', borderRadius: '10px', marginTop: '8px' }}
                >
                  💬 Ask on Messenger
                </a>

                <div style={{
                  marginTop: '24px', paddingTop: '20px',
                  borderTop: '1px solid var(--border)',
                  display: 'flex', flexDirection: 'column', gap: '10px',
                }}>
                  {[
                    'No upfront payment required',
                    'We reply within 24 hours',
                    'DTI Registered operator',
                  ].map(text => (
                    <div key={text} style={{
                      display: 'flex', gap: '8px', alignItems: 'flex-start',
                      fontSize: '.8rem', color: 'var(--text-muted)',
                    }}>
                      <span style={{ color: 'var(--pink)', fontWeight: 700, flexShrink: 0 }}>✓</span>
                      {text}
                    </div>
                  ))}
                </div>

                {/* Contact snippet */}
                <div style={{
                  marginTop: '20px', paddingTop: '18px',
                  borderTop: '1px solid var(--border)',
                }}>
                  <p style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '10px' }}>
                    Have questions?
                  </p>
                  {[
                    { icon: '📞', text: '0905-243-5196' },
                    { icon: '📍', text: 'Zamboanga City, PH' },
                  ].map(c => (
                    <div key={c.text} style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                      <span>{c.icon}</span> {c.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ── WHAT'S INCLUDED (full width) ── */}
        {hasInclusions && (
          <section id="included" style={{
            background: 'var(--bg-2)',
            padding: '64px 0',
            scrollMarginTop: SCROLL_OFFSET,
          }}>
            <div className="container">
              <p className="section__label">Transparency first</p>
              <h2 className="section__title" style={{ marginBottom: '40px' }}>
                What&rsquo;s included
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                {tour.inclusions?.length > 0 && (
                  <div>
                    <h3 style={{
                      fontSize: '.75rem', fontWeight: 700, letterSpacing: '.1em',
                      textTransform: 'uppercase', color: '#16a34a', marginBottom: '20px',
                    }}>
                      ✅ Included in your tour
                    </h3>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '14px', listStyle: 'none' }}>
                      {tour.inclusions.map((item: string) => (
                        <li key={item} style={{
                          display: 'flex', gap: '10px', alignItems: 'flex-start',
                          fontSize: '.88rem', color: 'var(--text)', lineHeight: 1.5,
                        }}>
                          <span style={{ color: '#16a34a', flexShrink: 0 }}>✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {tour.exclusions?.length > 0 && (
                  <div>
                    <h3 style={{
                      fontSize: '.75rem', fontWeight: 700, letterSpacing: '.1em',
                      textTransform: 'uppercase', color: '#dc2626', marginBottom: '20px',
                    }}>
                      ❌ Not included
                    </h3>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '14px', listStyle: 'none' }}>
                      {tour.exclusions.map((item: string) => (
                        <li key={item} style={{
                          display: 'flex', gap: '10px', alignItems: 'flex-start',
                          fontSize: '.88rem', color: 'var(--text)', lineHeight: 1.5,
                        }}>
                          <span style={{ color: '#dc2626', flexShrink: 0 }}>✕</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ── REVIEWS (full width) ── */}
        <section id="reviews" style={{ padding: '64px 0', scrollMarginTop: SCROLL_OFFSET }}>
          <div className="container">
            <p className="section__label">What travelers say</p>
            <h2 className="section__title" style={{ marginBottom: '40px' }}>
              Real reviews, real travelers
            </h2>
            {testimonials.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                {testimonials.slice(0, 3).map((t: {
                  _id: string; name: string; tour: string; review: string; rating: number
                }) => (
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
            ) : (
              <div style={{
                textAlign: 'center', padding: '56px',
                background: 'var(--bg-2)', borderRadius: 'var(--rl)',
                border: '1px solid var(--border)',
              }}>
                <p style={{ fontSize: '2rem', marginBottom: '12px' }}>⭐</p>
                <p style={{ fontWeight: 700, color: 'var(--navy)', marginBottom: '8px' }}>No reviews yet</p>
                <p style={{ fontSize: '.85rem', color: 'var(--text-muted)' }}>Be the first to experience this tour and share your story.</p>
              </div>
            )}
          </div>
        </section>

        {/* ── SIMILAR TOURS ── */}
        {similarTours.length > 0 && (
          <section style={{ padding: '64px 0', background: 'var(--bg-2)' }}>
            <div className="container">
              <p className="section__label">You may also like</p>
              <h2 className="section__title" style={{ marginBottom: '40px' }}>Similar tours</h2>
              <div className="tours-grid">
                {similarTours.map((t: {
                  _id: string; title: string; slug: { current: string };
                  tagline: string; mainImage: object; price: number;
                  priceNote: string; duration: string; destination: string;
                }) => (
                  <Link href={`/tours/${t.slug.current}`} className="tour-card" key={t._id}>
                    <div className="tour-card__img">
                      {t.mainImage ? (
                        <img src={urlFor(t.mainImage).width(600).height(450).url()} alt={t.title} />
                      ) : (
                        <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, var(--navy-2), var(--navy))' }} />
                      )}
                    </div>
                    <div className="tour-card__body">
                      <p className="tour-card__tag">{t.destination || 'Zamboanga City'}</p>
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
            </div>
          </section>
        )}

        {/* ── BOTTOM CTA ── */}
        <section style={{ background: 'var(--navy)', padding: '80px 0' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--pink)', marginBottom: '16px' }}>
              Ready to go?
            </p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, color: '#fff', letterSpacing: '-.02em', lineHeight: 1.15, marginBottom: '16px', fontStyle: 'italic' }}>
              Book {tour.title} today.
            </h2>
            <p style={{ color: 'rgba(255,255,255,.65)', marginBottom: '36px', maxWidth: '420px', margin: '0 auto 36px', lineHeight: 1.7, fontSize: '.92rem' }}>
              No upfront payment. No booking fees. Just message us and we&rsquo;ll take care of everything.
            </p>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href={`/contact?tour=${encodeURIComponent(tour.title)}`} className="btn btn--primary" style={{ fontSize: '.9rem', padding: '16px 36px' }}>
                Book This Tour →
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
