import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
    return (
        <section className="bg-[#FAF9F7] py-12 sm:py-16" aria-labelledby="intro-heading">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl">
                    <h1 id="intro-heading" className="text-3xl font-semibold leading-tight tracking-[-0.5px] text-[#151515] sm:text-4xl">
                        UK deals, finance, competition and sport, explained in plain English.
                    </h1>
                    <p className="mt-4 text-lg leading-relaxed text-[#5E5E5E]">
                        From takeovers and bank deals to competition rulings and club ownership, ClearCut Law explains what happened, why it matters and the law behind it. New stories every week.
                    </p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <Link href="/news" className="sm:w-auto">
                            <Button size="lg" className="w-full justify-between sm:w-auto sm:min-w-[260px]">
                                Read the latest news
                                <ArrowRight className="h-4 w-4" aria-hidden="true" />
                            </Button>
                        </Link>
                        <Link href="/blog" className="sm:w-auto">
                            <Button size="lg" variant="outline" className="w-full justify-between bg-transparent sm:w-auto sm:min-w-[260px]">
                                Read the blog
                                <ArrowRight className="h-4 w-4" aria-hidden="true" />
                            </Button>
                        </Link>
                    </div>
                    <Link
                        href="/about"
                        className="mt-8 block rounded-[8px] border border-[#E7E4DF] bg-white px-5 py-4 text-base leading-relaxed text-[#5E5E5E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#151515] focus-visible:ring-offset-2"
                    >
                        I&apos;m Younas, a law graduate writing about the deals and decisions shaping commercial law.
                    </Link>
                </div>
            </div>
        </section>
    )
}
