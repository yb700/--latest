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
    { label: "Sports Deals and Regulation", slug: "sports-deals-and-regulation" },
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
        area: "Sports Deals and Regulation",
        title: "FIFA's Failed World Cup Stake Sale and the Fallout for Infantino",
        summary: "How FIFA's plan to sell part of the World Cup collapsed in four days, and how Infantino could now be removed.",
        href: "/blog/fifas-failed-world-cup-stake-sale-and-the-fallout-for-infantino",
    },
]

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h1 className="text-4xl sm:text-5xl font-bold text-brand mb-6">
                                    About ClearCut Law
                                </h1>
                                <div className="space-y-4 text-xl text-slate-600 mb-6 leading-relaxed">
                                    <p>
                                        ClearCut Law explains the UK&apos;s biggest deals, court decisions and regulatory changes in plain English: what happened, why it matters and the law behind it.
                                    </p>
                                    <p>
                                        It covers mergers and acquisitions, banking and finance, competition and regulation and the business of sport, with new stories every week.
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-3 mb-8">
                                    <Badge variant="secondary" className="px-3 py-1">
                                        <BookOpen className="h-4 w-4 mr-1" />
                                        Plain English analysis
                                    </Badge>
                                    <Badge variant="secondary" className="px-3 py-1">
                                        <Scale className="h-4 w-4 mr-1" />
                                        Commentary, not advice
                                    </Badge>
                                </div>
                            </div>

                            <div className="relative">
                                <div className="bg-brand-50 rounded-2xl p-8 text-center">
                                    <div className="w-32 h-32 bg-brand rounded-full flex items-center justify-center mx-auto mb-6">
                                        <span className="text-white font-bold text-4xl">YF</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-brand mb-2">Younas Ficel</h3>
                                    <p className="text-brand-600 font-medium">LLB (Hons), Royal Holloway</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Me Section */}
            <section className="py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            <div>
                                <h2 className="text-3xl font-bold text-brand mb-6">Who I Am</h2>
                                <div className="space-y-4 text-slate-700 leading-relaxed">
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

                            <div>
                                <h2 className="text-3xl font-bold text-brand mb-6">Why This Site Exists</h2>
                                <div className="space-y-4 text-slate-700 leading-relaxed">
                                    <p>
                                        <strong>Clarity:</strong> Big deals and rulings are often reported in jargon. Each post explains what happened in plain English.
                                    </p>
                                    <p>
                                        <strong>Context:</strong> It isn&apos;t enough to know what happened. Each post looks at why a deal or decision matters for businesses, regulators and the wider market.
                                    </p>
                                    <p>
                                        <strong>The legal angle:</strong> Most business news covers the numbers. Each post also explains the rules behind the story, from takeover law to merger control.
                                    </p>
                                    <p>
                                        <strong>Accessibility:</strong> Good commercial law commentary shouldn&apos;t sit behind paywalls or subscriptions.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Areas of Focus and Start Here */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Scale className="h-6 w-6 mr-2 text-brand" />
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
                                                className="flex items-start text-slate-700 transition-colors hover:text-brand"
                                            >
                                                <div className="w-2 h-2 bg-brand rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                                <span>{area.label}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>

                        <div className="mt-16">
                            <h2 className="text-3xl font-bold text-brand mb-4">Start Here</h2>
                            <p className="text-lg text-slate-600 mb-8">
                                New to ClearCut Law? These four posts show what the site covers, one from each area.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {startHerePosts.map((post) => (
                                    <Card key={post.href} className="flex h-full flex-col">
                                        <CardHeader>
                                            <Badge variant="secondary" className="w-fit">
                                                {post.area}
                                            </Badge>
                                            <CardTitle className="text-xl leading-snug">
                                                {post.title}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="flex flex-1 flex-col">
                                            <p className="text-slate-600 leading-relaxed">
                                                {post.summary}
                                            </p>
                                            <Link
                                                href={post.href}
                                                className="mt-6 inline-flex items-center text-sm font-medium text-brand hover:underline"
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

            {/* Important Disclaimer */}
            <section className="py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <Card className="border-[#E6E8EC] bg-[#F7F8FA] shadow-none">
                            <CardHeader>
                                <CardTitle className="text-[#14213D]">Important Legal Notice</CardTitle>
                            </CardHeader>
                            <CardContent className="text-[#5A6270]">
                                <p className="mb-4">
                                    ClearCut Law is a commentary site, not a law firm. The posts are commentary and not legal advice. They should not be relied on for any specific situation.
                                </p>
                                <p className="mb-4">
                                    I am a law graduate, not a practising solicitor. The views expressed are my own.
                                </p>
                                <p>
                                    Posts are accurate at the date of publication, but the law and the deals discussed may have changed since. For advice on your own circumstances, consult a qualified solicitor.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-20 bg-brand text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                            Read the commentary
                        </h2>
                        <p className="text-xl text-brand-100 mb-8 max-w-2xl mx-auto">
                            Start with the blog, or catch up with Legal News.
                        </p>
                        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 justify-center">
                            <Link href="/blog">
                                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                                    <BookOpen className="mr-2 h-5 w-5" />
                                    Read my latest analysis
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/blog">
                                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                                    <BookOpen className="mr-2 h-5 w-5" />
                                    Read the Blog
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/news">
                                <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-brand">
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
