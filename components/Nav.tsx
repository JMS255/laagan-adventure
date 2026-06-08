'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
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
        <Link href="/" className="nav__logo" aria-label="Laagan PH">
          <svg height={36} viewBox="7 8 338 78" fill="none" style={{ width: 'auto' }}>
            <defs>
              <clipPath id="nav-c"><circle cx="55" cy="55" r="48"/></clipPath>
              <linearGradient id="nav-sky" x1="55" y1="7" x2="55" y2="55" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#1a3d52"/>
                <stop offset="100%" stopColor="#004e64"/>
              </linearGradient>
              <linearGradient id="nav-sea" x1="55" y1="55" x2="55" y2="103" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#004e64"/>
                <stop offset="100%" stopColor="#001e2c"/>
              </linearGradient>
              <linearGradient id="nav-sun" x1="55" y1="26" x2="55" y2="55" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ea8ba0"/>
                <stop offset="100%" stopColor="#c95878"/>
              </linearGradient>
            </defs>
            <path d="M7 55 A48 48 0 0 1 103 55 Z" fill="url(#nav-sky)" clipPath="url(#nav-c)"/>
            <path d="M7 55 L7 103 A48 48 0 0 0 103 103 L103 55 Z" fill="url(#nav-sea)" clipPath="url(#nav-c)"/>
            <path d="M21 55 A34 34 0 0 1 89 55 Z" fill="url(#nav-sun)" clipPath="url(#nav-c)"/>
            <path d="M15 55 A40 40 0 0 1 95 55 Z" fill="none" stroke="#d96b8a" strokeWidth="1" opacity=".22" clipPath="url(#nav-c)"/>
            <path d="M7 63 Q27 57 47 63 Q67 69 87 63 Q95 61 103 63" stroke="white" strokeWidth=".8" fill="none" opacity=".18" clipPath="url(#nav-c)"/>
            <path d="M33,55 Q37,59 55,58 Q73,59 77,55 Q73,52 55,53 Q37,52 33,55 Z" fill="white" stroke="rgba(0,20,35,0.4)" strokeWidth=".8" clipPath="url(#nav-c)"/>
            <line x1="51" y1="54" x2="49" y2="27" stroke="white" strokeWidth="1.8" strokeLinecap="round" clipPath="url(#nav-c)"/>
            <path d="M49,28 L51,54 L74,42 Z" fill="white" stroke="rgba(0,20,35,0.2)" strokeWidth="0.5" clipPath="url(#nav-c)"/>
            <path d="M49,42 L51,54 L60,49 Z" fill="rgba(255,255,255,0.5)" clipPath="url(#nav-c)"/>
            <line x1="44" y1="55" x2="34" y2="59" stroke="white" strokeWidth="1.2" strokeLinecap="round" clipPath="url(#nav-c)"/>
            <path d="M31,58 Q34,61 37,58 Q34,57 31,58 Z" fill="white" clipPath="url(#nav-c)"/>
            <circle cx="55" cy="55" r="48" stroke="#e8d5da" strokeWidth="1.5" fill="none"/>
            <text x="122" y="46" fontFamily="'Playfair Display',Georgia,serif" fontSize="34" fontWeight="900" fill="#004e64" letterSpacing="-0.5">
              LAAGAN <tspan fill="#d96b8a">PH</tspan>
            </text>
            <line x1="122" y1="57" x2="345" y2="57" stroke="#d96b8a" strokeWidth=".8" opacity=".3"/>
            <text x="123" y="72" fontFamily="'Plus Jakarta Sans',Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#4e6e80" letterSpacing="3.5">
              TRAVEL &amp; TOURS · SINCE 2024
            </text>
          </svg>
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
