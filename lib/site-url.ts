const LOCALHOST_ORIGIN = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i

/** Canonical live host. Apex redirects to www. */
export const CANONICAL_PRODUCTION_ORIGIN = 'https://www.clearcutlaw.co.uk'

export function stripTrailingSlash(url: string): string {
    return url.replace(/\/$/, '')
}

export function isLocalhostOrigin(origin: string): boolean {
    return LOCALHOST_ORIGIN.test(origin)
}

export function getConfiguredSiteOrigin(): string | undefined {
    const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim()
    if (!configured) return undefined
    return stripTrailingSlash(configured)
}

/**
 * Origin used for magic-link `emailRedirectTo`.
 * Uses the current site origin in the browser so www vs apex matches the
 * PKCE cookie host. Localhost is allowed in development only.
 */
export function getAuthCallbackUrl(): string {
    const configured = getConfiguredSiteOrigin()
    const productionFallback =
        configured && !isLocalhostOrigin(configured)
            ? configured
            : CANONICAL_PRODUCTION_ORIGIN

    if (typeof window !== 'undefined') {
        const origin = window.location.origin

        if (isLocalhostOrigin(origin)) {
            if (process.env.NODE_ENV !== 'production') {
                return `${origin}/auth/callback`
            }
            return `${productionFallback}/auth/callback`
        }

        return `${origin}/auth/callback`
    }

    if (configured && (process.env.NODE_ENV !== 'production' || !isLocalhostOrigin(configured))) {
        return `${configured}/auth/callback`
    }

    return `${CANONICAL_PRODUCTION_ORIGIN}/auth/callback`
}

/** Reject open redirects; only same-origin relative paths are allowed. */
export function getSafeInternalPath(next: string | null | undefined): string {
    if (!next || !next.startsWith('/') || next.startsWith('//')) {
        return '/'
    }
    return next
}

export function getRequestOrigin(request: { url: string; headers: Headers }): string {
    const { origin } = new URL(request.url)
    const forwardedHost = request.headers.get('x-forwarded-host')
    const forwardedProto = request.headers.get('x-forwarded-proto') ?? 'https'

    if (process.env.NODE_ENV === 'development') {
        return origin
    }

    if (forwardedHost) {
        const host = forwardedHost.split(',')[0].trim()
        return `${forwardedProto}://${host}`
    }

    return origin
}
