'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { NewsCard } from '@/components/news/news-card'
import { Button } from '@/components/ui/button'
import { NEWS_PAGE_SIZE, type NewsListItem } from '@/lib/news'
import { NewsCategorySlug } from '@/lib/news-categories'

interface NewsFeedProps {
    initialItems: NewsListItem[]
    initialHasMore: boolean
    category: NewsCategorySlug | null
    preview: boolean
}

export function NewsFeed({ initialItems, initialHasMore, category, preview }: NewsFeedProps) {
    const [items, setItems] = useState(initialItems)
    const [hasMore, setHasMore] = useState(initialHasMore)
    const [loading, setLoading] = useState(false)
    const [failed, setFailed] = useState(false)
    const loadingRef = useRef(false)
    const sentinelRef = useRef<HTMLDivElement>(null)

    const loadMore = useCallback(async () => {
        if (loadingRef.current || !hasMore) return

        loadingRef.current = true
        setLoading(true)
        setFailed(false)

        try {
            const params = new URLSearchParams()
            params.set('offset', String(items.length))
            params.set('limit', String(NEWS_PAGE_SIZE))
            if (category) params.set('category', category)
            if (preview) params.set('preview', 'fixtures')

            const response = await fetch(`/api/news?${params.toString()}`, { cache: 'no-store' })
            if (!response.ok) throw new Error('Could not load news')

            const data = (await response.json()) as { items?: NewsListItem[]; hasMore?: boolean }
            const incoming = Array.isArray(data.items) ? data.items : []

            setItems((current) => {
                const seen = new Set(current.map((item) => item.id))
                const next = incoming.filter((item) => item?.id && !seen.has(item.id))
                return next.length === 0 ? current : [...current, ...next]
            })

            if (incoming.length === 0) {
                setHasMore(false)
            } else {
                setHasMore(Boolean(data.hasMore))
            }
        } catch {
            setFailed(true)
        } finally {
            loadingRef.current = false
            setLoading(false)
        }
    }, [category, hasMore, items.length, preview])

    useEffect(() => {
        const node = sentinelRef.current
        if (!node || !hasMore) return

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries.some((entry) => entry.isIntersecting)) {
                    void loadMore()
                }
            },
            { rootMargin: '240px' }
        )

        observer.observe(node)
        return () => observer.disconnect()
    }, [hasMore, loadMore])

    return (
        <div>
            <ul className="news-feed mx-auto flex w-full max-w-[720px] list-none flex-col px-4 max-md:gap-2 max-md:pb-4 max-md:pt-0 md:gap-5 md:py-8">
                {items.map((item) => (
                    <li key={item.id}>
                        <NewsCard item={item} layout="feed" />
                    </li>
                ))}
            </ul>

            {hasMore && (
                <div className="mx-auto flex max-w-[720px] flex-col items-center gap-2 px-4 pb-8">
                    <div ref={sentinelRef} aria-hidden="true" className="h-px w-full" />
                    {failed && <p className="text-sm text-gray-600">Could not load more news.</p>}
                    <Button type="button" variant="outline" onClick={() => void loadMore()} disabled={loading}>
                        {loading ? 'Loading' : 'Load more'}
                    </Button>
                </div>
            )}
        </div>
    )
}
