'use client'

import { useState } from 'react'

interface FeaturedMediaProps {
    imageUrl: string | null
}

export function FeaturedMedia({ imageUrl }: FeaturedMediaProps) {
    const [failed, setFailed] = useState(false)
    const showImage = Boolean(imageUrl) && !failed

    return (
        <div className="relative flex h-44 w-full items-center justify-center overflow-hidden bg-[#0F1B33] md:h-full md:min-h-[220px]">
            {showImage ? (
                // A stored photo replaces the navy block. The listing does not add new artwork.
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={imageUrl ?? undefined}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                    onError={() => setFailed(true)}
                />
            ) : null}
            <span className="absolute left-3 top-3 text-[11px] font-semibold tracking-[0.16em] text-white">
                FEATURED
            </span>
            <div
                className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl text-xl font-bold text-white ring-1 ring-white/40 ${
                    showImage ? 'bg-[#0F1B33]' : 'bg-white/10'
                }`}
                aria-hidden="true"
            >
                CL
            </div>
        </div>
    )
}
