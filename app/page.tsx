import { HeroSection } from "@/components/home/hero-section"
import { AreasOfInterest } from "@/components/home/areas-of-interest"
import { QuickLinks } from "@/components/home/quick-links"
import { LatestPosts } from "@/components/home/latest-posts"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'ClearCut Law — Clear Legal Guidance for Everyone',
  description: 'Navigate the UK legal system with confidence. Get  commentary, practical guidance, and clear explanations on Mergers and Acquisitions, Banking and Finance, Sports Deals and Regulation, and Competition and Regulation.',
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AreasOfInterest />
      <QuickLinks />
      <LatestPosts />
    </>
  )
}
