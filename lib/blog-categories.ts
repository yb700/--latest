/** Practice areas shown in the blog category filter, in display order. */
export const BLOG_CATEGORY_SLUGS = [
    'mergers-and-acquisitions',
    'banking-and-finance',
    'sports-deals-and-regulation',
    'competition-and-regulation',
] as const

export type BlogCategorySlug = (typeof BLOG_CATEGORY_SLUGS)[number]

/** Button label and card tag colours from the blog listing spec. */
export const BLOG_CATEGORY_PRESENTATION: Record<
    BlogCategorySlug,
    { label: string; tagClassName: string }
> = {
    'mergers-and-acquisitions': {
        label: 'M&A',
        tagClassName: 'bg-[#E6EDFA] text-[#1E4FA8]',
    },
    'banking-and-finance': {
        label: 'Finance',
        tagClassName: 'bg-[#E1F2EF] text-[#0B6B61]',
    },
    'sports-deals-and-regulation': {
        label: 'Sports',
        tagClassName: 'bg-[#FBEADF] text-[#A84300]',
    },
    'competition-and-regulation': {
        label: 'Competition',
        tagClassName: 'bg-[#EEE7F8] text-[#5B2C9E]',
    },
}

export function isBlogCategorySlug(value: string): value is BlogCategorySlug {
    return (BLOG_CATEGORY_SLUGS as readonly string[]).includes(value)
}

export function blogCategoryPath(slug: BlogCategorySlug): string {
    return `/blog?category=${slug}`
}
