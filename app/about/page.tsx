import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Laagan Adventure — your trusted local tour guide in Zamboanga City. DTI registered, BIR receipts available.',
}

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: 'var(--nav-h)' }}>

        {/* Header */}
        <div style={{ background: 'var(--navy)', padding: '64px 0 56px' }}>
          <div className="container">
            <p className="section__label">About</p>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#fff', letterSpacing: '-.03em' }}>
              Your local guide to Zamboanga City
            </h1>
          </div>
        </div>

        {/* Story */}
        <section className="section">
          <div className="container" style={{ maxWidth: '780px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '56px', alignItems: 'center' }}>
              <div>
                <p className="section__label">Our Story</p>
                <h2 className="section__title">Born here. Built for you.</h2>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '16px' }}>
                  Laagan Adventure was built on one simple belief: the best travel experience comes from people who actually live there. We&rsquo;re not a big corporation or a booking platform. We&rsquo;re a local family-run tour service based in Baliwasan, Zamboanga City.
                </p>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '16px' }}>
                  We started because we wanted to show travelers the real Zamboanga — the hidden beaches, the authentic culture, the local food, and the stories behind every landmark. Places that don&rsquo;t show up in travel blogs.
                </p>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
                  Every tour is personally handled. We pick you up, guide you through, and make sure you leave with memories worth keeping.
                </p>
              </div>
              <div style={{ background: 'var(--bg-2)', borderRadius: 'var(--rl)', aspectRatio: '3/4', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '.85rem' }}>Team photo</p>
              </div>
            </div>
          </div>
        </section>

        {/* Trust */}
        <section className="section section--alt">
          <div className="container" style={{ maxWidth: '780px' }}>
            <p className="section__label">Why Trust Us</p>
            <h2 className="section__title">Legitimate. Professional. Local.</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '40px' }}>
              {[
                { icon: '📋', title: 'DTI Registered', desc: 'We are a registered business under the Department of Trade and Industry. Fully legitimate and accountable.' },
                { icon: '🧾', title: 'BIR Receipts Available', desc: 'Official receipts available for all transactions. Proper documentation for your bookings.' },
                { icon: '📍', title: 'Based in Zamboanga City', desc: 'Baliwasan, Zamboanga City. We are always here and reachable — before, during, and after your tour.' },
                { icon: '⭐', title: '5-Star Service', desc: 'Hundreds of happy travelers trust us with their Zamboanga experience. Their reviews speak for us.' },
              ].map(item => (
                <div key={item.title} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--rl)', padding: '28px' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{item.icon}</div>
                  <h3 style={{ fontWeight: 700, color: 'var(--navy)', marginBottom: '8px' }}>{item.title}</h3>
                  <p style={{ fontSize: '.85rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: 'var(--navy)', padding: '72px 0' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 800, color: '#fff', marginBottom: '16px', letterSpacing: '-.03em' }}>
              Ready to explore?
            </h2>
            <p style={{ color: 'rgba(255,255,255,.7)', marginBottom: '32px' }}>Message us and we&rsquo;ll plan your perfect Zamboanga adventure.</p>
            <Link href="/contact" className="btn btn--primary">Book a Tour →</Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
