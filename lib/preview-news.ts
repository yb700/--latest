import { NewsItem } from '@/lib/supabase/types'

/**
 * Preview-only Legal News.
 * The news_items migration has not been applied. These rows are not written
 * to Supabase and are not read from it.
 *
 * source_url is required on news items. The Premier League homepage is used
 * because that field needs a link, not because a story URL was supplied.
 */
export const PREVIEW_NEWS_ITEMS: NewsItem[] = [
    {
        id: 'preview-man-city-financial-charges',
        headline: 'Man City found guilty of all serious financial charges',
        summary:
            'An independent commission found City broke Premier League financial rules for nine seasons. The club will appeal and sanctions are still to be decided.',
        why_it_matters: null,
        source_name: 'Premier League',
        source_url: 'https://www.premierleague.com/',
        category: 'sports-deals-regulation',
        image_url: null,
        related_post_slug: null,
        published_at: '2026-10-01T12:00:00.000Z',
        is_published: true,
        created_at: '2026-10-01T12:00:00.000Z',
        updated_at: '2026-10-01T12:00:00.000Z',
    },
]
