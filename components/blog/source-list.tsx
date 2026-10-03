import type { SourceCitation } from '@/lib/post-content'
import { sourceUrlForTitle } from '@/lib/source-urls'

export function SourceList({ sources }: { sources: SourceCitation[] }) {
    if (sources.length === 0) return null

    return (
        <section className="mt-8" aria-label="Sources">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#8A8780]">Sources</h2>
            <ul className="space-y-2">
                {sources.map((source) => {
                    const url = sourceUrlForTitle(source.title)
                    return (
                        <li key={source.raw} className="text-slate-700">
                            {source.publisher},{' '}
                            {url ? (
                                <a
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-brand underline underline-offset-4"
                                >
                                    &lsquo;{source.title}&rsquo;
                                </a>
                            ) : (
                                <span>&lsquo;{source.title}&rsquo;</span>
                            )}
                            {source.date ? ` (${source.date})` : null}
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}
