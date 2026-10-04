import { blogCardSummary, comparePostsNewestFirst } from '@/lib/blog-listing'
import { dealGlanceForTitle, type DealGlance } from '@/lib/deal-glance'
import { interviewNoteForTitle } from '@/lib/interview-notes'

export type DealWeekRow = {
    label: 'Value' | 'Status' | 'Key law'
    value: string
}

export type DealWeekSource = {
    id: string
    title: string
    slug: string
    excerpt: string | null
    shortPreview: string | null
    publishedAt: string | null
    createdAt: string
}

export type DealWeekCard = {
    title: string
    href: string
    summary: string | null
    rows: DealWeekRow[]
    sample: boolean
}

/** Rows the homepage card can show from facts already stored for the post. */
export function dealWeekRows(deal: DealGlance): DealWeekRow[] {
    const rows: DealWeekRow[] = []
    if (deal.value) rows.push({ label: 'Value', value: deal.value })
    if (deal.status) rows.push({ label: 'Status', value: deal.status })
    if (deal.keyLaw) rows.push({ label: 'Key law', value: deal.keyLaw })
    return rows
}

/**
 * Newest published post that already has Value, Status or Key law.
 * Posts without those facts are skipped. Buyer is omitted because it is not stored.
 */
export function selectDealOfTheWeek(posts: readonly DealWeekSource[]): DealWeekCard | null {
    const sorted = [...posts].sort(comparePostsNewestFirst)

    for (const post of sorted) {
        const deal = dealGlanceForTitle(post.title)
        if (!deal) continue
        const rows = dealWeekRows(deal)
        if (rows.length === 0) continue

        return {
            title: post.title,
            href: `/blog/${post.slug}`,
            summary: blogCardSummary(post),
            rows,
            sample: false,
        }
    }

    return null
}

/** Local layout preview only. Uses facts and a sentence already in the repo. */
export function previewDealOfTheWeek(): DealWeekCard {
    const title = "Rio Tinto and Glencore's Failed Merger"
    const deal = dealGlanceForTitle(title)
    const note = interviewNoteForTitle(title)

    return {
        title,
        href: '/blog',
        summary: note?.whyItMatters ?? null,
        rows: deal ? dealWeekRows(deal) : [],
        sample: true,
    }
}
