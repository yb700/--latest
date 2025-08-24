import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const supabase = createClient()

        const { data: posts, error } = await supabase
            .from('posts')
            .select('*')
            .eq('status', 'published')
            .order('created_at', { ascending: false })

        if (error) {
            console.error('Error fetching posts:', error)
            return NextResponse.json(
                { error: 'Failed to fetch posts' },
                { status: 500 }
            )
        }

        return NextResponse.json({
            success: true,
            posts,
            count: posts?.length || 0
        })

    } catch (error) {
        console.error('Posts fetch error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
