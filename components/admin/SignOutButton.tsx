'use client'

import { useRouter } from 'next/navigation'
import { signOut } from 'firebase/auth'
import { getClientAuth } from '@/lib/firebase-client'

export default function SignOutButton() {
  const router = useRouter()

  async function handleSignOut() {
    await fetch('/api/admin/session', { method: 'DELETE' })
    await signOut(getClientAuth()).catch(() => undefined)
    router.replace('/admin/login')
    router.refresh()
  }

  return (
    <button type="button" onClick={handleSignOut} className="btn btn--outline-light" style={{ fontFamily: 'inherit' }}>
      Sign out
    </button>
  )
}
