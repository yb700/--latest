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

const cardClassName =
    'flex h-full flex-col rounded-xl border border-[#E6E8EC] bg-white p-4 transition-colors hover:border-[#D5D9E0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14213D] focus-visible:ring-offset-2'

export function BlogPostCard({ post }: { post: BlogListPost }) {
    const publishedIso = blogCardDateIso(post)
    const preview = cardPreview(post)
    const label = post.categorySlug ? BLOG_CATEGORY_PRESENTATION[post.categorySlug].label : null

    return (
        <Link href={`/blog/${post.slug}`} className={cardClassName}>
            <div className="flex items-start justify-between gap-3">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-[#8A92A3]">
                    {label}
                </p>
                <time
                    dateTime={publishedIso}
                    className="shrink-0 text-[11px] font-semibold uppercase tracking-wide text-[#8A92A3]"
                >
                    {formatBlogCardDate(publishedIso)}
                </time>
            </div>
            <h2 className="mt-2 font-bold leading-snug text-[#14213D]">{post.title}</h2>
            {preview ? (
                <p
                    className={cn(
                        'mt-2 text-sm leading-5 text-[#5A6270]',
                        preview.limitToTwoLines && 'line-clamp-2'
                    )}
                >
                    {preview.text}
                </p>
            ) : null}
            <span className="mt-auto inline-flex items-center pt-4 text-sm font-semibold text-[#14213D]">
                Read post
                <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
            </span>
        </Link>
    )
}
