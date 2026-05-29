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
      <main style={{ paddingTop: 'var(--nav-h)', background: 'var(--bg-2)', minHeight: '100vh' }}>

        {/* Header */}
        <div style={{ background: 'var(--navy)', padding: '64px 0 80px' }}>
          <div className="container" style={{ maxWidth: '720px', textAlign: 'center' }}>
            <p className="section__label" style={{ color: 'var(--pink)' }}>No upfront payment · Reply within 24 hours</p>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#fff', letterSpacing: '-.03em', lineHeight: 1.15, marginBottom: '14px' }}>
              Let&rsquo;s plan your Zamboanga adventure.
            </h1>
            <p style={{ color: 'rgba(255,255,255,.6)', fontSize: '1rem', lineHeight: 1.7 }}>
              Tell us what you&rsquo;re looking for. We&rsquo;ll handle everything else.
            </p>
          </div>
        </div>

        {/* Form card */}
        <div className="container" style={{ maxWidth: '720px', marginTop: '-40px', paddingBottom: '80px' }}>
          <div style={{
            background: '#fff',
            borderRadius: '24px',
            padding: '48px',
            boxShadow: '0 8px 48px rgba(0,40,70,.10)',
            border: '1px solid var(--border)',
          }}>
            <form action="https://formspree.io/f/xqejjkbp" method="POST">
              <input type="hidden" name="_subject" value="New Tour Inquiry — Laagan Adventure" />

              <div className="form-row" style={{ marginBottom: 0 }}>
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

              <div className="form-row" style={{ marginBottom: 0 }}>
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
                  borderRadius: '12px',
                  padding: '18px',
                  fontFamily: 'inherit',
                  fontSize: '.95rem',
                  fontWeight: 800,
                  letterSpacing: '.03em',
                  cursor: 'pointer',
                  transition: 'background .2s, transform .2s',
                }}
              >
                Send Inquiry →
              </button>

              <p style={{ fontSize: '.75rem', color: 'var(--text-muted)', marginTop: '12px', textAlign: 'center', lineHeight: 1.6 }}>
                We reply within 24 hours · No payment required to inquire
              </p>
            </form>
          </div>

          {/* Contact details row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
            marginTop: '24px',
          }}>
            {[
              { icon: '📞', label: 'Call or Viber', value: '0905-243-5196', href: 'tel:09052435196' },
              { icon: '💬', label: 'Facebook Messenger', value: 'Message us', href: 'https://m.me/61562040673545' },
              { icon: '📍', label: 'Based in', value: 'Baliwasan, Zamboanga City', href: undefined },
            ].map(c => (
              <div key={c.label} style={{
                background: '#fff',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                padding: '20px',
                textAlign: 'center',
              }}>
                <p style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{c.icon}</p>
                <p style={{ fontSize: '.65rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  {c.label}
                </p>
                {c.href ? (
                  <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                    style={{ fontSize: '.85rem', fontWeight: 700, color: 'var(--navy)', textDecoration: 'none' }}>
                    {c.value}
                  </a>
                ) : (
                  <p style={{ fontSize: '.85rem', fontWeight: 600, color: 'var(--navy)' }}>{c.value}</p>
                )}
              </div>
            ))}
          </div>
        </div>

      </main>
      <Footer />
    </>
  )
}
