import Link from 'next/link'
import { BLOG_CATEGORY_PRESENTATION } from '@/lib/blog-categories'
import {
    blogCardDateIso,
    cardPreview,
    formatBlogCardDate,
    readingMinutesFromContent,
    type BlogListPost,
} from '@/lib/blog-listing'
import { cn } from '@/lib/utils'
import { FeaturedMedia } from './featured-media'

function CategoryTag({ post }: { post: BlogListPost }) {
    if (!post.categorySlug) return null
    const presentation = BLOG_CATEGORY_PRESENTATION[post.categorySlug]

    return (
        <span
            className={cn(
                'inline-flex w-fit items-center rounded px-2 py-0.5 text-[11px] font-semibold uppercase leading-4 tracking-wide',
                presentation.tagClassName
            )}
        >
            {presentation.label}
        </span>
    )
}

function CardCopy({ post, featured = false }: { post: BlogListPost; featured?: boolean }) {
    const preview = cardPreview(post)
    const publishedIso = blogCardDateIso(post)
    const minutes = readingMinutesFromContent(post.content)

    return (
        <div className="flex min-w-0 flex-col gap-1.5">
            <CategoryTag post={post} />
            <h2
                className={cn(
                    'font-bold leading-snug text-[#0F1B33]',
                    featured ? 'text-xl sm:text-2xl' : 'text-base'
                )}
            >
                {post.title}
            </h2>
            {preview ? (
                <p
                    className={cn(
                        'text-sm leading-5 text-[#4A5468]',
                        preview.limitToTwoLines && 'line-clamp-2'
                    )}
                >
                    {preview.text}
                </p>
            ) : null}
            <p className="text-xs leading-4 text-[#5B6577]">
                <time dateTime={publishedIso}>{formatBlogCardDate(publishedIso)}</time>
                {` · ${minutes} min read`}
            </p>
        </div>
    )
}

const cardClassName =
    'block h-full overflow-hidden rounded-xl border border-[#E3E6EB] bg-white transition-colors hover:border-[#C5CAD3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F1B33] focus-visible:ring-offset-2'

export function BlogPostCard({ post }: { post: BlogListPost }) {
    return (
        <Link href={`/blog/${post.slug}`} className={cn(cardClassName, 'px-3.5 py-3')}>
            <CardCopy post={post} />
        </Link>
    )
}

export function FeaturedBlogCard({ post }: { post: BlogListPost }) {
    return (
        <Link
            href={`/blog/${post.slug}`}
            className={cn(cardClassName, 'grid md:grid-cols-[17rem_minmax(0,1fr)]')}
        >
            <FeaturedMedia imageUrl={post.heroImageUrl} />
            <div className="px-4 py-3 sm:px-5 sm:py-4">
                <CardCopy post={post} featured />
            </div>
        </Link>
    )
}
