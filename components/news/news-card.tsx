import Link from 'next/link'
import { newsCategoryShortLabel } from '@/lib/news-categories'
import { blogPostPath, formatNewsCardDate, safeHttpUrl, type NewsListItem } from '@/lib/news'
import { cn } from '@/lib/utils'

interface NewsCardProps {
    item: NewsListItem
    headingLevel?: 'h2' | 'h3'
    /** Feed cards snap and, on a phone, share the space under the header. */
    layout?: 'feed' | 'block'
}

export function NewsCard({ item, headingLevel = 'h2', layout = 'block' }: NewsCardProps) {
    const Heading = headingLevel
    const sourceUrl = safeHttpUrl(item.source_url)
    const relatedHref = blogPostPath(item.related_post_slug)
    const relatedTitle = item.relatedPostTitle?.trim() ?? ''
    const showRelated = Boolean(relatedHref && relatedTitle)
    const published = formatNewsCardDate(item.published_at)

    return (
        <article
            className={cn(
                'flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-gray-200 border-l-[3px] border-l-brand bg-white',
                layout === 'feed' && 'news-card-feed'
            )}
        >
            <div className="flex h-full min-h-0 flex-col gap-1.5 p-3 md:gap-2 md:p-4">
                <p className="text-[11px] font-medium uppercase tracking-wide text-gray-500">
                    <span>{newsCategoryShortLabel(item.category)}</span>
                    {published && (
                        <>
                            <span aria-hidden="true"> · </span>
                            <time dateTime={item.published_at}>{published}</time>
                        </>
                    )}
                </p>

                <Heading className="line-clamp-2 min-w-0 text-base font-bold uppercase leading-snug text-brand">
                    {item.headline}
                </Heading>

                <p className="line-clamp-3 min-w-0 text-sm leading-snug text-gray-700 md:line-clamp-2">
                    {item.summary}
                </p>

                <div className="mt-auto space-y-1 pt-1">
                    <p className="truncate text-xs text-gray-500">
                        {sourceUrl ? (
                            <a
                                href={sourceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline underline-offset-2 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                            >
                                Source: {item.source_name}
                            </a>
                        ) : (
                            <>Source: {item.source_name}</>
                        )}
                    </p>

                    {showRelated && relatedHref && (
                        <p className="line-clamp-2 text-sm font-bold leading-snug text-brand">
                            <Link
                                href={relatedHref}
                                className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                            >
                                Related post: {relatedTitle} →
                            </Link>
                        </p>
                    )}
                </div>
            </div>
        </article>
    )
}
