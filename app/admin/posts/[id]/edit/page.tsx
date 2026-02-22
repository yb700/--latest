'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Loader2, Trash2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState, useEffect } from 'react'

const postSchema = z.object({
    title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
    excerpt: z.string().min(1, 'Excerpt is required').max(500, 'Excerpt too long'),
    content: z.string().min(1, 'Content is required'),
    status: z.enum(['draft', 'published', 'review']),
    published_at: z.string().optional()
})

type PostFormData = z.infer<typeof postSchema>

export default function EditPostPage() {
    const { toast } = useToast()
    const router = useRouter()
    const params = useParams()
    const postId = params.id as string

    const [isLoading, setIsLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const form = useForm<PostFormData>({
        resolver: zodResolver(postSchema),
        defaultValues: {
            title: '',
            excerpt: '',
            content: '',
            status: 'draft',
            published_at: ''
        }
    })

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`/api/admin/posts/${postId}`)
                if (!response.ok) {
                    throw new Error('Post not found')
                }
                const data = await response.json()
                const post = data.post

                // Format the date for the datetime-local input (use local time, not UTC)
                let formattedDate = ''
                if (post.published_at) {
                    const date = new Date(post.published_at)
                    const pad = (n: number) => String(n).padStart(2, '0')
                    formattedDate = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
                }

                form.reset({
                    title: post.title || '',
                    excerpt: post.excerpt || '',
                    content: post.content_md ?? post.content ?? '',
                    status: post.status || 'draft',
                    published_at: formattedDate
                })
            } catch (error) {
                console.error('Error fetching post:', error)
                toast({
                    title: 'Error',
                    description: 'Failed to load post',
                    variant: 'destructive',
                })
                router.push('/admin/posts')
            } finally {
                setIsLoading(false)
            }
        }

        if (postId) {
            fetchPost()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [postId])

    const onSubmit = async (data: PostFormData) => {
        setIsSubmitting(true)
        try {
            const response = await fetch(`/api/admin/posts/${postId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...data,
                    published_at: data.published_at ? new Date(data.published_at).toISOString() : null
                }),
            })

            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.error || 'Failed to update post')
            }

            toast({
                title: 'Success!',
                description: 'Post updated successfully.',
            })

            router.push('/admin/posts')
        } catch (error) {
            console.error('Error updating post:', error)
            toast({
                title: 'Error',
                description: error instanceof Error ? error.message : 'Failed to update post',
                variant: 'destructive',
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
            return
        }

        setIsDeleting(true)
        try {
            const response = await fetch(`/api/admin/posts/${postId}`, {
                method: 'DELETE',
            })

            if (!response.ok) {
                throw new Error('Failed to delete post')
            }

            toast({
                title: 'Success',
                description: 'Post deleted successfully',
            })

            router.push('/admin/posts')
        } catch (error) {
            console.error('Error deleting post:', error)
            toast({
                title: 'Error',
                description: 'Failed to delete post',
                variant: 'destructive',
            })
        } finally {
            setIsDeleting(false)
        }
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Link href="/admin/posts">
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Posts
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-brand">Edit Post</h1>
                        <p className="text-gray-600">Update your blog post.</p>
                    </div>
                </div>
                <Button
                    variant="outline"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                    onClick={handleDelete}
                    disabled={isDeleting}
                >
                    {isDeleting ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                        <Trash2 className="h-4 w-4 mr-2" />
                    )}
                    Delete Post
                </Button>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Card>
                    <CardHeader>
                        <CardTitle>Post Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                placeholder="Enter post title..."
                                className="w-full"
                                {...form.register('title')}
                            />
                            {form.formState.errors.title && (
                                <p className="text-sm text-red-600">{form.formState.errors.title.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="excerpt">Excerpt</Label>
                            <Textarea
                                id="excerpt"
                                placeholder="Brief description of the post..."
                                className="w-full"
                                rows={3}
                                {...form.register('excerpt')}
                            />
                            {form.formState.errors.excerpt && (
                                <p className="text-sm text-red-600">{form.formState.errors.excerpt.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="content">Content</Label>
                            <Textarea
                                id="content"
                                placeholder="Write your post content here... (Markdown supported)"
                                className="w-full"
                                rows={15}
                                {...form.register('content')}
                            />
                            {form.formState.errors.content && (
                                <p className="text-sm text-red-600">{form.formState.errors.content.message}</p>
                            )}
                            <p className="text-sm text-gray-500">
                                You can use Markdown formatting for rich content.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="status">Status</Label>
                                <Select
                                    value={form.watch('status')}
                                    onValueChange={(value) => form.setValue('status', value as 'draft' | 'published' | 'review')}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="draft">Draft</SelectItem>
                                        <SelectItem value="published">Published</SelectItem>
                                        <SelectItem value="review">Review</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="published_at">Publish Date</Label>
                                <Input
                                    id="published_at"
                                    type="datetime-local"
                                    className="w-full"
                                    {...form.register('published_at')}
                                />
                                <p className="text-sm text-gray-500">
                                    Leave empty to use current time when publishing.
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-4 pt-4 border-t">
                            <Link href="/admin/posts">
                                <Button type="button" variant="outline">Cancel</Button>
                            </Link>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                                Save Changes
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    )
}

