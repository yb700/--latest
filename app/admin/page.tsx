import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
    FileText,
    MessageSquare,
    Users,
    Settings,
    Plus,
    Eye
} from 'lucide-react'

export const metadata: Metadata = {
    title: 'Admin Dashboard | ClearLegal',
    description: 'Admin dashboard for managing ClearLegal content.',
}

export default async function AdminPage() {
    const quickActions = [
        {
            title: 'New Post',
            description: 'Create a new blog post',
            icon: Plus,
            href: '/admin/posts/new',
            color: 'text-blue-600',
        },
        {
            title: 'Review Questions',
            description: 'Review pending guidance questions',
            icon: MessageSquare,
            href: '/admin/guidance',
            color: 'text-green-600',
        },
        {
            title: 'View Messages',
            description: 'Check contact form submissions',
            icon: Eye,
            href: '/admin/contact',
            color: 'text-purple-600',
        },
        {
            title: 'Site Settings',
            description: 'Manage site configuration',
            icon: Settings,
            href: '/admin/settings',
            color: 'text-gray-600',
        },
    ]

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-brand">Dashboard</h1>
                <p className="text-gray-600">Welcome to the ClearLegal admin dashboard.</p>
            </div>

            {/* Quick Actions */}
            <div>
                <h2 className="text-xl font-semibold text-brand mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {quickActions.map((action) => (
                        <Card key={action.title} className="hover:shadow-md transition-shadow">
                            <CardHeader>
                                <div className="flex items-center space-x-2">
                                    <action.icon className={`h-5 w-5 ${action.color}`} />
                                    <CardTitle className="text-lg">{action.title}</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-600 mb-4">{action.description}</p>
                                <Link href={action.href}>
                                    <Button className="w-full">Go to {action.title}</Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Simple Stats */}
            <div>
                <h2 className="text-xl font-semibold text-brand mb-4">Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">0</div>
                            <p className="text-xs text-muted-foreground">No posts yet</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Guidance Questions</CardTitle>
                            <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">0</div>
                            <p className="text-xs text-muted-foreground">No questions yet</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Contact Messages</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">0</div>
                            <p className="text-xs text-muted-foreground">No messages yet</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Site Status</CardTitle>
                            <Settings className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">Active</div>
                            <p className="text-xs text-muted-foreground">Site is running</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

