'use client'

import { useMemo } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import type { TourCard } from '@/lib/types'

export default function ToursFilter({ tours }: { tours: TourCard[] }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const active = searchParams.get('destination') ?? 'all'

  const destinations = useMemo(() => {
    const unique = Array.from(new Set(tours.map(t => t.destination).filter(Boolean))) as string[]
    return unique
  }, [tours])

  const filtered = useMemo(() => {
    if (active === 'all') return tours
    return tours.filter(t => t.destination === active)
  }, [tours, active])

  function setFilter(dest: string) {
    if (dest === 'all') { router.push(pathname); return }
    const p = new URLSearchParams()
    p.set('destination', dest)
    router.push(`${pathname}?${p.toString()}`)
  }

  return (
    <div>
      {/* Filter pills */}
      {destinations.length > 1 && (
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '40px' }}>
          {(['all', ...destinations] as string[]).map(dest => {
            const isActive = active === dest
            return (
              <button
                key={dest}
                onClick={() => setFilter(dest)}
                style={{
                  padding: '9px 20px', borderRadius: '999px',
                  border: `2px solid ${isActive ? 'var(--pink)' : 'var(--border)'}`,
                  background: isActive ? 'var(--pink)' : 'transparent',
                  color: isActive ? '#fff' : 'var(--text-muted)',
                  fontFamily: 'inherit', fontSize: '.82rem', fontWeight: 600,
                  cursor: 'pointer', transition: 'all .2s', whiteSpace: 'nowrap',
                }}
              >
                {dest === 'all' ? 'All Tours' : dest}
              </button>
            )
          })}
        </div>
      )}

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="tours-grid">
          {filtered.map((tour) => (
            <Link href={`/tours/${tour.slug.current}`} className="tour-card" key={tour._id}>
              <div className="tour-card__img" style={{ position: 'relative' }}>
                {tour.mainImage ? (
                  <Image src={urlFor(tour.mainImage).width(600).height(450).url()} fill alt={tour.title} style={{ objectFit: 'cover' }} sizes="(max-width:600px) 100vw,(max-width:900px) 50vw,33vw" />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, var(--navy-2), var(--navy))' }} />
                )}
                {tour.badgeLabel && (
                  <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-start' }}>
                    <span style={{ background: 'var(--pink)', color: '#fff', fontSize: '.7rem', fontWeight: 800, padding: '4px 10px', borderRadius: '999px', letterSpacing: '.04em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                      {tour.badgeLabel}
                    </span>
                    {tour.urgencyNote && (
                      <span style={{ background: 'rgba(0,0,0,.65)', color: '#fff', fontSize: '.68rem', fontWeight: 600, padding: '3px 9px', borderRadius: '999px', backdropFilter: 'blur(4px)', whiteSpace: 'nowrap' }}>
                        {tour.urgencyNote}
                      </span>
                    )}
                  </div>
                )}
              </div>
              <div className="tour-card__body">
                <p className="tour-card__tag">{tour.destination || 'Zamboanga City'}</p>
                <h3 className="tour-card__title">{tour.title}</h3>
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
          <p style={{ fontWeight: 700, color: 'var(--navy)', marginBottom: '8px' }}>No tours for this destination yet</p>
          <p style={{ fontSize: '.85rem', color: 'var(--text-muted)', marginBottom: '24px' }}>Message us — we may be able to arrange it.</p>
          <a href="https://m.me/61562040673545" target="_blank" rel="noopener noreferrer" className="btn btn--primary">
            💬 Ask on Messenger
          </a>
        </div>
      )}
    </div>
  )
}
