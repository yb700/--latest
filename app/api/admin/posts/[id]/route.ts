import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { requireStaff } from '@/lib/auth-server'

// GET a single post by ID
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await requireStaff()
        const supabase = createClient()
        const { id } = await params

        const { data: post, error } = await supabase
            .from('posts')
            .select('*, author:profiles(full_name)')
            .eq('id', id)
            .single()

        if (error) {
            console.error('Error fetching post:', error)
            return NextResponse.json(
                { error: 'Post not found' },
                { status: 404 }
            )
        }

        return NextResponse.json({ post })
    } catch (error) {
        console.error('Error fetching post:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

// UPDATE a post
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await requireStaff()
        const supabase = createClient()
        const { id } = await params
        const body = await request.json()

        const { title, excerpt, content, status, published_at } = body

        // Generate new slug if title changed
        const slug = title
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, '')
            .replace(/\s+/g, '-')
            .trim()

        const updateData: Record<string, unknown> = {
            title,
            slug,
            excerpt,
            content,
            status,
            read_time: Math.ceil(content.split(' ').length / 200),
        }

        // Handle published_at based on status
        if (status === 'published') {
            updateData.published_at = published_at || new Date().toISOString()
        } else {
            updateData.published_at = null
        }

        const { data: post, error } = await supabase
            .from('posts')
            .update(updateData)
            .eq('id', id)
            .select()
            .single()

        if (error) {
            console.error('Error updating post:', error)
            return NextResponse.json(
                { error: 'Failed to update post' },
                { status: 500 }
            )
        }

        return NextResponse.json({
            success: true,
            post,
            message: 'Post updated successfully'
        })
    } catch (error) {
        console.error('Post update error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

// DELETE a post
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await requireStaff()
        const supabase = createClient()
        const { id } = await params

        const { error } = await supabase
            .from('posts')
            .delete()
            .eq('id', id)

        if (error) {
            console.error('Error deleting post:', error)
            return NextResponse.json(
                { error: 'Failed to delete post' },
                { status: 500 }
            )
        }

        return NextResponse.json({
            success: true,
            message: 'Post deleted successfully'
        })
    } catch (error) {
        console.error('Post deletion error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

