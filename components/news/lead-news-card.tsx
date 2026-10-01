import { safeHttpUrl } from '@/lib/news'
import { NewsItem } from '@/lib/supabase/types'

interface LeadNewsCardProps {
    item: NewsItem
    headingLevel?: 'h2' | 'h3'
}

export function LeadNewsCard({ item, headingLevel = 'h2' }: LeadNewsCardProps) {
    const Heading = headingLevel
    const sourceUrl = safeHttpUrl(item.source_url)

    return (
        <article className="relative mx-auto flex min-h-[36rem] w-full max-w-[22rem] flex-col overflow-hidden rounded-[1.75rem] bg-brand p-6 text-white shadow-md sm:min-h-[40rem] sm:max-w-md sm:p-8">
            <div>
                <div
                    className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white text-sm font-bold tracking-wide"
                    aria-hidden="true"
                >
                    CL
                </div>
                <p className="mt-4 text-sm font-semibold tracking-[0.42em] text-white">NEWS</p>
            </div>

            <div className="mt-auto">
                <div className="border-l-[6px] border-white pl-4">
                    <Heading className="text-3xl font-bold uppercase leading-[1.05] tracking-wide sm:text-4xl">
                        {item.headline}
                    </Heading>
                    <p className="mt-4 text-xs font-medium uppercase leading-snug tracking-wide text-white sm:text-sm">
                        {item.summary}
                    </p>
                </div>

                <div className="mt-6 flex items-start justify-between gap-4 border-t border-white pt-3 text-[10px] font-semibold uppercase tracking-[0.18em] sm:text-xs">
                    <p>Clear Cut Law</p>
                    <p className="text-right">
                        {sourceUrl ? (
                            <a
                                href={sourceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white no-underline hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand"
                            >
                                Sources: {item.source_name}
                            </a>
                        ) : (
                            <>Sources: {item.source_name}</>
                        )}
                    </p>
                </div>
            </div>
        </article>
    )
}
