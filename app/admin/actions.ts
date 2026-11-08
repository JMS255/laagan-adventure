'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { requireAdmin } from '@/lib/admin-auth'
import { parseBookingForm } from '@/lib/booking-logic'
import { getBooking, listStaff, updateBooking } from '@/lib/db'

/** Saves status, assignee, checklist and notes for one booking. */
export async function saveBookingAction(id: string, formData: FormData): Promise<void> {
  const admin = await requireAdmin()
  const back = `/admin/bookings/${encodeURIComponent(id)}`

  if (!/^[a-z0-9-]+$/.test(id) || !(await getBooking(id))) redirect('/admin/bookings')

  const staff = await listStaff()
  const parsed = parseBookingForm(formData, staff.map(s => s.email))
  if (!parsed.ok) redirect(`${back}?error=${encodeURIComponent(parsed.error)}`)

  await updateBooking(id, parsed.patch, admin.email)
  revalidatePath('/admin')
  revalidatePath('/admin/bookings')
  redirect(`${back}?saved=1`)
}
