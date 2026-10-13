import Link from 'next/link'
import { NewsCard } from '@/components/news/news-card'
import { getPublishedNewsItems, getNewsPage } from '@/lib/news-data'
import { shouldUseNewsFixtures } from '@/lib/news-preview'

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
        <section className="bg-[#FAF9F7] pt-16" aria-labelledby="legal-news-heading">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8 max-w-[720px]">
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8A8780]">
                        Legal News
                    </p>
                    <h2 id="legal-news-heading" className="text-3xl font-semibold tracking-[-0.5px] text-[#151515] sm:text-4xl">
                        The latest developments
                    </h2>
                    {showingFixtures && (
                        <p className="mt-2 text-sm text-[#8A8780]">Sample preview. Not live news.</p>
                    )}
                </div>

                <ul className="mb-8 max-w-[720px] list-none space-y-4">
                    {items.map((item) => (
                        <li key={item.id}>
                            <NewsCard item={item} headingLevel="h3" />
                        </li>
                    ))}
                </ul>

                <Link href="/news" className="text-sm font-semibold text-[#151515] underline underline-offset-4">
                    See all news
                </Link>
            </div>
        </section>
    )
}
