import 'server-only'
import { readFileSync } from 'node:fs'
import { listStaff } from '@/lib/db'

const API = 'https://api.telegram.org'
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://laaganadventure.com'

/** Vercel: set TELEGRAM_BOT_TOKEN. Local: set TELEGRAM_BOT_TOKEN_FILE to a text file holding the token. */
function getToken(): string | null {
  const direct = process.env.TELEGRAM_BOT_TOKEN?.trim()
  if (direct) return direct
  const file = process.env.TELEGRAM_BOT_TOKEN_FILE
  return file ? readFileSync(file, 'utf8').trim() : null
}

/** Sends one message. Never throws: a Telegram problem must not break a booking. */
export async function sendTelegram(chatId: string, html: string): Promise<boolean> {
  try {
    const token = getToken()
    if (!token) {
      console.error('Telegram alert NOT sent: TELEGRAM_BOT_TOKEN is not set in this environment')
      return false
    }
    const res = await fetch(`${API}/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: html, parse_mode: 'HTML', disable_web_page_preview: true }),
    })
    if (!res.ok) console.error('Telegram send failed:', res.status)
    return res.ok
  } catch (err) {
    console.error('Telegram send error:', err)
    return false
  }
}

/** Sends to everyone on the team who has linked Telegram, or only to the given emails. */
export async function notifyTeam(html: string, onlyEmails?: string[]): Promise<void> {
  const staff = await listStaff().catch(() => [])
  const targets = staff.filter(s => s.telegramChatId && (!onlyEmails || onlyEmails.includes(s.email)))
  if (targets.length === 0) console.error('Telegram alert NOT sent: no team member has a linked Telegram chat')
  await Promise.all(targets.map(s => sendTelegram(s.telegramChatId as string, html)))
}
