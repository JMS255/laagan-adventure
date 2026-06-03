'use client'

import { useState } from 'react'
import Image from 'next/image'

interface Props {
  mainImageUrl: string
  mainAlt: string
  thumbUrls: { url: string; alt: string }[]
  totalCount: number
}

export default function TourGallery({ mainImageUrl, mainAlt, thumbUrls, totalCount }: Props) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const allUrls = [{ url: mainImageUrl, alt: mainAlt }, ...thumbUrls]

  return (
    <>
      {/* Gallery grid */}
      <div className="gallery">
        <div className="gallery__main" onClick={() => { setActiveIndex(0); setLightboxOpen(true) }} style={{ cursor: 'pointer' }}>
          <Image src={mainImageUrl} fill alt={mainAlt} className="gallery__main-img" style={{ objectFit: 'cover' }} sizes="(max-width:900px) 100vw, 70vw" priority />
          {totalCount > 1 && (
            <button
              className="gallery__view-all"
              onClick={e => { e.stopPropagation(); setLightboxOpen(true) }}
            >
              📷 {totalCount} photos
            </button>
          )}
        </div>
        {thumbUrls.length > 0 && (
          <div className="gallery__thumbs">
            {thumbUrls.slice(0, 2).map((t, i) => (
              <div
                key={i}
                className="gallery__thumb"
                onClick={() => { setActiveIndex(i + 1); setLightboxOpen(true) }}
                style={{ cursor: 'pointer' }}
              >
                <Image src={t.url} fill alt={t.alt} className="gallery__thumb-img" style={{ objectFit: 'cover' }} sizes="20vw" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.92)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={() => setLightboxOpen(false)}
        >
          {/* Close */}
          <button
            onClick={() => setLightboxOpen(false)}
            style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(255,255,255,.15)', border: 'none', color: '#fff', width: '44px', height: '44px', borderRadius: '50%', fontSize: '1.4rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            ×
          </button>

          {/* Counter */}
          <div style={{ position: 'absolute', top: '20px', left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,.7)', fontSize: '.85rem' }}>
            {activeIndex + 1} / {allUrls.length}
          </div>

          {/* Image */}
          <div
            onClick={e => e.stopPropagation()}
            style={{ position: 'relative', width: '90vw', maxWidth: '900px', height: '80vh' }}
          >
            <Image
              src={allUrls[activeIndex].url}
              fill
              alt={allUrls[activeIndex].alt}
              style={{ objectFit: 'contain' }}
              sizes="90vw"
            />
          </div>

          {/* Prev / Next */}
          {activeIndex > 0 && (
            <button
              onClick={e => { e.stopPropagation(); setActiveIndex(i => i - 1) }}
              style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,.15)', border: 'none', color: '#fff', width: '48px', height: '48px', borderRadius: '50%', fontSize: '1.4rem', cursor: 'pointer' }}
            >
              ‹
            </button>
          )}
          {activeIndex < allUrls.length - 1 && (
            <button
              onClick={e => { e.stopPropagation(); setActiveIndex(i => i + 1) }}
              style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,.15)', border: 'none', color: '#fff', width: '48px', height: '48px', borderRadius: '50%', fontSize: '1.4rem', cursor: 'pointer' }}
            >
              ›
            </button>
          )}
        </div>
      )}
    </>
  )
}
