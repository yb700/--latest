import Link from 'next/link'
import { BLOG_CATEGORY_PRESENTATION } from '@/lib/blog-categories'
import {
    blogCardDateIso,
    formatBlogCardDate,
    type BlogListPost,
} from '@/lib/blog-listing'
import { cn } from '@/lib/utils'
import { PostThumbnail } from './featured-media'

function CategoryLabel({ post }: { post: BlogListPost }) {
    if (!post.categorySlug) return null
    const presentation = BLOG_CATEGORY_PRESENTATION[post.categorySlug]

    return (
        <p className={cn('text-[11px] font-semibold uppercase tracking-wide', presentation.tagClassName)}>
            {presentation.label}
        </p>
    )
}

export function BlogPostCard({ post }: { post: BlogListPost }) {
    const publishedIso = blogCardDateIso(post)

    return (
        <Link
            href={`/blog/${post.slug}`}
            className="flex items-center gap-4 rounded-xl border border-[#E6E8EC] bg-white p-3 transition-colors hover:border-[#D5D9E0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14213D] focus-visible:ring-offset-2"
        >
            <PostThumbnail imageUrl={post.heroImageUrl} className="h-16 w-16 sm:h-20 sm:w-20" />
            <div className="flex min-w-0 flex-col gap-1">
                <CategoryLabel post={post} />
                <h2 className="font-bold leading-snug text-[#14213D]">{post.title}</h2>
                <p className="text-xs text-[#8A92A3]">
                    <time dateTime={publishedIso}>{formatBlogCardDate(publishedIso)}</time>
                </p>
            </div>
        </Link>
    )
}

export function FeaturedBlogCard({ post }: { post: BlogListPost }) {
    const publishedIso = blogCardDateIso(post)

    return (
        <Link
            href={`/blog/${post.slug}`}
            className={cn(
                'flex items-center gap-4 rounded-xl border border-[#E6E8EC] bg-white p-3 transition-colors hover:border-[#D5D9E0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14213D] focus-visible:ring-offset-2 sm:p-4'
            )}
        >
            <PostThumbnail imageUrl={post.heroImageUrl} className="h-20 w-20 sm:h-28 sm:w-28" />
            <div className="flex min-w-0 flex-col gap-1.5">
                <CategoryLabel post={post} />
                <h2 className="text-lg font-bold leading-snug text-[#14213D] sm:text-2xl">{post.title}</h2>
                <p className="text-xs text-[#8A92A3]">
                    <time dateTime={publishedIso}>{formatBlogCardDate(publishedIso)}</time>
                </p>
            </div>
        </Link>
    )
}
