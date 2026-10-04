import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Terms of Use | ClearCut Law',
    description: 'Terms for using ClearCut Law. The site is commentary and not legal advice.',
}

export default function TermsPage() {
    return (
        <div className="bg-[#FAF9F7]">
            <article className="mx-auto w-full max-w-[760px] px-4 py-12">
                <h1 className="text-4xl font-semibold tracking-[-0.5px] text-[#151515]">Terms of Use</h1>
                <p className="mt-3 text-sm text-[#8A8780]">Last updated: 4 October 2026.</p>

                <div className="mt-10 space-y-8 text-base leading-relaxed text-[#5E5E5E]">
                    <section>
                        <h2 className="text-xl font-semibold text-[#151515]">About this site</h2>
                        <p className="mt-3">
                            ClearCut Law is an independent commentary website run by Younas Ficel, a law graduate. It is not a law firm and is not regulated by the Solicitors Regulation Authority.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-[#151515]">Not legal advice</h2>
                        <p className="mt-3">
                            Everything on this site is general commentary for educational purposes. It is not legal advice and should not be relied on when making decisions. Reading the site or contacting me does not create a solicitor-client relationship. For advice on your own situation, speak to a qualified solicitor.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-[#151515]">Accuracy</h2>
                        <p className="mt-3">
                            Posts are accurate to the best of my knowledge on the date they are published. The law and the deals discussed may change after that, and older posts may not be updated. Sources are listed at the end of each post.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-[#151515]">Using the content</h2>
                        <p className="mt-3">
                            The text and the ClearCut Law logo belong to Younas Ficel unless stated otherwise. You are welcome to quote short extracts as long as you credit ClearCut Law and link to the original post. Please do not republish whole posts without permission.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-[#151515]">Links to other websites</h2>
                        <p className="mt-3">
                            Posts and news items link to other websites. I am not responsible for their content.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-[#151515]">Liability</h2>
                        <p className="mt-3">
                            To the extent permitted by law, I am not liable for any loss arising from reliance on the content of this site. Nothing in these terms limits any liability that cannot be limited by law.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-[#151515]">Governing law</h2>
                        <p className="mt-3">These terms are governed by the law of England and Wales.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-[#151515]">Contact</h2>
                        <p className="mt-3">
                            Questions about these terms can be sent through the{' '}
                            <Link href="/contact" className="text-[#151515] underline underline-offset-4">
                                contact form
                            </Link>
                            .
                        </p>
                    </section>
                </div>
            </article>
        </div>
    )
}
