import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Wealth Builders Ghana - Premium Investment Solutions',
    template: '%s | Wealth Builders Ghana',
  },
  description: 'Grow your wealth with trusted investment solutions tailored for Ghanaians. Expert guidance, transparent returns, and secure portfolio management.',
  keywords: ['investment', 'Ghana', 'wealth management', 'financial growth', 'portfolio'],
  openGraph: {
    type: 'website',
    locale: 'en_GH',
    url: 'https://wealthbuilders.gh',
    siteName: 'Wealth Builders Ghana',
    title: 'Wealth Builders Ghana - Premium Investment Solutions',
    description: 'Grow your wealth with trusted investment solutions tailored for Ghanaians.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Wealth Builders Ghana',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wealth Builders Ghana - Premium Investment Solutions',
    description: 'Grow your wealth with trusted investment solutions tailored for Ghanaians.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
