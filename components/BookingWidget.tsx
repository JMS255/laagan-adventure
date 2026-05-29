'use client'

import { useState } from 'react'
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
  const [tour, setTour] = useState('')
  const [date, setDate] = useState('')
  const [guests, setGuests] = useState('2')

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams()
    if (tour) params.set('tour', tour)
    if (date) params.set('date', date)
    if (guests) params.set('guests', guests)
    router.push(`/contact?${params.toString()}`)
  }

  return (
    <form onSubmit={submit} className="booking-widget">
      <div className="booking-widget__field">
        <label className="booking-widget__label">Tour</label>
        <select value={tour} onChange={e => setTour(e.target.value)} className="booking-widget__select">
          <option value="">Select a tour…</option>
          {TOURS.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>
      <div className="booking-widget__divider" />
      <div className="booking-widget__field">
        <label className="booking-widget__label">Date</label>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} className="booking-widget__input" />
      </div>
      <div className="booking-widget__divider" />
      <div className="booking-widget__field">
        <label className="booking-widget__label">Group Size</label>
        <select value={guests} onChange={e => setGuests(e.target.value)} className="booking-widget__select">
          {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n} {n === 1 ? 'person' : 'people'}</option>)}
          <option value="10+">10+ people</option>
        </select>
      </div>
      <button type="submit" className="booking-widget__btn">
        Check Availability →
      </button>
    </form>
  )
}
