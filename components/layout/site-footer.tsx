import Link from "next/link"
import { BrandWordmark } from "@/components/layout/brand-logo"
import { BLOG_CATEGORY_PRESENTATION, blogCategoryPath, type BlogCategorySlug } from "@/lib/blog-categories"

const explore = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "Legal News", href: "/news" },
    { name: "Glossary", href: "/glossary" },
]

const topicOrder: BlogCategorySlug[] = [
    "mergers-and-acquisitions",
    "banking-and-finance",
    "competition-and-regulation",
    "sports-deals-and-regulation",
]

const about = [
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
]

function FooterColumn({ title, links }: { title: string; links: { name: string; href: string }[] }) {
    return (
        <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-white">{title}</h2>
            <ul className="mt-4 space-y-3">
                {links.map((item) => (
                    <li key={item.name}>
                        <Link href={item.href} className="text-sm text-[#BDBAB4] transition-colors hover:text-white">
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export function SiteFooter() {
    const topics = topicOrder.map((slug) => ({
        name: BLOG_CATEGORY_PRESENTATION[slug].fullName,
        href: blogCategoryPath(slug),
    }))

    return (
        <footer className="bg-[#151515]">
            <div className="mx-auto w-full max-w-[1100px] px-4 py-10 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <Link href="/" className="inline-flex items-center">
                            <BrandWordmark tone="onDark" />
                        </Link>
                        <p className="mt-4 max-w-xs text-sm leading-5 text-[#BDBAB4]">
                            Commentary on UK deals, finance, competition and sport.
                        </p>
                    </div>
                    <FooterColumn title="Explore" links={explore} />
                    <FooterColumn title="Topics" links={topics} />
                    <FooterColumn title="About" links={about} />
                </div>

                <div className="mt-10 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-[#2E2E2E] pt-6 text-sm text-[#BDBAB4]">
                    <p>© 2026 ClearCut Law</p>
                    <p>Commentary only. Not legal advice.</p>
                </div>
            </div>
        </footer>
    )
}
