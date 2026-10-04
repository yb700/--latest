/** Practice areas shown in the blog category filter, in display order. */
export const BLOG_CATEGORY_SLUGS = [
    'mergers-and-acquisitions',
    'banking-and-finance',
    'sports-deals-and-regulation',
    'competition-and-regulation',
] as const

export type BlogCategorySlug = (typeof BLOG_CATEGORY_SLUGS)[number]

/** Short label on cards and filters. Full name on section pages and What I cover. */
export const BLOG_CATEGORY_PRESENTATION: Record<
    BlogCategorySlug,
    { label: string; fullName: string; tagClassName: string }
> = {
    'mergers-and-acquisitions': {
        label: 'M&A',
        fullName: 'Mergers and Acquisitions',
        tagClassName: 'text-[#5E5E5E]',
    },
    'banking-and-finance': {
        label: 'Finance',
        fullName: 'Banking and Finance',
        tagClassName: 'text-[#5E5E5E]',
    },
    'sports-deals-and-regulation': {
        label: 'Sport',
        fullName: 'Sport Deals and Regulation',
        tagClassName: 'text-[#5E5E5E]',
    },
    'competition-and-regulation': {
        label: 'Competition',
        fullName: 'Competition and Regulation',
        tagClassName: 'text-[#5E5E5E]',
    },
}

/**
 * Published posts that have no category row. The section is the one the piece
 * belongs to, so the card, the article and related posts still have a label.
 */
const SECTION_BY_TITLE: Record<string, BlogCategorySlug> = {
    'Vodafone and Three Merger': 'competition-and-regulation',
    'Nintendo v Playables and the R4 Card': 'competition-and-regulation',
    'AI in Law Firms': 'competition-and-regulation',
}

export function sectionSlugForTitle(title: string): BlogCategorySlug | null {
    return SECTION_BY_TITLE[title] ?? null
}

export function titlesForSection(slug: BlogCategorySlug): string[] {
    return Object.entries(SECTION_BY_TITLE)
        .filter(([, value]) => value === slug)
        .map(([title]) => title)
}

export function isBlogCategorySlug(value: string): value is BlogCategorySlug {
    return (BLOG_CATEGORY_SLUGS as readonly string[]).includes(value)
}

export function blogCategoryPath(slug: BlogCategorySlug): string {
    return `/blog?category=${slug}`
}
