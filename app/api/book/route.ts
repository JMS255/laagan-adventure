import { NextRequest, NextResponse } from 'next/server'
import { createClient } from 'next-sanity'

const writeClient = createClient({
  projectId: 'o5mustem',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
})

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })

  const { name, phone, tourSlug, date, adults } = body
  if (!name || !phone || !tourSlug || !date || !adults) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const guests = Number(body.adults) + Number(body.children ?? 0)

  // Write to Sanity
  try {
    await writeClient.create({
      _type: 'booking',
      bookingRef: body.bookingRef,
      status: 'pending',
      tourTitle: body.tourTitle,
      tourSlug: body.tourSlug,
      date: body.date,
      guests,
      name: body.name,
      phone: body.phone,
      email: body.email ?? '',
      totalPrice: Number(body.totalPrice),
      depositSent: body.depositSent ?? false,
      promo: body.promo ?? '',
      notes: body.notes ?? '',
      submittedAt: new Date().toISOString(),
    })
  } catch (err) {
    console.error('Sanity write error:', err)
    // Don't fail the booking — fall through to Formspree backup
  }

  // Formspree backup email
  try {
    const form = new FormData()
    form.set('_subject', `New Booking [${body.bookingRef}] — ${body.tourTitle}`)
    form.set('booking_reference', body.bookingRef)
    form.set('tour', body.tourTitle)
    form.set('tour_date', body.date)
    form.set('guests', String(guests))
    form.set('name', body.name)
    form.set('phone', body.phone)
    if (body.email) form.set('email', body.email)
    form.set('price_per_person', `₱${Number(body.pricePerPerson).toLocaleString()}`)
    form.set('total_price', `₱${Number(body.totalPrice).toLocaleString()}`)
    if (body.promo) form.set('promo_code', body.promo)
    if (body.notes) form.set('special_requirements', body.notes)
    form.set('deposit_sent', body.depositSent ? 'Yes' : 'No')

    await fetch('https://formspree.io/f/xqejjkbp', {
      method: 'POST',
      body: form,
      headers: { Accept: 'application/json' },
    })
  } catch (err) {
    console.error('Formspree backup error:', err)
  }

  // Resend confirmation email — fires only when API key is configured
  const resendKey = process.env.RESEND_API_KEY
  if (resendKey && body.email) {
    const html = `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;color:#1e293b">
        <h2 style="color:#d96b8a">Booking Received — ${body.bookingRef}</h2>
        <p>Hi ${body.name},</p>
        <p>We've received your booking request for <strong>${body.tourTitle}</strong>. We'll confirm your slot via Messenger or phone within 24 hours.</p>
        <table style="width:100%;border-collapse:collapse;margin:20px 0">
          <tr><td style="padding:8px 0;border-bottom:1px solid #e2e8f0;color:#64748b">Tour</td><td style="padding:8px 0;border-bottom:1px solid #e2e8f0;font-weight:600">${body.tourTitle}</td></tr>
          <tr><td style="padding:8px 0;border-bottom:1px solid #e2e8f0;color:#64748b">Date</td><td style="padding:8px 0;border-bottom:1px solid #e2e8f0;font-weight:600">${body.date}</td></tr>
          <tr><td style="padding:8px 0;border-bottom:1px solid #e2e8f0;color:#64748b">Guests</td><td style="padding:8px 0;border-bottom:1px solid #e2e8f0;font-weight:600">${guests}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b">Booking Ref</td><td style="padding:8px 0;font-weight:600">${body.bookingRef}</td></tr>
        </table>
        <div style="background:#fff4f7;border:1px solid #f9a8d4;border-radius:8px;padding:16px;margin:20px 0">
          <strong>Next step:</strong> Send a ₱300 GCash deposit to lock in your slot, then message us your receipt on <a href="https://m.me/61562040673545" style="color:#d96b8a">Messenger</a>.
        </div>
        <p style="color:#64748b;font-size:.85rem">— Laagan Adventure Team · Zamboanga City</p>
      </div>
    `
    fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'Laagan Adventure <bookings@laaganadventure.com>',
        to: [body.email],
        subject: `Booking Confirmed — ${body.bookingRef} | ${body.tourTitle}`,
        html,
      }),
    }).catch(err => console.error('Resend customer email error:', err))
  }

  // Admin notification email
  if (resendKey) {
    fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'Laagan Bookings <bookings@laaganadventure.com>',
        to: ['jamesignacio255@gmail.com'],
        subject: `New Booking [${body.bookingRef}] — ${body.tourTitle} on ${body.date}`,
        html: `<pre style="font-family:monospace">${JSON.stringify({ ref: body.bookingRef, tour: body.tourTitle, date: body.date, guests, name: body.name, phone: body.phone, email: body.email ?? '—', total: `₱${Number(body.totalPrice).toLocaleString()}`, notes: body.notes ?? '—' }, null, 2)}</pre>`,
      }),
    }).catch(err => console.error('Resend admin email error:', err))
  }

  return NextResponse.json({ ok: true, bookingRef: body.bookingRef })
}
