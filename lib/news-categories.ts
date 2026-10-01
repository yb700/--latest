/** Legal News categories, in display order. Slugs are stored on news_items. */
export const NEWS_CATEGORIES = [
    { slug: 'mergers-acquisitions', label: 'Mergers and Acquisitions', shortLabel: 'M&A' },
    { slug: 'banking-finance', label: 'Banking and Finance', shortLabel: 'Finance' },
    { slug: 'sports-deals-regulation', label: 'Sports Deals and Regulation', shortLabel: 'Sport' },
    { slug: 'competition-regulation', label: 'Competition and Regulation', shortLabel: 'Competition' },
] as const

export type NewsCategorySlug = (typeof NEWS_CATEGORIES)[number]['slug']

export function isNewsCategorySlug(value: string): value is NewsCategorySlug {
    return NEWS_CATEGORIES.some((category) => category.slug === value)
}

export function newsCategoryLabel(slug: string): string {
    return NEWS_CATEGORIES.find((category) => category.slug === slug)?.label ?? slug
}

/** Short label used on cards and the filter row. */
export function newsCategoryShortLabel(slug: string): string {
    return NEWS_CATEGORIES.find((category) => category.slug === slug)?.shortLabel ?? slug
}

export function newsCategoryPath(slug: NewsCategorySlug): string {
    return `/news?category=${slug}`
}
