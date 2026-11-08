import SignOutButton from '@/components/admin/SignOutButton'
import { requireAdmin } from '@/lib/admin-auth'
import { listBookings } from '@/lib/db'

export default async function AdminHomePage() {
  const admin = await requireAdmin()
  const bookings = await listBookings().catch(() => [])
  const pending = bookings.filter(b => b.status === 'pending').length

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-2)' }}>
      <div style={{ background: 'var(--navy)', padding: '28px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <div>
            <p style={{ fontSize: '.65rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,.5)', marginBottom: '4px' }}>
              Laagan PH · Admin
            </p>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>Hello{admin.name ? `, ${admin.name}` : ''}</h1>
            <p style={{ fontSize: '.8rem', color: 'rgba(255,255,255,.65)' }}>{admin.email} · {admin.role}</p>
          </div>
          <SignOutButton />
        </div>
      </div>

      <div className="container" style={{ paddingTop: '32px', paddingBottom: '64px' }}>
        <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: '16px', padding: '28px' }}>
          <p style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--navy)' }}>{pending}</p>
          <p style={{ color: 'var(--muted)', fontSize: '.9rem' }}>bookings waiting for a reply ({bookings.length} in total)</p>
          <p style={{ marginTop: '20px', fontSize: '.8rem', color: 'var(--muted)' }}>
            The login works. The Today screen, booking list and checklists are the next step.
          </p>
        </div>
      </div>
    </main>
  )
}
