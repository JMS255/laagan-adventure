import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <p className="footer__brand-name">Laagan Adventure</p>
            <p className="footer__brand-desc">
              Your trusted local guide to the best of Zamboanga City. We show you the real Zamboanga — the hidden beaches, the culture, and the people.
            </p>
            <div style={{ marginTop: '20px', display: 'flex', gap: '12px' }}>
              <a href="https://www.facebook.com/profile.php?id=61562040673545" target="_blank" rel="noopener noreferrer"
                style={{ fontSize: '.78rem', color: 'rgba(255,255,255,.6)', textDecoration: 'none' }}>
                Facebook →
              </a>
            </div>
          </div>
          <div>
            <p className="footer__heading">Navigation</p>
            <div className="footer__links">
              <Link href="/tours">Tours & Packages</Link>
              <Link href="/gallery">Gallery</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/about">About Us</Link>
              <Link href="/contact">Book Now</Link>
            </div>
          </div>
          <div>
            <p className="footer__heading">Contact</p>
            <div className="footer__links">
              <a href="tel:09052435196">0905-243-5196</a>
              <a href="tel:09269048927">0926-904-8927</a>
              <a href="mailto:ivyeisma255@gmail.com">ivyeisma255@gmail.com</a>
              <span>Baliwasan, Zamboanga City</span>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© 2026 Laagan Adventure. All rights reserved.</span>
          <span>Built by <a href="https://craftifyle.business" style={{ color: 'rgba(255,255,255,.5)' }}>Craftifyle</a></span>
        </div>
      </div>
    </footer>
  )
}
