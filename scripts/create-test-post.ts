import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function createTestPost() {
    try {
        console.log('Creating test post...')

        const testPost = {
            title: 'Welcome to ClearCut Law - Your First Blog Post',
            slug: 'welcome-to-ClearCut Law',
            excerpt: 'An introduction to ClearCut Law and what we offer for legal guidance and commentary.',
            content: `# Welcome to ClearCut Law

This is your first blog post on ClearCut Law. Here you can share legal insights, commentary, and guidance.

## What is ClearCut Law?

ClearCut Law is a platform dedicated to providing clear, accessible legal information and commentary for the UK legal community and the public.

## What You Can Expect

- **Legal Analysis**: In-depth analysis of current legal developments
- **Practical Guidance**: Practical advice on common legal issues
- **Educational Content**: Resources to help understand complex legal concepts
- **Q&A Section**: Public legal questions and answers

## Getting Started

This post demonstrates the markdown rendering capabilities of the platform. You can use:

- **Bold text** and *italic text*
- Lists like this one
- [Links](https://example.com)
- And much more

Stay tuned for more content coming soon!`,
            status: 'published',
            author_id: '5cc6758f-11b7-4001-817f-49ead6838760', // Your user ID
            read_time: 3,
            published_at: new Date().toISOString()
        }

        const { data, error } = await supabase
            .from('posts')
            .insert(testPost)
            .select()
            .single()

        if (error) {
            console.error('Error creating test post:', error)
            return
        }

        console.log('Test post created successfully!')
        console.log('Post ID:', data.id)
        console.log('Slug:', data.slug)
        console.log('Title:', data.title)
        console.log('\nYou can now visit: http://localhost:3001/blog/welcome-to-ClearCut Law')

    } catch (error) {
        console.error('Error:', error)
    }
}

createTestPost()
