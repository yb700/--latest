import Link from 'next/link'
import { BLOG_CATEGORY_PRESENTATION, type BlogCategorySlug } from '@/lib/blog-categories'

export type RelatedPost = {
    title: string
    slug: string
    categorySlug: BlogCategorySlug | null
}

/** The list stays in the repo. It is not shown on post pages. */
export const SHOW_RELATED_POSTS = false

export function RelatedPosts({ posts }: { posts: RelatedPost[] }) {
    if (!SHOW_RELATED_POSTS) return null
    if (posts.length === 0) return null

    return (
        <section className="mt-10" aria-label="Related posts">
            <h2 className="mb-4 text-lg font-semibold text-[#151515]">Related posts</h2>
            <ul className="list-none space-y-3">
                {posts.map((post) => {
                    const label = post.categorySlug ? BLOG_CATEGORY_PRESENTATION[post.categorySlug].label : null
                    return (
                        <li key={post.slug}>
                            <Link
                                href={`/blog/${post.slug}`}
                                className="block rounded-2xl border border-[#E7E4DF] bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.05)] hover:underline"
                            >
                                {label ? (
                                    <p className="text-[11px] font-semibold uppercase tracking-wide text-[#8A8780]">{label}</p>
                                ) : null}
                                <span className="mt-1 block font-medium text-[#151515]">{post.title}</span>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}
