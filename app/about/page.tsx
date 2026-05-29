import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Meet the team behind Laagan Adventure — Ivy Sanchez Eisma and James Ignacio, your trusted local tour guides in Zamboanga City. DTI registered, officially launched March 2026.',
}

const founders = [
  {
    name: 'Ivy Sanchez Eisma',
    role: 'Founder & CEO',
    bio: 'Ivy is the heart of Laagan Adventure. A proud Zamboangueña, she built this company on the belief that the best travel experience comes from someone who genuinely loves their home. She handles operations, guest experience, and makes sure every tour runs perfectly.',
    photo: '/images/ivy.jpg',
  },
  {
    name: 'James Ignacio',
    role: 'Co-Founder & CGO',
    bio: 'James leads growth and the digital side of the business. He&rsquo;s passionate about putting Zamboanga City on the map for travelers who want something more real than a typical tourist package.',
    photo: '/images/james.jpg',
  },
]

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: 'var(--nav-h)' }}>

        {/* Header */}
        <div style={{ background: 'var(--navy)', padding: '64px 0 56px' }}>
          <div className="container">
            <p className="section__label">About Us</p>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#fff', letterSpacing: '-.03em', marginBottom: '12px' }}>
              Born in Zamboanga. Built for travelers.
            </h1>
            <p style={{ color: 'rgba(255,255,255,.65)', fontSize: '1.05rem', maxWidth: '520px', lineHeight: 1.7 }}>
              We&rsquo;re a local team that shows you the Zamboanga City most tourists never get to see.
            </p>
          </div>
        </div>

        {/* Story */}
        <section className="section">
          <div className="container" style={{ maxWidth: '820px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
              <div>
                <p className="section__label">Our Story</p>
                <h2 className="section__title">Started from a love for this city.</h2>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.85, marginBottom: '16px' }}>
                  Laagan Adventure started in 2023 with a simple frustration: visitors were leaving Zamboanga City having only seen the surface. The typical tours were rushed, impersonal, and missed everything that makes this place truly special.
                </p>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.85, marginBottom: '16px' }}>
                  So Ivy and James decided to build something different — a tour service run by locals, for people who want a real experience. Not just a ticket to Santa Cruz Island, but a guide who knows its history, its waters, and its stories.
                </p>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.85 }}>
                  In March 2026, Laagan Adventure was officially registered — and we&rsquo;ve been showing people the best of Zamboanga ever since.
                </p>
              </div>

              {/* Photo placeholder — replace src with a real team/location photo */}
              <div style={{ borderRadius: 'var(--rl)', aspectRatio: '4/5', overflow: 'hidden', background: 'var(--bg-2)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/team.jpg"
                  alt="Laagan Adventure team"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={undefined}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Founders */}
        <section className="section section--alt">
          <div className="container" style={{ maxWidth: '820px' }}>
            <p className="section__label">The Team</p>
            <h2 className="section__title">The people behind every tour.</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginTop: '40px' }}>
              {founders.map(f => (
                <div key={f.name} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--rl)', overflow: 'hidden' }}>
                  {/* Photo */}
                  <div style={{ aspectRatio: '4/3', background: 'var(--navy)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={f.photo}
                      alt={f.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ padding: '24px' }}>
                    <p style={{ fontSize: '.7rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--pink)', marginBottom: '4px' }}>
                      {f.role}
                    </p>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '10px' }}>{f.name}</h3>
                    <p style={{ fontSize: '.85rem', color: 'var(--text-muted)', lineHeight: 1.75 }} dangerouslySetInnerHTML={{ __html: f.bio }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust */}
        <section className="section">
          <div className="container" style={{ maxWidth: '820px' }}>
            <p className="section__label">Why Trust Us</p>
            <h2 className="section__title">Legitimate. Professional. Local.</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '40px' }}>
              {[
                { icon: '📋', title: 'DTI Registered',           desc: 'Officially registered under the Department of Trade and Industry. You&rsquo;re booking with a legitimate, accountable business.' },
                { icon: '🧾', title: 'BIR Receipts Available',   desc: 'Official receipts available for all transactions — whether for personal records or corporate reimbursement.' },
                { icon: '📍', title: 'Based in Zamboanga City',  desc: 'We live and work here. Always reachable before, during, and after your tour — no offshore call centers.' },
                { icon: '🌊', title: 'Personally Guided Tours',  desc: 'Every tour is handled by Ivy or James directly. You&rsquo;re not handed off to a stranger — you get the founders.' },
              ].map(item => (
                <div key={item.title} style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--rl)', padding: '28px' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{item.icon}</div>
                  <h3 style={{ fontWeight: 700, color: 'var(--navy)', marginBottom: '8px' }}>{item.title}</h3>
                  <p style={{ fontSize: '.85rem', color: 'var(--text-muted)', lineHeight: 1.75 }} dangerouslySetInnerHTML={{ __html: item.desc }} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: 'var(--navy)', padding: '72px 0' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 800, color: '#fff', marginBottom: '16px', letterSpacing: '-.03em' }}>
              Ready to explore Zamboanga?
            </h2>
            <p style={{ color: 'rgba(255,255,255,.7)', marginBottom: '32px', maxWidth: '440px', margin: '0 auto 32px', lineHeight: 1.7 }}>
              Message us on Messenger and we&rsquo;ll plan your perfect adventure.
            </p>
            <Link href="/tours" className="btn btn--primary">Browse Our Tours →</Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
