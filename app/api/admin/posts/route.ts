import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { requireStaff } from '@/lib/auth-server'
import { normalizeShortPreview, PINNED_FEATURED_POST_SETTING } from '@/lib/blog-listing'

// GET all posts for admin
export async function GET() {
    try {
        await requireStaff()
        const supabase = createClient()

        const [{ data: posts, error }, pinResult] = await Promise.all([
            supabase
                .from('posts')
                .select('*, author:profiles(full_name)')
                .order('created_at', { ascending: false }),
            supabase
                .from('site_settings')
                .select('value')
                .eq('key', PINNED_FEATURED_POST_SETTING)
                .maybeSingle(),
        ])

        if (error) {
            console.error('Error fetching posts:', error)
            return NextResponse.json(
                { error: 'Failed to fetch posts' },
                { status: 500 }
            )
        }

        const pinnedFeaturedPostId = pinResult.data?.value?.trim() || null

        return NextResponse.json({ posts, pinnedFeaturedPostId })
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

        const { title, excerpt, content, status = 'draft' } = body
        let shortPreview: string | null = null

        if ('shortPreview' in body || 'short_preview' in body) {
            const parsed = normalizeShortPreview(body.shortPreview ?? body.short_preview)
            if (!parsed.ok) {
                return NextResponse.json({ error: parsed.error }, { status: 400 })
            }
            shortPreview = parsed.value
        }

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
                short_preview: shortPreview,
                content_md: content,
                status,
                author_id: profile.id,
                reading_time: Math.ceil(content.split(' ').length / 200), // Rough estimate
                published_at: status === 'published'
                    ? new Date().toISOString()
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
