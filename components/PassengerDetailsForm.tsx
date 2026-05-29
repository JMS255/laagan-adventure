'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Props {
  tourTitle: string
  tourSlug: string
  date: string
  guests: number
  promo: string
  pricePerPerson: number
  totalPrice: number
  discount: number
}

function fmt(d: string) {
  if (!d) return '—'
  return new Date(d + 'T12:00:00').toLocaleDateString('en-PH', {
    month: 'long', day: 'numeric', year: 'numeric',
  })
}

export default function PassengerDetailsForm({
  tourTitle, tourSlug, date, guests, promo, pricePerPerson, totalPrice, discount,
}: Props) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const data = new FormData(e.currentTarget)

    // Append booking summary so owner sees full context in the email
    data.set('_subject',         `New Booking — ${tourTitle}`)
    data.set('tour',             tourTitle)
    data.set('tour_date',        fmt(date))
    data.set('guests',           String(guests))
    data.set('price_per_person', `₱${pricePerPerson.toLocaleString()}`)
    if (discount > 0) data.set('promo_discount', `₱${discount.toLocaleString()} (code: ${promo})`)
    data.set('total_price',      `₱${totalPrice.toLocaleString()}`)

    try {
      const res = await fetch('https://formspree.io/f/xpwzgwnn', {
        method: 'POST', body: data, headers: { Accept: 'application/json' },
      })
      setStatus(res.ok ? 'sent' : 'idle')
    } catch {
      setStatus('idle')
    }
  }

  if (status === 'sent') {
    return (
      <div className="container" style={{ padding: '80px 32px', textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontSize: '3.5rem', marginBottom: '16px' }}>🎉</p>
        <h1 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, color: 'var(--navy)', marginBottom: '12px', letterSpacing: '-.02em' }}>
          Booking Request Sent!
        </h1>
        <p style={{ color: 'var(--text-muted)', maxWidth: '500px', lineHeight: 1.8, marginBottom: '12px' }}>
          We&rsquo;ll contact you within <strong style={{ color: 'var(--navy)' }}>24 hours</strong> via Messenger or phone to confirm your {tourTitle} booking.
        </p>
        <p style={{ fontSize: '.85rem', color: 'var(--text-muted)', marginBottom: '36px' }}>
          No payment is required now — we collect on the day of the tour.
        </p>
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="https://m.me/61562040673545" target="_blank" rel="noopener noreferrer" className="btn btn--primary">
            Message Us on Messenger
          </a>
          <Link href="/tours" className="btn btn--outline">Browse More Tours</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container" style={{ padding: '48px 32px 80px' }}>

      {/* Breadcrumb */}
      <nav style={{ fontSize: '.78rem', color: 'var(--text-muted)', marginBottom: '32px', display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
        <Link href="/tours" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Tours</Link>
        <span>›</span>
        <Link href={`/tours/${tourSlug}`} style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>{tourTitle}</Link>
        <span>›</span>
        <Link href={`/book/${tourSlug}?date=${date}&guests=${guests}`} style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Trip Overview</Link>
        <span>›</span>
        <span style={{ color: 'var(--navy)', fontWeight: 600 }}>Passenger Details</span>
      </nav>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '48px', alignItems: 'start' }}>

        {/* ── LEFT: Form ── */}
        <div>
          <p style={{ fontSize: '.65rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--pink)', marginBottom: '8px' }}>
            Step 2 of 2
          </p>
          <h1 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, color: 'var(--navy)', letterSpacing: '-.02em', marginBottom: '32px' }}>
            Passenger Details
          </h1>

          <form onSubmit={handleSubmit}>

            {/* Lead passenger */}
            <div style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: '14px', padding: '24px', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '.78rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: '20px' }}>
                👤 Lead Passenger (Contact Person)
              </h2>
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
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Email Address</label>
                <input type="email" name="email" placeholder="your@email.com" />
              </div>
            </div>

            {/* Special requirements */}
            <div style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: '14px', padding: '24px', marginBottom: '28px' }}>
              <h2 style={{ fontSize: '.78rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                📝 Special Requirements
                <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 'normal', fontSize: '.75rem', color: 'var(--text-muted)', background: 'var(--border)', padding: '2px 8px', borderRadius: '999px' }}>Optional</span>
              </h2>
              <p style={{ fontSize: '.78rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
                Any dietary needs, accessibility requirements, or things we should know?
              </p>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <textarea name="special_requirements" rows={4}
                  placeholder="e.g. Vegetarian meals, celebrating a birthday, first-time visitor to Zamboanga…" />
              </div>
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="btn btn--primary"
              style={{ width: '100%', justifyContent: 'center', borderRadius: '10px', fontFamily: 'inherit', fontSize: '.92rem', padding: '16px', opacity: status === 'sending' ? .7 : 1, cursor: status === 'sending' ? 'not-allowed' : 'pointer' }}
            >
              {status === 'sending' ? 'Submitting…' : 'Submit Booking Request →'}
            </button>

            <p style={{ fontSize: '.72rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '12px', lineHeight: 1.7 }}>
              No payment now. We&rsquo;ll confirm via Messenger or phone within 24 hours.
            </p>
          </form>
        </div>

        {/* ── RIGHT: Summary ── */}
        <div style={{ position: 'sticky', top: 'calc(var(--nav-h) + 24px)' }}>
          <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--rl)', padding: '28px', boxShadow: '0 8px 40px rgba(0,40,70,.09)' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '20px' }}>
              Trip Summary
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingBottom: '18px', borderBottom: '1px solid var(--border)', marginBottom: '18px' }}>
              {[
                { label: 'Tour',   value: tourTitle },
                { label: 'Date',   value: fmt(date) },
                { label: 'Guests', value: `${guests} adult${guests !== 1 ? 's' : ''}` },
                ...(promo ? [{ label: 'Promo code', value: promo }] : []),
              ].map(({ label, value }) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', fontSize: '.85rem' }}>
                  <span style={{ color: 'var(--text-muted)', flexShrink: 0 }}>{label}</span>
                  <span style={{ fontWeight: 600, color: label === 'Promo code' ? 'var(--pink)' : 'var(--navy)', textAlign: 'right' }}>{value}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingBottom: '18px', borderBottom: '1px solid var(--border)', marginBottom: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.85rem', color: 'var(--text-muted)' }}>
                <span>₱{pricePerPerson.toLocaleString()} × {guests}</span>
                <span style={{ color: 'var(--navy)' }}>₱{(pricePerPerson * guests).toLocaleString()}</span>
              </div>
              {discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.85rem', color: '#16a34a' }}>
                  <span>Promo discount</span>
                  <span style={{ fontWeight: 600 }}>−₱{discount.toLocaleString()}</span>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px' }}>
              <span style={{ fontWeight: 700, color: 'var(--navy)' }}>Total</span>
              <p style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--navy)', letterSpacing: '-.02em', lineHeight: 1 }}>
                ₱{totalPrice.toLocaleString()}
              </p>
            </div>

            <div style={{ background: 'var(--bg-2)', borderRadius: '10px', padding: '14px', fontSize: '.78rem', color: 'var(--text-muted)', lineHeight: 1.7, border: '1px solid var(--border)' }}>
              💡 Payment is collected on the day of the tour via cash or GCash. We&rsquo;ll send payment details when we confirm your booking.
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
