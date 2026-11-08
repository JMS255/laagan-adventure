'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { after } from 'next/server'
import { buildAssignedAlert } from '@/lib/digest'
import { notifyTeam, SITE_URL } from '@/lib/telegram'
import { requireAdmin } from '@/lib/admin-auth'
import { parseBookingForm } from '@/lib/booking-logic'
import { getBooking, listStaff, updateBooking } from '@/lib/db'

/** Saves status, assignee, checklist and notes for one booking. */
export async function saveBookingAction(id: string, formData: FormData): Promise<void> {
  const admin = await requireAdmin()
  const back = `/admin/bookings/${encodeURIComponent(id)}`

  const existing = /^[a-z0-9-]+$/.test(id) ? await getBooking(id) : null
  if (!existing) redirect('/admin/bookings')

  const staff = await listStaff()
  const parsed = parseBookingForm(formData, staff.map(s => s.email))
  if (!parsed.ok) redirect(`${back}?error=${encodeURIComponent(parsed.error)}`)

  await updateBooking(id, parsed.patch, admin.email)

  // Newly assigned to someone else? Let them know on Telegram.
  const { assignedTo } = parsed.patch
  if (assignedTo && assignedTo !== existing.assignedTo && assignedTo !== admin.email) {
    const alert = buildAssignedAlert(existing, admin.name || admin.email, `${SITE_URL}${back}`)
    after(() => notifyTeam(alert, [assignedTo]))
  }
  revalidatePath('/admin')
  revalidatePath('/admin/bookings')
  redirect(`${back}?saved=1`)
}
