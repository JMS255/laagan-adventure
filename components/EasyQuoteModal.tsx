'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

interface Props {
  tourName: string
  onClose: () => void
}

export default function EasyQuoteModal({ tourName, onClose }: Props) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // Close on Escape
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', fn)
    return () => document.removeEventListener('keydown', fn)
  }, [onClose])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const form = e.currentTarget
    const data = new FormData(form)
    try {
      const res = await fetch('https://formspree.io/f/xpwzgwnn', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) setStatus('sent')
      else setStatus('idle')
    } catch {
      setStatus('idle')
    }
  }

  if (typeof document === 'undefined') return null

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,20,40,.6)',
          backdropFilter: 'blur(4px)',
          zIndex: 9000,
          animation: 'fadeIn .2s ease',
        }}
      />

      {/* Modal */}
      <div style={{
        position: 'fixed',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%', maxWidth: '480px',
        background: '#fff',
        borderRadius: '20px',
        zIndex: 9001,
        overflow: 'hidden',
        boxShadow: '0 32px 80px rgba(0,20,40,.35)',
        animation: 'fadeIn .2s ease',
        margin: '0 16px',
      }}>

        {/* Header */}
        <div style={{ background: 'var(--navy)', padding: '28px 32px 24px', position: 'relative' }}>
          <button
            onClick={onClose}
            style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,.1)', border: 'none', color: '#fff', width: 32, height: 32, borderRadius: '50%', cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            ×
          </button>
          <p style={{ fontSize: '.62rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--pink)', marginBottom: '8px' }}>
            Quick Inquiry
          </p>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', letterSpacing: '-.02em', lineHeight: 1.2 }}>
            {tourName}
          </h2>
          <p style={{ fontSize: '.8rem', color: 'rgba(255,255,255,.55)', marginTop: '6px' }}>
            We&rsquo;ll reply within 24 hours · No payment required
          </p>
        </div>

        {/* Body */}
        <div style={{ padding: '28px 32px 32px' }}>
          {status === 'sent' ? (
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <p style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🎉</p>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '8px' }}>
                Inquiry sent!
              </h3>
              <p style={{ fontSize: '.88rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '24px' }}>
                We&rsquo;ll contact you via Messenger or call within 24 hours to confirm your tour.
              </p>
              <button
                onClick={onClose}
                className="btn btn--primary"
                style={{ fontFamily: 'inherit', borderRadius: '10px' }}
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <input type="hidden" name="_subject" value={`Quick Inquiry — ${tourName}`} />
              <input type="hidden" name="tour" value={tourName} />

              <div className="form-row" style={{ marginBottom: '16px' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label>Your Name *</label>
                  <input type="text" name="name" required placeholder="Juan dela Cruz" />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label>Phone / Viber *</label>
                  <input type="tel" name="phone" required placeholder="09XX-XXX-XXXX" />
                </div>
              </div>

              <div className="form-row" style={{ marginBottom: '20px' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label>Preferred Date *</label>
                  <input type="date" name="date" required />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label>Group Size *</label>
                  <input type="number" name="group_size" required min="1" placeholder="e.g. 4" />
                </div>
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                style={{
                  width: '100%',
                  background: 'var(--pink)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '16px',
                  fontFamily: 'inherit',
                  fontSize: '.9rem',
                  fontWeight: 800,
                  letterSpacing: '.03em',
                  cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                  opacity: status === 'sending' ? .7 : 1,
                  transition: 'opacity .15s',
                }}
              >
                {status === 'sending' ? 'Sending…' : 'Send Inquiry →'}
              </button>

              <p style={{ fontSize: '.72rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '10px' }}>
                Or message us directly on{' '}
                <a href="https://m.me/61562040673545" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--pink)', fontWeight: 600 }}>
                  Messenger
                </a>
              </p>
            </form>
          )}
        </div>
      </div>
    </>,
    document.body
  )
}
