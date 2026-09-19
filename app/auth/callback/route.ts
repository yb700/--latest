import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextRequest, NextResponse } from 'next/server'
import { getRequestOrigin, getSafeInternalPath } from '@/lib/site-url'
import { Database } from '@/lib/supabase/types'

function redirectWithCookies(
    url: string,
    cookies: Array<{ name: string; value: string; options?: CookieOptions }>,
) {
    const response = NextResponse.redirect(url)
    for (const cookie of cookies) {
        response.cookies.set({
            name: cookie.name,
            value: cookie.value,
            ...cookie.options,
        })
    }
    return response
}

function createCallbackClient(request: NextRequest) {
    const cookiesToSet: Array<{ name: string; value: string; options?: CookieOptions }> = []

    const supabase = createServerClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return request.cookies.get(name)?.value
                },
                set(name: string, value: string, options: CookieOptions) {
                    request.cookies.set({ name, value, ...options })
                    cookiesToSet.push({ name, value, options })
                },
                remove(name: string, options: CookieOptions) {
                    request.cookies.set({ name, value: '', ...options })
                    cookiesToSet.push({ name, value: '', options })
                },
            },
        },
    )

    return { supabase, cookiesToSet }
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    const next = getSafeInternalPath(searchParams.get('next'))
    const authError = searchParams.get('error_description') ?? searchParams.get('error')
    const origin = getRequestOrigin(request)

    if (authError) {
        return NextResponse.redirect(
            `${origin}/auth/auth-code-error?error=${encodeURIComponent(authError)}`,
        )
    }

    if (!code) {
        return NextResponse.redirect(`${origin}/auth/auth-code-error`)
    }

    const { supabase, cookiesToSet } = createCallbackClient(request)

    try {
        const { data, error } = await supabase.auth.exchangeCodeForSession(code)

        if (error || !data.user) {
            console.error('Exchange code error:', error)
            return NextResponse.redirect(
                `${origin}/auth/auth-code-error?error=${encodeURIComponent(error?.message ?? 'Sign-in failed')}`,
            )
        }

        try {
            const { error: profileError } = await supabase
                .from('profiles')
                .select('id')
                .eq('id', data.user.id)
                .single()

            if (profileError && profileError.code === 'PGRST116') {
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
                }
            }
        } catch (profileError) {
            console.error('Profile check/creation error:', profileError)
        }

        return redirectWithCookies(`${origin}${next}`, cookiesToSet)
    } catch (error) {
        console.error('Auth callback error:', error)
        return NextResponse.redirect(
            `${origin}/auth/auth-code-error?error=${encodeURIComponent('Unexpected error')}`,
        )
    }
}
