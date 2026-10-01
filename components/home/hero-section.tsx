import Link from "next/link"

export function HeroSection() {
    return (
        <section className="relative bg-gradient-to-b from-slate-50 to-white py-20 sm:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand mb-6 leading-tight">
                        Commercial law, in plain English
                    </h1>

                    <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                        Commentary on mergers and acquisitions, banking and finance, sports deals and regulation, and competition and regulation, plus the blog and Legal News.
                    </p>
                </div>

                <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Link
                        href="/blog"
                        className="flex min-h-28 items-center justify-center rounded-2xl bg-brand px-6 py-8 text-center text-2xl font-semibold text-white transition-colors hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 sm:min-h-32 sm:text-3xl"
                    >
                        Blog
                    </Link>
                    <Link
                        href="/news"
                        className="flex min-h-28 items-center justify-center rounded-2xl border-2 border-brand bg-white px-6 py-8 text-center text-2xl font-semibold text-brand transition-colors hover:bg-brand hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 sm:min-h-32 sm:text-3xl"
                    >
                        Legal News
                    </Link>
                </div>

                <div className="max-w-4xl mx-auto text-center">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border mb-8 max-w-2xl mx-auto">
                        <p className="text-slate-700 mb-2">
                            <strong className="text-brand">Welcome!</strong> I&apos;m Younas Ficel,
                            a passionate UK law graduate dedicated to making legal knowledge accessible to everyone.
                        </p>
                        <p className="text-sm text-slate-600">
                            This site provides general legal information and commentary —
                            not personal legal advice.
                        </p>
                    </div>

                    <div className="mt-12 flex justify-center">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-brand">20+</div>
                            <div className="text-sm text-slate-600">Blog Articles</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]">
                    <div className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-brand-100 to-brand-200 opacity-20"></div>
                </div>
            </div>
        </section>
    )
}
