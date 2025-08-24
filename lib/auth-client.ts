'use client'

import { createClient } from '@/lib/supabase/client'
import { Profile } from './supabase/types'

// Client-side auth functions
export async function signOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = '/'
}

export async function signInWithEmail(email: string) {
    const supabase = createClient()

    console.log('=== AUTH DEBUG START ===')
    console.log('Attempting to sign in with email:', email)
    console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
    console.log('Current origin:', window.location.origin)
    console.log('Redirect URL:', 'http://localhost:3001/auth/callback')

    try {
        console.log('About to call signInWithOtp...')

        const { data, error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: 'http://localhost:3001/auth/callback',
            },
        })

        console.log('SignInWithOtp completed')
        console.log('Sign in response:', { data, error })
        console.log('Error details:', error ? {
            message: error.message,
            status: error.status,
            name: error.name,
            stack: error.stack
        } : 'No error')

        if (error) {
            console.error('Sign in error:', error)
            throw error
        }

        console.log('=== AUTH DEBUG END - SUCCESS ===')
        return data
    } catch (error) {
        console.error('=== AUTH ERROR ===')
        console.error('Caught error:', error)
        console.error('Error type:', typeof error)
        console.error('Error message:', error instanceof Error ? error.message : 'Unknown error')
        console.error('Error stack:', error instanceof Error ? error.stack : 'No stack')
        console.error('=== AUTH ERROR END ===')
        throw error
    }
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


