'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useBooking } from '@/lib/booking-context'

const links = [
  { href: '/tours',   label: 'Tours' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/blog',    label: 'Blog' },
  { href: '/about',   label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav({ transparent = false }: { transparent?: boolean }) {
  const [open, setOpen] = useState(false)
  const { openDrawer } = useBooking()

  // Close mobile menu on resize
  useEffect(() => {
    const fn = () => { if (window.innerWidth > 768) setOpen(false) }
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])

  return (
    <div className="site-header">

      {/* Promo strip */}
      <div className="promo-strip">
        🌊 <strong>June only:</strong> Book online and get <strong>₱500 off</strong> any package — message us on Messenger to claim
      </div>

      {/* Main nav */}
      <header className="nav">
        <Link href="/" className="nav__logo">
          <Image src="/logo.jpg" alt="Laagan Adventure" width={32} height={32} style={{ borderRadius: '50%' }} />
          <span className="nav__logo-text">Laagan Adventure</span>
        </Link>

        <nav className="nav__links">
          {links.map(l => <Link key={l.href} href={l.href}>{l.label}</Link>)}
        </nav>

        <button
          onClick={() => openDrawer()}
          className="nav__book-btn"
        >
          Book Now
        </button>

        <button className="nav__toggle" onClick={() => setOpen(v => !v)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </header>

      {/* Mobile menu */}
      {open && (
        <div className="nav__mobile-menu">
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="nav__mobile-link">
              {l.label}
            </Link>
          ))}
          <button
            className="nav__book-btn"
            style={{ width: '100%', justifyContent: 'center' }}
            onClick={() => { setOpen(false); openDrawer() }}
          >
            Book Now
          </button>
        </div>
      )}
    </div>
  )
}
