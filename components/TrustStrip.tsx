const TRUST_POINTS = [
  { icon: '✅', text: 'Free Reschedule' },
  { icon: '💸', text: 'Pay on the Day' },
  { icon: '💰', text: 'Money-Back Guarantee' },
  { icon: '🌦', text: 'Weather Guarantee' },
  { icon: '🏛', text: 'DTI Registered' },
  { icon: '💬', text: 'Reply Within 24hrs' },
  { icon: '🧭', text: 'Professional Local Guide' },
]

export default function TrustStrip() {
  return (
    <section style={{ background: '#fff', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="container">
        <div className="trust-strip">
          {TRUST_POINTS.map(point => (
            <div key={point.text} className="trust-item">
              <span className="trust-item__icon">{point.icon}</span>
              <span className="trust-item__text">{point.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
