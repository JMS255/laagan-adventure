'use client'

import { useEffect, useState } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { client, urlFor, GALLERY_QUERY } from '@/lib/sanity'

type Photo = { _id: string; image: object; caption: string; destination: string }

export default function GalleryPage() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [filter, setFilter] = useState('All')
  const [lbOpen, setLbOpen] = useState(false)
  const [lbIdx, setLbIdx] = useState(0)
  const touchStartX = useState<number | null>(null)

  useEffect(() => {
    client.fetch(GALLERY_QUERY).then(setPhotos).catch(() => setPhotos([]))
  }, [])

  const destinations = ['All', ...Array.from(new Set(photos.map(p => p.destination).filter(Boolean)))]
  const filtered = filter === 'All' ? photos : photos.filter(p => p.destination === filter)
  const photoUrls = filtered.map(p => urlFor(p.image).width(1200).height(900).url())

  useEffect(() => {
    if (!lbOpen) return
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLbOpen(false)
      if (e.key === 'ArrowLeft' && lbIdx > 0) setLbIdx(i => i - 1)
      if (e.key === 'ArrowRight' && lbIdx < photoUrls.length - 1) setLbIdx(i => i + 1)
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [lbOpen, lbIdx, photoUrls.length])

  return (
    <>
      <Nav />
      <main style={{ paddingTop: 'var(--nav-h)' }}>

        {/* Header */}
        <div style={{ background: 'var(--navy)', padding: '64px 0 56px' }}>
          <div className="container">
            <p className="section__label">Gallery</p>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#fff', letterSpacing: '-.03em', marginBottom: '12px' }}>
              See the beauty of Zamboanga
            </h1>
            <p style={{ color: 'rgba(255,255,255,.7)', fontSize: '1rem', lineHeight: 1.7, maxWidth: '520px' }}>
              Real photos from our actual tours. Click any photo to view full size.
            </p>
          </div>
        </div>

        <section className="section">
          <div className="container">
            {/* Filter */}
            {destinations.length > 1 && (
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '40px' }}>
                {destinations.map(d => (
                  <button key={d} onClick={() => setFilter(d)}
                    style={{ padding: '8px 20px', borderRadius: '999px', border: `1.5px solid ${filter === d ? 'var(--navy)' : 'var(--border)'}`, background: filter === d ? 'var(--navy)' : 'transparent', color: filter === d ? '#fff' : 'var(--text-muted)', fontFamily: 'inherit', fontSize: '.82rem', fontWeight: 600, cursor: 'pointer', transition: 'all .2s' }}>
                    {d}
                  </button>
                ))}
              </div>
            )}

            {filtered.length > 0 ? (
              <div className="gallery-grid">
                {filtered.map((p, i) => (
                  <div key={p._id} className="gallery-item" onClick={() => { setLbIdx(i); setLbOpen(true) }}>
                    <img src={urlFor(p.image).width(600).height(450).url()} alt={p.caption || 'Tour photo'} loading="lazy" />
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '96px', background: 'var(--bg-2)', borderRadius: 'var(--rl)', border: '1px solid var(--border)' }}>
                <p style={{ fontSize: '3rem', marginBottom: '16px' }}>📸</p>
                <p style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '1.1rem' }}>Photos coming soon</p>
                <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>Add photos in the Sanity studio</p>
              </div>
            )}
          </div>
        </section>

      </main>
      <Footer />

      {/* Lightbox */}
      {lbOpen && (
        <div onClick={() => setLbOpen(false)}
          onTouchStart={e => { (touchStartX as unknown as { current: number | null }).current = e.touches[0].clientX }}
          onTouchEnd={e => {
            const start = (touchStartX as unknown as { current: number | null }).current
            if (start === null) return
            const diff = start - e.changedTouches[0].clientX
            if (diff > 50 && lbIdx < photoUrls.length - 1) setLbIdx(i => i + 1)
            if (diff < -50 && lbIdx > 0) setLbIdx(i => i - 1)
          }}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.96)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <button onClick={() => setLbOpen(false)} style={{ position: 'absolute', top: 20, right: 20, background: 'rgba(255,255,255,.1)', border: 'none', color: '#fff', width: 40, height: 40, borderRadius: '50%', fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
          <button onClick={e => { e.stopPropagation(); setLbIdx(i => i - 1) }} disabled={lbIdx === 0}
            style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,.12)', border: 'none', color: '#fff', width: 44, height: 44, borderRadius: '50%', fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: lbIdx === 0 ? .2 : 1 }}>←</button>
          <img src={photoUrls[lbIdx]} alt="" onClick={e => e.stopPropagation()} style={{ maxWidth: '92vw', maxHeight: '88vh', objectFit: 'contain', borderRadius: '8px' }} />
          <button onClick={e => { e.stopPropagation(); setLbIdx(i => i + 1) }} disabled={lbIdx === photoUrls.length - 1}
            style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,.12)', border: 'none', color: '#fff', width: 44, height: 44, borderRadius: '50%', fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: lbIdx === photoUrls.length - 1 ? .2 : 1 }}>→</button>
          <span style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,.5)', fontSize: '.72rem', fontWeight: 600 }}>{lbIdx + 1} / {photoUrls.length}</span>
        </div>
      )}
    </>
  )
}
