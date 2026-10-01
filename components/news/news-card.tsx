import Link from 'next/link'
import { newsCategoryLabel, newsCategoryShortLabel } from '@/lib/news-categories'
import { blogPostPath, formatNewsCardDate, safeHttpUrl, type NewsListItem } from '@/lib/news'
import { cn } from '@/lib/utils'

/** Local photos are tied to one headline each. They are not shared between stories. */
const STORY_IMAGES: Record<string, string> = {
    'BT opens government talks over possible TalkTalk bid': '/news/bt-tower-dusk.jpg',
    'Bank of England warns financial stability risks have risen': '/news/bank-of-england.webp',
    'Manchester City found guilty of Premier League financial breaches': '/news/manchester-city-etihad.jpg',
}

const AREA_PILL: Record<string, string> = {
    'mergers-acquisitions': 'bg-rose-600 text-white',
    'banking-finance': 'bg-blue-600 text-white',
    'competition-regulation': 'bg-purple-600 text-white',
    'sports-deals-regulation': 'bg-green-600 text-white',
}

interface NewsCardProps {
    item: NewsListItem
    headingLevel?: 'h2' | 'h3'
    /** Feed cards snap to the top of the news page. */
    layout?: 'feed' | 'block'
}

function cardImageSrc(item: NewsListItem): string | null {
    return STORY_IMAGES[item.headline.trim()] ?? safeHttpUrl(item.image_url)
}

export function NewsCard({ item, headingLevel = 'h2', layout = 'block' }: NewsCardProps) {
    const Heading = headingLevel
    const sourceUrl = safeHttpUrl(item.source_url)
    const relatedHref = blogPostPath(item.related_post_slug)
    const relatedTitle = item.relatedPostTitle?.trim() ?? ''
    const showRelated = Boolean(relatedHref && relatedTitle)
    const published = formatNewsCardDate(item.published_at)
    const imageSrc = cardImageSrc(item)
    const areaLabel = newsCategoryLabel(item.category)

    return (
        <article
            className={cn(
                'flex h-full w-full min-h-0 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg',
                layout === 'feed' && 'news-card-feed'
            )}
        >
            <div className="relative aspect-video w-full overflow-hidden bg-brand">
                {imageSrc ? (
                    // The Man City file is a local public asset. Other photos may be publisher URLs.
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={imageSrc}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                ) : (
                    <p className="absolute inset-0 flex items-center justify-center px-6 text-center text-lg font-semibold text-white">
                        {areaLabel}
                    </p>
                )}
                <div className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-brand text-xs font-bold text-white ring-2 ring-white">
                    CL
                </div>
            </div>

            <div className="flex h-full min-h-0 flex-col gap-2 p-4">
                <div className="flex items-center justify-between gap-3">
                    <span
                        className={cn(
                            'shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium',
                            AREA_PILL[item.category] ?? 'bg-slate-600 text-white'
                        )}
                    >
                        {newsCategoryShortLabel(item.category)}
                    </span>
                    {published && (
                        <time dateTime={item.published_at} className="shrink-0 text-xs text-gray-500">
                            {published}
                        </time>
                    )}
                </div>

                <Heading className="line-clamp-2 min-w-0 text-lg font-bold leading-snug text-brand">
                    {item.headline}
                </Heading>

                <p className="line-clamp-2 min-w-0 text-sm leading-snug text-gray-500">
                    {item.summary}
                </p>

                <div className="mt-auto flex items-center justify-between gap-3 border-t border-gray-200 pt-3">
                    <p className="min-w-0 truncate text-xs text-gray-500">
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
                        <Link
                            href={relatedHref}
                            className="shrink-0 text-sm font-semibold text-brand hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                        >
                            Read more
                        </Link>
                    )}
                </div>
            </div>
        </article>
    )
}
