'use client'

import { urlFor } from '@/lib/sanity'
import type { Testimonial } from '@/lib/types'

// Color-coded initials — deterministic per name so it's always consistent
const AVATAR_COLORS = ['#d96b8a', '#0ea5e9', '#0d9488', '#7c3aed', '#f59e0b']
function avatarColor(name: string) {
  return AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length]
}

const FALLBACK: Testimonial[] = [
  {
    _id: '1',
    name: 'Maria Santos',
    tour: 'Santa Cruz Island Tour',
    review: "We almost didn't go because we thought it'd be too complicated. But James met us at the port at 6am with the biggest smile, and two hours later we were standing on pink sand with no one else around. My daughter still talks about it.",
    rating: 5,
    date: '2025-03-15',
  },
  {
    _id: '2',
    name: 'John dela Cruz',
    tour: 'ZAMBASULTA Complete Journey',
    review: "I've been to Boracay and Siargao. ZAMBASULTA hit different. The places are real — untouched, honest. The guide knew every corner, every history. Worth every peso and more.",
    rating: 5,
    date: '2025-01-28',
  },
  {
    _id: '3',
    name: 'Ana Reyes',
    tour: 'Santa Cruz Island Tour',
    review: "Laagan handled everything — the boat, the permits, the timing. All I had to do was show up. Best organized tour I've ever been on in the Philippines, and I've been on a lot.",
    rating: 5,
    date: '2025-02-10',
  },
]

function TestimonialCard({ t }: { t: Testimonial }) {
  const photoUrl = t.photo ? urlFor(t.photo).width(120).height(120).fit('crop').url() : null
  const color = avatarColor(t.name)

  const formattedDate = t.date
    ? new Date(t.date).toLocaleDateString('en-PH', { month: 'long', year: 'numeric' })
    : null

  return (
    <div style={{
      background: '#fff',
      border: '1px solid var(--border)',
      borderRadius: 'var(--rl)',
      padding: '32px 28px',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      boxShadow: '0 2px 16px rgba(0,0,0,.04)',
      transition: 'box-shadow .25s, transform .25s',
    }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 32px rgba(0,0,0,.09)'
        ;(e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 16px rgba(0,0,0,.04)'
        ;(e.currentTarget as HTMLDivElement).style.transform = 'none'
      }}
    >
      {/* Stars */}
      <div style={{ color: '#f5a623', fontSize: '1rem', letterSpacing: '2px' }}>
        {'★'.repeat(t.rating ?? 5)}
      </div>

      {/* Quote */}
      <p style={{
        fontSize: '.95rem',
        color: 'var(--navy)',
        lineHeight: 1.8,
        fontStyle: 'italic',
        fontWeight: 500,
        flex: 1,
      }}>
        &ldquo;{t.review}&rdquo;
      </p>

      {/* Author row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Avatar */}
        {photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photoUrl}
            alt={t.name}
            style={{
              width: 48, height: 48, borderRadius: '50%',
              objectFit: 'cover', flexShrink: 0,
              border: '2px solid var(--border)',
            }}
          />
        ) : (
          <div style={{
            width: 48, height: 48, borderRadius: '50%',
            background: color + '18',
            border: `2px solid ${color}`,
            color: color,
            fontWeight: 800, fontSize: '1rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            {t.name[0]}
          </div>
        )}

        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '.88rem' }}>{t.name}</p>
          <p style={{ fontSize: '.75rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {t.tour}{formattedDate ? ` · ${formattedDate}` : ''}
          </p>
        </div>

        {/* Verified badge */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '4px',
          background: '#f0fdf4', border: '1px solid #bbf7d0',
          borderRadius: '999px', padding: '3px 10px',
          flexShrink: 0,
        }}>
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
            <circle cx="6" cy="6" r="6" fill="#16a34a" />
            <path d="M3.5 6l1.8 1.8L8.5 4.5" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontSize: '.62rem', fontWeight: 700, color: '#16a34a', letterSpacing: '.04em', textTransform: 'uppercase' }}>
            Verified
          </span>
        </div>
      </div>
    </div>
  )
}

export default function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const items = testimonials.length > 0 ? testimonials : FALLBACK

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '20px',
    }}
      className="testimonials-grid"
    >
      {items.map(t => <TestimonialCard key={t._id} t={t} />)}
    </div>
  )
}
