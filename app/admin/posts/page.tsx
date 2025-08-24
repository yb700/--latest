import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ArrowLeft, Plus, Edit, Eye, Trash2 } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Posts Management | Admin | ClearLegal',
    description: 'Manage blog posts.',
}

export default function PostsManagementPage() {
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
                    <CardTitle>All Posts</CardTitle>
                </CardHeader>
                <CardContent>
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
                </CardContent>
            </Card>
        </div>
    )
}
