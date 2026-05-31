export interface Spot {
  id: string
  name: string
  desc: string
  icon: string
  defaultOn: boolean
}

export const ZAMBOANGA_SPOTS: Spot[] = [
  { id: 'sadik-mosque',     name: 'Sadik Grand Mosque',                  icon: '🕌', desc: 'One of the most beautiful mosques in Mindanao.',         defaultOn: true  },
  { id: 'pasonanca-museum', name: 'Pasonanca City Museum',               icon: '🏛️', desc: "Zamboanga's history and heritage in one place.",         defaultOn: true  },
  { id: 'boyscout-park',    name: 'Pasonanca Boy Scout Park',            icon: '🌳', desc: 'Forested park and recreation area in the city.',         defaultOn: true  },
  { id: 'treehouse',        name: 'Pasonanca Old Tree House',            icon: '🏡', desc: 'A heritage treehouse deep in Pasonanca park.',           defaultOn: true  },
  { id: 'rainbow-mosque',   name: 'Rainbow Mosque',                      icon: '🌈', desc: 'Iconic colourful mosque right on the waterfront.',       defaultOn: true  },
  { id: 'yakan-village',    name: 'Yakan Weaving Village',               icon: '🧶', desc: 'Watch traditional Yakan cloth woven by hand.',           defaultOn: false },
  { id: 'fort-pilar',       name: 'Fort Pilar Shrine & National Museum', icon: '🏰', desc: '17th-century Spanish fort, shrine, and museum.',         defaultOn: true  },
  { id: 'paseo-del-mar',    name: 'Paseo Del Mar',                       icon: '🌊', desc: "Zamboanga's beautiful waterfront promenade.",            defaultOn: true  },
]

// Fallback pricing — override via Sanity Studio (siteConfig document)
export const PRICING_FALLBACK = {
  small: { label: '2–5 pax', price: 3500 },
  large: { label: '6+ pax',  price: 4500 },
}

export type Pricing = typeof PRICING_FALLBACK
