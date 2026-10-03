import type { BlogListPost } from '@/lib/blog-listing'
import { BlogPostCard } from './post-card'

export function PostList({ posts }: { posts: BlogListPost[] }) {
    return (
        <ul className="list-none divide-y divide-[#E7E4DF] border-y border-[#E7E4DF]">
            {posts.map((post) => (
                <li key={post.id} className="py-6">
                    <BlogPostCard post={post} />
                </li>
            ))}
        </ul>
    )
}
