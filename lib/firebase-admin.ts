import 'server-only'
import { readFileSync } from 'node:fs'
import { cert, getApps, initializeApp, type ServiceAccount } from 'firebase-admin/app'
import { getFirestore, type Firestore } from 'firebase-admin/firestore'

/**
 * Server-only Firebase connection.
 * - Vercel: set FIREBASE_SERVICE_ACCOUNT to the full key JSON.
 * - Local:  set FIREBASE_SERVICE_ACCOUNT_FILE to the key file's path.
 */
function loadServiceAccount(): ServiceAccount {
  const json = process.env.FIREBASE_SERVICE_ACCOUNT
  if (json) return JSON.parse(json) as ServiceAccount
  const file = process.env.FIREBASE_SERVICE_ACCOUNT_FILE
  if (file) return JSON.parse(readFileSync(file, 'utf8')) as ServiceAccount
  throw new Error('Firebase is not configured: set FIREBASE_SERVICE_ACCOUNT (or FIREBASE_SERVICE_ACCOUNT_FILE locally)')
}

export function getDb(): Firestore {
  const app = getApps()[0] ?? initializeApp({ credential: cert(loadServiceAccount()) })
  return getFirestore(app)
}
