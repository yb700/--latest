/** Supabase `or` filter for titles and excerpts. Full post text is not searched. */
export function titleAndExcerptFilter(search: string): string | null {
    const safe = search.replace(/[%_,]/g, ' ').replace(/\s+/g, ' ').trim()
    if (!safe) return null
    return `title.ilike.%${safe}%,excerpt.ilike.%${safe}%`
}
