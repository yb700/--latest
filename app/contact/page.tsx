import { Metadata } from 'next'
import { ContactForm } from '@/components/contact-form'

export const metadata: Metadata = {
    title: 'Contact | ClearCut Law',
    description: 'Contact ClearCut Law about the commentary. This is a commentary site, not a law firm.',
}

export default function ContactPage() {
    return (
        <div className="bg-[#FAF9F7]">
            <div className="container mx-auto px-4 py-12">
                <div className="mx-auto max-w-2xl">
                    <div className="mb-8">
                        <h1 className="mb-4 text-4xl font-semibold text-[#151515]">Contact</h1>
                        <p className="text-xl text-[#5E5E5E]">
                            Send a message about the site or a piece of commentary.
                            The posts are not legal advice.
                        </p>
                    </div>

                    <ContactForm />

                    <div className="mt-6 rounded-2xl border border-[#E7E4DF] bg-[#F3F1ED] p-6">
                        <h2 className="mb-4 text-lg font-semibold text-[#151515]">Important Notice</h2>
                        <p className="text-sm text-[#5E5E5E]">
                            ClearCut Law publishes commentary. It does not give legal advice.
                            For advice on your own circumstances, speak to a qualified solicitor.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
