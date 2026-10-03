import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { BLOG_CATEGORY_PRESENTATION } from '@/lib/blog-categories'
import {
    blogCardDateIso,
    cardPreview,
    formatBlogCardDate,
    type BlogListPost,
} from '@/lib/blog-listing'
import { cn } from '@/lib/utils'

export function BlogPostCard({ post }: { post: BlogListPost }) {
    const publishedIso = blogCardDateIso(post)
    const preview = cardPreview(post)
    const label = post.categorySlug ? BLOG_CATEGORY_PRESENTATION[post.categorySlug].label : null

    return (
        <Link href={`/blog/${post.slug}`} className="flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#151515] focus-visible:ring-offset-2">
            <div className="flex items-start justify-between gap-3">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-[#8A8780]">
                    {label}
                </p>
                <time
                    dateTime={publishedIso}
                    className="shrink-0 text-[11px] font-semibold uppercase tracking-wide text-[#8A8780]"
                >
                    {formatBlogCardDate(publishedIso)}
                </time>
            </div>
            <h2 className="mt-2 font-semibold leading-snug tracking-[-0.5px] text-[#151515]">{post.title}</h2>
            {preview ? (
                <p
                    className={cn(
                        'mt-2 text-sm leading-5 text-[#5E5E5E]',
                        preview.limitToTwoLines && 'line-clamp-2'
                    )}
                >
                    {preview.text}
                </p>
            ) : null}
            <span className="mt-4 inline-flex w-full items-center justify-between text-sm font-semibold text-[#151515]">
                Read post
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </span>
        </Link>
    )
}
