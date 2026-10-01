import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, ArrowRight } from "lucide-react"

export function QuickLinks() {
    return (
        <section className="py-20 bg-slate-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-brand mb-4">
                        Quick Access
                    </h2>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        Find the information you need quickly with these direct links
                    </p>
                </div>

                <div className="max-w-xl mx-auto">
                    {/* Blog Link */}
                    <Card className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
                        <CardHeader>
                            <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-100 transition-colors">
                                <BookOpen className="h-6 w-6 text-brand" />
                            </div>
                            <CardTitle className="text-2xl">Legal Blog</CardTitle>
                            <CardDescription className="text-lg">
                                Commentary on the deals, decisions and developments shaping commercial law.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="text-slate-600 space-y-2 mb-6">
                                <li>• Breakdowns of major M&A and finance deals</li>
                                <li>• Competition and regulatory decisions explained</li>
                                <li>• Sports deals, takeovers and football regulation</li>
                                <li>• What it means for businesses and future lawyers</li>
                            </ul>
                            <Link href="/blog">
                                <Button className="w-full group/button">
                                    Browse All Articles
                                    <ArrowRight className="ml-2 h-5 w-5 group-hover/button:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}
