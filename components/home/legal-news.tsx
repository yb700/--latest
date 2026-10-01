import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { NewsCard } from '@/components/news/news-card'
import { getPublishedNewsItems } from '@/lib/news'
import { ArrowRight } from 'lucide-react'

export async function LegalNews() {
    const items = await getPublishedNewsItems({ limit: 3 })

    if (items.length === 0) {
        return null
    }

    return (
        <section className="bg-white py-20" aria-labelledby="legal-news-heading">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <h2 id="legal-news-heading" className="mb-4 text-3xl font-bold text-brand sm:text-4xl">
                        Legal News
                    </h2>
                    <p className="mx-auto max-w-2xl text-xl text-slate-600">
                        The latest deals, decisions and developments.
                    </p>
                </div>

                <ul className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {items.map((item) => (
                        <li key={item.id} className="h-full">
                            <NewsCard item={item} headingLevel="h3" />
                        </li>
                    ))}
                </ul>

                <div className="text-center">
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
