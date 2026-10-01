import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Handshake, Landmark, Goal, Scale, ArrowRight } from "lucide-react"
import { blogCategoryPath, BlogCategorySlug } from "@/lib/blog-categories"
import { newsCategoryPath, NewsCategorySlug } from "@/lib/news-categories"

const areas: {
    title: string
    description: string
    icon: typeof Handshake
    newsSlug: NewsCategorySlug
    blogSlug: BlogCategorySlug
    color: string
    bgColor: string
}[] = [
    {
        title: "Mergers and Acquisitions",
        description: "Deal structures, due diligence, takeover rules, merger control and the latest UK transactions.",
        icon: Handshake,
        newsSlug: "mergers-acquisitions",
        blogSlug: "mergers-and-acquisitions",
        color: "text-rose-600",
        bgColor: "bg-rose-50",
    },
    {
        title: "Banking and Finance",
        description: "Lending, capital markets, financial regulation and the deals shaping UK finance.",
        icon: Landmark,
        newsSlug: "banking-finance",
        blogSlug: "banking-and-finance",
        color: "text-blue-600",
        bgColor: "bg-blue-50",
    },
    {
        title: "Competition and Regulation",
        description: "CMA and CAT decisions, class actions, market investigations and regulatory enforcement.",
        icon: Scale,
        newsSlug: "competition-regulation",
        blogSlug: "competition-and-regulation",
        color: "text-purple-600",
        bgColor: "bg-purple-50",
    },
    {
        title: "Sports Deals and Regulation",
        description: "Club takeovers, ownership rules, broadcasting rights and sports governance.",
        icon: Goal,
        newsSlug: "sports-deals-regulation",
        blogSlug: "sports-deals-and-regulation",
        color: "text-green-600",
        bgColor: "bg-green-50",
    },
]

export function AreasOfInterest() {
    return (
        <section className="bg-slate-50 pb-16" aria-label="Areas">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {areas.map((area) => {
                        const Icon = area.icon
                        return (
                            <Card key={area.title} className="flex h-full flex-col">
                                <CardHeader className="pb-3">
                                    <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${area.bgColor}`}>
                                        <Icon className={`h-7 w-7 ${area.color}`} />
                                    </div>
                                    <CardTitle className="text-xl">{area.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-1 flex-col">
                                    <CardDescription className="mb-6 leading-relaxed text-slate-600">
                                        {area.description}
                                    </CardDescription>
                                    <div className="mt-auto flex flex-col gap-2">
                                        <Link href={newsCategoryPath(area.newsSlug)}>
                                            <Button variant="outline" size="sm" className="w-full" aria-label={`See ${area.title} news`}>
                                                See the news
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        </Link>
                                        <Link href={blogCategoryPath(area.blogSlug)}>
                                            <Button variant="ghost" size="sm" className="w-full" aria-label={`See ${area.title} blog posts`}>
                                                See the blog posts
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
