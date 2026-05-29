'use client'

import { useState, useRef } from 'react'
import { useBooking } from '@/lib/booking-context'
import DatePicker from './DatePicker'

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

  const [dateOpen, setDateOpen] = useState(false)
  const [dateRect, setDateRect] = useState<{ top: number; left: number; width: number } | null>(null)

  const tourSelectRef = useRef<HTMLSelectElement>(null)
  const dateFieldRef  = useRef<HTMLDivElement>(null)

  function openDatePicker() {
    const el = dateFieldRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    setDateRect({ top: r.bottom, left: r.left, width: r.width })
    setDateOpen(v => !v)
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
            style={{ position: 'absolute', inset: 0, opacity: 0, width: '100%', cursor: 'pointer', fontSize: '1rem' }}
          >
            {TOURS.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <div className="bw__sep" />

      {/* Date */}
      <div ref={dateFieldRef} className="bw__field" onClick={openDatePicker} style={{ cursor: 'pointer' }}>
        <span className="bw__label">On</span>
        <span className="bw__value" style={{ opacity: date ? 1 : 0.45 }}>
          {formatDate(date) ?? 'Select a date'}
        </span>
        {dateOpen && (
          <DatePicker
            value={date}
            onChange={v => { setDate(v); setDateOpen(false) }}
            onClose={() => setDateOpen(false)}
            anchorRect={dateRect}
          />
        )}
      </div>

      <div className="bw__sep" />

      {/* Guests */}
      <div className="bw__field" style={{ cursor: 'default' }}>
        <span className="bw__label">With</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1.5px solid rgba(255,255,255,.3)', paddingBottom: 3 }}>
          <button
            type="button"
            onClick={() => setGuests(Math.max(1, guests - 1))}
            style={{ width: 24, height: 24, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,.4)', background: 'none', color: '#fff', cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
          >−</button>
          <span style={{ fontSize: '.95rem', fontWeight: 600, color: '#fff', minWidth: 64 }}>
            {guests} Guest{guests !== 1 ? 's' : ''}
          </span>
          <button
            type="button"
            onClick={() => setGuests(guests + 1)}
            style={{ width: 24, height: 24, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,.4)', background: 'none', color: '#fff', cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
          >+</button>
        </div>
      </div>

      <button type="submit" className="bw__btn">
        Check Availability
      </button>
    </form>
  )
}
