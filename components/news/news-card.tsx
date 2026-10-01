import Link from 'next/link'
import { newsCategoryLabel } from '@/lib/news-categories'
import { blogPostPath, safeHttpUrl } from '@/lib/news'
import { formatUkDate } from '@/lib/news'
import { NewsItem } from '@/lib/supabase/types'
import { NewsCardImage } from '@/components/news/news-card-image'

interface NewsCardProps {
    item: NewsItem
    headingLevel?: 'h2' | 'h3'
}

const linkClassName =
    'rounded-sm font-medium text-white underline underline-offset-2 hover:text-brand-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand'

export function NewsCard({ item, headingLevel = 'h2' }: NewsCardProps) {
    const Heading = headingLevel
    const imageUrl = safeHttpUrl(item.image_url)
    const sourceUrl = safeHttpUrl(item.source_url)
    const analysisPath = blogPostPath(item.related_post_slug)
    const whyItMatters = item.why_it_matters?.trim()
    const published = formatUkDate(item.published_at)

    return (
        <article className="relative flex h-full min-h-[20rem] flex-col overflow-hidden rounded-2xl bg-brand p-5 text-white shadow-sm sm:p-6">
            {imageUrl && <NewsCardImage src={imageUrl} />}

            <div className="relative flex h-full flex-col gap-3">
                <p className="w-fit rounded-md bg-red-700 px-2 py-1 text-[11px] font-bold tracking-[0.14em] text-white">
                    NEWS
                </p>

                <Heading className="text-lg font-bold uppercase leading-snug tracking-wide sm:text-xl">
                    {item.headline}
                </Heading>

                <p className="text-sm leading-relaxed text-white/95">{item.summary}</p>

                {whyItMatters && (
                    <p className="text-sm leading-relaxed text-white">
                        <span className="font-semibold">Why it matters: </span>
                        {whyItMatters}
                    </p>
                )}

                <div className="mt-auto space-y-2 pt-3 text-sm">
                    {sourceUrl ? (
                        <p>
                            <a
                                href={sourceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={linkClassName}
                            >
                                Source: {item.source_name}
                            </a>
                        </p>
                    ) : (
                        <p>Source: {item.source_name}</p>
                    )}

                    <p className="text-white/85">
                        <time dateTime={item.published_at}>{published}</time>
                        <span aria-hidden="true"> · </span>
                        <span>{newsCategoryLabel(item.category)}</span>
                    </p>

                    {analysisPath && (
                        <p>
                            <Link href={analysisPath} className={linkClassName}>
                                Read the full analysis
                            </Link>
                        </p>
                    )}
                </div>
            </div>
        </article>
    )
}
