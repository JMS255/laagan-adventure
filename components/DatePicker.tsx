'use client'

import { useState } from 'react'

interface Props {
  value: string
  onChange: (val: string) => void
  onClose: () => void
}

const DAYS   = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTHS = ['January','February','March','April','May','June',
                'July','August','September','October','November','December']

export default function DatePicker({ value, onChange, onClose }: Props) {
  const today    = new Date()
  const todayY   = today.getFullYear()
  const todayM   = today.getMonth()
  const todayD   = today.getDate()

  const selected = value ? new Date(value + 'T12:00:00') : null

  const [viewY, setViewY] = useState(selected?.getFullYear() ?? todayY)
  const [viewM, setViewM] = useState(selected?.getMonth()    ?? todayM)

  function prevMonth() {
    if (viewM === 0) { setViewM(11); setViewY(y => y - 1) }
    else setViewM(m => m - 1)
  }
  function nextMonth() {
    if (viewM === 11) { setViewM(0); setViewY(y => y + 1) }
    else setViewM(m => m + 1)
  }

  function pick(day: number) {
    const m = String(viewM + 1).padStart(2, '0')
    const d = String(day).padStart(2, '0')
    onChange(`${viewY}-${m}-${d}`)
    onClose()
  }

  // Build calendar cells
  const daysInMonth = new Date(viewY, viewM + 1, 0).getDate()
  const firstDay    = new Date(viewY, viewM, 1).getDay()
  const prevTotal   = new Date(viewY, viewM, 0).getDate()

  const cells: { day: number; type: 'prev' | 'curr' | 'next' }[] = []
  for (let i = firstDay - 1; i >= 0; i--)
    cells.push({ day: prevTotal - i, type: 'prev' })
  for (let i = 1; i <= daysInMonth; i++)
    cells.push({ day: i, type: 'curr' })
  for (let i = 1; cells.length < 42; i++)
    cells.push({ day: i, type: 'next' })

  return (
    <div
      onClick={e => e.stopPropagation()}
      style={{
        position: 'absolute',
        top: 'calc(100% + 12px)',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 308,
        background: 'rgba(16,16,8,.97)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,.1)',
        borderRadius: 16,
        padding: '18px 16px 16px',
        zIndex: 400,
        boxShadow: '0 24px 64px rgba(0,0,0,.55)',
        animation: 'fadeIn .15s ease',
      }}
    >
      {/* Month / year header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <select
            value={viewM}
            onChange={e => setViewM(Number(e.target.value))}
            style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '.92rem', fontWeight: 700, cursor: 'pointer', outline: 'none' }}
          >
            {MONTHS.map((m, i) => (
              <option key={m} value={i} style={{ background: '#1a1a0a', color: '#fff' }}>{m}</option>
            ))}
          </select>
          <select
            value={viewY}
            onChange={e => setViewY(Number(e.target.value))}
            style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '.92rem', fontWeight: 700, cursor: 'pointer', outline: 'none' }}
          >
            {[todayY, todayY + 1, todayY + 2].map(y => (
              <option key={y} value={y} style={{ background: '#1a1a0a', color: '#fff' }}>{y}</option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', gap: 6 }}>
          {[{ label: '‹', fn: prevMonth }, { label: '›', fn: nextMonth }].map(btn => (
            <button
              key={btn.label}
              type="button"
              onClick={btn.fn}
              style={{
                width: 30, height: 30, borderRadius: '50%',
                border: '1.5px solid rgba(255,255,255,.18)',
                background: 'none', color: '#fff', cursor: 'pointer',
                fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >{btn.label}</button>
          ))}
        </div>
      </div>

      {/* Day-of-week headers */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', marginBottom: 6 }}>
        {DAYS.map(d => (
          <div key={d} style={{ textAlign: 'center', fontSize: '.6rem', fontWeight: 700, letterSpacing: '.08em', color: 'rgba(255,255,255,.3)', padding: '3px 0' }}>
            {d}
          </div>
        ))}
      </div>

      {/* Date grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 2 }}>
        {cells.map((cell, i) => {
          const isCurr     = cell.type === 'curr'
          const isPast     = isCurr && new Date(viewY, viewM, cell.day) < new Date(todayY, todayM, todayD)
          const isToday    = isCurr && cell.day === todayD && viewM === todayM && viewY === todayY
          const isSelected = isCurr && selected &&
            cell.day === selected.getDate() && viewM === selected.getMonth() && viewY === selected.getFullYear()

          return (
            <button
              key={i}
              type="button"
              disabled={!isCurr || isPast}
              onClick={() => isCurr && !isPast && pick(cell.day)}
              style={{
                aspectRatio: '1', width: '100%', borderRadius: '50%',
                border: isToday && !isSelected ? '1.5px solid rgba(255,255,255,.35)' : 'none',
                background: isSelected ? '#d9f22a' : 'transparent',
                color: isSelected
                  ? '#1e1e0f'
                  : !isCurr || isPast
                    ? 'rgba(255,255,255,.2)'
                    : '#fff',
                fontSize: '.82rem',
                fontWeight: isSelected ? 800 : 400,
                cursor: isCurr && !isPast ? 'pointer' : 'default',
                transition: 'background .12s',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              {cell.day}
            </button>
          )
        })}
      </div>
    </div>
  )
}
