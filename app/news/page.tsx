import { Metadata } from 'next'
import { EmptyState } from '@/components/empty-state'
import { NewsFeed } from '@/components/news/news-feed'
import { NewsToolbar } from '@/components/news/news-toolbar'
import { NEWS_PAGE_SIZE } from '@/lib/news'
import { getNewsPage } from '@/lib/news-data'
import { isNewsCategorySlug, newsCategoryLabel } from '@/lib/news-categories'
import { shouldUseNewsFixtures } from '@/lib/news-preview'

const description =
    'Legal News from ClearCut Law: the latest deals, decisions and regulatory developments in mergers, banking, sport and competition.'

export const metadata: Metadata = {
    title: 'Legal News | ClearCut Law',
    description,
    openGraph: {
        title: 'Legal News | ClearCut Law',
        description,
    },
    twitter: {
        title: 'Legal News | ClearCut Law',
        description,
    },
}

export default async function NewsPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const categoryParam = typeof searchParams.category === 'string' ? searchParams.category : ''
    const category = isNewsCategorySlug(categoryParam) ? categoryParam : null
    const preview = shouldUseNewsFixtures(searchParams.preview === 'fixtures')
    const { items, hasMore } = await getNewsPage({
        category,
        offset: 0,
        limit: NEWS_PAGE_SIZE,
        preview,
    })

    return (
        <div>
            <NewsToolbar selected={category} preview={preview} />

            {items.length === 0 ? (
                <EmptyState
                    title={category ? 'No items in this category' : 'No Legal News yet'}
                    description={
                        category
                            ? `Nothing has been published under ${newsCategoryLabel(category)} yet.`
                            : 'Published Legal News items will appear here.'
                    }
                />
            ) : (
                <NewsFeed
                    key={`${category ?? 'all'}-${preview ? 'preview' : 'live'}`}
                    initialItems={items}
                    initialHasMore={hasMore}
                    category={category}
                    preview={preview}
                />
            )}
        </div>
    )
}
