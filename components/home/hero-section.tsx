import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, MessageCircle } from "lucide-react"

export function HeroSection() {
    return (
        <section className="relative bg-gradient-to-b from-slate-50 to-white py-20 sm:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Main Heading */}
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand mb-6 leading-tight">
                        Clear Legal Guidance for{" "}
                        <span className="text-brand-600">Everyone</span>
                    </h1>

                    {/* Subheading */}
                    <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                        Navigate the UK legal system with confidence. Get  commentary,
                        practical guidance, and clear explanations on Family, Employment,
                        Road Traffic, and Commercial law.
                    </p>

                    {/* Author Introduction */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border mb-8 max-w-2xl mx-auto">
                        <p className="text-slate-700 mb-2">
                            <strong className="text-brand">Welcome!</strong> I'm Younas Ficel,
                            a passionate UK law graduate dedicated to making legal knowledge accessible to everyone.
                        </p>
                        <p className="text-sm text-slate-600">
                            This site provides general legal information and commentary —
                            not personal legal advice.
                        </p>
                    </div>

                    {/* Call to Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link href="/blog">
                            <Button size="lg" className="w-full sm:w-auto">
                                <BookOpen className="mr-2 h-5 w-5" />
                                Explore the Blog
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                        <Link href="/guidance">
                            <Button variant="outline" size="lg" className="w-full sm:w-auto">
                                <MessageCircle className="mr-2 h-5 w-5" />
                                Ask a Legal Question
                            </Button>
                        </Link>
                    </div>

                    {/* Trust Indicators */}
                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-brand">500+</div>
                            <div className="text-sm text-slate-600">Questions Answered</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-brand">20+</div>
                            <div className="text-sm text-slate-600">Blog Articles</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-brand">Free</div>
                            <div className="text-sm text-slate-600">Legal Guidance</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background decoration */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]">
                    <div className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-brand-100 to-brand-200 opacity-20"></div>
                </div>
            </div>
        </section>
    )
}

