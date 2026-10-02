import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { requireStaff } from '@/lib/auth-server'
import { PINNED_FEATURED_POST_SETTING } from '@/lib/blog-listing'

const POST_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export async function PUT(request: NextRequest) {
    try {
        await requireStaff()
        const supabase = createClient()
        const body = await request.json()
        const postId = typeof body?.postId === 'string' ? body.postId.trim() : ''

        if (!POST_ID.test(postId)) {
            return NextResponse.json({ error: 'Choose a post to pin.' }, { status: 400 })
        }

        const { data: post, error: postError } = await supabase
            .from('posts')
            .select('id, status')
            .eq('id', postId)
            .maybeSingle()

        if (postError || !post) {
            return NextResponse.json({ error: 'Post not found.' }, { status: 404 })
        }

        if (post.status !== 'published') {
            return NextResponse.json(
                { error: 'Only a published post can be pinned.' },
                { status: 400 }
            )
        }

        const { error } = await supabase.from('site_settings').upsert(
            {
                key: PINNED_FEATURED_POST_SETTING,
                value: postId,
                description: 'Published blog post pinned as the featured card.',
                updated_at: new Date().toISOString(),
            },
            { onConflict: 'key' }
        )

        if (error) {
            console.error('Error pinning featured post:', error)
            return NextResponse.json({ error: 'Failed to pin the post.' }, { status: 500 })
        }

        return NextResponse.json({
            success: true,
            pinnedFeaturedPostId: postId,
        })
    } catch (error) {
        console.error('Error pinning featured post:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

export async function DELETE() {
    try {
        await requireStaff()
        const supabase = createClient()

        const { error } = await supabase
            .from('site_settings')
            .delete()
            .eq('key', PINNED_FEATURED_POST_SETTING)

        if (error) {
            console.error('Error unpinning featured post:', error)
            return NextResponse.json({ error: 'Failed to unpin the post.' }, { status: 500 })
        }

        return NextResponse.json({ success: true, pinnedFeaturedPostId: null })
    } catch (error) {
        console.error('Error unpinning featured post:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
