// Connect a team member's Telegram chat to their admin login.
// 1. They send any message to the bot.
// 2. List chats:   node scripts/link-telegram.mjs "<firebase key .json>" "<bot token .txt>"
// 3. Link a chat:  node scripts/link-telegram.mjs "<firebase key .json>" "<bot token .txt>" <email> <chatId>
import { readFileSync } from 'node:fs'
import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

const [keyPath, tokenPath, email, chatId] = process.argv.slice(2)
if (!keyPath || !tokenPath) {
  console.error('Usage: node scripts/link-telegram.mjs "<firebase key .json>" "<bot token .txt>" [email chatId]')
  process.exit(1)
}
const token = readFileSync(tokenPath, 'utf8').trim()

if (!email) {
  const res = await fetch(`https://api.telegram.org/bot${token}/getUpdates`)
  const json = await res.json()
  if (!json.ok) { console.error('Telegram said:', json.description); process.exit(1) }
  const chats = new Map()
  for (const u of json.result) {
    const c = u.message?.chat
    if (c) chats.set(c.id, `${[c.first_name, c.last_name].filter(Boolean).join(' ')} ${c.username ? '(@' + c.username + ')' : ''}`.trim())
  }
  if (chats.size === 0) console.log('No messages yet. Send the bot a message in Telegram, then run this again.')
  for (const [id, name] of chats) console.log(`chatId ${id}  —  ${name}`)
  process.exit(0)
}

initializeApp({ credential: cert(JSON.parse(readFileSync(keyPath, 'utf8'))) })
const ref = getFirestore().collection('staff').doc(email.toLowerCase())
if (!(await ref.get()).exists) { console.error(`${email} is not on the staff list. Add them first with seed-staff.mjs`); process.exit(1) }
await ref.update({ telegramChatId: String(chatId) })
console.log(`Linked Telegram chat ${chatId} to ${email.toLowerCase()}`)
