"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Profile } from "@/lib/supabase/types"
import { signOut } from "@/lib/auth-client"

interface SiteHeaderProps {
    user?: Profile | null
}

const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Legal Guidance", href: "/guidance" },
    { name: "Contact", href: "/contact" },
]

export function SiteHeader({ user }: SiteHeaderProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const handleSignOut = async () => {
        await signOut()
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="h-8 w-8 rounded-lg bg-brand flex items-center justify-center">
                                <span className="text-white font-bold text-sm">CL</span>
                            </div>
                            <span className="font-bold text-xl text-brand">ClearLegal</span>
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
                        ) : (
                            <Link href="/auth/login">
                                <Button variant="outline" size="sm">
                                    Sign In
                                </Button>
                            </Link>
                        )}
                    </div>

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
                            ) : (
                                <div className="border-t pt-3 mt-3">
                                    <Link
                                        href="/auth/login"
                                        className="block px-3 py-2 text-base font-medium text-brand hover:bg-slate-50 rounded-xl"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Sign In
                                    </Link>
                                </div>
                            )}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    )
}
