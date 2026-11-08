import 'server-only'
import { readFileSync } from 'node:fs'
import { cert, getApps, initializeApp, type App, type ServiceAccount } from 'firebase-admin/app'
import { getFirestore, type Firestore } from 'firebase-admin/firestore'

/**
 * Server-only Firebase connection.
 * - Vercel: set FIREBASE_SERVICE_ACCOUNT to the full key JSON.
 * - Local:  set FIREBASE_SERVICE_ACCOUNT_FILE to the key file's path.
 */
/** Parses the key JSON. The error describes the shape only — it must never echo any part of the key. */
function parseServiceAccount(raw: string, source: string): ServiceAccount {
  try {
    return JSON.parse(raw) as ServiceAccount
  } catch {
    const text = raw.trim()
    throw new Error(`${source} is not valid JSON (length ${text.length}, starts with "${text.slice(0, 1)}", ends with "${text.slice(-1)}")`)
  }
}

function loadServiceAccount(): ServiceAccount {
  const json = process.env.FIREBASE_SERVICE_ACCOUNT
  if (json) return parseServiceAccount(json, 'FIREBASE_SERVICE_ACCOUNT')
  const file = process.env.FIREBASE_SERVICE_ACCOUNT_FILE
  if (file) return parseServiceAccount(readFileSync(file, 'utf8'), 'FIREBASE_SERVICE_ACCOUNT_FILE')
  throw new Error('Firebase is not configured: FIREBASE_SERVICE_ACCOUNT is not set in this environment')
}

export function getAdminApp(): App {
  return getApps()[0] ?? initializeApp({ credential: cert(loadServiceAccount()) })
}

export function getDb(): Firestore {
  return getFirestore(getAdminApp())
}
