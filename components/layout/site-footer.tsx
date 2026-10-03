import Link from "next/link"
import { BrandWordmark } from "@/components/layout/brand-logo"

const footerLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Legal News", href: "/news" },
    { name: "Contact", href: "/contact" },
]

export function SiteFooter() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-[#14213D]">
            <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
                <Link href="/" className="inline-flex items-center">
                    <BrandWordmark tone="onNavy" />
                </Link>

                <nav aria-label="Footer" className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-3">
                    {footerLinks.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-sm font-medium text-[#C9CED8] transition-colors hover:text-white"
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="mt-8 flex flex-col gap-3 border-t border-[#2A3858] pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-[#C9CED8]">
                        © {currentYear} ClearCut Law. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="text-sm text-[#C9CED8] transition-colors hover:text-white">
                            Privacy
                        </Link>
                        <Link href="/terms" className="text-sm text-[#C9CED8] transition-colors hover:text-white">
                            Terms
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
