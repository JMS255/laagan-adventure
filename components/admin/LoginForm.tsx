'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, type User } from 'firebase/auth'
import { getClientAuth } from '@/lib/firebase-client'

const INPUT_STYLE = {
  width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1.5px solid var(--border)',
  fontFamily: 'inherit', fontSize: '.9rem', marginBottom: '12px', boxSizing: 'border-box',
} as const

/** Turns a Firebase sign-in error into a sentence that says what to do. */
function describeAuthError(err: unknown): string {
  const code = typeof err === 'object' && err !== null && 'code' in err ? String((err as { code: unknown }).code) : ''
  switch (code) {
    case 'auth/unauthorized-domain':
      return 'This website address is not approved for sign-in yet. Add it in Firebase: Authentication, Settings, Authorized domains.'
    case 'auth/popup-blocked':
      return 'Your browser blocked the sign-in window. Allow pop-ups for this site and try again.'
    case 'auth/popup-closed-by-user':
    case 'auth/cancelled-popup-request':
      return 'The sign-in window was closed before it finished. Please try again.'
    case 'auth/operation-not-allowed':
      return 'This sign-in method is not switched on in Firebase (Authentication, Sign-in method).'
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'The email or password is not correct.'
    case 'auth/network-request-failed':
      return 'Could not reach the internet. Check your connection and try again.'
    default:
      return `Sign-in did not complete${code ? ` (${code})` : ''}. Please try again.`
  }
}

export default function LoginForm() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [isBusy, setIsBusy] = useState(false)

  async function finishSignIn(user: User) {
    const idToken = await user.getIdToken()
    const res = await fetch('/api/admin/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken }),
    })
    if (res.ok) {
      router.replace('/admin')
      router.refresh()
      return
    }
    const json = await res.json().catch(() => ({}))
    await signOut(getClientAuth())
    setError(json?.error ?? 'Sign-in failed. Please try again.')
  }

  async function run(signIn: () => Promise<User>) {
    setIsBusy(true)
    setError('')
    try {
      await finishSignIn(await signIn())
    } catch (err) {
      setError(describeAuthError(err))
    } finally {
      setIsBusy(false)
    }
  }

  function handleGoogle() {
    return run(async () => (await signInWithPopup(getClientAuth(), new GoogleAuthProvider())).user)
  }

  function handlePassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    return run(async () =>
      (await signInWithEmailAndPassword(getClientAuth(), String(fd.get('email')), String(fd.get('password')))).user,
    )
  }

  return (
    <div style={{ background: '#fff', borderRadius: '20px', padding: '40px 32px', width: '100%', maxWidth: '380px', boxShadow: '0 20px 60px rgba(0,0,0,.3)' }}>
      <h1 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--navy)', textAlign: 'center', marginBottom: '6px' }}>Laagan PH Admin</h1>
      <p style={{ fontSize: '.82rem', color: 'var(--muted)', textAlign: 'center', marginBottom: '24px' }}>Team sign-in only</p>

      <button type="button" onClick={handleGoogle} disabled={isBusy} className="btn btn--primary"
        style={{ width: '100%', justifyContent: 'center', borderRadius: '10px', fontFamily: 'inherit', marginBottom: '20px' }}>
        Sign in with Google
      </button>

      <p style={{ fontSize: '.72rem', color: 'var(--muted)', textAlign: 'center', marginBottom: '14px' }}>or use email and password</p>
      <form onSubmit={handlePassword}>
        <input name="email" type="email" placeholder="Email" required autoComplete="username" style={INPUT_STYLE} />
        <input name="password" type="password" placeholder="Password" required autoComplete="current-password" style={INPUT_STYLE} />
        <button type="submit" disabled={isBusy} className="btn btn--outline"
          style={{ width: '100%', justifyContent: 'center', borderRadius: '10px', fontFamily: 'inherit' }}>
          Sign in
        </button>
      </form>

      {error && <p role="alert" style={{ marginTop: '16px', fontSize: '.82rem', color: '#991b1b', textAlign: 'center' }}>{error}</p>}
    </div>
  )
}
