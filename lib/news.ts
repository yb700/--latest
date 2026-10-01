import { NewsCategorySlug } from '@/lib/news-categories'
import { PREVIEW_NEWS_ITEMS } from '@/lib/preview-news'
import { NewsItem } from '@/lib/supabase/types'

/**
 * Published Legal News for the site.
 * The news_items table still exists only as an unapplied migration, so this
 * returns the local preview rows and does not query Supabase.
 */
export async function getPublishedNewsItems(options?: {
    category?: NewsCategorySlug
    limit?: number
}): Promise<NewsItem[]> {
    let items = PREVIEW_NEWS_ITEMS.filter((item) => item.is_published)

    if (options?.category) {
        items = items.filter((item) => item.category === options.category)
    }

    items.sort((a, b) => b.published_at.localeCompare(a.published_at))

    if (options?.limit) {
        items = items.slice(0, options.limit)
    }

    return items
}

/** Only http(s) URLs are turned into links or image sources. */
export function safeHttpUrl(value: string | null | undefined): string | null {
    if (!value) return null

    try {
        const url = new URL(value.trim())
        if (url.protocol === 'http:' || url.protocol === 'https:') {
            return url.toString()
        }
    } catch {
        return null
    }

    return null
}

/** UK calendar date, for example 1 October 2026. */
export function formatUkDate(value: string): string {
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return ''

    return new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'Europe/London',
    }).format(date)
}

/** Blog slugs are a single path segment. Anything else is not linked. */
export function blogPostPath(slug: string | null | undefined): string | null {
    if (!slug) return null
    const trimmed = slug.trim()
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/i.test(trimmed)) return null
    return `/blog/${trimmed}`
}
