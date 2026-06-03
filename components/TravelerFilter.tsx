'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { TOURS_DATA } from '@/lib/tours-data'
import type { TourCard } from '@/lib/types'

const FILTERS = [
  { id: 'solo',    label: 'Solo Traveler',  desc: 'Independent adventure', icon: '🧍' },
  { id: 'couple',  label: 'Couple Getaway', desc: 'Romantic escape',       icon: '💑' },
  { id: 'barkada', label: 'Barkada / Group', desc: 'Friends & barkada',    icon: '👫' },
  { id: 'family',  label: 'Family & Kids',  desc: 'Safe for all ages',     icon: '👨‍👩‍👧' },
] as const

type FilterId = typeof FILTERS[number]['id'] | 'all'

export default function TravelerFilter({ tours: sanityTours }: { tours: TourCard[] }) {
  const [active, setActive] = useState<FilterId>('all')

  const merged = TOURS_DATA.map(t => {
    const sanity = sanityTours.find(s => s.slug?.current === t.slug)
    return { ...t, price: sanity?.price ?? null, priceNote: sanity?.priceNote ?? 'per person', badgeLabel: sanity?.badgeLabel ?? null }
  })

  const filtered = active === 'all' ? merged : merged.filter(t => t.audience.includes(active))
  const displayed = filtered.length > 0 ? filtered : merged
  const noMatch = active !== 'all' && filtered.length === 0

  return (
    <>
      <p style={{ fontSize: '.85rem', color: 'var(--muted)', marginBottom: '24px' }}>Who&apos;s this trip for?</p>

      <div className="traveler-grid" style={{ marginTop: 0, marginBottom: '48px' }}>
        {FILTERS.map(f => (
          <button
            key={f.id}
            className={`traveler-card${active === f.id ? ' is-active' : ''}`}
            onClick={() => setActive(active === f.id ? 'all' : f.id)}
          >
            <span className="traveler-card__icon">{f.icon}</span>
            <span className="traveler-card__label">{f.label}</span>
            <span className="traveler-card__desc">{f.desc}</span>
          </button>
        ))}
      </div>

      <div className="tours-grid" id="tours-grid">
        {displayed.map(tour => (
          <Link href={`/tours/${tour.slug}`} className="tour-card" key={tour.slug}>
            <div className="tour-card__img">
              {tour.mainImage
                ? <Image src={tour.mainImage} fill alt={tour.title} className="tour-card__img-bg" style={{ objectFit: 'cover' }} sizes="(max-width:600px) 100vw,(max-width:900px) 50vw,33vw" unoptimized />
                : <div className="tour-card__img-bg" style={{ background: 'linear-gradient(160deg,#0ea5e9,#0284c7,#0c4a6e)' }} />
              }
              {tour.badgeLabel && (
                <div className="tour-card__badge"><span className="badge badge--pink">{tour.badgeLabel}</span></div>
              )}
            </div>
            <div className="tour-card__body">
              <h3 className="tour-card__name">{tour.title}</h3>
              <div className="tour-card__chips">
                <span className="chip">⏱ {tour.duration}</span>
                <span className="chip">📍 {tour.destination}</span>
              </div>
              <div className="tour-card__rating">
                <span className="tour-card__stars">★★★★★</span>
                <span>5.0</span>
              </div>
              <div className="tour-card__footer">
                <div>
                  <div className="tour-card__price">{tour.price ? `₱${tour.price.toLocaleString()}` : 'Contact us'}</div>
                  <div className="tour-card__price-note">{tour.priceNote}</div>
                </div>
                <span className="btn btn--outline btn--sm">Check Availability</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {noMatch && (
        <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--muted)' }}>
          <p style={{ fontSize: '1.5rem', marginBottom: '12px' }}>🤔</p>
          <p style={{ fontWeight: 600, marginBottom: '8px' }}>No tours match that filter yet.</p>
          <p style={{ fontSize: '.85rem' }}>We&apos;re adding more — <Link href="/contact" style={{ color: 'var(--pink)' }}>message us</Link> and we&apos;ll find the perfect trip for you.</p>
        </div>
      )}
    </>
  )
}
