'use client'

import { useState, useMemo } from 'react'
import { ZAMBOANGA_SPOTS } from '@/lib/spots'
import type { Pricing } from '@/lib/spots'

const DESTINATIONS = [
  { id: 'zamboanga',   label: 'Zamboanga City',    sub: 'Heritage & culture tour', gradient: 'linear-gradient(160deg,#d97706,#b45309,#1a2744)' },
  { id: 'santa-cruz',  label: 'Santa Cruz Island', sub: 'Pink sand beach day trip', gradient: 'linear-gradient(160deg,#0ea5e9,#0369a1,#1a2744)' },
  { id: 'basilan',     label: 'Basilan Province',  sub: 'Beach & waterfall day trip', gradient: 'linear-gradient(160deg,#059669,#047857,#1a2744)' },
  { id: 'zambasulta',  label: 'ZAMBASULTA Journey', sub: '7-day complete southern arc', gradient: 'linear-gradient(160deg,#7c3aed,#6d28d9,#1a2744)' },
]

const DEST_NOTES: Record<string, string> = {
  'santa-cruz':  'Full island experience — pink sand beach, protected lagoon, snorkelling, and a boat ride across the bay. We handle the permits.',
  'basilan':     'Malamawi White Beach + Bulingan Falls. A full day of beach and jungle, one island away from the city.',
  'zambasulta':  '7-day route covering Zamboanga, Basilan, Sulu, and Tawi-Tawi. We\'ll send you the full day-by-day itinerary once we confirm.',
}

function buildMessage(dest: string, destLabel: string, groupSize: string, pricing: Pricing, spots: Set<string>, date: string, notes: string) {
  const price = pricing[groupSize as 'small' | 'large']
  const groupLabel = price.label
  const priceLabel = `₱${price.price.toLocaleString()}`

  const lines = [`Hi Laagan! 👋 I'd like to plan a trip to *${destLabel}*.`, '']

  lines.push(`Group: *${groupLabel}* (${priceLabel} total)`)
  lines.push(`Date: *${date}*`)

  if (dest === 'zamboanga' && spots.size > 0) {
    const spotNames = ZAMBOANGA_SPOTS.filter(s => spots.has(s.id)).map(s => s.name)
    lines.push(`Stops I want: ${spotNames.join(', ')}`)
  }

  if (notes.trim()) {
    lines.push('', notes.trim())
  }

  lines.push('', 'Can you confirm availability? Thank you! 🙏')
  return lines.join('\n')
}

interface Props {
  pricing: Pricing
  initialTour?: string
}

