import { NewsCategorySlug } from '@/lib/news-categories'
import { NewsItem } from '@/lib/supabase/types'

/**
 * Local preview fixtures for the Legal News feed.
 * They are not inserted into news_items and they are not live news.
 * The live production site never uses them.
 */
const PREVIEW_NEWS_ITEMS: readonly NewsItem[] = [
    {
        id: 'preview-man-city',
        headline: 'Man City found guilty of all serious financial charges',
        summary:
            'An independent commission found City broke Premier League financial rules for nine seasons. The club will appeal and sanctions are still to be decided.',
        why_it_matters: 'Sample note that must stay off the card.',
        source_name: 'Premier League',
        source_url: 'https://www.premierleague.com/',
        category: 'sports-deals-regulation',
        image_url: null,
        related_post_slug: null,
        published_at: '2026-10-01T08:00:00.000Z',
        is_published: true,
        created_at: '2026-10-01T08:00:00.000Z',
        updated_at: '2026-10-01T08:00:00.000Z',
    },
    {
        id: 'preview-related-post',
        headline: 'Sample card for the related post link',
        summary: 'This sample is here so the related post link can be checked. It is not a live news item.',
        why_it_matters: 'Sample note that must stay off the card.',
        source_name: 'Sample source',
        source_url: 'https://example.com/sample-news-source',
        category: 'mergers-acquisitions',
        image_url: null,
        related_post_slug: 'ai-in-law-firms',
        published_at: '2026-09-30T08:00:00.000Z',
        is_published: true,
        created_at: '2026-09-30T08:00:00.000Z',
        updated_at: '2026-09-30T08:00:00.000Z',
    },
    {
        id: 'preview-missing-post',
        headline: 'Sample headline that keeps going so the card cuts it off after two lines',
        summary:
            'This sample summary is deliberately long so the card can be checked for an ellipsis. It is not a real story and it must not be published. The extra sentences are only here to spill past three lines on a phone and two lines on a desktop screen.',
        why_it_matters: 'Sample note that must stay off the card.',
        source_name: 'Sample source',
        source_url: 'https://example.com/sample-news-source',
        category: 'banking-finance',
        image_url: null,
        related_post_slug: 'sample-slug-not-published',
        published_at: '2026-09-29T08:00:00.000Z',
        is_published: true,
        created_at: '2026-09-29T08:00:00.000Z',
        updated_at: '2026-09-29T08:00:00.000Z',
    },
]

export function previewNewsItems(category?: NewsCategorySlug | null): NewsItem[] {
    return PREVIEW_NEWS_ITEMS
        .filter((item) => !category || item.category === category)
        .slice()
        .sort((a, b) => b.published_at.localeCompare(a.published_at))
}

/**
 * Fixtures are for local checks and Vercel preview deploys.
 * A production deploy ignores them even if the query is present.
 */
export function shouldUseNewsFixtures(requested: boolean): boolean {
    if (process.env.VERCEL_ENV === 'production') return false
    if (process.env.VERCEL_ENV === 'preview') return true
    if (process.env.NEWS_PREVIEW_FIXTURES === '1') return true
    return requested && process.env.NODE_ENV !== 'production'
}
