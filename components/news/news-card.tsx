'use client'

import { useState } from 'react'
import { newsCategoryLabel, newsCategoryShortLabel } from '@/lib/news-categories'
import { formatNewsCardDate, safeHttpUrl, type NewsListItem } from '@/lib/news'
import { BrandMark } from '@/components/layout/brand-logo'
import { cn } from '@/lib/utils'

/** Local photos are tied to one headline each. They are not shared between stories. */
const STORY_IMAGES: Record<string, string> = {
    'BT opens government talks over possible TalkTalk bid': '/news/bt-tower-dusk.jpg',
    'Bank of England warns financial stability risks have risen': '/news/bank-of-england.webp',
    'Manchester City found guilty of Premier League financial breaches': '/news/manchester-city-etihad.jpg',
    'UEFA Receives Real Madrid Dossier in Negreira Case': '/news/barcelona-negreira.jpg',
}

const BT_TOWER_SRC = '/news/bt-tower-dusk.jpg'

/**
 * The BT crop is 1200×1200. Homepage and /news share this card, and the
 * frame stays 16:9 with the other photos. Cover fills that frame edge to
 * edge. The square is pinned to the top so the mast and the BT sign stay
 * in the frame; the extra height is the only part left outside it.
 */
const BT_TOWER_FIT = 'object-cover object-top'

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
    const [expanded, setExpanded] = useState(false)
    const published = formatNewsCardDate(item.published_at)
    const imageSrc = cardImageSrc(item)
    const areaLabel = newsCategoryLabel(item.category)
    const isBtTower = imageSrc === BT_TOWER_SRC
    const summaryId = `news-story-${item.id}`
    const sourceUrl = safeHttpUrl(item.source_url)

    return (
        <article
            className={cn(
                'relative flex h-full w-full min-h-0 flex-col overflow-hidden rounded-xl border border-[#E6E8EC] bg-white',
                layout === 'feed' && 'news-card-feed'
            )}
        >
            <button
                type="button"
                aria-expanded={expanded}
                aria-controls={summaryId}
                onClick={() => setExpanded((open) => !open)}
                className="absolute inset-0 z-10 cursor-pointer rounded-xl bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand"
            >
                <span className="sr-only">
                    {expanded ? 'Show less' : 'Show more'}: {item.headline}
                </span>
            </button>

            <div className="relative aspect-video w-full overflow-hidden bg-[#F7F8FA]">
                {imageSrc ? (
                    // The Man City file is a local public asset. Other photos may be publisher URLs.
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={imageSrc}
                        alt=""
                        className={cn(
                            'absolute inset-0 h-full w-full',
                            isBtTower ? BT_TOWER_FIT : 'object-cover'
                        )}
                    />
                ) : (
                    <p className="absolute inset-0 flex items-center justify-center px-6 text-center text-sm font-semibold uppercase tracking-wide text-[#5A6270]">
                        {areaLabel}
                    </p>
                )}
                {imageSrc ? (
                    <div className="pointer-events-none absolute left-3 top-3 rounded-md bg-white px-1.5 py-1">
                        <BrandMark className="block h-7 w-auto" />
                    </div>
                ) : null}
            </div>

            <div className="flex h-full min-h-0 flex-col gap-2 p-4">
                <div className="flex items-start justify-between gap-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-[#8A92A3]">
                        {newsCategoryShortLabel(item.category)}
                    </p>
                    {published ? (
                        <time dateTime={item.published_at} className="shrink-0 text-xs text-[#8A92A3]">
                            {published}
                        </time>
                    ) : null}
                </div>

                <Heading className="line-clamp-2 min-w-0 text-lg font-bold leading-snug text-[#14213D]">
                    {item.headline}
                </Heading>

                <p
                    id={summaryId}
                    className={cn(
                        'min-w-0 text-sm leading-snug text-[#5A6270]',
                        !expanded && 'line-clamp-2'
                    )}
                >
                    {item.summary}
                </p>

                {sourceUrl ? (
                    <a
                        href={sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative z-20 mt-auto w-fit text-sm font-semibold text-[#14213D] hover:underline"
                    >
                        Read on {item.source_name}
                    </a>
                ) : (
                    <p className="mt-auto text-sm font-semibold text-[#14213D]">Read on {item.source_name}</p>
                )}
            </div>
        </article>
    )
}
