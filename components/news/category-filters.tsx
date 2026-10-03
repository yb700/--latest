import Link from 'next/link'
import { NEWS_CATEGORIES, NewsCategorySlug, newsCategoryLabel } from '@/lib/news-categories'
import { cn } from '@/lib/utils'

interface NewsCategoryFiltersProps {
    selected: NewsCategorySlug | null
    preview?: boolean
}

function newsFilterHref(slug: NewsCategorySlug | null, preview: boolean): string {
    const params = new URLSearchParams()
    if (slug) params.set('category', slug)
    if (preview) params.set('preview', 'fixtures')
    const query = params.toString()
    return query ? `/news?${query}` : '/news'
}

export function NewsCategoryFilters({ selected, preview = false }: NewsCategoryFiltersProps) {
    const filters = [
        { href: newsFilterHref(null, preview), label: 'All', slug: null as NewsCategorySlug | null },
        ...NEWS_CATEGORIES.map((category) => ({
            href: newsFilterHref(category.slug, preview),
            label: category.shortLabel,
            slug: category.slug as NewsCategorySlug | null,
        })),
    ]

    return (
        <nav aria-label="Filter Legal News by category" className="flex flex-nowrap gap-2 overflow-x-auto text-sm">
            {filters.map((filter) => {
                const active = filter.slug === selected

                return (
                    <Link
                        key={filter.label}
                        href={filter.href}
                        aria-current={active ? 'page' : undefined}
                        aria-label={filter.slug ? newsCategoryLabel(filter.slug) : 'All categories'}
                        className={cn(
                            'shrink-0 whitespace-nowrap rounded-md border px-3 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
                            active
                                ? 'border-[#14213D] bg-[#14213D] font-semibold text-white'
                                : 'border-[#D5D9E0] bg-white text-[#5A6270] hover:border-[#14213D]'
                        )}
                    >
                        {filter.label}
                    </Link>
                )
            })}
        </nav>
    )
}
