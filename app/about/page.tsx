import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, BookOpen, MessageCircle, Scale, GraduationCap } from "lucide-react"

export const metadata: Metadata = {
    title: 'About — ClearCut Law',
    description: 'Learn about Younas Ficel, the law graduate behind ClearCut Law, and discover why this site exists to make legal knowledge accessible to everyone.',
}
const specialties = [
    "Family Law & Domestic Relations",
    "Employment Rights & Workplace Issues",
    "Road Traffic Offences & Motoring Law",
    "Commercial Law & Business Disputes"
]

const qualifications = [
    "LLB (Hons) Law Degree",
    "Legal Research & Analysis",
    "Case Law Interpretation",
    "Legal Writing & Communication"
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
                                    Making UK legal knowledge accessible, understandable, and actionable for everyone.
                                    No jargon, no complexity—just clear guidance when you need it most.
                                </p>
                                <div className="flex flex-wrap gap-3 mb-8">
                                    <Badge variant="secondary" className="px-3 py-1">
                                        <Scale className="h-4 w-4 mr-1" />
                                        UK Law Graduate
                                    </Badge>
                                    <Badge variant="secondary" className="px-3 py-1">
                                        <BookOpen className="h-4 w-4 mr-1" />
                                        Legal Educator
                                    </Badge>
                                </div>
                            </div>

                            <div className="relative">
                                <div className="bg-brand-50 rounded-2xl p-8 text-center">
                                    <div className="w-32 h-32 bg-brand rounded-full flex items-center justify-center mx-auto mb-6">
                                        <span className="text-white font-bold text-4xl">YF</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-brand mb-2">Younas Ficel</h3>
                                    <p className="text-brand-600 font-medium">Law Graduate & Founder</p>
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
                                        Hi, I'm Younas Ficel, a passionate UK law graduate with a mission to demystify
                                        the legal system for everyday people. After completing my law degree, I realized
                                        that legal knowledge shouldn't be locked away in dusty textbooks or behind
                                        expensive consultation fees.
                                    </p>
                                    <p>
                                        Legal issues affect all of us—from workplace disputes to family matters,
                                        from traffic violations to business contracts. Yet many people feel intimidated
                                        by the complexity of the law and unsure where to turn for reliable information.
                                    </p>
                                    <p>
                                        That's why I created ClearCut Law: to bridge the gap between complex legal
                                        concepts and practical understanding, making the law accessible to everyone
                                        who needs it.
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-3xl font-bold text-brand mb-6">Why This Site Exists</h2>
                                <div className="space-y-4 text-slate-700 leading-relaxed">
                                    <p>
                                        <strong>Education:</strong> Legal knowledge empowers people to understand
                                        their rights and make informed decisions.
                                    </p>
                                    <p>
                                        <strong>Accessibility:</strong> Everyone deserves access to clear,
                                        understandable legal information, regardless of their background or budget.
                                    </p>
                                    <p>
                                        <strong>Prevention:</strong> Understanding the law can help prevent
                                        problems before they escalate into costly legal disputes.
                                    </p>
                                    <p>
                                        <strong>Confidence:</strong> When you understand your legal position,
                                        you can navigate challenges with greater confidence and clarity.
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
                                        The legal areas I'm most passionate about and focus on for this site
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
                                        Background & Skills
                                    </CardTitle>
                                    <CardDescription>
                                        My educational background and key competencies
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
                                    <strong>This website provides general legal information only and is not a substitute
                                        for professional legal advice.</strong> The content on this site should not be relied
                                    upon as legal advice for any specific situation.
                                </p>
                                <p className="mb-4">
                                    Every legal situation is unique, and the law can be complex and subject to change.
                                    For specific legal advice relating to your particular circumstances, please consult
                                    a qualified solicitor or legal professional.
                                </p>
                                <p>
                                    I am a law graduate, not a practicing solicitor. The guidance provided here is
                                    educational in nature and designed to help you understand general legal principles
                                    and concepts.
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
                            Ready to Get Started?
                        </h2>
                        <p className="text-xl text-brand-100 mb-8 max-w-2xl mx-auto">
                            Explore our legal guidance, read our latest articles, or submit your own question
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/blog">
                                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                                    <BookOpen className="mr-2 h-5 w-5" />
                                    Read the Blog
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/guidance">
                                <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-brand">
                                    <MessageCircle className="mr-2 h-5 w-5" />
                                    Ask a Question
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}


