import { Metadata } from 'next'
import { QuestionForm } from '@/components/guidance/question-form'

export const metadata: Metadata = {
    title: 'Legal Guidance | ClearCut Law',
    description: 'Submit your legal questions for review.',
}

export default async function GuidancePage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-brand mb-4">Legal Guidance</h1>
                <p className="text-gray-600 text-lg">
                    Have a legal question? Submit it below for review.
                </p>
            </div>

            <div className="max-w-2xl">
                <h2 className="text-2xl font-semibold text-brand mb-6">Submit Your Question</h2>
                <QuestionForm />
            </div>
        </div>
    )
}
