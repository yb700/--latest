import type { BlogListPost } from '@/lib/blog-listing'
import { BlogPostCard } from './post-card'

export function PostList({ posts }: { posts: BlogListPost[] }) {
    return (
        <div className="flex flex-col gap-3">
            {posts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
            ))}
        </div>
    )
}
