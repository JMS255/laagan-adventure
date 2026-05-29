import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ContactFlow from '@/components/ContactFlow'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Plan your Zamboanga City tour with Laagan Adventure. Choose your tour type and connect with us directly on Messenger.',
}

export default function ContactPage({
  searchParams,
}: {
  searchParams: { tour?: string }
}) {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: 'var(--nav-h)', background: 'var(--bg-2)', minHeight: '100vh' }}>

        {/* Header */}
        <div style={{ background: 'var(--navy)', padding: '72px 0 100px', textAlign: 'center' }}>
          <div className="container" style={{ maxWidth: '600px' }}>
            <p className="section__label">Laagan Adventure · Zamboanga City</p>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#fff', letterSpacing: '-.03em', lineHeight: 1.15, marginBottom: '14px' }}>
              Plan your perfect<br />
              <span style={{ color: 'var(--pink)', fontStyle: 'italic' }}>Zamboanga adventure.</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,.6)', fontSize: '.95rem', lineHeight: 1.7 }}>
              No booking fees. No upfront payment.<br />Just tell us what you need.
            </p>
          </div>
        </div>

        {/* Flow card — overlaps header */}
        <div className="container" style={{ marginTop: '-56px', paddingBottom: '64px' }}>
          <div style={{
            background: '#fff',
            borderRadius: '28px',
            padding: '52px 40px',
            boxShadow: '0 12px 60px rgba(0,40,70,.12)',
            border: '1px solid var(--border)',
          }}>
            <ContactFlow initialTour={searchParams.tour} />
          </div>
        </div>

      </main>
      <Footer />
    </>
  )
}
