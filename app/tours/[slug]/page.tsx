export const revalidate = 60

import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import FAQAccordion from '@/components/FAQAccordion'
import DayItinerary from '@/components/DayItinerary'
import StickyBookBar from '@/components/StickyBookBar'
import TourDetailSidebar from '@/components/TourDetailSidebar'
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
  return {
    title: `${tour.title} — ₱${tour.price?.toLocaleString()}/person | Laagan Adventure`,
    description: tour.tagline || tour.description,
  }
}

export default async function TourDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [tour, testimonials, similarTours] = await Promise.all([
    client.fetch(TOUR_QUERY, { slug }).catch(() => null),
    client.fetch(TESTIMONIALS_QUERY).catch(() => []),
    client.fetch(SIMILAR_TOURS_QUERY, { slug }).catch(() => []),
  ])

  if (!tour) notFound()

  const photos: object[] = tour.photos ?? []
  const thumb1 = photos[0]
  const thumb2 = photos[1]

  return (
    <>
      <Nav />
      <main className="page-top">
        <div className="container">

          {/* Breadcrumb */}
          <div className="breadcrumb" style={{ paddingTop: '32px' }}>
            <Link href="/">Home</Link>
            <span className="breadcrumb__sep">›</span>
            <Link href="/tours">Tours</Link>
            <span className="breadcrumb__sep">›</span>
            <span>{tour.title}</span>
          </div>

          {/* Gallery */}
          <div className="gallery">
            <div className="gallery__main">
              {tour.mainImage
                ? <Image src={urlFor(tour.mainImage).width(900).height(600).url()} fill alt={tour.title} className="gallery__main-img" style={{ objectFit: 'cover' }} sizes="(max-width:900px) 100vw, 70vw" priority />
                : <div className="gallery__main-img" style={{ background: 'linear-gradient(160deg,#0ea5e9 0%,#0284c7 50%,#0c4a6e 100%)', width: '100%', height: '100%' }} />
              }
              {photos.length > 0 && (
                <button className="gallery__view-all">📷 View all {photos.length + 1} photos</button>
              )}
            </div>
            {(thumb1 || thumb2) && (
              <div className="gallery__thumbs">
                <div className="gallery__thumb">
                  {thumb1
                    ? <Image src={urlFor(thumb1).width(400).height(300).url()} fill alt={`${tour.title} photo 2`} className="gallery__thumb-img" style={{ objectFit: 'cover' }} sizes="20vw" />
                    : <div className="gallery__thumb-img" style={{ background: 'linear-gradient(160deg,#d96b8a,#bf5070)', width: '100%', height: '100%' }} />
                  }
                </div>
                <div className="gallery__thumb">
                  {thumb2
                    ? <Image src={urlFor(thumb2).width(400).height(300).url()} fill alt={`${tour.title} photo 3`} className="gallery__thumb-img" style={{ objectFit: 'cover' }} sizes="20vw" />
                    : <div className="gallery__thumb-img" style={{ background: 'linear-gradient(160deg,#10b981,#059669)', width: '100%', height: '100%' }} />
                  }
                </div>
              </div>
            )}
          </div>

          {/* Tour Header */}
          <div className="tour-header">
            <h1 className="tour-title">{tour.title}</h1>
            <div className="tour-meta">
              {tour.duration && <span className="chip">⏱ {tour.duration}</span>}
              <span className="chip">📍 Paseo del Mar Jetty</span>
              <span className="chip">⭐ 5.0 reviews</span>
              {tour.destination && <span className="chip">🏝 {tour.destination}</span>}
            </div>
            {tour.badgeLabel && (
              <div className="urgency-bar">
                <span className="urgency-bar__badge">{tour.badgeLabel}</span>
                <span className="urgency-bar__text">Only 400 visitors/day on Santa Cruz Island</span>
                <span className="urgency-bar__note">Weekends sell out fast</span>
              </div>
            )}
          </div>

          {/* Detail Grid */}
          <div className="detail-grid">

            {/* ── LEFT COLUMN ── */}
            <div>

              {/* Overview */}
              {(tour.tagline || tour.description) && (
                <div className="detail-section">
                  <h2 className="detail-section__title">Overview</h2>
                  {tour.tagline && <p style={{ fontSize: '.95rem', color: 'var(--text)', lineHeight: 1.8, marginBottom: '20px' }}>{tour.tagline}</p>}
                  {tour.description && <p style={{ fontSize: '.88rem', color: 'var(--muted)', lineHeight: 1.8 }}>{tour.description}</p>}
                </div>
              )}

              {/* Inclusions + Exclusions */}
              {(tour.inclusions?.length > 0 || tour.exclusions?.length > 0) && (
                <div className="detail-section">
                  <h2 className="detail-section__title">What&apos;s Included</h2>
                  <div className="inc-grid">
                    {tour.inclusions?.length > 0 && (
                      <ul className="inc-list">
                        {tour.inclusions.map((item: string) => (
                          <li key={item}><span>✅</span><span>{item}</span></li>
                        ))}
                      </ul>
                    )}
                    {tour.exclusions?.length > 0 && (
                      <ul className="inc-list">
                        {tour.exclusions.map((item: string) => (
                          <li key={item}><span>❌</span><span>{item}</span></li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              )}

              {/* Day Itinerary (multi-day) */}
              {tour.dayItinerary?.length > 0 && (
                <div className="detail-section">
                  <DayItinerary days={tour.dayItinerary} />
                </div>
              )}

              {/* Simple itinerary */}
              {tour.itinerary?.length > 0 && (
                <div className="detail-section">
                  <h2 className="detail-section__title">Full Day Itinerary</h2>
                  {tour.itinerary.map((item: { time: string; activity: string }, i: number) => (
                    <div key={i} className={`accordion-item${i === 0 ? ' is-open' : ''}`}>
                      <button className="accordion-trigger">
                        <span>{item.time && `${item.time} — `}{item.activity}</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m6 9 6 6 6-6"/></svg>
                      </button>
                      <div className="accordion-body">{item.activity}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Meeting Point */}
              <div className="detail-section">
                <h2 className="detail-section__title">Meeting Point</h2>
                <div className="info-box" style={{ marginBottom: '12px' }}>
                  <strong>📍 Paseo del Mar Jetty, Zamboanga City</strong><br />
                  Near the main Paseo del Mar waterfront. Look for the Laagan Adventures vinta with the colorful sail.
                  <br /><br />
                  <a href={`https://maps.google.com/?q=${encodeURIComponent(tour.mapQuery || 'Paseo del Mar Zamboanga City')}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--pink)', fontWeight: 600 }}>Open in Google Maps →</a>
                </div>
              </div>

              {/* Cancellation Policy */}
              <div className="detail-section">
                <h2 className="detail-section__title">Cancellation Policy</h2>
                <div className="info-box">
                  <strong>✅ Free cancellation up to 24 hours before your tour.</strong><br />
                  Cancel within 24 hours and you&apos;ll receive a full refund or free reschedule. For cancellations due to bad weather, we&apos;ll reschedule at no charge — your safety always comes first.
                </div>
              </div>

              {/* FAQ */}
              {tour.faq?.length > 0 && (
                <div className="detail-section">
                  <h2 className="detail-section__title">Frequently Asked Questions</h2>
                  <FAQAccordion faqs={tour.faq} />
                </div>
              )}

              {/* Reviews */}
              <div className="detail-section">
                <h2 className="detail-section__title">Guest Reviews</h2>
                <div className="rating-summary">
                  <div>
                    <div className="rating-big">5.0</div>
                    <div className="rating-stars">★★★★★</div>
                    <div style={{ fontSize: '.72rem', color: 'var(--muted)', marginTop: '4px' }}>
                      {testimonials.length > 0 ? `${testimonials.length} reviews` : '100+ reviews'}
                    </div>
                  </div>
                  <div style={{ flex: 1, paddingLeft: '24px' }}>
                    <div style={{ fontSize: '.85rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '6px' }}>What guests love most:</div>
                    <div style={{ fontSize: '.82rem', color: 'var(--muted)', lineHeight: 1.7 }}>
                      &ldquo;The pink sand is real, and it&apos;s magical.&rdquo; · &ldquo;James and Ivy are the best guides.&rdquo; · &ldquo;Worth every peso.&rdquo;
                    </div>
                  </div>
                </div>

                {testimonials.length > 0
                  ? (testimonials as { _id: string; name: string; tour: string; review: string; location?: string }[]).slice(0, 3).map(t => (
                    <div key={t._id} className="review-card">
                      <div className="review-meta">
                        <div className="review-avatar">{t.name?.[0]}</div>
                        <div>
                          <div className="review-name">{t.name} <span style={{ color: '#f5a623', fontSize: '.85rem' }}>★★★★★</span></div>
                          {t.location && <div className="review-date">{t.location}</div>}
                        </div>
                        {t.tour && <div className="review-tour" style={{ marginLeft: 'auto' }}>{t.tour}</div>}
                      </div>
                      <p className="review-text">&ldquo;{t.review}&rdquo;</p>
                    </div>
                  ))
                  : (
                    <>
                      {[
                        { init: 'M', name: 'Maria G.', loc: 'Davao City · May 2026', tour: 'Santa Cruz Island', review: "James and Ivy are incredible. The pink sand beach is everything they promised and more. Worth every peso — I'll be back with my whole family next time." },
                        { init: 'R', name: 'Robert C.', loc: 'Manila · April 2026', tour: 'Santa Cruz Island', review: "The vinta ride alone was worth coming to Zamboanga for. Booked 2 days before, confirmed same day, paid on arrival. No stress at all." },
                        { init: 'J', name: 'Jessica L.', loc: 'Singapore · March 2026', tour: 'Santa Cruz Island', review: "I've traveled a lot but I've never seen sand like that. The jellyfish lagoon was surreal. Ivy's knowledge of the area and history made the trip so much richer." },
                      ].map(r => (
                        <div key={r.name} className="review-card">
                          <div className="review-meta">
                            <div className="review-avatar">{r.init}</div>
                            <div>
                              <div className="review-name">{r.name} <span style={{ color: '#f5a623', fontSize: '.85rem' }}>★★★★★</span></div>
                              <div className="review-date">{r.loc}</div>
                            </div>
                            <div className="review-tour" style={{ marginLeft: 'auto' }}>{r.tour}</div>
                          </div>
                          <p className="review-text">&ldquo;{r.review}&rdquo;</p>
                        </div>
                      ))}
                    </>
                  )
                }

                <div style={{ marginTop: '20px' }}>
                  <a href="https://facebook.com/laaganadventure" target="_blank" rel="noopener noreferrer" style={{ fontSize: '.82rem', fontWeight: 600, color: 'var(--pink)' }}>
                    See all reviews on Facebook →
                  </a>
                </div>
              </div>

            </div>{/* end left column */}

            {/* ── RIGHT SIDEBAR ── */}
            <TourDetailSidebar
              tourSlug={tour.slug.current}
              basePrice={tour.price}
              pricingTiers={tour.pricingTiers}
            />

          </div>{/* end detail-grid */}

          {/* Related Tours */}
          {similarTours.length > 0 && (
            <div style={{ paddingBottom: '80px' }}>
              <h2 className="section__title" style={{ fontSize: '1.6rem' }}>You Might Also Like</h2>
              <div className="related-grid">
                {(similarTours as { _id: string; title: string; slug: { current: string }; price: number; priceNote: string; duration: string; mainImage: object }[]).map(t => (
                  <Link href={`/tours/${t.slug.current}`} className="tour-card" key={t._id}>
                    <div className="tour-card__img">
                      {t.mainImage
                        ? <Image src={urlFor(t.mainImage).width(400).height(280).url()} fill alt={t.title} className="tour-card__img-bg" style={{ objectFit: 'cover' }} sizes="33vw" />
                        : <div className="tour-card__img-bg" style={{ background: 'linear-gradient(160deg,#0ea5e9,#0284c7,#0c4a6e)' }} />
                      }
                    </div>
                    <div className="tour-card__body">
                      <h3 className="tour-card__name">{t.title}</h3>
                      <div className="tour-card__chips">
                        {t.duration && <span className="chip chip--sm">⏱ {t.duration}</span>}
                      </div>
                      <div className="tour-card__footer">
                        <div><div className="tour-card__price">₱{t.price?.toLocaleString()}</div></div>
                        <span className="btn btn--outline btn--sm">View</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>{/* end container */}
      </main>

      <Footer />

      {/* Mobile Sticky Book Bar */}
      <StickyBookBar tourPrice={tour.price} tourSlug={tour.slug.current} />
    </>
  )
}
