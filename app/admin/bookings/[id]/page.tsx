import Link from 'next/link'
import { notFound } from 'next/navigation'
import AdminShell from '@/components/admin/AdminShell'
import { saveBookingAction } from '@/app/admin/actions'
import { requireAdmin } from '@/lib/admin-auth'
import { CHECKLIST_STEPS, formatPeso, formatTourDate, isStepDone, STATUSES, toInternationalPhone } from '@/lib/booking-logic'
import { getBooking, listStaff } from '@/lib/db'

export default async function AdminBookingPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ saved?: string; error?: string }>
}) {
  const admin = await requireAdmin()
  const { id } = await params
  const { saved, error } = await searchParams
  if (!/^[a-z0-9-]+$/.test(id)) notFound()
  const [booking, staff] = await Promise.all([getBooking(id), listStaff()])
  if (!booking) notFound()

  const intl = toInternationalPhone(booking.phone)
  const save = saveBookingAction.bind(null, booking._id)

  return (
    <AdminShell admin={admin} active="bookings">
      <Link href="/admin/bookings" className="adm-back">← All bookings</Link>
      <h1 className="adm-title">{booking.name}</h1>
      <p className="adm-sub">{booking.bookingRef} · booked {new Date(booking.submittedAt).toLocaleDateString('en-PH', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZone: 'Asia/Manila' })}</p>

      {saved && <p className="adm-flash adm-flash--ok" role="status">Saved.</p>}
      {error && <p className="adm-flash adm-flash--err" role="alert">{error}</p>}

      <div className="adm-card">
        <h2>The trip</h2>
        <dl className="adm-facts">
          <dt>Tour</dt><dd>{booking.tourTitle}</dd>
          <dt>Date</dt><dd>{formatTourDate(booking.date)}</dd>
          <dt>Guests</dt><dd>{booking.guests}</dd>
          <dt>Total</dt><dd>{formatPeso(booking.totalPrice)}{booking.promo ? ` (promo ${booking.promo})` : ''}</dd>
          {booking.notes && (<><dt>Guest notes</dt><dd>{booking.notes}</dd></>)}
        </dl>
      </div>

      <div className="adm-card">
        <h2>The guest</h2>
        <dl className="adm-facts">
          <dt>Phone</dt><dd>{booking.phone}</dd>
          {booking.email && (<><dt>Email</dt><dd>{booking.email}</dd></>)}
        </dl>
        <div className="adm-actions">
          <a className="adm-btn" href={`tel:+${intl}`}>Call</a>
          <a className="adm-btn" href={`viber://chat?number=%2B${intl}`}>Viber</a>
          <a className="adm-btn" href={`https://wa.me/${intl}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          {booking.email && <a className="adm-btn" href={`mailto:${booking.email}`}>Email</a>}
        </div>
      </div>

      <form action={save} className="adm-card">
        <h2>Handling this booking</h2>

        <label className="adm-field">
          Status
          <select name="status" defaultValue={booking.status}>
            {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </label>

        <label className="adm-field">
          Assigned to
          <select name="assignedTo" defaultValue={booking.assignedTo ?? ''}>
            <option value="">Nobody yet</option>
            {staff.map(s => <option key={s.email} value={s.email}>{s.name}</option>)}
          </select>
        </label>

        <div className="adm-field">
          Checklist
          <div>
            {CHECKLIST_STEPS.map(step => (
              <label key={step.key} className="adm-check">
                <input type="checkbox" name={`cl_${step.key}`} defaultChecked={isStepDone(booking, step.key)} />
                {step.label}
              </label>
            ))}
          </div>
        </div>

        <label className="adm-field">
          Team notes (guests never see these)
          <textarea name="internalNotes" rows={4} defaultValue={booking.internalNotes ?? ''} maxLength={2000} />
        </label>

        <button type="submit" className="adm-btn adm-btn--primary">Save changes</button>
        {booking.updatedAt && (
          <p className="adm-hint" style={{ marginTop: '12px' }}>
            Last changed by {booking.updatedBy} on {new Date(booking.updatedAt).toLocaleDateString('en-PH', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZone: 'Asia/Manila' })}
          </p>
        )}
      </form>
    </AdminShell>
  )
}
