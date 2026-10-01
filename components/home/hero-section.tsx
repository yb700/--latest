import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LeadNewsCard } from "@/components/news/lead-news-card"
import { getPublishedNewsItems } from "@/lib/news"

export async function HeroSection() {
    const [lead] = await getPublishedNewsItems({ limit: 1 })

    return (
        <section className="relative bg-gradient-to-b from-slate-50 to-white py-10 sm:py-14">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h1 className="text-3xl font-bold leading-tight text-brand sm:text-4xl">
                        Commercial law, in plain English
                    </h1>
                    <p className="mx-auto mt-3 max-w-xl text-lg leading-relaxed text-slate-600">
                        Commentary on the deals and decisions that shape business.
                    </p>
                </div>

                {lead && (
                    <div className="mt-8">
                        <LeadNewsCard item={lead} />
                    </div>
                )}

                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                    <Button asChild size="sm">
                        <Link href="/blog">Blog</Link>
                    </Button>
                    <Button asChild size="sm" variant="outline">
                        <Link href="/news">Legal News</Link>
                    </Button>
                </div>

                <div className="mx-auto mt-8 max-w-2xl rounded-2xl border bg-white p-6 text-center shadow-sm">
                    <p className="mb-2 text-slate-700">
                        <strong className="text-brand">Welcome.</strong> I&apos;m Younas Ficel. I write about commercial law as it shows up in real deals and decisions.
                    </p>
                    <p className="text-sm text-slate-600">
                        What you read here is commentary. It is not advice on your own situation.
                    </p>
                </div>
            </div>
        </section>
    )
}
