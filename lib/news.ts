import { NewsItem } from '@/lib/supabase/types'

export const NEWS_PAGE_SIZE = 20

export type NewsListItem = NewsItem & {
    relatedPostTitle: string | null
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

/** Card date, for example 1 OCT 2026. */
export function formatNewsCardDate(value: string): string {
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return ''

    const parts = new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        timeZone: 'Europe/London',
    }).formatToParts(date)

    const day = parts.find((part) => part.type === 'day')?.value ?? ''
    const year = parts.find((part) => part.type === 'year')?.value ?? ''
    const monthRaw = (parts.find((part) => part.type === 'month')?.value ?? '').replace(/\./g, '')
    const month = monthRaw.toLowerCase() === 'sept' ? 'SEP' : monthRaw.toUpperCase()

    return `${day} ${month} ${year}`
}

/** Blog slugs are a single path segment. Anything else is not linked. */
export function blogPostPath(slug: string | null | undefined): string | null {
    if (!slug) return null
    const trimmed = slug.trim()
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/i.test(trimmed)) return null
    return `/blog/${trimmed}`
}