export default function TripBuilder({ pricing, initialTour }: Props) {
  const [dest, setDest]       = useState<string | null>(null)
  const [groupSize, setGroup] = useState<'small' | 'large' | null>(null)
  const [spots, setSpots]     = useState<Set<string>>(() => new Set(ZAMBOANGA_SPOTS.filter(s => s.defaultOn).map(s => s.id)))
  const [date, setDate]       = useState(initialTour ? '' : '')
  const [notes, setNotes]     = useState(initialTour ? `Interested in: ${initialTour}` : '')

  const ready = !!(dest && groupSize && date.trim())

  const messengerHref = useMemo(() => {
    if (!ready) return '#'
    const d = DESTINATIONS.find(x => x.id === dest)!
    const msg = buildMessage(dest!, d.label, groupSize!, pricing, spots, date, notes)
    return `https://m.me/61562040673545?text=${encodeURIComponent(msg)}`
  }, [dest, groupSize, spots, date, notes, pricing, ready])

  function toggleSpot(id: string) {
    setSpots(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>

      {/* Step A: Destination */}
      <div>
        <p style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--pink)', marginBottom: '10px' }}>
          Where are you going?
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }} className="trip-dest-grid">
          {DESTINATIONS.map(d => (
            <button key={d.id} onClick={() => { setDest(d.id); setGroup(null) }} style={{
              background: dest === d.id ? d.gradient : 'var(--bg-2)',
              border: `2px solid ${dest === d.id ? 'transparent' : 'var(--border)'}`,
              borderRadius: '14px', padding: '20px 18px', textAlign: 'left',
              cursor: 'pointer', fontFamily: 'inherit', transition: 'all .2s',
            }}>
              <p style={{ fontSize: '.88rem', fontWeight: 800, color: dest === d.id ? '#fff' : 'var(--navy)', marginBottom: '4px' }}>{d.label}</p>
              <p style={{ fontSize: '.72rem', color: dest === d.id ? 'rgba(255,255,255,.7)' : 'var(--text-muted)' }}>{d.sub}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Step B: Group size */}
      {dest && (
        <div>
          <p style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--pink)', marginBottom: '10px' }}>
            How many people?
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {(['small', 'large'] as const).map(key => {
              const p = pricing[key]
              const active = groupSize === key
              return (
                <button key={key} onClick={() => setGroup(key)} style={{
                  padding: '20px', borderRadius: '14px', textAlign: 'left',
                  border: `2px solid ${active ? 'var(--pink)' : 'var(--border)'}`,
                  background: active ? 'rgba(217,107,138,.06)' : 'var(--bg-2)',
                  cursor: 'pointer', fontFamily: 'inherit', transition: 'all .2s',
                }}>
                  <p style={{ fontSize: '1rem', fontWeight: 800, color: active ? 'var(--pink)' : 'var(--navy)', marginBottom: '4px' }}>{p.label}</p>
                  <p style={{ fontSize: '1.2rem', fontWeight: 800, color: active ? 'var(--pink)' : 'var(--navy)' }}>₱{p.price.toLocaleString()}</p>
                  <p style={{ fontSize: '.68rem', color: 'var(--text-muted)', marginTop: '2px' }}>total group price</p>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Step C: Spots (Zamboanga only) */}
      {dest === 'zamboanga' && groupSize && (
        <div>
          <p style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--pink)', marginBottom: '4px' }}>
            Pick your stops
          </p>
          <p style={{ fontSize: '.82rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
            Untick anything you&apos;d rather skip — price stays the same.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {ZAMBOANGA_SPOTS.map(spot => {
              const checked = spots.has(spot.id)
              return (
                <button key={spot.id} onClick={() => toggleSpot(spot.id)} style={{
                  display: 'flex', alignItems: 'center', gap: '14px',
                  padding: '14px 16px', borderRadius: '12px', textAlign: 'left',
                  border: `2px solid ${checked ? 'var(--pink)' : 'var(--border)'}`,
                  background: checked ? 'rgba(217,107,138,.05)' : '#fff',
                  cursor: 'pointer', fontFamily: 'inherit', transition: 'all .15s',
                }}>
                  <span style={{ fontSize: '1.3rem', flexShrink: 0 }}>{spot.icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: '.88rem', fontWeight: 700, color: checked ? 'var(--navy)' : 'var(--text-muted)', marginBottom: '2px' }}>{spot.name}</p>
                    <p style={{ fontSize: '.75rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{spot.desc}</p>
                  </div>
                  <span style={{
                    width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                    background: checked ? 'var(--pink)' : 'transparent',
                    border: `2px solid ${checked ? 'var(--pink)' : 'var(--border)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontSize: '.7rem', fontWeight: 800,
                  }}>
                    {checked ? '✓' : ''}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Step C: Note for other destinations */}
      {dest && dest !== 'zamboanga' && groupSize && DEST_NOTES[dest] && (
        <div style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: '14px', padding: '20px' }}>
          <p style={{ fontSize: '.88rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>{DEST_NOTES[dest]}</p>
        </div>
      )}

      {/* Date + Notes + CTA */}
      {dest && groupSize && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Preferred date *</label>
            <input type="text" value={date} onChange={e => setDate(e.target.value)} placeholder="e.g. June 15, 2026 or any weekend in July" style={{ width: '100%' }} />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Anything else? (optional)</label>
            <textarea rows={2} value={notes} onChange={e => setNotes(e.target.value)} placeholder="Special requests, accessibility needs, questions…" style={{ width: '100%' }} />
          </div>

          <a
            href={ready ? messengerHref : undefined}
            target="_blank"
            rel="noopener noreferrer"
            onClick={!ready ? e => e.preventDefault() : undefined}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
              width: '100%', padding: '18px',
              background: ready ? 'var(--navy)' : 'var(--border)',
              color: ready ? '#fff' : 'var(--text-muted)',
              borderRadius: '14px', fontFamily: 'inherit',
              fontSize: '1rem', fontWeight: 800, textDecoration: 'none',
              cursor: ready ? 'pointer' : 'not-allowed', transition: 'background .2s',
            }}
          >
            💬 Plan this with us on Messenger →
          </a>
          {!ready && <p style={{ textAlign: 'center', fontSize: '.72rem', color: 'var(--text-muted)' }}>Fill in your date to continue</p>}
        </div>
      )}

    </div>
  )
}
