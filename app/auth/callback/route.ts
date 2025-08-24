import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    const next = searchParams.get('next') ?? '/'

    console.log('Auth callback received:', { code: !!code, next, origin })

    if (code) {
        const supabase = createClient()

        try {
            const { data, error } = await supabase.auth.exchangeCodeForSession(code)

            console.log('Exchange code response:', { success: !error, userId: data?.user?.id })

            if (error) {
                console.error('Exchange code error:', error)
                return NextResponse.redirect(`${origin}/auth/auth-code-error?error=${encodeURIComponent(error.message)}`)
            }

            if (data.user) {
                // Manually create profile if it doesn't exist
                try {
                    const { data: profile, error: profileError } = await supabase
                        .from('profiles')
                        .select('*')
                        .eq('id', data.user.id)
                        .single()

                    if (profileError && profileError.code === 'PGRST116') {
                        // Profile doesn't exist, create it
                        console.log('Creating new profile for user:', data.user.id)
                        const { error: insertError } = await supabase
                            .from('profiles')
                            .insert({
                                id: data.user.id,
                                email: data.user.email!,
                                full_name: data.user.user_metadata?.full_name || null,
                                avatar_url: data.user.user_metadata?.avatar_url || null,
                                role: 'user',
                            })

                        if (insertError) {
                            console.error('Profile creation error:', insertError)
                        } else {
                            console.log('Profile created successfully')
                        }
                    }
                } catch (profileError) {
                    console.error('Profile check/creation error:', profileError)
                }

                const forwardedHost = request.headers.get('x-forwarded-host')
                const isLocalEnv = process.env.NODE_ENV === 'development'

                console.log('Redirecting to:', `${origin}${next}`)

                if (isLocalEnv) {
                    return NextResponse.redirect(`${origin}${next}`)
                } else if (forwardedHost) {
                    return NextResponse.redirect(`https://${forwardedHost}${next}`)
                } else {
                    return NextResponse.redirect(`${origin}${next}`)
                }
            }
        } catch (error) {
            console.error('Auth callback error:', error)
            return NextResponse.redirect(`${origin}/auth/auth-code-error?error=${encodeURIComponent('Unexpected error')}`)
        }
    }

    // Return the user to an error page with instructions
    console.log('No code provided, redirecting to error page')
    return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}


