import { Suspense } from 'react'
import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { PostList } from '@/components/blog/post-list'
import { SearchInput } from '@/components/search-input'
import { CategoryFilter } from '@/components/blog/category-filter'
import { EmptyState } from '@/components/empty-state'

export const metadata: Metadata = {
    title: 'Blog | ClearCut Law',
    description: 'Legal insights, analysis, and commentary on current legal issues.',
}

async function getPosts(searchParams: { [key: string]: string | string[] | undefined }) {
    const supabase = createClient()

    let query = supabase
        .from('posts')
        .select('*', { count: 'exact' })
        .eq('status', 'published')
        .order('created_at', { ascending: false })

    // Search (content_md after migration; content for backwards compatibility)
    const search = searchParams.search
    if (search && typeof search === 'string') {
        query = query.or(`title.ilike.%${search}%,content_md.ilike.%${search}%`)
    }

    // Pagination
    const page = searchParams.page ? parseInt(searchParams.page as string) : 1
    const limit = 12
    const from = (page - 1) * limit
    const to = from + limit - 1

    query = query.range(from, to)

    let result = await query

    // Fallback: if content_md column doesn't exist (pre-migration), retry with content
    if (result.error && search && typeof search === 'string' && result.error.message?.includes('content_md')) {
        result = await supabase
            .from('posts')
            .select('*', { count: 'exact' })
            .eq('status', 'published')
            .order('created_at', { ascending: false })
            .or(`title.ilike.%${search}%,content.ilike.%${search}%`)
            .range(from, to)
    }

    const { data: posts, error, count } = result

    if (error) {
        console.error('Error fetching posts:', error)
        return { posts: [], count: 0 }
    }

    return { posts: posts || [], count: count || 0 }
}

async function getCategories() {
    const supabase = createClient()

    const { data: categories, error } = await supabase
        .from('categories')
        .select('*')
        .order('name')

    if (error) {
        console.error('Error fetching categories:', error)
        return []
    }

    return categories || []
}

export default async function BlogPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const [{ posts, count }, categories] = await Promise.all([
        getPosts(searchParams),
        getCategories(),
    ])

    const currentPage = searchParams.page ? parseInt(searchParams.page as string) : 1
    const totalPages = Math.max(1, Math.ceil((count || 0) / 12))
    const search = searchParams.search as string || ''
    const category = searchParams.category as string || ''

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-brand mb-4">Blog</h1>
                <p className="text-gray-600 text-lg">
                    Legal insights, analysis, and commentary on current legal issues.
                </p>
            </div>

            <div className="mb-8 space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <SearchInput
                            placeholder="Search posts..."
                            value={search}
                            className="w-full"
                        />
                    </div>
                    <CategoryFilter
                        categories={categories}
                        selectedCategory={category}
                        className="w-full sm:w-64"
                    />
                </div>
            </div>

            {posts.length === 0 ? (
                <EmptyState
                    title="No posts found"
                    description={
                        search || category
                            ? "Try adjusting your search or filter criteria."
                            : "No blog posts have been published yet."
                    }
                />
            ) : (
                <>
                    <Suspense fallback={<div>Loading posts...</div>}>
                        <PostList posts={posts} />
                    </Suspense>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="mt-12 flex justify-center">
                            <nav className="flex items-center space-x-2">
                                {currentPage > 1 && (
                                    <a
                                        href={`/blog?page=${currentPage - 1}${search ? `&search=${search}` : ''}${category ? `&category=${category}` : ''}`}
                                        className="px-3 py-2 text-sm font-medium text-brand bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                                    >
                                        Previous
                                    </a>
                                )}

                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <a
                                        key={page}
                                        href={`/blog?page=${page}${search ? `&search=${search}` : ''}${category ? `&category=${category}` : ''}`}
                                        className={`px-3 py-2 text-sm font-medium rounded-md ${page === currentPage
                                            ? 'bg-brand text-white'
                                            : 'text-brand bg-white border border-gray-300 hover:bg-gray-50'
                                            }`}
                                    >
                                        {page}
                                    </a>
                                ))}

                                {currentPage < totalPages && (
                                    <a
                                        href={`/blog?page=${currentPage + 1}${search ? `&search=${search}` : ''}${category ? `&category=${category}` : ''}`}
                                        className="px-3 py-2 text-sm font-medium text-brand bg-white border border-gray-300 rounded-md hover:bg-gray-50"
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
    )
}

