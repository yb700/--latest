'use client'

import { useEffect, useRef } from 'react'
import { NewsCategoryFilters } from '@/components/news/category-filters'
import { NewsCategorySlug } from '@/lib/news-categories'

interface NewsToolbarProps {
    selected: NewsCategorySlug | null
    preview: boolean
}

export function NewsToolbar({ selected, preview }: NewsToolbarProps) {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        document.documentElement.classList.add('news-feed-scroll')
        return () => {
            document.documentElement.classList.remove('news-feed-scroll')
            document.documentElement.style.removeProperty('--filters-h')
        }
    }, [])

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const apply = () => {
            document.documentElement.style.setProperty('--filters-h', `${el.getBoundingClientRect().height}px`)
        }

        apply()
        const observer = new ResizeObserver(apply)
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    return (
        <div
            ref={ref}
            className="sticky z-40 border-b border-gray-200 bg-white"
            style={{ top: 'var(--header-h)' }}
        >
            <div className="mx-auto flex max-w-[720px] flex-col gap-1 px-4 py-3">
                <div className="flex items-baseline justify-between gap-3">
                    <h1 className="shrink-0 text-xl font-bold leading-none text-brand">Legal News</h1>
                    {preview && (
                        <p className="text-right text-xs text-gray-500">Sample preview. Not live news.</p>
                    )}
                </div>
                <NewsCategoryFilters selected={selected} preview={preview} />
            </div>
        </div>
    )
}
