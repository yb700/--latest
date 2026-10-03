import { Metadata } from 'next'
import { ContactForm } from '@/components/contact-form'

export const metadata: Metadata = {
    title: 'Contact | ClearCut Law',
    description: 'Contact ClearCut Law about the commentary. This is a commentary site, not a law firm.',
}

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-semibold text-brand mb-4">Contact</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Send a message about the site or a piece of commentary.
                        The posts are not legal advice.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <ContactForm />
                    </div>

                    <div className="space-y-6">
                        <div className="bg-gray-50 rounded-2xl p-6">
                            <h3 className="text-lg font-semibold text-brand mb-4">Important Notice</h3>
                            <p className="text-sm text-gray-600">
                                ClearCut Law publishes commentary. It does not give legal advice.
                                For advice on your own circumstances, speak to a qualified solicitor.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
