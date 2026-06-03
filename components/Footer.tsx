import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <div className="footer__brand-name">Laagan Adventures</div>
            <p className="footer__brand-desc">Local guides. Authentic experiences. Zamboanga City&apos;s most trusted island tour operator since 2022.</p>
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
              <Link href="/about">About James &amp; Ivy</Link>
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
          <span>© 2026 Laagan Adventures · DTI Registered · BIR Compliant</span>
          <span style={{ color: 'rgba(255,255,255,.4)' }}>Zamboanga City, Philippines</span>
        </div>
      </div>
    </footer>
  )
}
