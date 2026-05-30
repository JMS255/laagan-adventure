const STEPS = [
  {
    num: '01',
    title: 'Choose your tour',
    desc: 'Browse our packages and pick what excites you. Takes about 2 minutes.',
    detail: 'No account needed.',
  },
  {
    num: '02',
    title: 'We confirm via Messenger',
    desc: 'Send us a message and we reply within 24 hours to lock in your date.',
    detail: 'Real people, real answers.',
  },
  {
    num: '03',
    title: 'Pay on the day',
    desc: 'Cash or GCash when you arrive. No upfront payment, no booking fees.',
    detail: 'Free cancellation 24hrs before.',
  },
]

export default function HowItWorks() {
  return (
    <section style={{ background: 'var(--navy)', padding: '72px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p className="section__label">Simple process</p>
          <h2 style={{
            fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 800,
            color: '#fff', letterSpacing: '-.03em', lineHeight: 1.15,
            fontFamily: 'var(--font-display, Georgia), serif',
          }}>
            Booking is easier than you think.
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2px',
          background: 'rgba(255,255,255,.08)',
          borderRadius: 'var(--rl)',
          overflow: 'hidden',
        }}
          className="how-it-works-grid"
        >
          {STEPS.map((step, i) => (
            <div key={step.num} style={{
              padding: '40px 36px',
              background: 'var(--navy)',
              borderRight: i < STEPS.length - 1 ? '1px solid rgba(255,255,255,.1)' : 'none',
              position: 'relative',
            }}>
              <p style={{
                fontSize: '3rem', fontWeight: 900, color: 'rgba(255,255,255,.08)',
                lineHeight: 1, marginBottom: '20px', letterSpacing: '-.04em',
                fontFamily: 'var(--font-display, Georgia), serif',
              }}>
                {step.num}
              </p>
              <h3 style={{
                fontSize: '1.05rem', fontWeight: 800, color: '#fff',
                marginBottom: '10px', letterSpacing: '-.02em',
              }}>
                {step.title}
              </h3>
              <p style={{
                fontSize: '.88rem', color: 'rgba(255,255,255,.6)',
                lineHeight: 1.7, marginBottom: '12px',
              }}>
                {step.desc}
              </p>
              <p style={{
                fontSize: '.72rem', fontWeight: 700, letterSpacing: '.06em',
                textTransform: 'uppercase', color: 'var(--pink)',
              }}>
                {step.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
