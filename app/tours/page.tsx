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
      <main className="page-top">

        {/* Header */}
        <div style={{ background: 'var(--bg-2)', borderBottom: '1px solid var(--border)', padding: '40px 0' }}>
          <div className="container">
            <nav className="breadcrumb">
              <Link href="/">Home</Link>
              <span className="breadcrumb__sep">›</span>
              <span>Tours</span>
            </nav>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: 'var(--navy)', letterSpacing: '-.03em', marginBottom: '8px', fontFamily: 'var(--font-display, Georgia), serif' }}>
              Explore All Tours
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.7, maxWidth: '520px' }}>
              Guided adventures across Zamboanga&rsquo;s best destinations.
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
