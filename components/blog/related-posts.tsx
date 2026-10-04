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
            <h2 className="mb-4 text-lg font-semibold text-[#151515]">Related posts</h2>
            <ul className="list-none divide-y divide-[#E7E4DF] border-y border-[#E7E4DF]">
                {posts.map((post) => {
                    const label = post.categorySlug ? BLOG_CATEGORY_PRESENTATION[post.categorySlug].label : null
                    return (
                        <li key={post.slug} className="py-4">
                            {label ? (
                                <p className="text-[11px] font-semibold uppercase tracking-wide text-[#8A8780]">{label}</p>
                            ) : null}
                            <Link href={`/blog/${post.slug}`} className="mt-1 block font-semibold text-[#151515] hover:underline">
                                {post.title}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}
