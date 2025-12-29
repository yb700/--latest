import Link from "next/link"
import { createClient } from "@/lib/supabase/server"

export async function SiteFooter() {
    const supabase = createClient()

    // Get disclaimer from site settings
    const { data: disclaimerSetting } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', 'disclaimer')
        .single()

    const disclaimer = disclaimerSetting?.value ||
        "This website provides general legal information only and is not a substitute for professional legal advice. The content on this site should not be relied upon as legal advice. For specific legal advice relating to your situation, please consult a qualified solicitor."

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
                            Clear, accessible legal commentary and guidance for the UK legal system.
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
                                <Link href="/guidance" className="text-slate-600 hover:text-brand transition-colors">
                                    Legal Guidance
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-slate-600 hover:text-brand transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal Areas */}
                    <div>
                        <h3 className="font-semibold text-brand mb-4">Legal Areas</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/guidance?area=Family" className="text-slate-600 hover:text-brand transition-colors">
                                    Family Law
                                </Link>
                            </li>
                            <li>
                                <Link href="/guidance?area=Employment" className="text-slate-600 hover:text-brand transition-colors">
                                    Employment Law
                                </Link>
                            </li>
                            <li>
                                <Link href="/guidance?area=Road+Traffic" className="text-slate-600 hover:text-brand transition-colors">
                                    Road Traffic Law
                                </Link>
                            </li>
                            <li>
                                <Link href="/guidance?area=Commercial" className="text-slate-600 hover:text-brand transition-colors">
                                    Commercial Law
                                </Link>
                            </li>
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


