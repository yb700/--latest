'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ArrowLeft, Plus, Edit, Eye, Trash2, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useToast } from '@/hooks/use-toast'

interface Post {
    id: string
    title: string
    slug: string
    excerpt: string | null
    status: 'draft' | 'published' | 'archived'
    published_at: string | null
    created_at: string
    author: { full_name: string | null } | null
}

export default function PostsManagementPage() {
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(true)
    const [deletingId, setDeletingId] = useState<string | null>(null)
    const { toast } = useToast()

    const fetchPosts = async () => {
        try {
            const response = await fetch('/api/admin/posts')
            const data = await response.json()
            if (data.posts) {
                setPosts(data.posts)
            }
        } catch (error) {
            console.error('Error fetching posts:', error)
            toast({
                title: 'Error',
                description: 'Failed to load posts',
                variant: 'destructive',
            })
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    const handleDelete = async (id: string, title: string) => {
        if (!confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
            return
        }

        setDeletingId(id)
        try {
            const response = await fetch(`/api/admin/posts/${id}`, {
                method: 'DELETE',
            })

            if (!response.ok) {
                throw new Error('Failed to delete post')
            }

            toast({
                title: 'Success',
                description: 'Post deleted successfully',
            })

            // Remove the post from the list
            setPosts(posts.filter(p => p.id !== id))
        } catch (error) {
            console.error('Error deleting post:', error)
            toast({
                title: 'Error',
                description: 'Failed to delete post',
                variant: 'destructive',
            })
        } finally {
            setDeletingId(null)
        }
    }

    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'Not published'
        return new Date(dateString).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        })
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'published':
                return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Published</Badge>
            case 'draft':
                return <Badge variant="secondary">Draft</Badge>
            case 'archived':
                return <Badge variant="outline">Archived</Badge>
            default:
                return <Badge variant="secondary">{status}</Badge>
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Link href="/admin">
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Dashboard
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-brand">Posts Management</h1>
                        <p className="text-gray-600">Manage your blog posts and content.</p>
                    </div>
                </div>
                <Link href="/admin/posts/new">
                    <Button className="flex items-center space-x-2">
                        <Plus className="h-4 w-4" />
                        <span>New Post</span>
                    </Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Posts ({posts.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex items-center justify-center py-8">
                            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                        </div>
                    ) : posts.length === 0 ? (
                        <div className="text-center py-8">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <Edit className="h-6 w-6 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
                            <p className="text-gray-500 mb-4">
                                Create your first blog post to get started.
                            </p>
                            <Link href="/admin/posts/new">
                                <Button>Create Your First Post</Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {posts.map((post) => (
                                <div
                                    key={post.id}
                                    className="py-4 flex items-start justify-between gap-4"
                                >
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-medium text-gray-900 truncate">
                                                {post.title}
                                            </h3>
                                            {getStatusBadge(post.status)}
                                        </div>
                                        {post.excerpt && (
                                            <p className="text-sm text-gray-500 line-clamp-2 mb-2">
                                                {post.excerpt}
                                            </p>
                                        )}
                                        <div className="flex items-center gap-4 text-xs text-gray-400">
                                            <span>
                                                By {post.author?.full_name || 'Unknown'}
                                            </span>
                                            <span>•</span>
                                            <span>
                                                {post.status === 'published'
                                                    ? `Published ${formatDate(post.published_at)}`
                                                    : `Created ${formatDate(post.created_at)}`}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0">
                                        {post.status === 'published' && (
                                            <Link href={`/blog/${post.slug}`} target="_blank">
                                                <Button variant="ghost" size="sm" title="View post">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                        )}
                                        <Link href={`/admin/posts/${post.id}/edit`}>
                                            <Button variant="ghost" size="sm" title="Edit post">
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            title="Delete post"
                                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                            onClick={() => handleDelete(post.id, post.title)}
                                            disabled={deletingId === post.id}
                                        >
                                            {deletingId === post.id ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            ) : (
                                                <Trash2 className="h-4 w-4" />
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
