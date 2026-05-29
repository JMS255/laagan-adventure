'use client'

import { useState } from 'react'
import Link from 'next/link'

interface PricingTier {
  label: string
  minPax: number
  maxPax: number
  pricePerPerson: number
}

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
        display: 'inline-flex', gap: 0,
        background: 'var(--bg-2)', border: '1px solid var(--border)',
        borderRadius: '12px', padding: '5px', marginBottom: '24px',
      }}>
        {([
          { id: 'joiners', label: '👥 Shared Joiners', sub: '1–5 pax' },
          { id: 'private', label: '🔑 Private Charter', sub: '6+ pax' },
        ] as const).map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              padding: '10px 18px', borderRadius: '8px', border: 'none',
              cursor: 'pointer', fontFamily: 'inherit', transition: 'all .2s',
              background: tab === t.id ? '#fff' : 'transparent',
              boxShadow: tab === t.id ? '0 2px 8px rgba(0,0,0,.08)' : 'none',
            }}
          >
            <span style={{ fontSize: '.82rem', fontWeight: 700, color: tab === t.id ? 'var(--navy)' : 'var(--text-muted)', display: 'block' }}>
              {t.label}
            </span>
            <span style={{ fontSize: '.65rem', color: 'var(--text-muted)' }}>{t.sub}</span>
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
        <div style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: '14px', padding: '28px 32px', textAlign: 'center' }}>
          <p style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🚐</p>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '10px', letterSpacing: '-.02em' }}>
            Exclusive Private Charter
          </h3>
          <p style={{ fontSize: '.88rem', color: 'var(--text-muted)', lineHeight: 1.75, maxWidth: '440px', margin: '0 auto 24px' }}>
            Traveling with 6 or more? Get a <strong style={{ color: 'var(--navy)' }}>private vehicle</strong>, <strong style={{ color: 'var(--navy)' }}>flexible dates</strong>, and exclusive access — no other groups, just your party.
          </p>

          {/* Group pricing grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', maxWidth: '360px', margin: '0 auto 24px' }}>
            {privateRates.map(r => (
              <div key={r.label} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: '12px', padding: '16px' }}>
                <p style={{ fontSize: '.65rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '6px' }}>{r.label}</p>
                <p style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--navy)', lineHeight: 1 }}>
                  {r.price ? `~₱${r.price.toLocaleString()}` : 'Custom'}
                </p>
                <p style={{ fontSize: '.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>{r.sub}</p>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href={`/contact?tour=${encodeURIComponent(tourTitle)}`}
              className="btn btn--primary"
              style={{ fontFamily: 'inherit', borderRadius: '10px' }}
            >
              Request Private Quote →
            </Link>
            <a href="https://m.me/61562040673545" target="_blank" rel="noopener noreferrer"
              className="btn btn--outline" style={{ borderRadius: '10px' }}>
              💬 Message Us
            </a>
          </div>

          <p style={{ fontSize: '.72rem', color: 'var(--text-muted)', marginTop: '16px' }}>
            Prices shown are estimated. We'll send a custom quote within 24 hours.
          </p>
        </div>
      )}
    </div>
  )
}
