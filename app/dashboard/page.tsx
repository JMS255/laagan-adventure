import { client, BOOKINGS_QUERY } from '@/lib/sanity'
import type { Booking } from '@/lib/types'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Bookings Dashboard — Laagan Adventure' }

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  pending:   { bg: '#fef9c3', color: '#92400e' },
  confirmed: { bg: '#dcfce7', color: '#166534' },
  cancelled: { bg: '#fee2e2', color: '#991b1b' },
}

function fmt(iso: string) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' })
}

function PasswordForm() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--navy)' }}>
      <form method="GET" style={{ background: '#fff', borderRadius: '20px', padding: '48px 40px', width: '100%', maxWidth: '360px', textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,.3)' }}>
        <p style={{ fontSize: '2rem', marginBottom: '12px' }}>🔒</p>
        <h1 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '8px' }}>Bookings Dashboard</h1>
        <p style={{ fontSize: '.82rem', color: 'var(--text-muted)', marginBottom: '28px' }}>Laagan Adventure · Internal</p>
        <input
          type="password"
          name="pw"
          placeholder="Enter password"
          required
          autoFocus
          style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1.5px solid var(--border)', fontFamily: 'inherit', fontSize: '.9rem', marginBottom: '14px', boxSizing: 'border-box' }}
        />
        <button type="submit" className="btn btn--primary" style={{ width: '100%', justifyContent: 'center', borderRadius: '10px', fontFamily: 'inherit' }}>
          Enter →
        </button>
      </form>
    </main>
  )
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ pw?: string }>
}) {
  const { pw } = await searchParams
  const expected = process.env.DASHBOARD_PASSWORD ?? 'laagan2026'

  if (pw !== expected) return <PasswordForm />

  const bookings: Booking[] = await client.fetch(BOOKINGS_QUERY).catch(() => [])

  const counts = {
    pending:   bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
  }

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-2)' }}>

      {/* Header */}
      <div style={{ background: 'var(--navy)', padding: '32px 0' }}>
        <div className="container">
          <p style={{ fontSize: '.65rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,.5)', marginBottom: '6px' }}>
            Laagan Adventure · Internal
          </p>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', letterSpacing: '-.02em' }}>Bookings Dashboard</h1>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '40px', paddingBottom: '64px' }}>

        {/* Summary pills */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '40px' }}>
          {[
            { label: 'Total', value: bookings.length, bg: 'var(--navy)', color: '#fff' },
            { label: 'Pending', value: counts.pending, ...STATUS_STYLE.pending },
            { label: 'Confirmed', value: counts.confirmed, ...STATUS_STYLE.confirmed },
            { label: 'Cancelled', value: counts.cancelled, ...STATUS_STYLE.cancelled },
          ].map(s => (
            <div key={s.label} style={{ background: s.bg, color: s.color, borderRadius: '12px', padding: '14px 24px', fontWeight: 700 }}>
              <p style={{ fontSize: '1.6rem', lineHeight: 1 }}>{s.value}</p>
              <p style={{ fontSize: '.72rem', opacity: .8, marginTop: '2px' }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Bookings table */}
        {bookings.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 32px', background: '#fff', borderRadius: '16px', border: '1px solid var(--border)' }}>
            <p style={{ fontSize: '2rem', marginBottom: '12px' }}>📋</p>
            <p style={{ fontWeight: 700, color: 'var(--navy)' }}>No bookings yet</p>
            <p style={{ fontSize: '.85rem', color: 'var(--text-muted)', marginTop: '6px' }}>Bookings will appear here after guests submit the form.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto', borderRadius: '16px', border: '1px solid var(--border)', background: '#fff', boxShadow: '0 4px 20px rgba(0,40,70,.07)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.82rem' }}>
              <thead>
                <tr style={{ background: 'var(--navy)', color: '#fff' }}>
                  {['Ref', 'Name', 'Phone', 'Tour', 'Date', 'Guests', 'Total', 'Deposit', 'Status', 'Submitted'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700, fontSize: '.7rem', letterSpacing: '.06em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bookings.map((b, i) => {
                  const s = STATUS_STYLE[b.status] ?? STATUS_STYLE.pending
                  return (
                    <tr key={b._id} style={{ borderTop: '1px solid var(--border)', background: i % 2 === 0 ? '#fff' : 'var(--bg-2)' }}>
                      <td style={{ padding: '12px 16px', fontFamily: 'monospace', fontWeight: 700, color: 'var(--pink)', whiteSpace: 'nowrap' }}>{b.bookingRef}</td>
                      <td style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--navy)', whiteSpace: 'nowrap' }}>{b.name}</td>
                      <td style={{ padding: '12px 16px', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{b.phone}</td>
                      <td style={{ padding: '12px 16px', color: 'var(--navy)', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.tourTitle}</td>
                      <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>{fmt(b.date)}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'center' }}>{b.guests}</td>
                      <td style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--navy)', whiteSpace: 'nowrap' }}>₱{b.totalPrice?.toLocaleString()}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                        <span style={{ fontSize: '1rem' }}>{b.depositSent ? '✅' : '⏳'}</span>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ background: s.bg, color: s.color, padding: '3px 10px', borderRadius: '999px', fontSize: '.7rem', fontWeight: 700, textTransform: 'capitalize', whiteSpace: 'nowrap' }}>
                          {b.status}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{fmt(b.submittedAt)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        <p style={{ marginTop: '20px', fontSize: '.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>
          To update booking status: open Sanity Studio → Booking → change Status → Publish.
          Refresh this page to see changes.
        </p>
      </div>
    </main>
  )
}
