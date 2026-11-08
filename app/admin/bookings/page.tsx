import Link from 'next/link'
import AdminShell from '@/components/admin/AdminShell'
import BookingRow from '@/components/admin/BookingRow'
import { requireAdmin } from '@/lib/admin-auth'
import { STATUSES } from '@/lib/booking-logic'
import { listBookings, listStaff } from '@/lib/db'

const FILTERS = ['all', 'open', ...STATUSES]

export default async function AdminBookingsPage({ searchParams }: { searchParams: Promise<{ status?: string; q?: string }> }) {
  const admin = await requireAdmin()
  const { status = 'open', q = '' } = await searchParams
  const [all, staff] = await Promise.all([listBookings().catch(() => []), listStaff().catch(() => [])])
  const now = new Date()
  const names = new Map(staff.map(s => [s.email, s.name]))
  const needle = q.trim().toLowerCase()

  const bookings = all
    .filter(b => status === 'all' || (status === 'open' ? b.status === 'pending' || b.status === 'confirmed' : b.status === status))
    .filter(b => !needle || [b.name, b.bookingRef, b.phone, b.tourTitle].some(v => v?.toLowerCase().includes(needle)))
    .sort((a, b) => a.date.localeCompare(b.date))

  return (
    <AdminShell admin={admin} active="bookings">
      <h1 className="adm-title">Bookings</h1>
      <p className="adm-sub">{bookings.length} shown · sorted by tour date</p>

      <div className="adm-chips">
        {FILTERS.map(f => (
          <Link key={f} href={`/admin/bookings?status=${f}${q ? `&q=${encodeURIComponent(q)}` : ''}`} className={`adm-chip${status === f ? ' is-active' : ''}`}>
            {f}
          </Link>
        ))}
      </div>

      <form className="adm-search" action="/admin/bookings">
        <input type="hidden" name="status" value={status} />
        <input type="search" name="q" defaultValue={q} placeholder="Search name, phone, reference or tour" />
        <button type="submit" className="adm-btn adm-btn--primary">Search</button>
      </form>

      {bookings.length === 0 ? (
        <p className="adm-empty">No bookings match.</p>
      ) : (
        <div className="adm-list">
          {bookings.map(b => (
            <BookingRow key={b._id} booking={b} now={now} assigneeName={b.assignedTo ? names.get(b.assignedTo) : undefined} />
          ))}
        </div>
      )}
    </AdminShell>
  )
}
