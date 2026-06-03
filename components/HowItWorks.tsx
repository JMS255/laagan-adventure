const STEPS = [
  { num: '1', time: '2 minutes', title: 'Choose Your Tour', desc: 'Browse our packages and pick what excites you. No account needed.' },
  { num: '2', time: 'Within 24 hours', title: 'We Confirm via Messenger', desc: 'Send us a message and we reply within 24 hours to lock in your date.' },
  { num: '3', time: 'On the day', title: 'Small Deposit, Rest on Arrival', desc: 'Cash or GCash when you arrive. No upfront payment, no booking fees.' },
]

export default function HowItWorks() {
  return (
    <section className="section--darker" style={{ padding: '80px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p className="section__label" style={{ textAlign: 'center' }}>Simple process</p>
          <h2 className="section__title section__title--light" style={{ textAlign: 'center', margin: '0 auto' }}>
            Booking is easier than you think.
          </h2>
        </div>
        <div className="how-grid">
          {STEPS.map(step => (
            <div key={step.num} className="how-step">
              <div className="how-step__num">{step.num}</div>
              <p className="how-step__time">{step.time}</p>
              <h3 className="how-step__title">{step.title}</h3>
              <p className="how-step__desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
