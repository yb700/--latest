import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { MarkdownRenderer } from '@/components/markdown-renderer'
import { DealGlanceBox } from '@/components/blog/deal-glance'
import { GlossaryText } from '@/components/blog/glossary-text'
import { InterviewNoteBox } from '@/components/blog/interview-note'
import { RelatedPosts, type RelatedPost } from '@/components/blog/related-posts'
import { SourceList } from '@/components/blog/source-list'
import { BLOG_CATEGORY_PRESENTATION, sectionSlugForTitle } from '@/lib/blog-categories'
import { blogCardDateIso, categorySlugFromEmbed, comparePostsNewestFirst, formatBlogCardDate } from '@/lib/blog-listing'
import { dealGlanceForTitle, type DealGlance } from '@/lib/deal-glance'
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

function linkDeal(deal: DealGlance, linked: Set<string>): DealGlance {
    const link = (value?: string) => (value ? linkGlossaryTerms(value, linked) : value)
    return {
        ...deal,
        parties: link(deal.parties),
        value: link(deal.value),
        advisers: link(deal.advisers),
        keyLaw: link(deal.keyLaw),
    }
}

async function getRelatedPosts(post: {
    id: string
    title: string
    post_categories?: unknown
}): Promise<RelatedPost[]> {
    const categorySlug = categorySlugFromEmbed(post.post_categories) ?? sectionSlugForTitle(post.title)
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
    const linkedTerms = new Set<string>()
    const excerpt = post.excerpt ? linkGlossaryTerms(post.excerpt, linkedTerms) : null
    const rawDeal = dealGlanceForTitle(post.title)
    const deal = rawDeal ? linkDeal(rawDeal, linkedTerms) : null
    const body = linkGlossaryTerms(split.body, linkedTerms)
    const interview = interviewNoteForTitle(post.title)
    const categorySlug = categorySlugFromEmbed(post.post_categories) ?? sectionSlugForTitle(post.title)
    const sectionLabel = categorySlug ? BLOG_CATEGORY_PRESENTATION[categorySlug].label : null
    const publishedIso = blogCardDateIso({
        publishedAt: post.published_at,
        createdAt: post.created_at,
    })
    const publishedLabel = formatBlogCardDate(publishedIso)

    return (
        <article className="container mx-auto max-w-4xl bg-[#FAF9F7] px-4 py-8">
            <header className="mb-8">
                <Link href="/blog" className="text-sm font-medium text-[#151515] underline underline-offset-4">
                    Back to the blog
                </Link>
                {sectionLabel ? (
                    <p className="mb-2 mt-6 text-[11px] font-semibold uppercase tracking-wide text-[#8A8780]">
                        {sectionLabel}
                    </p>
                ) : null}

                <h1 className="mb-4 text-4xl font-semibold text-[#151515]">{post.title}</h1>

                {excerpt && (
                    <p className="mb-6 text-xl leading-relaxed text-[#5E5E5E]">
                        <GlossaryText text={excerpt} />
                    </p>
                )}

                <p className="text-sm text-[#5E5E5E]">
                    Younas Ficel
                    {publishedLabel ? (
                        <>
                            {' · '}
                            <time dateTime={publishedIso}>{publishedLabel}</time>
                        </>
                    ) : null}
                </p>
            </header>

            {deal ? <DealGlanceBox deal={deal} /> : null}

            <div className="prose prose-lg max-w-none">
                <MarkdownRenderer content={body} />
            </div>

            {interview ? <InterviewNoteBox note={interview} /> : null}
            <SourceList sources={split.sources} />
            <RelatedPosts posts={relatedPosts} />

            <footer className="mt-12 rounded-2xl border border-[#E7E4DF] bg-[#F3F1ED] p-6 text-sm text-[#5E5E5E]">
                <p>
                    This post is general commentary and not legal advice. ClearCut Law is a commentary site, not a law firm.
                </p>
            </footer>
        </article>
    )
}
