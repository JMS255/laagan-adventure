'use client'

import { useState, useRef } from 'react'
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

function genRef() {
  return Math.random().toString(36).slice(2, 8).toUpperCase()
}

export default function PassengerDetailsForm({
  tourTitle, tourSlug, date, guests, promo, pricePerPerson, totalPrice, discount,
}: Props) {
  const [status, setStatus]       = useState<'idle' | 'sending' | 'sent'>('idle')
  const [submitError, setSubmitError] = useState('')
  const [bookingRef]              = useState(genRef)
  const formRef                   = useRef<HTMLFormElement>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    setSubmitError('')

    if (!formRef.current) return
    const data = new FormData(formRef.current)

    // Attach full booking context to the Formspree email
    data.set('_subject',         `New Booking [${bookingRef}] — ${tourTitle}`)
    data.set('booking_reference', bookingRef)
    data.set('tour',             tourTitle)
    data.set('tour_date',        fmt(date))
    data.set('guests',           String(guests))
    data.set('price_per_person', `₱${pricePerPerson.toLocaleString()}`)
    if (discount > 0) data.set('promo_discount', `₱${discount.toLocaleString()} (code: ${promo})`)
    data.set('total_price',      `₱${totalPrice.toLocaleString()}`)

    try {
      const res = await fetch('https://formspree.io/f/xqejjkbp', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      const json = await res.json().catch(() => ({}))
      if (res.ok) {
        setStatus('sent')
      } else {
        const msg = json?.errors?.[0]?.message || json?.error || `Error ${res.status}`
        console.error('Formspree error:', json)
        setSubmitError(`Submission failed: ${msg}. Please message us on Messenger to book.`)
        setStatus('idle')
      }
    } catch (err) {
      console.error('Fetch error:', err)
      setSubmitError('Network error. Please check your connection and try again.')
      setStatus('idle')
    }
  }

  if (status === 'sent') {
    return (
      <div className="container" style={{ padding: '60px 32px 80px', maxWidth: '680px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <p style={{ fontSize: '3rem', marginBottom: '12px' }}>🎉</p>
          <h1 style={{ fontSize: 'clamp(1.6rem, 3vw, 2rem)', fontWeight: 800, color: 'var(--navy)', letterSpacing: '-.02em', marginBottom: '10px' }}>
            Booking Request Received!
          </h1>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: '480px', margin: '0 auto' }}>
            We&rsquo;ll contact you within <strong style={{ color: 'var(--navy)' }}>24 hours</strong> to confirm your booking.
          </p>
        </div>

        {/* Booking reference */}
        <div style={{ background: 'var(--navy)', borderRadius: '14px', padding: '20px 24px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <p style={{ fontSize: '.65rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,.5)', marginBottom: '4px' }}>
              Booking Reference
            </p>
            <p style={{ fontSize: '1.6rem', fontWeight: 900, color: '#fff', letterSpacing: '.1em', fontFamily: 'monospace' }}>
              {bookingRef}
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.5)', marginBottom: '2px' }}>Total Amount</p>
            <p style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--pink)' }}>₱{totalPrice.toLocaleString()}</p>
          </div>
        </div>

        {/* GCash payment section */}
        <div style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: '14px', padding: '28px', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '6px' }}>
            💸 Secure your slot with GCash
          </h2>
          <p style={{ fontSize: '.82rem', color: 'var(--text-muted)', marginBottom: '24px', lineHeight: 1.65 }}>
            Scan the QR code or send to our number. Include your booking reference in the payment note so we can match your payment.
          </p>

          <div className="gcash-grid">
            {/* QR Code */}
            <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid var(--border)', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', aspectRatio: '1' }}>
              {/* Replace /gcash-qr.png with your actual GCash QR code */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/gcash-qr.png" alt="GCash QR Code"
                style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '6px' }}
                onError={e => {
                  const el = e.currentTarget
                  el.style.display = 'none'
                  const parent = el.parentElement
                  if (parent) {
                    parent.innerHTML = '<div style="text-align:center;color:#aaa;font-size:.75rem;padding:8px">Add your GCash QR<br/>to /public/gcash-qr.png</div>'
                  }
                }}
              />
            </div>

            {/* Payment details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { label: 'GCash Number',   value: '0905-243-5196' },
                { label: 'Account Name',   value: 'Laagan Adventure' },
                { label: 'Amount',         value: `₱${totalPrice.toLocaleString()}` },
                { label: 'Payment Note',   value: `${bookingRef} – ${tourTitle}` },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p style={{ fontSize: '.65rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '2px' }}>{label}</p>
                  <p style={{ fontSize: label === 'Amount' ? '1.1rem' : '.9rem', fontWeight: label === 'Payment Note' || label === 'Amount' ? 700 : 500, color: label === 'Payment Note' ? 'var(--pink)' : 'var(--navy)', fontFamily: label === 'Payment Note' ? 'monospace' : 'inherit' }}>
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '20px', padding: '12px 16px', background: 'rgba(217,107,138,.08)', border: '1px solid rgba(217,107,138,.2)', borderRadius: '8px', fontSize: '.8rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
            ⚠️ <strong style={{ color: 'var(--navy)' }}>Important:</strong> After paying, send your GCash receipt/screenshot to our Messenger. Include your reference <strong style={{ color: 'var(--pink)', fontFamily: 'monospace' }}>{bookingRef}</strong> so we can match your payment and confirm your tour.
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <a
            href="https://m.me/61562040673545"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--primary"
            style={{ flex: 1, justifyContent: 'center', minWidth: '180px', fontFamily: 'inherit', borderRadius: '10px' }}
          >
            💬 Send Receipt on Messenger
          </a>
          <Link href="/tours" className="btn btn--outline"
            style={{ flex: 1, justifyContent: 'center', minWidth: '140px', borderRadius: '10px' }}>
            Browse More Tours
          </Link>
        </div>

        <p style={{ fontSize: '.72rem', color: 'var(--text-muted)', marginTop: '16px', textAlign: 'center' }}>
          Your tour is not fully confirmed until we verify your payment. We&rsquo;ll send a confirmation message within 24 hours.
        </p>
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

      <div className="booking-grid">

        {/* ── LEFT: Form ── */}
        <div>
          <p style={{ fontSize: '.65rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--pink)', marginBottom: '8px' }}>
            Step 2 of 2
          </p>
          <h1 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, color: 'var(--navy)', letterSpacing: '-.02em', marginBottom: '32px' }}>
            Passenger Details
          </h1>

          <form ref={formRef} onSubmit={handleSubmit}>

            {/* Lead passenger */}
            <div style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: '14px', padding: '24px', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '.78rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: '20px' }}>
                👤 Lead Passenger
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
                Dietary needs, accessibility requirements, or anything else we should know?
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

            {submitError && (
              <p style={{ fontSize: '.82rem', color: '#dc2626', textAlign: 'center', marginTop: '10px', lineHeight: 1.6 }}>
                {submitError}
              </p>
            )}

            <p style={{ fontSize: '.72rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '10px', lineHeight: 1.7 }}>
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
              💡 Payment via GCash or cash on the day of the tour. Instructions will appear after you submit.
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
