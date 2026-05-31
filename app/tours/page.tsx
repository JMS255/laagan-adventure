export const revalidate = 60

import { Suspense } from 'react'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ToursFilter from '@/components/ToursFilter'
import { client, TOURS_QUERY } from '@/lib/sanity'
import type { TourCard } from '@/lib/types'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tours & Packages',
  description: 'Explore our tour packages in Zamboanga City. Santa Cruz Island, city tours, island hopping and more.',
}

export default async function ToursPage() {
  const tours = await client.fetch(TOURS_QUERY).catch(() => [])

  return (
    <>
      <Nav />
      <main style={{ paddingTop: 'var(--nav-h)' }}>

        {/* Header */}
        <div style={{ background: 'var(--navy)', padding: '64px 0 56px' }}>
          <div className="container">
            <p className="section__label">Packages</p>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#fff', letterSpacing: '-.03em', marginBottom: '12px' }}>
              Tours & Packages
            </h1>
            <p style={{ color: 'rgba(255,255,255,.7)', fontSize: '1rem', lineHeight: 1.7, maxWidth: '520px' }}>
              Every tour is guided by locals who know Zamboanga City best. Pick your adventure below.
            </p>
          </div>
        </div>

        {/* Tours Grid + Filter */}
        <section className="section">
          <div className="container">
            <Suspense fallback={<div className="tours-grid" style={{ minHeight: '400px' }} />}>
              <ToursFilter tours={tours} />
            </Suspense>
          </div>
        </section>

        {/* CTA */}
        <section className="section section--alt">
          <div className="container" style={{ textAlign: 'center' }}>
            <h2 className="section__title">Can&rsquo;t find what you&rsquo;re looking for?</h2>
            <p className="section__sub" style={{ margin: '0 auto 32px' }}>We offer custom tours for groups. Message us and we&rsquo;ll build the perfect itinerary.</p>
            <Link href="/contact" className="btn btn--primary">Inquire for Custom Tour →</Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
