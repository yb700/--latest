import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { Toaster } from '@/components/ui/toaster'
import { getProfile } from '@/lib/auth-server'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ClearCut Law — Legal commentary & guidance',
  description: 'Clear, accessible legal commentary and guidance for the UK legal system.  insights on Mergers and Acquisitions, Banking and Finance, Sports Deals and Regulation, and Competition and Regulation.',
  keywords: ['UK law', 'legal advice', 'mergers and acquisitions', 'banking and finance', 'sports deals and regulation', 'competition and regulation'],
  authors: [{ name: 'Younas Ficel' }],
  creator: 'Younas Ficel',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://ClearCut Law.co.uk',
    title: 'ClearCut Law — Legal commentary & guidance',
    description: 'Clear, accessible legal commentary and guidance for the UK legal system.',
    siteName: 'ClearCut Law',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ClearCut Law — Legal commentary & guidance',
    description: 'Clear, accessible legal commentary and guidance for the UK legal system.',
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
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
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