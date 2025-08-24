import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { Toaster } from '@/components/ui/toaster'
import { getProfile } from '@/lib/auth-server'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ClearLegal — Legal commentary & guidance',
  description: 'Clear, accessible legal commentary and guidance for the UK legal system. Expert insights on Family, Employment, Road Traffic, and Commercial law.',
  keywords: ['UK law', 'legal advice', 'family law', 'employment law', 'road traffic law', 'commercial law'],
  authors: [{ name: 'Younas Ficle' }],
  creator: 'Younas Ficle',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://clearlegal.co.uk',
    title: 'ClearLegal — Legal commentary & guidance',
    description: 'Clear, accessible legal commentary and guidance for the UK legal system.',
    siteName: 'ClearLegal',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ClearLegal — Legal commentary & guidance',
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