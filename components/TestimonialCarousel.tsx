'use client'

import { useState } from 'react'

type Testimonial = { _id: string; name: string; tour: string; review: string; rating: number }

const FALLBACK: Testimonial[] = [
  { _id: '1', name: 'Maria Santos', tour: 'Santa Cruz Island Tour', review: 'Sobrang ganda! Best tour experience namin sa Zamboanga. Very accommodating and professional ang guide namin. Babalik kami next year!', rating: 5 },
  { _id: '2', name: 'John dela Cruz', tour: 'City Heritage Tour', review: 'Very knowledgeable about the history of Zamboanga. Hindi lang tour, parang history lesson din — pero masaya. Highly recommended!', rating: 5 },
  { _id: '3', name: 'Ana Reyes', tour: 'Island Hopping Package', review: 'The island hopping was amazing! Lahat ng destinations pina-visit namin at super enjoyed kami. Worth every peso. Thank you Laagan Adventure!', rating: 5 },
]

export default function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const items = testimonials.length > 0 ? testimonials : FALLBACK
  const [idx, setIdx] = useState(0)

  return (
    <div className="tcarousel">
      <div className="tcarousel__track" style={{ transform: `translateX(-${idx * 100}%)` }}>
        {items.map(t => (
          <div key={t._id} className="tcarousel__slide">
            <div className="tcarousel__stars">{'★'.repeat(t.rating ?? 5)}</div>
            <p className="tcarousel__quote">&ldquo;{t.review}&rdquo;</p>
            <div className="tcarousel__author">
              <div className="tcarousel__avatar">{t.name[0]}</div>
              <div>
                <p className="tcarousel__name">{t.name}</p>
                <p className="tcarousel__role">{t.tour}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="tcarousel__controls">
        <button onClick={() => setIdx(i => Math.max(0, i - 1))} disabled={idx === 0} className="tcarousel__btn" aria-label="Previous">←</button>
        <div className="tcarousel__dots">
          {items.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)}
              className={`tcarousel__dot${i === idx ? ' tcarousel__dot--active' : ''}`}
              aria-label={`Review ${i + 1}`}
            />
          ))}
        </div>
        <button onClick={() => setIdx(i => Math.min(items.length - 1, i + 1))} disabled={idx === items.length - 1} className="tcarousel__btn" aria-label="Next">→</button>
      </div>
    </div>
  )
}
