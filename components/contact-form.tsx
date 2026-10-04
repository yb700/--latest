'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { sendContactEmail } from '@/lib/contact-mail'
import { contactMessageSchema } from '@/lib/validations'
import { Loader2, Send } from 'lucide-react'

type ContactFormData = {
    name: string
    email: string
    subject: string
    message: string
}

const SENT_MESSAGE = 'Your message was sent.'
const FAILED_MESSAGE = 'Your message could not be sent. Please try again.'

export function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const [statusMessage, setStatusMessage] = useState('')

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
        setStatus('idle')
        setStatusMessage('')

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                signal: AbortSignal.timeout(15000),
            })
            const payload = await response.json().catch(() => null)

            if (!response.ok) {
                setStatus('error')
                setStatusMessage(
                    response.status === 429 && typeof payload?.error === 'string'
                        ? payload.error
                        : FAILED_MESSAGE,
                )
                return
            }

            const sent = await sendContactEmail(data)
            if (!sent.ok) {
                setStatus('error')
                setStatusMessage(FAILED_MESSAGE)
                return
            }

            setStatus('success')
            setStatusMessage(SENT_MESSAGE)
            reset()
        } catch (error) {
            console.error('Could not send contact message', error)
            setStatus('error')
            setStatusMessage(FAILED_MESSAGE)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-semibold text-[#151515]">Get in touch</CardTitle>
                <p className="text-[#5E5E5E]">
                    Questions, feedback or an idea for a post? Send a message and I&apos;ll reply by email.
                </p>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                placeholder="Your name"
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
                            placeholder="Your message"
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

                    {statusMessage ? (
                        <p
                            role={status === 'error' ? 'alert' : 'status'}
                            className={status === 'error' ? 'text-sm text-red-600' : 'text-sm text-brand'}
                        >
                            {statusMessage}
                        </p>
                    ) : null}
                </form>
            </CardContent>
        </Card>
    )
}
