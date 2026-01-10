import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import type { Profile } from '@/lib/supabase/types'

export async function GET() {
    try {
        const supabase = createClient()

        // Get current user
        const { data: { user }, error: userError } = await supabase.auth.getUser()

        if (userError || !user) {
            return NextResponse.json({
                success: false,
                error: 'Not authenticated',
                userError
            })
        }

        // Get user profile
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single()
        
        const typedProfile = profile as Profile | null

        return NextResponse.json({
            success: true,
            user: {
                id: user.id,
                email: user.email
            },
            profile: typedProfile,
            profileError,
            isAdmin: typedProfile?.role === 'admin',
            isEditor: typedProfile?.role === 'editor'
        })

    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 })
    }
}
