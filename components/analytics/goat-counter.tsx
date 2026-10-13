'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

const GOATCOUNTER_SRC = 'https://gc.zgo.at/count.js'
const GOATCOUNTER_ENDPOINT = 'https://clearcutlaw.goatcounter.com/count'

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

    return (
        <Script
            src={GOATCOUNTER_SRC}
            strategy="afterInteractive"
            data-goatcounter={GOATCOUNTER_ENDPOINT}
            data-goatcounter-settings='{"no_onload":true}'
        />
    )
}
