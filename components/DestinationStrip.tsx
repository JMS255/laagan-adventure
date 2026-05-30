import Link from 'next/link'
import { DESTINATIONS } from '@/lib/destinations'

export default function DestinationStrip() {
  return (
    <section style={{ background: 'var(--bg-2)', padding: '72px 0' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '12px', marginBottom: '36px' }}>
          <div>
            <p className="section__label">Explore by destination</p>
            <h2 className="section__title" style={{ marginBottom: 0 }}>Where do you want to go?</h2>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }} className="dest-strip-grid">
          {DESTINATIONS.map(dest => (
            <Link
              key={dest.slug}
              href={`/destinations/${dest.slug}`}
              style={{
                background: dest.heroGradient,
                borderRadius: '18px',
                overflow: 'hidden',
                position: 'relative',
                minHeight: '240px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                textDecoration: 'none',
                transition: 'transform .3s, box-shadow .3s',
              }}
              className="dest-strip-card"
            >
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(0,15,40,.85) 0%, rgba(0,15,40,.1) 60%, transparent 100%)',
              }} />
              <div style={{ position: 'relative', padding: '24px 22px' }}>
                <p style={{ fontSize: '.65rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--pink)', marginBottom: '6px' }}>
                  Zamboanga Region
                </p>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fff', lineHeight: 1.2, marginBottom: '6px', letterSpacing: '-.01em' }}>
                  {dest.name}
                </h3>
                <p style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.7)', lineHeight: 1.5, marginBottom: '14px' }}>
                  {dest.tagline}
                </p>
                <span style={{ fontSize: '.72rem', fontWeight: 700, color: '#fff', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  Explore →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
