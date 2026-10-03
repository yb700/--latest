import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { contactMessageSchema } from "@/lib/validations"
import { checkRateLimit, getClientIP } from "@/lib/rate-limit"

const FAILED_MESSAGE = "Your message could not be sent. Please try again."

export async function POST(request: NextRequest) {
    try {
        // Rate limiting
        const clientIP = getClientIP(request)
        const rateLimitResult = await checkRateLimit(`contact:${clientIP}`, 5, 60000) // 5 requests per minute

        if (!rateLimitResult.success) {
            return NextResponse.json(
                { error: "Too many requests. Please try again later." },
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
        const validatedData = contactMessageSchema.parse(body)

        const supabase = createClient()

        // Visitors may insert a row. Only staff may read one, so do not request
        // the new row back. A returning select makes the insert fail.
        const { error } = await supabase
            .from('contact_messages')
            .insert({
                name: validatedData.name,
                email: validatedData.email,
                subject: validatedData.subject,
                message: validatedData.message,
            })

        if (error) {
            console.error('Database error:', error)
            return NextResponse.json(
                { error: FAILED_MESSAGE },
                { status: 500 }
            )
        }

        // The row is saved. The browser sends the email from /contact, because
        // FormSubmit rejects the same post when it comes from the Vercel server.
        return NextResponse.json(
            { saved: true },
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

        console.error('Contact form error:', error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}


