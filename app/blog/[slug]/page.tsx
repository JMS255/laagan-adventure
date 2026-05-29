import Link from 'next/link'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { client, urlFor, BLOG_POST_QUERY, BLOG_QUERY } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  const posts = await client.fetch(BLOG_QUERY).catch(() => [])
  return posts.map((p: { slug: { current: string } }) => ({ slug: p.slug.current }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await client.fetch(BLOG_POST_QUERY, { slug }).catch(() => null)
  if (!post) return {}
  return { title: post.title, description: post.excerpt }
}

const ptComponents = {
  types: {
    image: ({ value }: { value: object }) => (
      <div style={{ margin: '32px 0', borderRadius: 'var(--rl)', overflow: 'hidden' }}>
        <img src={urlFor(value).width(800).url()} alt="" style={{ width: '100%', display: 'block' }} />
      </div>
    ),
  },
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await client.fetch(BLOG_POST_QUERY, { slug }).catch(() => null)
  if (!post) notFound()

  return (
    <>
      <Nav />
      <main style={{ paddingTop: 'var(--nav-h)' }}>

        {/* Header */}
        <div style={{ borderBottom: '1px solid var(--border)', padding: '56px 0 48px' }}>
          <div className="container" style={{ maxWidth: '720px' }}>
            <Link href="/blog" style={{ fontSize: '.78rem', fontWeight: 600, color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '28px', textDecoration: 'none' }}>
              ← All posts
            </Link>
            {post.tags?.length > 0 && (
              <div style={{ display: 'flex', gap: '6px', marginBottom: '16px' }}>
                {post.tags.map((tag: string) => (
                  <span key={tag} style={{ fontSize: '.65rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--pink)', background: 'rgba(217,107,138,.1)', padding: '4px 12px', borderRadius: '999px' }}>{tag}</span>
                ))}
              </div>
            )}
            <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, letterSpacing: '-.03em', color: 'var(--navy)', lineHeight: 1.15, marginBottom: '16px' }}>
              {post.title}
            </h1>
            {post.excerpt && (
              <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>{post.excerpt}</p>
            )}
            {post.publishedAt && (
              <p style={{ fontSize: '.75rem', color: 'var(--text-muted)', marginTop: '16px' }}>
                {new Date(post.publishedAt).toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            )}
          </div>
        </div>

        {/* Cover Image */}
        {post.mainImage && (
          <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 32px' }}>
            <div style={{ marginTop: '40px', borderRadius: 'var(--rl)', overflow: 'hidden', aspectRatio: '16/9' }}>
              <img src={urlFor(post.mainImage).width(800).height(450).url()} alt={post.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="container" style={{ maxWidth: '720px', padding: '48px 32px 96px' }}>
          <div style={{ fontSize: '1rem', lineHeight: 1.85, color: 'var(--text-muted)' }}>
            {post.body && <PortableText value={post.body} components={ptComponents} />}
          </div>

          {/* CTA */}
          <div style={{ marginTop: '64px', padding: '32px', background: 'var(--navy)', borderRadius: 'var(--rl)', textAlign: 'center' }}>
            <p style={{ fontWeight: 700, color: '#fff', marginBottom: '8px', fontSize: '1.05rem' }}>Ready to experience this yourself?</p>
            <p style={{ color: 'rgba(255,255,255,.7)', fontSize: '.88rem', marginBottom: '20px' }}>Book a tour with Laagan Adventure and see Zamboanga City for real.</p>
            <Link href="/contact" className="btn btn--primary">Book a Tour →</Link>
          </div>

          <div style={{ marginTop: '32px', textAlign: 'center' }}>
            <Link href="/blog" style={{ fontSize: '.82rem', fontWeight: 600, color: 'var(--text-muted)', textDecoration: 'none' }}>← Back to all posts</Link>
          </div>
        </div>

      </main>
      <Footer />
    </>
  )
}
