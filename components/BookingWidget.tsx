'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const TOURS = [
  'Santa Cruz Island Tour',
  'City Heritage Tour',
  'Island Hopping Package',
  'ZambaSulta + ZamPen Tour',
  'Custom / Group Tour',
]

export default function BookingWidget() {
  const router = useRouter()
  const [tour, setTour] = useState('Santa Cruz Island Tour')
  const [date, setDate] = useState('')
  const [adults, setAdults] = useState(2)
  const [kids, setKids] = useState(0)
  const [guestsOpen, setGuestsOpen] = useState(false)
  const guestsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (guestsRef.current && !guestsRef.current.contains(e.target as Node)) {
        setGuestsOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const guestSummary = `${adults} Adult${adults !== 1 ? 's' : ''}${kids > 0 ? `, ${kids} Kid${kids !== 1 ? 's' : ''}` : ''}`

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams()
    params.set('tour', tour)
    if (date) params.set('date', date)
    params.set('guests', String(adults + kids))
    router.push(`/contact?${params.toString()}`)
  }

  return (
    <form onSubmit={submit} className="bw">

      {/* Tour */}
      <div className="bw__field">
        <span className="bw__label">I want to go to</span>
        <select
          value={tour}
          onChange={e => setTour(e.target.value)}
          className="bw__select"
        >
          {TOURS.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <div className="bw__sep" />

      {/* Date */}
      <div className="bw__field">
        <span className="bw__label">On</span>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="bw__input"
          placeholder="Select a date"
        />
      </div>

      <div className="bw__sep" />

      {/* Guests */}
      <div
        className="bw__field"
        ref={guestsRef}
        onClick={() => setGuestsOpen(v => !v)}
      >
        <span className="bw__label">With</span>
        <span className="bw__value">{guestSummary}</span>

        {guestsOpen && (
          <div className="bw__guests-panel" onClick={e => e.stopPropagation()}>
            <div className="bw__guest-row">
              <div>
                <p className="bw__guest-type">Adults</p>
                <p className="bw__guest-note">Age 13+</p>
              </div>
              <div className="bw__counter">
                <button type="button" onClick={() => setAdults(a => Math.max(1, a - 1))} className="bw__counter-btn">−</button>
                <span>{adults}</span>
                <button type="button" onClick={() => setAdults(a => a + 1)} className="bw__counter-btn">+</button>
              </div>
            </div>
            <div className="bw__guest-row">
              <div>
                <p className="bw__guest-type">Kids</p>
                <p className="bw__guest-note">Under 13</p>
              </div>
              <div className="bw__counter">
                <button type="button" onClick={() => setKids(k => Math.max(0, k - 1))} className="bw__counter-btn">−</button>
                <span>{kids}</span>
                <button type="button" onClick={() => setKids(k => k + 1)} className="bw__counter-btn">+</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <button type="submit" className="bw__btn">
        Check Availability
      </button>
    </form>
  )
}
