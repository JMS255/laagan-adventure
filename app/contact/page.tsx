'use client'

import { useState } from 'react'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const FAQS = [
  { q: 'Do I need to pay upfront?', a: 'No. You book, we confirm, you pay on the day in cash or GCash. We only ask for a ₱300 deposit via GCash to reserve slots for large groups.' },
  { q: 'What if the weather is bad?', a: 'Your safety is our priority. We reschedule at no charge due to weather. You will never lose your money because of something outside your control.' },
  { q: 'How far in advance should I book?', a: 'Santa Cruz Island only allows 400 visitors/day. For weekends and holidays, book 1–2 weeks ahead. Weekday tours often have same-day availability.' },
]

export default function ContactPage() {
  const [partnerOpen, setPartnerOpen] = useState(false)

  return (
    <>
      <Nav />
      <main className="page-top">

        {/* Page Header */}
        <div style={{ background: 'var(--bg-2)', padding: '48px 0 40px', borderBottom: '1px solid var(--border)' }}>
          <div className="container">
            <div className="breadcrumb">
              <Link href="/">Home</Link>
              <span className="breadcrumb__sep">›</span>
              <span>Contact</span>
            </div>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 800, letterSpacing: '-.03em', color: 'var(--navy)', marginBottom: '10px' }}>
              Get in Touch
            </h1>
            <p style={{ fontSize: '1rem', color: 'var(--muted)', maxWidth: '480px' }}>
              Real people, fast replies. Tell us what you need and we&apos;ll make it happen.
            </p>
          </div>
        </div>

        <section className="section--sm" style={{ background: '#fff' }}>
          <div className="container">

            <p style={{ fontSize: '.78rem', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '8px' }}>
              What brings you here?
            </p>

            <div className="intent-grid">

              {/* Intent 1: Book a Tour */}
              <div className="intent-card">
                <div className="intent-card__icon">📅</div>
                <div className="intent-card__title">I Want to Book a Tour</div>
                <p className="intent-card__desc">Browse our tours and reserve your slot. We confirm within 24 hours. No upfront payment required.</p>
                <Link href="/tours" className="btn btn--primary btn--full" style={{ borderRadius: '10px' }}>Browse Tours →</Link>
                <a href="https://m.me/61562040673545?text=Hi!%20I%27d%20like%20to%20book%20a%20tour." target="_blank" rel="noopener noreferrer" style={{ fontSize: '.78rem', color: 'var(--pink)', fontWeight: 600, marginTop: '4px' }}>
                  or message us directly →
                </a>
              </div>

              {/* Intent 2: Ask a Question */}
              <div className="intent-card">
                <div className="intent-card__icon">❓</div>
                <div className="intent-card__title">I Have a Question</div>
                <p className="intent-card__desc">Not sure which tour is right for you? Want to know about dates, group sizes, or accessibility? We&apos;re happy to help.</p>
                <a href="https://m.me/61562040673545" target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--full" style={{ borderRadius: '10px', background: '#0084ff' }}>💬 Message on Messenger</a>
                <a href="https://wa.me/639052435196" target="_blank" rel="noopener noreferrer" style={{ fontSize: '.78rem', color: '#25d366', fontWeight: 600, marginTop: '4px' }}>
                  or chat on WhatsApp →
                </a>
              </div>

              {/* Intent 3: Partner */}
              <div className="intent-card">
                <div className="intent-card__icon">🤝</div>
                <div className="intent-card__title">I Want to Partner</div>
                <p className="intent-card__desc">Schools, corporations, travel agencies, and OFW groups welcome. Custom packages, group rates, and full coordination available.</p>
                <button className="btn btn--outline btn--full" style={{ borderRadius: '10px' }} onClick={() => setPartnerOpen(v => !v)}>
                  Send Us a Message
                </button>
              </div>

            </div>

            {/* Partner form */}
            {partnerOpen && (
              <div className="partner-form is-open">
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.2rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '20px' }}>Partner Inquiry</h3>
                <div className="field-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="field"><label>Name / Organization</label><input type="text" placeholder="Your name or company" /></div>
                  <div className="field"><label>Contact Number</label><input type="tel" placeholder="09XXXXXXXXX" /></div>
                </div>
                <div className="field"><label>Email Address</label><input type="email" placeholder="you@company.com" /></div>
                <div className="field"><label>Tell us about your group</label><textarea rows={4} placeholder="Number of people, type of event, preferred dates, any special requirements..." /></div>
                <button className="btn btn--primary" style={{ borderRadius: '10px' }}>Send Inquiry →</button>
                <div className="trust-micro" style={{ marginTop: '12px' }}>
                  <span>✅ We reply within 24 hours</span>
                  <span>🤝 Custom rates available</span>
                </div>
              </div>
            )}

            {/* Contact info strip */}
            <div className="contact-info-grid">
              <div className="contact-info-item">
                <div className="contact-info-item__icon">📞</div>
                <div className="contact-info-item__label">Phone / SMS</div>
                <div className="contact-info-item__val"><a href="tel:09052435196">0905-243-5196</a></div>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-item__icon">💬</div>
                <div className="contact-info-item__label">Messenger</div>
                <div className="contact-info-item__val"><a href="https://m.me/61562040673545" target="_blank" rel="noopener noreferrer">@laaganadventure</a></div>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-item__icon">📱</div>
                <div className="contact-info-item__label">WhatsApp</div>
                <div className="contact-info-item__val"><a href="https://wa.me/639052435196" target="_blank" rel="noopener noreferrer">+63 905-243-5196</a></div>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-item__icon">📍</div>
                <div className="contact-info-item__label">Location</div>
                <div className="contact-info-item__val">Zamboanga City,<br />Philippines</div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="map-placeholder">
              <div style={{ fontSize: '2rem', marginBottom: '12px' }}>🗺</div>
              <div style={{ fontWeight: 700, fontSize: '.95rem', marginBottom: '6px' }}>Paseo del Mar Jetty, Zamboanga City</div>
              <div style={{ fontSize: '.82rem', opacity: .8, marginBottom: '16px' }}>Meeting point for all island tours</div>
              <a href="https://maps.google.com/?q=Paseo+del+Mar+Zamboanga+City" target="_blank" rel="noopener noreferrer" className="btn btn--outline btn--sm" style={{ borderColor: '#0369a1', color: '#0369a1' }}>
                Open in Google Maps →
              </a>
            </div>

          </div>
        </section>

        {/* FAQ teaser */}
        <section className="section--sm section--alt">
          <div className="container" style={{ textAlign: 'center' }}>
            <span className="section__label section__label--center">Common Questions</span>
            <h2 className="section__title section__title--center" style={{ fontSize: '1.8rem' }}>Before you reach out</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px', marginTop: '32px', textAlign: 'left' }}>
              {FAQS.map(faq => (
                <div key={faq.q} style={{ background: '#fff', borderRadius: 'var(--r)', padding: '20px', border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '.85rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '8px' }}>{faq.q}</div>
                  <div style={{ fontSize: '.82rem', color: 'var(--muted)', lineHeight: 1.65 }}>{faq.a}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
