import { NextResponse } from 'next/server'
import { NEWS_PAGE_SIZE } from '@/lib/news'
import { getNewsPage } from '@/lib/news-data'
import { isNewsCategorySlug } from '@/lib/news-categories'
import { shouldUseNewsFixtures } from '@/lib/news-preview'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const categoryParam = searchParams.get('category') ?? ''
    const category = isNewsCategorySlug(categoryParam) ? categoryParam : null
    const offsetRaw = Number(searchParams.get('offset'))
    const offset = Number.isFinite(offsetRaw) && offsetRaw > 0 ? Math.floor(offsetRaw) : 0
    const preview = shouldUseNewsFixtures(searchParams.get('preview') === 'fixtures')

    try {
        const page = await getNewsPage({
            category,
            offset,
            limit: NEWS_PAGE_SIZE,
            preview,
        })

        return NextResponse.json(page)
    } catch (error) {
        console.error('News page fetch error:', error)
        return NextResponse.json({ error: 'Could not load news' }, { status: 500 })
    }
}
