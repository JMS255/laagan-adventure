import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/studio/', '/book/'],
    },
    sitemap: 'https://laagan-adventure.vercel.app/sitemap.xml',
  }
}
