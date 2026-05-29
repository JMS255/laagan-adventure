'use client'

import { useState } from 'react'

import type { FAQItem as FAQ } from '@/lib/types'

const DEFAULT_FAQS: FAQ[] = [
  {
    question: 'Do I need to pay in advance?',
    answer: 'No upfront payment required. We confirm your booking via Messenger or phone call, and payment is collected on the day of the tour.',
  },
  {
    question: 'What is the minimum group size?',
    answer: 'Most tours can be done with as few as 2 guests. Groups of 10 or more get special rates — contact us for a custom quote.',
  },
  {
    question: 'What time do tours usually start?',
    answer: 'Most tours depart at 7:00 AM from a meeting point in Zamboanga City. We\'ll confirm the exact time and meeting location when you book.',
  },
  {
    question: 'What should I bring?',
    answer: 'Sunscreen, a hat, comfortable footwear, extra clothes (for beach/water tours), a towel, and spending money for personal expenses like snacks or souvenirs.',
  },
  {
    question: 'Can I cancel or reschedule?',
    answer: 'Yes. Please notify us at least 24 hours in advance. We understand that things happen — we\'ll always work with you to find an alternative date.',
  },
  {
    question: 'Is transportation included?',
    answer: 'Land tours include transportation between all stops. Boat transfers for island and hopping tours are also included. Check the inclusions list above for your specific tour.',
  },
]

export default function FAQAccordion({ faqs }: { faqs?: FAQ[] }) {
  const items = faqs && faqs.length > 0 ? faqs : DEFAULT_FAQS
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div>
      {items.map((faq, i) => (
        <div
          key={i}
          style={{ borderBottom: '1px solid var(--border)' }}
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            style={{
              width: '100%',
              padding: '18px 0',
              background: 'none',
              border: 'none',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: '.95rem',
              fontWeight: 600,
              color: 'var(--navy)',
              textAlign: 'left',
              gap: 16,
            }}
          >
            <span>{faq.question}</span>
            <span style={{
              color: 'var(--pink)',
              fontSize: '1.3rem',
              flexShrink: 0,
              lineHeight: 1,
              transition: 'transform .2s',
              transform: open === i ? 'rotate(45deg)' : 'rotate(0)',
            }}>
              +
            </span>
          </button>
          {open === i && (
            <div style={{
              paddingBottom: 20,
              fontSize: '.88rem',
              color: 'var(--text-muted)',
              lineHeight: 1.75,
              animation: 'fadeIn .15s ease',
            }}>
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
