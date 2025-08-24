import { Metadata } from 'next'
import { ContactForm } from '@/components/contact-form'

export const metadata: Metadata = {
    title: 'Contact | ClearLegal',
    description: 'Get in touch with ClearLegal for legal guidance and support.',
}

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-brand mb-4">Contact Us</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Have a legal question or need guidance? We're here to help.
                        Send us a message and we'll get back to you as soon as possible.
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
                                This website provides general legal information only and does not constitute legal advice.
                                For specific legal guidance, please consult with a qualified legal professional.
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
                                    <p className="text-sm text-gray-600">contact@clearlegal.com</p>
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
