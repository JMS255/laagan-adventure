import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import TourDayItinerary from '@/components/TourDayItinerary'
import StickyBookBar from '@/components/StickyBookBar'
import TourDetailSidebar from '@/components/TourDetailSidebar'
import TourItinerary from '@/components/TourItinerary'
import TourGallery from '@/components/TourGallery'
import { client, TESTIMONIALS_QUERY } from '@/lib/sanity'
import { getTourBySlug, getSimilarTours, TOURS_DATA } from '@/lib/tours-data'
import type { Metadata } from 'next'

export const revalidate = 60

export async function generateStaticParams() {
  return TOURS_DATA.map(t => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const tour = getTourBySlug(slug)
  if (!tour) return {}
  return {
    title: `${tour.title} | Laagan Adventure`,
    description: tour.tagline,
  }
}

export default async function TourDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const tour = getTourBySlug(slug)
  if (!tour) notFound()

  const similarTours = getSimilarTours(slug, 3)

  const [sanityTour, testimonials] = await Promise.all([
    client.fetch(`*[_type == "tour" && slug.current == $slug][0]{ price, priceNote, badgeLabel, urgencyNote }`, { slug }).catch(() => null),
    client.fetch(TESTIMONIALS_QUERY).catch(() => []),
  ])

  const price     = sanityTour?.price ?? null
  const priceNote = sanityTour?.priceNote ?? 'per person'
  const badge     = sanityTour?.badgeLabel ?? null

  const thumbUrls = tour.photos.slice(0, 2).map((url, i) => ({ url, alt: `${tour.title} photo ${i + 2}` }))

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: tour.title,
    description: tour.description,
    url: `https://laaganadventure.com/tours/${tour.slug}`,
    image: tour.mainImage,
    touristType: ['Solo traveler', 'Couples', 'Groups', 'Family'],
    itinerary: {
      '@type': 'ItemList',
      itemListElement: (tour.itinerary ?? []).map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.activity,
      })),
    },
    provider: {
      '@type': 'TouristInformationCenter',
      name: 'Laagan Adventure',
      url: 'https://laaganadventure.com',
      telephone: '+639XXXXXXXXX',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Zamboanga City',
        addressRegion: 'Zamboanga Peninsula',
        addressCountry: 'PH',
      },
    },
    ...(price && price > 0 ? {
      offers: {
        '@type': 'Offer',
        price: price,
        priceCurrency: 'PHP',
        availability: 'https://schema.org/InStock',
        validFrom: new Date().toISOString().split('T')[0],
      },
    } : {}),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main>
        <div className="container" style={{ paddingTop: 'calc(var(--nav-h) + 32px)' }}>

          {/* Breadcrumb */}
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="breadcrumb__sep">›</span>
            <Link href="/tours">Tours</Link>
            <span className="breadcrumb__sep">›</span>
            <span>{tour.title}</span>
          </div>

          {/* Gallery */}
          <TourGallery
            mainImageUrl={tour.mainImage}
            mainAlt={tour.title}
            thumbUrls={thumbUrls}
            totalCount={tour.photos.length + 1}
          />

          {/* Tour Header */}
          <div className="tour-header">
            <h1 className="tour-title">{tour.title}</h1>
            <div className="tour-meta">
              <span className="chip">⏱ {tour.duration}</span>
              <span className="chip">📍 {tour.destination}</span>
              <span className="chip">👥 {tour.groupSize}</span>
              <span className="chip">⭐ 5.0</span>
            </div>
            {badge && (
              <div className="urgency-bar">
                <span className="urgency-bar__badge">{badge}</span>
                <span className="urgency-bar__text">{sanityTour?.urgencyNote || 'Limited spots available'}</span>
                <span className="urgency-bar__note">Book ahead</span>
              </div>
            )}
          </div>

          {/* Detail Grid */}
          <div className="detail-grid">

            {/* ── LEFT COLUMN ── */}
            <div>

              {/* Overview */}
              <div className="detail-section">
                <h2 className="detail-section__title">Overview</h2>
                <p style={{ fontSize: '.95rem', fontStyle: 'italic', fontWeight: 600, color: 'var(--navy)', lineHeight: 1.8, marginBottom: '20px' }}>{tour.tagline}</p>
                <p style={{ fontSize: '.88rem', color: 'var(--muted)', lineHeight: 1.8 }}>{tour.description}</p>
              </div>

              {/* Highlights */}
              <div className="detail-section">
                <h2 className="detail-section__title">Highlights</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {tour.highlights.map(h => (
                    <div key={h} style={{ display: 'flex', gap: '10px', fontSize: '.88rem', color: 'var(--text)', lineHeight: 1.5 }}>
                      <span style={{ color: 'var(--pink)', flexShrink: 0 }}>✦</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inclusions */}
              <div className="detail-section">
                <h2 className="detail-section__title">What&apos;s Included</h2>
                <div className="inc-grid">
                  <ul className="inc-list">
                    {tour.inclusions.filter(i => i.included).map(i => (
                      <li key={i.text}><span>✅</span><span>{i.text}</span></li>
                    ))}
                  </ul>
                  {tour.inclusions.some(i => !i.included) && (
                    <ul className="inc-list">
                      {tour.inclusions.filter(i => !i.included).map(i => (
                        <li key={i.text}><span>❌</span><span>{i.text}</span></li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Day Itinerary (multi-day tours) */}
              {tour.dayItinerary && tour.dayItinerary.length > 0 && (
                <div className="detail-section">
                  <TourDayItinerary days={tour.dayItinerary} />
                </div>
              )}

              {/* Simple Itinerary (single-day tours) */}
              {tour.itinerary && tour.itinerary.length > 0 && (
                <div className="detail-section">
                  <h2 className="detail-section__title">Full Day Itinerary</h2>
                  <TourItinerary items={tour.itinerary} />
                </div>
              )}

              {/* What to Bring */}
              <div className="detail-section">
                <h2 className="detail-section__title">What to Bring</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {tour.whatToBring.map(item => (
                    <div key={item} style={{ fontSize: '.85rem', color: 'var(--text)', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--pink)', flexShrink: 0 }}>·</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cancellation Policy */}
              <div className="detail-section">
                <h2 className="detail-section__title">Cancellation Policy</h2>
                <div className="info-box">
                  <strong>✅ Free cancellation up to 24 hours before your tour.</strong><br />
                  Cancel within 24 hours and you&apos;ll receive a full refund or free reschedule. Tours cancelled due to bad weather are rescheduled at no charge — your safety always comes first.
                </div>
              </div>

              {/* Important Notes */}
              {tour.importantNotes.length > 0 && (
                <div className="detail-section">
                  <h2 className="detail-section__title">Important Notes</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {tour.importantNotes.map(note => (
                      <div key={note} className="info-box" style={{ marginBottom: 0 }}>⚠️ {note}</div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reviews — only shown when real reviews exist in Sanity */}
              {(testimonials as { _id: string }[]).length > 0 && (
                <div className="detail-section">
                  <h2 className="detail-section__title">Guest Reviews</h2>
                  {(testimonials as { _id: string; name: string; tour: string; review: string; location?: string }[]).slice(0, 3).map(t => (
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
                  ))}
                  <div style={{ marginTop: '20px' }}>
                    <a href="https://www.facebook.com/profile.php?id=61562040673545" target="_blank" rel="noopener noreferrer" style={{ fontSize: '.82rem', fontWeight: 600, color: 'var(--pink)' }}>
                      See all reviews on Facebook →
                    </a>
                  </div>
                </div>
              )}

            </div>{/* end left column */}

            {/* ── RIGHT SIDEBAR ── */}
            <TourDetailSidebar
              tourSlug={tour.slug}
              basePrice={price ?? 0}
            />

          </div>{/* end detail-grid */}

          {/* Related Tours */}
          {similarTours.length > 0 && (
            <div style={{ paddingBottom: '80px' }}>
              <h2 className="section__title" style={{ fontSize: '1.6rem' }}>You Might Also Like</h2>
              <div className="related-grid">
                {similarTours.map(t => (
                  <Link href={`/tours/${t.slug}`} className="tour-card" key={t.slug}>
                    <div className="tour-card__img">
                      <Image src={t.mainImage} fill alt={t.title} className="tour-card__img-bg" style={{ objectFit: 'cover' }} sizes="33vw" unoptimized />
                    </div>
                    <div className="tour-card__body">
                      <h3 className="tour-card__name">{t.title}</h3>
                      <div className="tour-card__chips">
                        <span className="chip chip--sm">⏱ {t.duration}</span>
                        <span className="chip chip--sm">📍 {t.destination}</span>
                      </div>
                      <div className="tour-card__footer">
                        <div><div className="tour-card__price">Inquire</div></div>
                        <span className="btn btn--outline btn--sm">View</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
      <StickyBookBar tourPrice={price ?? 0} tourSlug={tour.slug} />
    </>
  )
}
