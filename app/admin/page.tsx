import AdminShell from '@/components/admin/AdminShell'
import BookingRow from '@/components/admin/BookingRow'
import { requireAdmin } from '@/lib/admin-auth'
import { buildToday, flagsFor } from '@/lib/booking-logic'
import { listBookings, listStaff } from '@/lib/db'
import type { Booking } from '@/lib/types'

interface SectionProps {
  title: string
  hint: string
  empty: string
  bookings: Booking[]
  names: Map<string, string>
  now: Date
  isAlert?: boolean
}

function Section({ title, hint, empty, bookings, names, now, isAlert }: SectionProps) {
  return (
    <section className="adm-section">
      <h2>
        {title}
        <span className={`adm-count${isAlert && bookings.length > 0 ? ' adm-count--alert' : ''}`}>{bookings.length}</span>
      </h2>
      <p className="adm-hint">{hint}</p>
      {bookings.length === 0 ? (
        <p className="adm-empty">{empty}</p>
      ) : (
        <div className="adm-list">
          {bookings.map(b => (
            <BookingRow key={b._id} booking={b} now={now} assigneeName={b.assignedTo ? names.get(b.assignedTo) : undefined} />
          ))}
        </div>
      )}
    </section>
  )
}

export default async function AdminTodayPage() {
  const admin = await requireAdmin()
  const [bookings, staff] = await Promise.all([listBookings().catch(() => []), listStaff().catch(() => [])])
  const now = new Date()
  const names = new Map(staff.map(s => [s.email, s.name]))
  const today = buildToday(bookings, now)
  const overdue = today.needReply.filter(b => flagsFor(b, now).replyOverdue).length
  const dateLabel = now.toLocaleDateString('en-PH', { weekday: 'long', month: 'long', day: 'numeric', timeZone: 'Asia/Manila' })

  return (
    <AdminShell admin={admin} active="today">
      <h1 className="adm-title">Today</h1>
      <p className="adm-sub">
        {dateLabel}
        {overdue > 0 ? ` · ${overdue} reply overdue` : ''}
      </p>

      <Section title="Needs a reply" hint="New bookings nobody has answered yet. We promise guests a reply within 24 hours." empty="All caught up." bookings={today.needReply} names={names} now={now} isAlert />
      <Section title="Deposit not received" hint="You've replied, but the deposit hasn't arrived." empty="No deposits are waiting." bookings={today.depositWaiting} names={names} now={now} />
      <Section title="Coming up in the next 7 days" hint="Make sure the boat, guide and reminder are sorted." empty="No tours in the next 7 days." bookings={today.upcoming} names={names} now={now} />
      <Section title="Needs fixing" hint="No price set, or the tour date has already passed but the booking is still open. Mark it completed or cancelled." empty="Nothing to fix." bookings={today.problems} names={names} now={now} isAlert />
    </AdminShell>
  )
}
