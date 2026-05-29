'use client'

import { useRef, useEffect } from 'react'
import { useBooking } from '@/lib/booking-context'

const TOURS = [
  'Santa Cruz Island Tour',
  'City Heritage Tour',
  'Island Hopping Package',
  'ZambaSulta + ZamPen Tour',
  'Custom / Group Tour',
]

function formatDate(val: string) {
  if (!val) return null
  return new Date(val + 'T12:00:00').toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  })
}

export default function BookingWidget() {
  const { state, setTour, setDate, setGuests, openDrawer } = useBooking()
  const { tour, date, guests } = state

  const adults = guests
  const guestsRef = useRef<HTMLDivElement>(null)
  const dateInputRef = useRef<HTMLInputElement>(null)
  const tourSelectRef = useRef<HTMLSelectElement>(null)

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (guestsRef.current && !guestsRef.current.contains(e.target as Node)) {
        // close guests panel — handled by parent div click
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  function openDatePicker() {
    const input = dateInputRef.current
    if (!input) return
    if (typeof input.showPicker === 'function') input.showPicker()
    else input.focus()
  }

  function submit(e: React.FormEvent) {
    e.preventDefault()
    openDrawer({ tour, date, guests })
  }

  return (
    <form onSubmit={submit} className="bw">

      {/* Tour */}
      <div className="bw__field bw__field--tour" onClick={() => tourSelectRef.current?.focus()}>
        <span className="bw__label">I want to go to</span>
        <div style={{ position: 'relative' }}>
          <span className="bw__value">{tour}</span>
          <select
            ref={tourSelectRef}
            value={tour}
            onChange={e => setTour(e.target.value)}
            style={{
              position: 'absolute', inset: 0,
              opacity: 0, width: '100%', cursor: 'pointer', fontSize: '1rem',
            }}
          >
            {TOURS.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <div className="bw__sep" />

      {/* Date */}
      <div className="bw__field" onClick={openDatePicker} style={{ cursor: 'pointer' }}>
        <span className="bw__label">On</span>
        <span className="bw__value" style={{ opacity: date ? 1 : 0.45 }}>
          {formatDate(date) ?? 'Select a date'}
        </span>
        <input
          ref={dateInputRef}
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          style={{ position: 'absolute', opacity: 0, width: 0, height: 0, pointerEvents: 'none' }}
          tabIndex={-1}
        />
      </div>

      <div className="bw__sep" />

      {/* Guests */}
      <div className="bw__field" ref={guestsRef} style={{ cursor: 'pointer', position: 'relative' }}>
        <span className="bw__label">With</span>
        <div style={{ borderBottom: '1.5px solid rgba(255,255,255,.3)', paddingBottom: '3px' }}>
          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button type="button" onClick={() => setGuests(Math.max(1, adults - 1))}
                style={{ width: 22, height: 22, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,.4)', background: 'none', color: '#fff', cursor: 'pointer', fontSize: '.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
              <span style={{ fontSize: '.95rem', fontWeight: 600, color: '#fff', minWidth: '60px' }}>
                {adults} Guest{adults !== 1 ? 's' : ''}
              </span>
              <button type="button" onClick={() => setGuests(adults + 1)}
                style={{ width: 22, height: 22, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,.4)', background: 'none', color: '#fff', cursor: 'pointer', fontSize: '.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
            </div>
          </div>
        </div>
      </div>

      <button type="submit" className="bw__btn">
        Check Availability
      </button>
    </form>
  )
}
