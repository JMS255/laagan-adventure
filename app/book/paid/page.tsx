import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export default async function PaidPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string; failed?: string }>
}) {
  const { ref, failed } = await searchParams

  if (failed) {
    return (
      <>
        <Nav />
        <main style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: 'var(--bg-2)' }}>
          <div className="container" style={{ padding: '80px 32px', maxWidth: '560px', textAlign: 'center' }}>
            <p style={{ fontSize: '3rem', marginBottom: '16px' }}>😔</p>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '12px' }}>
              Payment not completed
            </h1>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '32px' }}>
              Your booking request <strong style={{ color: 'var(--navy)', fontFamily: 'monospace' }}>{ref}</strong> is still saved. Message us on Messenger and we&apos;ll help you complete the deposit.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://m.me/61562040673545" target="_blank" rel="noopener noreferrer" className="btn btn--primary" style={{ borderRadius: '10px', fontFamily: 'inherit' }}>
                💬 Message Us
              </a>
              <Link href="/tours" className="btn btn--outline" style={{ borderRadius: '10px' }}>
                Back to Tours
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Nav />
      <main style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: 'var(--bg-2)' }}>
        <div className="container" style={{ padding: '80px 32px', maxWidth: '560px', textAlign: 'center' }}>
          <p style={{ fontSize: '3rem', marginBottom: '16px' }}>✅</p>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--navy)', letterSpacing: '-.02em', marginBottom: '12px' }}>
            Deposit received!
          </h1>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '8px' }}>
            Your slot is now <strong style={{ color: '#16a34a' }}>confirmed</strong>. We&apos;ll message you within 24 hours with full trip details.
          </p>
          {ref && (
            <p style={{ fontSize: '.85rem', color: 'var(--text-muted)', marginBottom: '32px' }}>
              Reference: <strong style={{ color: 'var(--navy)', fontFamily: 'monospace' }}>{ref}</strong>
            </p>
          )}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://m.me/61562040673545" target="_blank" rel="noopener noreferrer" className="btn btn--primary" style={{ borderRadius: '10px', fontFamily: 'inherit' }}>
              💬 Say hi on Messenger
            </a>
            <Link href="/tours" className="btn btn--outline" style={{ borderRadius: '10px' }}>
              Browse More Tours
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
