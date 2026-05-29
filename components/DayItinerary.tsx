'use client'

import { useState } from 'react'
import { urlFor } from '@/lib/sanity'

import type { DayItem } from '@/lib/types'

export default function DayItinerary({ days }: { days: DayItem[] }) {
  const [openDays, setOpenDays] = useState<Set<number>>(new Set([0]))

  const allExpanded = openDays.size === days.length

  function toggle(i: number) {
    setOpenDays(prev => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  function toggleAll() {
    setOpenDays(allExpanded ? new Set() : new Set(days.map((_, i) => i)))
  }

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px' }}>
        <div>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '4px' }}>
            Day by day itinerary
          </h2>
          <p style={{ fontSize: '.82rem', color: 'var(--text-muted)' }}>
            {days.length}-day tour · Click any day to expand
          </p>
        </div>
        <button
          onClick={toggleAll}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: '.78rem', fontWeight: 600, color: 'var(--navy)',
            fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '5px',
            padding: '6px 0', flexShrink: 0,
          }}
        >
          {allExpanded ? 'Collapse all' : 'Expand all'}
          <span style={{
            display: 'inline-block',
            transition: 'transform .2s',
            transform: allExpanded ? 'rotate(180deg)' : 'none',
          }}>↓</span>
        </button>
      </div>

      {/* Day rows */}
      <div style={{ border: '1px solid var(--border)', borderRadius: '14px', overflow: 'hidden' }}>
        {days.map((day, i) => {
          const isOpen = openDays.has(i)
          const label = day.dayLabel || `Day ${i + 1}`

          return (
            <div
              key={day._key || i}
              style={{ borderBottom: i < days.length - 1 ? '1px solid var(--border)' : 'none' }}
            >
              {/* Collapsed row — always visible */}
              <div
                onClick={() => toggle(i)}
                style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '16px 24px', cursor: 'pointer', userSelect: 'none',
                  background: isOpen ? 'var(--bg-2)' : '#fff',
                  transition: 'background .15s',
                  gap: '12px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0 }}>
                  <span style={{
                    background: isOpen ? 'var(--pink)' : 'transparent',
                    color: isOpen ? '#fff' : 'var(--text-muted)',
                    border: `1.5px solid ${isOpen ? 'var(--pink)' : 'var(--border)'}`,
                    borderRadius: '6px',
                    padding: '3px 10px',
                    fontSize: '.65rem', fontWeight: 800, letterSpacing: '.06em',
                    textTransform: 'uppercase', flexShrink: 0,
                    transition: 'all .15s',
                  }}>
                    {label}
                  </span>
                  <span style={{
                    fontSize: '.92rem', fontWeight: 600, color: 'var(--navy)',
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>
                    {day.title}
                  </span>
                </div>
                <span style={{
                  fontSize: '.78rem', fontWeight: 600, color: 'var(--pink)',
                  display: 'flex', alignItems: 'center', gap: '4px',
                  flexShrink: 0,
                }}>
                  {isOpen ? 'See less' : 'See more'}
                  <span style={{
                    display: 'inline-block',
                    transition: 'transform .2s',
                    transform: isOpen ? 'rotate(180deg)' : 'none',
                  }}>↓</span>
                </span>
              </div>

              {/* Expanded content */}
              {isOpen && (
                <div style={{
                  padding: '28px 24px',
                  borderTop: '1px solid var(--border)',
                  background: '#fff',
                  animation: 'fadeIn .15s ease',
                }}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: day.photo ? '1fr 260px' : '1fr',
                    gap: '28px',
                    alignItems: 'start',
                  }}>
                    {/* Left: text */}
                    <div>
                      <h3 style={{
                        fontSize: '1.05rem', fontWeight: 700, color: 'var(--navy)',
                        marginBottom: day.description ? '12px' : '0',
                      }}>
                        {day.title}
                      </h3>
                      {day.description && (
                        <p style={{
                          fontSize: '.88rem', color: 'var(--text-muted)', lineHeight: 1.75,
                          marginBottom: day.highlights?.length ? '20px' : '0',
                        }}>
                          {day.description}
                        </p>
                      )}
                      {day.highlights && day.highlights.length > 0 && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {day.highlights.map((h, j) => (
                            <div key={j} style={{
                              display: 'flex', gap: '10px', alignItems: 'flex-start',
                              fontSize: '.85rem', color: 'var(--text)', lineHeight: 1.5,
                            }}>
                              <span style={{ color: 'var(--pink)', flexShrink: 0, fontWeight: 700, marginTop: '1px' }}>✓</span>
                              {h}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Right: photo */}
                    {day.photo && (
                      <div style={{
                        borderRadius: '10px', overflow: 'hidden',
                        aspectRatio: '4/3', flexShrink: 0,
                      }}>
                        <img
                          src={urlFor(day.photo).width(500).height(375).url()}
                          alt={day.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
