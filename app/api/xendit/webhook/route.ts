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

  // Find the Sanity booking by bookingRef and update it
  try {
    const result = await writeClient.fetch<{ _id: string } | null>(
      `*[_type == "booking" && bookingRef == $ref][0]{ _id }`,
      { ref: bookingRef }
    )

    if (result?._id) {
      await writeClient
        .patch(result._id)
        .set({ depositSent: true, status: 'confirmed' })
        .commit()
    }
  } catch (err) {
    console.error('Sanity update error:', err)
  }

  return NextResponse.json({ received: true })
}
