'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Props {
  tourPrice: number | undefined
  tourSlug: string
}

export default function StickyBookBar({ tourPrice, tourSlug }: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className={`sticky-book-bar${visible ? '' : ' sticky-book-bar--hidden'}`}>
      {tourPrice && (
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--navy)', lineHeight: 1 }}>
            ₱{tourPrice.toLocaleString()}
          </p>
          <p style={{ fontSize: '.65rem', color: 'var(--text-muted)', marginTop: '2px' }}>per person</p>
        </div>
      )}
      <Link href={`/book/${tourSlug}`} className="btn btn--primary" style={{ padding: '12px 20px', fontSize: '.82rem', borderRadius: '8px', whiteSpace: 'nowrap' }}>
        Book This Tour →
      </Link>
      <a href="https://m.me/61562040673545" target="_blank" rel="noopener noreferrer"
        className="btn btn--outline" style={{ padding: '12px 16px', fontSize: '.78rem', borderRadius: '8px', whiteSpace: 'nowrap' }}>
        💬 Ask
      </a>
    </div>
  )
}
