import { isBlogCategorySlug, sectionSlugForTitle, type BlogCategorySlug } from '@/lib/blog-categories'

/** One sentence on the blog card. About 80 characters or fewer. */
export const SHORT_PREVIEW_MAX = 80

export const PINNED_FEATURED_POST_SETTING = 'pinned_featured_post_id'

const WORDS_PER_MINUTE = 200

export type BlogListPost = {
    id: string
    title: string
    slug: string
    excerpt: string | null
    shortPreview: string | null
    content: string
    heroImageUrl: string | null
    publishedAt: string | null
    createdAt: string
    categorySlug: BlogCategorySlug | null
}

type CategoryEmbed = { slug?: string | null } | null

export type BlogPostSource = {
    id: string
    title: string
    slug: string
    excerpt?: string | null
    short_preview?: string | null
    content_md?: string | null
    content?: string | null
    hero_image_url?: string | null
    published_at?: string | null
    created_at: string
    post_categories?: unknown
}

export function normalizeShortPreview(
    value: unknown
): { ok: true; value: string | null } | { ok: false; error: string } {
    if (value == null) return { ok: true, value: null }
    if (typeof value !== 'string') {
        return { ok: false, error: 'Short preview must be text.' }
    }

    const trimmed = value.trim().replace(/\s+/g, ' ')
    if (!trimmed) return { ok: true, value: null }
    if (trimmed.length > SHORT_PREVIEW_MAX) {
        return { ok: false, error: 'Short preview must be 80 characters or fewer.' }
    }

    return { ok: true, value: trimmed }
}

export function countWords(text: string): number {
    const trimmed = text.trim()
    if (!trimmed) return 0
    return trimmed.split(/\s+/).length
}

/** Rounded up. At least one minute so an empty body still has a read time. */
export function readingMinutes(wordCount: number): number {
    if (wordCount <= 0) return 1
    return Math.ceil(wordCount / WORDS_PER_MINUTE)
}

export function readingMinutesFromContent(content: string): number {
    return readingMinutes(countWords(content))
}

/** UK calendar date as days since 1970-01-01. Changes at midnight in London. */
export function ukDayNumber(now: Date): number {
    const parts = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/London',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).formatToParts(now)

    const year = Number(parts.find((part) => part.type === 'year')?.value)
    const month = Number(parts.find((part) => part.type === 'month')?.value)
    const day = Number(parts.find((part) => part.type === 'day')?.value)

    return Math.floor(Date.UTC(year, month - 1, day) / 86_400_000)
}

function modulo(value: number, count: number): number {
    return ((value % count) + count) % count
}

/**
 * Walk published posts newest-first, one step per UK day, then wrap.
 * Consecutive days pick different posts whenever more than one post is published.
 */
export function selectRotatedPost<T extends { id: string }>(
    postsNewestFirst: readonly T[],
    ukDay: number
): T | null {
    const count = postsNewestFirst.length
    if (count === 0) return null
    if (count === 1) return postsNewestFirst[0]

    const index = modulo(ukDay, count)
    const previousIndex = modulo(ukDay - 1, count)
    if (postsNewestFirst[index].id === postsNewestFirst[previousIndex].id) {
        return postsNewestFirst[modulo(index + 1, count)]
    }

    return postsNewestFirst[index]
}

export function comparePostsNewestFirst(
    a: { id: string; publishedAt: string | null; createdAt: string },
    b: { id: string; publishedAt: string | null; createdAt: string }
): number {
    const aPublished = Date.parse(a.publishedAt ?? a.createdAt)
    const bPublished = Date.parse(b.publishedAt ?? b.createdAt)
    if (aPublished !== bPublished) return bPublished - aPublished

    const aCreated = Date.parse(a.createdAt)
    const bCreated = Date.parse(b.createdAt)
    if (aCreated !== bCreated) return bCreated - aCreated

    if (a.id === b.id) return 0
    return a.id < b.id ? 1 : -1
}

export function resolveFeaturedPostId(
    postsNewestFirst: readonly { id: string }[],
    ukDay: number,
    pinnedId: string | null
): string | null {
    if (pinnedId && postsNewestFirst.some((post) => post.id === pinnedId)) {
        return pinnedId
    }

    return selectRotatedPost(postsNewestFirst, ukDay)?.id ?? null
}

/** Full UK date, for example 27 Oct 2025. */
export function formatBlogCardDate(iso: string): string {
    const date = new Date(iso)
    if (Number.isNaN(date.getTime())) return ''

    const parts = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/London',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    }).formatToParts(date)

    const day = parts.find((part) => part.type === 'day')?.value ?? ''
    const year = parts.find((part) => part.type === 'year')?.value ?? ''
    const monthRaw = (parts.find((part) => part.type === 'month')?.value ?? '').replace(/\./g, '')
    const month =
        monthRaw.toLowerCase() === 'sept'
            ? 'Sep'
            : `${monthRaw.charAt(0).toUpperCase()}${monthRaw.slice(1).toLowerCase()}`

    return `${day} ${month} ${year}`
}

export function formatBlogCardMeta(iso: string, minutes: number): string {
    return `${formatBlogCardDate(iso)} · ${minutes} min read`
}

export function blogCardDateIso(post: { publishedAt: string | null; createdAt: string }): string {
    return post.publishedAt || post.createdAt
}

export function cardPreview(post: {
    shortPreview: string | null
    excerpt: string | null
}): { text: string; limitToTwoLines: boolean } | null {
    if (post.shortPreview) {
        return { text: post.shortPreview, limitToTwoLines: false }
    }

    if (post.excerpt) {
        return { text: post.excerpt, limitToTwoLines: true }
    }

    return null
}

export function usablePostImage(url: string | null | undefined): string | null {
    if (!url) return null
    const trimmed = url.trim()
    if (!trimmed) return null
    if (trimmed.startsWith('/') && !trimmed.startsWith('//')) return trimmed

    try {
        const parsed = new URL(trimmed)
        if (parsed.protocol === 'http:' || parsed.protocol === 'https:') return trimmed
    } catch {
        return null
    }

    return null
}

export function categorySlugFromEmbed(postCategories: unknown): BlogCategorySlug | null {
    if (!Array.isArray(postCategories)) return null

    for (const entry of postCategories) {
        if (!entry || typeof entry !== 'object') continue
        const categories = (entry as { categories?: CategoryEmbed | CategoryEmbed[] }).categories
        const list = Array.isArray(categories) ? categories : categories ? [categories] : []

        for (const category of list) {
            const slug = category?.slug
            if (typeof slug === 'string' && isBlogCategorySlug(slug)) return slug
        }
    }

    return null
}

export function toBlogListPost(source: BlogPostSource): BlogListPost {
    const excerpt = source.excerpt?.trim() ? source.excerpt.trim() : null
    const shortPreview = source.short_preview?.trim()
        ? source.short_preview.trim().replace(/\s+/g, ' ')
        : null

    return {
        id: source.id,
        title: source.title,
        slug: source.slug,
        excerpt,
        shortPreview,
        content: source.content_md ?? source.content ?? '',
        heroImageUrl: usablePostImage(source.hero_image_url),
        publishedAt: source.published_at ?? null,
        createdAt: source.created_at,
        categorySlug: categorySlugFromEmbed(source.post_categories) ?? sectionSlugForTitle(source.title),
    }
}

export function blogFilterHref(category: BlogCategorySlug | null, search: string): string {
    const params = new URLSearchParams()
    if (category) params.set('category', category)
    if (search) params.set('search', search)
    const query = params.toString()
    return query ? `/blog?${query}` : '/blog'
}
