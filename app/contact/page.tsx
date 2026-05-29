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

const HIGHLIGHTS = [
  { icon: '🏖️', title: 'Santa Cruz Island', sub: 'Pink sand · Crystal water' },
  { icon: '🏛️', title: 'City Heritage Tour', sub: 'Forts · Mosques · History' },
  { icon: '⛵', title: 'Island Hopping', sub: 'Multiple islands · Full day' },
  { icon: '🗺️', title: 'ZambaSulta + ZamPen', sub: 'Two provinces · One trip' },
]

export default function ContactPage({
  searchParams,
}: {
  searchParams: { tour?: string; date?: string; guests?: string }
}) {
  const defaultTour   = searchParams.tour   ?? ''
  const defaultDate   = searchParams.date   ?? ''
  const defaultGuests = searchParams.guests ?? ''

  return (
    <>
      <Nav />
      <main style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

        <div className="contact-split" style={{ flex: 1 }}>

          {/* ── LEFT PANEL — dark, sticky ── */}
          <div className="contact-panel-left">
            <div>
              <p style={{ fontSize: '.65rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,.4)', marginBottom: '20px' }}>
                Laagan Adventure · Zamboanga City
              </p>
              <h1 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, color: '#fff', letterSpacing: '-.03em', lineHeight: 1.15, marginBottom: '16px' }}>
                Let&rsquo;s plan your<br />
                <span style={{ color: 'var(--pink)' }}>Zamboanga adventure.</span>
              </h1>
              <p style={{ fontSize: '.9rem', color: 'rgba(255,255,255,.55)', lineHeight: 1.75, marginBottom: '40px', maxWidth: '340px' }}>
                No upfront payment. No booking fees. Just tell us when you want to go and we&rsquo;ll handle everything.
              </p>

              {/* Tour highlights */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
                {HIGHLIGHTS.map(h => (
                  <div key={h.title} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 16px', borderRadius: '10px', background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.08)' }}>
                    <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{h.icon}</span>
                    <div>
                      <p style={{ fontSize: '.88rem', fontWeight: 700, color: '#fff', lineHeight: 1 }}>{h.title}</p>
                      <p style={{ fontSize: '.72rem', color: 'rgba(255,255,255,.4)', marginTop: '3px' }}>{h.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact details */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,.1)', paddingTop: '28px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                {[
                  { icon: '📞', text: '0905-243-5196 / 0926-904-8927' },
                  { icon: '📧', text: 'ivyeisma255@gmail.com' },
                  { icon: '📍', text: 'Baliwasan, Zamboanga City' },
                ].map(c => (
                  <div key={c.text} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <span style={{ fontSize: '1rem', flexShrink: 0 }}>{c.icon}</span>
                    <span style={{ fontSize: '.82rem', color: 'rgba(255,255,255,.55)' }}>{c.text}</span>
                  </div>
                ))}
              </div>
              <a
                href="https://m.me/61562040673545"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  background: 'var(--pink)', color: '#fff',
                  fontWeight: 800, fontSize: '.78rem', letterSpacing: '.04em',
                  padding: '12px 22px', borderRadius: '8px',
                  textDecoration: 'none', transition: 'opacity .15s',
                }}
              >
                💬 Message on Messenger
              </a>
            </div>
          </div>

          {/* ── RIGHT PANEL — form ── */}
          <div className="contact-panel-right">
            <p style={{ fontSize: '.65rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>
              Inquiry form
            </p>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--navy)', letterSpacing: '-.02em', marginBottom: '32px' }}>
              Tell us about your trip
            </h2>

            <form action="https://formspree.io/f/xpwzgwnn" method="POST">
              <input type="hidden" name="_subject" value="New Tour Inquiry — Laagan Adventure" />

              <div className="form-row">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input type="text" name="name" required placeholder="Juan dela Cruz" />
                </div>
                <div className="form-group">
                  <label>Phone / Viber *</label>
                  <input type="tel" name="phone" required placeholder="09XX-XXX-XXXX" />
                </div>
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input type="email" name="email" placeholder="your@email.com" />
              </div>

              <div className="form-group">
                <label>Tour Package *</label>
                <select name="tour" required defaultValue={defaultTour}>
                  <option value="" disabled>Select a tour…</option>
                  {TOURS.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Preferred Date *</label>
                  <input type="date" name="date" required defaultValue={defaultDate} />
                </div>
                <div className="form-group">
                  <label>Group Size *</label>
                  <input type="number" name="group_size" required min="1" placeholder="e.g. 4" defaultValue={defaultGuests} />
                </div>
              </div>

              <div className="form-group">
                <label>Message / Special Requests</label>
                <textarea name="message" rows={4} placeholder="Any questions, special requests, or details about your group…" />
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  background: 'var(--pink)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '16px',
                  fontFamily: 'inherit',
                  fontSize: '.88rem',
                  fontWeight: 800,
                  letterSpacing: '.04em',
                  cursor: 'pointer',
                  transition: 'opacity .15s, transform .15s',
                }}
              >
                Send Inquiry →
              </button>

              <p style={{ fontSize: '.72rem', color: 'var(--text-muted)', marginTop: '12px', textAlign: 'center' }}>
                We reply within 24 hours · No payment required to inquire
              </p>
            </form>
          </div>

        </div>

      </main>
      <Footer />
    </>
  )
}
