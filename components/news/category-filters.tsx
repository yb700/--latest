import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { NEWS_CATEGORIES, NewsCategorySlug } from '@/lib/news-categories'
import { cn } from '@/lib/utils'

interface NewsCategoryFiltersProps {
    selected: NewsCategorySlug | null
}

export function NewsCategoryFilters({ selected }: NewsCategoryFiltersProps) {
    const filters = [
        { href: '/news', label: 'All', slug: null as NewsCategorySlug | null },
        ...NEWS_CATEGORIES.map((category) => ({
            href: `/news?category=${category.slug}`,
            label: category.label,
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
                        className={cn(
                            buttonVariants({
                                variant: active ? 'default' : 'outline',
                                size: 'sm',
                            })
                        )}
                    >
                        {filter.label}
                    </Link>
                )
            })}
        </nav>
    )
}
