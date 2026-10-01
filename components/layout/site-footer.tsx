import Link from "next/link"
import { NEWS_CATEGORIES, newsCategoryPath } from "@/lib/news-categories"

export function SiteFooter() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-slate-50 border-t">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-2">
                        <Link href="/" className="flex items-center space-x-2 mb-4">
                            <div className="h-8 w-8 rounded-lg bg-brand flex items-center justify-center">
                                <span className="text-white font-bold text-sm">CL</span>
                            </div>
                            <span className="font-bold text-xl text-brand">ClearCut Law</span>
                        </Link>
                        <p className="text-slate-600 mb-4 max-w-md">
                            Plain English commentary on UK deals, finance, competition and sport.
                            Written by Younas Ficel, a law graduate.
                        </p>
                        <p className="text-xs text-slate-500 leading-relaxed">
                            This is a commentary site, not a law firm. The posts are commentary and not legal advice.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-brand mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/about" className="text-slate-600 hover:text-brand transition-colors">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="text-slate-600 hover:text-brand transition-colors">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="/news" className="text-slate-600 hover:text-brand transition-colors">
                                    Legal News
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-slate-600 hover:text-brand transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-brand mb-4">Legal Areas</h3>
                        <ul className="space-y-2">
                            {NEWS_CATEGORIES.map((category) => (
                                <li key={category.slug}>
                                    <Link href={newsCategoryPath(category.slug)} className="text-slate-600 hover:text-brand transition-colors">
                                        {category.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-200 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
                    <div className="text-sm text-slate-600">
                        © {currentYear} ClearCut Law. All rights reserved.
                    </div>
                    <div className="flex space-x-6 mt-4 sm:mt-0">
                        <Link href="/privacy" className="text-sm text-slate-600 hover:text-brand transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="text-sm text-slate-600 hover:text-brand transition-colors">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
