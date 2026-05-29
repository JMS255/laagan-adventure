'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Tab { id: string; label: string }

interface Props {
  tabs: Tab[]
  tourPrice?: number
  tourSlug?: string
}

export default function TourTabs({ tabs, tourPrice, tourSlug }: Props) {
  const [active, setActive] = useState(tabs[0]?.id ?? '')

  useEffect(() => {
    if (tabs.length === 0) return
    const observers = tabs.map(tab => {
      const el = document.getElementById(tab.id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(tab.id) },
        { rootMargin: '-35% 0px -60% 0px', threshold: 0 }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(obs => obs?.disconnect())
  }, [tabs])

  function scrollTo(id: string) {
    const el = document.getElementById(id)
    if (!el) return
    const offset = 178
    const top = el.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
    setActive(id)
  }

  return (
    <div style={{
      position: 'sticky',
      top: 'var(--nav-h)',
      background: '#fff',
      borderBottom: '1px solid var(--border)',
      zIndex: 100,
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Tabs */}
        <div style={{ display: 'flex', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => scrollTo(tab.id)}
              style={{
                padding: '18px 20px',
                background: 'none',
                border: 'none',
                borderBottom: active === tab.id
                  ? '2.5px solid var(--pink)'
                  : '2.5px solid transparent',
                color: active === tab.id ? 'var(--navy)' : 'var(--text-muted)',
                fontFamily: 'inherit',
                fontSize: '.85rem',
                fontWeight: active === tab.id ? 700 : 500,
                cursor: 'pointer',
                transition: 'color .2s, border-color .2s',
                whiteSpace: 'nowrap',
                marginBottom: '-1px',
                flexShrink: 0,
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Price + Book CTA — hidden on small phones */}
        {tourPrice && tourSlug && (
          <div className="tour-tabs-cta" style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0, paddingLeft: '16px' }}>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--navy)', lineHeight: 1 }}>
                ₱{tourPrice.toLocaleString()}
              </p>
              <p style={{ fontSize: '.65rem', color: 'var(--text-muted)', marginTop: '2px' }}>per person</p>
            </div>
            <Link
              href={`/book/${tourSlug}`}
              className="btn btn--primary"
              style={{ padding: '10px 20px', fontSize: '.78rem', borderRadius: '8px', fontFamily: 'inherit', whiteSpace: 'nowrap' }}
            >
              Book →
            </Link>
          </div>
        )}

      </div>
    </div>
  )
}
