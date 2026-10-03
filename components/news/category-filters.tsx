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
        <nav aria-label="Filter Legal News by category" className="flex flex-wrap gap-2">
            {filters.map((filter) => {
                const active = filter.slug === selected

                return (
                    <Link
                        key={filter.label}
                        href={filter.href}
                        aria-current={active ? 'page' : undefined}
                        aria-label={filter.slug ? newsCategoryLabel(filter.slug) : 'All categories'}
                        className={cn(
                            'inline-flex min-h-[36px] shrink-0 items-center justify-center whitespace-nowrap rounded-[6px] border px-3.5 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#151515] focus-visible:ring-offset-2',
                            active
                                ? 'border-[#151515] bg-[#151515] text-white'
                                : 'border-[#E7E4DF] bg-white text-[#5E5E5E] hover:border-[#151515]'
                        )}
                    >
                        {filter.label}
                    </Link>
                )
            })}
        </nav>
    )
}
