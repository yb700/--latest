import type { Metadata } from 'next'
import Link from 'next/link'
import { GLOSSARY } from '@/lib/glossary'

export const metadata: Metadata = {
    title: 'Glossary | ClearCut Law',
    description: 'Short plain-English definitions of terms used in ClearCut Law posts.',
}

export default function GlossaryPage() {
    return (
        <div className="container mx-auto max-w-3xl bg-[#FAF9F7] px-4 py-8">
            <h1 className="mb-2 text-4xl font-semibold text-[#151515]">Glossary</h1>
            <p className="mb-8 text-lg text-[#5E5E5E]">
                Short definitions of terms that come up in the posts, with a link to where each one appears.
            </p>
            <dl className="space-y-6">
                {GLOSSARY.map((entry) => (
                    <div key={entry.slug} id={entry.slug} className="scroll-mt-24 rounded-2xl border border-[#E7E4DF] bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
                        <dt className="text-lg font-semibold text-[#151515]">{entry.term}</dt>
                        <dd className="mt-2 text-[#5E5E5E]">{entry.definition}</dd>
                        <dd className="mt-3">
                            <Link href={`/blog/${entry.postSlug}`} className="text-[#151515] underline underline-offset-4">
                                {entry.postTitle}
                            </Link>
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    )
}
