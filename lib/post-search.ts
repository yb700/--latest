/** Strip wildcard characters so a search term cannot widen the query. */
export function searchNeedle(search: string): string {
    return search.replace(/[%_,]/g, ' ').replace(/\s+/g, ' ').trim()
}

/** Supabase `or` filter for titles and excerpts. Full post text is not searched. */
export function titleAndExcerptFilter(search: string): string | null {
    const safe = searchNeedle(search)
    if (!safe) return null
    return `title.ilike.%${safe}%,excerpt.ilike.%${safe}%`
}

/** Supabase `or` filter for news headlines and summaries. */
export function headlineAndSummaryFilter(search: string): string | null {
    const safe = searchNeedle(search)
    if (!safe) return null
    return `headline.ilike.%${safe}%,summary.ilike.%${safe}%`
}
