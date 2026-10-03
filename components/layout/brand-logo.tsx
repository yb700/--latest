type BrandLogoProps = {
    className?: string
}

export function BrandWordmark({ className = "h-8 w-auto sm:h-10" }: BrandLogoProps) {
    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src="/brand/clearcut-wordmark.png"
            alt="ClearCut Law"
            width={1270}
            height={217}
            className={className}
        />
    )
}

export function BrandMark({ className = "h-8 w-auto" }: BrandLogoProps) {
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
