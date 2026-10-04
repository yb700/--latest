import Link from 'next/link'
import { BLOG_CATEGORY_PRESENTATION } from '@/lib/blog-categories'
import { blogCardDateIso, blogCardSummary, formatBlogCardDate, type BlogListPost } from '@/lib/blog-listing'

export function BlogPostCard({ post }: { post: BlogListPost }) {
    const summary = blogCardSummary(post)
    const category = post.categorySlug ? BLOG_CATEGORY_PRESENTATION[post.categorySlug].label : null
    const date = formatBlogCardDate(blogCardDateIso(post))
    const meta = [category, date].filter(Boolean).join(' · ')

    return (
        <article className="rounded-2xl border border-[#E7E4DF] bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
            {meta ? <p className="text-xs text-[#8A8780]">{meta}</p> : null}
            <h2 className="mt-2 text-lg font-bold leading-snug tracking-[-0.5px] text-[#151515]">
                <Link
                    href={`/blog/${post.slug}`}
                    className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#151515] focus-visible:ring-offset-2"
                >
                    {post.title}
                </Link>
            </h2>
            {summary ? <p className="mt-2 text-sm leading-5 text-[#5E5E5E]">{summary}</p> : null}
            <Link
                href={`/blog/${post.slug}`}
                className="mt-4 inline-block text-sm font-medium text-[#151515] underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#151515] focus-visible:ring-offset-2"
            >
                Read post
            </Link>
        </article>
    )
}
