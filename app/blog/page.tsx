import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { client, urlFor, BLOG_QUERY } from '@/lib/sanity'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Travel Blog',
  description: 'Travel guides and stories from Zamboanga City. Discover the best destinations, tips, and hidden gems.',
}

export default async function BlogPage() {
  const posts = await client.fetch(BLOG_QUERY).catch(() => [])

  return (
    <>
      <Nav />
      <main style={{ paddingTop: 'var(--nav-h)' }}>

        {/* Header */}
        <div style={{ background: 'var(--navy)', padding: '64px 0 56px' }}>
          <div className="container">
            <p className="section__label">Travel Blog</p>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#fff', letterSpacing: '-.03em', marginBottom: '12px' }}>
              Stories from Zamboanga
            </h1>
            <p style={{ color: 'rgba(255,255,255,.7)', fontSize: '1rem', lineHeight: 1.7, maxWidth: '520px' }}>
              Travel guides, tips, and stories to help you plan the perfect Zamboanga City adventure.
            </p>
          </div>
        </div>

        <section className="section">
          <div className="container" style={{ maxWidth: '860px' }}>
            {posts.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                {posts.map((post: {
                  _id: string; title: string; slug: { current: string };
                  excerpt: string; mainImage: object; publishedAt: string; tags: string[]
                }) => (
                  <article key={post._id} style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '32px', alignItems: 'center', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--rl)', overflow: 'hidden' }}>
                    <div style={{ aspectRatio: '4/3', background: 'var(--bg-2)', overflow: 'hidden' }}>
                      {post.mainImage && (
                        <img src={urlFor(post.mainImage).width(400).height(300).url()} alt={post.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      )}
                    </div>
                    <div style={{ padding: '28px 28px 28px 0' }}>
                      {post.tags?.length > 0 && (
                        <div style={{ display: 'flex', gap: '6px', marginBottom: '12px', flexWrap: 'wrap' }}>
                          {post.tags.map((tag: string) => (
                            <span key={tag} style={{ fontSize: '.65rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--gold)', background: 'rgba(245,166,35,.1)', padding: '3px 10px', borderRadius: '999px' }}>{tag}</span>
                          ))}
                        </div>
                      )}
                      <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '10px', lineHeight: 1.3 }}>
                        <Link href={`/blog/${post.slug.current}`} style={{ textDecoration: 'none', color: 'inherit' }}>{post.title}</Link>
                      </h2>
                      {post.excerpt && (
                        <p style={{ fontSize: '.85rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '16px' }}>{post.excerpt}</p>
                      )}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        {post.publishedAt && (
                          <span style={{ fontSize: '.72rem', color: 'var(--text-muted)' }}>
                            {new Date(post.publishedAt).toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' })}
                          </span>
                        )}
                        <Link href={`/blog/${post.slug.current}`} style={{ fontSize: '.8rem', fontWeight: 700, color: 'var(--gold)', textDecoration: 'none' }}>Read more →</Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '96px', background: 'var(--bg-2)', borderRadius: 'var(--rl)', border: '1px solid var(--border)' }}>
                <p style={{ fontSize: '3rem', marginBottom: '16px' }}>✍️</p>
                <p style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '1.1rem', marginBottom: '8px' }}>Blog posts coming soon</p>
                <p style={{ color: 'var(--text-muted)' }}>Write your first post in the Sanity studio at /studio</p>
              </div>
            )}
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
