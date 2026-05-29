'use client'

import { useState } from 'react'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity'
import { getPricePerPerson, applyPromo, type PricingTier } from '@/lib/promoCodes'

interface Tour {
  title: string
  slug: { current: string }
  mainImage?: object
  duration?: string
  destination?: string
  price?: number
  pricingTiers?: PricingTier[]
}

interface Props {
  tour: Tour
  initialDate: string
  initialGuests: number
}

function fmt(d: string) {
  return new Date(d + 'T12:00:00').toLocaleDateString('en-PH', {
    month: 'long', day: 'numeric', year: 'numeric',
  })
}

export default function BookingOverview({ tour, initialDate, initialGuests }: Props) {
  const [date, setDate]             = useState(initialDate)
  const [guests, setGuests]         = useState(Math.max(1, initialGuests))
  const [promoInput, setPromoInput] = useState('')
  const [appliedPromo, setApplied]  = useState('')
  const [promoError, setPromoError] = useState('')

  const pricePerPerson = getPricePerPerson(tour.pricingTiers, tour.price ?? 0, guests)
  const subtotal       = pricePerPerson * guests
  const { valid, label: promoLabel, discount, finalTotal } = applyPromo(subtotal, appliedPromo)

  function handleApply() {
    if (!promoInput.trim()) return
    const result = applyPromo(subtotal, promoInput)
    if (result.valid) {
      setApplied(promoInput.trim().toUpperCase())
      setPromoError('')
    } else {
      setPromoError('Invalid promo code. Try LAAGAN500 for ₱500 off.')
      setApplied('')
    }
  }

  const canContinue = !!date && pricePerPerson > 0

  const continueHref = (() => {
    const p = new URLSearchParams()
    if (date)         p.set('date', date)
    p.set('guests', String(guests))
    p.set('price', String(pricePerPerson))
    if (appliedPromo && valid) p.set('promo', appliedPromo)
    return `/book/${tour.slug.current}/details?${p.toString()}`
  })()

  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="container" style={{ padding: '48px 32px 80px', minHeight: '80vh' }}>

      {/* Breadcrumb */}
      <nav style={{ fontSize: '.78rem', color: 'var(--text-muted)', marginBottom: '32px', display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
        <Link href="/tours" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Tours</Link>
        <span>›</span>
        <Link href={`/tours/${tour.slug.current}`} style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>{tour.title}</Link>
        <span>›</span>
        <span style={{ color: 'var(--navy)', fontWeight: 600 }}>Book</span>
      </nav>

      <div className="booking-grid">

        {/* ── LEFT ── */}
        <div>
          <p style={{ fontSize: '.65rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--pink)', marginBottom: '8px' }}>
            Step 1 of 2
          </p>
          <h1 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, color: 'var(--navy)', letterSpacing: '-.02em', marginBottom: '32px' }}>
            Trip Overview
          </h1>

          {/* Tour summary card */}
          <div style={{ display: 'flex', gap: '16px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: '12px', padding: '16px', marginBottom: '36px' }}>
            <div style={{ width: 80, height: 80, borderRadius: '8px', overflow: 'hidden', flexShrink: 0, background: 'var(--navy-2)' }}>
              {tour.mainImage && (
                <img src={urlFor(tour.mainImage).width(160).height(160).url()} alt={tour.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              )}
            </div>
            <div>
              {tour.destination && (
                <p style={{ fontSize: '.65rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--pink)', marginBottom: '4px' }}>
                  {tour.destination}
                </p>
              )}
              <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '4px' }}>{tour.title}</p>
              {tour.duration && <p style={{ fontSize: '.8rem', color: 'var(--text-muted)' }}>🕐 {tour.duration}</p>}
            </div>
          </div>

          {/* Date & Guests */}
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '16px' }}>
              Select your date & group size
            </h2>
            <div className="form-row">
              <div className="form-group">
                <label>Preferred Date *</label>
                <input type="date" value={date} min={today}
                  onChange={e => setDate(e.target.value)} style={{ width: '100%' }} />
              </div>
              <div className="form-group">
                <label>Number of Guests *</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--bg-2)', border: '1.5px solid var(--border)', borderRadius: 'var(--r)', padding: '10px 16px' }}>
                  <button type="button" onClick={() => setGuests(g => Math.max(1, g - 1))}
                    style={{ width: 28, height: 28, borderRadius: '50%', border: '1.5px solid var(--border)', background: 'none', color: 'var(--navy)', cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    −
                  </button>
                  <span style={{ flex: 1, textAlign: 'center', fontWeight: 700, color: 'var(--navy)', fontSize: '.95rem' }}>
                    {guests} {guests === 1 ? 'guest' : 'guests'}
                  </span>
                  <button type="button" onClick={() => setGuests(g => g + 1)}
                    style={{ width: 28, height: 28, borderRadius: '50%', border: '1.5px solid var(--border)', background: 'none', color: 'var(--navy)', cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Promo code */}
          <div>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '6px' }}>
              Promo or referral code
              <span style={{ fontWeight: 400, fontSize: '.8rem', color: 'var(--text-muted)', marginLeft: '8px' }}>Optional</span>
            </h2>
            <p style={{ fontSize: '.78rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
              Have a discount code? Enter it here.
            </p>

            {appliedPromo && valid ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', background: 'rgba(22,163,74,.08)', border: '1.5px solid rgba(22,163,74,.25)', borderRadius: 'var(--r)' }}>
                <span style={{ color: '#16a34a', fontSize: '1.1rem' }}>✓</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '.88rem', fontWeight: 700, color: '#16a34a' }}>
                    Code &ldquo;{appliedPromo}&rdquo; applied
                  </p>
                  <p style={{ fontSize: '.78rem', color: 'var(--text-muted)' }}>{promoLabel}</p>
                </div>
                <button
                  onClick={() => { setApplied(''); setPromoInput('') }}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '.8rem', fontFamily: 'inherit', fontWeight: 600 }}
                >
                  Remove
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  value={promoInput}
                  onChange={e => { setPromoInput(e.target.value.toUpperCase()); setPromoError('') }}
                  onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleApply() } }}
                  placeholder="e.g. LAAGAN500"
                  style={{
                    flex: 1, background: 'var(--bg-2)',
                    border: `1.5px solid ${promoError ? '#dc2626' : 'var(--border)'}`,
                    borderRadius: 'var(--r)', padding: '12px 16px',
                    fontFamily: 'inherit', fontSize: '.9rem', color: 'var(--text)',
                    outline: 'none', letterSpacing: '.04em',
                  }}
                />
                <button onClick={handleApply} className="btn btn--outline"
                  style={{ borderRadius: 'var(--r)', padding: '12px 24px', flexShrink: 0 }}>
                  Apply
                </button>
              </div>
            )}
            {promoError && (
              <p style={{ fontSize: '.78rem', color: '#dc2626', marginTop: '6px' }}>{promoError}</p>
            )}
          </div>
        </div>

        {/* ── RIGHT: Summary ── */}
        <div style={{ position: 'sticky', top: 'calc(var(--nav-h) + 24px)' }}>
          <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--rl)', padding: '28px', boxShadow: '0 8px 40px rgba(0,40,70,.09)' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '20px' }}>
              Trip Summary
            </h2>

            {/* Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingBottom: '18px', borderBottom: '1px solid var(--border)', marginBottom: '18px' }}>
              <Row label="Tour" value={tour.title} />
              <Row label="Date" value={date ? fmt(date) : 'Not selected yet'} dim={!date} />
              <Row label="Guests" value={`${guests} adult${guests !== 1 ? 's' : ''}`} />
            </div>

            {/* Price breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingBottom: '18px', borderBottom: '1px solid var(--border)', marginBottom: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.85rem', color: 'var(--text-muted)' }}>
                <span>₱{pricePerPerson.toLocaleString()} × {guests} guest{guests !== 1 ? 's' : ''}</span>
                <span style={{ color: 'var(--navy)' }}>₱{subtotal.toLocaleString()}</span>
              </div>
              {discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.85rem', color: '#16a34a' }}>
                  <span>Promo discount</span>
                  <span style={{ fontWeight: 600 }}>−₱{discount.toLocaleString()}</span>
                </div>
              )}
            </div>

            {/* Total */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
              <span style={{ fontWeight: 700, color: 'var(--navy)' }}>Total</span>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--navy)', letterSpacing: '-.02em', lineHeight: 1 }}>
                  ₱{finalTotal.toLocaleString()}
                </p>
                <p style={{ fontSize: '.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  ₱{pricePerPerson.toLocaleString()}/person
                </p>
              </div>
            </div>

            {canContinue ? (
              <Link href={continueHref} className="btn btn--primary"
                style={{ width: '100%', justifyContent: 'center', borderRadius: '10px', fontFamily: 'inherit', fontSize: '.88rem' }}>
                Continue to Details →
              </Link>
            ) : (
              <div style={{ width: '100%', padding: '14px', borderRadius: '10px', background: 'var(--bg-2)', color: 'var(--text-muted)', textAlign: 'center', fontSize: '.88rem', fontWeight: 700, border: '1px solid var(--border)' }}>
                {!date ? '← Select a date first' : 'Continue to Details →'}
              </div>
            )}

            {/* Trust badges */}
            <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {['No upfront payment required', 'Free cancellation (24hr notice)', 'Confirmed within 24 hours'].map(t => (
                <div key={t} style={{ display: 'flex', gap: '8px', fontSize: '.75rem', color: 'var(--text-muted)' }}>
                  <span style={{ color: 'var(--pink)', fontWeight: 700 }}>✓</span> {t}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

function Row({ label, value, dim }: { label: string; value: string; dim?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', fontSize: '.85rem' }}>
      <span style={{ color: 'var(--text-muted)', flexShrink: 0 }}>{label}</span>
      <span style={{ fontWeight: 600, color: dim ? 'var(--text-muted)' : 'var(--navy)', textAlign: 'right' }}>{value}</span>
    </div>
  )
}
