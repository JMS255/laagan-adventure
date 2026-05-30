export const revalidate = 30

import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import BookingWidget from '@/components/BookingWidget'
import TestimonialCarousel from '@/components/TestimonialCarousel'
import TravelerFilter from '@/components/TravelerFilter'
import HowItWorks from '@/components/HowItWorks'
import GuestStoryBlock from '@/components/GuestStoryBlock'
import ScrollReveal from '@/components/ScrollReveal'
import TrustStrip from '@/components/TrustStrip'
import { client, urlFor, TOURS_QUERY, TESTIMONIALS_QUERY, GALLERY_QUERY } from '@/lib/sanity'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Laagan Adventure — Tour Services in Zamboanga City',
  description: 'Explore Zamboanga City with a trusted local guide. Santa Cruz Island, city tours, island hopping, and more. Book your adventure today.',
}

const TOUR_TYPES = [
  { tag: 'Island', name: 'Santa Cruz Island', desc: 'Pink sand. Crystal water.', price: 'From ₱1,500', gradient: 'linear-gradient(160deg, #0ea5e9, #0369a1, #1a2744)' },
  { tag: 'Culture', name: 'City Heritage Tour', desc: 'Forts, mosques, history.', price: 'From ₱800', gradient: 'linear-gradient(160deg, #d97706, #b45309, #1a2744)' },
  { tag: 'Adventure', name: 'Island Hopping', desc: 'Multiple islands. One day.', price: 'From ₱1,800', gradient: 'linear-gradient(160deg, #0d9488, #0f766e, #1a2744)' },
  { tag: 'Full Tour', name: 'ZambaSulta + ZamPen', desc: 'The complete Zamboanga.', price: 'From ₱2,500', gradient: 'linear-gradient(160deg, #7c3aed, #6d28d9, #1a2744)' },
]

const WHY = [
  { icon: '🏝️', title: 'Local Experts', desc: 'Born and raised here. We know every hidden spot and the best times to visit.' },
  { icon: '✅', title: 'DTI Registered', desc: 'Fully legitimate. BIR receipts available. You\'re in safe, professional hands.' },
  { icon: '💬', title: 'Always Available', desc: 'Real people, fast replies. Message us on Messenger anytime.' },
]

