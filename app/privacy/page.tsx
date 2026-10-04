import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Privacy Notice | ClearCut Law',
    description: 'How ClearCut Law uses personal data from the contact form and the site.',
}

export default function PrivacyPage() {
    return (
        <div className="bg-[#FAF9F7]">
            <article className="mx-auto w-full max-w-[760px] px-4 py-12">
                <h1 className="text-4xl font-semibold tracking-[-0.5px] text-[#151515]">Privacy Notice</h1>
                <p className="mt-3 text-sm text-[#8A8780]">Last updated: 4 October 2026.</p>

                <div className="mt-10 space-y-8 text-base leading-relaxed text-[#5E5E5E]">
                    <section>
                        <h2 className="text-xl font-semibold text-[#151515]">Who I am</h2>
                        <p className="mt-3">
                            ClearCut Law (clearcutlaw.co.uk) is a commentary website run by Younas Ficel. I am the controller of the personal data described in this notice. You can contact me about anything in it through the{' '}
                            <Link href="/contact" className="text-[#151515] underline underline-offset-4">
                                contact form
                            </Link>
                            .
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-[#151515]">What I collect and why</h2>
                        <div className="mt-3 space-y-3">
                            <p>
                                Contact form. If you send a message, I collect your name, email address, subject and message. I use them only to read and reply to your message. The lawful basis is my legitimate interest in responding to people who get in touch.
                            </p>
                            <p>
                                Technical logs. The company that hosts the site automatically records technical information such as IP addresses and browser type to keep the site secure and working. The lawful basis is my legitimate interest in running a secure website.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-[#151515]">Cookies</h2>
                        <p className="mt-3">
                            The site does not use advertising or tracking cookies. It only uses cookies that are strictly necessary for the site to work, so there is no cookie banner.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-[#151515]">Who your data is shared with</h2>
                        <p className="mt-3">
                            I do not sell your data or share it for marketing. It is stored and processed by the service providers that run the site for me:
                        </p>
                        <ul className="mt-3 list-disc space-y-2 pl-5">
                            <li>Vercel (website hosting)</li>
                            <li>Supabase (database where contact form messages are stored)</li>
                            <li>FormSubmit (delivers contact form messages)</li>
                        </ul>
                        <p className="mt-3">
                            Some of these providers are based in, or may access data from, the United States. Where personal data is transferred outside the UK, it is protected by safeguards recognised under UK law, such as the UK-US data bridge or the UK International Data Transfer Agreement.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-[#151515]">How long I keep it</h2>
                        <ul className="mt-3 list-disc space-y-2 pl-5">
                            <li>Contact form messages: up to 12 months after my last reply, then deleted.</li>
                            <li>Technical logs: for the short period set by the hosting provider.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-[#151515]">Your rights</h2>
                        <p className="mt-3">Under UK data protection law you have the right to:</p>
                        <ul className="mt-3 list-disc space-y-2 pl-5">
                            <li>ask for a copy of the personal data I hold about you</li>
                            <li>ask me to correct it</li>
                            <li>ask me to delete it</li>
                            <li>ask me to restrict or stop using it</li>
                            <li>ask for it in a format you can move elsewhere</li>
                            <li>withdraw your consent at any time, where I rely on consent</li>
                        </ul>
                        <p className="mt-3">
                            To use any of these rights, contact me through the{' '}
                            <Link href="/contact" className="text-[#151515] underline underline-offset-4">
                                contact form
                            </Link>
                            . I will reply within one month.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-[#151515]">Complaints</h2>
                        <p className="mt-3">
                            If you are unhappy with how I have handled your data, please contact me first. You can also complain to the Information Commissioner&apos;s Office at{' '}
                            <a href="https://ico.org.uk" className="text-[#151515] underline underline-offset-4">
                                ico.org.uk
                            </a>{' '}
                            or on 0303 123 1113.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-[#151515]">Changes to this notice</h2>
                        <p className="mt-3">
                            I may update this notice from time to time. The date at the top shows when it was last changed.
                        </p>
                    </section>
                </div>
            </article>
        </div>
    )
}
