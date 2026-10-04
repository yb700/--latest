type BrandLogoProps = {
    className?: string
    /** light sits on the warm page. onDark is the white wordmark for the black footer. Gold brackets stay. */
    tone?: 'light' | 'onDark'
}

const WORDMARK_SRC = {
    light: '/brand/clearcut-law-logo-compact.svg',
    onDark: '/brand/clearcut-law-logo-compact-white.svg',
} as const

export function BrandWordmark({
    className = 'h-[34px] w-auto md:h-10',
    tone = 'light',
}: BrandLogoProps) {
    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src={WORDMARK_SRC[tone]}
            alt="ClearCut Law"
            width={379}
            height={116}
            className={className}
        />
    )
}

export function BrandMark({ className = 'h-8 w-auto' }: { className?: string }) {
    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src="/brand/clearcut-mark.png"
            alt=""
            width={565}
            height={217}
            className={className}
        />
    )
}
