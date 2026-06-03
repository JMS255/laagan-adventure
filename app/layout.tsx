import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { BookingProvider } from '@/lib/booking-context'
import BookingDrawer from '@/components/BookingDrawer'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-display', style: ['normal', 'italic'], display: 'swap' })

export const metadata: Metadata = {
  title: {
    default: 'Laagan Adventure — Tour Services in Zamboanga City',
    template: '%s | Laagan Adventure',
  },
  description: 'Explore Zamboanga City with a trusted local guide. Santa Cruz Island, city tours, island hopping, and more. Book your adventure today.',
  keywords: ['tour Zamboanga City', 'Santa Cruz Island tour', 'Zamboanga tour package', 'island hopping Zamboanga', 'Laagan Adventure'],
  metadataBase: new URL('https://laagan-adventure.vercel.app'),
  openGraph: {
    type: 'website',
    siteName: 'Laagan Adventure',
    locale: 'en_PH',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${playfair.variable}`}>
      <body>
        <BookingProvider>
          {children}
          <BookingDrawer />
          {/* Stacked float buttons — WhatsApp above Messenger */}
          <div className="float-btns">
            <a href="https://wa.me/639052435196" target="_blank" rel="noopener noreferrer" className="float-btn float-btn--wa" aria-label="WhatsApp">
              <svg viewBox="0 0 24 24" width="26" height="26" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>
            <a href="https://m.me/61562040673545" target="_blank" rel="noopener noreferrer" className="float-btn float-btn--ms" aria-label="Messenger">
              <svg viewBox="0 0 24 24" width="26" height="26" fill="#fff"><path d="M12 2C6.477 2 2 6.145 2 11.259c0 2.913 1.453 5.512 3.726 7.21V22l3.405-1.869c.909.252 1.871.388 2.869.388 5.523 0 10-4.145 10-9.259S17.523 2 12 2zm1.07 12.481l-2.549-2.715-4.973 2.715 5.468-5.803 2.612 2.715 4.911-2.715-5.469 5.803z"/></svg>
            </a>
          </div>
        </BookingProvider>
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga-init" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `
              window.dataLayer=window.dataLayer||[];
              function gtag(){dataLayer.push(arguments);}
              gtag('js',new Date());
              gtag('config','${GA_ID}');
            `}} />
          </>
        )}
      </body>
    </html>
  )
}
