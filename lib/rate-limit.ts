import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"
import { NextRequest } from "next/server"

// Create rate limiter instance
const redis = process.env.UPSTASH_REDIS_REST_URL &&
    process.env.UPSTASH_REDIS_REST_TOKEN &&
    !process.env.UPSTASH_REDIS_REST_URL.includes('your_upstash_redis_url_here')
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
    : null

// Fallback in-memory rate limiter for development
const memoryLimiter = new Map<string, { count: number; resetTime: number }>()

export const ratelimit = redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(10, "1 m"), // 10 requests per minute
        analytics: true,
    })
    : null

// Fallback rate limiter for development without Redis
export async function checkRateLimit(identifier: string, limit = 10, windowMs = 60000): Promise<{ success: boolean; limit: number; remaining: number; reset: Date }> {
    if (ratelimit) {
        const result = await ratelimit.limit(identifier)
        return {
            success: result.success,
            limit: result.limit,
            remaining: result.remaining,
            reset: new Date(result.reset),
        }
    }

    // Fallback memory-based rate limiting
    const now = Date.now()
    const key = identifier
    const record = memoryLimiter.get(key)

    if (!record || now > record.resetTime) {
        memoryLimiter.set(key, { count: 1, resetTime: now + windowMs })
        return {
            success: true,
            limit,
            remaining: limit - 1,
            reset: new Date(now + windowMs),
        }
    }

    if (record.count >= limit) {
        return {
            success: false,
            limit,
            remaining: 0,
            reset: new Date(record.resetTime),
        }
    }

    record.count++
    return {
        success: true,
        limit,
        remaining: limit - record.count,
        reset: new Date(record.resetTime),
    }
}

export function getClientIP(request: NextRequest): string {
    const forwarded = request.headers.get('x-forwarded-for')
    const realIP = request.headers.get('x-real-ip')

    if (forwarded) {
        return forwarded.split(',')[0].trim()
    }

    if (realIP) {
        return realIP
    }

    return 'unknown'
}


