import Link from 'next/link'
import { BLOG_CATEGORY_PRESENTATION, type BlogCategorySlug } from '@/lib/blog-categories'

export type RelatedPost = {
    title: string
    slug: string
    categorySlug: BlogCategorySlug | null
}

export function RelatedPosts({ posts }: { posts: RelatedPost[] }) {
    if (posts.length === 0) return null

    return (
        <section className="mt-10" aria-label="Related posts">
            <h2 className="mb-4 text-lg font-semibold text-[#14213D]">Related posts</h2>
            <ul className="space-y-3">
                {posts.map((post) => {
                    const label = post.categorySlug ? BLOG_CATEGORY_PRESENTATION[post.categorySlug].label : null
                    return (
                        <li key={post.slug} className="rounded-xl border border-[#E6E8EC] bg-white px-4 py-3">
                            {label ? (
                                <p className="text-xs font-medium uppercase tracking-wide text-[#8A92A3]">{label}</p>
                            ) : null}
                            <Link href={`/blog/${post.slug}`} className="font-semibold text-[#14213D] hover:underline">
                                {post.title}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}
