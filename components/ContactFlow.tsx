'use client'

import { useState } from 'react'

const TOURS = [
  'Santa Cruz Island Tour',
  'City Heritage Tour',
  'Island Hopping Package',
  'ZambaSulta + ZamPen Tour',
  'Custom / Group Tour',
]

const DESTINATIONS = [
  { id: 'zamboanga', icon: '🌴', name: 'Zamboanga City',    desc: 'Santa Cruz Island · Fort Pilar · Once Islas' },
  { id: 'basilan',  icon: '🏖️', name: 'Basilan Province',  desc: 'Malamawi White Beach · Bulingan Falls' },
  { id: 'sulu',     icon: '⛵', name: 'Sulu Province',      desc: 'Bangau-Bangau · Historic Jolo Sites' },
  { id: 'tawi',     icon: '🏔️', name: 'Tawi-Tawi',          desc: 'Bud Bongao Peak · Sheik Makhdum Mosque' },
]

const FAQS = [
  { q: 'Is Zamboanga City safe for tourists?', a: 'Yes. Tourist areas like the waterfront, Fort Pilar, and Santa Cruz Island are safe and regularly patrolled. We\'ve been operating since 2023 without incident, and our guides know the city deeply.' },
  { q: 'Do I need permits to visit Santa Cruz Island?', a: 'Yes, a permit is required — but we handle it for you. All permits are included in your tour package. You just show up.' },
  { q: 'What should I bring?', a: 'Reef-safe sunscreen (required on the island), a waterproof bag, extra clothes, cash, and plenty of water. We recommend snorkel gear if you have it.' },
  { q: 'How does payment work?', a: 'No upfront payment. We collect on the day of the tour via cash or GCash. We\'ll confirm the booking with you first before anything is paid.' },
  { q: 'Can I cancel or reschedule?', a: 'Yes — free of charge with at least 24 hours notice. We\'re flexible and understand that plans change.' },
]

type Intent = 'joiners' | 'private' | 'faq' | null

function buildJoinersMessage(tour: string, date: string, guests: string, name: string, phone: string) {
  const parts = [
    `Hi Laagan! 👋`,
    tour    ? `I'd like to book the *${tour}*` : `I'd like to book a tour`,
    date    ? `on *${date}*` : '',
    guests  ? `for *${guests} guest(s)*` : '',
    name    ? `My name is ${name}` : '',
    phone   ? `and my contact number is ${phone}.` : '.',
    `\n\nCould you confirm availability? Thank you!`,
  ]
  return parts.filter(Boolean).join(' ')
}

function buildPrivateMessage(guests: string, destinations: string[], date: string, name: string, phone: string, notes: string) {
  const destList = destinations.length > 0 ? destinations.join(', ') : 'your destinations'
  const parts = [
    `Hi Laagan! 👋`,
    `I'm planning a *private group charter* for *${guests || '?'} guests* to: *${destList}*.`,
    date  ? `Preferred date: *${date}*.` : '',
    name  ? `My name is ${name}` : '',
    phone ? `and my contact number is ${phone}.` : '',
    notes ? `\n\nAdditional notes: ${notes}` : '',
    `\n\nPlease send me a custom quote. Thank you!`,
  ]
  return parts.filter(Boolean).join(' ')
}

function messengerLink(msg: string) {
  return `https://m.me/61562040673545?text=${encodeURIComponent(msg)}`
}

// ── Shared card style ──────────────────────────────────────────────
const card: React.CSSProperties = {
  background: '#fff',
  border: '2px solid var(--border)',
  borderRadius: '20px',
  padding: '32px 28px',
  cursor: 'pointer',
  textAlign: 'center',
  transition: 'border-color .2s, transform .2s, box-shadow .2s',
  textDecoration: 'none',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10px',
}

// ── Back button ────────────────────────────────────────────────────
function BackBtn({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} style={{
      background: 'none', border: 'none', cursor: 'pointer',
      fontSize: '.82rem', fontWeight: 700, color: 'var(--text-muted)',
      display: 'flex', alignItems: 'center', gap: '6px', padding: 0,
      fontFamily: 'inherit', marginBottom: '28px',
    }}>
      ← Back
    </button>
  )
}

