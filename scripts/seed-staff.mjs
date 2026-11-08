// Add or update someone who may sign in to /admin.
// Usage: node scripts/seed-staff.mjs "<key .json>" <email> <owner|staff> "<Name>"
import { readFileSync } from 'node:fs'
import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

const [keyPath, email, role, name = ''] = process.argv.slice(2)
if (!keyPath || !email || !['owner', 'staff'].includes(role)) {
  console.error('Usage: node scripts/seed-staff.mjs "<key .json>" <email> <owner|staff> "<Name>"')
  process.exit(1)
}
initializeApp({ credential: cert(JSON.parse(readFileSync(keyPath, 'utf8'))) })
await getFirestore().collection('staff').doc(email.toLowerCase()).set({ role, name })
console.log(`Approved ${email.toLowerCase()} as ${role}`)
