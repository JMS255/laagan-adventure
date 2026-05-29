import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { client, urlFor } from '@/lib/sanity'

export const alt = 'Laagan Adventure Blog'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const [post, fontRegular, fontBold, logoData] = await Promise.all([
    client.fetch(`*[_type == "blogPost" && slug.current == $slug][0]{ title, excerpt, tags, mainImage }`, { slug }).catch(() => null),
    readFile(join(process.cwd(), 'public/fonts/Inter-Regular.ttf')).catch(() => null),
    readFile(join(process.cwd(), 'public/fonts/Inter-Bold.ttf')).catch(() => null),
    readFile(join(process.cwd(), 'public/logo.jpg')).then(b => `data:image/jpeg;base64,${b.toString('base64')}`).catch(() => null),
  ])

  const fonts = [
    fontRegular && { name: 'Inter', data: fontRegular.buffer as ArrayBuffer, weight: 400 as const, style: 'normal' as const },
    fontBold    && { name: 'Inter', data: fontBold.buffer    as ArrayBuffer, weight: 700 as const, style: 'normal' as const },
  ].filter(Boolean) as { name: string; data: ArrayBuffer; weight: 400 | 700; style: 'normal' }[]

  const postTitle   = post?.title   ?? 'Laagan Adventure Blog'
  const postExcerpt = post?.excerpt ?? 'Travel guides and stories from Zamboanga City.'
  const firstTag    = post?.tags?.[0] ?? 'Travel Guide'
  const postImgUrl  = post?.mainImage ? urlFor(post.mainImage).width(500).height(630).fit('crop').url() : null

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%',
          display: 'flex',
          background: '#003347',
          fontFamily: 'Inter, sans-serif',
          overflow: 'hidden',
        }}
      >
        {/* Left content panel */}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '64px 56px', justifyContent: 'space-between' }}>

          {/* Logo + blog label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {logoData && (
              <img src={logoData} width={48} height={48} style={{ borderRadius: '8px', objectFit: 'cover' }} />
            )}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '16px', fontWeight: 700, color: 'rgba(255,255,255,0.8)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Laagan Adventure
              </span>
              <span style={{ fontSize: '13px', fontWeight: 400, color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>
                Travel Blog
              </span>
            </div>
          </div>

          {/* Post content */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', marginBottom: '20px' }}>
              <div style={{ display: 'flex', background: 'rgba(217,107,138,0.2)', border: '1px solid rgba(217,107,138,0.5)', borderRadius: '999px', padding: '6px 16px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#d96b8a', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  {firstTag}
                </span>
              </div>
            </div>

            <p style={{ fontSize: '48px', fontWeight: 700, color: '#ffffff', lineHeight: 1.15, margin: '0 0 16px', letterSpacing: '-0.02em' }}>
              {postTitle}
            </p>
            {postExcerpt && (
              <p style={{ fontSize: '18px', fontWeight: 400, color: 'rgba(255,255,255,0.6)', margin: 0, lineHeight: 1.55 }}>
                {postExcerpt.length > 120 ? postExcerpt.slice(0, 117) + '…' : postExcerpt}
              </p>
            )}
          </div>

          {/* Bottom */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ display: 'flex', width: '40px', height: '3px', background: '#d96b8a', borderRadius: '2px' }} />
            <span style={{ fontSize: '15px', fontWeight: 400, color: 'rgba(255,255,255,0.4)' }}>
              laagan-adventure.vercel.app/blog
            </span>
          </div>
        </div>

        {/* Right image panel */}
        {postImgUrl ? (
          <div style={{ display: 'flex', width: '380px', position: 'relative', overflow: 'hidden' }}>
            <img src={postImgUrl} width={380} height={630} style={{ objectFit: 'cover' }} />
            <div style={{
              display: 'flex', position: 'absolute', inset: 0,
              background: 'linear-gradient(to right, #003347 0%, transparent 40%)',
            }} />
          </div>
        ) : (
          <div style={{ display: 'flex', width: '380px', background: 'rgba(255,255,255,0.04)', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '80px' }}>✍️</span>
          </div>
        )}
      </div>
    ),
    { ...size, fonts }
  )
}
