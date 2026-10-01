import { Metadata } from 'next'
import { EmptyState } from '@/components/empty-state'
import { NewsCard } from '@/components/news/news-card'
import { NewsCategoryFilters } from '@/components/news/category-filters'
import { getPublishedNewsItems } from '@/lib/news'
import { isNewsCategorySlug, newsCategoryLabel } from '@/lib/news-categories'

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
    const items = await getPublishedNewsItems(category ? { category } : undefined)

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="mb-4 text-4xl font-bold text-brand">Legal News</h1>
                <p className="text-lg text-gray-600">
                    Deals, decisions and regulatory developments, newest first.
                </p>
            </div>

            <div className="mb-8">
                <NewsCategoryFilters selected={category} />
            </div>

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
                <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {items.map((item) => (
                        <li key={item.id} className="h-full">
                            <NewsCard item={item} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
