import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Book a Tour',
  description: 'Book your Zamboanga City tour with Laagan Adventure. Fill out the inquiry form and we\'ll get back to you within 24 hours.',
}

const TOURS = [
  'Santa Cruz Island Tour',
  'City Heritage Tour',
  'Island Hopping Package',
  'ZambaSulta + ZamPen Tour',
  'Custom / Group Tour',
]

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: 'var(--nav-h)' }}>

        {/* Header */}
        <div style={{ background: 'var(--navy)', padding: '64px 0 56px' }}>
          <div className="container">
            <p className="section__label">Book Now</p>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#fff', letterSpacing: '-.03em', marginBottom: '12px' }}>
              Let&rsquo;s plan your adventure.
            </h1>
            <p style={{ color: 'rgba(255,255,255,.7)', fontSize: '1rem', lineHeight: 1.7, maxWidth: '480px' }}>
              Fill out the form below and we&rsquo;ll get back to you within 24 hours. Or message us directly on Messenger.
            </p>
          </div>
        </div>

        <section className="section">
          <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '64px', alignItems: 'start' }}>

            {/* Form */}
            <div>
              <form action="https://formspree.io/f/xpwzgwnn" method="POST">
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input type="text" name="name" required placeholder="Juan dela Cruz" />
                  </div>
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input type="tel" name="phone" required placeholder="09XX-XXX-XXXX" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" name="email" placeholder="your@email.com" />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Tour Package *</label>
                    <select name="tour" required>
                      <option value="">Select a tour…</option>
                      {TOURS.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Preferred Date *</label>
                    <input type="date" name="date" required />
                  </div>
                </div>
                <div className="form-group">
                  <label>Group Size *</label>
                  <input type="number" name="group_size" required min="1" placeholder="e.g. 4" />
                </div>
                <div className="form-group">
                  <label>Message / Special Requests</label>
                  <textarea name="message" rows={4} placeholder="Any questions, special requests, or details about your group…" />
                </div>
                <button type="submit" className="btn btn--primary" style={{ width: '100%', justifyContent: 'center' }}>
                  Send Inquiry →
                </button>
                <p style={{ fontSize: '.75rem', color: 'var(--text-muted)', marginTop: '12px', textAlign: 'center' }}>
                  We reply within 24 hours · No payment required to inquire
                </p>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '24px' }}>Contact Details</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {[
                  { icon: '📞', label: 'Phone / Viber', value: '0905-243-5196 / 0926-904-8927' },
                  { icon: '📧', label: 'Email', value: 'ivyeisma255@gmail.com' },
                  { icon: '📍', label: 'Location', value: 'Baliwasan, Zamboanga City' },
                  { icon: '🕐', label: 'Response Time', value: 'Within 24 hours' },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '1.3rem', flexShrink: 0 }}>{item.icon}</span>
                    <div>
                      <p style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '3px' }}>{item.label}</p>
                      <p style={{ fontSize: '.9rem', color: 'var(--navy)', fontWeight: 600 }}>{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '36px', padding: '24px', background: 'rgba(245,166,35,.08)', border: '1px solid rgba(245,166,35,.25)', borderRadius: 'var(--rl)' }}>
                <p style={{ fontWeight: 700, color: 'var(--navy)', marginBottom: '8px' }}>💬 Prefer to message?</p>
                <p style={{ fontSize: '.85rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: 1.6 }}>
                  Most of our clients reach us through Facebook Messenger. Click below to chat directly.
                </p>
                <a href="https://m.me/61562040673545" target="_blank" rel="noopener noreferrer" className="btn btn--outline" style={{ fontSize: '.8rem', padding: '10px 20px' }}>
                  Message on Messenger →
                </a>
              </div>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
