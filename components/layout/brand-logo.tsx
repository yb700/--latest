type BrandLogoProps = {
    className?: string
    /** light sits on the warm page. onDark is the white wordmark for the black footer. Gold brackets stay. */
    tone?: 'light' | 'onDark'
}

const WORDMARK_SRC = {
    light: '/brand/clearcut-wordmark.png',
    onDark: '/brand/clearcut-wordmark-white.png',
} as const

export function BrandWordmark({
    className = 'h-10 w-auto md:h-12',
    tone = 'light',
}: BrandLogoProps) {
    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src={WORDMARK_SRC[tone]}
            alt="ClearCut Law"
            width={1270}
            height={217}
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
