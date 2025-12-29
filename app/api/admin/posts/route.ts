import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { requireStaff } from '@/lib/auth-server'

// GET all posts for admin
export async function GET() {
    try {
        await requireStaff()
        const supabase = createClient()

        const { data: posts, error } = await supabase
            .from('posts')
            .select('*, author:profiles(full_name)')
            .order('created_at', { ascending: false })

        if (error) {
            console.error('Error fetching posts:', error)
            return NextResponse.json(
                { error: 'Failed to fetch posts' },
                { status: 500 }
            )
        }

        return NextResponse.json({ posts })
    } catch (error) {
        console.error('Error fetching posts:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

// CREATE a new post
export async function POST(request: NextRequest) {
    try {
        // Check if user is staff
        const profile = await requireStaff()

        const supabase = createClient()
        const body = await request.json()

        const { title, excerpt, content, status = 'draft', category, published_at } = body

        // Generate slug from title
        const slug = title
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, '')
            .replace(/\s+/g, '-')
            .trim()

        // Create the post
        const { data: post, error } = await supabase
            .from('posts')
            .insert({
                title,
                slug,
                excerpt,
                content,
                status,
                author_id: profile.id,
                read_time: Math.ceil(content.split(' ').length / 200), // Rough estimate
                published_at: status === 'published' 
                    ? (published_at || new Date().toISOString()) 
                    : null
            })
            .select()
            .single()

        if (error) {
            console.error('Error creating post:', error)
            return NextResponse.json(
                { error: 'Failed to create post' },
                { status: 500 }
            )
        }

        return NextResponse.json({
            success: true,
            post,
            message: 'Post created successfully'
        })

    } catch (error) {
        console.error('Post creation error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
