import { z } from "zod"

export const contactMessageSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(100),
    email: z.string().email("Please enter a valid email address"),
    subject: z.string().min(5, "Subject must be at least 5 characters").max(200),
    message: z.string().min(10, "Message must be at least 10 characters").max(2000),
})

export const guidanceQuestionSchema = z.object({
    title: z.string().min(10, "Title must be at least 10 characters").max(200),
    questionText: z.string().min(20, "Question must be at least 20 characters").max(2000),
    area: z.enum(["Family", "Employment", "Road Traffic", "Commercial", "Other"]),
    email: z.string().email("Please enter a valid email address").optional().or(z.literal("")),
    consentGiven: z.boolean().refine(val => val === true, {
        message: "You must give consent to proceed"
    }),
})

export const newsletterSubscriptionSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
})

export const postSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters").max(200),
    slug: z.string().min(1, "Slug is required").max(200),
    excerpt: z.string().max(500).optional(),
    contentMd: z.string().min(10, "Content must be at least 10 characters"),
    heroImageUrl: z.string().url().optional().or(z.literal("")),
    status: z.enum(["draft", "review", "published"]),
    authorId: z.string().uuid(),
    categoryIds: z.array(z.string().uuid()).optional(),
    tagIds: z.array(z.string().uuid()).optional(),
})

export const categorySchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(100),
    slug: z.string().min(1, "Slug is required").max(100),
    description: z.string().max(500).optional(),
})

export const tagSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(50),
    slug: z.string().min(1, "Slug is required").max(50),
})

export const guidanceAnswerSchema = z.object({
    questionId: z.string().uuid(),
    slug: z.string().min(1, "Slug is required").max(200),
    answerMd: z.string().min(10, "Answer must be at least 10 characters"),
    authorId: z.string().uuid(),
    published: z.boolean(),
})

export const siteSettingSchema = z.object({
    key: z.string().min(1, "Key is required"),
    value: z.string(),
})

export const navLinkSchema = z.object({
    label: z.string().min(1, "Label is required").max(50),
    href: z.string().min(1, "URL is required"),
    orderIndex: z.number().int().min(0),
    isActive: z.boolean(),
})

// Export types
export type ContactMessage = z.infer<typeof contactMessageSchema>
export type GuidanceQuestionInput = z.infer<typeof guidanceQuestionSchema>
export type NewsletterSubscription = z.infer<typeof newsletterSubscriptionSchema>
export type PostInput = z.infer<typeof postSchema>
export type CategoryInput = z.infer<typeof categorySchema>
export type TagInput = z.infer<typeof tagSchema>
export type GuidanceAnswerInput = z.infer<typeof guidanceAnswerSchema>
export type SiteSettingInput = z.infer<typeof siteSettingSchema>
export type NavLinkInput = z.infer<typeof navLinkSchema>


