import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Handshake, Landmark, Goal, Scale, ArrowRight } from "lucide-react"
import { newsCategoryPath, NewsCategorySlug } from "@/lib/news-categories"

const areas: {
    title: string
    description: string
    icon: typeof Handshake
    newsSlug: NewsCategorySlug
    color: string
    bgColor: string
}[] = [
    {
        title: "Mergers and Acquisitions",
        description: "Deal structures, due diligence, takeover rules, merger control and the latest UK transactions.",
        icon: Handshake,
        newsSlug: "mergers-acquisitions",
        color: "text-rose-600",
        bgColor: "bg-rose-50",
    },
    {
        title: "Banking and Finance",
        description: "Lending, capital markets, financial regulation and the deals shaping UK finance.",
        icon: Landmark,
        newsSlug: "banking-finance",
        color: "text-blue-600",
        bgColor: "bg-blue-50",
    },
    {
        title: "Competition and Regulation",
        description: "CMA and CAT decisions, class actions, market investigations and regulatory enforcement.",
        icon: Scale,
        newsSlug: "competition-regulation",
        color: "text-purple-600",
        bgColor: "bg-purple-50",
    },
    {
        title: "Sports Deals and Regulation",
        description: "Club takeovers, ownership rules, broadcasting rights and sports governance.",
        icon: Goal,
        newsSlug: "sports-deals-regulation",
        color: "text-green-600",
        bgColor: "bg-green-50",
    },
]

export function AreasOfInterest() {
    return (
        <section className="bg-slate-50 py-16" aria-label="Areas">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
                    {areas.map((area) => {
                        const Icon = area.icon
                        return (
                            <Card key={area.title} className="flex h-full flex-col">
                                <CardHeader className="p-4 pb-3 sm:p-6">
                                    <div className={`mb-3 flex h-12 w-12 items-center justify-center rounded-2xl sm:mb-4 sm:h-14 sm:w-14 ${area.bgColor}`}>
                                        <Icon className={`h-6 w-6 sm:h-7 sm:w-7 ${area.color}`} />
                                    </div>
                                    <CardTitle className="text-base leading-snug sm:text-xl">{area.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-1 flex-col p-4 pt-0 sm:p-6">
                                    <CardDescription className="mb-4 text-sm leading-relaxed text-slate-600 sm:mb-6">
                                        {area.description}
                                    </CardDescription>
                                    <div className="mt-auto">
                                        <Link href={newsCategoryPath(area.newsSlug)}>
                                            <Button variant="outline" size="sm" className="w-full" aria-label={`Explore ${area.title}`}>
                                                Explore
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Button>
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
