import { Metadata } from 'next'
import { EmptyState } from '@/components/empty-state'
import { NewsFeed } from '@/components/news/news-feed'
import { NewsToolbar } from '@/components/news/news-toolbar'
import { NEWS_PAGE_SIZE } from '@/lib/news'
import { getNewsPage } from '@/lib/news-data'
import { isNewsCategorySlug, newsCategoryLabel } from '@/lib/news-categories'
import { shouldUseNewsFixtures } from '@/lib/news-preview'
import { SITE_SHARE_IMAGE } from '@/lib/site-copy'

const description =
    'Legal News from ClearCut Law: the latest deals, decisions and regulatory developments in mergers, banking, sport and competition.'

export const metadata: Metadata = {
    title: 'Legal News | ClearCut Law',
    description,
    openGraph: {
        title: 'Legal News | ClearCut Law',
        description,
        images: [SITE_SHARE_IMAGE],
    },
    twitter: {
        title: 'Legal News | ClearCut Law',
        description,
        images: [SITE_SHARE_IMAGE.url],
    },
}

export default async function NewsPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const categoryParam = typeof searchParams.category === 'string' ? searchParams.category : ''
    const category = isNewsCategorySlug(categoryParam) ? categoryParam : null
    const search = typeof searchParams.search === 'string' ? searchParams.search : ''
    const preview = shouldUseNewsFixtures(searchParams.preview === 'fixtures')
    const { items, hasMore } = await getNewsPage({
        category,
        offset: 0,
        limit: NEWS_PAGE_SIZE,
        preview,
        search,
    })

    return (
        <div className="bg-[#FAF9F7]">
            <NewsToolbar selected={category} preview={preview} search={search} />

            {items.length === 0 ? (
                <EmptyState
                    className="mx-auto max-w-[760px]"
                    title={search.trim() ? 'No items found' : category ? 'No items in this category' : 'No Legal News yet'}
                    description={
                        search.trim()
                            ? 'Nothing matches.'
                            : category
                              ? `Nothing has been published under ${newsCategoryLabel(category)} yet.`
                              : 'Published Legal News items will appear here.'
                    }
                />
            ) : (
                <NewsFeed
                    key={`${category ?? 'all'}-${search}-${preview ? 'preview' : 'live'}`}
                    initialItems={items}
                    initialHasMore={hasMore}
                    category={category}
                    preview={preview}
                    search={search}
                />
            )}
        </div>
    )
}
