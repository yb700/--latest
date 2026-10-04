import type { BlogListPost } from '@/lib/blog-listing'
import { BlogPostCard } from './post-card'

export function PostList({ posts }: { posts: BlogListPost[] }) {
    return (
        <ul className="list-none space-y-4">
            {posts.map((post) => (
                <li key={post.id}>
                    <BlogPostCard post={post} />
                </li>
            ))}
        </ul>
    )
}
