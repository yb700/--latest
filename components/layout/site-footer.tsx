import Link from "next/link"
import { BrandWordmark } from "@/components/layout/brand-logo"

const footerColumns = [
    [
        { name: "Home", href: "/" },
        { name: "Blog", href: "/blog" },
        { name: "About", href: "/about" },
    ],
    [
        { name: "Legal News", href: "/news" },
        { name: "Glossary", href: "/glossary" },
        { name: "Contact", href: "/contact" },
    ],
]

export function SiteFooter() {
    return (
        <footer className="bg-[#151515]">
            <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
                <Link href="/" className="inline-flex items-center">
                    <BrandWordmark tone="onDark" />
                </Link>

                <nav aria-label="Footer" className="mt-8 grid grid-cols-2 gap-x-8">
                    {footerColumns.map((column) => (
                        <div key={column[0].name} className="flex flex-col gap-3">
                            {column.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-sm font-medium text-[#BDBAB4] transition-colors hover:text-white"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    ))}
                </nav>

                <p className="mt-8 border-t border-[#2E2E2E] pt-6 text-sm text-[#BDBAB4]">
                    © 2026 ClearCut Law ·{" "}
                    <Link href="/privacy" className="hover:text-white">
                        Privacy
                    </Link>
                    {" "}·{" "}
                    <Link href="/terms" className="hover:text-white">
                        Terms
                    </Link>
                </p>
            </div>
        </footer>
    )
}
