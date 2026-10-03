import { HeroSection } from "@/components/home/hero-section"
import { AreasOfInterest } from "@/components/home/areas-of-interest"
import { LegalNews } from "@/components/home/legal-news"
import { LatestPosts } from "@/components/home/latest-posts"
import { Metadata } from "next"
import { SITE_SHARE_DESCRIPTION, SITE_SHARE_IMAGE } from "@/lib/site-copy"

const description = SITE_SHARE_DESCRIPTION

export const metadata: Metadata = {
  title: 'ClearCut Law | Commentary on UK deals, finance, competition and sport',
  description,
  openGraph: {
    title: 'ClearCut Law | Commentary on UK deals, finance, competition and sport',
    description,
    images: [SITE_SHARE_IMAGE],
  },
  twitter: {
    title: 'ClearCut Law | Commentary on UK deals, finance, competition and sport',
    description,
    images: [SITE_SHARE_IMAGE.url],
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
      <LegalNews preview={preview} />
      <AreasOfInterest />
      <LatestPosts />
    </>
  )
}
