'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useBooking } from '@/lib/booking-context'
import PromoStrip from './PromoStrip'

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

  // Hide sticky bar while nav is open
  useEffect(() => {
    document.body.classList.toggle('nav-open', open)
    return () => document.body.classList.remove('nav-open')
  }, [open])

  return (
    <div className="site-header">

      <PromoStrip />

      {/* Main nav */}
      <header className="nav">
        <Link href="/" className="nav__logo">
          <Image src="/logo-circle.svg" alt="Laagan PH" width={36} height={36} unoptimized style={{ borderRadius: '50%' }} />
          <Image src="/logo-horizontal.svg" alt="Laagan PH" width={148} height={40} unoptimized className="nav__logo-wordmark" />
        </Link>

        <nav className="nav__links">
          {links.map(l => <Link key={l.href} href={l.href}>{l.label}</Link>)}
        </nav>

        <div className="nav__right">
          <a href="tel:09052435196" className="nav__phone">0905-243-5196</a>
          <button onClick={() => openDrawer()} className="nav__cta">Book Now</button>
        </div>

        <button className="nav__toggle" onClick={() => setOpen(v => !v)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </header>

      {/* Mobile menu */}
      <div className={`nav__mobile${open ? ' is-open' : ''}`}>
        {links.map(l => (
          <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </Link>
        ))}
        <button
          className="nav__cta"
          style={{ margin: '8px 24px', justifyContent: 'center' }}
          onClick={() => { setOpen(false); openDrawer() }}
        >
          Book Now
        </button>
      </div>
    </div>
  )
}
