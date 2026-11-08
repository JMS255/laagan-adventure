import { NextRequest, NextResponse } from 'next/server'
import { buildMorningDigest } from '@/lib/digest'
import { listBookings } from '@/lib/db'
import { notifyTeam, SITE_URL } from '@/lib/telegram'

/** Called by Vercel Cron every morning (see vercel.json). Vercel sends `Authorization: Bearer <CRON_SECRET>`. */
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET
  if (!secret || req.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const bookings = await listBookings()
  const message = buildMorningDigest(bookings, new Date(), `${SITE_URL}/admin`)
  if (message) await notifyTeam(message)
  return NextResponse.json({ ok: true, sent: Boolean(message) })
}
