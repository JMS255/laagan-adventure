import type { MetadataRoute } from 'next'
import { client } from '@/lib/sanity'

const BASE = 'https://laagan-adventure.vercel.app'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [tours, posts] = await Promise.all([
    client.fetch(`*[_type == "tour"]{ "slug": slug.current, _updatedAt }`).catch(() => []),
    client.fetch(`*[_type == "blogPost"]{ "slug": slug.current, publishedAt }`).catch(() => []),
  ])

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,                 lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/tours`,      lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/blog`,       lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/about`,      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/gallery`,    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/contact`,    lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.5 },
  ]

  const tourRoutes: MetadataRoute.Sitemap = tours.map((t: { slug: string; _updatedAt: string }) => ({
    url: `${BASE}/tours/${t.slug}`,
    lastModified: t._updatedAt ? new Date(t._updatedAt) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.85,
  }))

  const blogRoutes: MetadataRoute.Sitemap = posts.map((p: { slug: string; publishedAt: string }) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: p.publishedAt ? new Date(p.publishedAt) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...tourRoutes, ...blogRoutes]
}
