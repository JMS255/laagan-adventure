'use client'

import { useState } from 'react'
import EasyQuoteModal from './EasyQuoteModal'

export default function QuickInquiryButton({ tourName }: { tourName: string }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{
          width: '100%',
          background: 'var(--bg-2)',
          color: 'var(--navy)',
          border: '1.5px solid var(--border)',
          borderRadius: '10px',
          padding: '13px 20px',
          fontFamily: 'inherit',
          fontSize: '.82rem',
          fontWeight: 700,
          cursor: 'pointer',
          transition: 'all .15s',
          marginBottom: '0',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--pink)'
          ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--pink)'
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)'
          ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--navy)'
        }}
      >
        ⚡ Quick Inquiry
      </button>
      {open && <EasyQuoteModal tourName={tourName} onClose={() => setOpen(false)} />}
    </>
  )
}
