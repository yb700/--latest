import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, BookOpen, Newspaper, Scale } from "lucide-react"
import { blogCategoryPath, type BlogCategorySlug } from "@/lib/blog-categories"

export const metadata: Metadata = {
    title: 'About | ClearCut Law',
    description: 'Younas Ficel is a law graduate aiming to qualify as a commercial solicitor. ClearCut Law is a commentary site, not a law firm. The posts are commentary and not legal advice.',
}

const focusAreas: { label: string; slug: BlogCategorySlug }[] = [
    { label: "Mergers and Acquisitions", slug: "mergers-and-acquisitions" },
    { label: "Banking and Finance", slug: "banking-and-finance" },
    { label: "Competition and Regulation", slug: "competition-and-regulation" },
    { label: "Sport Deals and Regulation", slug: "sports-deals-and-regulation" },
]

const startHerePosts: {
    area: string
    title: string
    summary: string
    href: string
}[] = [
    {
        area: "Mergers and Acquisitions",
        title: "Rio Tinto and Glencore's Failed Merger",
        summary: "Why the world's biggest mining merger collapsed hours before a Takeover Code deadline, and what Rule 2.8 meant for Rio Tinto.",
        href: "/blog/rio-tinto-and-glencores-failed-merger",
    },
    {
        area: "Banking and Finance",
        title: "Virgin Atlantic's Heathrow Slot Financing",
        summary: "How Virgin Atlantic borrowed $745 million from Apollo using its Heathrow landing slots as security.",
        href: "/blog/secured-structured-finance-hsf-kramer-on-virgin-atlantics-745m-apollo-financing-heathrow-slots",
    },
    {
        area: "Competition and Regulation",
        title: "Visa, Mastercard and Revolut v PSR",
        summary: "What the High Court decided about the Payment Systems Regulator's power to cap card fees.",
        href: "/blog/mastercard-visa-and-revolut-vs-the-psr-what-the-high-court-actually-decided",
    },
    {
        area: "Sport Deals and Regulation",
        title: "FIFA's Failed World Cup Stake Sale and the Fallout for Infantino",
        summary: "How FIFA's plan to sell part of the World Cup collapsed in four days, and how Infantino could now be removed.",
        href: "/blog/fifas-failed-world-cup-stake-sale-and-the-fallout-for-infantino",
    },
]

