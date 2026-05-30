export default function GuestStoryBlock() {
  return (
    <section style={{
      background: 'var(--navy-2)',
      padding: '96px 0',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative background element */}
      <div style={{
        position: 'absolute', top: '-60px', right: '-60px',
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(217,107,138,.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>

          <p className="section__label" style={{ marginBottom: '32px' }}>A guest story</p>

          {/* Opening quote mark */}
          <p style={{
            fontSize: '5rem', lineHeight: .8, color: 'var(--pink)',
            marginBottom: '24px', fontFamily: 'Georgia, serif', opacity: .6,
          }}>
            "
          </p>

          <blockquote style={{
            fontSize: 'clamp(1.1rem, 2.2vw, 1.5rem)',
            fontWeight: 600, color: '#fff',
            lineHeight: 1.7, letterSpacing: '-.01em',
            fontFamily: 'var(--font-display, Georgia), serif',
            fontStyle: 'italic',
            marginBottom: '36px',
          }}>
            We almost didn&rsquo;t go because we thought it would be too far, too complicated.
            But James met us at the port at 6am with the broadest smile, and two hours later we were
            standing on pink sand with no one else around. My daughter still talks about it every week.
          </blockquote>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <p style={{ fontWeight: 700, color: '#fff', fontSize: '.95rem' }}>Maria Santos</p>
            <p style={{ fontSize: '.8rem', color: 'rgba(255,255,255,.45)' }}>
              Santa Cruz Island Tour · Zamboanga City, 2025
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
