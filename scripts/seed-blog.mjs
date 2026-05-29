/**
 * Run once to create the first blog post in Sanity:
 *
 *   node scripts/seed-blog.mjs
 *
 * Requires SANITY_WRITE_TOKEN in .env.local
 * Get one: sanity.io/manage → your project → API → Tokens → Add API token (Editor role)
 */

import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'

// Read .env.local manually (no dotenv dependency needed)
const env = {}
try {
  readFileSync('.env.local', 'utf-8').split('\n').forEach(line => {
    const [k, ...v] = line.split('=')
    if (k && !k.startsWith('#')) env[k.trim()] = v.join('=').trim()
  })
} catch {}

const token = env.SANITY_WRITE_TOKEN
if (!token) {
  console.error('\n❌  SANITY_WRITE_TOKEN not found in .env.local')
  console.error('   Get one at: sanity.io/manage → your project → API → Tokens → Add API token (Editor role)\n')
  process.exit(1)
}

const client = createClient({
  projectId: 'o5mustem',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

function block(text, style = 'normal') {
  return {
    _type: 'block',
    _key: Math.random().toString(36).slice(2),
    style,
    children: [{ _type: 'span', _key: Math.random().toString(36).slice(2), text, marks: [] }],
    markDefs: [],
  }
}

function h2(text) { return block(text, 'h2') }
function h3(text) { return block(text, 'h3') }
function p(text)  { return block(text, 'normal') }

const post = {
  _type: 'blogPost',
  title: 'Complete Guide to Santa Cruz Island, Zamboanga City',
  slug: { _type: 'slug', current: 'santa-cruz-island-complete-guide' },
  publishedAt: new Date().toISOString(),
  tags: ['Santa Cruz Island', 'Travel Guide', 'Zamboanga City', 'Beach'],
  excerpt: 'Everything you need to know about visiting Santa Cruz Island — the pink sand beach, the lagoon, how to get there, and what to bring. Your complete guide to one of the Philippines\' most stunning destinations.',
  body: [
    p('Santa Cruz Island is one of the Philippines\' most unique and breathtaking destinations — and it\'s right here in Zamboanga City. Known for its rare pink sand beach and the stunning turquoise lagoon, it\'s a place that genuinely lives up to the hype. If you\'re planning a trip to Zamboanga, this island is non-negotiable.'),
    p('Here\'s everything you need to know before you go.'),

    h2('Why is the sand pink?'),
    p('The pink color comes from tiny crushed fragments of red Foraminifera — microscopic marine organisms with red and pink shells. When they die, their shells wash up on shore and mix with the white sand, creating that signature pink hue.'),
    p('The color is most visible in the wet sand along the waterline, especially on overcast days or in the early morning. Don\'t expect the whole beach to look like a flamingo — it\'s subtle, but it\'s real, and it\'s stunning.'),

    h2('The Lagoon'),
    p('On the far side of the island sits a quiet, sheltered lagoon with some of the clearest blue-green water you\'ll find anywhere in the Philippines. It\'s calm, shallow in most spots, and perfect for wading or just sitting in the water and doing absolutely nothing.'),
    p('The lagoon is separated from the open sea by a narrow strip of land, which means the water stays still even when the outer sea is choppy. It\'s a completely different experience from the main beach.'),

    h2('How to Get to Santa Cruz Island'),
    h3('From Zamboanga City'),
    p('Santa Cruz Island is located about 1.5 kilometers off the coast of Zamboanga City. The only way to get there is by boat — there\'s no bridge and no ferry schedule. You need to book a tour or charter a bangka (outrigger boat) from the city.'),
    p('The boat ride takes about 10–15 minutes from the Zamboanga City port area, depending on the boat and sea conditions.'),
    h3('Entry requirements'),
    p('You need a permit to visit Santa Cruz Island, which is managed by the local government. When you book with a licensed tour operator like Laagan Adventure, we handle all permits as part of your package — you don\'t need to queue at any government office.'),

    h2('Best Time to Visit'),
    p('Zamboanga City has two seasons: dry (roughly October to May) and wet (June to September). The best time to visit Santa Cruz Island is during the dry season when the sea is calm and visibility is excellent.'),
    p('Early morning trips (departing around 7–8 AM) are the best — the light is beautiful for photos, the beach is cooler, and you beat the midday heat. By early afternoon the sun is intense.'),

    h2('What to Bring'),
    p('Packing right makes a huge difference. Here\'s what we always recommend:'),
    p('✔ Reef-safe sunscreen — regular sunscreen damages coral reefs and is discouraged near the lagoon'),
    p('✔ Waterproof bag for your phone and valuables'),
    p('✔ Snorkel gear — the water around the island has healthy coral if you want to explore'),
    p('✔ Extra change of clothes and a towel'),
    p('✔ Cash for food (there are a few small stalls on the island selling snacks and drinks)'),
    p('✔ Water — bring more than you think you need'),
    p('✔ Sandals or water shoes — the beach entry can have shells underfoot'),

    h2('What to Expect on the Island'),
    p('Santa Cruz Island is not a resort — it\'s a protected natural area. There are basic facilities (restrooms, changing areas) but don\'t expect air conditioning or a hotel pool. The appeal is exactly that: it\'s raw, natural, and uncrowded compared to more developed beach destinations.'),
    p('The island has designated swimming areas, a walking path around part of the island, and areas where you can just sit and take in the view. Most people spend 2–4 hours on the island before heading back.'),

    h2('Book with Laagan Adventure'),
    p('When you book through Laagan Adventure, we handle everything: permits, boat transport, and a local guide who can tell you the real stories behind the island — not just the script. We\'ve been taking guests to Santa Cruz Island since 2023 and know every corner of it.'),
    p('Our Santa Cruz Island tour includes round-trip boat transport from Zamboanga City, all entry permits, and a guided experience. Check our tour page for current pricing and availability.'),

    h2('Tips & Reminders'),
    p('🚫 Do not take sand home — it\'s illegal and disrespectful to the environment'),
    p('🚫 No loud music on the island — it\'s a natural area, not a beach club'),
    p('📱 Bring a power bank — there\'s no charging on the island'),
    p('🕗 Start early — the island can get crowded by 10 AM on weekends'),
    p('🌊 Check weather before going — trips are cancelled if seas are rough for safety'),
    p('Zamboanga City gets an unfair reputation in the media, but the reality on the ground is a vibrant, hospitable city with incredible natural beauty just minutes from the coast. Santa Cruz Island is proof of that. Come see it for yourself.'),
  ],
}

async function run() {
  console.log('Creating blog post...')
  const result = await client.create(post)
  console.log(`\n✅  Blog post created! ID: ${result._id}`)
  console.log('   View in Studio: http://localhost:3333/studio/desk/blogPost')
  console.log('   It will appear on /blog once published.\n')
}

run().catch(err => {
  console.error('\n❌  Error:', err.message, '\n')
  process.exit(1)
})
