import { HeroSection } from "@/components/home/hero-section"
import { AreasOfInterest } from "@/components/home/areas-of-interest"
import { LegalNews } from "@/components/home/legal-news"
import { QuickLinks } from "@/components/home/quick-links"
import { LatestPosts } from "@/components/home/latest-posts"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'ClearCut Law — Commercial law, in plain English',
  description: 'Commentary on mergers and acquisitions, banking and finance, sports deals and regulation, and competition and regulation, plus the blog and Legal News.',
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AreasOfInterest />
      <LegalNews />
      <QuickLinks />
      <LatestPosts />
    </>
  )
}
