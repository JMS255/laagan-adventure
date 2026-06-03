'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import type { TourCard } from '@/lib/types'

const FILTERS = [
  { id: 'solo',    label: 'Solo Traveler',  desc: 'Independent adventure', icon: '🧍' },
  { id: 'couple',  label: 'Couple Getaway', desc: 'Romantic escape',       icon: '💑' },
  { id: 'barkada', label: 'Barkada / Group', desc: 'Friends & barkada',    icon: '👫' },
  { id: 'family',  label: 'Family & Kids',  desc: 'Safe for all ages',     icon: '👨‍👩‍👧' },
] as const

type FilterId = typeof FILTERS[number]['id'] | 'all'

export default function TravelerFilter({ tours }: { tours: TourCard[] }) {
  const [active, setActive] = useState<FilterId>('all')

  const filtered = active === 'all'
    ? tours
    : tours.filter(t => t.audience?.includes(active))

  const displayed = filtered.length > 0 ? filtered : tours
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
        {displayed.map(tour => {
          const imgUrl = tour.mainImage
            ? urlFor(tour.mainImage).width(600).height(400).url()
            : null

          return (
            <Link href={`/tours/${tour.slug.current}`} className="tour-card" key={tour._id}>
              <div className="tour-card__img">
                {imgUrl
                  ? <Image src={imgUrl} fill alt={tour.title} className="tour-card__img-bg" style={{ objectFit: 'cover' }} sizes="(max-width:600px) 100vw,(max-width:900px) 50vw,33vw" />
                  : <div className="tour-card__img-bg" style={{ background: 'linear-gradient(160deg,#0ea5e9 0%,#0284c7 50%,#0c4a6e 100%)' }} />
                }
                {tour.badgeLabel && (
                  <div className="tour-card__badge">
                    <span className="badge badge--pink">{tour.badgeLabel}</span>
                  </div>
                )}
              </div>
              <div className="tour-card__body">
                <h3 className="tour-card__name">{tour.title}</h3>
                <div className="tour-card__chips">
                  {tour.duration && <span className="chip">⏱ {tour.duration}</span>}
                  {tour.destination && <span className="chip">📍 {tour.destination}</span>}
                </div>
                <div className="tour-card__rating">
                  <span className="tour-card__stars">★★★★★</span>
                  <span>5.0</span>
                </div>
                <div className="tour-card__footer">
                  <div>
                    <div className="tour-card__price">₱{tour.price?.toLocaleString()}</div>
                    <div className="tour-card__price-note">{tour.priceNote || 'per person'}</div>
                  </div>
                  <span className="btn btn--outline btn--sm">Check Availability</span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {noMatch && (
        <div id="no-tours" style={{ textAlign: 'center', padding: '48px 0', color: 'var(--muted)' }}>
          <p style={{ fontSize: '1.5rem', marginBottom: '12px' }}>🤔</p>
          <p style={{ fontWeight: 600, marginBottom: '8px' }}>No tours match that filter yet.</p>
          <p style={{ fontSize: '.85rem' }}>We&apos;re adding more — <Link href="/contact" style={{ color: 'var(--pink)' }}>message us</Link> and we&apos;ll find the perfect trip for you.</p>
        </div>
      )}
    </>
  )
}