export default async function HomePage() {
  const [allTours, testimonials, galleryPhotos] = await Promise.all([
    client.fetch(TOURS_QUERY).catch(() => []),
    client.fetch(TESTIMONIALS_QUERY).catch(() => []),
    client.fetch(GALLERY_QUERY).catch(() => []),
  ])

  return (
    <>
      <Nav />

      <main>

        {/* ── HERO ── */}
        <section className="hero" style={{ minHeight: '100svh' }}>
          {/* Video background — drop hero-video.mp4 into /public to activate */}
          <video className="hero__video" autoPlay muted loop playsInline poster="/hero-bg.png">
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="hero__bg" />
          <div className="hero__overlay" />

          <div className="hero__inner">
            {/* Text content */}
            <div className="hero__content">
              <p className="hero__eyebrow">📍 Zamboanga City, Philippines</p>
              <h1 className="hero__title" style={{ maxWidth: '620px' }}>
                There&rsquo;s a beach in Zamboanga where the <span>sand is pink.</span> We&rsquo;ll take you there.
              </h1>
              <p className="hero__sub">
                Local-guided tours to Santa Cruz Island and beyond — no crowds, no complications. Just Zamboanga at its best.
              </p>
            </div>

            {/* Booking widget — pinned to bottom */}
            <div className="hero__widget-wrap" style={{ paddingBottom: '40px' }}>
              <BookingWidget />
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <div style={{ background: '#fff', borderBottom: '1px solid var(--border)' }}>
          <div className="container">
            <div className="stats-row">
              {[
                { num: '500+', label: 'Happy travelers' },
                { num: '10+', label: 'Tour packages' },
                { num: '5+', label: 'Years of experience' },
                { num: '⭐ 5.0', label: 'Average rating' },
              ].map((s, i, arr) => (
                <span key={s.label} style={{ display: 'contents' }}>
                  <div className="stat-item">
                    <p className="stat-item__num">{s.num}</p>
                    <p className="stat-item__label">{s.label}</p>
                  </div>
                  {i < arr.length - 1 && <div className="stat-divider" />}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── TOUR DISCOVERY + IDENTITY FILTER ── */}
        <TravelerFilter tours={allTours} />

        {/* ── HOW IT WORKS ── */}
        <HowItWorks />

        {/* ── GUEST STORY ── */}
        <ScrollReveal><GuestStoryBlock /></ScrollReveal>

        {/* ── SPOTLIGHT 1 — Santa Cruz ── */}
        <div className="spotlight">
          <div className="spotlight__image spotlight__image--gradient"
            style={{ background: 'linear-gradient(160deg, #0ea5e9 0%, #0369a1 50%, #1a2744 100%)', minHeight: '400px' }}>
            <div style={{ textAlign: 'center', color: 'rgba(255,255,255,.35)', letterSpacing: '.12em', fontSize: '.72rem', fontWeight: 700, textTransform: 'uppercase' }}>
              Santa Cruz Island · Photo coming soon
            </div>
          </div>
          <div className="spotlight__content" style={{ background: 'var(--bg-2)' }}>
            <p className="spotlight__eyebrow">Most Popular Tour</p>
            <h2 className="spotlight__title">Santa Cruz Island — the pink sand beach you have to see to believe.</h2>
            <p className="spotlight__desc">
              Santa Cruz Island is one of the Philippines&rsquo; most stunning natural attractions — a beach with naturally pink sand, crystal-clear water, and almost no crowds. We take you there and back, fully guided.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/contact?tour=Santa+Cruz+Island+Tour" className="btn btn--primary">Book This Tour</Link>
              <Link href="/tours" className="btn btn--outline">See All Tours</Link>
            </div>
          </div>
        </div>

        {/* ── SPOTLIGHT 2 — Why Laagan ── */}
        <div className="spotlight">
          <div className="spotlight__content" style={{ background: 'var(--navy)' }}>
            <p className="spotlight__eyebrow">Why Book With Us</p>
            <h2 className="spotlight__title" style={{ color: '#fff' }}>A local guide makes all the difference.</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
              {WHY.map(w => (
                <div key={w.title} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{w.icon}</span>
                  <div>
                    <p style={{ fontWeight: 700, color: '#fff', marginBottom: '4px', fontSize: '.9rem' }}>{w.title}</p>
                    <p style={{ fontSize: '.82rem', color: 'rgba(255,255,255,.65)', lineHeight: 1.6 }}>{w.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/about" className="btn btn--outline-light">Learn About Us</Link>
          </div>
          <div className="spotlight__image spotlight__image--gradient"
            style={{ background: 'linear-gradient(160deg, #d97706 0%, #92400e 50%, #1a2744 100%)', minHeight: '400px' }}>
            <div style={{ textAlign: 'center', color: 'rgba(255,255,255,.35)', letterSpacing: '.12em', fontSize: '.72rem', fontWeight: 700, textTransform: 'uppercase' }}>
              Zamboanga City · Photo coming soon
            </div>
          </div>
        </div>

        {/* ── TRUST STRIP ── */}
        <TrustStrip />

        {/* ── TESTIMONIALS ── */}
        <ScrollReveal>
        <section className="section" style={{ background: '#fff' }}>
          <div className="container">
            <p className="section__label" style={{ textAlign: 'center' }}>What travelers say</p>
            <h2 className="section__title" style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 48px' }}>
              Real words from real travelers.
            </h2>
            <TestimonialCarousel testimonials={testimonials} />
          </div>
        </section>
        </ScrollReveal>

        {/* ── SOCIAL PROOF PHOTO WALL ── */}
        {galleryPhotos.length > 0 && (
          <section style={{ padding: '80px 0', background: 'var(--bg-2)' }}>
            <div className="container">
              <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <p className="section__label">Traveler photos</p>
                <h2 className="section__title" style={{ margin: '0 auto 8px' }}>#LaaganaAdventure</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '.9rem' }}>Real moments from real travelers</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                {(galleryPhotos as { _id: string; image: object; caption: string }[]).slice(0, 6).map((photo, i) => (
                  <div key={photo._id} style={{
                    gridColumn: (i === 0 || i === 5) ? 'span 2' : 'span 1',
                    aspectRatio: (i === 0 || i === 5) ? '16/9' : '1/1',
                    overflow: 'hidden', borderRadius: 'var(--r)',
                    background: 'var(--border)',
                  }}>
                    <img
                      src={urlFor(photo.image).width(800).height(600).url()}
                      alt={photo.caption || 'Laagan Adventure tour photo'}
                      className="social-photo"
                    />
                  </div>
                ))}
              </div>
              <div style={{ textAlign: 'center', marginTop: '32px' }}>
                <Link href="/gallery" className="btn btn--outline">See All Photos →</Link>
              </div>
            </div>
          </section>
        )}

        {/* ── GROUP TOURS ── */}
        <ScrollReveal>
        <section style={{ background: 'var(--bg-2)', padding: '0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            {[
              { icon: '🎓', title: 'School & Group Tours', desc: 'Educational and recreational tours for schools, organizations, and large groups. Custom itineraries, group rates, and full coordination.', cta: 'Inquire for Groups', tour: 'Custom / Group Tour' },
              { icon: '🏢', title: 'Corporate & Team Outings', desc: 'Teambuilding events, company outings, and incentive trips. We handle the logistics so you can focus on the experience.', cta: 'Plan a Corporate Tour', tour: 'Custom / Group Tour' },
            ].map(item => (
              <div key={item.title} style={{ padding: '56px 48px', borderRight: '1px solid var(--border)' }}>
                <p style={{ fontSize: '2.5rem', marginBottom: '16px' }}>{item.icon}</p>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '12px', letterSpacing: '-.02em' }}>{item.title}</h3>
                <p style={{ fontSize: '.85rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '24px' }}>{item.desc}</p>
                <Link href={`/contact?tour=${encodeURIComponent(item.tour)}`} className="btn btn--outline" style={{ fontSize: '.8rem', padding: '10px 22px' }}>{item.cta}</Link>
              </div>
            ))}
          </div>
        </section>
        </ScrollReveal>

        {/* ── FINAL CTA ── */}
        <section style={{ background: 'var(--navy)', padding: '96px 0' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--pink)', marginBottom: '16px' }}>
              Ready to explore?
            </p>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 800, color: '#fff', letterSpacing: '-.02em', lineHeight: 1.15, marginBottom: '20px', maxWidth: '560px', margin: '0 auto 20px', fontStyle: 'italic' }}>
              Your Zamboanga adventure starts with one message.
            </h2>
            <p style={{ color: 'rgba(255,255,255,.65)', marginBottom: '40px', maxWidth: '440px', margin: '0 auto 40px', lineHeight: 1.7 }}>
              No booking fees. No upfront payment. Just tell us what you&rsquo;re looking for and we&rsquo;ll plan the perfect trip.
            </p>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn btn--primary" style={{ fontSize: '.9rem', padding: '16px 36px' }}>Plan My Tour →</Link>
              <a href="https://m.me/61562040673545" target="_blank" rel="noopener noreferrer" className="btn btn--outline-light">Message on Messenger</a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
