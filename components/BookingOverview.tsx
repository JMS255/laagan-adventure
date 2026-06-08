'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import { getPricePerPerson, applyPromo } from '@/lib/promoCodes'
import type { TourCard } from '@/lib/types'

interface Props {
  tour: TourCard & { pricingTiers?: import('@/lib/types').PricingTier[] }
  initialDate: string
  initialGuests: number
}

function genRef() {
  return '#LA-' + Math.random().toString(36).slice(2, 8).toUpperCase()
}

function fmt(d: string) {
  if (!d) return '—'
  return new Date(d + 'T12:00:00').toLocaleDateString('en-PH', { month: 'long', day: 'numeric', year: 'numeric' })
}

export default function BookingOverview({ tour, initialDate, initialGuests }: Props) {
  const [step, setStep]             = useState(1)
  const [date, setDate]             = useState(initialDate)
  const [adults, setAdults]         = useState(Math.max(1, initialGuests))
  const [children, setChildren]     = useState(0)
  const [promoOpen, setPromoOpen]   = useState(false)
  const [promoInput, setPromoInput] = useState('')
  const [appliedPromo, setApplied]  = useState('')
  const [promoError, setPromoError] = useState('')
  const [status, setStatus]         = useState<'idle' | 'sending' | 'sent'>('idle')
  const [submitError, setSubmitError] = useState('')
  const [bookingRef]                = useState(genRef)
  const formRef                     = useRef<HTMLFormElement>(null)

  const adultPrice = getPricePerPerson(tour.pricingTiers, tour.price ?? 0, adults)
  const childPrice = Math.round(adultPrice * 0.5)
  const subtotal   = adults * adultPrice + children * childPrice
  const { valid, label: promoLabel, discount, finalTotal } = applyPromo(subtotal, appliedPromo)
  const total = finalTotal

  const today = new Date().toISOString().split('T')[0]

  function goTo(n: number) {
    setStep(n)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    setSubmitError('')
    if (!formRef.current) return
    const fd = new FormData(formRef.current)
    const payload = {
      bookingRef,
      tourTitle: tour.title,
      tourSlug: tour.slug.current,
      date, adults, children,
      promo: appliedPromo,
      pricePerPerson: adultPrice,
      totalPrice: total,
      discount,
      name:  fd.get('name') as string,
      phone: fd.get('phone') as string,
      email: fd.get('email') as string,
      notes: fd.get('special_requirements') as string,
    }
    try {
      const res = await fetch('/api/book', { method: 'POST', body: JSON.stringify(payload), headers: { 'Content-Type': 'application/json' } })
      if (res.ok) { setStatus('sent'); goTo(3) }
      else {
        const json = await res.json().catch(() => ({}))
        setSubmitError(json?.error || 'Error submitting. Please message us on Messenger.')
        setStatus('idle')
      }
    } catch {
      setSubmitError('Network error. Please check your connection.')
      setStatus('idle')
    }
  }

  const imgUrl = tour.mainImage
    ? (typeof tour.mainImage === 'string' ? tour.mainImage : urlFor(tour.mainImage).width(160).height(120).url())
    : null

  return (
    <div className="booking-page">
      {/* Minimal booking header */}
      <header className="booking-header">
        <Link href="/" className="nav__logo" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img src="/logo.jpg" alt="Laagan Adventures" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
          <span className="nav__logo-text">Laagan Adventures</span>
        </Link>
        <a href="tel:09052435196" className="nav__phone">📞 0905-243-5196</a>
      </header>

      <div className="booking-container">

        {/* Step Progress */}
        <div className="step-progress">
          <div className={`step-progress__item${step === 1 ? ' is-active' : step > 1 ? ' is-done' : ''}`}>
            <div className="step-progress__num">1</div>
            <span>Tour Details</span>
          </div>
          <div className="step-progress__line" />
          <div className={`step-progress__item${step === 2 ? ' is-active' : step > 2 ? ' is-done' : ''}`}>
            <div className="step-progress__num">2</div>
            <span>Your Info</span>
          </div>
          <div className="step-progress__line" />
          <div className={`step-progress__item${step === 3 ? ' is-active' : ''}`}>
            <div className="step-progress__num">3</div>
            <span>Confirm</span>
          </div>
        </div>

        {/* ── STEP 1: Tour Details ── */}
        {step === 1 && (
          <div>
            <div className="booking-card">
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.4rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '20px' }}>Tour Details</h2>

              {/* Tour summary */}
              <div className="tour-summary">
                <div className="tour-summary__img">
                  {imgUrl
                    ? <Image src={imgUrl} fill alt={tour.title} style={{ objectFit: 'cover' }} sizes="80px" />
                    : <div style={{ width: '100%', height: '100%', background: 'linear-gradient(160deg,#0ea5e9,#0284c7,#0c4a6e)' }} />
                  }
                </div>
                <div>
                  <div className="tour-summary__name">{tour.title}</div>
                  <div className="tour-summary__detail">
                    {tour.destination && `${tour.destination} · `}{tour.duration && `${tour.duration}`}
                  </div>
                </div>
                <Link href="/tours" className="tour-summary__change">Change</Link>
              </div>

              {/* Date */}
              <div className="field">
                <label>Preferred Date</label>
                <input type="date" value={date} min={today} onChange={e => setDate(e.target.value)} style={{ fontSize: '.9rem' }} />
              </div>

              {/* Guests */}
              <div style={{ marginBottom: '18px' }}>
                <div style={{ fontSize: '.78rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '12px', letterSpacing: '.02em' }}>Group Size</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                    <div>
                      <div style={{ fontSize: '.88rem', fontWeight: 600, color: 'var(--navy)' }}>Adults</div>
                      <div style={{ fontSize: '.72rem', color: 'var(--muted)' }}>Ages 13+ · ₱{adultPrice.toLocaleString()}/person</div>
                    </div>
                    <div className="stepper">
                      <button className="stepper__btn" onClick={() => setAdults(a => Math.max(1, a - 1))} disabled={adults <= 1}>−</button>
                      <span className="stepper__val">{adults}</span>
                      <button className="stepper__btn" onClick={() => setAdults(a => a + 1)}>+</button>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0' }}>
                    <div>
                      <div style={{ fontSize: '.88rem', fontWeight: 600, color: 'var(--navy)' }}>Children</div>
                      <div style={{ fontSize: '.72rem', color: 'var(--muted)' }}>Ages 4–12 · ₱{childPrice.toLocaleString()}/child</div>
                    </div>
                    <div className="stepper">
                      <button className="stepper__btn" onClick={() => setChildren(c => Math.max(0, c - 1))} disabled={children <= 0}>−</button>
                      <span className="stepper__val">{children}</span>
                      <button className="stepper__btn" onClick={() => setChildren(c => c + 1)}>+</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Promo code */}
              <button className="promo-toggle" onClick={() => setPromoOpen(v => !v)}>
                {promoOpen ? '− Hide promo code' : '+ Have a promo code?'}
              </button>
              {promoOpen && (
                <div className="promo-field is-open">
                  {appliedPromo && valid ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', background: 'rgba(22,163,74,.08)', border: '1.5px solid rgba(22,163,74,.25)', borderRadius: 'var(--r)', flex: 1 }}>
                      <span style={{ color: '#16a34a' }}>✓</span>
                      <span style={{ fontSize: '.85rem', fontWeight: 700, color: '#16a34a' }}>{appliedPromo}</span>
                      <span style={{ fontSize: '.78rem', color: 'var(--muted)' }}>{promoLabel}</span>
                      <button onClick={() => { setApplied(''); setPromoInput('') }} style={{ marginLeft: 'auto', fontSize: '.78rem', fontWeight: 600, color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer' }}>Remove</button>
                    </div>
                  ) : (
                    <>
                      <input
                        type="text"
                        placeholder="Enter code"
                        value={promoInput}
                        onChange={e => { setPromoInput(e.target.value.toUpperCase()); setPromoError('') }}
                        onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleApply() } }}
                      />
                      <button className="promo-apply" onClick={handleApply}>Apply</button>
                    </>
                  )}
                </div>
              )}
              {promoError && <p style={{ fontSize: '.78rem', color: '#dc2626', marginTop: '6px' }}>{promoError}</p>}

              {/* Price breakdown — only shown when price is set */}
              {adultPrice > 0 && (
                <div className="price-box">
                  <div className="price-row">
                    <span>₱{adultPrice.toLocaleString()} × {adults} adult{adults !== 1 ? 's' : ''}</span>
                    <span>₱{(adults * adultPrice).toLocaleString()}</span>
                  </div>
                  {children > 0 && (
                    <div className="price-row">
                      <span>₱{childPrice.toLocaleString()} × {children} child{children !== 1 ? 'ren' : ''}</span>
                      <span>₱{(children * childPrice).toLocaleString()}</span>
                    </div>
                  )}
                  {discount > 0 && (
                    <div className="price-row" style={{ color: '#16a34a' }}>
                      <span>Promo discount</span>
                      <span>−₱{discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="price-total-row">
                    <span>Total estimate</span>
                    <span>₱{total.toLocaleString()}</span>
                  </div>
                </div>
              )}
              {adultPrice === 0 && (
                <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r)', padding: '14px 16px', fontSize: '.82rem', color: 'var(--muted)', lineHeight: 1.6 }}>
                  Pricing for this tour is confirmed on booking. We&apos;ll send you the exact price when we reach out via Messenger.
                </div>
              )}
            </div>

            <button
              className="btn btn--primary btn--full"
              onClick={() => { if (!date) { alert('Please select a preferred date to continue.'); return; } goTo(2) }}
            >Continue to Your Info →</button>
            <div className="trust-micro" style={{ justifyContent: 'center', marginTop: '14px' }}>
              <span>💚 ₱300 deposit to confirm</span>
              <span>✅ Free cancellation</span>
              <span>💬 24hr reply</span>
            </div>
          </div>
        )}

        {/* ── STEP 2: Your Info ── */}
        {step === 2 && (
          <div>
            <div className="booking-card">
              <button onClick={() => goTo(1)} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '.82rem', fontWeight: 600, color: 'var(--muted)', marginBottom: '20px', background: 'none', border: 'none', cursor: 'pointer' }}>← Back</button>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.4rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '20px' }}>Your Information</h2>

              {/* Summary */}
              <div className="tour-summary" style={{ marginBottom: '24px' }}>
                <div className="tour-summary__img">
                  {imgUrl
                    ? <Image src={imgUrl} fill alt={tour.title} style={{ objectFit: 'cover' }} sizes="80px" />
                    : <div style={{ width: '100%', height: '100%', background: 'linear-gradient(160deg,#0ea5e9,#0284c7,#0c4a6e)' }} />
                  }
                </div>
                <div>
                  <div className="tour-summary__name">{tour.title}</div>
                  <div className="tour-summary__detail">{fmt(date)} · {adults} Adult{adults !== 1 ? 's' : ''}{children ? ` + ${children} Child` : ''}</div>
                </div>
                {total > 0 && (
                  <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                    <div style={{ fontSize: '.82rem', fontWeight: 800, color: 'var(--pink)' }}>₱{total.toLocaleString()}</div>
                    <div style={{ fontSize: '.68rem', color: 'var(--muted)' }}>total</div>
                  </div>
                )}
              </div>

              <form ref={formRef} onSubmit={handleSubmit}>
                <div className="field"><label>Full Name *</label><input type="text" name="name" required placeholder="Your complete name" autoComplete="name" /></div>
                <div className="field-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="field"><label>Phone Number *</label><input type="tel" name="phone" required placeholder="09XXXXXXXXX" autoComplete="tel" /></div>
                  <div className="field"><label>Email Address</label><input type="email" name="email" placeholder="you@email.com" autoComplete="email" /></div>
                </div>
                <div className="field">
                  <label>Special Requests <span style={{ fontWeight: 400, color: 'var(--muted)' }}>(optional)</span></label>
                  <textarea name="special_requirements" rows={3} placeholder="Dietary needs, accessibility, celebration, or anything we should know..." />
                </div>

                <div style={{ background: '#fff4f7', border: '1px solid rgba(217,107,138,.2)', borderRadius: 'var(--r)', padding: '14px 16px', margin: '4px 0 20px', fontSize: '.82rem', color: 'var(--muted)', lineHeight: 1.6 }}>
                  By confirming, you agree to our booking terms. A ₱300 GCash deposit is required to secure your slot — details will appear on the next screen.
                </div>

                <button
                  type="submit"
                  className="btn btn--primary btn--full"
                  disabled={status === 'sending'}
                  style={{ opacity: status === 'sending' ? .7 : 1, cursor: status === 'sending' ? 'not-allowed' : 'pointer' }}
                >
                  {status === 'sending' ? 'Submitting…' : 'Confirm Booking →'}
                </button>

                {submitError && <p style={{ fontSize: '.82rem', color: '#dc2626', textAlign: 'center', marginTop: '10px' }}>{submitError}</p>}
              </form>

              <div className="trust-micro" style={{ justifyContent: 'center', marginTop: '14px' }}>
                <span>🔒 Secure & private</span>
                <span>✅ Free cancellation</span>
                <span>💬 We reply within 24hrs</span>
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 3: Confirmation ── */}
        {step === 3 && (
          <div>
            <div className="booking-card" style={{ textAlign: 'center', padding: '40px 28px' }}>
              <div className="confirm-check">✓</div>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.8rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '10px' }}>Booking Received!</h2>
              <p style={{ fontSize: '.9rem', color: 'var(--muted)', maxWidth: '400px', margin: '0 auto 20px', lineHeight: 1.7 }}>
                Your adventure is almost confirmed. We&apos;ll reach out via Messenger or phone within 24 hours to lock in your slot.
              </p>
              <div className="booking-ref">{bookingRef}</div>
              <div className="confirm-summary" style={{ textAlign: 'left' }}>
                <div className="confirm-row"><span>Tour</span><span>{tour.title}</span></div>
                <div className="confirm-row"><span>Date</span><span>{fmt(date)}</span></div>
                <div className="confirm-row"><span>Guests</span><span>{adults} Adult{adults !== 1 ? 's' : ''}{children ? ` + ${children} Child` : ''}</span></div>
                {total > 0 && <div className="confirm-row"><span>Est. Total</span><span style={{ color: 'var(--pink)' }}>₱{total.toLocaleString()}</span></div>}
              </div>
            </div>

            {/* GCash deposit — first since it's required to confirm */}
            <div className="gcash-box">
              <div className="gcash-box__title">💚 Step 1: Send ₱300 GCash Deposit to Confirm Your Slot</div>
              <div className="gcash-box__sub">This deposit locks in your booking and will be deducted from your total on the day.</div>
              <div className="gcash-grid">
                <div style={{ overflow: 'hidden', borderRadius: '10px', aspectRatio: '1/1' }}>
                  <img src="/gcash-qr.jpg" alt="GCash QR Code" className="gcash-qr" style={{ width: '100%', objectFit: 'cover', objectPosition: 'top', height: '133%' }} />
                </div>
                <div>
                  <div className="gcash-step"><div className="gcash-step-num">1</div><span>Open GCash app and tap <strong>Scan QR Code</strong></span></div>
                  <div className="gcash-step"><div className="gcash-step-num">2</div><span>Scan this QR and send <strong>₱300 deposit</strong></span></div>
                  <div className="gcash-step"><div className="gcash-step-num">3</div><span>Screenshot your receipt</span></div>
                  <div className="gcash-step"><div className="gcash-step-num">4</div><span>Send receipt + booking ref <strong>{bookingRef}</strong> to us on Messenger</span></div>
                </div>
              </div>
              <a href={`https://m.me/61562040673545?text=Hi!%20I%27ve%20paid%20the%20deposit.%20Booking%20ref%3A%20${encodeURIComponent(bookingRef)}%20for%20${encodeURIComponent(tour.title)}%20on%20${encodeURIComponent(fmt(date))}.`} target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--full" style={{ marginTop: '20px', borderRadius: '10px' }}>
                I&apos;ve Paid — Send Receipt on Messenger
              </a>
            </div>

            {/* Messenger + WhatsApp — secondary, for questions */}
            <div className="booking-card" style={{ padding: '24px' }}>
              <div style={{ fontSize: '.85rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '4px' }}>Step 2: Questions? Message us directly</div>
              <p style={{ fontSize: '.8rem', color: 'var(--muted)', marginBottom: '16px' }}>
                Your booking ref is <strong>{bookingRef}</strong>. We confirm within the hour once deposit is received.
              </p>
              <a
                href={`https://m.me/61562040673545?text=Hi!%20My%20booking%20ref%20is%20${encodeURIComponent(bookingRef)}%20for%20${encodeURIComponent(tour.title)}%20on%20${encodeURIComponent(fmt(date))}.`}
                target="_blank" rel="noopener noreferrer"
                className="ms-btn"
              >
                <span style={{ fontSize: '1.2rem' }}>💬</span> Open Messenger
              </a>
              <a
                href={`https://wa.me/639052435196?text=Hi!%20My%20booking%20ref%20is%20${encodeURIComponent(bookingRef)}%20for%20${encodeURIComponent(tour.title)}%20on%20${encodeURIComponent(fmt(date))}.`}
                target="_blank" rel="noopener noreferrer"
                className="wa-btn"
              >
                <span style={{ fontSize: '1.1rem' }}>📱</span> Send via WhatsApp
              </a>
            </div>

            <div style={{ textAlign: 'center', marginTop: '28px' }}>
              <Link href="/tours" style={{ fontSize: '.82rem', color: 'var(--muted)', fontWeight: 600 }}>← Browse more tours</Link>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
