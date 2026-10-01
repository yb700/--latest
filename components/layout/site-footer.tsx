import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { NEWS_CATEGORIES, newsCategoryPath } from "@/lib/news-categories"

const VISITOR_DISCLAIMER =
    "This website provides general legal information and commentary only. It is not personal legal advice. For advice on a specific matter, please consult a qualified solicitor."

function disclaimerForVisitors(value: string | null | undefined) {
    const text = value?.trim() ?? ""
    if (!text || /\bguidance\b/i.test(text)) {
        return VISITOR_DISCLAIMER
    }
    return text
}

export async function SiteFooter() {
    const supabase = createClient()

    // Read the stored disclaimer, but never show a version that says "guidance".
    // The live settings row is left unchanged.
    let storedDisclaimer: string | null = null
    try {
        const { data: disclaimerSetting } = await supabase
            .from('site_settings')
            .select('value')
            .eq('key', 'disclaimer')
            .single()
        storedDisclaimer = disclaimerSetting?.value ?? null
    } catch {
        storedDisclaimer = null
    }

    const disclaimer = disclaimerForVisitors(storedDisclaimer)

    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-slate-50 border-t">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand and Description */}
                    <div className="md:col-span-2">
                        <Link href="/" className="flex items-center space-x-2 mb-4">
                            <div className="h-8 w-8 rounded-lg bg-brand flex items-center justify-center">
                                <span className="text-white font-bold text-sm">CL</span>
                            </div>
                            <span className="font-bold text-xl text-brand">ClearCut Law</span>
                        </Link>
                        <p className="text-slate-600 mb-4 max-w-md">
                            Clear, accessible commentary on commercial law.
                            Created by Younas Ficel, a passionate law graduate.
                        </p>
                        <p className="text-xs text-slate-500 leading-relaxed">
                            {disclaimer}
                        </p>
                    </div>

                    {/* Quick Links */}
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
                        </ul>
                    </div>

                    {/* Legal Areas */}
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

                {/* Bottom Bar */}
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


