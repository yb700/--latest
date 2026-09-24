import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Handshake, Landmark, Goal, Scale, ArrowRight } from "lucide-react"
import { blogCategoryPath } from "@/lib/blog-categories"

const areas = [
    {
        title: "Mergers and Acquisitions",
        description: "Deal structures, due diligence, takeover rules, merger control and the latest UK transactions.",
        icon: Handshake,
        href: blogCategoryPath("mergers-and-acquisitions"),
        color: "text-rose-600",
        bgColor: "bg-rose-50",
    },
    {
        title: "Banking and Finance",
        description: "Lending, capital markets, financial regulation and the deals shaping UK finance.",
        icon: Landmark,
        href: blogCategoryPath("banking-and-finance"),
        color: "text-blue-600",
        bgColor: "bg-blue-50",
    },
    {
        title: "Sports Deals and Regulation",
        description: "Club takeovers, ownership rules, broadcasting rights and sports governance.",
        icon: Goal,
        href: blogCategoryPath("sports-deals-and-regulation"),
        color: "text-green-600",
        bgColor: "bg-green-50",
    },
    {
        title: "Competition and Regulation",
        description: "CMA and CAT decisions, class actions, market investigations and regulatory enforcement.",
        icon: Scale,
        href: blogCategoryPath("competition-and-regulation"),
        color: "text-purple-600",
        bgColor: "bg-purple-50",
    },
]

export function AreasOfInterest() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-brand mb-4">
                        Areas of Legal Knowledge
                    </h2>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        Clear commentary on the deals, decisions and regulation shaping four key areas of commercial law
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {areas.map((area) => {
                        const Icon = area.icon
                        return (
                            <Card key={area.title} className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
                                <CardHeader className="text-center pb-3">
                                    <div className={`w-16 h-16 ${area.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                                        <Icon className={`h-8 w-8 ${area.color}`} />
                                    </div>
                                    <CardTitle className="text-xl">{area.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="text-center">
                                    <CardDescription className="text-slate-600 mb-4 leading-relaxed">
                                        {area.description}
                                    </CardDescription>
                                    <Link href={area.href}>
                                        <Button variant="ghost" size="sm" className="group/button">
                                            Learn More
                                            <ArrowRight className="ml-2 h-4 w-4 group-hover/button:translate-x-1 transition-transform" />
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>

                <div className="text-center">
                    <p className="text-slate-600 mb-6">
                        Can't find what you're looking for? Submit your own legal question.
                    </p>
                    <Link href="/guidance">
                        <Button variant="outline" size="lg">
                            Ask a Question
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}


