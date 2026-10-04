import Link from 'next/link'

/** The intro box stays in the repo. It is not shown on the homepage. */
export const SHOW_YOUNAS_INTRO = false

export function YounasIntro() {
    if (!SHOW_YOUNAS_INTRO) return null

    return (
        <Link
            href="/about"
            className="mt-8 block rounded-2xl border border-[#E7E4DF] bg-white p-6 text-base leading-relaxed text-[#5E5E5E] shadow-[0_2px_8px_rgba(0,0,0,0.05)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#151515] focus-visible:ring-offset-2"
        >
            I&apos;m Younas, a law graduate writing about the deals and decisions shaping commercial law.
        </Link>
    )
}
