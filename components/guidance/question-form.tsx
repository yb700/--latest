'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { useToast } from '@/hooks/use-toast'
import { guidanceQuestionSchema } from '@/lib/validations'

type GuidanceFormData = {
    name: string
    email: string
    question: string
    consent: boolean
}

export function QuestionForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { toast } = useToast()

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<GuidanceFormData>({
        resolver: zodResolver(guidanceQuestionSchema),
    })

    const onSubmit = async (data: GuidanceFormData) => {
        setIsSubmitting(true)

        try {
            const response = await fetch('/api/guidance/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                throw new Error('Failed to submit question')
            }

            toast({
                title: 'Question submitted',
                description: 'Thank you for your question. We will review it and may publish a response.',
            })

            reset()
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to submit your question. Please try again.',
                variant: 'destructive',
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Submit a Legal Question</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            {...register('name')}
                            placeholder="Your name"
                        />
                        {errors.name && (
                            <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            {...register('email')}
                            placeholder="your.email@example.com"
                        />
                        {errors.email && (
                            <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="question">Your Question</Label>
                        <Textarea
                            id="question"
                            {...register('question')}
                            placeholder="Please describe your legal question in detail..."
                            rows={6}
                        />
                        {errors.question && (
                            <p className="text-sm text-red-600 mt-1">{errors.question.message}</p>
                        )}
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="consent"
                            {...register('consent')}
                        />
                        <Label htmlFor="consent" className="text-sm">
                            I consent to my question being published publicly (anonymously) with a response
                        </Label>
                    </div>
                    {errors.consent && (
                        <p className="text-sm text-red-600">{errors.consent.message}</p>
                    )}

                    <Button type="submit" disabled={isSubmitting} className="w-full">
                        {isSubmitting ? 'Submitting...' : 'Submit Question'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}


