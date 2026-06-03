'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Props {
  tourSlug: string
  basePrice: number
  pricingTiers?: { label: string; minPax: number; maxPax: number; pricePerPerson: number }[]
}

export default function TourDetailSidebar({ tourSlug, basePrice, pricingTiers }: Props) {
  const [mode, setMode]     = useState<'joiners' | 'private'>('joiners')
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)

  const adultPrice    = basePrice || 1500
  const childPrice    = Math.round(adultPrice * 0.5)
  const total         = adults * adultPrice + children * childPrice
  const today         = new Date().toISOString().split('T')[0]

  const bookHref = `/book/${tourSlug}?guests=${adults + children}`

  return (
    <div className="booking-sidebar">
      <div className="sidebar-price-label">Starting from</div>
      <div className="sidebar-price">₱{adultPrice.toLocaleString()} <small>/ person</small></div>

      <div className="tour-type-toggle">
        <button className={`tt-btn${mode === 'joiners' ? ' is-active' : ''}`} onClick={() => setMode('joiners')}>Joiners</button>
        <button className={`tt-btn${mode === 'private' ? ' is-active' : ''}`} onClick={() => setMode('private')}>Private</button>
      </div>

      {mode === 'joiners' ? (
        <>
          <div className="stepper-row">
            <div>
              <div className="stepper-label">Adults</div>
              <div className="stepper-sub">Ages 13+</div>
            </div>
            <div className="stepper">
              <button className="stepper__btn" onClick={() => setAdults(a => Math.max(1, a - 1))} disabled={adults <= 1}>−</button>
              <span className="stepper__val">{adults}</span>
              <button className="stepper__btn" onClick={() => setAdults(a => a + 1)}>+</button>
            </div>
          </div>
          <div className="stepper-row" style={{ marginBottom: '16px' }}>
            <div>
              <div className="stepper-label">Children</div>
              <div className="stepper-sub">Ages 4–12 (₱{childPrice.toLocaleString()})</div>
            </div>
            <div className="stepper">
              <button className="stepper__btn" onClick={() => setChildren(c => Math.max(0, c - 1))} disabled={children <= 0}>−</button>
              <span className="stepper__val">{children}</span>
              <button className="stepper__btn" onClick={() => setChildren(c => c + 1)}>+</button>
            </div>
          </div>
          <div className="field" style={{ marginBottom: '8px' }}>
            <label>Preferred Date</label>
            <input type="date" min={today} style={{ fontSize: '.88rem' }} />
          </div>
          <div className="price-breakdown">
            <div className="price-breakdown-row">
              <span>₱{adultPrice.toLocaleString()} × {adults} adult{adults !== 1 ? 's' : ''}</span>
              <span>₱{(adults * adultPrice).toLocaleString()}</span>
            </div>
            {children > 0 && (
              <div className="price-breakdown-row">
                <span>₱{childPrice.toLocaleString()} × {children} child{children !== 1 ? 'ren' : ''}</span>
                <span>₱{(children * childPrice).toLocaleString()}</span>
              </div>
            )}
            <div className="price-breakdown-total">
              <span>Total estimate</span>
              <span>₱{total.toLocaleString()}</span>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="price-breakdown" style={{ marginBottom: '16px' }}>
            {pricingTiers && pricingTiers.length > 0 ? pricingTiers.map(t => (
              <div key={t.label} className="price-breakdown-row">
                <span>{t.label}</span>
                <span style={{ fontWeight: 700, color: 'var(--navy)' }}>₱{(t.pricePerPerson * t.minPax).toLocaleString()} flat</span>
              </div>
            )) : (
              <>
                <div className="price-breakdown-row"><span>Up to 10 pax</span><span style={{ fontWeight: 700, color: 'var(--navy)' }}>₱{(adultPrice * 8).toLocaleString()} flat</span></div>
                <div className="price-breakdown-row"><span>11–15 pax</span><span style={{ fontWeight: 700, color: 'var(--navy)' }}>₱{(adultPrice * 9).toLocaleString()} flat</span></div>
                <div className="price-breakdown-row"><span>16–20 pax</span><span style={{ fontWeight: 700, color: 'var(--navy)' }}>₱{(adultPrice * 10).toLocaleString()} flat</span></div>
              </>
            )}
          </div>
          <div className="field" style={{ marginBottom: '8px' }}>
            <label>Preferred Date</label>
            <input type="date" min={today} style={{ fontSize: '.88rem' }} />
          </div>
        </>
      )}

      <Link href={bookHref} className="btn btn--primary btn--full" style={{ marginTop: '4px', fontSize: '.9rem' }}>
        Check Availability →
      </Link>
      <div className="trust-micro">
        <span>🔒 No payment yet</span>
        <span>✅ Free cancellation</span>
        <span>💬 24hr reply</span>
      </div>
      <div style={{ textAlign: 'center', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
        <a href="https://m.me/61562040673545" target="_blank" rel="noopener noreferrer" style={{ fontSize: '.8rem', fontWeight: 600, color: 'var(--muted)' }}>
          Have questions? Message us →
        </a>
      </div>
    </div>
  )
}
