import Link from 'next/link'
import { PostCard } from './post-card'

interface Post {
    id: string
    title: string
    slug: string
    excerpt?: string
    content: string
    status: string
    created_at: string
    updated_at: string
    read_time?: number
    categories?: Array<{
        category_id: string
        categories: {
            id: string
            name: string
            slug: string
        }
    }>
    tags?: Array<{
        tag_id: string
        tags: {
            id: string
            name: string
            slug: string
        }
    }>
}

interface PostListProps {
    posts: Post[]
}

export function PostList({ posts }: PostListProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    )
}


