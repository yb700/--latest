/** Practice areas shown in the blog category filter, in display order. */
export const BLOG_CATEGORY_SLUGS = [
    'mergers-and-acquisitions',
    'banking-and-finance',
    'sports-deals-and-regulation',
    'competition-and-regulation',
] as const

export type BlogCategorySlug = (typeof BLOG_CATEGORY_SLUGS)[number]

/** Button label and the grey capital section label used on blog cards. */
export const BLOG_CATEGORY_PRESENTATION: Record<
    BlogCategorySlug,
    { label: string; tagClassName: string }
> = {
    'mergers-and-acquisitions': {
        label: 'M&A',
        tagClassName: 'text-[#5A6270]',
    },
    'banking-and-finance': {
        label: 'Finance',
        tagClassName: 'text-[#5A6270]',
    },
    'sports-deals-and-regulation': {
        label: 'Sports',
        tagClassName: 'text-[#5A6270]',
    },
    'competition-and-regulation': {
        label: 'Competition',
        tagClassName: 'text-[#5A6270]',
    },
}

export function isBlogCategorySlug(value: string): value is BlogCategorySlug {
    return (BLOG_CATEGORY_SLUGS as readonly string[]).includes(value)
}

export function blogCategoryPath(slug: BlogCategorySlug): string {
    return `/blog?category=${slug}`
}
