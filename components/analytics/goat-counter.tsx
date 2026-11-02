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

function currentPath() {
    return `${window.location.pathname}${window.location.search}`
}

/**
 * count.js records the first page view on its own.
 * This only sends later views, after a client-side navigation.
 */
export function GoatCounter() {
    const pathname = usePathname()
    const skipFirst = useRef(true)

    useEffect(() => {
        if (skipFirst.current) {
            skipFirst.current = false
            return
        }

        const path = currentPath()
        let stopped = false

        const send = () => {
            if (stopped || typeof window.goatcounter?.count !== 'function') return false
            window.goatcounter.count({ path })
            return true
        }

        if (send()) return

        const timer = window.setInterval(() => {
            if (send()) window.clearInterval(timer)
        }, 200)

        return () => {
            stopped = true
            window.clearInterval(timer)
        }
    }, [pathname])

    return null
}
