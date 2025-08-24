import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { guidanceQuestionSchema } from "@/lib/validations"
import { checkRateLimit, getClientIP } from "@/lib/rate-limit"

export async function POST(request: NextRequest) {
    try {
        // Rate limiting
        const clientIP = getClientIP(request)
        const rateLimitResult = await checkRateLimit(`guidance:${clientIP}`, 3, 300000) // 3 requests per 5 minutes

        if (!rateLimitResult.success) {
            return NextResponse.json(
                { error: "Too many questions submitted. Please wait before submitting another." },
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
        const validatedData = guidanceQuestionSchema.parse(body)

        // Ensure consent was given
        if (!validatedData.consentGiven) {
            return NextResponse.json(
                { error: "Consent must be given to submit a question" },
                { status: 400 }
            )
        }

        const supabase = createClient()

        // Insert guidance question
        const { data, error } = await supabase
            .from('guidance_questions')
            .insert({
                title: validatedData.title,
                question_text: validatedData.questionText,
                area: validatedData.area,
                email: validatedData.email || null,
                consent_given: validatedData.consentGiven,
                is_approved: false, // Questions need approval before being public
            })
            .select()
            .single()

        if (error) {
            console.error('Database error:', error)
            return NextResponse.json(
                { error: "Failed to submit question. Please try again." },
                { status: 500 }
            )
        }

        return NextResponse.json(
            {
                message: "Question submitted successfully! It will be reviewed and published with an answer soon.",
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

        console.error('Guidance question error:', error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}


