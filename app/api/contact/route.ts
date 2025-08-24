import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { contactMessageSchema } from "@/lib/validations"
import { checkRateLimit, getClientIP } from "@/lib/rate-limit"

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

        // Insert contact message
        const { data, error } = await supabase
            .from('contact_messages')
            .insert({
                name: validatedData.name,
                email: validatedData.email,
                subject: validatedData.subject,
                message: validatedData.message,
            })
            .select()
            .single()

        if (error) {
            console.error('Database error:', error)
            return NextResponse.json(
                { error: "Failed to submit message. Please try again." },
                { status: 500 }
            )
        }

        return NextResponse.json(
            {
                message: "Message submitted successfully. We'll get back to you soon!",
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

        console.error('Contact form error:', error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}


