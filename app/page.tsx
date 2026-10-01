import { HeroSection } from "@/components/home/hero-section"
import { AreasOfInterest } from "@/components/home/areas-of-interest"
import { LegalNews } from "@/components/home/legal-news"
import { LatestPosts } from "@/components/home/latest-posts"
import { Metadata } from "next"

const description =
  'Plain English commentary on UK deals, finance, competition and sport, written by a law graduate. This is a commentary site, not a law firm.'

export const metadata: Metadata = {
  title: 'ClearCut Law | Commentary on UK deals, finance, competition and sport',
  description,
  openGraph: {
    title: 'ClearCut Law | Commentary on UK deals, finance, competition and sport',
    description,
  },
  twitter: {
    title: 'ClearCut Law | Commentary on UK deals, finance, competition and sport',
    description,
  },
}

export default function HomePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const preview = searchParams.preview === 'fixtures'

  return (
    <>
      <HeroSection />
      <AreasOfInterest />
      <LegalNews preview={preview} />
      <LatestPosts />
    </>
  )
}
