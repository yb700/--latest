import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { toBlogListPost, type BlogPostSource } from '@/lib/blog-listing'
import { previewDealOfTheWeek, selectDealOfTheWeek, type DealWeekCard } from '@/lib/deal-week'
import { shouldUseNewsFixtures } from '@/lib/news-preview'

export async function loadDealOfTheWeek(preview: boolean): Promise<DealWeekCard | null> {
    try {
        const supabase = createClient()
        const { data, error } = await supabase
            .from('posts')
            .select('id, title, slug, excerpt, short_preview, published_at, created_at, status')
            .eq('status', 'published')

        if (!error && data) {
            const chosen = selectDealOfTheWeek((data as BlogPostSource[]).map(toBlogListPost))
            if (chosen) return chosen
        }
    } catch (error) {
        console.error('Error fetching the deal of the week:', error)
    }

    if (shouldUseNewsFixtures(preview)) return previewDealOfTheWeek()
    return null
}

export function DealOfTheWeekCard({ deal }: { deal: DealWeekCard }) {
    return (
        <aside className="hidden rounded-2xl border border-[#E7E4DF] bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.05)] lg:block">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8A8780]">Deal of the week</p>
            <h2 className="mt-3 text-xl font-semibold leading-snug tracking-[-0.5px] text-[#151515]">{deal.title}</h2>
            {deal.rows.length > 0 && (
                <dl className="mt-4 border-y border-[#E7E4DF]">
                    {deal.rows.map((row) => (
                        <div key={row.label} className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-3 border-b border-[#E7E4DF] py-2 text-sm last:border-b-0">
                            <dt className="text-[#8A8780]">{row.label}</dt>
                            <dd className="text-[#151515]">{row.value}</dd>
                        </div>
                    ))}
                </dl>
            )}
            {deal.summary ? <p className="mt-4 text-sm leading-5 text-[#5E5E5E]">{deal.summary}</p> : null}
            <Link href={deal.href} className="mt-4 inline-block text-sm font-medium text-[#151515] underline underline-offset-4">
                Read post
            </Link>
            {deal.sample ? <p className="mt-3 text-xs text-[#8A8780]">Sample preview. Not a live post.</p> : null}
        </aside>
    )
}

