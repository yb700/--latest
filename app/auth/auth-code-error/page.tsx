import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, ArrowLeft } from 'lucide-react'

export const metadata = {
    title: 'Sign-in error — ClearCut Law',
    description: 'The magic link could not complete sign-in.',
}

export default function AuthCodeErrorPage({
    searchParams,
}: {
    searchParams: { error?: string }
}) {
    const message = searchParams.error

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="mx-auto w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-4">
                        <AlertCircle className="h-6 w-6 text-red-600" />
                    </div>
                    <CardTitle>Sign-in link could not be completed</CardTitle>
                    <CardDescription>
                        The magic link was invalid, expired, or already used. Request a new link to try again.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {message ? (
                        <p className="text-sm text-slate-600 text-center break-words">
                            {message}
                        </p>
                    ) : (
                        <p className="text-sm text-slate-600 text-center">
                            If you opened this page directly, go back to sign in and use the link from your email.
                        </p>
                    )}
                    <Link href="/auth/login">
                        <Button className="w-full">Request a new magic link</Button>
                    </Link>
                    <Link href="/">
                        <Button variant="ghost" className="w-full">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to home
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    )
}
