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
            className="sticky z-40 border-b border-[#E7E4DF] bg-[#FAF9F7]"
            style={{ top: 'var(--header-h)' }}
        >
            <div className="mx-auto flex max-w-[720px] flex-col gap-1 px-4 py-3">
                <div className="flex items-baseline justify-between gap-3">
                    <div className="min-w-0">
                        <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8A8780]">Legal News</p>
                        <h1 className="text-2xl font-semibold leading-tight tracking-[-0.5px] text-[#151515]">The latest developments</h1>
                    </div>
                    {preview && (
                        <p className="text-right text-xs text-gray-500">Sample preview. Not live news.</p>
                    )}
                </div>
                <NewsCategoryFilters selected={selected} preview={preview} />
            </div>
        </div>
    )
}
