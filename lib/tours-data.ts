// ─────────────────────────────────────────────────────────────────────────────
// LAAGAN ADVENTURE — Hardcoded Tour Content
// Prices, availability, badges, urgencyNote → managed in Sanity Studio
// Everything else → managed here in code (James edits this file)
// To add a new tour: add an entry below AND add a Sanity doc with the same slug
// ─────────────────────────────────────────────────────────────────────────────

export interface TourInclusion { text: string; included: boolean }
export interface ItineraryItem { time: string; activity: string; detail?: string }
export interface TourDay { day: number; title: string; location: string; highlights: string[]; description: string }

export interface TourData {
  slug: string
  title: string
  tagline: string
  description: string
  duration: string
  destination: string
  audience: string[]
  category: string
  groupSize: string
  departure: string
  mainImage: string
  photos: string[]
  inclusions: TourInclusion[]
  itinerary?: ItineraryItem[]
  dayItinerary?: TourDay[]
  highlights: string[]
  whatToBring: string[]
  importantNotes: string[]
}

// ─── PHOTOS ──────────────────────────────────────────────────────────────────
// Real photos from actual Laagan Adventure tours.
// Wikimedia Commons used only where real photos are not yet available.

const P = {
  // Santa Cruz Island — real tour photos
  santaCruz:        '/images/guests-santa-cruz-vinta.jpg',
  santaCruzSign:    '/images/santa-cruz-sign.jpg',
  guestsZamboanga:  '/images/guests-zamboanga-sign.jpg',
  // Wikimedia fallbacks for Santa Cruz (pink sand close-up, vinta, aerial)
  pinkSand:         'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Pink_sand_of_Santa_Cruz_Island.jpg/1280px-Pink_sand_of_Santa_Cruz_Island.jpg',
  vinta:            'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Vintas_at_Zamboanga.jpg/1280px-Vintas_at_Zamboanga.jpg',
  santaCruzView:    'https://upload.wikimedia.org/wikipedia/commons/8/88/Grande_Santa_Cruz_Island_and_Zamboanga_City_from_Basilan_Strait%2C_Mar_2026_%281%29.jpg',
  // Heritage / Zamboanga City — real photos
  fortPilar:        '/images/fort-pilar.jpg',
  // Wikimedia fallbacks for heritage
  paseoDel:         'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Paseo_del_Mar-_Zamboanga_City.JPG/1280px-Paseo_del_Mar-_Zamboanga_City.JPG',
  zamboangaCity:    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Zamboanga_City_skyline_sea_view_sunrise_%28Zamboanga_City%3B_10-11-2023%29.jpg/1280px-Zamboanga_City_skyline_sea_view_sunrise_%28Zamboanga_City%3B_10-11-2023%29.jpg',
  taluksangayMosque:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Taluksangay_Mosque_%28Zamboanga_City%3B_10-12-2023%29.jpg/1280px-Taluksangay_Mosque_%28Zamboanga_City%3B_10-12-2023%29.jpg',
  // Once Islas — Wikimedia (no real photo yet)
  onceIslas:        'https://upload.wikimedia.org/wikipedia/commons/4/41/Eleven_Islands%2C_Zamboanga_City.jpg',
  onceIslasSiromon: 'https://upload.wikimedia.org/wikipedia/commons/3/31/Once_Islas%2CSiromon_Beach_resort_ZC.jpg',
  sunset:           'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Zamboanga_City%27s_Sunset.jpg/1280px-Zamboanga_City%27s_Sunset.jpg',
  // Merloquet Falls — real photo
  merloquet:        '/images/merloquet-falls-real.jpg',
  merloquetFalls1:  'https://upload.wikimedia.org/wikipedia/commons/4/4c/MERLOQUET_1.jpg',
  merloquetFalls2:  'https://upload.wikimedia.org/wikipedia/commons/1/13/MERLOQUET_2.jpg',
  // Basilan — real photos
  basilanAerial:    '/images/malamawi-aerial.jpg',
  basilanChurch:    '/images/basilan-church.jpg',
  basilanChurchInt: '/images/basilan-church-interior.jpg',
  basilanSign:      '/images/basilan-sign.jpg',
  basilanMountain:  '/images/basilan-mountain.jpg',
  lamitanPark:      '/images/lamitan-park.jpg',
  // Basilan Wikimedia fallbacks
  badjaosBasilan:   'https://upload.wikimedia.org/wikipedia/commons/c/ca/Badjao_Stilt_Houses%2C_Isabela%2C_Basilan%2C_Mar_2026.jpg',
  // ZambaSulTa — real photos
  zambasultaMosque: '/images/zambasulta-mosque.jpg',
  panampangan:      '/images/panampangan-cottages.jpg',
  panampanganPier:  '/images/panampangan-pier.jpg',
  suluMonument:     '/images/sulu-monument.jpg',
  // ZambaSulTa Wikimedia fallbacks
  simunulMosque:    'https://upload.wikimedia.org/wikipedia/commons/7/7e/Sheikh_Karimul_Makhdum_Mosque_BIO_file_photo.jpg',
  tawi:             'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Panampangan_Island.jpg/1280px-Panampangan_Island.jpg',
}

