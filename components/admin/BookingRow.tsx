import Link from 'next/link'
import { flagsFor, formatPeso, formatTourDate, remainingPrepSteps } from '@/lib/booking-logic'
import type { Booking } from '@/lib/types'

function whenLabel(daysAway: number): string {
  if (daysAway === 0) return 'today'
  if (daysAway === 1) return 'tomorrow'
  return daysAway > 0 ? `in ${daysAway} days` : `${-daysAway} days ago`
}

export default function BookingRow({ booking, assigneeName, now }: { booking: Booking; assigneeName?: string; now: Date }) {
  const f = flagsFor(booking, now)
  const isOpen = booking.status === 'pending' || booking.status === 'confirmed'
  const prepLeft = remainingPrepSteps(booking)

  return (
    <Link href={`/admin/bookings/${encodeURIComponent(booking._id)}`} className="adm-row">
      <div className="adm-row__top">
        <span className="adm-row__name">{booking.name}</span>
        <span className="adm-row__ref">{booking.bookingRef}</span>
      </div>
      <p className="adm-row__meta">{booking.tourTitle}</p>
      <p className="adm-row__meta">
        {formatTourDate(booking.date)} ({whenLabel(f.daysAway)}) · {booking.guests} guest{booking.guests === 1 ? '' : 's'} · {formatPeso(booking.totalPrice)}
      </p>
      <div className="adm-badges">
        {f.replyOverdue && <span className="adm-badge adm-badge--red">Reply overdue</span>}
        {f.needsReply && !f.replyOverdue && <span className="adm-badge adm-badge--amber">Needs reply</span>}
        {f.depositWaiting && <span className="adm-badge adm-badge--amber">Deposit not received</span>}
        {f.noPrice && <span className="adm-badge adm-badge--red">No price</span>}
        {f.datePassed && <span className="adm-badge adm-badge--red">Date passed</span>}
        {isOpen && !f.datePassed && prepLeft > 0 && <span className="adm-badge">{prepLeft} prep steps left</span>}
        {isOpen && prepLeft === 0 && <span className="adm-badge adm-badge--green">Ready</span>}
        <span className="adm-badge">{booking.status}</span>
        {assigneeName && <span className="adm-badge">→ {assigneeName}</span>}
      </div>
    </Link>
  )
}
