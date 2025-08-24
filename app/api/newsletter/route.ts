import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { newsletterSubscriptionSchema } from "@/lib/validations"
import { checkRateLimit, getClientIP } from "@/lib/rate-limit"

export async function POST(request: NextRequest) {
    try {
        // Rate limiting
        const clientIP = getClientIP(request)
        const rateLimitResult = await checkRateLimit(`newsletter:${clientIP}`, 2, 300000) // 2 requests per 5 minutes

        if (!rateLimitResult.success) {
            return NextResponse.json(
                { error: "Too many subscription attempts. Please try again later." },
                {
                    status: 429,
                    headers: {
                        'X-RateLimit-Limit': rateLimitResult.limit.toString(),
                        'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
                        'X-RateLimit-Reset': rateLimitResult.reset.toISOString(),
                    }
                }
            )
        }

        const body = await request.json()

        // Validate input
        const validatedData = newsletterSubscriptionSchema.parse(body)

        const supabase = createClient()

        // Check if email already exists
        const { data: existing } = await supabase
            .from('newsletter_subscribers')
            .select('id, subscribed')
            .eq('email', validatedData.email)
            .single()

        if (existing) {
            if (existing.subscribed) {
                return NextResponse.json(
                    { message: "You're already subscribed to our newsletter!" },
                    { status: 200 }
                )
            } else {
                // Reactivate subscription
                const { error } = await supabase
                    .from('newsletter_subscribers')
                    .update({ subscribed: true })
                    .eq('email', validatedData.email)

                if (error) {
                    console.error('Database error:', error)
                    return NextResponse.json(
                        { error: "Failed to subscribe. Please try again." },
                        { status: 500 }
                    )
                }

                return NextResponse.json(
                    { message: "Welcome back! You've been resubscribed to our newsletter." },
                    { status: 200 }
                )
            }
        }

        // Insert new subscription
        const { data, error } = await supabase
            .from('newsletter_subscribers')
            .insert({
                email: validatedData.email,
                subscribed: true,
            })
            .select()
            .single()

        if (error) {
            console.error('Database error:', error)
            return NextResponse.json(
                { error: "Failed to subscribe. Please try again." },
                { status: 500 }
            )
        }

        return NextResponse.json(
            {
                message: "Successfully subscribed! Thank you for joining our newsletter.",
                id: data.id
            },
            {
                status: 201,
                headers: {
                    'X-RateLimit-Limit': rateLimitResult.limit.toString(),
                    'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
                    'X-RateLimit-Reset': rateLimitResult.reset.toISOString(),
                }
            }
        )

    } catch (error) {
        if (error instanceof Error && 'issues' in error) {
            // Zod validation error
            const zodError = error as any
            return NextResponse.json(
                {
                    error: "Validation failed",
                    details: zodError.issues.map((issue: any) => ({
                        field: issue.path.join('.'),
                        message: issue.message
                    }))
                },
                { status: 400 }
            )
        }

        console.error('Newsletter subscription error:', error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const email = searchParams.get('email')

        if (!email) {
            return NextResponse.json(
                { error: "Email parameter is required" },
                { status: 400 }
            )
        }

        // Rate limiting
        const clientIP = getClientIP(request)
        const rateLimitResult = await checkRateLimit(`newsletter-unsub:${clientIP}`, 3, 300000) // 3 requests per 5 minutes

        if (!rateLimitResult.success) {
            return NextResponse.json(
                { error: "Too many unsubscribe attempts. Please try again later." },
                { status: 429 }
            )
        }

        const supabase = createClient()

        // Update subscription status
        const { error } = await supabase
            .from('newsletter_subscribers')
            .update({ subscribed: false })
            .eq('email', email)

        if (error) {
            console.error('Database error:', error)
            return NextResponse.json(
                { error: "Failed to unsubscribe. Please try again." },
                { status: 500 }
            )
        }

        return NextResponse.json(
            { message: "Successfully unsubscribed from newsletter." },
            { status: 200 }
        )

    } catch (error) {
        console.error('Newsletter unsubscribe error:', error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}


