'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface PostThumbnailProps {
    imageUrl: string | null
    className?: string
}

export function PostThumbnail({ imageUrl, className }: PostThumbnailProps) {
    const [failed, setFailed] = useState(false)
    const showImage = Boolean(imageUrl) && !failed

    return (
        <div className={cn('relative shrink-0 overflow-hidden rounded-lg bg-[#EEF0F3]', className)}>
            {showImage ? (
                // A stored photo replaces the grey box. This change does not add new artwork.
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={imageUrl ?? undefined}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                    onError={() => setFailed(true)}
                />
            ) : null}
        </div>
    )
}
