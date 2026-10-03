import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { MarkdownRenderer } from '@/components/markdown-renderer'
import { TagPills } from '@/components/blog/tag-pills'
import { DealGlanceBox } from '@/components/blog/deal-glance'
import { InterviewNoteBox } from '@/components/blog/interview-note'
import { RelatedPosts, type RelatedPost } from '@/components/blog/related-posts'
import { SourceList } from '@/components/blog/source-list'
import { categorySlugFromEmbed, comparePostsNewestFirst } from '@/lib/blog-listing'
import { dealGlanceForTitle } from '@/lib/deal-glance'
import { linkGlossaryTerms } from '@/lib/glossary'
import { interviewNoteForTitle } from '@/lib/interview-notes'
import { splitPostContent } from '@/lib/post-content'
import { SITE_SHARE_DESCRIPTION, SITE_SHARE_IMAGE } from '@/lib/site-copy'

interface BlogPostPageProps {
    params: Promise<{ slug: string }>
}

async function getPost(slug: string) {
    const supabase = createClient()

    console.log('Looking for post with slug:', slug)

    const { data: post, error } = await supabase
        .from('posts')
        .select('*, post_categories(categories(slug))')
        .eq('slug', slug)
        .eq('status', 'published')
        .single()

    if (error) {
        console.error('Error fetching post:', error)
        return null
    }

    if (!post) {
        console.log('No post found with slug:', slug)
        return null
    }

    console.log('Found post:', post.title)
    return post
}

async function getRelatedPosts(post: {
    id: string
    post_categories?: unknown
}): Promise<RelatedPost[]> {
    const categorySlug = categorySlugFromEmbed(post.post_categories)
    if (!categorySlug) return []

    const supabase = createClient()
    const { data, error } = await supabase
        .from('posts')
        .select('id, title, slug, published_at, created_at, post_categories!inner(categories!inner(slug))')
        .eq('status', 'published')
        .eq('post_categories.categories.slug', categorySlug)
        .neq('id', post.id)

    if (error || !data) {
        if (error) console.error('Error fetching related posts:', error)
        return []
    }

    return [...data]
        .map((item) => ({
            id: item.id,
            title: item.title,
            slug: item.slug,
            publishedAt: item.published_at,
            createdAt: item.created_at,
            categorySlug: categorySlugFromEmbed(item.post_categories),
        }))
        .sort(comparePostsNewestFirst)
        .slice(0, 3)
        .map(({ title, slug, categorySlug: relatedCategory }) => ({
            title,
            slug,
            categorySlug: relatedCategory,
        }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params
    const post = await getPost(slug)

    if (!post) {
        return {
            title: 'Post Not Found | ClearCut Law',
        }
    }

    return {
        title: `${post.title} | ClearCut Law`,
        description: post.excerpt || (post.content_md ?? post.content ?? '').substring(0, 160),
        openGraph: {
            title: post.title,
            description: SITE_SHARE_DESCRIPTION,
            type: 'article',
            publishedTime: post.created_at,
            modifiedTime: post.updated_at,
            authors: ['ClearCut Law'],
            images: [SITE_SHARE_IMAGE],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: SITE_SHARE_DESCRIPTION,
            images: [SITE_SHARE_IMAGE.url],
        },
    }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params
    const post = await getPost(slug)

    if (!post) {
        notFound()
    }

    const relatedPosts = await getRelatedPosts(post)
    const split = splitPostContent(post.content_md ?? post.content ?? '')
    const body = linkGlossaryTerms(split.body)
    const deal = dealGlanceForTitle(post.title)
    const interview = interviewNoteForTitle(post.title)

    // For now, we'll skip categories and tags until we have the full schema
    const categories: any[] = []
    const tags: any[] = []

    return (
        <article className="container mx-auto px-4 py-8 max-w-4xl">
            <header className="mb-8">
                <div className="mb-4">
                    {categories.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {categories.map((category: any) => (
                                <span
                                    key={category.id}
                                    className="inline-block px-3 py-1 text-sm font-medium text-brand bg-brand-50 rounded-full"
                                >
                                    {category.name}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                <h1 className="text-4xl font-bold text-brand mb-4">{post.title}</h1>

                {post.excerpt && (
                    <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                        {post.excerpt}
                    </p>
                )}

                {tags.length > 0 && (
                    <TagPills tags={tags} />
                )}
            </header>

            {deal ? <DealGlanceBox deal={deal} /> : null}

            <div className="prose prose-lg max-w-none">
                <MarkdownRenderer content={body} />
            </div>

            {interview ? <InterviewNoteBox note={interview} /> : null}
            <SourceList sources={split.sources} />
            {split.disclaimer ? (
                <p className="mt-8 italic text-slate-600">{split.disclaimer}</p>
            ) : null}
            <RelatedPosts posts={relatedPosts} />

            <footer className="mt-12 pt-8 border-t border-gray-200">
                <div className="text-sm text-gray-500">
                    <p>
                        This article is commentary, not legal advice. ClearCut Law is a commentary site, not a law firm.
                    </p>
                </div>
            </footer>
        </article>
    )
}
