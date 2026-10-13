import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Handshake, Landmark, Goal, Scale } from "lucide-react"
import { blogCategoryPath, type BlogCategorySlug } from "@/lib/blog-categories"

const areas: {
    title: string
    description: string
    icon: typeof Handshake
    blogSlug: BlogCategorySlug
}[] = [
    {
        title: "Mergers and Acquisitions",
        description: "Deal structures, due diligence, takeover rules, merger control and the latest UK transactions.",
        icon: Handshake,
        blogSlug: "mergers-and-acquisitions",
    },
    {
        title: "Banking and Finance",
        description: "Lending, capital markets, financial regulation and the deals shaping UK finance.",
        icon: Landmark,
        blogSlug: "banking-and-finance",
    },
    {
        title: "Competition and Regulation",
        description: "CMA and CAT decisions, class actions, market investigations and regulatory enforcement.",
        icon: Scale,
        blogSlug: "competition-and-regulation",
    },
    {
        title: "Sport Deals and Regulation",
        description: "Club takeovers, ownership rules, broadcasting rights and sports governance.",
        icon: Goal,
        blogSlug: "sports-deals-and-regulation",
    },
]

export function AreasOfInterest() {
    return (
        <section className="bg-[#FAF9F7] py-16" aria-labelledby="topics-heading">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8 max-w-[720px]">
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8A8780]">
                        Topics
                    </p>
                    <h2 id="topics-heading" className="text-3xl font-semibold tracking-[-0.5px] text-[#151515] sm:text-4xl">
                        Four areas of commercial law
                    </h2>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
                    {areas.map((area) => {
                        const Icon = area.icon
                        return (
                            <Card key={area.title} className="flex h-full flex-col">
                                <CardHeader className="p-4 pb-3 sm:p-6">
                                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FAF9F7] sm:mb-4 sm:h-14 sm:w-14">
                                        <Icon className="h-6 w-6 text-[#151515] sm:h-7 sm:w-7" />
                                    </div>
                                    <CardTitle className="text-base font-semibold leading-snug tracking-[-0.5px] text-[#151515] sm:text-xl">{area.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-1 flex-col p-4 pt-0 sm:p-6">
                                    <CardDescription className="mb-4 text-sm leading-relaxed text-[#5E5E5E] sm:mb-6">
                                        {area.description}
                                    </CardDescription>
                                    <div className="mt-auto">
                                        <Link
                                            href={blogCategoryPath(area.blogSlug)}
                                            className="inline-flex items-center text-sm font-semibold text-[#151515] hover:underline"
                                            aria-label={`Explore ${area.title}`}
                                        >
                                            Explore
                                            <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
