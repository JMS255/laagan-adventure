'use client'

import { useState } from 'react'
import type { TourDay } from '@/lib/tours-data'

export default function TourDayItinerary({ days }: { days: TourDay[] }) {
  const [open, setOpen] = useState<Set<number>>(new Set([0]))

  function toggle(i: number) {
    setOpen(prev => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i); else next.add(i)
      return next
    })
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.4rem', fontWeight: 800, color: 'var(--navy)', letterSpacing: '-.02em' }}>
          Day by day itinerary
        </h2>
        <button
          onClick={() => setOpen(open.size === days.length ? new Set() : new Set(days.map((_, i) => i)))}
          style={{ fontSize: '.75rem', fontWeight: 700, color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
        >
          {open.size === days.length ? 'Collapse all ↑' : 'Expand all ↓'}
        </button>
      </div>
      <p style={{ fontSize: '.78rem', color: 'var(--muted)', marginBottom: '16px' }}>{days.length}-day tour · Click any day to expand</p>

      {days.map((day, i) => (
        <div
          key={i}
          style={{ border: '1px solid var(--border)', borderRadius: 'var(--r)', marginBottom: '10px', overflow: 'hidden' }}
        >
          <button
            onClick={() => toggle(i)}
            style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 20px', background: open.has(i) ? 'var(--bg-2)' : '#fff', border: 'none', cursor: 'pointer', textAlign: 'left' }}
          >
            <span style={{ fontSize: '.7rem', fontWeight: 800, letterSpacing: '.08em', color: 'var(--muted)', background: 'var(--border)', borderRadius: '6px', padding: '4px 10px', flexShrink: 0, whiteSpace: 'nowrap' }}>
              DAY {day.day}
            </span>
            <span style={{ flex: 1, fontSize: '.9rem', fontWeight: 700, color: 'var(--navy)' }}>{day.title}</span>
            <span style={{ fontSize: '.8rem', fontWeight: 600, color: 'var(--pink)', flexShrink: 0 }}>
              {open.has(i) ? 'See less ↑' : 'See more ↓'}
            </span>
          </button>

          {open.has(i) && (
            <div style={{ padding: '0 20px 20px' }}>
              <p style={{ fontSize: '.88rem', color: 'var(--muted)', marginBottom: '12px', fontStyle: 'italic' }}>📍 {day.location}</p>
              <p style={{ fontSize: '.88rem', color: 'var(--text)', lineHeight: 1.75, marginBottom: '14px' }}>{day.description}</p>
              {day.highlights.length > 0 && (
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {day.highlights.map(h => (
                    <li key={h} style={{ display: 'flex', gap: '8px', fontSize: '.82rem', color: 'var(--muted)' }}>
                      <span style={{ color: 'var(--pink)', flexShrink: 0 }}>✓</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