// ── FAQ accordion ─────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {FAQS.map((f, i) => (
        <div key={i} style={{ border: '1px solid var(--border)', borderRadius: '14px', overflow: 'hidden' }}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            style={{
              width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '18px 20px', background: open === i ? 'var(--bg-2)' : '#fff',
              border: 'none', cursor: 'pointer', fontFamily: 'inherit',
              fontSize: '.9rem', fontWeight: 700, color: 'var(--navy)', textAlign: 'left', gap: '12px',
            }}
          >
            {f.q}
            <span style={{ flexShrink: 0, fontSize: '.8rem', color: 'var(--pink)', transition: 'transform .2s', transform: open === i ? 'rotate(180deg)' : 'none' }}>▼</span>
          </button>
          {open === i && (
            <div style={{ padding: '0 20px 20px', fontSize: '.88rem', color: 'var(--text-muted)', lineHeight: 1.75 }}>
              {f.a}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────
export default function ContactFlow({ initialTour }: { initialTour?: string }) {
  const [intent, setIntent] = useState<Intent>(null)

  // Joiners state
  const [jTour,   setJTour]   = useState(initialTour ?? '')
  const [jDate,   setJDate]   = useState('')
  const [jGuests, setJGuests] = useState('2')
  const [jName,   setJName]   = useState('')
  const [jPhone,  setJPhone]  = useState('')

  // Private state
  const [pGuests, setPGuests] = useState('6')
  const [pDests,  setPDests]  = useState<string[]>(['Zamboanga City'])
  const [pDate,   setPDate]   = useState('')
  const [pName,   setPName]   = useState('')
  const [pPhone,  setPPhone]  = useState('')
  const [pNotes,  setPNotes]  = useState('')

  function toggleDest(name: string) {
    setPDests(d => d.includes(name) ? d.filter(x => x !== name) : [...d, name])
  }

  // ── PHASE 0: intent selector ─────────────────────────────────────
  if (!intent) {
    return (
      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0 20px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <p className="section__label">We&rsquo;re here to help</p>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, color: 'var(--navy)', letterSpacing: '-.03em', lineHeight: 1.2 }}>
            How can we help you<br />plan your getaway?
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {[
            { id: 'joiners' as Intent,  icon: '👥', label: 'Join a Shared Tour',       sub: '1–5 travelers · split cost' },
            { id: 'private' as Intent,  icon: '🔑', label: 'Private Group Charter',    sub: '6+ pax · exclusive dates' },
            { id: 'faq'     as Intent,  icon: '🙋', label: 'General Question',          sub: 'Safety, tips, logistics' },
          ].map(opt => (
            <button
              key={opt.id!}
              onClick={() => setIntent(opt.id)}
              style={{
                ...card,
                border: '2px solid var(--border)',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget
                el.style.borderColor = 'var(--pink)'
                el.style.transform = 'translateY(-4px)'
                el.style.boxShadow = '0 12px 40px rgba(217,107,138,.15)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget
                el.style.borderColor = 'var(--border)'
                el.style.transform = 'none'
                el.style.boxShadow = 'none'
              }}
            >
              <span style={{ fontSize: '2.4rem' }}>{opt.icon}</span>
              <span style={{ fontSize: '.95rem', fontWeight: 800, color: 'var(--navy)', lineHeight: 1.3 }}>{opt.label}</span>
              <span style={{ fontSize: '.72rem', color: 'var(--text-muted)', fontWeight: 500 }}>{opt.sub}</span>
            </button>
          ))}
        </div>

        <p style={{ textAlign: 'center', fontSize: '.75rem', color: 'var(--text-muted)', marginTop: '24px' }}>
          Prefer to message directly?{' '}
          <a href="https://m.me/61562040673545" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--pink)', fontWeight: 700, textDecoration: 'none' }}>
            Chat with us on Messenger →
          </a>
        </p>
      </div>
    )
  }

  // ── PHASE 1a: Shared joiners ─────────────────────────────────────
  if (intent === 'joiners') {
    const msg  = buildJoinersMessage(jTour, jDate, jGuests, jName, jPhone)
    const href = messengerLink(msg)
    const ready = jName && jPhone && jTour && jDate

    return (
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 20px 80px' }}>
        <BackBtn onClick={() => setIntent(null)} />
        <p className="section__label">Shared Joiners · 1–5 pax</p>
        <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: 'var(--navy)', letterSpacing: '-.03em', marginBottom: '32px' }}>
          Book a shared tour
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Tour Package *</label>
            <select value={jTour} onChange={e => setJTour(e.target.value)} style={{ width: '100%' }}>
              <option value="" disabled>Select a tour…</option>
              {TOURS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div className="form-row" style={{ marginBottom: 0 }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Preferred Date *</label>
              <input type="date" value={jDate} onChange={e => setJDate(e.target.value)} style={{ width: '100%' }} />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Number of Guests *</label>
              <select value={jGuests} onChange={e => setJGuests(e.target.value)} style={{ width: '100%' }}>
                {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>)}
              </select>
            </div>
          </div>

          <div className="form-row" style={{ marginBottom: 0 }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Your Name *</label>
              <input type="text" value={jName} onChange={e => setJName(e.target.value)} placeholder="Juan dela Cruz" />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Phone / Viber *</label>
              <input type="tel" value={jPhone} onChange={e => setJPhone(e.target.value)} placeholder="09XX-XXX-XXXX" />
            </div>
          </div>
        </div>

        <div style={{ marginTop: '32px', padding: '16px 18px', background: 'rgba(217,107,138,.06)', border: '1px solid rgba(217,107,138,.15)', borderRadius: '12px', fontSize: '.8rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '24px' }}>
          💡 Clicking the button below will open Messenger with your inquiry pre-filled. We'll reply and confirm within 24 hours.
        </div>

        <a
          href={ready ? href : undefined}
          target="_blank"
          rel="noopener noreferrer"
          onClick={!ready ? e => e.preventDefault() : undefined}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
            width: '100%', padding: '18px',
            background: ready ? 'var(--navy)' : 'var(--border)',
            color: ready ? '#fff' : 'var(--text-muted)',
            borderRadius: '14px', fontFamily: 'inherit',
            fontSize: '.95rem', fontWeight: 800, textDecoration: 'none',
            cursor: ready ? 'pointer' : 'not-allowed',
            transition: 'background .2s',
          }}
        >
          <span style={{ fontSize: '1.1rem' }}>💬</span>
          Send via Messenger →
        </a>
        {!ready && <p style={{ textAlign: 'center', fontSize: '.72rem', color: 'var(--text-muted)', marginTop: '8px' }}>Fill in all required fields to continue</p>}
      </div>
    )
  }

  // ── PHASE 1b: Private charter ────────────────────────────────────
  if (intent === 'private') {
    const msg  = buildPrivateMessage(pGuests, pDests, pDate, pName, pPhone, pNotes)
    const href = messengerLink(msg)
    const ready = pName && pPhone && pDests.length > 0

    return (
      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '0 20px 80px' }}>
        <BackBtn onClick={() => setIntent(null)} />
        <p className="section__label">Private Charter · 6+ pax</p>
        <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: 'var(--navy)', letterSpacing: '-.03em', marginBottom: '32px' }}>
          Plan your exclusive group tour
        </h2>

        <div className="form-row" style={{ marginBottom: '16px' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Your Name *</label>
            <input type="text" value={pName} onChange={e => setPName(e.target.value)} placeholder="Juan dela Cruz" />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Phone / Viber *</label>
            <input type="tel" value={pPhone} onChange={e => setPPhone(e.target.value)} placeholder="09XX-XXX-XXXX" />
          </div>
        </div>

        <div className="form-row" style={{ marginBottom: '28px' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Group Size</label>
            <select value={pGuests} onChange={e => setPGuests(e.target.value)} style={{ width: '100%' }}>
              {[6,7,8,9,10,11,12,15,20].map(n => <option key={n} value={n}>{n} guests{n === 20 ? '+' : ''}</option>)}
            </select>
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Preferred Date</label>
            <input type="date" value={pDate} onChange={e => setPDate(e.target.value)} style={{ width: '100%' }} />
          </div>
        </div>

        {/* ZAMBASULTA destination builder */}
        <p style={{ fontSize: '.78rem', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: '14px' }}>
          Select your destinations *
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
          {DESTINATIONS.map(d => {
            const selected = pDests.includes(d.name)
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => toggleDest(d.name)}
                style={{
                  padding: '16px', borderRadius: '14px', cursor: 'pointer', textAlign: 'left',
                  border: selected ? '2px solid var(--pink)' : '2px solid var(--border)',
                  background: selected ? 'rgba(217,107,138,.06)' : '#fff',
                  fontFamily: 'inherit', transition: 'all .2s',
                }}
              >
                <span style={{ fontSize: '1.4rem', display: 'block', marginBottom: '6px' }}>{d.icon}</span>
                <span style={{ fontSize: '.88rem', fontWeight: 700, color: selected ? 'var(--pink)' : 'var(--navy)', display: 'block', marginBottom: '3px' }}>{d.name}</span>
                <span style={{ fontSize: '.68rem', color: 'var(--text-muted)', lineHeight: 1.4, display: 'block' }}>{d.desc}</span>
              </button>
            )
          })}
        </div>

        <div className="form-group" style={{ marginBottom: '28px' }}>
          <label>Additional Notes</label>
          <textarea rows={3} value={pNotes} onChange={e => setPNotes(e.target.value)}
            placeholder="Any specific requests, accessibility needs, or questions…" />
        </div>

        <a
          href={ready ? href : undefined}
          target="_blank"
          rel="noopener noreferrer"
          onClick={!ready ? e => e.preventDefault() : undefined}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
            width: '100%', padding: '18px',
            background: ready ? 'var(--navy)' : 'var(--border)',
            color: ready ? '#fff' : 'var(--text-muted)',
            borderRadius: '14px', fontFamily: 'inherit',
            fontSize: '.95rem', fontWeight: 800, textDecoration: 'none',
            cursor: ready ? 'pointer' : 'not-allowed',
            transition: 'background .2s',
          }}
        >
          <span style={{ fontSize: '1.1rem' }}>💬</span>
          Send Custom Quote Request →
        </a>
        {!ready && <p style={{ textAlign: 'center', fontSize: '.72rem', color: 'var(--text-muted)', marginTop: '8px' }}>Add your name, phone, and at least one destination</p>}
      </div>
    )
  }

  // ── PHASE 1c: FAQ ────────────────────────────────────────────────
  return (
    <div style={{ maxWidth: '640px', margin: '0 auto', padding: '0 20px 80px' }}>
      <BackBtn onClick={() => setIntent(null)} />
      <p className="section__label">Common questions</p>
      <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: 'var(--navy)', letterSpacing: '-.03em', marginBottom: '32px' }}>
        Before you ask — we&rsquo;ve probably answered it.
      </h2>

      <FAQ />

      <div style={{ marginTop: '36px', background: 'var(--navy)', borderRadius: '20px', padding: '28px 32px', textAlign: 'center' }}>
        <p style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>Still have a question?</p>
        <p style={{ fontSize: '.85rem', color: 'rgba(255,255,255,.6)', marginBottom: '20px', lineHeight: 1.6 }}>
          Message us directly on Messenger. We typically reply within a few hours.
        </p>
        <a
          href="https://m.me/61562040673545"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--primary"
          style={{ fontFamily: 'inherit', borderRadius: '10px' }}
        >
          💬 Open Messenger Chat →
        </a>
      </div>
    </div>
  )
}
