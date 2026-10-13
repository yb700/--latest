'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

type GoatCounterApi = {
    count: (vars?: { path?: string }) => void
}

declare global {
    interface Window {
        goatcounter?: GoatCounterApi
    }
}

/** Count the first view and later client-side navigations. The script does not count on load. */
export function GoatCounter() {
    const pathname = usePathname()
    const countedPath = useRef<string | null>(null)

    useEffect(() => {
        const path = `${window.location.pathname}${window.location.search}`
        if (countedPath.current === path) return

        const timer = window.setInterval(() => {
            if (typeof window.goatcounter?.count !== 'function') return
            window.clearInterval(timer)
            if (countedPath.current === path) return
            countedPath.current = path
            window.goatcounter.count({ path })
        }, 100)

        return () => window.clearInterval(timer)
    }, [pathname])

    return null
}
