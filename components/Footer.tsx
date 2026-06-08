import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <div className="footer__brand-logo">
              <svg width={38} height={38} viewBox="7 7 96 96" fill="none">
                <defs>
                  <clipPath id="ft-c"><circle cx="55" cy="55" r="48"/></clipPath>
                  <linearGradient id="ft-sky" x1="55" y1="7" x2="55" y2="55" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#1a3d52"/><stop offset="100%" stopColor="#004e64"/>
                  </linearGradient>
                  <linearGradient id="ft-sea" x1="55" y1="55" x2="55" y2="103" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#004e64"/><stop offset="100%" stopColor="#001e2c"/>
                  </linearGradient>
                  <linearGradient id="ft-sun" x1="55" y1="26" x2="55" y2="55" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#ea8ba0"/><stop offset="100%" stopColor="#c95878"/>
                  </linearGradient>
                </defs>
                <path d="M7 55 A48 48 0 0 1 103 55 Z" fill="url(#ft-sky)" clipPath="url(#ft-c)"/>
                <path d="M7 55 L7 103 A48 48 0 0 0 103 103 L103 55 Z" fill="url(#ft-sea)" clipPath="url(#ft-c)"/>
                <path d="M21 55 A34 34 0 0 1 89 55 Z" fill="url(#ft-sun)" clipPath="url(#ft-c)"/>
                <path d="M7 63 Q27 57 47 63 Q67 69 87 63 Q95 61 103 63" stroke="white" strokeWidth=".8" fill="none" opacity=".18" clipPath="url(#ft-c)"/>
                <path d="M33,55 Q37,59 55,58 Q73,59 77,55 Q73,52 55,53 Q37,52 33,55 Z" fill="white" strokeWidth=".8" clipPath="url(#ft-c)"/>
                <line x1="51" y1="54" x2="49" y2="27" stroke="white" strokeWidth="1.8" strokeLinecap="round" clipPath="url(#ft-c)"/>
                <path d="M49,28 L51,54 L74,42 Z" fill="white" clipPath="url(#ft-c)"/>
                <path d="M49,42 L51,54 L60,49 Z" fill="rgba(255,255,255,0.5)" clipPath="url(#ft-c)"/>
                <line x1="44" y1="55" x2="34" y2="59" stroke="white" strokeWidth="1.2" strokeLinecap="round" clipPath="url(#ft-c)"/>
                <path d="M31,58 Q34,61 37,58 Q34,57 31,58 Z" fill="white" clipPath="url(#ft-c)"/>
                <circle cx="55" cy="55" r="48" stroke="rgba(232,213,218,0.3)" strokeWidth="1.5" fill="none"/>
              </svg>
              <div>
                <div className="footer__brand-name">Laagan <span style={{ color: '#d96b8a' }}>PH</span></div>
                <div style={{ fontSize: '.6rem', fontWeight: 700, letterSpacing: '.08em', color: 'rgba(255,255,255,.35)', textTransform: 'uppercase' }}>Since 2024</div>
              </div>
            </div>
            <p className="footer__brand-desc">Local guides. Authentic experiences. Zamboanga City&apos;s most trusted island tour operator since 2024.</p>
            <div className="footer__social">
              <a href="https://www.facebook.com/profile.php?id=61562040673545" target="_blank" rel="noopener noreferrer" className="footer__social-link">FB</a>
              <a href="#" className="footer__social-link">IG</a>
              <a href="#" className="footer__social-link">TT</a>
            </div>
          </div>
          <div>
            <div className="footer__col-title">Our Tours</div>
            <div className="footer__links">
              <Link href="/tours/santa-cruz-island-tour">Santa Cruz Island</Link>
              <Link href="/tours">Island Hopping</Link>
              <Link href="/tours">City Heritage</Link>
              <Link href="/tours">ZambaSulta Tour</Link>
              <Link href="/tours">View All Tours →</Link>
            </div>
          </div>
          <div>
            <div className="footer__col-title">Company</div>
            <div className="footer__links">
              <Link href="/about">About</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/gallery">Gallery</Link>
            </div>
          </div>
          <div>
            <div className="footer__col-title">Contact</div>
            <div className="footer__links">
              <a href="tel:09052435196">📞 0905-243-5196</a>
              <a href="https://m.me/61562040673545" target="_blank" rel="noopener noreferrer">💬 Messenger</a>
              <a href="https://wa.me/639052435196" target="_blank" rel="noopener noreferrer">📱 WhatsApp</a>
              <a href="mailto:hello@laaganadventure.com">✉️ Email</a>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© 2024 Laagan PH · DTI Registered · BIR Compliant</span>
          <span style={{ color: 'rgba(255,255,255,.4)' }}>Zamboanga City, Philippines</span>
        </div>
      </div>
    </footer>
  )
}
