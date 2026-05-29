'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

interface AnchorRect {
  top: number    // bottom edge of the field (viewport-relative)
  fieldTop: number  // top edge of the field
  left: number
  width: number
}

interface Props {
  value: string
  onChange: (val: string) => void
  onClose: () => void
  anchorRect: AnchorRect | null
}

const DAYS   = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTHS = ['January','February','March','April','May','June',
                'July','August','September','October','November','December']
const CAL_H  = 340

export default function DatePicker({ value, onChange, onClose, anchorRect }: Props) {
  const today  = new Date()
  const todayY = today.getFullYear()
  const todayM = today.getMonth()
  const todayD = today.getDate()

  const selected = value ? new Date(value + 'T12:00:00') : null

  const [viewY, setViewY] = useState(selected?.getFullYear() ?? todayY)
  const [viewM, setViewM] = useState(selected?.getMonth()    ?? todayM)

  useEffect(() => {
    function handler(e: MouseEvent) {
      const t = e.target as Element
      if (!t.closest('[data-datepicker]') && !t.closest('[data-datefield]')) onClose()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [onClose])

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
  }

  // Build grid
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

  if (!anchorRect || typeof window === 'undefined') return null

  // Smart positioning: show above the field if not enough room below
  const spaceBelow  = window.innerHeight - anchorRect.top
  const showAbove   = spaceBelow < CAL_H + 20
  const topPos      = showAbove ? anchorRect.fieldTop - CAL_H - 8 : anchorRect.top + 8

  const calWidth = 310
  const leftPos  = Math.max(12, Math.min(
    anchorRect.left + anchorRect.width / 2 - calWidth / 2,
    window.innerWidth - calWidth - 12
  ))

  const content = (
    <div
      data-datepicker
      style={{
        position: 'fixed',
        top: topPos,
        left: leftPos,
        width: calWidth,
        background: '#18180c',
        border: '1px solid rgba(255,255,255,.12)',
        borderRadius: 14,
        padding: '16px 14px 14px',
        zIndex: 9999,
        boxShadow: '0 20px 60px rgba(0,0,0,.7)',
      }}
    >
      {/* Header: ‹  Month Year  › */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <button type="button" onClick={prevMonth} style={navBtnStyle}>‹</button>

        <span style={{ fontSize: '.9rem', fontWeight: 700, color: '#fff', letterSpacing: '.02em' }}>
          {MONTHS[viewM]} {viewY}
        </span>

        <button type="button" onClick={nextMonth} style={navBtnStyle}>›</button>
      </div>

      {/* Day-of-week row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', marginBottom: 6 }}>
        {DAYS.map(d => (
          <div key={d} style={{ textAlign: 'center', fontSize: '.58rem', fontWeight: 700, letterSpacing: '.08em', color: 'rgba(255,255,255,.28)', padding: '2px 0' }}>
            {d}
          </div>
        ))}
      </div>

      {/* Date cells */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 2 }}>
        {cells.map((cell, i) => {
          const isCurr  = cell.type === 'curr'
          const isPast  = isCurr && new Date(viewY, viewM, cell.day) < new Date(todayY, todayM, todayD)
          const isToday = isCurr && cell.day === todayD && viewM === todayM && viewY === todayY
          const isSel   = isCurr && !!selected &&
            cell.day === selected.getDate() &&
            viewM === selected.getMonth() &&
            viewY === selected.getFullYear()

          const canClick = isCurr && !isPast

          return (
            <button
              key={i}
              type="button"
              disabled={!canClick}
              onClick={() => canClick && pick(cell.day)}
              style={{
                aspectRatio: '1', width: '100%', borderRadius: '50%',
                border: isToday && !isSel ? '1.5px solid rgba(255,255,255,.4)' : 'none',
                background: isSel ? '#d9f22a' : 'transparent',
                color: isSel
                  ? '#18180c'
                  : !isCurr || isPast
                    ? 'rgba(255,255,255,.18)'
                    : '#fff',
                fontSize: '.8rem',
                fontWeight: isSel ? 800 : 400,
                cursor: canClick ? 'pointer' : 'default',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'inherit',
                transition: 'background .1s',
              }}
              onMouseEnter={e => {
                if (canClick && !isSel)
                  (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,.1)'
              }}
              onMouseLeave={e => {
                if (!isSel)
                  (e.currentTarget as HTMLButtonElement).style.background = 'transparent'
              }}
            >
              {cell.day}
            </button>
          )
        })}
      </div>
    </div>
  )

  if (typeof document === 'undefined') return null
  return createPortal(content, document.body)
}

const navBtnStyle: React.CSSProperties = {
  width: 32, height: 32, borderRadius: '50%',
  border: '1.5px solid rgba(255,255,255,.15)',
  background: 'none', color: '#fff', cursor: 'pointer',
  fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
  fontFamily: 'inherit', transition: 'border-color .15s',
}
