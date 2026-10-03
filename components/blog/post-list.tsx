import type { BlogListPost } from '@/lib/blog-listing'
import { BlogPostCard } from './post-card'

export function PostList({ posts }: { posts: BlogListPost[] }) {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
            ))}
        </div>
    )
}
