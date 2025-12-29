import Link from 'next/link'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'

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

interface PostCardProps {
    post: Post
}

export function PostCard({ post }: PostCardProps) {
    const categories = post.categories?.map((pc) => pc.categories) || []

    return (
        <Card className="h-full hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-3">
                <div className="flex flex-wrap gap-2 mb-2">
                    {categories.slice(0, 2).map((category) => (
                        <Badge
                            key={category.id}
                            variant="secondary"
                            className="text-xs bg-brand-50 text-brand"
                        >
                            {category.name}
                        </Badge>
                    ))}
                </div>
                <Link href={`/blog/${post.slug}`}>
                    <h3 className="text-xl font-semibold text-brand hover:text-brand-700 transition-colors line-clamp-2">
                        {post.title}
                    </h3>
                </Link>
            </CardHeader>
            <CardContent className="pt-0">
                {post.excerpt && (
                    <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.excerpt}
                    </p>
                )}
                <div className="flex items-center justify-between text-sm text-gray-500">
                    <time dateTime={post.created_at}>
                        {formatDate(post.created_at)}
                    </time>
                </div>
            </CardContent>
        </Card>
    )
}


