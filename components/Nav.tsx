'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const links = [
  { href: '/tours',   label: 'Tours' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/blog',    label: 'Blog' },
  { href: '/about',   label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav({ transparent = false }: { transparent?: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const isLight = transparent && !scrolled

  return (
    <header className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
      <Link href="/" className="nav__logo">
        <Image src="/logo.png" alt="Laagan Adventure" width={36} height={36} style={{ borderRadius: '50%' }} />
        <span className={`nav__logo-text${isLight ? ' nav__logo-text--light' : ''}`}>
          Laagan Adventure
        </span>
      </Link>

      <nav className={`nav__links${isLight ? ' nav__links--light' : ''}`}>
        {links.map(l => <Link key={l.href} href={l.href}>{l.label}</Link>)}
      </nav>

      <Link href="/contact" className="btn btn--primary" style={{ fontSize: '.78rem', padding: '10px 22px' }}>
        Book Now
      </Link>

      <button className="nav__toggle" onClick={() => setOpen(v => !v)} aria-label="Menu">
        <span /><span /><span />
      </button>

      {open && (
        <div style={{ position: 'fixed', inset: 0, top: 'var(--nav-h)', background: '#fff', zIndex: 99, padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--navy)', textDecoration: 'none' }}>
              {l.label}
            </Link>
          ))}
          <Link href="/contact" className="btn btn--primary" onClick={() => setOpen(false)}>Book Now</Link>
        </div>
      )}
    </header>
  )
}
