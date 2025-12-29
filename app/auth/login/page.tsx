"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { signInWithEmail } from "@/lib/auth-client"
import { toast } from "@/hooks/use-toast"
import { Mail, ArrowLeft } from "lucide-react"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isEmailSent, setIsEmailSent] = useState(false)
    const router = useRouter()

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            await signInWithEmail(email)
            setIsEmailSent(true)
            toast({
                title: "Magic link sent!",
                description: "Check your email for a sign-in link.",
            })
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to send magic link. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    if (isEmailSent) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
                <Card className="w-full max-w-md">
                    <CardHeader className="text-center">
                        <div className="mx-auto w-12 h-12 bg-brand-50 rounded-full flex items-center justify-center mb-4">
                            <Mail className="h-6 w-6 text-brand" />
                        </div>
                        <CardTitle>Check your email</CardTitle>
                        <CardDescription>
                            We've sent a magic link to <strong>{email}</strong>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-slate-600 text-center mb-6">
                            Click the link in the email to sign in to your account.
                            The link will expire in 1 hour.
                        </p>
                        <div className="space-y-4">
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => setIsEmailSent(false)}
                            >
                                Use different email
                            </Button>
                            <Link href="/">
                                <Button variant="ghost" className="w-full">
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Back to home
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <Link href="/" className="flex items-center justify-center space-x-2 mb-4">
                        <div className="h-8 w-8 rounded-lg bg-brand flex items-center justify-center">
                            <span className="text-white font-bold text-sm">CL</span>
                        </div>
                        <span className="font-bold text-xl text-brand">ClearCut Law</span>
                    </Link>
                    <CardTitle>Sign in to your account</CardTitle>
                    <CardDescription>
                        We'll send you a magic link to sign in without a password
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSignIn} className="space-y-4">
                        <div>
                            <Label htmlFor="email">Email address</Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                                disabled={isLoading}
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading || !email}
                        >
                            {isLoading ? "Sending..." : "Send magic link"}
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <Link href="/">
                            <Button variant="ghost">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to home
                            </Button>
                        </Link>
                    </div>

                    <div className="mt-6 text-xs text-slate-500 text-center">
                        <p>
                            By signing in, you agree to our{" "}
                            <Link href="/terms" className="text-brand hover:underline">
                                Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link href="/privacy" className="text-brand hover:underline">
                                Privacy Policy
                            </Link>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
