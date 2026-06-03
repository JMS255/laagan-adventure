'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { TOURS_DATA } from '@/lib/tours-data'
import type { TourCard } from '@/lib/types'

const TRAVELER_FILTERS = [
  { id: 'solo',    label: 'Solo',    icon: '🧍' },
  { id: 'couple',  label: 'Couple',  icon: '💑' },
  { id: 'barkada', label: 'Barkada', icon: '👫' },
  { id: 'family',  label: 'Family',  icon: '👨‍👩‍👧' },
] as const

type TravelerId = typeof TRAVELER_FILTERS[number]['id'] | 'all'

const SORT_OPTIONS = [
  { value: 'popular',   label: 'Most Popular' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'duration',  label: 'Duration: Shortest' },
]

export default function ToursFilter({ tours: sanityTours }: { tours: TourCard[] }) {
  const [traveler, setTraveler]       = useState<TravelerId>('all')
  const [sort, setSort]               = useState('popular')
  const [drawerOpen, setDrawerOpen]   = useState(false)
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const merged = TOURS_DATA.map(t => {
    const sanity = sanityTours.find(s => s.slug?.current === t.slug)
    return { ...t, price: sanity?.price ?? null, priceNote: sanity?.priceNote ?? 'per person', badgeLabel: sanity?.badgeLabel ?? null }
  })

  const filtered = useMemo(() => {
    let result = traveler === 'all' ? merged : merged.filter(t => t.audience.includes(traveler))
    if (sort === 'price-asc') result = [...result].sort((a, b) => (a.price ?? 9999) - (b.price ?? 9999))
    return result
  }, [merged, traveler, sort])

  function toggleFilter(f: string) {
    setActiveFilters(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f])
  }

  return (
    <>
      <div style={{ background: '#fff' }}>
        <div className="container">

          {/* Traveler filter */}
          <div style={{ padding: '28px 0 0' }}>
            <p style={{ fontSize: '.78rem', fontWeight: 600, color: 'var(--muted)', marginBottom: '14px' }}>
              Filter by traveler type:
            </p>
            <div className="traveler-grid" style={{ marginTop: 0, marginBottom: 0 }}>
              {TRAVELER_FILTERS.map(f => (
                <button
                  key={f.id}
                  className={`traveler-card${traveler === f.id ? ' is-active' : ''}`}
                  onClick={() => setTraveler(traveler === f.id ? 'all' : f.id)}
                >
                  <span className="traveler-card__icon">{f.icon}</span>
                  <span className="traveler-card__label">{f.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Filter bar */}
          <div className="filter-bar">
            <div className="filter-bar__left">
              <button className="filter-btn" onClick={() => setDrawerOpen(true)}>⚙ Filter</button>
              {activeFilters.map(f => (
                <span key={f} className="active-chip" onClick={() => toggleFilter(f)}>{f} <span>×</span></span>
              ))}
            </div>
            <div className="filter-bar__right">
              <span className="results-count">Showing {filtered.length} tour{filtered.length !== 1 ? 's' : ''}</span>
              <select className="sort-select" value={sort} onChange={e => setSort(e.target.value)}>
                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>

          {/* Tour grid */}
          <div className="tours-grid-full" id="all-tours">
            {filtered.map(tour => (
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
                    <span className="chip">👥 {tour.groupSize}</span>
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

        </div>
      </div>

      {/* Filter Drawer Overlay */}
      <div className={`filter-drawer-overlay${drawerOpen ? ' is-open' : ''}`} onClick={() => setDrawerOpen(false)} />

      {/* Filter Drawer */}
      <div className={`filter-drawer${drawerOpen ? ' is-open' : ''}`}>
        <div className="filter-drawer__handle" />
        <div className="filter-drawer__title">
          Filters
          <button style={{ fontSize: '.8rem', fontWeight: 600, color: 'var(--pink)', background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => { setActiveFilters([]); setDrawerOpen(false) }}>Reset</button>
        </div>
        <div className="filter-section">
          <div className="filter-section__label">Activity Type</div>
          <div className="filter-pills">
            {['Island', 'Culture', 'Adventure', 'Leisure', 'Multi-day'].map(f => (
              <button key={f} className={`filter-pill${activeFilters.includes(f) ? ' is-active' : ''}`} onClick={() => toggleFilter(f)}>{f}</button>
            ))}
          </div>
        </div>
        <div className="filter-section">
          <div className="filter-section__label">Duration</div>
          <div className="filter-pills">
            {['Half day', 'Full day', 'Evening', 'Multi-day'].map(f => (
              <button key={f} className={`filter-pill${activeFilters.includes(f) ? ' is-active' : ''}`} onClick={() => toggleFilter(f)}>{f}</button>
            ))}
          </div>
        </div>
        <div style={{ paddingTop: '8px' }}>
          <button className="btn btn--primary btn--full" onClick={() => setDrawerOpen(false)}>Show {filtered.length} Tours</button>
        </div>
      </div>
    </>
  )
}
