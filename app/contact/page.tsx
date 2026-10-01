import { Metadata } from 'next'
import { ContactForm } from '@/components/contact-form'
import { CONTACT_EMAIL, contactMailtoHref } from '@/lib/contact'

export const metadata: Metadata = {
    title: 'Contact | ClearCut Law',
    description: 'Contact ClearCut Law about the commentary. This is a commentary site, not a law firm.',
}

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-brand mb-4">Contact</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Send a message about the site or a piece of commentary.
                        This is a commentary site, not a law firm. The posts are not legal advice.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <ContactForm />
                    </div>

                    <div className="space-y-6">
                        <div className="bg-gray-50 rounded-2xl p-6">
                            <h3 className="text-lg font-semibold text-brand mb-4">Important Notice</h3>
                            <p className="text-sm text-gray-600 mb-4">
                                ClearCut Law publishes commentary. It does not give legal advice.
                                For advice on your own circumstances, speak to a qualified solicitor.
                            </p>
                            <p className="text-sm text-gray-600">
                                We aim to respond to all inquiries within 24-48 hours during business days.
                            </p>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-6">
                            <h3 className="text-lg font-semibold text-brand mb-4">Other Ways to Connect</h3>
                            <div className="space-y-3">
                                <div>
                                    <h4 className="font-medium text-gray-900">Email</h4>
                                    <a
                                        href={contactMailtoHref()}
                                        className="text-sm text-brand underline break-all"
                                    >
                                        {CONTACT_EMAIL}
                                    </a>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900">Response Time</h4>
                                    <p className="text-sm text-gray-600">24-48 hours</p>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900">Business Hours</h4>
                                    <p className="text-sm text-gray-600">Monday - Friday, 9 AM - 5 PM GMT</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
