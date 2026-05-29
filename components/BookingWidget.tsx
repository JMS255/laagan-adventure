'use client'

import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
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

const counterBtn: React.CSSProperties = {
  width: 26, height: 26, borderRadius: '50%',
  border: '1.5px solid rgba(255,255,255,.4)',
  background: 'none', color: '#fff', cursor: 'pointer',
  fontSize: '1rem', fontFamily: 'inherit',
  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
}

export default function BookingWidget() {
  const { state, setTour, setDate, setGuests, openDrawer } = useBooking()
  const { tour, date, guests } = state

  const [tourOpen, setTourOpen]   = useState(false)
  const [tourRect, setTourRect]   = useState<DOMRect | null>(null)
  const [dateOpen, setDateOpen]   = useState(false)
  const [dateRect, setDateRect]   = useState<{ top: number; fieldTop: number; left: number; width: number } | null>(null)

  const tourFieldRef = useRef<HTMLDivElement>(null)
  const dateFieldRef = useRef<HTMLDivElement>(null)

  // Close everything on scroll so dropdowns don't float detached from widget
  useEffect(() => {
    const close = () => { setTourOpen(false); setDateOpen(false) }
    window.addEventListener('scroll', close, { passive: true })
    return () => window.removeEventListener('scroll', close)
  }, [])

  function toggleTour() {
    const r = tourFieldRef.current?.getBoundingClientRect()
    if (r) setTourRect(r)
    setTourOpen(v => !v)
    setDateOpen(false)
  }

  function toggleDate() {
    const r = dateFieldRef.current?.getBoundingClientRect()
    if (r) setDateRect({ top: r.bottom, fieldTop: r.top, left: r.left, width: r.width })
    setDateOpen(v => !v)
    setTourOpen(false)
  }

  function submit(e: React.FormEvent) {
    e.preventDefault()
    openDrawer({ tour, date, guests })
  }

  return (
    <>
      {/* Tour dropdown — portal so it escapes overflow:hidden */}
      {tourOpen && tourRect && typeof document !== 'undefined' && createPortal(
        <TourDropdown
          value={tour}
          rect={tourRect}
          onSelect={t => { setTour(t); setTourOpen(false) }}
          onClose={() => setTourOpen(false)}
        />,
        document.body
      )}

      <form onSubmit={submit} className="bw">

        {/* Tour field */}
        <div ref={tourFieldRef} className="bw__field bw__field--tour" onClick={toggleTour} style={{ cursor: 'pointer' }}>
          <span className="bw__label">I want to go to</span>
          <span className="bw__value" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {tour}
            <span style={{ opacity: .5, fontSize: '.75rem', marginLeft: 6, flexShrink: 0 }}>
              {tourOpen ? '▲' : '▼'}
            </span>
          </span>
        </div>

        <div className="bw__sep" />

        {/* Date field */}
        <div ref={dateFieldRef} data-datefield className="bw__field" onClick={toggleDate} style={{ cursor: 'pointer' }}>
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

        {/* Guests field */}
        <div className="bw__field">
          <span className="bw__label">With</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1.5px solid rgba(255,255,255,.3)', paddingBottom: 3 }}>
            <button type="button" onClick={() => setGuests(Math.max(1, guests - 1))} style={counterBtn}>−</button>
            <span style={{ fontSize: '.95rem', fontWeight: 600, color: '#fff', minWidth: 64 }}>
              {guests} Guest{guests !== 1 ? 's' : ''}
            </span>
            <button type="button" onClick={() => setGuests(guests + 1)} style={counterBtn}>+</button>
          </div>
        </div>

        <button type="submit" className="bw__btn">Check Availability</button>
      </form>
    </>
  )
}

/* ── Custom styled tour dropdown ── */
function TourDropdown({
  value, rect, onSelect, onClose,
}: {
  value: string
  rect: DOMRect
  onSelect: (t: string) => void
  onClose: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [onClose])

  const w        = Math.max(rect.width + 40, 270)
  const left     = Math.max(12, Math.min(rect.left, window.innerWidth - w - 12))
  const dropH    = TOURS.length * 50 + 8
  const spaceBelow = window.innerHeight - rect.bottom
  const top      = spaceBelow < dropH + 12 ? rect.top - dropH - 6 : rect.bottom + 6

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed', top, left, width: w,
        background: '#18180c',
        border: '1px solid rgba(255,255,255,.14)',
        borderRadius: 12, overflow: 'hidden',
        zIndex: 9999,
        boxShadow: '0 20px 60px rgba(0,0,0,.7)',
        animation: 'fadeIn .15s ease',
      }}
    >
      {TOURS.map((t, i) => (
        <div
          key={t}
          onClick={() => onSelect(t)}
          style={{
            padding: '13px 20px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: t === value ? 'rgba(217,242,42,.1)' : 'transparent',
            color: t === value ? '#d9f22a' : 'rgba(255,255,255,.85)',
            fontSize: '.88rem', fontWeight: t === value ? 700 : 400,
            cursor: 'pointer',
            borderBottom: i < TOURS.length - 1 ? '1px solid rgba(255,255,255,.07)' : 'none',
            transition: 'background .1s',
          }}
          onMouseEnter={e => {
            if (t !== value) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,.07)'
          }}
          onMouseLeave={e => {
            if (t !== value) (e.currentTarget as HTMLElement).style.background = 'transparent'
          }}
        >
          {t}
          {t === value && <span style={{ fontSize: '.8rem' }}>✓</span>}
        </div>
      ))}
    </div>
  )
}
