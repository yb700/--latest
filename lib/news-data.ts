import { createClient } from '@/lib/supabase/server'
import { NewsCategorySlug } from '@/lib/news-categories'
import { blogPostPath, NEWS_PAGE_SIZE, type NewsListItem } from '@/lib/news'
import { previewNewsItems, shouldUseNewsFixtures } from '@/lib/news-preview'
import { NewsItem } from '@/lib/supabase/types'

/** Next throws this while prerendering a page that reads cookies. It must keep propagating. */
function rethrowIfNextDynamic(error: unknown): void {
    if (
        error &&
        typeof error === 'object' &&
        'digest' in error &&
        (error as { digest?: string }).digest === 'DYNAMIC_SERVER_USAGE'
    ) {
        throw error
    }
}

export async function getPublishedNewsItems(options?: {
    category?: NewsCategorySlug
    limit?: number
}): Promise<NewsListItem[]> {
    const { items } = await getNewsPage({
        category: options?.category ?? null,
        offset: 0,
        limit: options?.limit ?? NEWS_PAGE_SIZE,
        preview: false,
    })

    return items
}

export async function getNewsPage(options?: {
    category?: NewsCategorySlug | null
    offset?: number
    limit?: number
    preview?: boolean
}): Promise<{ items: NewsListItem[]; hasMore: boolean }> {
    const limit = options?.limit && options.limit > 0 ? Math.floor(options.limit) : NEWS_PAGE_SIZE
    const offset = options?.offset && options.offset > 0 ? Math.floor(options.offset) : 0
    const category = options?.category ?? null
    const useFixtures = Boolean(options?.preview) && shouldUseNewsFixtures(true)

    const { rows, hasMore } = useFixtures
        ? slicePreviewNews(category, offset, limit)
        : await fetchPublishedNewsRows(category, offset, limit)

    return {
        items: await attachRelatedPostTitles(rows),
        hasMore,
    }
}

function slicePreviewNews(
    category: NewsCategorySlug | null,
    offset: number,
    limit: number
): { rows: NewsItem[]; hasMore: boolean } {
    const filtered = previewNewsItems(category)
    const rows = filtered.slice(offset, offset + limit + 1)
    return {
        rows: rows.slice(0, limit),
        hasMore: rows.length > limit,
    }
}

async function fetchPublishedNewsRows(
    category: NewsCategorySlug | null,
    offset: number,
    limit: number
): Promise<{ rows: NewsItem[]; hasMore: boolean }> {
    try {
        const supabase = createClient()

        let query = supabase
            .from('news_items')
            .select('*')
            .eq('is_published', true)
            .order('published_at', { ascending: false })

        if (category) {
            query = query.eq('category', category)
        }

        const { data, error } = await query.range(offset, offset + limit)

        if (error) {
            console.error('Error fetching news items:', error.message)
            return { rows: [], hasMore: false }
        }

        const rows = data ?? []
        return {
            rows: rows.slice(0, limit),
            hasMore: rows.length > limit,
        }
    } catch (error) {
        rethrowIfNextDynamic(error)
        console.error('Error fetching news items:', error)
        return { rows: [], hasMore: false }
    }
}

/** One query for this page of slugs, then match titles in code. */
async function attachRelatedPostTitles(items: NewsItem[]): Promise<NewsListItem[]> {
    const slugs = Array.from(
        new Set(
            items
                .map((item) => item.related_post_slug?.trim() ?? '')
                .filter((slug) => blogPostPath(slug) !== null)
        )
    )
    const titles = await fetchPublishedPostTitles(slugs)

    return items.map((item) => {
        const slug = item.related_post_slug?.trim() ?? ''
        return {
            ...item,
            relatedPostTitle: titles.get(slug) ?? null,
        }
    })
}

async function fetchPublishedPostTitles(slugs: string[]): Promise<Map<string, string>> {
    const titles = new Map<string, string>()
    if (slugs.length === 0) return titles

    try {
        const supabase = createClient()
        const { data, error } = await supabase
            .from('posts')
            .select('slug, title')
            .eq('status', 'published')
            .in('slug', slugs)

        if (error) {
            console.error('Error fetching related post titles:', error.message)
            return titles
        }

        for (const post of data ?? []) {
            if (post.slug && post.title) {
                titles.set(post.slug, post.title)
            }
        }
    } catch (error) {
        rethrowIfNextDynamic(error)
        console.error('Error fetching related post titles:', error)
    }

    return titles
}
