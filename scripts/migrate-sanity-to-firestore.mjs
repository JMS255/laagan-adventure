// One-time copy: Sanity (bookings, tour prices, settings, gallery) -> Firestore.
// Usage: node scripts/migrate-sanity-to-firestore.mjs "<path to service-account .json>" [--dry]
// Safe to re-run: documents use fixed IDs, so they are overwritten, not duplicated.
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs'
import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

const [keyPath, flag] = process.argv.slice(2)
if (!keyPath) {
  console.error('Missing path to the Firebase service-account .json file')
  process.exit(1)
}
const dry = flag === '--dry'

const SANITY = 'https://o5mustem.api.sanity.io/v2024-01-01/data/query/production'
async function sanity(query) {
  const res = await fetch(`${SANITY}?query=${encodeURIComponent(query)}`)
  if (!res.ok) throw new Error(`Sanity ${res.status}`)
  return (await res.json()).result
}

const slugify = s => String(s ?? '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const clean = obj => Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined && v !== null))

initializeApp({ credential: cert(JSON.parse(readFileSync(keyPath, 'utf8'))) })
const db = getFirestore()

const bookings = await sanity('*[_type=="booking"]')
const tours = await sanity('*[_type=="tour"]')
const config = await sanity('*[_type=="siteConfig"][0]')
const gallery = await sanity('*[_type=="galleryPhoto"]|order(order asc){_id,caption,destination,order,"url":image.asset->url}')

const writes = []

for (const b of bookings) {
  const id = slugify(b.bookingRef) || b._id
  writes.push(['bookings', id, clean({
    bookingRef: b.bookingRef, status: b.status ?? 'pending', tourTitle: b.tourTitle, tourSlug: b.tourSlug,
    date: b.date, guests: b.guests, name: b.name?.trim(), phone: b.phone, email: b.email, totalPrice: b.totalPrice,
    depositSent: b.depositSent ?? false, promo: b.promo, notes: b.notes, submittedAt: b.submittedAt ?? b._createdAt,
  })])
}

for (const t of tours) {
  writes.push(['tours', t.slug.current, clean({
    slug: t.slug.current, title: t.title, price: t.price, priceNote: t.priceNote,
    pricingTiers: (t.pricingTiers ?? []).map(p => clean({ label: p.label, minPax: p.minPax, maxPax: p.maxPax, pricePerPerson: p.pricePerPerson })),
    badgeLabel: t.badgeLabel, urgencyNote: t.urgencyNote, availabilityNote: t.availabilityNote,
    availableDates: t.availableDates ?? [], featured: t.featured ?? false,
  })])
}

if (config) {
  writes.push(['settings', 'site', clean({
    depositAmount: config.depositAmount, tripSmallGroupPrice: config.tripSmallGroupPrice, tripLargeGroupPrice: config.tripLargeGroupPrice,
  })])
}

mkdirSync('public/images/gallery', { recursive: true })
for (const [i, g] of gallery.entries()) {
  const file = `${slugify(g.caption) || 'photo'}-${i + 1}.jpg`
  if (!dry) {
    const img = await fetch(`${g.url}?w=1600&q=80&fm=jpg`)
    if (!img.ok) throw new Error(`Photo download failed: ${g.url}`)
    writeFileSync(`public/images/gallery/${file}`, Buffer.from(await img.arrayBuffer()))
  }
  writes.push(['gallery', slugify(g.caption) + '-' + (i + 1), clean({
    src: `/images/gallery/${file}`, caption: g.caption?.trim(), destination: g.destination, order: g.order ?? 100 + i,
  })])
}

const counts = {}
for (const [col, id, data] of writes) {
  counts[col] = (counts[col] ?? 0) + 1
  if (!dry) await db.collection(col).doc(id).set(data)
}
console.log(dry ? 'DRY RUN (nothing written):' : 'Copied to Firestore:', counts)
