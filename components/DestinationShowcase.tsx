import Link from 'next/link'
import { urlFor } from '@/lib/sanity'

interface Tour {
  _id: string
  title: string
  slug: { current: string }
  tagline?: string
  mainImage?: object
  price?: number
  priceNote?: string
  duration?: string
  destination?: string
}

// Fallback cards when no Sanity tours exist yet
const FALLBACK = [
  { id: '1', title: 'Santa Cruz Island Tour', destination: 'Zamboanga City', tagline: 'Walk the famous pink sand beach and sail through the lagoon.', gradient: 'linear-gradient(160deg, #0ea5e9 0%, #0369a1 50%, #1a2744 100%)', href: '/tours', price: '₱1,500' },
  { id: '2', title: 'City Heritage Tour', destination: 'Zamboanga City', tagline: 'Forts, mosques, and the stories behind every landmark.', gradient: 'linear-gradient(160deg, #d97706 0%, #b45309 50%, #1a2744 100%)', href: '/tours', price: '₱800' },
  { id: '3', title: 'Island Hopping Package', destination: 'Zamboanga City', tagline: 'Multiple islands, one unforgettable day.', gradient: 'linear-gradient(160deg, #0d9488 0%, #0f766e 50%, #1a2744 100%)', href: '/tours', price: '₱1,800' },
]

function GradientCard({ gradient, title, destination, tagline, href, price, large }: {
  gradient: string; title: string; destination?: string; tagline?: string;
  href: string; price?: string; large?: boolean
}) {
  return (
    <Link href={href} className="dest-card" style={{ background: gradient, gridRow: large ? 'span 2' : undefined }}>
      <div className="dest-card__overlay" />
      <div className="dest-card__body">
        {destination && (
          <span style={{ display: 'inline-block', fontSize: '.65rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--pink)', marginBottom: '8px' }}>
            📍 {destination}
          </span>
        )}
        <h3 style={{ fontSize: large ? 'clamp(1.4rem, 2.5vw, 2rem)' : '1.1rem', fontWeight: 800, color: '#fff', lineHeight: 1.2, marginBottom: '8px', letterSpacing: '-.02em' }}>
          {title}
        </h3>
        {large && tagline && (
          <p style={{ fontSize: '.85rem', color: 'rgba(255,255,255,.75)', lineHeight: 1.6, maxWidth: '360px' }}>
            {tagline}
          </p>
        )}
        {price && (
          <p style={{ fontSize: '.78rem', color: 'rgba(255,255,255,.65)', marginTop: '10px', fontWeight: 600 }}>
            From {price} / person
          </p>
        )}
      </div>
    </Link>
  )
}

function PhotoCard({ tour, large }: { tour: Tour; large?: boolean }) {
  const imgUrl = tour.mainImage
    ? urlFor(tour.mainImage).width(large ? 900 : 500).height(large ? 700 : 400).fit('crop').url()
    : null

  return (
    <Link href={`/tours/${tour.slug.current}`} className="dest-card" style={{ gridRow: large ? 'span 2' : undefined }}>
      {imgUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imgUrl} alt={tour.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, #0ea5e9, #1a2744)' }} />
      )}
      <div className="dest-card__overlay" />
      <div className="dest-card__body">
        {tour.destination && (
          <span style={{ display: 'inline-block', fontSize: '.65rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--pink)', marginBottom: '8px' }}>
            📍 {tour.destination}
          </span>
        )}
        <h3 style={{ fontSize: large ? 'clamp(1.4rem, 2.5vw, 2rem)' : '1.1rem', fontWeight: 800, color: '#fff', lineHeight: 1.2, marginBottom: '8px', letterSpacing: '-.02em' }}>
          {tour.title}
        </h3>
        {large && tour.tagline && (
          <p style={{ fontSize: '.85rem', color: 'rgba(255,255,255,.75)', lineHeight: 1.6, maxWidth: '360px' }}>
            {tour.tagline}
          </p>
        )}
        {tour.price && (
          <p style={{ fontSize: '.78rem', color: 'rgba(255,255,255,.65)', marginTop: '10px', fontWeight: 600 }}>
            From ₱{tour.price.toLocaleString()} / person
          </p>
        )}
      </div>
    </Link>
  )
}

export default function DestinationShowcase({ tours }: { tours: Tour[] }) {
  const useSanity = tours.length > 0

  if (useSanity) {
    const [hero, ...rest] = tours
    const secondaries = rest.slice(0, 2)

    return (
      <section style={{ padding: '80px 0', background: '#fff' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', marginBottom: '40px' }}>
            <div>
              <p className="section__label">What we offer</p>
              <h2 className="section__title" style={{ marginBottom: 0 }}>Pick your Zamboanga adventure.</h2>
            </div>
            <Link href="/tours" className="btn btn--outline" style={{ flexShrink: 0 }}>View All Tours</Link>
          </div>

          <div className="dest-showcase">
            <PhotoCard tour={hero} large />
            {secondaries.length > 0 && (
              <div className="dest-stack">
                {secondaries.map(t => <PhotoCard key={t._id} tour={t} />)}
                {secondaries.length === 1 && (
                  <GradientCard
                    gradient="linear-gradient(160deg, #7c3aed, #1a2744)"
                    title="More Tours Coming Soon"
                    destination="Zamboanga City"
                    tagline="Island hopping, heritage tours, and custom packages."
                    href="/tours"
                  />
                )}
              </div>
            )}
            {secondaries.length === 0 && (
              <div className="dest-stack">
                <GradientCard gradient="linear-gradient(160deg, #d97706, #1a2744)" title="City Heritage Tour" destination="Zamboanga City" href="/tours" price="₱800" />
                <GradientCard gradient="linear-gradient(160deg, #0d9488, #1a2744)" title="Island Hopping Package" destination="Zamboanga City" href="/tours" price="₱1,800" />
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }

  // Fallback: no Sanity tours yet
  const [hero, ...rest] = FALLBACK
  return (
    <section style={{ padding: '80px 0', background: '#fff' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', marginBottom: '40px' }}>
          <div>
            <p className="section__label">What we offer</p>
            <h2 className="section__title" style={{ marginBottom: 0 }}>Pick your Zamboanga adventure.</h2>
          </div>
          <Link href="/tours" className="btn btn--outline" style={{ flexShrink: 0 }}>View All Tours</Link>
        </div>

        <div className="dest-showcase">
          <GradientCard {...hero} href={hero.href} large />
          <div className="dest-stack">
            {rest.map(t => <GradientCard key={t.id} {...t} href={t.href} />)}
          </div>
        </div>
      </div>
    </section>
  )
}
