import type { MetadataRoute } from 'next'
import { DESTINATIONS } from '@/lib/destinations'
import { TOURS_DATA } from '@/lib/tours-data'

const BASE = 'https://laaganadventure.com'

// Every public page, so search engines can find all of them.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,              lastModified, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/tours`,   lastModified, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/about`,   lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/gallery`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/contact`, lastModified, changeFrequency: 'yearly',  priority: 0.5 },
  ]
  const tourRoutes: MetadataRoute.Sitemap = TOURS_DATA.map(t => ({
    url: `${BASE}/tours/${t.slug}`, lastModified, changeFrequency: 'monthly', priority: 0.85,
  }))
  const destinationRoutes: MetadataRoute.Sitemap = DESTINATIONS.map(d => ({
    url: `${BASE}/destinations/${d.slug}`, lastModified, changeFrequency: 'monthly', priority: 0.75,
  }))

  return [...staticRoutes, ...tourRoutes, ...destinationRoutes]
}
