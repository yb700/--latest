'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { buildContactMailto } from '@/lib/contact'
import { contactMessageSchema } from '@/lib/validations'
import { Loader2, Send } from 'lucide-react'

function openMailto(href: string) {
    const link = document.createElement('a')
    link.href = href
    link.setAttribute('aria-hidden', 'true')
    document.body.appendChild(link)
    link.click()
    window.setTimeout(() => link.remove(), 0)
}

type ContactFormData = {
    name: string
    email: string
    subject: string
    message: string
}

export function ContactForm() {
    const { toast } = useToast()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactMessageSchema),
    })

    const onSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true)

        let savePromise: Promise<boolean> = Promise.resolve(false)
        try {
            savePromise = fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                signal: AbortSignal.timeout(8000),
            })
                .then(async (response) => {
                    if (!response.ok) {
                        console.error('Could not save contact message', response.status)
                        return false
                    }
                    return true
                })
                .catch((error) => {
                    console.error('Could not save contact message', error)
                    return false
                })
        } catch (error) {
            console.error('Could not save contact message', error)
        }

        // Open the email app before waiting on the save. A failed save must not block it.
        openMailto(buildContactMailto(data))

        toast({
            title: 'Opening an email',
            description: 'This opens an email to Younas. Send it from your email app.',
        })

        const saved = await savePromise
        if (saved) {
            reset()
        }
        setIsSubmitting(false)
    }

    return (
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-brand">Get in Touch</CardTitle>
                <p className="text-gray-600">
                    Send Message opens an email to Younas in your email app. Your subject and message are filled in, and your name and email are added so he can reply.
                </p>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                placeholder="Your full name"
                                {...register('name')}
                            />
                            {errors.name && (
                                <p className="text-sm text-red-600">{errors.name.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="your.email@example.com"
                                {...register('email')}
                            />
                            {errors.email && (
                                <p className="text-sm text-red-600">{errors.email.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                            id="subject"
                            placeholder="What is this about?"
                            {...register('subject')}
                        />
                        {errors.subject && (
                            <p className="text-sm text-red-600">{errors.subject.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                            id="message"
                            placeholder="Tell us more about your inquiry..."
                            rows={6}
                            {...register('message')}
                        />
                        {errors.message && (
                            <p className="text-sm text-red-600">{errors.message.message}</p>
                        )}
                    </div>

                    <Button type="submit" disabled={isSubmitting} className="w-full">
                        {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
