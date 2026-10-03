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
        tagClassName: 'text-[#5E5E5E]',
    },
    'banking-and-finance': {
        label: 'Finance',
        tagClassName: 'text-[#5E5E5E]',
    },
    'sports-deals-and-regulation': {
        label: 'Sport',
        tagClassName: 'text-[#5E5E5E]',
    },
    'competition-and-regulation': {
        label: 'Competition',
        tagClassName: 'text-[#5E5E5E]',
    },
}

export function isBlogCategorySlug(value: string): value is BlogCategorySlug {
    return (BLOG_CATEGORY_SLUGS as readonly string[]).includes(value)
}

export function blogCategoryPath(slug: BlogCategorySlug): string {
    return `/blog?category=${slug}`
}
