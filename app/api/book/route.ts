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

  const { name, phone, tourSlug, date, guests } = body
  if (!name || !phone || !tourSlug || !date || !guests) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  // Write to Sanity
  try {
    await writeClient.create({
      _type: 'booking',
      bookingRef: body.bookingRef,
      status: 'pending',
      tourTitle: body.tourTitle,
      tourSlug: body.tourSlug,
      date: body.date,
      guests: Number(body.guests),
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
    form.set('guests', String(body.guests))
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

  return NextResponse.json({ ok: true, bookingRef: body.bookingRef })
}
