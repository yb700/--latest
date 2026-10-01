export function HeroSection() {
    return (
        <section className="bg-slate-50 py-12 sm:py-16" aria-labelledby="intro-heading">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl">
                    <h1 id="intro-heading" className="text-2xl font-semibold leading-snug text-brand sm:text-3xl">
                        Plain English commentary on UK deals, finance, competition and sport, written by a law graduate.
                    </h1>
                    <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
                        This is a commentary site, not a law firm.
                    </p>
                </div>
            </div>
        </section>
    )
}
