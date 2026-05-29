import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import MessengerFloat from '@/components/MessengerFloat'
import { BookingProvider } from '@/lib/booking-context'
import BookingDrawer from '@/components/BookingDrawer'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-display', style: ['normal', 'italic'] })

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
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <BookingProvider>
          {children}
          <BookingDrawer />
          <MessengerFloat />
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
