import Link from 'next/link'
import { cardPreview, type BlogListPost } from '@/lib/blog-listing'
import { cn } from '@/lib/utils'

export function BlogPostCard({ post }: { post: BlogListPost }) {
    const preview = cardPreview(post)

    return (
        <Link
            href={`/blog/${post.slug}`}
            className="block rounded-2xl border border-[#E7E4DF] bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.05)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#151515] focus-visible:ring-offset-2"
        >
            <h2 className="font-medium leading-snug tracking-[-0.5px] text-[#151515]">{post.title}</h2>
            {preview ? (
                <p
                    className={cn(
                        'mt-2 text-sm leading-5 text-[#5E5E5E]',
                        preview.limitToTwoLines && 'line-clamp-4'
                    )}
                >
                    {preview.text}
                </p>
            ) : null}
        </Link>
    )
}
