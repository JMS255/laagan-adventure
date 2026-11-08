import 'server-only'
import { cache } from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getAuth } from 'firebase-admin/auth'
import { getAdminApp, getDb } from '@/lib/firebase-admin'

const auth = () => getAuth(getAdminApp())

export const SESSION_COOKIE = 'laagan_admin'
export const SESSION_MAX_AGE_MS = 5 * 24 * 60 * 60 * 1000
const FRESH_SIGN_IN_SECONDS = 5 * 60

export type AdminRole = 'owner' | 'staff'

export interface AdminUser {
  email: string
  role: AdminRole
  name?: string
}

/** Only emails listed in the `staff` collection may enter. Checked on every request, so removing someone takes effect immediately. */
async function findStaff(email: string): Promise<AdminUser | null> {
  const id = email.toLowerCase()
  const data = (await getDb().collection('staff').doc(id).get()).data()
  if (data?.role !== 'owner' && data?.role !== 'staff') return null
  return { email: id, role: data.role, name: data.name }
}

/** Turns a fresh Firebase sign-in into a session cookie, only for verified, approved emails. */
export async function createSessionCookie(idToken: string): Promise<string | null> {
  const decoded = await auth().verifyIdToken(idToken)
  const isFresh = Date.now() / 1000 - decoded.auth_time < FRESH_SIGN_IN_SECONDS
  if (!decoded.email || !decoded.email_verified || !isFresh) return null
  if (!(await findStaff(decoded.email))) return null
  return auth().createSessionCookie(idToken, { expiresIn: SESSION_MAX_AGE_MS })
}

export const getAdmin = cache(async (): Promise<AdminUser | null> => {
  const value = (await cookies()).get(SESSION_COOKIE)?.value
  if (!value) return null
  try {
    const decoded = await auth().verifySessionCookie(value, true)
    return decoded.email ? await findStaff(decoded.email) : null
  } catch {
    return null
  }
})

/** Call at the top of every admin page and admin API route. */
export async function requireAdmin(role?: AdminRole): Promise<AdminUser> {
  const admin = await getAdmin()
  if (!admin) redirect('/admin/login')
  if (role && admin.role !== role) redirect('/admin')
  return admin
}
