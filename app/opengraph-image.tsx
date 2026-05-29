import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const alt = 'Laagan Adventure — Tour Services in Zamboanga City'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const [fontRegular, fontBold, logoData] = await Promise.all([
    readFile(join(process.cwd(), 'public/fonts/Inter-Regular.ttf')).catch(() => null),
    readFile(join(process.cwd(), 'public/fonts/Inter-Bold.ttf')).catch(() => null),
    readFile(join(process.cwd(), 'public/logo.jpg')).then(b => `data:image/jpeg;base64,${b.toString('base64')}`).catch(() => null),
  ])

  const fonts = [
    fontRegular && { name: 'Inter', data: fontRegular.buffer as ArrayBuffer, weight: 400 as const, style: 'normal' as const },
    fontBold    && { name: 'Inter', data: fontBold.buffer    as ArrayBuffer, weight: 700 as const, style: 'normal' as const },
  ].filter(Boolean) as { name: string; data: ArrayBuffer; weight: 400 | 700; style: 'normal' }[]

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%',
          display: 'flex', flexDirection: 'column',
          background: '#004e64',
          padding: '72px 80px',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        {/* Top accent line */}
        <div style={{ display: 'flex', width: '60px', height: '4px', background: '#d96b8a', borderRadius: '2px', marginBottom: '48px' }} />

        {/* Logo + wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '48px' }}>
          {logoData && (
            <img src={logoData} width={72} height={72} style={{ borderRadius: '12px', objectFit: 'cover' }} />
          )}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '28px', fontWeight: 700, color: '#ffffff', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Laagan Adventure
            </span>
            <span style={{ fontSize: '16px', fontWeight: 400, color: 'rgba(255,255,255,0.55)', marginTop: '4px' }}>
              Zamboanga City, Philippines
            </span>
          </div>
        </div>

        {/* Main headline */}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center' }}>
          <p style={{ fontSize: '64px', fontWeight: 700, color: '#ffffff', lineHeight: 1.1, margin: 0, letterSpacing: '-0.02em' }}>
            Explore Zamboanga
          </p>
          <p style={{ fontSize: '64px', fontWeight: 700, color: '#d96b8a', lineHeight: 1.1, margin: 0, letterSpacing: '-0.02em' }}>
            Like a Local.
          </p>
          <p style={{ fontSize: '24px', fontWeight: 400, color: 'rgba(255,255,255,0.7)', marginTop: '24px' }}>
            Santa Cruz Island tours, island hopping, city tours &amp; more.
          </p>
        </div>

        {/* Bottom badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', background: 'rgba(217,107,138,0.2)', border: '1px solid rgba(217,107,138,0.4)', borderRadius: '999px', padding: '8px 20px' }}>
            <span style={{ fontSize: '16px', fontWeight: 700, color: '#d96b8a' }}>DTI Registered · BIR Official Receipts</span>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts }
  )
}
