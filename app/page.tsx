export const revalidate = 60

import Link from 'next/link'
import Image from 'next/image'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import TravelerFilter from '@/components/TravelerFilter'
import { client, urlFor, TOURS_QUERY, TESTIMONIALS_QUERY, GALLERY_QUERY } from '@/lib/sanity'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Laagan Adventure — Guided Island Tours in Zamboanga City',
  description: 'Explore Zamboanga City with a trusted local guide. Santa Cruz Island, city tours, island hopping, and more. Book your adventure today.',
}

export default async function HomePage() {
  const [allTours, testimonials, galleryPhotos] = await Promise.all([
    client.fetch(TOURS_QUERY).catch(() => []),
    client.fetch(TESTIMONIALS_QUERY).catch(() => []),
    client.fetch(GALLERY_QUERY).catch(() => []),
  ])

  return (
    <>
      <Nav />

      <main className="page-top">

        {/* ── B. HERO ── */}
        <section className="hero">
          <div className="hero__bg" style={{ backgroundImage: "url('/hero-bg.png')" }} />
          <div className="hero__overlay" />
          <div className="hero__inner">
            <div className="container">
              <span className="hero__eyebrow">📍 Zamboanga City, Philippines</span>
              <h1 className="hero__title">The Only Pink Sand<br />Beach in Asia.</h1>
              <p className="hero__sub">Guided island adventures in Zamboanga City, Philippines.</p>
              <div className="hero__actions">
                <Link href="/tours" className="btn btn--primary btn--lg">See Our Tours →</Link>
                <a href="https://m.me/61562040673545" target="_blank" rel="noopener noreferrer" className="btn btn--outline-light">💬 Ask on Messenger</a>
              </div>
              <div className="hero__trust">
                <span>⭐ 5.0</span>
                <span className="hero__trust-sep">·</span>
                <span>National Geographic Best Beach</span>
                <span className="hero__trust-sep">·</span>
                <span>DTI Accredited</span>
                <span className="hero__trust-sep">·</span>
                <span>Pay on the Day</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── C. STATS BAR ── */}
        <div style={{ background: '#fff' }}>
          <div className="container">
            <div className="stats-bar">
              <div className="stat-item">
                <div className="stat-item__num">500<em>+</em></div>
                <div className="stat-item__label">Tours Completed</div>
              </div>
              <div className="stat-divider" />
              <div className="stat-item">
                <div className="stat-item__num">5.0 <em>★</em></div>
                <div className="stat-item__label">Average Rating</div>
              </div>
              <div className="stat-divider" />
              <div className="stat-item">
                <div className="stat-item__num">Since <em>&apos;22</em></div>
                <div className="stat-item__label">Proudly Local</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── D+E. TRAVELER FILTER + TOURS GRID ── */}
        <section className="section">
          <div className="container">
            <span className="section__label">Find Your Adventure</span>
            <div className="tours-header">
              <h2 className="section__title" style={{ marginBottom: 0 }}>
                Discover Zamboanga&apos;s<br />Best Experiences
              </h2>
              <Link href="/tours" className="view-all">View all tours →</Link>
            </div>
            <TravelerFilter tours={allTours} />
          </div>
        </section>

        {/* ── F. DESTINATION STORY ── */}
        <section className="section section--dark">
          <div className="container" style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="section__label">Why Zamboanga</span>
            <h2 className="section__title section__title--light" style={{ maxWidth: '640px', marginLeft: 'auto', marginRight: 'auto' }}>
              &ldquo;A Beach So Rare,<br />National Geographic Noticed.&rdquo;
            </h2>
            <p className="section__sub section__sub--light" style={{ margin: '0 auto' }}>
              Santa Cruz Island is the <em>only</em> pink sand beach in Asia — and one of the world&apos;s most extraordinary natural wonders. We take you there.
            </p>
          </div>
          <div className="dest-features">
            <div className="dest-feature">
              <div className="dest-feature__icon">🏖</div>
              <div className="dest-feature__title">Pink Sand — Only in Asia</div>
              <div className="dest-feature__desc">The sand gets its blush-pink hue from pulverized red coral. Nowhere else in Asia will you find this. National Geographic named it a Top 21 Beach in the World.</div>
            </div>
            <div className="dest-feature">
              <div className="dest-feature__icon">🪼</div>
              <div className="dest-feature__title">Stingless Jellyfish Lagoon</div>
              <div className="dest-feature__desc">Swim freely through a lagoon filled with jellyfish that cannot sting you. One of the few places on Earth where this is possible — and it&apos;s right here in Zamboanga.</div>
            </div>
            <div className="dest-feature">
              <div className="dest-feature__icon">⛵</div>
              <div className="dest-feature__title">Sail on a Tausug Vinta</div>
              <div className="dest-feature__desc">We sail on traditional Tausug outrigger vintas — colorful, hand-crafted boats unique to Zamboanga. A cultural experience as beautiful as the destination.</div>
            </div>
          </div>
          <div style={{ textAlign: 'center', padding: '48px 32px 0' }}>
            <Link href="/contact" className="btn btn--primary btn--lg">Plan My Trip →</Link>
          </div>
        </section>

        {/* ── G. HOW IT WORKS ── */}
        <section className="section section--darker">
          <div className="container" style={{ textAlign: 'center', marginBottom: '0' }}>
            <span className="section__label">Simple Booking</span>
            <h2 className="section__title section__title--light">How It Works</h2>
          </div>
          <div className="how-grid">
            <div className="how-step">
              <div className="how-step__num">1</div>
              <div className="how-step__time">2 minutes</div>
              <div className="how-step__title">Choose Your Tour</div>
              <div className="how-step__desc">Browse our tours and pick the experience that excites you. Check dates, group size, and pricing — everything is transparent.</div>
            </div>
            <div className="how-step">
              <div className="how-step__num">2</div>
              <div className="how-step__time">Within 24 hours</div>
              <div className="how-step__title">We Confirm via Messenger</div>
              <div className="how-step__desc">We reach out personally to confirm your slot, answer questions, and send you everything you need to prepare. Real people, fast replies.</div>
            </div>
            <div className="how-step">
              <div className="how-step__num">3</div>
              <div className="how-step__time">On the day</div>
              <div className="how-step__title">Pay on the Day</div>
              <div className="how-step__desc">No upfront payment required. Pay by cash or GCash on arrival. No scam risk, no surprises. Just show up and enjoy.</div>
            </div>
          </div>
        </section>

        {/* ── H. TRUST STRIP ── */}
        <div style={{ background: '#fff', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
          <div className="container">
            <div className="trust-strip">
              <div className="trust-item">
                <div className="trust-item__icon">✅</div>
                <div className="trust-item__text">Free Cancellation</div>
              </div>
              <div className="trust-item">
                <div className="trust-item__icon">💸</div>
                <div className="trust-item__text">Pay on the Day</div>
              </div>
              <div className="trust-item">
                <div className="trust-item__icon">🌦</div>
                <div className="trust-item__text">Weather Guarantee</div>
              </div>
              <div className="trust-item">
                <div className="trust-item__icon">🏛</div>
                <div className="trust-item__text">DTI Registered</div>
              </div>
              <div className="trust-item">
                <div className="trust-item__icon">💬</div>
                <div className="trust-item__text">Reply Within 24hrs</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── I. TESTIMONIALS ── */}
        <section className="section section--alt">
          <div className="container">
            <span className="section__label section__label--center">What Travelers Say</span>
            <h2 className="section__title section__title--center">Real Stories from Real Guests</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px', marginTop: '48px' }}>
              {testimonials.length > 0
                ? (testimonials as { _id: string; name: string; tour: string; review: string; rating: number; location?: string }[]).slice(0, 3).map(t => (
                  <div key={t._id} className="tcard">
                    <div className="tcard__stars">{'★'.repeat(t.rating ?? 5)}</div>
                    <p className="tcard__quote">&ldquo;{t.review}&rdquo;</p>
                    <div className="tcard__author">
                      <div className="tcard__avatar">{t.name?.[0]}</div>
                      <div>
                        <div className="tcard__name">{t.name}</div>
                        {t.location && <div className="tcard__meta">{t.location}</div>}
                        {t.tour && <div className="tcard__tour-tag">{t.tour}</div>}
                      </div>
                    </div>
                  </div>
                ))
                : (
                  <>
                    <div className="tcard">
                      <div className="tcard__stars">★★★★★</div>
                      <p className="tcard__quote">&ldquo;James and Ivy are incredible hosts. The pink sand beach is everything they promised and more. Worth every peso — I&apos;ll be back with my whole family.&rdquo;</p>
                      <div className="tcard__author">
                        <div className="tcard__avatar">M</div>
                        <div>
                          <div className="tcard__name">Maria G.</div>
                          <div className="tcard__meta">Davao City</div>
                          <div className="tcard__tour-tag">Santa Cruz Island Tour</div>
                        </div>
                      </div>
                    </div>
                    <div className="tcard">
                      <div className="tcard__stars">★★★★★</div>
                      <p className="tcard__quote">&ldquo;Booked 2 days before, confirmed same day, paid on arrival. No stress at all. Best day trip I&apos;ve had in the Philippines. The vinta ride alone was worth it.&rdquo;</p>
                      <div className="tcard__author">
                        <div className="tcard__avatar">R</div>
                        <div>
                          <div className="tcard__name">Robert C.</div>
                          <div className="tcard__meta">Manila</div>
                          <div className="tcard__tour-tag">Island Hopping Tour</div>
                        </div>
                      </div>
                    </div>
                    <div className="tcard">
                      <div className="tcard__stars">★★★★★</div>
                      <p className="tcard__quote">&ldquo;The heritage tour showed us a side of Zamboanga most tourists never see. Ivy&apos;s knowledge of local history is genuinely impressive. Highly recommend.&rdquo;</p>
                      <div className="tcard__author">
                        <div className="tcard__avatar">J</div>
                        <div>
                          <div className="tcard__name">Jessica L.</div>
                          <div className="tcard__meta">Singapore</div>
                          <div className="tcard__tour-tag">City Heritage Tour</div>
                        </div>
                      </div>
                    </div>
                  </>
                )
              }
            </div>
          </div>
        </section>

        {/* ── J. SOCIAL PROOF STRIP ── */}
        <section className="section--sm" style={{ background: '#fff' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <span className="section__label section__label--center">Follow the Adventure</span>
              <h2 className="section__title section__title--center" style={{ fontSize: '1.6rem' }}>@laaganadventure</h2>
              <p style={{ fontSize: '.85rem', color: 'var(--muted)', marginTop: '8px' }}>Tag us in your photos and get featured here</p>
            </div>
            <div className="feed-grid">
              {galleryPhotos.length > 0
                ? (galleryPhotos as { _id: string; image: object }[]).slice(0, 6).map(photo => (
                  <div key={photo._id} className="feed-item">
                    <img src={urlFor(photo.image).width(400).height(400).url()} alt="Laagan Adventure guest photo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                  </div>
                ))
                : (
                  <>
                    <div className="feed-item" style={{ background: 'linear-gradient(135deg,#0ea5e9,#0369a1)' }} />
                    <div className="feed-item" style={{ background: 'linear-gradient(135deg,#d96b8a,#bf5070)' }} />
                    <div className="feed-item" style={{ background: 'linear-gradient(135deg,#10b981,#059669)' }} />
                    <div className="feed-item" style={{ background: 'linear-gradient(135deg,#f59e0b,#d97706)' }} />
                    <div className="feed-item" style={{ background: 'linear-gradient(135deg,#8b5cf6,#7c3aed)' }} />
                    <div className="feed-item" style={{ background: 'linear-gradient(135deg,#0284c7,#0ea5e9)' }} />
                  </>
                )
              }
            </div>
          </div>
        </section>

        {/* ── K. FINAL CTA ── */}
        <section className="section section--dark" style={{ textAlign: 'center' }}>
          <div className="container">
            <span className="section__label section__label--center">Ready?</span>
            <h2 className="section__title section__title--light" style={{ maxWidth: '560px', marginLeft: 'auto', marginRight: 'auto', fontStyle: 'italic', marginBottom: '20px' }}>
              Ready to See the Pink Sand?
            </h2>
            <p className="section__sub section__sub--light" style={{ margin: '0 auto 40px' }}>
              Book your adventure today. We&apos;ll confirm within 24 hours.<br />No payment required — pay on the day.
            </p>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/tours" className="btn btn--primary btn--lg">See Our Tours →</Link>
              <a href="https://m.me/61562040673545" target="_blank" rel="noopener noreferrer" className="btn btn--outline-light">💬 Message Us</a>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}
