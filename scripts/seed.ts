import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function seed() {
    console.log('🌱 Starting database seed...')

    try {
        // Create categories
        const { data: categories, error: categoriesError } = await supabase
            .from('categories')
            .upsert([
                { name: 'Contract Law', slug: 'contract-law', description: 'Legal issues related to contracts and agreements' },
                { name: 'Employment Law', slug: 'employment-law', description: 'Workplace legal matters and employee rights' },
                { name: 'Property Law', slug: 'property-law', description: 'Real estate and property legal issues' },
                { name: 'Family Law', slug: 'family-law', description: 'Family and domestic legal matters' },
                { name: 'Criminal Law', slug: 'criminal-law', description: 'Criminal justice and legal proceedings' },
            ])
            .select()

        if (categoriesError) throw categoriesError
        console.log('✅ Categories created')

        // Create tags
        const { data: tags, error: tagsError } = await supabase
            .from('tags')
            .upsert([
                { name: 'UK Law', slug: 'uk-law' },
                { name: 'Legal Advice', slug: 'legal-advice' },
                { name: 'Case Study', slug: 'case-study' },
                { name: 'Legislation', slug: 'legislation' },
                { name: 'Rights', slug: 'rights' },
            ])
            .select()

        if (tagsError) throw tagsError
        console.log('✅ Tags created')

        // Create sample posts
        const { data: posts, error: postsError } = await supabase
            .from('posts')
            .upsert([
                {
                    title: 'Understanding Contract Formation in UK Law',
                    slug: 'understanding-contract-formation-uk-law',
                    excerpt: 'A comprehensive guide to how contracts are formed under English law, including offer, acceptance, and consideration.',
                    content_md: `# Understanding Contract Formation in UK Law

Contract formation is a fundamental concept in English law. For a contract to be legally binding, three essential elements must be present:

## 1. Offer

An offer is a clear statement of terms by one party (the offeror) to another (the offeree), indicating a willingness to be bound by those terms.

**Key characteristics:**
- Must be clear and certain
- Can be made to a specific person or the world at large
- Can be revoked before acceptance (unless it's an option contract)

## 2. Acceptance

Acceptance must be:
- Unconditional and unqualified
- Communicated to the offeror
- Made within any specified time limit

**Example:** If A offers to sell a car to B for £5,000, B must accept exactly those terms. Any variation constitutes a counter-offer.

## 3. Consideration

Consideration is the price paid for the promise. It can be:
- A promise to do something
- A promise not to do something
- An act or forbearance

**Important:** Past consideration is generally not valid in English law.

## Practical Implications

Understanding these elements is crucial for:
- Drafting effective contracts
- Avoiding unenforceable agreements
- Protecting your legal rights

*This article is for informational purposes only and does not constitute legal advice.*`,
                    status: 'published',
                    reading_time: 5,
                },
                {
                    title: 'Employee Rights: Working Time Regulations',
                    slug: 'employee-rights-working-time-regulations',
                    excerpt: 'An overview of the Working Time Regulations 1998 and how they protect employee rights in the UK.',
                    content_md: `# Employee Rights: Working Time Regulations

The Working Time Regulations 1998 implement the European Working Time Directive in the UK, providing important protections for workers.

## Key Provisions

### Maximum Working Week
- 48 hours per week (averaged over 17 weeks)
- Workers can opt out of this limit
- Employers must keep records of opt-outs

### Rest Periods
- 11 consecutive hours of rest per day
- 24 hours of rest per week (or 48 hours per fortnight)
- 20-minute rest break for shifts over 6 hours

### Annual Leave
- 5.6 weeks of paid annual leave (28 days for full-time workers)
- Includes bank holidays
- Accrues from day one of employment

## Enforcement

Workers can:
- Bring claims in employment tribunals
- Seek compensation for breaches
- Request enforcement notices

## Recent Developments

The regulations have been updated to reflect:
- Changes in working patterns
- Gig economy considerations
- Remote work arrangements

*This guidance is for informational purposes only.*`,
                    status: 'published',
                    reading_time: 4,
                },
            ])
            .select()

        if (postsError) throw postsError
        console.log('✅ Posts created')

        // Link posts to categories
        if (posts && categories) {
            const postCategories = [
                { post_id: posts[0].id, category_id: categories[0].id }, // Contract law post
                { post_id: posts[1].id, category_id: categories[1].id }, // Employment law post
            ]

            const { error: postCategoriesError } = await supabase
                .from('post_categories')
                .upsert(postCategories)

            if (postCategoriesError) throw postCategoriesError
            console.log('✅ Post categories linked')
        }

        // Link posts to tags
        if (posts && tags) {
            const postTags = [
                { post_id: posts[0].id, tag_id: tags[0].id }, // UK Law
                { post_id: posts[0].id, tag_id: tags[1].id }, // Legal Advice
                { post_id: posts[1].id, tag_id: tags[0].id }, // UK Law
                { post_id: posts[1].id, tag_id: tags[4].id }, // Rights
            ]

            const { error: postTagsError } = await supabase
                .from('post_tags')
                .upsert(postTags)

            if (postTagsError) throw postTagsError
            console.log('✅ Post tags linked')
        }

        // Create sample guidance question and answer
        const { data: guidanceQuestion, error: questionError } = await supabase
            .from('guidance_questions')
            .upsert([
                {
                    name: 'Anonymous User',
                    email: 'user@example.com',
                    question: 'Can my landlord increase my rent without notice?',
                    consent: true,
                    status: 'approved',
                },
            ])
            .select()

        if (questionError) throw questionError
        console.log('✅ Guidance question created')

        if (guidanceQuestion && guidanceQuestion.length > 0) {
            const { error: answerError } = await supabase
                .from('guidance_answers')
                .upsert([
                    {
                        question_id: guidanceQuestion[0].id,
                        answer: `# Rent Increases: Your Rights as a Tenant

In the UK, landlords cannot simply increase your rent without following proper procedures. Here's what you need to know:

## For Assured Shorthold Tenancies (ASTs)

### Fixed-term tenancies
- Rent cannot be increased during the fixed term unless the tenancy agreement allows it
- Any increase must be clearly stated in the original agreement

### Periodic tenancies
- Landlords can increase rent once per year
- Must give at least one month's notice (for monthly tenancies)
- Must use a Section 13 notice (Form 4)

## Your Rights

1. **Challenge increases**: You can apply to a tribunal if you think the increase is unreasonable
2. **Negotiate**: You can try to negotiate with your landlord
3. **Seek advice**: Contact Citizens Advice or a housing charity

## What to do if rent is increased unfairly

1. Check your tenancy agreement
2. Verify the notice period
3. Consider whether the increase is reasonable
4. Seek professional advice if needed

*This guidance is for informational purposes only.*`,
                    },
                ])

            if (answerError) throw answerError
            console.log('✅ Guidance answer created')
        }

        console.log('🎉 Database seeding completed successfully!')
    } catch (error) {
        console.error('❌ Error seeding database:', error)
        process.exit(1)
    }
}

seed()
