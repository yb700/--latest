import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, BookOpen, Newspaper, Scale, GraduationCap } from "lucide-react"

export const metadata: Metadata = {
    title: 'About | ClearCut Law',
    description: 'Younas Ficel is a law graduate aiming to qualify as a commercial solicitor. ClearCut Law is a commentary site, not a law firm. The posts are commentary and not legal advice.',
}
const specialties = [
    "Mergers and Acquisitions",
    "Banking and Finance",
    "Competition and Regulation",
    "Sports Deals and Regulation"
]

const qualifications = [
    "LLB (Hons) Law, 2:1, Royal Holloway, University of London",
    "Working towards the SQE",
    "Legal research and analysis",
    "Deal and case analysis",
    "Commercial awareness",
    "Clear legal writing"
]

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h1 className="text-4xl sm:text-5xl font-bold text-brand mb-6">
                                    About ClearCut Law
                                </h1>
                                <p className="text-xl text-slate-600 mb-6 leading-relaxed">
                                    Younas Ficel is a law graduate aiming to qualify as a commercial solicitor.
                                    He writes plain English commentary on UK deals, finance, competition and sport.
                                    This is a commentary site, not a law firm. The posts are commentary and not legal advice.
                                </p>
                                <div className="flex flex-wrap gap-3 mb-8">
                                    <Badge variant="secondary" className="px-3 py-1">
                                        <Scale className="h-4 w-4 mr-1" />
                                        UK Law Graduate
                                    </Badge>
                                    <Badge variant="secondary" className="px-3 py-1">
                                        <BookOpen className="h-4 w-4 mr-1" />
                                        Commentary, not advice
                                    </Badge>
                                </div>
                            </div>

                            <div className="relative">
                                <div className="bg-brand-50 rounded-2xl p-8 text-center">
                                    <div className="w-32 h-32 bg-brand rounded-full flex items-center justify-center mx-auto mb-6">
                                        <span className="text-white font-bold text-4xl">YF</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-brand mb-2">Younas Ficel</h3>
                                    <p className="text-brand-600 font-medium">Law graduate</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Me Section */}
            <section className="py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            <div>
                                <h2 className="text-3xl font-bold text-brand mb-6">Who I Am</h2>
                                <div className="space-y-4 text-slate-700 leading-relaxed">
                                    <p>
                                        I&apos;m Younas Ficel, a law graduate aiming to qualify as a commercial solicitor. I studied for an LLB at Royal Holloway, University of London and I am working towards the SQE.
                                    </p>
                                    <p>
                                        I started ClearCut Law to write about the parts of the law I find most interesting: mergers and acquisitions, banking and finance, competition and regulation and the business side of sport. Each post breaks down a real deal or decision, explaining what happened and why it matters.
                                    </p>
                                    <p>
                                        The goal is simple: clear commentary without the jargon, for law students, graduates and anyone curious about how law shapes business.
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-3xl font-bold text-brand mb-6">Why This Site Exists</h2>
                                <div className="space-y-4 text-slate-700 leading-relaxed">
                                    <p>
                                        <strong>Clarity:</strong> Big deals and rulings are often reported in jargon. Each post explains what happened in plain English.
                                    </p>
                                    <p>
                                        <strong>Context:</strong> It isn&apos;t enough to know what happened. Each post looks at why a deal or decision matters for businesses, regulators and the wider market.
                                    </p>
                                    <p>
                                        <strong>Commercial awareness:</strong> Commercial awareness is one of the main things firms look for. Following real deals is one of the best ways for students and graduates to build it.
                                    </p>
                                    <p>
                                        <strong>Accessibility:</strong> Good commercial law commentary shouldn&apos;t sit behind paywalls or subscriptions.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Specialties & Qualifications */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <Scale className="h-6 w-6 mr-2 text-brand" />
                                        Areas of Focus
                                    </CardTitle>
                                    <CardDescription>
                                        The legal areas I&apos;m most passionate about and focus on for this site
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-3">
                                        {specialties.map((specialty, index) => (
                                            <li key={index} className="flex items-start">
                                                <div className="w-2 h-2 bg-brand rounded-full mt-3 mr-3 flex-shrink-0"></div>
                                                <span className="text-slate-700">{specialty}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <GraduationCap className="h-6 w-6 mr-2 text-brand" />
                                        Background and Skills
                                    </CardTitle>
                                    <CardDescription>
                                        My education and key skills
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-3">
                                        {qualifications.map((qualification, index) => (
                                            <li key={index} className="flex items-start">
                                                <div className="w-2 h-2 bg-brand rounded-full mt-3 mr-3 flex-shrink-0"></div>
                                                <span className="text-slate-700">{qualification}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Important Disclaimer */}
            <section className="py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <Card className="border-amber-200 bg-amber-50">
                            <CardHeader>
                                <CardTitle className="text-amber-800">Important Legal Notice</CardTitle>
                            </CardHeader>
                            <CardContent className="text-amber-700">
                                <p className="mb-4">
                                    ClearCut Law is a commentary site, not a law firm. The posts are commentary and not legal advice. They should not be relied on for any specific situation.
                                </p>
                                <p className="mb-4">
                                    I am a law graduate, not a practising solicitor. The views expressed are my own.
                                </p>
                                <p>
                                    Posts are accurate at the date of publication, but the law and the deals discussed may have changed since. For advice on your own circumstances, consult a qualified solicitor.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-20 bg-brand text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                            Read the commentary
                        </h2>
                        <p className="text-xl text-brand-100 mb-8 max-w-2xl mx-auto">
                            Start with the blog, or catch up with Legal News.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/blog">
                                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                                    <BookOpen className="mr-2 h-5 w-5" />
                                    Read the Blog
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/news">
                                <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-brand">
                                    <Newspaper className="mr-2 h-5 w-5" />
                                    Legal News
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}


