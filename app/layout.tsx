import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { Toaster } from '@/components/ui/toaster'
import { getProfile } from '@/lib/auth-server'
import { CANONICAL_PRODUCTION_ORIGIN } from '@/lib/site-url'
import { SITE_SHARE_DESCRIPTION, SITE_SHARE_IMAGE } from '@/lib/site-copy'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
})

const description = SITE_SHARE_DESCRIPTION

export const metadata: Metadata = {
  metadataBase: new URL(CANONICAL_PRODUCTION_ORIGIN),
  title: 'ClearCut Law | Commentary on UK deals, finance, competition and sport',
  description,
  keywords: ['UK deals', 'legal commentary', 'mergers and acquisitions', 'banking and finance', 'competition and regulation', 'sports deals'],
  authors: [{ name: 'Younas Ficel' }],
  creator: 'Younas Ficel',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: CANONICAL_PRODUCTION_ORIGIN,
    title: 'ClearCut Law | Commentary on UK deals, finance, competition and sport',
    description,
    siteName: 'ClearCut Law',
    images: [SITE_SHARE_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ClearCut Law | Commentary on UK deals, finance, competition and sport',
    description,
    images: [SITE_SHARE_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getProfile()

  return (
    <html lang="en" className={`${poppins.variable} scroll-smooth`}>
      <body className={`${poppins.className} font-sans`}>
        <div className="flex min-h-screen flex-col">
          <SiteHeader user={user} />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
        <Toaster />
      </body>
    </html>
  )
}