// ─────────────────────────────────────────────────────────────────────────────
export const TOURS_DATA: TourData[] = [

  // ── 1. SANTA CRUZ ISLAND ─────────────────────────────────────────────────
  {
    slug: 'santa-cruz-island-tour',
    title: 'Santa Cruz Island Tour',
    tagline: 'The only pink sand beach in Asia — and we\'ll take you there.',
    description: 'Step onto one of the most extraordinary beaches in the world: a beach where the sand turns naturally pink from millions of crushed red Foraminifera shells. Santa Cruz Island sits just off the Zamboanga coast, protected by a 400-visitor-per-day cap that keeps it gloriously uncrowded. Beyond the pink sand, you\'ll swim in a lagoon filled with stingless jellyfish — one of only a handful of places on Earth where this is safely possible. We sail there on a traditional Tausug vinta, a colorful hand-crafted outrigger boat unique to Zamboanga. National Geographic named Santa Cruz Island a Top 21 Beach in the World.',
    duration: 'Full Day · 6–8 hours',
    destination: 'Santa Cruz Island',
    audience: ['solo', 'couple', 'barkada', 'family'],
    category: 'Island',
    groupSize: '2–20 guests',
    departure: 'Paseo del Mar Jetty, 6:30–7:30 AM',
    mainImage: P.santaCruz,
    photos: [P.guestsZamboanga, P.santaCruzSign, P.pinkSand, P.vinta],
    highlights: [
      'Walk on the only pink sand beach in Asia',
      'Swim with stingless jellyfish in the protected lagoon',
      'Sail on a traditional Tausug vinta (colorful outrigger)',
      'Snorkel over vibrant coral gardens',
      'National Geographic Top 21 Beach in the World (2017)',
      'Only 400 visitors/day — never overcrowded',
    ],
    inclusions: [
      { text: 'Vinta boat ride to Santa Cruz Island', included: true },
      { text: 'Speedboat return trip', included: true },
      { text: 'Santa Cruz Island entrance fee (₱20) & environmental fee (₱5)', included: true },
      { text: 'Snorkeling gear & life jackets', included: true },
      { text: 'Licensed local tour guide', included: true },
      { text: 'Packed Filipino lunch (rice + viand)', included: true },
      { text: 'Fresh buko (coconut) water', included: true },
      { text: 'First aid kit & emergency supplies', included: true },
      { text: 'Personal expenses & souvenir shopping', included: false },
      { text: 'Additional food & drinks from island vendors', included: false },
      { text: 'Underwater camera rental', included: false },
    ],
    itinerary: [
      { time: '6:30 AM', activity: 'Meet at Paseo del Mar Jetty', detail: 'Gather at the waterfront. Your guide will brief you on safety and help you board the vinta. Arrive 10 minutes early for a good spot.' },
      { time: '7:00 AM', activity: 'Sail to Santa Cruz Island on a vinta', detail: 'A scenic 45–60 minute sail on a traditional Tausug vinta. The colorful sails against the open ocean make for great photos. Your guide will share the history of the island as you sail.' },
      { time: '8:00 AM', activity: 'Arrive at Santa Cruz Island', detail: 'Step onto the pink sand. The color comes from crushed Foraminifera shells (tiny red organisms) mixed with white coral sand. Find a cottage and set up for the day.' },
      { time: '8:00 AM – 12:00 PM', activity: 'Free time on the island', detail: 'Swim in the crystal-clear lagoon. Snorkel over the coral gardens. Float through the stingless jellyfish area — they pulse and drift around you but cannot sting. The 400-visitor limit keeps the beach peaceful even at peak hours.' },
      { time: '12:30 PM', activity: 'Lunch at the island', detail: 'Filipino lunch served under the shade — rice, viand, and fresh buko water. Vegetarian options available, just tell us when booking.' },
      { time: '1:30 PM', activity: 'Last swim & departure prep', detail: 'Final chance to take photos on the pink sand before heading back.' },
      { time: '2:00 PM', activity: 'Speedboat return to Zamboanga', detail: 'Faster return by speedboat. Back at Paseo del Mar by 2:30–3:00 PM.' },
    ],
    whatToBring: [
      'Reef-safe sunscreen only (regular sunscreen harms the coral — prohibited on the island)',
      'Swimwear + extra set of dry clothes',
      'Waterproof camera or phone case',
      'Cash in small bills for extras (GCash also works)',
      'Insect repellent',
      'Dry bag for electronics',
      'Hat and sunglasses',
    ],
    importantNotes: [
      'Only 400 visitors are allowed on Santa Cruz Island per day. Weekends and holidays sell out fast — book at least 3–5 days ahead.',
      'Tour may be rescheduled due to bad weather. Full refund or free reschedule guaranteed.',
      'Reef-safe sunscreen is required — regular sunscreen is prohibited on the island as it harms the coral ecosystem.',
      'Children under 4 are welcome but must wear life jackets on the water at all times.',
      'Permit is required from the City Tourism Office — we handle this for you.',
    ],
  },

  // ── 2. ONCE ISLAS — 11 ISLANDS ───────────────────────────────────────────
  {
    slug: 'once-islas-island-hopping',
    title: 'Once Islas — 11 Islands',
    tagline: 'Eleven islands, one unforgettable day in Zamboanga Bay.',
    description: 'Once Islas (Spanish for "eleven islands") is a chain of 11 small uninhabited islands scattered just off the Zamboanga peninsula. Each island has its own personality: one has dramatic limestone formations, another has the calmest snorkeling reef in the bay, another is nothing but a perfect white sandbar rising from turquoise water. This full-day island hopping tour visits the best of them — with a fresh seafood lunch cooked on the island by the local community. This is one of the most underrated island experiences in the Philippines.',
    duration: 'Full Day · 8–10 hours',
    destination: 'Once Islas, Zamboanga Bay',
    audience: ['barkada', 'couple', 'family', 'solo'],
    category: 'Island',
    groupSize: '4–20 guests',
    departure: 'Paseo del Mar Jetty, 6:30 AM',
    mainImage: P.onceIslas,
    photos: [P.onceIslasSiromon, P.sunset, P.paseoDel],
    highlights: [
      'Visit 4–6 of the 11 islands in one day',
      'Sirommon Island — the best snorkeling reef in the bay',
      'Baung-Baung Island — dramatic limestone sea cliffs',
      'Bisaya-Bisaya Island — untouched white sand beach',
      'Fresh seafood lunch cooked by island community (₱300/person)',
      'Private sandbar experience — no crowds, just your group',
    ],
    inclusions: [
      { text: 'Private speedboat for the group', included: true },
      { text: 'Licensed local boat captain & guide', included: true },
      { text: 'Snorkeling gear & life jackets', included: true },
      { text: 'Fresh seafood lunch grilled on the island (₱300/person community meal)', included: true },
      { text: 'All island entrance fees', included: true },
      { text: 'Bottled water & light refreshments', included: true },
      { text: 'Island cottage/shade (shared)', included: true },
      { text: 'Personal alcoholic drinks', included: false },
      { text: 'Underwater camera rental', included: false },
    ],
    itinerary: [
      { time: '6:30 AM', activity: 'Board at Paseo del Mar', detail: 'Meet your crew at the jetty. Safety briefing and departure.' },
      { time: '7:30 AM', activity: 'Sirommon Island — snorkeling', detail: 'First stop: the best snorkeling in the Once Islas chain. Put on your gear and explore healthy coral formations and schools of tropical fish just a few meters from shore.' },
      { time: '9:30 AM', activity: 'Baung-Baung Island — limestone cliffs', detail: 'Dramatic limestone formations rise from the water. Great for photos and short exploration. Some areas have small sea caves accessible at low tide.' },
      { time: '10:30 AM', activity: 'Bisaya-Bisaya Island — sandbar & swim', detail: 'A pristine sandbar where the water is shallow and impossibly clear. Walk along the sandbar and look down at the sea floor below. Free time for swimming and photos.' },
      { time: '12:00 PM', activity: 'Seafood lunch on the island', detail: 'Fresh fish, squid, and shellfish grilled over open fire by the island community. Rice and local sides included. One of the best meals you\'ll have in Zamboanga.' },
      { time: '1:30 PM', activity: 'Two more island stops', detail: 'Afternoon island hopping continues — more swimming, snorkeling, and exploring depending on weather and tide.' },
      { time: '4:00 PM', activity: 'Return to Zamboanga', detail: 'Speedboat back to Paseo del Mar. Arrive by 5:00 PM.' },
    ],
    whatToBring: [
      'Reef-safe sunscreen',
      'Swimwear + extra clothes',
      'Waterproof bag for electronics',
      'Cash for extra drinks or personal purchases',
      'Seasickness medication if you\'re prone (the bay is generally calm)',
      'Hat and sunglasses',
      'Dry bag for valuables',
    ],
    importantNotes: [
      'Minimum 4 guests for this tour. Solo travelers and pairs can join a shared group — let us know.',
      'Route may change based on weather and sea conditions — always for your safety and comfort.',
      'The ₱300/person community meal is paid directly to the island community (supports local families).',
      'Recommended for ages 5 and above. Young children must wear life jackets at all times on the water.',
    ],
  },

  // ── 3. CITY HERITAGE TOUR ─────────────────────────────────────────────────
  {
    slug: 'zamboanga-city-heritage-tour',
    title: 'Zamboanga City Heritage Tour',
    tagline: 'Forts, mosques, and a city that speaks its own language.',
    description: 'Zamboanga City is unlike anywhere else in the Philippines. It\'s the only city in the world where Chavacano — a Spanish-based creole language — is spoken as a mother tongue. This half-day tour takes you through four centuries of history: a 17th-century Spanish fort still standing on the waterfront, the oldest mosque in Western Mindanao, indigenous Yakan weavers creating intricate fabrics by hand, and the famous Paseo del Mar waterfront promenade. Your DOT-accredited guide will bring each stop to life with stories most guidebooks never tell.',
    duration: 'Half Day · 4–5 hours',
    destination: 'Zamboanga City',
    audience: ['solo', 'couple', 'family'],
    category: 'Culture',
    groupSize: '2–15 guests',
    departure: 'Hotel pickup or Paseo del Mar, 8:00 AM or 1:00 PM',
    mainImage: P.fortPilar,
    photos: [P.basilanChurchInt, P.paseoDel, P.taluksangayMosque],
    highlights: [
      'Fort Pilar — 17th-century Spanish fort, now a national shrine',
      'Yakan Weaving Village — watch master weavers at work',
      'Taluksangay Mosque — oldest mosque in Western Mindanao (1885)',
      'Cawa-Cawa Boulevard — the most scenic drive in the city',
      'Paseo del Mar — Zamboanga\'s iconic waterfront promenade',
      'National Museum Zamboanga — regional history and artifacts',
    ],
    inclusions: [
      { text: 'Air-conditioned vehicle for the group', included: true },
      { text: 'DOT-accredited local guide (English & Chavacano)', included: true },
      { text: 'All entrance fees (Fort Pilar, National Museum)', included: true },
      { text: 'Bottled water', included: true },
      { text: 'Hotel pickup & drop-off (within city center)', included: true },
      { text: 'Meals (food not included — guide can recommend the best spots)', included: false },
      { text: 'Souvenir purchases at Yakan Village', included: false },
    ],
    itinerary: [
      { time: '8:00 AM', activity: 'Hotel pickup', detail: 'Your guide picks you up from your hotel or an agreed meeting point.' },
      { time: '8:30 AM', activity: 'Fort Pilar National Shrine', detail: 'Built by the Spanish in 1635 to defend against Moro raids. One of the oldest existing forts in the Philippines. The fort walls, museum, and Marian shrine tell 400 years of Zamboanga history. Entrance: ₱100 per person.' },
      { time: '9:15 AM', activity: 'National Museum Zamboanga', detail: 'Regional artifacts, Chinese trade pottery, and exhibits on the indigenous peoples of Western Mindanao. Free to enter.' },
      { time: '9:45 AM', activity: 'Yakan Weaving Village', detail: 'The Yakan are one of Zamboanga\'s indigenous groups. Watch master weavers create intricate geometric patterns using traditional backstrap looms — a skill passed down through generations. The vibrant fabrics make beautiful souvenirs.' },
      { time: '10:45 AM', activity: 'Taluksangay Mosque (optional 30-min detour)', detail: 'The oldest mosque in Western Mindanao, built in 1885 — with striking red domes visible from the road. Respectful visitors are welcome. Modest dress required; no entry during prayer times.' },
      { time: '11:30 AM', activity: 'Cawa-Cawa Boulevard & Paseo del Mar', detail: 'The most scenic coastal drive in Zamboanga. Paseo del Mar is the city\'s beautiful waterfront promenade — vintas line the water, the Basilan Strait stretches to the horizon, and the whole scene is uniquely Zamboanga.' },
      { time: '12:30 PM', activity: 'Drop-off', detail: 'Return to your hotel or drop off at a local restaurant. Your guide can recommend where to try Curacha crab — Zamboanga\'s signature dish.' },
    ],
    whatToBring: [
      'Comfortable walking shoes (you\'ll walk some cobblestone)',
      'Light breathable clothing',
      'Modest outfit for mosque visit (long pants/skirt, covered shoulders)',
      'Cash for shopping at the Yakan village',
      'Camera',
      'Sunscreen & hat',
    ],
    importantNotes: [
      'Modest dress is required at Fort Pilar\'s church area and Taluksangay Mosque.',
      'This tour pairs perfectly with the Santa Cruz Island tour — book both for a complete Zamboanga experience.',
      'Available in both AM (8AM) and PM (1PM) departure slots.',
    ],
  },

  // ── 4. MERLOQUET FALLS ECO TOUR ───────────────────────────────────────────
  {
    slug: 'merloquet-falls-eco-tour',
    title: 'Merloquet Falls Eco Tour',
    tagline: 'A curtain of water hidden in the jungle, 50 km from the city.',
    description: 'Merloquet Falls is one of Zamboanga City\'s best-kept secrets. A 10-meter curtain waterfall fed by the jungle streams of Barangay Sibulao, it plunges into a natural swimming basin surrounded by lush rainforest. Getting there is half the adventure — a scenic drive through Zamboanga\'s interior, followed by a 500-meter trail down 370 steps through dense vegetation. The falls are almost completely unknown to outside tourists, which means you\'ll likely have them entirely to yourself. Optional add-on: Taluksangay Mosque on the return journey.',
    duration: 'Full Day · 8–10 hours',
    destination: 'Barangay Sibulao, Zamboanga City',
    audience: ['solo', 'barkada', 'couple'],
    category: 'Adventure',
    groupSize: '2–15 guests',
    departure: 'Hotel pickup, 7:00 AM',
    mainImage: P.merloquet,
    photos: [P.merloquetFalls1, P.merloquetFalls2],
    highlights: [
      '10-meter curtain waterfall with natural swimming basin',
      'Trek through lush primary and secondary rainforest',
      'One of the least-visited natural wonders in Western Mindanao',
      'Wildlife spotting along the 500-meter jungle trail',
      'Optional Taluksangay Mosque stop on the return',
      'Packed lunch eaten riverside — pure jungle atmosphere',
    ],
    inclusions: [
      { text: 'Hotel pickup & drop-off', included: true },
      { text: 'Air-conditioned vehicle (Zamboanga City to trailhead)', included: true },
      { text: 'Local habal-habal (motorcycle) from road to trailhead', included: true },
      { text: 'DOT-accredited guide for the trek', included: true },
      { text: 'Entrance fee (₱20)', included: true },
      { text: 'Packed lunch & light snacks', included: true },
      { text: 'Bottled water', included: true },
      { text: 'Personal expenses & souvenirs', included: false },
      { text: 'Swimwear or trekking gear rental', included: false },
    ],
    itinerary: [
      { time: '7:00 AM', activity: 'Hotel pickup', detail: 'Early start — the falls are about 50+ km from the city center. Your guide picks you up.' },
      { time: '8:30 AM', activity: 'Arrive at trailhead', detail: 'Short habal-habal motorcycle ride from the main road to the trail entrance. Registration and safety briefing.' },
      { time: '9:00 AM', activity: 'Trek to the falls', detail: 'A 500-meter trail descending 370 steps through dense jungle. Moderate fitness required. Your guide will point out interesting plants and wildlife along the way.' },
      { time: '9:30 AM', activity: 'Arrive at Merloquet Falls', detail: 'The sound reaches you before the sight. A 10-meter curtain of water crashes into a natural pool — cool, clear, and swimming-ready.' },
      { time: '9:30 AM – 12:00 PM', activity: 'Swimming & exploration', detail: 'Swim in the natural basin. Explore the base of the falls. Take photos. Relax in one of the most peaceful spots in Zamboanga.' },
      { time: '12:00 PM', activity: 'Packed lunch by the falls', detail: 'Filipino lunch served riverside — rice, viand, and fresh water.' },
      { time: '1:00 PM', activity: 'Trek back up', detail: '370 steps back up. Take your time — the jungle is beautiful in both directions.' },
      { time: '2:00 PM', activity: 'Optional: Taluksangay Mosque', detail: 'On the return drive, stop at the oldest mosque in Western Mindanao (1885 red-domed mosque, 30–45 mins from the city). Modest dress required.' },
      { time: '4:00 PM', activity: 'Return to Zamboanga City', detail: 'Back to your hotel by 4:30–5:00 PM.' },
    ],
    whatToBring: [
      'Swimwear + change of clothes',
      'Closed-toe shoes or trekking sandals (NOT flip flops for the trail)',
      'Waterproof bag for your phone and valuables',
      'Insect repellent',
      'Sunscreen',
      'Light rain jacket (jungle weather can change quickly)',
      'Personal medication if needed',
    ],
    importantNotes: [
      'Moderate fitness required — you\'ll descend and ascend 370 steps on a jungle trail.',
      'Not recommended for guests with knee problems or mobility limitations.',
      'Closed-toe footwear is strongly recommended for the trail — flip flops are not safe.',
      'Taluksangay Mosque stop is optional — add it when booking.',
    ],
  },

  // ── 5. PASEO DEL MAR SUNSET CRUISE ────────────────────────────────────────
  {
    slug: 'paseo-del-mar-sunset-cruise',
    title: 'Paseo del Mar Sunset Cruise',
    tagline: 'The most beautiful hour in Zamboanga, seen from the water.',
    description: 'Every evening in Zamboanga, the sky over the Basilan Strait turns every shade of orange, pink, and violet — and the colorful vintas on the water catch the light in a way that stops you in your tracks. This 3-hour sunset cruise is the most romantic and relaxed experience we offer. You\'ll sail along the Zamboanga coastline on a traditional vinta, watching the sun go down over the sea as the city lights begin to flicker on. Perfect for couples, proposals, anniversaries, or simply anyone who wants to end a Zamboanga day in the most beautiful way possible.',
    duration: 'Evening · 3 hours',
    destination: 'Zamboanga Bay',
    audience: ['couple', 'solo', 'barkada'],
    category: 'Leisure',
    groupSize: '2–12 guests',
    departure: 'Paseo del Mar Jetty, 4:30 PM',
    mainImage: P.sunset,
    photos: [P.vinta, P.paseoDel],
    highlights: [
      'Sail the bay on a traditional Tausug vinta at golden hour',
      'Unobstructed sunset views over the Basilan Strait',
      'See Zamboanga City from the water as the lights come on',
      'Light snacks and refreshments on board',
      'Perfect for couples, proposals, and birthdays',
    ],
    inclusions: [
      { text: 'Private vinta for the group', included: true },
      { text: 'Local guide & experienced vinta crew', included: true },
      { text: 'Fresh fruits, crackers & light snacks', included: true },
      { text: 'Bottled water & soft drinks', included: true },
      { text: 'Life jackets', included: true },
      { text: 'Alcoholic beverages (bring your own)', included: false },
    ],
    itinerary: [
      { time: '4:30 PM', activity: 'Board at Paseo del Mar', detail: 'Meet your crew and guide at the jetty. Snacks and drinks are set up on board.' },
      { time: '5:00 PM', activity: 'Sail along the Zamboanga coastline', detail: 'Cruise along Cawa-Cawa Boulevard from the water — a perspective most visitors never see. Your guide will point out landmarks.' },
      { time: '5:45 PM', activity: 'Golden hour & sunset', detail: 'Position on the bay for the best view of the sunset. This is your golden hour — have your camera ready. The colors over the Basilan Strait are extraordinary.' },
      { time: '6:30 PM', activity: 'Evening sail back', detail: 'The city lights come on as you sail back toward Paseo del Mar. A beautiful end to a Zamboanga day.' },
      { time: '7:30 PM', activity: 'Return to Paseo del Mar', detail: 'Dock at the jetty. Your guide can recommend a nearby restaurant for dinner (curacha crab season runs year-round).' },
    ],
    whatToBring: [
      'Camera — bring your best one for the golden hour light',
      'Light jacket (it gets breezy on the water at sunset)',
      'Your own drinks if you want alcohol on board',
    ],
    importantNotes: [
      'Tour is weather-dependent. If cancelled due to bad weather, full refund or reschedule guaranteed.',
      'For proposals and anniversaries — let us know in advance and we\'ll arrange something special.',
      'Minimum 2 guests. Private bookings welcome.',
    ],
  },

  // ── 6. ZAMBASULTA — 7-DAY JOURNEY ────────────────────────────────────────
  {
    slug: 'zambasulta-complete-tour',
    title: 'ZambaSulta — The Complete Southern Philippines Journey',
    tagline: 'Four provinces. Seven days. One journey through the heart of Muslim Mindanao.',
    description: 'ZambaSulta stands for Zamboanga + Basilan + Sulu + Tawi-Tawi — the four island provinces at the southernmost tip of the Philippines. This is our most ambitious tour: a 7-day journey through one of the most culturally rich and historically significant regions in Southeast Asia. You\'ll visit the oldest mosque in the Philippines (built 1380), dive-quality coral reefs that rival Tubbataha, the sacred mountain of Bongao with views stretching to Borneo, and communities that have maintained their Islamic traditions for over 600 years. This is not a typical tourist trip — it\'s a genuine cultural immersion into a part of the Philippines almost no outsider ever sees.',
    duration: '7 Days · 6 Nights',
    destination: 'Zamboanga · Basilan · Sulu · Tawi-Tawi',
    audience: ['solo', 'barkada'],
    category: 'Multi-day',
    groupSize: '2–12 guests',
    departure: 'Zamboanga City Airport or Paseo del Mar',
    mainImage: P.zambasultaMosque,
    photos: [P.panampangan, P.panampanganPier, P.suluMonument, P.simunulMosque],
    highlights: [
      'Panampangan Island — one of the longest sandbars in the Philippines',
      'Simunul Mosque — the oldest mosque in the Philippines (built 1380)',
      'Bud Bongao — sacred mountain with views stretching to Borneo',
      'Santa Cruz Island pink sand beach (Day 2)',
      'Basilan rubber plantations & Yakan cultural village',
      'Floating villages of the Sama Bajau sea nomads',
      'Pristine Tawi-Tawi reefs — equal to Tubbataha quality',
    ],
    inclusions: [
      { text: 'All inter-island boat and ferry transportation', included: true },
      { text: 'Licensed local guides in each province', included: true },
      { text: 'All accommodation (3-star hotels + guesthouses)', included: true },
      { text: 'All meals (breakfast, lunch, dinner)', included: true },
      { text: 'All entrance fees and permit fees', included: true },
      { text: 'Snorkeling gear & life jackets', included: true },
      { text: 'Island hopping boat rental in Tawi-Tawi', included: true },
      { text: 'Airfare to/from Zamboanga City', included: false },
      { text: 'Travel insurance (strongly recommended)', included: false },
      { text: 'Personal shopping & souvenirs', included: false },
    ],
    dayItinerary: [
      {
        day: 1,
        title: 'Zamboanga City — The Pink Sand Welcome',
        location: 'Zamboanga City',
        highlights: ['Santa Cruz Island pink sand beach', 'Stingless jellyfish lagoon', 'Traditional Tausug vinta', 'Curacha crab dinner'],
        description: 'Your ZambaSulta journey begins in Zamboanga City. After arriving and checking in, head straight to Santa Cruz Island — the only pink sand beach in Asia. Sail there on a traditional Tausug vinta, swim in the stingless jellyfish lagoon, and walk on the National Geographic-famous pink sand. In the evening, settle in over a plate of Curacha — the local red deep-sea crab in Alavar coconut sauce, a dish found nowhere else on Earth.',
      },
      {
        day: 2,
        title: 'Zamboanga City — Forts, Faith, and the Chavacano Soul',
        location: 'Zamboanga City',
        highlights: ['Fort Pilar National Shrine', 'Yakan Weaving Village', 'Taluksangay Mosque', 'Paseo del Mar & Cawa-Cawa Boulevard'],
        description: 'Full heritage day in the city. Morning at Fort Pilar (built 1635 by the Spanish — one of the oldest standing forts in the Philippines) and the National Museum. Then the Yakan Weaving Village, where indigenous master weavers create stunning geometric fabrics on backstrap looms. Afternoon drive to Taluksangay Mosque — the oldest mosque in Western Mindanao, built in 1885, with distinctive red domes. Finish with a sunset walk along Paseo del Mar and Cawa-Cawa Boulevard. Evening: overnight ferry departure to Basilan.',
      },
      {
        day: 3,
        title: 'Basilan — Rubber Trees, Wild Orchids, and Hidden Beaches',
        location: 'Basilan Province · Isabela City',
        highlights: ['Rubber plantation visit', 'Yakan cultural village', 'Malamawi Island white sand beach', 'Isabela City waterfront'],
        description: 'Basilan is the Philippines\' rubber capital — vast green plantations stretch as far as you can see. Visit a working rubber estate and learn how latex is harvested. Then Isabela City\'s waterfront district and a short boat crossing to Malamawi Island — a quiet white sand beach almost nobody outside Basilan knows about. Overnight in Isabela City before the next leg.',
      },
      {
        day: 4,
        title: 'Tawi-Tawi — The Last Frontier Arrives',
        location: 'Bongao, Tawi-Tawi',
        highlights: ['Overnight ferry Basilan → Tawi-Tawi', 'Arrive Bongao', 'Bud Bongao Sacred Mountain', 'Tanduh Beach'],
        description: 'Take the overnight ferry from Isabela City to Bongao, the capital of Tawi-Tawi — the southernmost province of the Philippines, closer to Malaysia than to Manila. After arriving and resting, climb Bud Bongao — a 344-meter sacred mountain. The trail passes through forest home to wild macaque monkeys (they\'re accustomed to visitors). The view from the top stretches to Borneo on clear days. Afternoon at Tanduh Beach — powdery white sand, calm water.',
      },
      {
        day: 5,
        title: 'Tawi-Tawi — Into the Coral Triangle',
        location: 'Tawi-Tawi · Island Hopping',
        highlights: ['Panampangan Island sandbar', 'Simunul Mosque (oldest in the Philippines)', 'Sangay Siapo Island reefs', 'Bajau floating village'],
        description: 'Full-day island hopping in Tawi-Tawi — the edge of the Coral Triangle, the most biodiverse marine region on Earth. First stop: Panampangan Island, one of the longest sandbars in the Philippines — a thin strip of white sand stretching into turquoise water with no permanent residents. Then Simunul Island, home to the oldest mosque in the Philippines (built 1380 by Sheik Karim al Makdum). Snorkel the reefs of Sangay Siapo Island. Pass through a Bajau floating village — homes built on stilts over the water, boats as front yards.',
      },
      {
        day: 6,
        title: 'Tawi-Tawi — Caves, History, and the Last Sunset',
        location: 'Bongao, Tawi-Tawi',
        highlights: ['Boloboc Cave', 'Chinese Pier (historical trading site)', 'Sunset from Bongao', 'Farewell seafood dinner'],
        description: 'Explore Boloboc Cave — a limestone sea cave with geological formations and historical significance to the Sama people. Visit the Chinese Pier, a trading site that dates back centuries when Chinese merchants traded with the Sultanate of Sulu. Afternoon free for souvenir shopping — Tausug brassware, woven malong fabric, and dried seafood are the things to bring home. Farewell dinner with a view of the Tawi-Tawi sunset.',
      },
      {
        day: 7,
        title: 'Return to Zamboanga — Flavors and Farewells',
        location: 'Bongao → Zamboanga City',
        highlights: ['Morning Bongao market', 'Flight or ferry back to Zamboanga', 'Final Curacha lunch', 'Airport transfer'],
        description: 'Morning at the Bongao market — pick up final souvenirs and taste local kakanin (rice cakes). Morning flight or ferry back to Zamboanga City. Arrive for a final lunch of Curacha crab — you\'ll appreciate it even more after seven days in the south. Your guide transfers you to the airport or seaport for your onward journey.',
      },
    ],
    whatToBring: [
      'Valid government ID (required for all inter-island ferry travel)',
      'Modest clothing for all days — cover shoulders and knees at all times in Sulu and Tawi-Tawi',
      'Reef-safe sunscreen',
      'Insect repellent',
      'Light rain jacket (weather changes quickly between islands)',
      'Waterproof bag for electronics and valuables',
      'Cash in small bills — ATMs are very limited in remote areas; bring enough for the full 7 days',
      'Power bank and adaptor',
      'Any personal medications',
      'Small daypack for island excursions',
    ],
    importantNotes: [
      'A valid government-issued ID is mandatory for all inter-island ferry travel.',
      'Modest dress (covered shoulders and knees) is required at all times in Sulu and Tawi-Tawi, and at all mosque sites.',
      'Book at least 2 weeks in advance — logistics require coordination across multiple provinces.',
      'Travel insurance is strongly recommended for this multi-province tour.',
      'The pace and route can be adjusted — tell us your interests when booking.',
      'Maximum group size is 12 for this tour.',
    ],
  },

  // ── 7. BASILAN DAY TRIP ───────────────────────────────────────────────────
  {
    slug: 'basilan-day-trip',
    title: 'Basilan Day Trip',
    tagline: 'The Philippines\' rubber capital — wild, green, and almost entirely unexplored.',
    description: 'Just 7 kilometers across the Basilan Strait from Zamboanga City, Basilan is one of the least-visited provinces in the Philippines — and one of the most fascinating. It\'s the country\'s largest rubber producer, home to the indigenous Yakan people, and blessed with beaches (including one with pink sand from crushed red coral) that remain almost completely off the tourist trail. This day trip gives you a genuine look at a part of the Philippines that most people will never see.',
    duration: 'Full Day · 8–10 hours',
    destination: 'Basilan Province · Isabela City',
    audience: ['solo', 'barkada', 'couple'],
    category: 'Adventure',
    groupSize: '4–15 guests',
    departure: 'Zamboanga City Ferry Terminal, 6:30 AM',
    mainImage: P.basilanAerial,
    photos: [P.basilanChurch, P.basilanChurchInt, P.basilanSign, P.basilanMountain],
    highlights: [
      'Malamawi Island — quiet white sand beach, almost no tourists',
      'Working rubber plantation — see how latex is harvested',
      'Yakan cultural village — live backstrap weaving demonstrations',
      'Isabela City coastal boulevard and historic district',
      'One of the most authentic off-the-beaten-path experiences in Mindanao',
    ],
    inclusions: [
      { text: 'Round-trip ro-ro ferry tickets Zamboanga ↔ Basilan (PHP 90/person)', included: true },
      { text: 'Private vehicle on Basilan', included: true },
      { text: 'DOT-licensed local guide (English & Chavacano)', included: true },
      { text: 'All entrance fees', included: true },
      { text: 'Lunch at a local restaurant in Isabela City', included: true },
      { text: 'Short boat crossing to Malamawi Island (PHP 10/person)', included: true },
      { text: 'Bottled water', included: true },
      { text: 'Personal souvenir purchases', included: false },
    ],
    itinerary: [
      { time: '6:30 AM', activity: 'Board ferry at Zamboanga City Port', detail: 'Ro-ro ferry to Isabela City, Basilan. Journey takes approximately 1–2 hours. Enjoy the strait views.' },
      { time: '8:30 AM', activity: 'Arrive Isabela City — city walk', detail: 'Your guide meets you at the pier. Walk through Isabela City\'s historic district: the Cathedral, Plaza Rizal, and the James Walter Strong Boulevard along the waterfront.' },
      { time: '10:00 AM', activity: 'Rubber plantation', detail: 'Drive out to a working rubber plantation — one of many that make Basilan the Philippines\' largest rubber producer. See how latex is tapped from the trees and collected.' },
      { time: '11:00 AM', activity: 'Yakan cultural village', detail: 'The Yakan are Basilan\'s indigenous people, known for their extraordinary hand-woven textiles. Watch weavers at their backstrap looms and learn about patterns that tell family stories.' },
      { time: '12:00 PM', activity: 'Lunch in Isabela City', detail: 'Fresh seafood lunch at a local restaurant. Try grilled tuna or sinigang — Basilan seafood is exceptional.' },
      { time: '1:30 PM', activity: 'Malamawi Island', detail: 'Short 5-minute boat crossing (PHP 10) to Malamawi Island. A peaceful white sand beach with calm, clear water — popular with locals, almost unknown to tourists. Good for swimming and snorkeling.' },
      { time: '4:00 PM', activity: 'Return ferry to Zamboanga', detail: 'Board the afternoon ferry back to Zamboanga City. Arrive by 6:00 PM.' },
    ],
    whatToBring: [
      'Valid government ID (required for the ferry)',
      'Comfortable closed-toe shoes for the plantation walk',
      'Swimwear for Malamawi Island',
      'Cash in small bills',
      'Insect repellent',
      'Camera',
      'Light jacket for the ferry crossing',
    ],
    importantNotes: [
      'A valid government-issued ID is required for the ro-ro ferry to Basilan.',
      'Minimum group of 4 guests. Book at least 5 days in advance.',
      'This tour is suitable for Filipino citizens and foreign tourists with valid visas.',
    ],
  },

]

// ─── HELPERS ─────────────────────────────────────────────────────────────────

export function getTourBySlug(slug: string): TourData | undefined {
  return TOURS_DATA.find(t => t.slug === slug)
}

export function getSimilarTours(slug: string, count = 3): TourData[] {
  const tour = getTourBySlug(slug)
  if (!tour) return TOURS_DATA.slice(0, count)
  return TOURS_DATA
    .filter(t => t.slug !== slug)
    .filter(t => t.audience.some(a => tour.audience.includes(a)))
    .slice(0, count)
}
