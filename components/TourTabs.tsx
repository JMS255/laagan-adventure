'use client'

import { useState, useEffect } from 'react'

interface Tab { id: string; label: string }

export default function TourTabs({ tabs }: { tabs: Tab[] }) {
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
    // Account for fixed nav (110px) + sticky tabs bar (56px) + breathing room
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
      <div className="container" style={{ display: 'flex' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => scrollTo(tab.id)}
            style={{
              padding: '18px 28px',
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
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}
