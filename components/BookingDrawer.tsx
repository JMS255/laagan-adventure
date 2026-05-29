'use client'

import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { useBooking } from '@/lib/booking-context'

const TOURS = [
  {
    name: 'Santa Cruz Island Tour',
    tag: 'Most Popular',
    desc: 'Pink sand beach, crystal-clear water. One of the Philippines\' most stunning natural attractions — fully guided return trip.',
    from: '₱1,500',
    gradient: 'linear-gradient(160deg, #0ea5e9 0%, #0369a1 60%, #0c1f3f 100%)',
  },
  {
    name: 'City Heritage Tour',
    tag: 'Culture',
    desc: 'Forts, mosques, colonial streets. Explore the cultural soul of Zamboanga City with a local who actually knows the stories.',
    from: '₱800',
    gradient: 'linear-gradient(160deg, #d97706 0%, #92400e 60%, #1a0f00 100%)',
  },
  {
    name: 'Island Hopping Package',
    tag: 'Adventure',
    desc: 'Multiple islands in one full day. Hidden coves, turquoise water, fresh seafood stops — the full experience.',
    from: '₱1,800',
    gradient: 'linear-gradient(160deg, #0d9488 0%, #0f766e 60%, #052e2a 100%)',
  },
  {
    name: 'ZambaSulta + ZamPen Tour',
    tag: 'Full Day',
    desc: 'Two provinces, one epic journey. The most complete Zamboanga experience you can do in a day.',
    from: '₱2,500',
    gradient: 'linear-gradient(160deg, #7c3aed 0%, #5b21b6 60%, #1a0a38 100%)',
  },
  {
    name: 'Custom / Group Tour',
    tag: 'Groups',
    desc: 'Schools, corporate teams, large groups. Tell us what you need and we\'ll build a custom itinerary around your schedule.',
    from: 'Custom rate',
    gradient: 'linear-gradient(160deg, #be185d 0%, #9d174d 60%, #2d0318 100%)',
  },
]

function formatDate(val: string) {
  if (!val) return null
  return new Date(val + 'T12:00:00').toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  })
}

export default function BookingDrawer() {
  const { state, closeDrawer } = useBooking()
  const { open, tour: selectedTour, date, guests } = state

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') closeDrawer()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [closeDrawer])

  if (!open) return null

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        onClick={closeDrawer}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,.55)',
          backdropFilter: 'blur(3px)',
          zIndex: 998,
          animation: 'fadeIn .2s ease',
        }}
      />

      {/* Drawer */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0,
        width: '100%', maxWidth: '460px',
        background: '#fff',
        zIndex: 999,
        overflowY: 'auto',
        boxShadow: '-12px 0 60px rgba(0,0,0,.25)',
        animation: 'slideInRight .28s cubic-bezier(.22,.68,0,1.2)',
        display: 'flex', flexDirection: 'column',
      }}>

        {/* Header */}
        <div style={{
          padding: '20px 24px 16px',
          borderBottom: '1px solid #ebebeb',
          position: 'sticky', top: 0,
          background: '#fff', zIndex: 2,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{
                fontSize: '.62rem', fontWeight: 700,
                letterSpacing: '.14em', textTransform: 'uppercase',
                color: '#aaa', marginBottom: '8px',
              }}>
                Select your tour
              </p>
              <div style={{ display: 'flex', gap: '18px', flexWrap: 'wrap' }}>
                {formatDate(date) && (
                  <span style={{ fontSize: '.82rem', color: '#444', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span style={{ fontSize: '.9rem' }}>📅</span> {formatDate(date)}
                  </span>
                )}
                <span style={{ fontSize: '.82rem', color: '#444', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ fontSize: '.9rem' }}>👥</span> {guests} guest{guests !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
            <button
              onClick={closeDrawer}
              style={{
                width: 36, height: 36, flexShrink: 0,
                border: '1.5px solid #e0e0e0', borderRadius: '50%',
                background: 'none', cursor: 'pointer',
                fontSize: '1.2rem', color: '#666', lineHeight: 1,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all .15s',
              }}
            >
              ×
            </button>
          </div>
        </div>

        {/* Tour cards */}
        <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
          {TOURS.map(t => {
            const params = new URLSearchParams()
            params.set('tour', t.name)
            if (date) params.set('date', date)
            params.set('guests', String(guests))
            const isSelected = selectedTour === t.name

            return (
              <Link
                key={t.name}
                href={`/contact?${params.toString()}`}
                onClick={closeDrawer}
                style={{
                  textDecoration: 'none', color: 'inherit',
                  display: 'block', borderRadius: '14px', overflow: 'hidden',
                  border: `2px solid ${isSelected ? 'var(--navy)' : '#eee'}`,
                  transition: 'border-color .15s, box-shadow .15s',
                  boxShadow: isSelected ? '0 4px 20px rgba(30,30,15,.15)' : 'none',
                }}
              >
                {/* Gradient image area */}
                <div style={{
                  height: '140px', background: t.gradient,
                  position: 'relative', overflow: 'hidden',
                }}>
                  <div style={{
                    position: 'absolute', top: 12, right: 12,
                    background: 'rgba(255,255,255,.18)',
                    backdropFilter: 'blur(6px)',
                    borderRadius: '999px', padding: '4px 12px',
                    fontSize: '.65rem', fontWeight: 700,
                    letterSpacing: '.06em', textTransform: 'uppercase',
                    color: '#fff',
                  }}>
                    {t.tag}
                  </div>
                  <div style={{ position: 'absolute', bottom: 14, left: 16, right: 16 }}>
                    <p style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>
                      {t.name}
                    </p>
                    <p style={{ fontSize: '.72rem', color: 'rgba(255,255,255,.7)', marginTop: '3px' }}>
                      From {t.from} / person
                    </p>
                  </div>
                </div>

                {/* Body */}
                <div style={{ padding: '14px 16px 16px', background: '#fff' }}>
                  <p style={{ fontSize: '.82rem', color: '#666', lineHeight: 1.65 }}>{t.desc}</p>
                  <div style={{
                    marginTop: '12px', display: 'flex',
                    alignItems: 'center', justifyContent: 'flex-end',
                  }}>
                    <span style={{
                      fontSize: '.78rem', fontWeight: 800,
                      color: 'var(--navy)',
                      display: 'flex', alignItems: 'center', gap: '4px',
                    }}>
                      Book this tour →
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        <p style={{
          textAlign: 'center', fontSize: '.72rem', color: '#bbb',
          padding: '16px 24px 32px',
        }}>
          No upfront payment. We confirm via Messenger.
        </p>
      </div>
    </>,
    document.body
  )
}
