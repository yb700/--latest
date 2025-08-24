'use client'

import { ReactNode } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
    LayoutDashboard,
    FileText,
    MessageSquare,
    Settings,
    Users,
    LogOut
} from 'lucide-react'
import { signOut } from '@/lib/auth-client'

interface AdminShellProps {
    children: ReactNode
}

const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Posts', href: '/admin/posts', icon: FileText },
    { name: 'Guidance', href: '/admin/guidance', icon: MessageSquare },
    { name: 'Contact', href: '/admin/contact', icon: Users },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
]

export function AdminShell({ children }: AdminShellProps) {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <Link href="/admin" className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">CL</span>
                                </div>
                                <span className="text-xl font-bold text-brand">ClearLegal Admin</span>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link href="/" className="text-sm text-gray-600 hover:text-brand">
                                View Site
                            </Link>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => signOut()}
                                className="flex items-center space-x-2"
                            >
                                <LogOut className="h-4 w-4" />
                                <span>Sign Out</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex gap-8">
                    {/* Sidebar */}
                    <aside className="w-64 flex-shrink-0">
                        <nav className="space-y-2">
                            {navigation.map((item) => {
                                const Icon = item.icon
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="flex items-center space-x-3 px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 hover:text-brand transition-colors"
                                    >
                                        <Icon className="h-5 w-5" />
                                        <span>{item.name}</span>
                                    </Link>
                                )
                            })}
                        </nav>
                    </aside>

                    {/* Main content */}
                    <main className="flex-1">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    )
}


