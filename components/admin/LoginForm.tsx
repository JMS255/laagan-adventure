'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, type User } from 'firebase/auth'
import { getClientAuth } from '@/lib/firebase-client'

const INPUT_STYLE = {
  width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1.5px solid var(--border)',
  fontFamily: 'inherit', fontSize: '.9rem', marginBottom: '12px', boxSizing: 'border-box',
} as const

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
    } catch {
      setError('Sign-in did not complete. Check your details and try again.')
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
