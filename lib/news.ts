import { createClient } from '@/lib/supabase/server'
import { NewsCategorySlug } from '@/lib/news-categories'
import { NewsItem } from '@/lib/supabase/types'

export async function getPublishedNewsItems(options?: {
    category?: NewsCategorySlug
    limit?: number
}): Promise<NewsItem[]> {
    const supabase = createClient()

    let query = supabase
        .from('news_items')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false })

    if (options?.category) {
        query = query.eq('category', options.category)
    }

    if (options?.limit) {
        query = query.limit(options.limit)
    }

    const { data, error } = await query

    if (error) {
        console.error('Error fetching news items:', error.message)
        return []
    }

    return data ?? []
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
