import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DealOfTheWeekCard, loadDealOfTheWeek } from "@/components/home/deal-of-the-week"
import { YounasIntro } from "@/components/home/younas-intro"
import { cn } from "@/lib/utils"

export async function HeroSection({ preview = false }: { preview?: boolean }) {
    const deal = await loadDealOfTheWeek(preview)

    return (
        <section className="bg-[#F3F1ED] py-12 sm:py-16" aria-labelledby="intro-heading">
            <div className="mx-auto w-full max-w-[1100px] px-4 sm:px-6 lg:px-8">
                <div
                    className={cn(
                        'max-w-3xl',
                        deal && 'lg:grid lg:max-w-none lg:grid-cols-[minmax(0,11fr)_minmax(0,9fr)] lg:items-start lg:gap-10'
                    )}
                >
                    <div>
                    <h1 id="intro-heading" className="text-3xl font-semibold leading-tight tracking-[-0.5px] text-[#151515] sm:text-4xl">
                        UK deals, finance, competition and sport, explained in plain English.
                    </h1>
                    <p className="mt-4 text-lg leading-relaxed text-[#5E5E5E]">
                        From takeovers and bank deals to competition rulings and club ownership, ClearCut Law explains what happened, why it matters and the law behind it. New stories every week.
                    </p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <Link href="/news" className="w-full sm:w-auto">
                            <Button size="lg" className="w-full justify-between sm:min-w-[260px]">
                                Read the latest news
                                <ArrowRight className="h-4 w-4" aria-hidden="true" />
                            </Button>
                        </Link>
                        <Link href="/blog" className="w-full sm:w-auto">
                            <Button size="lg" variant="outline" className="w-full justify-between sm:min-w-[260px]">
                                Read the blog
                                <ArrowRight className="h-4 w-4" aria-hidden="true" />
                            </Button>
                        </Link>
                    </div>
                    <YounasIntro />
                    </div>
                    {deal ? <DealOfTheWeekCard deal={deal} /> : null}
                </div>
            </div>
        </section>
    )
}
