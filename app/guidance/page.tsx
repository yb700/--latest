import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { QuestionForm } from '@/components/guidance/question-form'
import { GuidanceList } from '@/components/guidance/guidance-list'
import { EmptyState } from '@/components/empty-state'

export const metadata: Metadata = {
    title: 'Legal Guidance | ClearLegal',
    description: 'Submit your legal questions and browse approved public guidance.',
}

async function getPublicGuidance() {
    const supabase = createClient()

    const { data: guidance, error } = await supabase
        .from('public_guidance')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching guidance:', error)
        return []
    }

    return guidance || []
}

export default async function GuidancePage() {
    const guidance = await getPublicGuidance()

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-brand mb-4">Legal Guidance</h1>
                <p className="text-gray-600 text-lg">
                    Have a legal question? Submit it below and browse our approved public guidance.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                    <h2 className="text-2xl font-semibold text-brand mb-6">Submit Your Question</h2>
                    <QuestionForm />
                </div>

                <div>
                    <h2 className="text-2xl font-semibold text-brand mb-6">Public Guidance</h2>
                    {guidance.length === 0 ? (
                        <EmptyState
                            title="No guidance available"
                            description="Approved legal guidance will appear here once available."
                        />
                    ) : (
                        <GuidanceList guidance={guidance} />
                    )}
                </div>
            </div>
        </div>
    )
}

