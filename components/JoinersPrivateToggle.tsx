'use client'

import { useState } from 'react'
import Link from 'next/link'

import type { PricingTier } from '@/lib/types'

interface Props {
  tourSlug: string
  tourTitle: string
  basePrice?: number
  priceNote?: string
  pricingTiers?: PricingTier[]
  availabilityNote?: string
}

export default function JoinersPrivateToggle({
  tourSlug, tourTitle, basePrice, priceNote, pricingTiers, availabilityNote,
}: Props) {
  const [tab, setTab] = useState<'joiners' | 'private'>('joiners')

  const privateRates = [
    { label: '6–9 pax', sub: 'Small exclusive group', price: basePrice ? Math.round(basePrice * 0.88) : null },
    { label: '10+ pax', sub: 'Large group discount', price: basePrice ? Math.round(basePrice * 0.78) : null },
  ]

  return (
    <div>
      {/* Availability note */}
      <p style={{ fontSize: '.82rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
        {availabilityNote || 'Available daily, subject to weather and minimum group size.'}
      </p>

      {/* Tab toggle */}
      <div style={{
        display: 'flex', gap: 0,
        background: 'var(--bg-2)', border: '1px solid var(--border)',
        borderRadius: '14px', padding: '5px', marginBottom: '24px',
        maxWidth: '480px',
      }}>
        {([
          { id: 'joiners', label: '👥 Shared Joiners', sub: '1–5 pax · split cost' },
          { id: 'private', label: '🔑 Private Charter', sub: '6+ pax · exclusive' },
        ] as const).map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              flex: 1, padding: '12px 16px', borderRadius: '10px', border: 'none',
              cursor: 'pointer', fontFamily: 'inherit', transition: 'all .25s',
              background: tab === t.id ? '#fff' : 'transparent',
              boxShadow: tab === t.id ? '0 2px 12px rgba(0,0,0,.1)' : 'none',
              textAlign: 'center',
            }}
          >
            <span style={{ fontSize: '.82rem', fontWeight: 700, color: tab === t.id ? 'var(--navy)' : 'var(--text-muted)', display: 'block', marginBottom: '2px' }}>
              {t.label}
            </span>
            <span style={{ fontSize: '.65rem', color: tab === t.id ? 'var(--pink)' : 'var(--text-muted)', fontWeight: 600 }}>{t.sub}</span>
          </button>
        ))}
      </div>

      {/* ── JOINERS TAB ── */}
      {tab === 'joiners' && (
        <div>
          {pricingTiers && pricingTiers.length > 0 ? (
            <div className="pricing-tiers" style={{ border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden' }}>
              <div className="pricing-tiers-grid">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', background: 'var(--bg-2)', padding: '12px 20px', borderBottom: '1px solid var(--border)' }}>
                  {['Group Size', 'Per Person', 'Est. Total', ''].map(h => (
                    <span key={h} style={{ fontSize: '.65rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{h}</span>
                  ))}
                </div>
                {pricingTiers.map((tier, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', padding: '16px 20px', borderBottom: i < pricingTiers.length - 1 ? '1px solid var(--border)' : 'none', alignItems: 'center', background: '#fff' }}>
                    <span style={{ fontSize: '.88rem', fontWeight: 600, color: 'var(--navy)' }}>{tier.label}</span>
                    <span style={{ fontSize: '.88rem', fontWeight: 700, color: 'var(--navy)' }}>
                      {tier.pricePerPerson ? `₱${tier.pricePerPerson.toLocaleString()}` : 'Contact us'}
                    </span>
                    <span style={{ fontSize: '.82rem', color: 'var(--text-muted)' }}>
                      {tier.pricePerPerson && tier.minPax ? `From ₱${(tier.pricePerPerson * tier.minPax).toLocaleString()}` : '—'}
                    </span>
                    {tier.pricePerPerson ? (
                      <Link href={`/book/${tourSlug}?guests=${tier.minPax || 1}`}
                        style={{ fontSize: '.75rem', fontWeight: 700, color: 'var(--pink)', textDecoration: 'none', whiteSpace: 'nowrap' }}>
                        Book →
                      </Link>
                    ) : (
                      <a href="https://m.me/61562040673545" target="_blank" rel="noopener noreferrer"
                        style={{ fontSize: '.75rem', fontWeight: 700, color: 'var(--pink)', textDecoration: 'none', whiteSpace: 'nowrap' }}>
                        Inquire →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <p style={{ fontSize: '.75rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--pink)', marginBottom: '4px' }}>Starting from</p>
                <p style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--navy)', letterSpacing: '-.02em', lineHeight: 1 }}>
                  ₱{basePrice?.toLocaleString() ?? '—'}
                </p>
                <p style={{ fontSize: '.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>{priceNote || 'per person'}</p>
              </div>
              <Link href={`/book/${tourSlug}`} className="btn btn--primary" style={{ borderRadius: '10px', fontFamily: 'inherit' }}>
                Book This Tour →
              </Link>
            </div>
          )}

          <div style={{ marginTop: '16px', padding: '14px 18px', background: 'rgba(217,107,138,.06)', border: '1px solid rgba(217,107,138,.15)', borderRadius: '10px', fontSize: '.8rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            💡 <strong style={{ color: 'var(--navy)' }}>No upfront payment.</strong> Book your preferred date and we'll confirm within 24 hours.
          </div>
        </div>
      )}

      {/* ── PRIVATE TAB ── */}
      {tab === 'private' && (
        <div style={{ background: 'var(--navy)', borderRadius: '16px', padding: '40px 32px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          {/* Subtle pattern overlay */}
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 20%, rgba(217,107,138,.15) 0%, transparent 60%)', pointerEvents: 'none' }} />

          <p style={{ fontSize: '2.8rem', marginBottom: '14px', position: 'relative' }}>🚐</p>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', marginBottom: '10px', letterSpacing: '-.02em', position: 'relative' }}>
            Exclusive Private Charter
          </h3>
          <p style={{ fontSize: '.88rem', color: 'rgba(255,255,255,.65)', lineHeight: 1.75, maxWidth: '400px', margin: '0 auto 28px', position: 'relative' }}>
            Traveling with 6 or more? Get a private vehicle, flexible dates, and exclusive access — no strangers, just your group.
          </p>

          {/* Group pricing grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', maxWidth: '380px', margin: '0 auto 28px', position: 'relative' }}>
            {privateRates.map(r => (
              <div key={r.label} style={{ background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.12)', borderRadius: '14px', padding: '18px 16px', backdropFilter: 'blur(8px)' }}>
                <p style={{ fontSize: '.65rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--pink)', marginBottom: '8px' }}>{r.label}</p>
                <p style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', lineHeight: 1, marginBottom: '4px' }}>
                  {r.price ? `~₱${r.price.toLocaleString()}` : 'Custom'}
                </p>
                <p style={{ fontSize: '.7rem', color: 'rgba(255,255,255,.45)' }}>{r.sub}</p>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
            <Link
              href={`/contact?tour=${encodeURIComponent(tourTitle)}`}
              className="btn btn--primary"
              style={{ fontFamily: 'inherit', borderRadius: '10px', padding: '14px 28px' }}
            >
              Request Private Quote →
            </Link>
            <a href="https://m.me/61562040673545" target="_blank" rel="noopener noreferrer"
              className="btn btn--outline-light" style={{ borderRadius: '10px' }}>
              💬 Message Us
            </a>
          </div>

          <p style={{ fontSize: '.72rem', color: 'rgba(255,255,255,.35)', marginTop: '18px', position: 'relative' }}>
            Prices shown are estimates. We'll send a confirmed quote within 24 hours.
          </p>
        </div>
      )}
    </div>
  )
}
