// Static destination config — shaped to match a future Sanity 'destination' schema.
// To migrate: replace DESTINATIONS import with a Sanity GROQ query returning the same shape.

export interface ThingToDo {
  icon: string
  title: string
  desc: string
}

export interface Destination {
  slug: string
  name: string
  tagline: string
  description: string
  heroGradient: string
  bestTime: string
  weatherNote: string
  thingsToDo: ThingToDo[]
  highlights: string[]
  destinationTag: string // must match the `destination` string field on Sanity tours
}

export const DESTINATIONS: Destination[] = [
  {
    slug: 'santa-cruz-island',
    name: 'Santa Cruz Island',
    destinationTag: 'Santa Cruz Island',
    tagline: 'Walk the only pink sand beach in the Philippines.',
    heroGradient: 'linear-gradient(160deg, #0ea5e9 0%, #0369a1 45%, #1a2744 100%)',
    description: 'Santa Cruz Island sits in the middle of Zamboanga Bay, a short boat ride from the city. Its beach is one of only a handful of pink-sand beaches on earth — the colour comes from millions of tiny crushed coral shells mixed with white sand. The lagoon behind the island stays glassy calm even when the open sea is rough, making it perfect for swimming at any time of year.',
    highlights: [
      'Naturally pink sand — one of only a few beaches like it on earth',
      'Protected lagoon for safe swimming and snorkelling',
      'Local guide included — no permit hassle, we handle everything',
      'Only a 20-minute boat ride from Zamboanga City',
      'DTI registered operator — fully legitimate, BIR receipts available',
    ],
    bestTime: 'November to May',
    weatherNote: 'The dry season runs November through May — calm seas, clear skies, ideal for the boat crossing. June to October brings occasional rain and rougher water; tours still run but conditions vary.',
    thingsToDo: [
      { icon: '🏖️', title: 'Walk the Pink Sand Beach', desc: 'The sand really is pink. Walk the full length of the beach and watch the colour shift with the light.' },
      { icon: '🤿', title: 'Snorkel the Lagoon', desc: 'The protected lagoon has calm, clear water and colourful reef fish just below the surface.' },
      { icon: '📸', title: 'Photograph the Skyline', desc: 'The island gives you an unobstructed view back to Zamboanga City across the bay — a shot worth getting.' },
      { icon: '🦀', title: 'Fresh Seafood on the Shore', desc: 'Local vendors sell grilled fish and seafood right on the beach. Try the curacha — a local deep-sea crab.' },
    ],
  },
  {
    slug: 'zamboanga-city',
    name: 'Zamboanga City',
    destinationTag: 'Zamboanga City',
    tagline: 'Forts, mosques, and the stories behind every corner.',
    heroGradient: 'linear-gradient(160deg, #d97706 0%, #b45309 45%, #1a2744 100%)',
    description: 'Zamboanga City is one of the most culturally layered cities in the Philippines. Spanish forts, ancestral mosques, Yakan weaving villages, and the famously colourful vintas sail side by side. The city\'s Chavacano language — a Spanish-based creole — is spoken nowhere else on earth. This is the Philippines most people haven\'t discovered yet.',
    highlights: [
      'Fort Pilar — a 17th-century Spanish fort still standing on the waterfront',
      'Yakan Weaving Village — watch intricate traditional cloth made by hand',
      'Taluksangay Mosque — one of the oldest mosques in the Philippines',
      'Paseo del Mar — the waterfront promenade at golden hour',
      'Chavacano language spoken only here — a living piece of colonial history',
    ],
    bestTime: 'November to April',
    weatherNote: 'Year-round destination. The dry season (November–April) is most comfortable for walking tours. Temperatures hover around 27–32°C throughout the year.',
    thingsToDo: [
      { icon: '🏰', title: 'Tour Fort Pilar', desc: 'Walk the walls of a fort built in 1635. The shrine inside is one of the most visited in Mindanao.' },
      { icon: '🕌', title: 'Visit the Mosques', desc: 'Zamboanga has some of the oldest and most beautiful mosques in the Philippines. Our guide provides full context.' },
      { icon: '⛵', title: 'Watch the Vintas', desc: 'The brightly coloured outrigger boats are iconic to Zamboanga. Best seen from the waterfront in the morning.' },
      { icon: '🧶', title: 'Yakan Weaving Village', desc: 'Watch Yakan weavers create geometric cloth on traditional backstrap looms — a craft passed down for generations.' },
    ],
  },
  {
    slug: 'basilan-province',
    name: 'Basilan Province',
    destinationTag: 'Basilan',
    tagline: 'White beaches and jungle waterfalls, one island away.',
    heroGradient: 'linear-gradient(160deg, #059669 0%, #047857 45%, #1a2744 100%)',
    description: 'Basilan is the island province directly south of Zamboanga City — less than an hour away by fast craft. Most visitors never make it here, which means Malamawi\'s white sand beach and Bulingan Falls are yours almost entirely. Basilan rewards those willing to go a little further.',
    highlights: [
      'Malamawi White Beach — long, clean, and almost never crowded',
      'Bulingan Falls — a multi-tiered waterfall through jungle',
      'Rubber and coconut plantations cover most of the island interior',
      'Accessible by fast craft from Zamboanga City port',
      'Authentic local market scene in Isabela City',
    ],
    bestTime: 'December to April',
    weatherNote: 'Best visited in the dry months (December–April) when the roads to the falls are passable and the beach conditions are at their best.',
    thingsToDo: [
      { icon: '🏝️', title: 'Malamawi Beach', desc: 'Long stretch of white sand with calm water. Bring your own food and make a day of it.' },
      { icon: '💧', title: 'Bulingan Falls', desc: 'A series of falls through dense jungle. The hike in takes about 45 minutes — completely worth it.' },
      { icon: '🌴', title: 'Plantation Drive', desc: 'The road through Basilan passes through rubber and coconut plantations — a landscape unlike anywhere else in the Philippines.' },
      { icon: '🛶', title: 'Fast Craft Crossing', desc: 'The boat ride from Zamboanga City across to Isabela is a journey in itself — views of the archipelago in all directions.' },
    ],
  },
  {
    slug: 'zambasulta',
    name: 'ZAMBASULTA Journey',
    destinationTag: 'ZAMBASULTA',
    tagline: 'The complete southern arc — Zamboanga to Tawi-Tawi.',
    heroGradient: 'linear-gradient(160deg, #7c3aed 0%, #6d28d9 45%, #1a2744 100%)',
    description: 'ZAMBASULTA is the name for the route that covers the full southern arc of the Philippines: Zamboanga, Basilan, Sulu, and Tawi-Tawi. Over 7 days you move through ancient mosque towns, the floating villages of Tawi-Tawi, the sacred peak of Bud Bongao, and the historic streets of Jolo. Most of these places require local connections to visit safely — that\'s exactly what we provide.',
    highlights: [
      '7-day route covering 4 provinces most tourists never see',
      'Bud Bongao Peak in Tawi-Tawi — sacred mountain with panoramic views',
      'Floating village of Bangau-Bangau — a village built entirely over water',
      'Sheik Makhdum Mosque — the oldest mosque in the Philippines (1380 AD)',
      'Local guides with deep community connections at every stop',
    ],
    bestTime: 'January to March',
    weatherNote: 'The calmest, driest window is January to March. Seas between the islands are smoothest and all sites are accessible. Travel outside this window is possible but requires more flexibility.',
    thingsToDo: [
      { icon: '⛰️', title: 'Climb Bud Bongao', desc: 'The sacred mountain of Tawi-Tawi. The hike takes about 2 hours and the monkeys at the summit are famous.' },
      { icon: '🕌', title: 'Sheik Makhdum Mosque', desc: 'The oldest mosque in the Philippines, built in 1380. One of the most historically significant sites in Southeast Asia.' },
      { icon: '🛖', title: 'Bangau-Bangau Village', desc: 'An entire village built over the water on stilts. Walking the boardwalks between houses is an experience unlike anything else.' },
      { icon: '🗺️', title: 'Historic Jolo', desc: 'The capital of Sulu has a history stretching back centuries. Our guide brings the stories alive in a way no guidebook can.' },
    ],
  },
]

export function getDestination(slug: string): Destination | undefined {
  return DESTINATIONS.find(d => d.slug === slug)
}
