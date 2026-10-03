"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, User, LogOut, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BrandWordmark } from "@/components/layout/brand-logo"
import { Profile } from "@/lib/supabase/types"
import { signOut } from "@/lib/auth-client"

interface SiteHeaderProps {
    user?: Profile | null
}

const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Legal News", href: "/news" },
    { name: "Contact", href: "/contact" },
]

export function SiteHeader({ user }: SiteHeaderProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const handleSignOut = async () => {
        await signOut()
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center">
                            <BrandWordmark />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-slate-700 hover:text-brand transition-colors font-medium"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    {/* User Menu / Auth */}
                    <div className="hidden md:flex items-center space-x-4">
                        {user ? (
                            <div className="flex items-center space-x-3">
                                {(user.role === 'admin' || user.role === 'editor') && (
                                    <Link href="/admin">
                                        <Button variant="ghost" size="sm">
                                            Admin
                                        </Button>
                                    </Link>
                                )}
                                <div className="flex items-center space-x-2">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={user.avatar_url || undefined} />
                                        <AvatarFallback>
                                            <User className="h-4 w-4" />
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className="text-sm font-medium">{user.full_name || user.email}</span>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleSignOut}
                                    className="text-slate-600 hover:text-brand"
                                >
                                    <LogOut className="h-4 w-4" />
                                </Button>
                            </div>
                        ) : null}
                    </div>

                    <div className="flex items-center">
                        <Link
                            href="/search"
                            aria-label="Search"
                            className="inline-flex h-10 w-10 items-center justify-center text-slate-700 hover:text-brand"
                        >
                            <Search className="h-5 w-5" />
                        </Link>
                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                {mobileMenuOpen ? (
                                    <X className="h-6 w-6" />
                                ) : (
                                    <Menu className="h-6 w-6" />
                                )}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t bg-white">
                        <nav className="px-2 pt-2 pb-3 space-y-1">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-brand hover:bg-slate-50 rounded-xl transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            {user ? (
                                <div className="border-t pt-3 mt-3">
                                    <div className="flex items-center px-3 py-2">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={user.avatar_url || undefined} />
                                            <AvatarFallback>
                                                <User className="h-4 w-4" />
                                            </AvatarFallback>
                                        </Avatar>
                                        <span className="ml-3 text-sm font-medium">{user.full_name || user.email}</span>
                                    </div>
                                    {(user.role === 'admin' || user.role === 'editor') && (
                                        <Link
                                            href="/admin"
                                            className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-brand hover:bg-slate-50 rounded-xl"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            Admin Dashboard
                                        </Link>
                                    )}
                                    <button
                                        onClick={handleSignOut}
                                        className="block w-full text-left px-3 py-2 text-base font-medium text-slate-700 hover:text-brand hover:bg-slate-50 rounded-xl"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            ) : null}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    )
}
