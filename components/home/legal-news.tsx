import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { NewsCard } from '@/components/news/news-card'
import { getPublishedNewsItems, getNewsPage } from '@/lib/news-data'
import { shouldUseNewsFixtures } from '@/lib/news-preview'
import { ArrowRight } from 'lucide-react'

interface LegalNewsProps {
    /** Honour the same ?preview=fixtures switch as /news. Production ignores it. */
    preview?: boolean
}

export async function LegalNews({ preview = false }: LegalNewsProps) {
    // The query flag is opt-in. Vercel preview deploys still read live news
    // unless that flag is set, so sample cards do not replace published items.
    const explicitFixtures = preview && shouldUseNewsFixtures(true)
    let items = explicitFixtures
        ? (await getNewsPage({ limit: 3, preview: true })).items
        : await getPublishedNewsItems({ limit: 3 })
    let showingFixtures = explicitFixtures && items.length > 0

    // Local preview only, and only when the live read comes back empty.
    const localPreview =
        process.env.VERCEL_ENV !== 'production' && process.env.NODE_ENV !== 'production'
    if (!explicitFixtures && items.length === 0 && localPreview) {
        items = (await getNewsPage({ limit: 3, preview: true })).items
        showingFixtures = items.length > 0
    }

    if (items.length === 0) {
        return null
    }

    return (
        <section className="bg-white py-16" aria-labelledby="legal-news-heading">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-10">
                    <h2 id="legal-news-heading" className="mb-3 text-3xl font-bold text-brand sm:text-4xl">
                        Legal News
                    </h2>
                    <p className="max-w-2xl text-lg text-slate-600">
                        The latest deals, decisions and developments.
                    </p>
                    {showingFixtures && (
                        <p className="mt-2 text-sm text-slate-500">Sample preview. Not live news.</p>
                    )}
                </div>

                <ul className="mb-10 grid list-none grid-cols-1 items-start gap-4 lg:grid-cols-3">
                    {items.map((item) => (
                        <li key={item.id} className="flex min-w-0">
                            <NewsCard item={item} headingLevel="h3" />
                        </li>
                    ))}
                </ul>

                <div>
                    <Link href="/news">
                        <Button size="lg">
                            See all news
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
