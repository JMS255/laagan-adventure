'use client'

import { useState, useMemo } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import type { TourCard } from '@/lib/types'

const TRAVELER_FILTERS = [
  { id: 'solo',    label: 'Solo Traveler',  sub: 'Independent explorer', icon: '🧳' },
  { id: 'couple',  label: 'Couple Getaway', sub: 'Romantic escape',      icon: '🌊' },
  { id: 'barkada', label: 'Barkada / Group', sub: 'Friends & squad',     icon: '🤙' },
  { id: 'family',  label: 'Family & Kids',  sub: 'Safe & memorable',     icon: '🏖️' },
] as const

type TravelerId = typeof TRAVELER_FILTERS[number]['id'] | 'all'

const SORT_OPTIONS = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'duration', label: 'Duration' },
]

export default function ToursFilter({ tours }: { tours: TourCard[] }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const [traveler, setTraveler] = useState<TravelerId>('all')
  const [sort, setSort] = useState('popular')
  const [drawerOpen, setDrawerOpen] = useState(false)

  const activeDestination = searchParams.get('destination') ?? 'all'

  const destinations = useMemo(() => {
    const unique = Array.from(new Set(tours.map(t => t.destination).filter(Boolean))) as string[]
    return unique
  }, [tours])

  function setDestination(dest: string) {
    if (dest === 'all') { router.push(pathname); return }
    const p = new URLSearchParams()
    p.set('destination', dest)
    router.push(`${pathname}?${p.toString()}`)
  }

  const filtered = useMemo(() => {
    let result = tours
    if (activeDestination !== 'all') result = result.filter(t => t.destination === activeDestination)
    if (traveler !== 'all') result = result.filter(t => t.audience?.includes(traveler))
    if (sort === 'price-asc') result = [...result].sort((a, b) => (a.price ?? 0) - (b.price ?? 0))
    if (sort === 'price-desc') result = [...result].sort((a, b) => (b.price ?? 0) - (a.price ?? 0))
    return result
  }, [tours, activeDestination, traveler, sort])

  const hasFilters = traveler !== 'all' || activeDestination !== 'all'

  function clearAll() {
    setTraveler('all')
    router.push(pathname)
  }

  return (
    <div>
      {/* Traveler filter */}
      <div className="traveler-grid" style={{ marginBottom: '32px' }}>
        {TRAVELER_FILTERS.map(f => (
          <button
            key={f.id}
            onClick={() => setTraveler(traveler === f.id ? 'all' : f.id)}
            className={`traveler-card${traveler === f.id ? ' is-active' : ''}`}
          >
            <span className="traveler-card__icon">{f.icon}</span>
            <span className="traveler-card__label">{f.label}</span>
            <span className="traveler-card__desc">{f.sub}</span>
          </button>
        ))}
      </div>

      {/* Filter bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '32px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {/* Destination pills */}
          {destinations.length > 1 && (['all', ...destinations] as string[]).map(dest => (
            <button
              key={dest}
              onClick={() => setDestination(dest)}
              className={`chip${activeDestination === dest ? '' : ''}`}
              style={{
                border: `2px solid ${activeDestination === dest ? 'var(--pink)' : 'var(--border)'}`,
                background: activeDestination === dest ? 'var(--pink)' : 'transparent',
                color: activeDestination === dest ? '#fff' : 'var(--text-muted)',
                borderRadius: '999px', padding: '7px 16px',
                fontSize: '.8rem', fontWeight: 600,
                cursor: 'pointer', transition: 'all .2s', fontFamily: 'inherit',
              }}
            >
              {dest === 'all' ? 'All Destinations' : dest}
            </button>
          ))}
          {hasFilters && (
            <button onClick={clearAll} style={{ fontSize: '.78rem', color: 'var(--pink)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', padding: '4px 0' }}>
              Reset ×
            </button>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '.8rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
            Showing {filtered.length} tour{filtered.length !== 1 ? 's' : ''}
          </span>
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            style={{ fontSize: '.8rem', fontWeight: 600, color: 'var(--navy)', border: '1.5px solid var(--border)', borderRadius: '8px', padding: '8px 12px', background: '#fff', cursor: 'pointer', fontFamily: 'inherit', outline: 'none' }}
          >
            {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      </div>

      {/* Tour grid */}
      {filtered.length > 0 ? (
        <div className="tours-grid">
          {filtered.map(tour => (
            <Link href={`/tours/${tour.slug.current}`} className="tour-card" key={tour._id}>
              <div className="tour-card__img" style={{ position: 'relative' }}>
                {tour.mainImage ? (
                  <Image src={urlFor(tour.mainImage).width(600).height(450).url()} fill alt={tour.title} style={{ objectFit: 'cover' }} sizes="(max-width:600px) 100vw,(max-width:900px) 50vw,33vw" />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, var(--navy-2), var(--navy))' }} />
                )}
                {tour.badgeLabel && (
                  <div className="tour-card__badge">
                    <span className="badge badge--pink">{tour.badgeLabel}</span>
                    {tour.urgencyNote && (
                      <span className="badge" style={{ background: 'rgba(0,0,0,.65)', color: '#fff', backdropFilter: 'blur(4px)', marginTop: '4px' }}>
                        {tour.urgencyNote}
                      </span>
                    )}
                  </div>
                )}
              </div>
              <div className="tour-card__body">
                <p className="tour-card__tag">{tour.destination || 'Zamboanga City'}</p>
                <h3 className="tour-card__name">{tour.title}</h3>
                <p className="tour-card__desc">{tour.tagline}</p>
                <div className="tour-card__footer">
                  <div>
                    <p className="tour-card__price">₱{tour.price?.toLocaleString()}</p>
                    <p className="tour-card__price-note">{tour.priceNote}</p>
                  </div>
                  <span className="tour-card__cta">View details →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '64px 32px', background: 'var(--bg-2)', borderRadius: 'var(--rl)', border: '1px solid var(--border)' }}>
          <p style={{ fontSize: '2rem', marginBottom: '12px' }}>🏝️</p>
          <p style={{ fontWeight: 700, color: 'var(--navy)', marginBottom: '8px' }}>No tours match these filters</p>
          <p style={{ fontSize: '.85rem', color: 'var(--text-muted)', marginBottom: '24px' }}>Try removing a filter or message us — we may be able to arrange it.</p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={clearAll} className="btn btn--outline">Clear Filters</button>
            <a href="https://m.me/61562040673545" target="_blank" rel="noopener noreferrer" className="btn btn--primary">💬 Ask on Messenger</a>
          </div>
        </div>
      )}

      {/* Mobile filter drawer overlay */}
      {drawerOpen && (
        <div
          onClick={() => setDrawerOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.4)', zIndex: 300 }}
        />
      )}

      {/* Mobile filter drawer */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 301,
        background: '#fff', borderRadius: '20px 20px 0 0',
        padding: '24px 20px 32px',
        transform: drawerOpen ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform .3s cubic-bezier(.16,1,.3,1)',
        boxShadow: '0 -8px 40px rgba(0,0,0,.15)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <p style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--navy)' }}>Filter Tours</p>
          <button onClick={() => setDrawerOpen(false)} style={{ fontSize: '1.2rem', color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>×</button>
        </div>

        <p style={{ fontSize: '.78rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '.06em' }}>Destination</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
          {(['all', ...destinations] as string[]).map(dest => (
            <button
              key={dest}
              onClick={() => setDestination(dest)}
              style={{
                padding: '8px 16px', borderRadius: '999px', fontSize: '.82rem', fontWeight: 600,
                border: `2px solid ${activeDestination === dest ? 'var(--pink)' : 'var(--border)'}`,
                background: activeDestination === dest ? 'var(--pink)' : 'transparent',
                color: activeDestination === dest ? '#fff' : 'var(--text-muted)',
                cursor: 'pointer', fontFamily: 'inherit',
              }}
            >
              {dest === 'all' ? 'All' : dest}
            </button>
          ))}
        </div>

        <p style={{ fontSize: '.78rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '.06em' }}>Sort By</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
          {SORT_OPTIONS.map(o => (
            <button
              key={o.value}
              onClick={() => setSort(o.value)}
              style={{
                padding: '8px 16px', borderRadius: '999px', fontSize: '.82rem', fontWeight: 600,
                border: `2px solid ${sort === o.value ? 'var(--navy)' : 'var(--border)'}`,
                background: sort === o.value ? 'var(--navy)' : 'transparent',
                color: sort === o.value ? '#fff' : 'var(--text-muted)',
                cursor: 'pointer', fontFamily: 'inherit',
              }}
            >
              {o.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setDrawerOpen(false)}
          className="btn btn--primary btn--full"
        >
          Show {filtered.length} Tour{filtered.length !== 1 ? 's' : ''}
        </button>
        {hasFilters && (
          <button onClick={() => { clearAll(); setDrawerOpen(false) }} style={{ width: '100%', textAlign: 'center', marginTop: '12px', fontSize: '.82rem', color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
            Reset all filters
          </button>
        )}
      </div>
    </div>
  )
}
