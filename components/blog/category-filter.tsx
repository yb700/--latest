import Link from 'next/link'
import { BLOG_CATEGORY_PRESENTATION, BLOG_CATEGORY_SLUGS, type BlogCategorySlug } from '@/lib/blog-categories'
import { blogFilterHref } from '@/lib/blog-listing'
import { cn } from '@/lib/utils'

interface CategoryFilterProps {
    selectedCategory: BlogCategorySlug | ''
    search: string
}

export function CategoryFilter({ selectedCategory, search }: CategoryFilterProps) {
    const filters: Array<{ label: string; slug: BlogCategorySlug | null }> = [
        { label: 'All', slug: null },
        ...BLOG_CATEGORY_SLUGS.map((slug) => ({
            label: BLOG_CATEGORY_PRESENTATION[slug].label,
            slug,
        })),
    ]

    return (
        <nav aria-label="Filter posts by category" className="flex flex-wrap gap-2">
            {filters.map((filter) => {
                const selected = filter.slug === null ? selectedCategory === '' : filter.slug === selectedCategory

                return (
                    <Link
                        key={filter.label}
                        href={blogFilterHref(filter.slug, search)}
                        aria-current={selected ? 'page' : undefined}
                        className={cn(
                            'inline-flex min-h-[36px] items-center justify-center whitespace-nowrap rounded-[6px] border px-3.5 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#151515] focus-visible:ring-offset-2',
                            selected
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