const cardClass = "rounded-2xl border border-[#E7E4DF] bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.05)]"

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#FAF9F7]">
            <section className="py-12 sm:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl">
                        <h1 className="mb-6 text-4xl font-semibold text-[#151515] sm:text-5xl">
                            About ClearCut Law
                        </h1>
                        <div className={cardClass}>
                            <div className="space-y-4 text-xl leading-relaxed text-[#5E5E5E]">
                                <p>
                                    ClearCut Law explains the UK&apos;s biggest deals, court decisions and regulatory changes in plain English: what happened, why it matters and the law behind it.
                                </p>
                                <p>
                                    It covers mergers and acquisitions, banking and finance, competition and regulation and the business of sport, with new stories every week.
                                </p>
                            </div>
                            <div className="mt-6 flex flex-wrap gap-3">
                                <Badge variant="secondary" className="px-3 py-1">
                                    <BookOpen className="mr-1 h-4 w-4" />
                                    Plain English analysis
                                </Badge>
                                <Badge variant="secondary" className="px-3 py-1">
                                    <Scale className="mr-1 h-4 w-4" />
                                    Commentary, not advice
                                </Badge>
                            </div>
                            <p className="mt-6 text-2xl font-semibold text-[#151515]">Younas Ficel</p>
                            <p className="mt-1 font-medium text-[#5E5E5E]">LLB (Hons), Royal Holloway</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="pb-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 lg:grid-cols-2">
                        <div className={cardClass}>
                            <h2 className="mb-6 text-3xl font-semibold text-[#151515]">Who I Am</h2>
                            <div className="space-y-4 leading-relaxed text-[#5E5E5E]">
                                <p>
                                    I&apos;m Younas Ficel, a law graduate aiming to qualify as a commercial solicitor. I studied for an LLB at Royal Holloway, University of London, graduating with a 2:1.
                                </p>
                                <p>
                                    I started ClearCut Law to write about the areas of law I follow most closely: mergers and acquisitions, banking and finance, competition and regulation and the business side of sport. Each post breaks down a real deal or decision, explaining what happened and why it matters.
                                </p>
                                <p>
                                    The goal is simple: clear commentary without the jargon, for anyone who wants to understand how law shapes business.
                                </p>
                            </div>
                        </div>

                        <div className={cardClass}>
                            <h2 className="mb-6 text-3xl font-semibold text-[#151515]">Why This Site Exists</h2>
                            <div className="space-y-4 leading-relaxed text-[#5E5E5E]">
                                <p>
                                    <strong className="text-[#151515]">Clarity:</strong> Big deals and rulings are often reported in jargon. Each post explains what happened in plain English.
                                </p>
                                <p>
                                    <strong className="text-[#151515]">Context:</strong> It isn&apos;t enough to know what happened. Each post looks at why a deal or decision matters for businesses, regulators and the wider market.
                                </p>
                                <p>
                                    <strong className="text-[#151515]">The legal angle:</strong> Most business news covers the numbers. Each post also explains the rules behind the story, from takeover law to merger control.
                                </p>
                                <p>
                                    <strong className="text-[#151515]">Accessibility:</strong> Good commercial law commentary shouldn&apos;t sit behind paywalls or subscriptions.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="pb-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center text-[#151515]">
                                    <Scale className="mr-2 h-6 w-6 text-[#151515]" />
                                    Areas of Focus
                                </CardTitle>
                                <CardDescription>
                                    The four areas this site covers
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3">
                                    {focusAreas.map((area) => (
                                        <li key={area.slug}>
                                            <Link
                                                href={blogCategoryPath(area.slug)}
                                                className="flex items-start text-[#5E5E5E] transition-colors hover:text-[#151515]"
                                            >
                                                <div className="mr-3 mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#151515]"></div>
                                                <span>{area.label}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>

                        <div className="mt-12">
                            <h2 className="mb-4 text-3xl font-semibold text-[#151515]">Start Here</h2>
                            <p className="mb-8 text-lg text-[#5E5E5E]">
                                New to ClearCut Law? These four posts show what the site covers, one from each area.
                            </p>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {startHerePosts.map((post) => (
                                    <Card key={post.href} className="flex h-full flex-col">
                                        <CardHeader>
                                            <Badge variant="secondary" className="w-fit">
                                                {post.area}
                                            </Badge>
                                            <CardTitle className="text-xl leading-snug text-[#151515]">
                                                {post.title}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="flex flex-1 flex-col">
                                            <p className="leading-relaxed text-[#5E5E5E]">
                                                {post.summary}
                                            </p>
                                            <Link
                                                href={post.href}
                                                className="mt-6 inline-flex items-center text-sm font-medium text-[#151515] hover:underline"
                                                aria-label={`Read the post: ${post.title}`}
                                            >
                                                Read the post
                                                <ArrowRight className="ml-1 h-4 w-4" />
                                            </Link>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="pb-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl">
                        <div className="rounded-2xl border border-[#E7E4DF] bg-[#F3F1ED] p-6 text-[#5E5E5E]">
                            <h2 className="mb-4 text-2xl font-semibold text-[#151515]">Important Legal Notice</h2>
                            <p className="mb-4">
                                ClearCut Law is a commentary site, not a law firm. The posts are commentary and not legal advice. They should not be relied on for any specific situation.
                            </p>
                            <p className="mb-4">
                                I am a law graduate, not a practising solicitor. The views expressed are my own.
                            </p>
                            <p>
                                Posts are accurate at the date of publication, but the law and the deals discussed may have changed since. For advice on your own circumstances, consult a qualified solicitor.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-[#151515] py-16 text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl text-center">
                        <h2 className="mb-6 text-3xl font-semibold sm:text-4xl">
                            Read the commentary
                        </h2>
                        <p className="mx-auto mb-8 max-w-2xl text-xl text-[#BDBAB4]">
                            Start with the blog, or catch up with Legal News.
                        </p>
                        <div className="flex flex-col justify-center gap-4 sm:flex-row sm:flex-wrap">
                            <Link href="/blog" className="w-full sm:w-auto">
                                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                                    <BookOpen className="mr-2 h-5 w-5" />
                                    Read my latest analysis
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/blog" className="w-full sm:w-auto">
                                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                                    <BookOpen className="mr-2 h-5 w-5" />
                                    Read the Blog
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/news" className="w-full sm:w-auto">
                                <Button variant="outline" size="lg" className="w-full border-white bg-transparent text-white hover:bg-white hover:text-[#151515] sm:w-auto">
                                    <Newspaper className="mr-2 h-5 w-5" />
                                    Legal News
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
