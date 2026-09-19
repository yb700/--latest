'use client'

import { createClient } from '@/lib/supabase/client'
import { getAuthCallbackUrl } from '@/lib/site-url'
import { Profile } from './supabase/types'

// Client-side auth functions
export async function signOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = '/'
}

export async function signInWithEmail(email: string) {
    const supabase = createClient()
    const emailRedirectTo = getAuthCallbackUrl()

    const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
            emailRedirectTo,
        },
    })

    if (error) {
        throw error
    }

    return data
}

// Profile management (client-side)
export async function updateProfile(updates: Partial<Profile>) {
    const supabase = createClient()

    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) throw new Error('Not authenticated')

    const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single()

    if (error) throw error
    return data
}
