'use client'

import { useState, useLayoutEffect } from 'react'

const STORAGE_KEY = 'laagan-promo-strip-dismissed'

export default function PromoStrip() {
  const [visible, setVisible] = useState(true)

  // Check localStorage before first paint — avoids flash
  useLayoutEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === '1') {
      setVisible(false)
      document.documentElement.style.setProperty('--strip-h', '0px')
    }
  }, [])

  function dismiss() {
    setVisible(false)
    localStorage.setItem(STORAGE_KEY, '1')
    document.documentElement.style.setProperty('--strip-h', '0px')
  }

  if (!visible) return null

  return (
    <div className="promo-strip">
      <span>
        🌊 <strong>June only:</strong> Book online and get <strong>₱500 off</strong> any package — message us on Messenger to claim
      </span>
      <button
        onClick={dismiss}
        aria-label="Dismiss"
        style={{
          position: 'absolute',
          right: '16px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'none',
          border: 'none',
          color: 'rgba(255,255,255,.5)',
          cursor: 'pointer',
          fontSize: '1rem',
          lineHeight: 1,
          padding: '4px 8px',
          fontFamily: 'inherit',
          transition: 'color .15s',
        }}
        onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.color = '#fff')}
        onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,.5)')}
      >
        ✕
      </button>
    </div>
  )
}
