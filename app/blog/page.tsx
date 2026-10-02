import { Suspense } from 'react'
import { Manrope } from 'next/font/google'
import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { PostList } from '@/components/blog/post-list'
import { SearchInput } from '@/components/search-input'
import { CategoryFilter } from '@/components/blog/category-filter'
import { FeaturedBlogCard } from '@/components/blog/post-card'
import { EmptyState } from '@/components/empty-state'
import { isBlogCategorySlug, type BlogCategorySlug } from '@/lib/blog-categories'
import {
    comparePostsNewestFirst,
    PINNED_FEATURED_POST_SETTING,
    resolveFeaturedPostId,
    toBlogListPost,
    ukDayNumber,
    type BlogListPost,
    type BlogPostSource,
} from '@/lib/blog-listing'

const manrope = Manrope({
    subsets: ['latin'],
    display: 'swap',
    fallback: ['system-ui', 'Segoe UI', 'sans-serif'],
})

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

    const buildQuery = (contentColumn: 'content_md' | 'content') => {
        let query = category
            ? supabase.from('posts').select(FILTERED_CARD_SELECT, { count: 'exact' }).eq('post_categories.categories.slug', category)
            : supabase.from('posts').select(CARD_SELECT, { count: 'exact' })

        query = query.eq('status', 'published').order('created_at', { ascending: false })

        if (search) {
            query = query.or(`title.ilike.%${search}%,${contentColumn}.ilike.%${search}%`)
        }

        return query.range(from, to)
    }

    let result = await buildQuery('content_md')

    if (result.error && search && result.error.message?.includes('content_md')) {
        result = await buildQuery('content')
    }

    if (result.error) {
        console.error('Error fetching posts:', result.error)
        return { posts: [] as BlogListPost[], count: 0 }
    }

    const posts = ((result.data ?? []) as BlogPostSource[]).map(toBlogListPost)
    return { posts, count: result.count || 0 }
}

async function getPinnedPostId(supabase: ReturnType<typeof createClient>) {
    const { data, error } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', PINNED_FEATURED_POST_SETTING)
        .maybeSingle()

    if (error) {
        console.error('Error fetching pinned featured post:', error)
        return null
    }

    const value = data?.value?.trim()
    return value || null
}

async function getRotationPostId(supabase: ReturnType<typeof createClient>) {
    const { data, error } = await supabase.rpc('blog_rotation_post_id')

    if (error) {
        console.error('Error fetching blog rotation:', error)
        return { id: null as string | null, failed: true }
    }

    return { id: data, failed: false }
}

async function getPublishedRotationPosts(supabase: ReturnType<typeof createClient>) {
    const { data, error } = await supabase
        .from('posts')
        .select('id, published_at, created_at')
        .eq('status', 'published')

    if (error || !data) {
        console.error('Error fetching posts for rotation:', error)
        return []
    }

    return [...data]
        .map((post) => ({
            id: post.id,
            publishedAt: post.published_at,
            createdAt: post.created_at,
        }))
        .sort(comparePostsNewestFirst)
}

async function getPublishedCard(supabase: ReturnType<typeof createClient>, id: string) {
    const { data, error } = await supabase
        .from('posts')
        .select(CARD_SELECT)
        .eq('id', id)
        .eq('status', 'published')
        .maybeSingle()

    if (error || !data) {
        if (error) console.error('Error fetching featured post:', error)
        return null
    }

    return toBlogListPost(data as BlogPostSource)
}

export default async function BlogPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const { search, category, page } = parseListingFilters(searchParams)
    const supabase = createClient()

    const [{ posts, count }, pinnedId, rotation] = await Promise.all([
        getPosts(supabase, search, category, page),
        getPinnedPostId(supabase),
        getRotationPostId(supabase),
    ])

    let featured: BlogListPost | null = null

    if (pinnedId) {
        featured = posts.find((post) => post.id === pinnedId) ?? (await getPublishedCard(supabase, pinnedId))
    }

    if (!featured) {
        let rotationId = rotation.failed ? null : rotation.id
        if (!rotationId) {
            const rotationPosts = await getPublishedRotationPosts(supabase)
            rotationId = resolveFeaturedPostId(rotationPosts, ukDayNumber(new Date()), null)
        }
        if (rotationId) {
            featured = posts.find((post) => post.id === rotationId) ?? (await getPublishedCard(supabase, rotationId))
        }
    }

    const showFeatured = page === 1 && Boolean(featured) && !search && (!category || featured?.categorySlug === category)
    const totalPages = Math.max(1, Math.ceil((count || 0) / POSTS_PER_PAGE))

    return (
        <div className={`${manrope.className} bg-[#F5F6F8]`}>
            <div className="container mx-auto px-4 py-6 sm:py-8">
                <div className="mb-6">
                    <h1 className="mb-2 text-4xl font-bold text-[#0F1B33]">Blog</h1>
                    <p className="text-lg text-[#4A5468]">
                        Commentary on the deals, decisions and developments shaping commercial law.
                    </p>
                </div>

                <div className="mb-6 space-y-3">
                    <SearchInput placeholder="Search posts..." value={search} className="w-full" />
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
                        <div className="space-y-3">
                            {showFeatured && featured ? <FeaturedBlogCard post={featured} /> : null}
                            <Suspense fallback={<div>Loading posts...</div>}>
                                <PostList posts={posts} />
                            </Suspense>
                        </div>

                        {totalPages > 1 && (
                            <div className="mt-8 flex justify-center">
                                <nav className="flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
                                    {page > 1 && (
                                        <a
                                            href={`/blog?page=${page - 1}${search ? `&search=${search}` : ''}${category ? `&category=${category}` : ''}`}
                                            className="rounded-md border border-[#D0D5DD] bg-white px-3 py-2 text-sm font-medium text-[#0F1B33] hover:bg-[#F5F6F8]"
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
                                                    ? 'bg-[#0F1B33] text-white'
                                                    : 'border border-[#D0D5DD] bg-white text-[#0F1B33] hover:bg-[#F5F6F8]'
                                            }`}
                                            aria-current={pageNumber === page ? 'page' : undefined}
                                        >
                                            {pageNumber}
                                        </a>
                                    ))}

                                    {page < totalPages && (
                                        <a
                                            href={`/blog?page=${page + 1}${search ? `&search=${search}` : ''}${category ? `&category=${category}` : ''}`}
                                            className="rounded-md border border-[#D0D5DD] bg-white px-3 py-2 text-sm font-medium text-[#0F1B33] hover:bg-[#F5F6F8]"
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
