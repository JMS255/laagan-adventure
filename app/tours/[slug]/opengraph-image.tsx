import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { client, urlFor } from '@/lib/sanity'

export const alt = 'Laagan Adventure Tour'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const [tour, fontRegular, fontBold, logoData] = await Promise.all([
    client.fetch(`*[_type == "tour" && slug.current == $slug][0]{ title, tagline, destination, mainImage }`, { slug }).catch(() => null),
    readFile(join(process.cwd(), 'public/fonts/Inter-Regular.ttf')).catch(() => null),
    readFile(join(process.cwd(), 'public/fonts/Inter-Bold.ttf')).catch(() => null),
    readFile(join(process.cwd(), 'public/logo.jpg')).then(b => `data:image/jpeg;base64,${b.toString('base64')}`).catch(() => null),
  ])

  const fonts = [
    fontRegular && { name: 'Inter', data: fontRegular.buffer as ArrayBuffer, weight: 400 as const, style: 'normal' as const },
    fontBold    && { name: 'Inter', data: fontBold.buffer    as ArrayBuffer, weight: 700 as const, style: 'normal' as const },
  ].filter(Boolean) as { name: string; data: ArrayBuffer; weight: 400 | 700; style: 'normal' }[]

  const tourTitle   = tour?.title       ?? 'Laagan Adventure Tour'
  const tourTagline = tour?.tagline     ?? 'Your trusted local guide in Zamboanga City.'
  const destination = tour?.destination ?? 'Zamboanga City'
  const tourImgUrl  = tour?.mainImage   ? urlFor(tour.mainImage).width(500).height(630).fit('crop').url() : null

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%',
          display: 'flex',
          background: '#004e64',
          fontFamily: 'Inter, sans-serif',
          overflow: 'hidden',
        }}
      >
        {/* Left content panel */}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '64px 56px', justifyContent: 'space-between' }}>

          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {logoData && (
              <img src={logoData} width={48} height={48} style={{ borderRadius: '8px', objectFit: 'cover' }} />
            )}
            <span style={{ fontSize: '18px', fontWeight: 700, color: 'rgba(255,255,255,0.8)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Laagan Adventure
            </span>
          </div>

          {/* Tour content */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Destination pill */}
            <div style={{ display: 'flex', marginBottom: '20px' }}>
              <div style={{ display: 'flex', background: 'rgba(217,107,138,0.2)', border: '1px solid rgba(217,107,138,0.5)', borderRadius: '999px', padding: '6px 16px' }}>
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#d96b8a', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  📍 {destination}
                </span>
              </div>
            </div>

            <p style={{ fontSize: '52px', fontWeight: 700, color: '#ffffff', lineHeight: 1.1, margin: '0 0 16px', letterSpacing: '-0.02em' }}>
              {tourTitle}
            </p>
            <p style={{ fontSize: '20px', fontWeight: 400, color: 'rgba(255,255,255,0.65)', margin: 0, lineHeight: 1.5 }}>
              {tourTagline}
            </p>
          </div>

          {/* Bottom CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ display: 'flex', width: '40px', height: '3px', background: '#d96b8a', borderRadius: '2px' }} />
            <span style={{ fontSize: '15px', fontWeight: 400, color: 'rgba(255,255,255,0.5)' }}>
              laagan-adventure.vercel.app
            </span>
          </div>
        </div>

        {/* Right image panel */}
        {tourImgUrl ? (
          <div style={{ display: 'flex', width: '380px', position: 'relative', overflow: 'hidden' }}>
            <img src={tourImgUrl} width={380} height={630} style={{ objectFit: 'cover' }} />
            {/* Gradient overlay blending into left panel */}
            <div style={{
              display: 'flex', position: 'absolute', inset: 0,
              background: 'linear-gradient(to right, #004e64 0%, transparent 40%)',
            }} />
          </div>
        ) : (
          <div style={{ display: 'flex', width: '380px', background: 'rgba(255,255,255,0.05)', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '80px' }}>🌊</span>
          </div>
        )}
      </div>
    ),
    { ...size, fonts }
  )
}
