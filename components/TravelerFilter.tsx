'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import type { TourCard } from '@/lib/types'

const FILTERS = [
  { id: 'solo',    label: 'Solo Traveler',   sub: 'Independent explorer', icon: '🧳' },
  { id: 'couple',  label: 'Couple Getaway',   sub: 'Romantic escape',      icon: '🌊' },
  { id: 'barkada', label: 'Barkada / Group',  sub: 'Friends & squad',      icon: '🤙' },
  { id: 'family',  label: 'Family & Kids',    sub: 'Safe & memorable',     icon: '🏖️' },
] as const

type FilterId = typeof FILTERS[number]['id'] | 'all'

function TourCardItem({ tour }: { tour: TourCard }) {
  const imgUrl = tour.mainImage
    ? urlFor(tour.mainImage).width(600).height(420).fit('crop').url()
    : null

  return (
    <Link href={`/tours/${tour.slug.current}`} className="tour-card" style={{ height: '100%', position: 'relative' }}>
      {/* Badge */}
      {tour.badgeLabel && (
        <div style={{
          position: 'absolute', top: '12px', left: '12px', zIndex: 2,
          background: 'var(--pink)', color: '#fff',
          fontSize: '.65rem', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase',
          padding: '4px 10px', borderRadius: '999px',
        }}>
          {tour.badgeLabel}
        </div>
      )}
      <div className="tour-card__img" style={{ position: 'relative' }}>
        {imgUrl
          ? <Image src={imgUrl} fill alt={tour.title} style={{ objectFit: 'cover' }} sizes="(max-width:600px) 100vw,(max-width:900px) 50vw,33vw" />
          : <div style={{ width: '100%', height: '100%', background: 'linear-gradient(160deg, #0ea5e9, #1a2744)' }} />
        }
      </div>
      <div className="tour-card__body">
        <p className="tour-card__tag">{tour.destination || 'Zamboanga City'}</p>
        <h3 className="tour-card__title">{tour.title}</h3>
        <p className="tour-card__desc">{tour.tagline}</p>
        {tour.urgencyNote && (
          <p style={{ fontSize: '.72rem', color: 'var(--pink)', fontWeight: 600, marginTop: '4px' }}>
            ⚡ {tour.urgencyNote}
          </p>
        )}
        <div className="tour-card__footer">
          <div>
            <p className="tour-card__price">₱{tour.price?.toLocaleString()}</p>
            <p className="tour-card__price-note">{tour.priceNote}</p>
          </div>
          <span className="tour-card__cta">View details →</span>
        </div>
      </div>
    </Link>
  )
}

export default function TravelerFilter({ tours }: { tours: TourCard[] }) {
  const [active, setActive] = useState<FilterId>('all')

  const filtered = active === 'all'
    ? tours
    : tours.filter(t => t.audience?.includes(active))

  const displayed = filtered.length > 0 ? filtered : tours
  const noMatchFallback = active !== 'all' && filtered.length === 0
  const activeLabel = FILTERS.find(f => f.id === active)?.label ?? ''

  return (
    <section style={{ padding: '80px 0 64px', background: '#fff' }}>
      <div className="container">

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', marginBottom: '36px' }}>
          <div>
            <p className="section__label">How are you traveling?</p>
            <h2 className="section__title" style={{ marginBottom: 0 }}>Find your perfect Zamboanga adventure.</h2>
          </div>
          <Link href="/tours" className="btn btn--outline" style={{ flexShrink: 0 }}>View All Tours</Link>
        </div>

        {/* Filter cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '12px',
          marginBottom: '48px',
        }}
          className="traveler-filter-grid"
        >
          {FILTERS.map(f => {
            const isActive = active === f.id
            return (
              <button
                key={f.id}
                onClick={() => setActive(isActive ? 'all' : f.id)}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  gap: '6px', padding: '20px 16px',
                  background: isActive ? 'var(--navy)' : 'var(--bg-2)',
                  border: `2px solid ${isActive ? 'var(--navy)' : 'var(--border)'}`,
                  borderRadius: 'var(--rl)', cursor: 'pointer',
                  transition: 'all .2s', fontFamily: 'inherit',
                  transform: isActive ? 'translateY(-2px)' : 'none',
                  boxShadow: isActive ? '0 8px 24px rgba(0,78,100,.2)' : 'none',
                }}
              >
                <span style={{ fontSize: '1.6rem', lineHeight: 1 }}>{f.icon}</span>
                <span style={{
                  fontSize: '.82rem', fontWeight: 700,
                  color: isActive ? '#fff' : 'var(--navy)',
                  transition: 'color .2s',
                }}>
                  {f.label}
                </span>
                <span style={{
                  fontSize: '.7rem',
                  color: isActive ? 'rgba(255,255,255,.6)' : 'var(--text-muted)',
                  transition: 'color .2s',
                }}>
                  {f.sub}
                </span>
              </button>
            )
          })}
        </div>

        {/* Fallback message */}
        {noMatchFallback && (
          <p style={{ fontSize: '.88rem', color: 'var(--text-muted)', marginBottom: '24px', fontStyle: 'italic' }}>
            All our tours are great for {activeLabel.toLowerCase()}s — here&rsquo;s everything we offer:
          </p>
        )}

        {/* Tour grid */}
        <div className="tours-grid">
          {displayed.map(tour => (
            <TourCardItem key={tour._id} tour={tour} />
          ))}
        </div>
      </div>
    </section>
  )
}
