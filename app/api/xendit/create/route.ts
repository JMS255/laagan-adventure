import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })

  const { bookingRef, tourTitle, depositAmount, name, email, phone } = body
  if (!bookingRef || !depositAmount) {
    return NextResponse.json({ error: 'Missing bookingRef or depositAmount' }, { status: 400 })
  }

  const auth = Buffer.from(`${process.env.XENDIT_SECRET_KEY}:`).toString('base64')

  const payload = {
    external_id: bookingRef,
    amount: depositAmount,
    description: `Deposit for ${tourTitle} — Ref: ${bookingRef}`,
    customer: {
      given_names: name ?? 'Guest',
      ...(email ? { email } : {}),
      ...(phone ? { mobile_number: phone } : {}),
    },
    success_redirect_url: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://laagan-adventure.vercel.app'}/book/paid?ref=${bookingRef}`,
    failure_redirect_url: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://laagan-adventure.vercel.app'}/book/paid?ref=${bookingRef}&failed=1`,
    payment_methods: ['GCASH'],
    currency: 'PHP',
  }

  try {
    const res = await fetch('https://api.xendit.co/v2/invoices', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const data = await res.json()
    if (!res.ok) {
      console.error('Xendit error:', data)
      return NextResponse.json({ error: data?.message ?? 'Xendit error' }, { status: 500 })
    }

    return NextResponse.json({ invoiceUrl: data.invoice_url })
  } catch (err) {
    console.error('Xendit fetch error:', err)
    return NextResponse.json({ error: 'Network error' }, { status: 500 })
  }
}
