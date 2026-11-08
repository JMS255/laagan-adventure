import { NextRequest, NextResponse } from 'next/server'
import { markBookingPaid } from '@/lib/db'

export async function POST(req: NextRequest) {
  // Verify Xendit webhook token
  const token = req.headers.get('x-callback-token')
  const expected = process.env.XENDIT_WEBHOOK_TOKEN
  if (expected && token !== expected) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })

  // Only act on paid/settled invoices
  if (body.status !== 'PAID' && body.status !== 'SETTLED') {
    return NextResponse.json({ received: true })
  }

  const bookingRef = body.external_id
  if (!bookingRef) return NextResponse.json({ received: true })

  // Mark the booking as paid and confirmed
  try {
    await markBookingPaid(bookingRef)
  } catch (err) {
    console.error('Booking update error:', err)
  }

  return NextResponse.json({ received: true })
}
