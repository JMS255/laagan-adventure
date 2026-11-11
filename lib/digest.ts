import { escapeHtml } from './escape-html'
import { buildToday, flagsFor, formatPeso, formatTourDate, manilaToday, remainingPrepSteps } from './booking-logic'
import type { Booking } from './types'

const MAX_LISTED = 5

function lines(bookings: Booking[], describe: (b: Booking) => string): string[] {
  const shown = bookings.slice(0, MAX_LISTED).map(b => `• ${describe(b)}`)
  const hidden = bookings.length - shown.length
  return hidden > 0 ? [...shown, `…and ${hidden} more`] : shown
}

const who = (b: Booking): string => `<b>${escapeHtml(b.name)}</b> — ${escapeHtml(b.tourTitle)}, ${formatTourDate(b.date)}`

/** The good-morning message. Returns null when there is nothing to do, so we don't nag on quiet days. */
export function buildMorningDigest(bookings: Booking[], now: Date, adminUrl: string): string | null {
  const t = buildToday(bookings, now)
  const overdue = t.needReply.filter(b => flagsFor(b, now).replyOverdue)
  const sections: string[] = []

  if (t.needReply.length > 0) {
    const header = `<b>Needs a reply (${t.needReply.length})</b>${overdue.length > 0 ? ` — ${overdue.length} overdue` : ''}`
    sections.push([header, ...lines(t.needReply, who)].join('\n'))
  }
  if (t.depositWaiting.length > 0) {
    sections.push([`<b>Deposit not received (${t.depositWaiting.length})</b>`, ...lines(t.depositWaiting, who)].join('\n'))
  }
  if (t.upcoming.length > 0) {
    const describe = (b: Booking) => `${who(b)} — ${remainingPrepSteps(b)} prep steps left`
    sections.push([`<b>Coming up in 7 days (${t.upcoming.length})</b>`, ...lines(t.upcoming, describe)].join('\n'))
  }
  if (t.problems.length > 0) {
    const describe = (b: Booking) => `${who(b)} — ${b.totalPrice ? 'date passed, still open' : 'no price'}`
    sections.push([`<b>Needs fixing (${t.problems.length})</b>`, ...lines(t.problems, describe)].join('\n'))
  }
  if (sections.length === 0) return null

  const day = new Date(`${manilaToday(now)}T12:00:00`).toLocaleDateString('en-PH', { weekday: 'long', month: 'long', day: 'numeric' })
  return [`☀️ <b>Good morning — ${day}</b>`, ...sections, `Open admin: ${adminUrl}`].join('\n\n')
}

/** Instant alert for a brand-new booking. */
export function buildNewBookingAlert(b: Booking, bookingUrl: string): string {
  return [
    '🆕 <b>New booking</b>',
    `${escapeHtml(b.name)} · ${b.guests} guest${b.guests === 1 ? '' : 's'}`,
    escapeHtml(b.tourTitle),
    `${formatTourDate(b.date)} · ${formatPeso(b.totalPrice)}`,
    b.depositDue ? `Deposit due: ${formatPeso(b.depositDue)}` : 'Deposit: to be confirmed',
    `Phone: ${escapeHtml(b.phone)}`,
    `Please reply within 24 hours.`,
    bookingUrl,
  ].join('\n')
}

export function buildAssignedAlert(b: Booking, assignedBy: string, bookingUrl: string): string {
  return [
    '📌 <b>A booking was assigned to you</b>',
    `${escapeHtml(b.name)} — ${escapeHtml(b.tourTitle)}`,
    `${formatTourDate(b.date)} · ${b.guests} guest${b.guests === 1 ? '' : 's'}`,
    `Assigned by ${escapeHtml(assignedBy)}`,
    bookingUrl,
  ].join('\n')
}
