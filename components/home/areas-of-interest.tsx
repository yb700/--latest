import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Handshake, Landmark, Goal, Scale } from "lucide-react"
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
        title: "Sports Deals and Regulation",
        description: "Club takeovers, ownership rules, broadcasting rights and sports governance.",
        icon: Goal,
        blogSlug: "sports-deals-and-regulation",
    },
]

export function AreasOfInterest() {
    return (
        <section className="bg-[#F7F8FA] py-16" aria-label="Areas">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
                    {areas.map((area) => {
                        const Icon = area.icon
                        return (
                            <Card key={area.title} className="flex h-full flex-col rounded-xl border border-[#E6E8EC] bg-white shadow-none hover:shadow-none">
                                <CardHeader className="p-4 pb-3 sm:p-6">
                                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F7F8FA] sm:mb-4 sm:h-14 sm:w-14">
                                        <Icon className="h-6 w-6 text-[#14213D] sm:h-7 sm:w-7" />
                                    </div>
                                    <CardTitle className="text-base font-bold leading-snug text-[#14213D] sm:text-xl">{area.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-1 flex-col p-4 pt-0 sm:p-6">
                                    <CardDescription className="mb-4 text-sm leading-relaxed text-[#5A6270] sm:mb-6">
                                        {area.description}
                                    </CardDescription>
                                    <div className="mt-auto">
                                        <Link
                                            href={blogCategoryPath(area.blogSlug)}
                                            className="text-sm font-semibold text-[#14213D] hover:underline"
                                            aria-label={`Explore ${area.title}`}
                                        >
                                            Explore
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
