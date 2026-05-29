import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import MessengerFloat from '@/components/MessengerFloat'
import { BookingProvider } from '@/lib/booking-context'
import BookingDrawer from '@/components/BookingDrawer'

const inter = Inter({ subsets: ['latin'] })

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
    <html lang="en" className={inter.className}>
      <body>
        <BookingProvider>
          {children}
          <BookingDrawer />
          <MessengerFloat />
        </BookingProvider>
      </body>
    </html>
  )
}
