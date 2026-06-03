export const revalidate = 60

import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ToursFilter from '@/components/ToursFilter'
import { client, TOURS_QUERY } from '@/lib/sanity'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'All Tours — Laagan Adventure',
  description: 'Explore our tour packages in Zamboanga City. Santa Cruz Island, city tours, island hopping and more.',
}

export default async function ToursPage() {
  const tours = await client.fetch(TOURS_QUERY).catch(() => [])

  return (
    <>
      <Nav />
      <main className="page-top">

        {/* Page Hero */}
        <div className="page-hero">
          <div className="container">
            <div className="breadcrumb">
              <Link href="/">Home</Link>
              <span className="breadcrumb__sep">›</span>
              <span>Tours</span>
            </div>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 800, letterSpacing: '-.03em', color: 'var(--navy)', marginBottom: '10px' }}>
              Explore All Tours
            </h1>
            <p style={{ fontSize: '1rem', color: 'var(--muted)' }}>
              Guided adventures across Zamboanga&apos;s best destinations
            </p>
          </div>
        </div>

        <ToursFilter tours={tours} />

        {/* CTA strip */}
        <div style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)', padding: '48px 0', textAlign: 'center' }}>
          <div className="container">
            <p style={{ fontSize: '.9rem', color: 'var(--muted)', marginBottom: '16px' }}>Can&apos;t find what you&apos;re looking for?</p>
            <Link href="/contact" className="btn btn--outline" style={{ marginRight: '12px' }}>Plan a Custom Trip</Link>
            <a href="https://m.me/61562040673545" target="_blank" rel="noopener noreferrer" className="btn btn--primary">💬 Ask on Messenger</a>
          </div>
        </div>

      </main>
      <Footer />
    </>
  )
}
