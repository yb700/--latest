'use client'

import { useState } from 'react'

interface NewsCardImageProps {
    src: string
}

export function NewsCardImage({ src }: NewsCardImageProps) {
    const [failed, setFailed] = useState(false)

    if (failed) return null

    return (
        <>
            {/* Publisher images are arbitrary https URLs, so they cannot go through next/image. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={src}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                onError={() => setFailed(true)}
            />
            <div
                className="absolute inset-0 bg-gradient-to-t from-brand via-brand/90 to-brand/75"
                aria-hidden="true"
            />
        </>
    )
}
