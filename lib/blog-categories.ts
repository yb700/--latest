/** Practice areas shown in the blog category filter, in display order. */
export const BLOG_CATEGORY_SLUGS = [
    'mergers-and-acquisitions',
    'banking-and-finance',
    'sports-deals-and-regulation',
    'competition-and-regulation',
] as const

export type BlogCategorySlug = (typeof BLOG_CATEGORY_SLUGS)[number]

export function isBlogCategorySlug(value: string): value is BlogCategorySlug {
    return (BLOG_CATEGORY_SLUGS as readonly string[]).includes(value)
}

export function blogCategoryPath(slug: BlogCategorySlug): string {
    return `/blog?category=${slug}`
}
