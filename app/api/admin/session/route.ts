import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createSessionCookie, SESSION_COOKIE, SESSION_MAX_AGE_MS } from '@/lib/admin-auth'

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  const idToken = typeof body?.idToken === 'string' ? body.idToken : ''
  if (!idToken) return NextResponse.json({ error: 'Missing sign-in token' }, { status: 400 })

  let sessionCookie: string | null = null
  try {
    sessionCookie = await createSessionCookie(idToken)
  } catch (err) {
    console.error('Admin sign-in check failed:', err)
    return NextResponse.json({ error: 'Sign-in could not be verified' }, { status: 401 })
  }
  if (!sessionCookie) {
    return NextResponse.json({ error: 'This account is not approved for the admin area' }, { status: 403 })
  }

  ;(await cookies()).set(SESSION_COOKIE, sessionCookie, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE_MS / 1000,
  })
  return NextResponse.json({ ok: true })
}

export async function DELETE() {
  ;(await cookies()).delete(SESSION_COOKIE)
  return NextResponse.json({ ok: true })
}
