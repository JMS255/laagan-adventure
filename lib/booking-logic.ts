import type { Booking, BookingChecklist, BookingStatus } from './types'

export const STATUSES: BookingStatus[] = ['pending', 'confirmed', 'completed', 'cancelled']

export const CHECKLIST_STEPS: { key: keyof BookingChecklist; label: string }[] = [
  { key: 'replied', label: 'Replied to guest' },
  { key: 'depositReceived', label: 'Deposit received' },
  { key: 'dateSecured', label: 'Date secured' },
  { key: 'boatBooked', label: 'Boat booked' },
  { key: 'guideAssigned', label: 'Guide assigned' },
  { key: 'reminderSent', label: 'Reminder sent to guest' },
  { key: 'tourDone', label: 'Tour done' },
]

const REPLY_DEADLINE_HOURS = 24
const UPCOMING_DAYS = 7
const MAX_NOTES_LENGTH = 2000
const MS_PER_HOUR = 3_600_000
const MS_PER_DAY = 86_400_000

const isOpen = (b: Booking): boolean => b.status === 'pending' || b.status === 'confirmed'

/** Whether a checklist step is ticked. Older bookings only have `depositSent`, so fall back to that. */
export function isStepDone(b: Booking, key: keyof BookingChecklist): boolean {
  const value = b.checklist?.[key]
  if (value !== undefined) return value
  return key === 'depositReceived' ? b.depositSent : false
}

/** Prep steps still to do before the tour (everything except "Tour done"). */
export function remainingPrepSteps(b: Booking): number {
  return CHECKLIST_STEPS.filter(s => s.key !== 'tourDone' && !isStepDone(b, s.key)).length
}

/** Today's date in the Philippines as YYYY-MM-DD, whatever timezone the server runs in. */
export function manilaToday(now: Date): string {
  return now.toLocaleDateString('en-CA', { timeZone: 'Asia/Manila' })
}

/** Whole days from `today` to `date` (negative if the date has passed). */
export function daysUntil(date: string, today: string): number {
  return Math.round((Date.parse(`${date}T00:00:00Z`) - Date.parse(`${today}T00:00:00Z`)) / MS_PER_DAY)
}

export function hoursSince(iso: string, now: Date): number {
  return (now.getTime() - Date.parse(iso)) / MS_PER_HOUR
}

export interface BookingFlags {
  needsReply: boolean
  replyOverdue: boolean
  depositWaiting: boolean
  noPrice: boolean
  datePassed: boolean
  daysAway: number
}

export function flagsFor(b: Booking, now: Date): BookingFlags {
  const open = isOpen(b)
  const daysAway = daysUntil(b.date, manilaToday(now))
  const needsReply = open && b.status === 'pending' && !isStepDone(b, 'replied')
  return {
    needsReply,
    replyOverdue: needsReply && hoursSince(b.submittedAt, now) > REPLY_DEADLINE_HOURS,
    depositWaiting: open && isStepDone(b, 'replied') && !isStepDone(b, 'depositReceived'),
    noPrice: open && !b.totalPrice,
    datePassed: open && daysAway < 0,
    daysAway,
  }
}

export interface TodayBuckets {
  needReply: Booking[]
  depositWaiting: Booking[]
  upcoming: Booking[]
  problems: Booking[]
}

export function buildToday(bookings: Booking[], now: Date): TodayBuckets {
  const withFlags = bookings.map(b => ({ b, f: flagsFor(b, now) }))
  const pick = (test: (f: BookingFlags) => boolean) => withFlags.filter(x => test(x.f)).map(x => x.b)
  const byDate = (a: Booking, c: Booking) => a.date.localeCompare(c.date)
  return {
    needReply: pick(f => f.needsReply && !f.datePassed).sort((a, c) => a.submittedAt.localeCompare(c.submittedAt)),
    depositWaiting: pick(f => f.depositWaiting && !f.datePassed).sort(byDate),
    upcoming: withFlags
      .filter(x => isOpen(x.b) && x.f.daysAway >= 0 && x.f.daysAway <= UPCOMING_DAYS)
      .map(x => x.b)
      .sort(byDate),
    problems: pick(f => f.datePassed || f.noPrice).sort(byDate),
  }
}

export type ParsedBookingForm =
  | { ok: true; patch: BookingPatch }
  | { ok: false; error: string }

export interface BookingPatch {
  status: BookingStatus
  assignedTo: string
  checklist: BookingChecklist
  internalNotes: string
}

/** Validates the booking edit form. `staffEmails` is the list of people a booking may be assigned to. */
export function parseBookingForm(form: FormData, staffEmails: string[]): ParsedBookingForm {
  const status = String(form.get('status') ?? '') as BookingStatus
  if (!STATUSES.includes(status)) return { ok: false, error: 'Please choose a valid status.' }

  const assignedTo = String(form.get('assignedTo') ?? '').toLowerCase()
  if (assignedTo && !staffEmails.includes(assignedTo)) return { ok: false, error: 'That person is not on the team list.' }

  const internalNotes = String(form.get('internalNotes') ?? '').trim()
  if (internalNotes.length > MAX_NOTES_LENGTH) return { ok: false, error: 'Notes are too long (2000 characters max).' }

  const checklist = Object.fromEntries(
    CHECKLIST_STEPS.map(s => [s.key, form.get(`cl_${s.key}`) === 'on']),
  ) as unknown as BookingChecklist

  return { ok: true, patch: { status, assignedTo, checklist, internalNotes } }
}

/** Philippine mobile number to international digits (09171234567 -> 639171234567). */
export function toInternationalPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  if (digits.startsWith('63')) return digits
  if (digits.startsWith('0')) return `63${digits.slice(1)}`
  return digits.length === 10 ? `63${digits}` : digits
}

export const formatPeso = (n: number | undefined): string => (n ? `₱${n.toLocaleString('en-PH')}` : 'Price to confirm')

export function formatTourDate(date: string): string {
  return new Date(`${date}T12:00:00`).toLocaleDateString('en-PH', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
}
