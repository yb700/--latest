import { createClient } from '@/lib/supabase/server'
import { Profile, UserRole } from './supabase/types'
import { redirect } from 'next/navigation'

// Server-side auth functions
export async function getUser() {
    const supabase = createClient()

    try {
        const { data: { user }, error } = await supabase.auth.getUser()
        if (error || !user) return null
        return user
    } catch (error) {
        return null
    }
}

export async function getProfile(): Promise<Profile | null> {
    const supabase = createClient()
    const user = await getUser()

    if (!user) return null

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    return profile
}

export async function requireAuth(): Promise<Profile> {
    const profile = await getProfile()
    if (!profile) {
        redirect('/auth/login')
    }
    return profile
}

export async function requireStaff(): Promise<Profile> {
    const profile = await requireAuth()
    if (!isStaff(profile.role)) {
        redirect('/')
    }
    return profile
}

export function isStaff(role: UserRole): boolean {
    return role === 'admin' || role === 'editor'
}

export function isAdmin(role: UserRole): boolean {
    return role === 'admin'
}

// Profile management (server-side)
export async function createProfile(profile: Omit<Profile, 'created_at' | 'updated_at'>) {
    const supabase = createClient()

    const { data, error } = await supabase
        .from('profiles')
        .insert(profile)
        .select()
        .single()

    if (error) throw error
    return data
}


