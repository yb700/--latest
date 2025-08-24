import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, MessageCircle, ArrowRight } from "lucide-react"

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

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Blog Link */}
                    <Card className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
                        <CardHeader>
                            <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-100 transition-colors">
                                <BookOpen className="h-6 w-6 text-brand" />
                            </div>
                            <CardTitle className="text-2xl">Legal Blog</CardTitle>
                            <CardDescription className="text-lg">
                                In-depth articles, case studies, and commentary on current legal developments
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="text-slate-600 space-y-2 mb-6">
                                <li>• Latest legal developments and changes</li>
                                <li>• Case law analysis and commentary</li>
                                <li>• Practical guides and how-to articles</li>
                                <li>• Professional insights and opinions</li>
                            </ul>
                            <Link href="/blog">
                                <Button className="w-full group/button">
                                    Browse All Articles
                                    <ArrowRight className="ml-2 h-5 w-5 group-hover/button:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    {/* Legal Guidance Link */}
                    <Card className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
                        <CardHeader>
                            <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-100 transition-colors">
                                <MessageCircle className="h-6 w-6 text-brand" />
                            </div>
                            <CardTitle className="text-2xl">Legal Guidance</CardTitle>
                            <CardDescription className="text-lg">
                                Submit your legal questions and browse answers from previous inquiries
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="text-slate-600 space-y-2 mb-6">
                                <li>• Submit your own legal questions</li>
                                <li>• Browse answered questions by area</li>
                                <li>• Get clear, practical guidance</li>
                                <li>• Free and accessible to everyone</li>
                            </ul>
                            <Link href="/guidance">
                                <Button variant="outline" className="w-full group/button">
                                    Access Legal Guidance
                                    <ArrowRight className="ml-2 h-5 w-5 group-hover/button:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>

                {/* Additional CTA */}
                <div className="text-center mt-16">
                    <div className="bg-white rounded-2xl p-8 shadow-sm border max-w-2xl mx-auto">
                        <h3 className="text-xl font-semibold text-brand mb-3">
                            Stay Updated
                        </h3>
                        <p className="text-slate-600 mb-6">
                            Get the latest legal insights and updates delivered to your inbox.
                        </p>
                        <Link href="/newsletter">
                            <Button variant="outline">
                                Subscribe to Newsletter
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

