import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { client, urlFor, FEATURED_TOURS_QUERY, TESTIMONIALS_QUERY } from '@/lib/sanity'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Laagan Adventure — Tour Services in Zamboanga City',
  description: 'Explore Zamboanga City with a trusted local guide. Santa Cruz Island, city tours, island hopping, and more. Book your adventure today.',
}

const WHY = [
  { icon: '🏝️', title: 'Local Experts', desc: 'Born and raised in Zamboanga City. We know every hidden spot, the best times to visit, and how to make your trip unforgettable.' },
  { icon: '✅', title: 'DTI Registered', desc: 'Fully registered and legitimate tour operator. BIR receipts available. You\'re in safe, professional hands.' },
  { icon: '💬', title: 'Always Available', desc: 'Real people, real responses. Message us on Messenger or call anytime — we reply fast and speak your language.' },
]

const STATS = [
  { num: '5+', label: 'Years guiding' },
  { num: '500+', label: 'Happy travelers' },
  { num: '10+', label: 'Tour packages' },
  { num: '⭐ 5', label: 'Star service' },
]

const TESTIMONIALS_FALLBACK = [
  { _id: '1', name: 'Maria Santos', tour: 'Santa Cruz Island Tour', review: 'Sobrang ganda! Best tour experience namin sa Zamboanga. Very accommodating and professional ang guide. Babalik kami!', rating: 5 },
  { _id: '2', name: 'John dela Cruz', tour: 'City Heritage Tour', review: 'Very knowledgeable about the history of Zamboanga. Hindi lang tour, parang history lesson din. Highly recommended!', rating: 5 },
  { _id: '3', name: 'Ana Reyes', tour: 'Island Hopping Package', review: 'The island hopping was amazing! Lahat ng destinations pina-visit namin. Worth every peso. Thank you Laagan Adventure!', rating: 5 },
]

export default async function HomePage() {
  const [featuredTours, testimonials] = await Promise.all([
    client.fetch(FEATURED_TOURS_QUERY).catch(() => []),
    client.fetch(TESTIMONIALS_QUERY).catch(() => []),
  ])

  const displayTestimonials = testimonials.length > 0 ? testimonials : TESTIMONIALS_FALLBACK

  return (
    <>
      <Nav transparent />
      <main>

        {/* HERO */}
        <section className="hero">
          <div className="hero__bg" />
          <div className="hero__inner container">
            <p className="hero__eyebrow">📍 Zamboanga City, Philippines</p>
            <h1 className="hero__title">
              Explore Zamboanga<br />with a <span>Local Guide</span>
            </h1>
            <p className="hero__sub">
              Discover the pink sand beaches, colorful vintas, and rich culture of Zamboanga City — guided by people who call it home.
            </p>
            <div className="hero__actions">
              <Link href="/tours" className="btn btn--primary">See Our Tours →</Link>
              <Link href="/contact" className="btn btn--outline-light">Inquire Now</Link>
            </div>
          </div>
        </section>

        {/* STATS */}
        <div className="container">
          <div className="stats-row">
            {STATS.map((s, i) => (
              <span key={s.label} style={{ display: 'contents' }}>
                <div className="stat-item">
                  <p className="stat-item__num">{s.num}</p>
                  <p className="stat-item__label">{s.label}</p>
                </div>
                {i < STATS.length - 1 && <div className="stat-divider" />}
              </span>
            ))}
          </div>
        </div>

        {/* FEATURED TOURS */}
        <section className="section" id="tours">
          <div className="container">
            <p className="section__label">Our Packages</p>
            <h2 className="section__title">Tours you&rsquo;ll never forget.</h2>
            <p className="section__sub">From island hopping to heritage walks — every package is designed to show you the best of Zamboanga.</p>

            {featuredTours.length > 0 ? (
              <div className="tours-grid">
                {featuredTours.map((tour: {
                  _id: string; title: string; slug: { current: string };
                  tagline: string; mainImage: object; price: number;
                  priceNote: string; destination: string;
                }) => (
                  <Link href={`/tours/${tour.slug.current}`} className="tour-card" key={tour._id}>
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
                ))}
              </div>
            ) : (
              <div style={{ marginTop: '56px', textAlign: 'center', padding: '80px', background: 'var(--bg-2)', borderRadius: 'var(--rl)', border: '1px solid var(--border)' }}>
                <p style={{ fontSize: '2rem', marginBottom: '16px' }}>🏝️</p>
                <p style={{ fontWeight: 700, color: 'var(--navy)', marginBottom: '8px' }}>Tours coming soon</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '.88rem' }}>Add your first tour in the Sanity studio at /studio</p>
              </div>
            )}

            <div style={{ marginTop: '40px', textAlign: 'center' }}>
              <Link href="/tours" className="btn btn--outline">View All Packages →</Link>
            </div>
          </div>
        </section>

        {/* WHY US */}
        <section className="section section--alt">
          <div className="container">
            <p className="section__label">Why Laagan Adventure</p>
            <h2 className="section__title">A tour company that actually cares.</h2>
            <div className="why-grid">
              {WHY.map(w => (
                <div className="why-card" key={w.title}>
                  <div className="why-card__icon">{w.icon}</div>
                  <h3 className="why-card__title">{w.title}</h3>
                  <p className="why-card__desc">{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="section">
          <div className="container">
            <p className="section__label">Reviews</p>
            <h2 className="section__title">Real words from real travelers.</h2>
            <div className="testimonials-grid">
              {displayTestimonials.slice(0, 3).map((t: { _id: string; name: string; tour: string; review: string; rating: number }) => (
                <div className="tcard" key={t._id}>
                  <div className="tcard__stars">{'★'.repeat(t.rating ?? 5)}</div>
                  <p className="tcard__quote">&ldquo;{t.review}&rdquo;</p>
                  <div className="tcard__author">
                    <div className="tcard__avatar">{t.name[0]}</div>
                    <div>
                      <p className="tcard__name">{t.name}</p>
                      <p className="tcard__role">{t.tour}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA BANNER */}
        <section style={{ background: 'var(--navy)', padding: '80px 0' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '.75rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '16px' }}>
              Ready for an adventure?
            </p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, color: '#fff', letterSpacing: '-.03em', marginBottom: '16px' }}>
              Your Zamboanga experience<br />starts here.
            </h2>
            <p style={{ color: 'rgba(255,255,255,.7)', marginBottom: '36px', maxWidth: '480px', margin: '0 auto 36px', lineHeight: 1.7 }}>
              Send us a message and we&rsquo;ll plan the perfect tour for your group — any size, any budget.
            </p>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn btn--primary">Book Now →</Link>
              <Link href="/tours" className="btn btn--outline-light">See All Tours</Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
