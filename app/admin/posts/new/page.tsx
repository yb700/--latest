'use client'

'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'

const postSchema = z.object({
    title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
    excerpt: z.string().min(1, 'Excerpt is required').max(500, 'Excerpt too long'),
    content: z.string().min(1, 'Content is required'),
    status: z.enum(['draft', 'published']),
    category: z.string().optional()
})

type PostFormData = z.infer<typeof postSchema>

export default function NewPostPage() {
    const { toast } = useToast()
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<PostFormData>({
        resolver: zodResolver(postSchema),
        defaultValues: {
            status: 'draft',
            category: ''
        }
    })

    const onSubmit = async (data: PostFormData) => {
        setIsSubmitting(true)
        try {
            const response = await fetch('/api/admin/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.error || 'Failed to create post')
            }

            toast({
                title: 'Success!',
                description: 'Post created successfully.',
            })

            router.push('/admin')
        } catch (error) {
            console.error('Error creating post:', error)
            toast({
                title: 'Error',
                description: error instanceof Error ? error.message : 'Failed to create post',
                variant: 'destructive',
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center space-x-4">
                <Link href="/admin">
                    <Button variant="ghost" size="sm">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Dashboard
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-brand">Create New Post</h1>
                    <p className="text-gray-600">Write a new blog post for ClearLegal.</p>
                </div>
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
                                <Select onValueChange={(value) => form.setValue('status', value as 'draft' | 'published')}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="draft">Draft</SelectItem>
                                        <SelectItem value="published">Published</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="category">Category</Label>
                                <Select onValueChange={(value) => form.setValue('category', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="legal-analysis">Legal Analysis</SelectItem>
                                        <SelectItem value="practical-guidance">Practical Guidance</SelectItem>
                                        <SelectItem value="legal-education">Legal Education</SelectItem>
                                        <SelectItem value="case-law">Case Law</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-4">
                            <Link href="/admin">
                                <Button type="button" variant="outline">Cancel</Button>
                            </Link>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                                Create Post
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    )
}
