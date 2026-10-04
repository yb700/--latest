import { Suspense } from 'react'
import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { PostList } from '@/components/blog/post-list'
import { CategoryOptions } from '@/components/listing/category-options'
import { SearchField } from '@/components/listing/search-field'
import { EmptyState } from '@/components/empty-state'
import { BLOG_CATEGORY_PRESENTATION, isBlogCategorySlug, titlesForSection, type BlogCategorySlug } from '@/lib/blog-categories'
import {
    toBlogListPost,
    type BlogListPost,
    type BlogPostSource,
} from '@/lib/blog-listing'
import { titleAndExcerptFilter } from '@/lib/post-search'

const POSTS_PER_PAGE = 12

const CARD_SELECT = '*, post_categories(categories(slug))'
const FILTERED_CARD_SELECT = '*, post_categories!inner(categories!inner(slug))'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
    title: 'Blog | ClearCut Law',
    description: 'Commentary on the deals, decisions and developments shaping commercial law.',
}

function parseListingFilters(searchParams: { [key: string]: string | string[] | undefined }) {
    const search = typeof searchParams.search === 'string' ? searchParams.search : ''
    const categoryParam = typeof searchParams.category === 'string' ? searchParams.category : ''
    const category: BlogCategorySlug | '' = isBlogCategorySlug(categoryParam) ? categoryParam : ''
    const page = Math.max(1, searchParams.page ? parseInt(searchParams.page as string, 10) || 1 : 1)

    return { search, category, page }
}

async function getPosts(
    supabase: ReturnType<typeof createClient>,
    search: string,
    category: BlogCategorySlug | '',
    page: number
) {
    const from = (page - 1) * POSTS_PER_PAGE
    const to = from + POSTS_PER_PAGE - 1

    let query = category
        ? supabase.from('posts').select(FILTERED_CARD_SELECT, { count: 'exact' }).eq('post_categories.categories.slug', category)
        : supabase.from('posts').select(CARD_SELECT, { count: 'exact' })

    query = query.eq('status', 'published').order('created_at', { ascending: false })

    const searchFilter = titleAndExcerptFilter(search)
    if (searchFilter) {
        query = query.or(searchFilter)
    }

    const extraTitles = category ? titlesForSection(category) : []
    const result = extraTitles.length > 0 ? await query : await query.range(from, to)

    if (result.error) {
        console.error('Error fetching posts:', result.error)
        return { posts: [] as BlogListPost[], count: 0 }
    }

    let posts = ((result.data ?? []) as BlogPostSource[]).map(toBlogListPost)
    let count = result.count || 0

    if (extraTitles.length > 0) {
        const extra = await supabase
            .from('posts')
            .select(CARD_SELECT)
            .eq('status', 'published')
            .in('title', extraTitles)

        if (extra.error) {
            console.error('Error fetching section posts:', extra.error)
        } else {
            const seen = new Set(posts.map((post) => post.id))
            const additions = ((extra.data ?? []) as BlogPostSource[])
                .map(toBlogListPost)
                .filter((post) => !seen.has(post.id))
            posts = [...posts, ...additions].sort(
                (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
            )
        }
        count = posts.length
        posts = posts.slice(from, to + 1)
    }

    return { posts, count }
}

export default async function BlogPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const { search, category, page } = parseListingFilters(searchParams)
    const supabase = createClient()

    const { posts, count } = await getPosts(supabase, search, category, page)
    const totalPages = Math.max(1, Math.ceil((count || 0) / POSTS_PER_PAGE))

    return (
        <div className="bg-[#FAF9F7]">
            <div className="container mx-auto px-4 py-6 sm:py-8">
                <div className="mb-6 max-w-[720px]">
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8A8780]">The blog</p>
                    <h1 className="mb-2 text-4xl font-semibold tracking-[-0.5px] text-[#151515]">
                        {category ? BLOG_CATEGORY_PRESENTATION[category].fullName : 'Latest blog posts'}
                    </h1>
                    <p className="text-lg text-[#5E5E5E]">
                        Commentary on the deals, decisions and developments shaping commercial law.
                    </p>
                </div>

                <div className="mb-6 max-w-[720px] space-y-3">
                    <SearchField
                        action="/blog"
                        id="blog-search"
                        defaultValue={search}
                        hidden={category ? { category } : undefined}
                    />
                    <CategoryOptions
                        basePath="/blog"
                        selected={category}
                        search={search}
                        options={(
                            [
                                'mergers-and-acquisitions',
                                'banking-and-finance',
                                'competition-and-regulation',
                                'sports-deals-and-regulation',
                            ] as const
                        ).map((slug) => ({
                            value: slug,
                            label: BLOG_CATEGORY_PRESENTATION[slug].label,
                        }))}
                    />
                </div>

                {posts.length === 0 ? (
                    <EmptyState
                        title="No posts found"
                        description={
                            category
                                ? 'Nothing is published in this category yet.'
                                : search
                                  ? 'Nothing matches.'
                                  : 'No blog posts have been published yet.'
                        }
                    />
                ) : (
                    <>
                        <Suspense fallback={<div>Loading posts...</div>}>
                            <div className="max-w-[720px]">
                                <PostList posts={posts} />
                            </div>
                        </Suspense>

                        {totalPages > 1 && (
                            <div className="mt-8 flex justify-center">
                                <nav className="flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
                                    {page > 1 && (
                                        <a
                                            href={`/blog?page=${page - 1}${search ? `&search=${search}` : ''}${category ? `&category=${category}` : ''}`}
                                            className="rounded-[12px] border border-[#E7E4DF] bg-white px-3 py-2 text-sm font-medium text-[#151515] hover:bg-[#F3F1ED]"
                                        >
                                            Previous
                                        </a>
                                    )}

                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                                        <a
                                            key={pageNumber}
                                            href={`/blog?page=${pageNumber}${search ? `&search=${search}` : ''}${category ? `&category=${category}` : ''}`}
                                            className={`rounded-[12px] px-3 py-2 text-sm font-medium ${
                                                pageNumber === page
                                                    ? 'bg-[#151515] text-white'
                                                    : 'border border-[#E7E4DF] bg-white text-[#151515] hover:bg-[#F3F1ED]'
                                            }`}
                                            aria-current={pageNumber === page ? 'page' : undefined}
                                        >
                                            {pageNumber}
                                        </a>
                                    ))}

                                    {page < totalPages && (
                                        <a
                                            href={`/blog?page=${page + 1}${search ? `&search=${search}` : ''}${category ? `&category=${category}` : ''}`}
                                            className="rounded-[12px] border border-[#E7E4DF] bg-white px-3 py-2 text-sm font-medium text-[#151515] hover:bg-[#F3F1ED]"
                                        >
                                            Next
                                        </a>
                                    )}
                                </nav>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
