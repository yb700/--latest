import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const supabase = createClient()

        // Test basic connection
        const { data, error } = await supabase
            .from('profiles')
            .select('count')
            .limit(1)

        if (error) {
            return NextResponse.json({
                success: false,
                error: error.message,
                code: error.code
            }, { status: 500 })
        }

        return NextResponse.json({
            success: true,
            message: 'Database connection successful',
            profilesExist: true
        })

    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 })
    }
}
