import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { MarkdownRenderer } from '@/components/markdown-renderer'
import { TagPills } from '@/components/blog/tag-pills'
import { formatDate } from '@/lib/utils'

interface BlogPostPageProps {
    params: { slug: string }
}

async function getPost(slug: string) {
    const supabase = createClient()

    console.log('Looking for post with slug:', slug)

    const { data: post, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single()

    if (error) {
        console.error('Error fetching post:', error)
        return null
    }

    if (!post) {
        console.log('No post found with slug:', slug)
        return null
    }

    console.log('Found post:', post.title)
    return post
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const post = await getPost(params.slug)

    if (!post) {
        return {
            title: 'Post Not Found | ClearLegal',
        }
    }

    return {
        title: `${post.title} | ClearLegal`,
        description: post.excerpt || post.content.substring(0, 160),
        openGraph: {
            title: post.title,
            description: post.excerpt || post.content.substring(0, 160),
            type: 'article',
            publishedTime: post.created_at,
            modifiedTime: post.updated_at,
            authors: ['ClearLegal'],
        },
    }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const post = await getPost(params.slug)

    if (!post) {
        notFound()
    }

    // For now, we'll skip categories and tags until we have the full schema
    const categories: any[] = []
    const tags: any[] = []

    return (
        <article className="container mx-auto px-4 py-8 max-w-4xl">
            <header className="mb-8">
                <div className="mb-4">
                    {categories.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {categories.map((category: any) => (
                                <span
                                    key={category.id}
                                    className="inline-block px-3 py-1 text-sm font-medium text-brand bg-brand-50 rounded-full"
                                >
                                    {category.name}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                <h1 className="text-4xl font-bold text-brand mb-4">{post.title}</h1>

                {post.excerpt && (
                    <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                        {post.excerpt}
                    </p>
                )}

                <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                    <time dateTime={post.created_at}>
                        {formatDate(post.created_at)}
                    </time>
                    {post.read_time && (
                        <span>{post.read_time} min read</span>
                    )}
                </div>

                {tags.length > 0 && (
                    <TagPills tags={tags} />
                )}
            </header>

            <div className="prose prose-lg max-w-none">
                <MarkdownRenderer content={post.content} />
            </div>

            <footer className="mt-12 pt-8 border-t border-gray-200">
                <div className="text-sm text-gray-500">
                    <p>
                        This article is for informational purposes only and does not constitute legal advice.
                        For specific legal guidance, please consult with a qualified legal professional.
                    </p>
                </div>
            </footer>
        </article>
    )
}

