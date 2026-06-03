'use client'

import { useState } from 'react'

interface Item { time: string; activity: string }

export default function TourItinerary({ items }: { items: Item[] }) {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div>
      {items.map((item, i) => (
        <div key={i} className={`accordion-item${openIndex === i ? ' is-open' : ''}`}>
          <button
            className="accordion-trigger"
            onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
          >
            <span>{item.time && `${item.time} — `}{item.activity}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
          <div className="accordion-body">{item.detail || item.activity}</div>
        </div>
      ))}
    </div>
  )
}
