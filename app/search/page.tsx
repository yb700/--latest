import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { titleAndExcerptFilter } from '@/lib/post-search'
import { EmptyState } from '@/components/empty-state'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
    title: 'Search | ClearCut Law',
    description: 'Search ClearCut Law post titles and summaries.',
}

type SearchResult = {
    title: string
    slug: string
    excerpt: string | null
}

async function searchPosts(term: string): Promise<SearchResult[]> {
    const filter = titleAndExcerptFilter(term)
    if (!filter) return []

    const supabase = createClient()
    const { data, error } = await supabase
        .from('posts')
        .select('title, slug, excerpt')
        .eq('status', 'published')
        .or(filter)
        .order('created_at', { ascending: false })
        .limit(20)

    if (error) {
        console.error('Error searching posts:', error)
        return []
    }

    return (data ?? []) as SearchResult[]
}

export default async function SearchPage({
    searchParams,
}: {
    searchParams: { q?: string }
}) {
    const query = typeof searchParams.q === 'string' ? searchParams.q : ''
    const results = query.trim() ? await searchPosts(query) : []

    return (
        <div className="container mx-auto max-w-3xl bg-[#FAF9F7] px-4 py-8">
            <h1 className="mb-6 text-4xl font-semibold text-[#151515]">Search</h1>
            <form action="/search" method="get" className="mb-8 flex flex-col gap-3 sm:flex-row" role="search">
                <label className="sr-only" htmlFor="search-q">
                    Search post titles and summaries
                </label>
                <input
                    id="search-q"
                    name="q"
                    type="search"
                    defaultValue={query}
                    placeholder="Search titles and summaries"
                    className="w-full rounded-[12px] border border-[#E1DED8] bg-white px-4 py-2.5 text-sm text-[#151515] placeholder:text-[#8A8780]"
                />
                <button type="submit" className="w-full rounded-[12px] bg-[#151515] px-4 py-2.5 text-sm font-medium text-white sm:w-auto">
                    Search
                </button>
            </form>

            {query.trim() && results.length === 0 ? (
                <EmptyState title="No posts found" description="Try a different title or summary." />
            ) : null}

            {results.length > 0 ? (
                <ul className="space-y-3">
                    {results.map((post) => (
                        <li key={post.slug} className="rounded-2xl border border-[#E7E4DF] bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
                            <Link href={`/blog/${post.slug}`} className="font-semibold text-[#151515] hover:underline">
                                {post.title}
                            </Link>
                            {post.excerpt ? <p className="mt-1 text-[#5E5E5E]">{post.excerpt}</p> : null}
                        </li>
                    ))}
                </ul>
            ) : null}
        </div>
    )
}
