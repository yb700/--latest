import { Suspense } from 'react'
import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { PostList } from '@/components/blog/post-list'
import { CategoryFilter } from '@/components/blog/category-filter'
import { EmptyState } from '@/components/empty-state'
import { isBlogCategorySlug, type BlogCategorySlug } from '@/lib/blog-categories'
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

    const result = await query.range(from, to)

    if (result.error) {
        console.error('Error fetching posts:', result.error)
        return { posts: [] as BlogListPost[], count: 0 }
    }

    const posts = ((result.data ?? []) as BlogPostSource[]).map(toBlogListPost)
    return { posts, count: result.count || 0 }
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
        <div className="bg-white">
            <div className="container mx-auto px-4 py-6 sm:py-8">
                <div className="mb-6">
                    <h1 className="mb-2 text-4xl font-bold text-[#14213D]">Blog</h1>
                    <p className="text-lg text-[#5A6270]">
                        Commentary on the deals, decisions and developments shaping commercial law.
                    </p>
                </div>

                <div className="mb-6">
                    <CategoryFilter selectedCategory={category} search={search} />
                </div>

                {posts.length === 0 ? (
                    <EmptyState
                        title="No posts found"
                        description={
                            search || category
                                ? 'Try adjusting your search or filter criteria.'
                                : 'No blog posts have been published yet.'
                        }
                    />
                ) : (
                    <>
                        <Suspense fallback={<div>Loading posts...</div>}>
                            <PostList posts={posts} />
                        </Suspense>

                        {totalPages > 1 && (
                            <div className="mt-8 flex justify-center">
                                <nav className="flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
                                    {page > 1 && (
                                        <a
                                            href={`/blog?page=${page - 1}${search ? `&search=${search}` : ''}${category ? `&category=${category}` : ''}`}
                                            className="rounded-md border border-[#D5D9E0] bg-white px-3 py-2 text-sm font-medium text-[#14213D] hover:bg-[#F7F8FA]"
                                        >
                                            Previous
                                        </a>
                                    )}

                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                                        <a
                                            key={pageNumber}
                                            href={`/blog?page=${pageNumber}${search ? `&search=${search}` : ''}${category ? `&category=${category}` : ''}`}
                                            className={`rounded-md px-3 py-2 text-sm font-medium ${
                                                pageNumber === page
                                                    ? 'bg-[#14213D] text-white'
                                                    : 'border border-[#D5D9E0] bg-white text-[#14213D] hover:bg-[#F7F8FA]'
                                            }`}
                                            aria-current={pageNumber === page ? 'page' : undefined}
                                        >
                                            {pageNumber}
                                        </a>
                                    ))}

                                    {page < totalPages && (
                                        <a
                                            href={`/blog?page=${page + 1}${search ? `&search=${search}` : ''}${category ? `&category=${category}` : ''}`}
                                            className="rounded-md border border-[#D5D9E0] bg-white px-3 py-2 text-sm font-medium text-[#14213D] hover:bg-[#F7F8FA]"
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
