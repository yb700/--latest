export type Database = {
    ClearCut Law: {
        Tables: {
            profiles: {
                Row: {
                    id: string
                    email: string
                    full_name: string | null
                    avatar_url: string | null
                    role: 'admin' | 'editor' | 'user'
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id: string
                    email: string
                    full_name?: string | null
                    avatar_url?: string | null
                    role?: 'admin' | 'editor' | 'user'
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    email?: string
                    full_name?: string | null
                    avatar_url?: string | null
                    role?: 'admin' | 'editor' | 'user'
                    created_at?: string
                    updated_at?: string
                }
            }
            posts: {
                Row: {
                    id: string
                    title: string
                    slug: string
                    excerpt: string | null
                    content_md: string
                    hero_image_url: string | null
                    status: 'draft' | 'review' | 'published'
                    author_id: string
                    reading_time: number | null
                    published_at: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    title: string
                    slug: string
                    excerpt?: string | null
                    content_md: string
                    hero_image_url?: string | null
                    status?: 'draft' | 'review' | 'published'
                    author_id: string
                    reading_time?: number | null
                    published_at?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    title?: string
                    slug?: string
                    excerpt?: string | null
                    content_md?: string
                    hero_image_url?: string | null
                    status?: 'draft' | 'review' | 'published'
                    author_id?: string
                    reading_time?: number | null
                    published_at?: string | null
                    created_at?: string
                    updated_at?: string
                }
            }
            categories: {
                Row: {
                    id: string
                    name: string
                    slug: string
                    description: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    slug: string
                    description?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    name?: string
                    slug?: string
                    description?: string | null
                    created_at?: string
                }
            }
            tags: {
                Row: {
                    id: string
                    name: string
                    slug: string
                    created_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    slug: string
                    created_at?: string
                }
                Update: {
                    id?: string
                    name?: string
                    slug?: string
                    created_at?: string
                }
            }
            post_categories: {
                Row: {
                    post_id: string
                    category_id: string
                }
                Insert: {
                    post_id: string
                    category_id: string
                }
                Update: {
                    post_id?: string
                    category_id?: string
                }
            }
            post_tags: {
                Row: {
                    post_id: string
                    tag_id: string
                }
                Insert: {
                    post_id: string
                    tag_id: string
                }
                Update: {
                    post_id?: string
                    tag_id?: string
                }
            }
            guidance_questions: {
                Row: {
                    id: string
                    title: string
                    question_text: string
                    area: 'Family' | 'Employment' | 'Road Traffic' | 'Commercial' | 'Other'
                    email: string | null
                    consent_given: boolean
                    is_approved: boolean
                    created_at: string
                }
                Insert: {
                    id?: string
                    title: string
                    question_text: string
                    area: 'Family' | 'Employment' | 'Road Traffic' | 'Commercial' | 'Other'
                    email?: string | null
                    consent_given: boolean
                    is_approved?: boolean
                    created_at?: string
                }
                Update: {
                    id?: string
                    title?: string
                    question_text?: string
                    area?: 'Family' | 'Employment' | 'Road Traffic' | 'Commercial' | 'Other'
                    email?: string | null
                    consent_given?: boolean
                    is_approved?: boolean
                    created_at?: string
                }
            }
            guidance_answers: {
                Row: {
                    id: string
                    question_id: string
                    slug: string
                    answer_md: string
                    author_id: string
                    published: boolean
                    published_at: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    question_id: string
                    slug: string
                    answer_md: string
                    author_id: string
                    published?: boolean
                    published_at?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    question_id?: string
                    slug?: string
                    answer_md?: string
                    author_id?: string
                    published?: boolean
                    published_at?: string | null
                    created_at?: string
                    updated_at?: string
                }
            }
            contact_messages: {
                Row: {
                    id: string
                    name: string
                    email: string
                    subject: string
                    message: string
                    created_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    email: string
                    subject: string
                    message: string
                    created_at?: string
                }
                Update: {
                    id?: string
                    name?: string
                    email?: string
                    subject?: string
                    message?: string
                    created_at?: string
                }
            }
            newsletter_subscribers: {
                Row: {
                    id: string
                    email: string
                    subscribed: boolean
                    created_at: string
                }
                Insert: {
                    id?: string
                    email: string
                    subscribed?: boolean
                    created_at?: string
                }
                Update: {
                    id?: string
                    email?: string
                    subscribed?: boolean
                    created_at?: string
                }
            }
            pages: {
                Row: {
                    id: string
                    slug: string
                    title: string
                    content_md: string
                    published: boolean
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    slug: string
                    title: string
                    content_md: string
                    published?: boolean
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    slug?: string
                    title?: string
                    content_md?: string
                    published?: boolean
                    created_at?: string
                    updated_at?: string
                }
            }
            site_settings: {
                Row: {
                    id: string
                    key: string
                    value: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    key: string
                    value: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    key?: string
                    value?: string
                    updated_at?: string
                }
            }
            nav_links: {
                Row: {
                    id: string
                    label: string
                    href: string
                    order_index: number
                    is_active: boolean
                    created_at: string
                }
                Insert: {
                    id?: string
                    label: string
                    href: string
                    order_index: number
                    is_active?: boolean
                    created_at?: string
                }
                Update: {
                    id?: string
                    label?: string
                    href?: string
                    order_index?: number
                    is_active?: boolean
                    created_at?: string
                }
            }
        }
        Views: {
            public_guidance: {
                Row: {
                    id: string
                    question_title: string
                    question_text: string
                    area: 'Family' | 'Employment' | 'Road Traffic' | 'Commercial' | 'Other'
                    answer_slug: string
                    answer_md: string
                    author_name: string | null
                    published_at: string | null
                }
            }
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
    }
}

// Utility types
export type Tables<T extends keyof Database['ClearCut Law']['Tables']> = Database['ClearCut Law']['Tables'][T]['Row']
export type TablesInsert<T extends keyof Database['ClearCut Law']['Tables']> = Database['ClearCut Law']['Tables'][T]['Insert']
export type TablesUpdate<T extends keyof Database['ClearCut Law']['Tables']> = Database['ClearCut Law']['Tables'][T]['Update']

// Common types
export type Profile = Tables<'profiles'>
export type Post = Tables<'posts'>
export type Category = Tables<'categories'>
export type Tag = Tables<'tags'>
export type GuidanceQuestion = Tables<'guidance_questions'>
export type GuidanceAnswer = Tables<'guidance_answers'>
export type ContactMessage = Tables<'contact_messages'>
export type NewsletterSubscriber = Tables<'newsletter_subscribers'>
export type Page = Tables<'pages'>
export type SiteSetting = Tables<'site_settings'>
export type NavLink = Tables<'nav_links'>
export type PublicGuidance = Database['ClearCut Law']['Views']['public_guidance']['Row']

// Extended types for UI
export type PostWithRelations = Post & {
    author: Profile
    categories: Category[]
    tags: Tag[]
}

export type GuidanceQuestionWithAnswer = GuidanceQuestion & {
    answer?: GuidanceAnswer & {
        author: Profile
    }
}

export type UserRole = Profile['role']


