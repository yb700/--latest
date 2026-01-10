import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { MarkdownRenderer } from '@/components/markdown-renderer'
import { formatDate } from '@/lib/utils'

interface GuidancePageProps {
    params: Promise<{ slug: string }>
}

async function getGuidance(slug: string) {
    const supabase = createClient()

    const { data: guidance, error } = await supabase
        .from('public_guidance')
        .select('*')
        .eq('answer_slug', slug)
        .single()

    if (error || !guidance) {
        return null
    }

    return guidance
}

export async function generateMetadata({ params }: GuidancePageProps): Promise<Metadata> {
    const { slug } = await params
    const guidance = await getGuidance(slug)

    if (!guidance) {
        return {
            title: 'Guidance Not Found | ClearCut Law',
        }
    }

    return {
        title: `${guidance.question_title} | ClearCut Law`,
        description: guidance.answer_md.substring(0, 160),
    }
}

export default async function GuidancePage({ params }: GuidancePageProps) {
    const { slug } = await params
    const guidance = await getGuidance(slug)

    if (!guidance) {
        notFound()
    }

    return (
        <article className="container mx-auto px-4 py-8 max-w-4xl">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-brand mb-4">
                    {guidance.question_title}
                </h1>
                <div className="text-sm text-gray-500">
                    <time dateTime={guidance.published_at || ''}>
                        {guidance.published_at ? formatDate(guidance.published_at) : ''}
                    </time>
                </div>
            </header>

            <div className="prose prose-lg max-w-none">
                <MarkdownRenderer content={guidance.answer_md} />
            </div>

            <footer className="mt-12 pt-8 border-t border-gray-200">
                <div className="text-sm text-gray-500">
                    <p>
                        This guidance is for informational purposes only and does not constitute legal advice.
                        For specific legal guidance, please consult with a qualified legal professional.
                    </p>
                </div>
            </footer>
        </article>
    )
}

