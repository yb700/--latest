import { Suspense } from 'react'
import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { PostList } from '@/components/blog/post-list'
import { SearchInput } from '@/components/search-input'
import { CategoryFilter } from '@/components/blog/category-filter'
import { EmptyState } from '@/components/empty-state'
import { BLOG_CATEGORY_SLUGS, isBlogCategorySlug } from '@/lib/blog-categories'

const POSTS_PER_PAGE = 12

export const metadata: Metadata = {
    title: 'Blog | ClearCut Law',
    description: 'Commentary on the deals, decisions and developments shaping commercial law.',
}

async function getPosts(searchParams: { [key: string]: string | string[] | undefined }) {
    const supabase = createClient()

    const search = typeof searchParams.search === 'string' ? searchParams.search : ''
    const categoryParam = typeof searchParams.category === 'string' ? searchParams.category : ''
    const category = isBlogCategorySlug(categoryParam) ? categoryParam : ''

    const page = searchParams.page ? parseInt(searchParams.page as string) : 1
    const from = (Math.max(page, 1) - 1) * POSTS_PER_PAGE
    const to = from + POSTS_PER_PAGE - 1

    const buildQuery = (contentColumn: 'content_md' | 'content') => {
        let query = category
            ? supabase
                .from('posts')
                .select('*, post_categories!inner(categories!inner(slug))', { count: 'exact' })
                .eq('post_categories.categories.slug', category)
            : supabase
                .from('posts')
                .select('*', { count: 'exact' })

        query = query
            .eq('status', 'published')
            .order('created_at', { ascending: false })

        if (search) {
            query = query.or(`title.ilike.%${search}%,${contentColumn}.ilike.%${search}%`)
        }

        return query.range(from, to)
    }

    let result = await buildQuery('content_md')

    // Fallback: if content_md column doesn't exist (pre-migration), retry with content
    if (result.error && search && result.error.message?.includes('content_md')) {
        result = await buildQuery('content')
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
        .select('id, name, slug')
        .in('slug', [...BLOG_CATEGORY_SLUGS])

    if (error) {
        console.error('Error fetching categories:', error)
        return []
    }

    const bySlug = new Map((categories || []).map((category) => [category.slug, category]))

    return BLOG_CATEGORY_SLUGS.flatMap((slug) => {
        const category = bySlug.get(slug)
        return category ? [category] : []
    })
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
    const totalPages = Math.max(1, Math.ceil((count || 0) / POSTS_PER_PAGE))
    const search = typeof searchParams.search === 'string' ? searchParams.search : ''
    const categoryParam = typeof searchParams.category === 'string' ? searchParams.category : ''
    const category = isBlogCategorySlug(categoryParam) ? categoryParam : ''

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-brand mb-4">Blog</h1>
                <p className="text-gray-600 text-lg">
                    Commentary on the deals, decisions and developments shaping commercial law.
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

