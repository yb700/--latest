import { CategoryOptions } from '@/components/listing/category-options'
import { SearchField } from '@/components/listing/search-field'
import { NEWS_CATEGORIES, NewsCategorySlug, newsCategoryLabel } from '@/lib/news-categories'

interface NewsToolbarProps {
    selected: NewsCategorySlug | null
    preview: boolean
    search: string
}

export function NewsToolbar({ selected, preview, search }: NewsToolbarProps) {
    const hidden: Record<string, string> = {}
    if (selected) hidden.category = selected
    if (preview) hidden.preview = 'fixtures'

    return (
        <div className="bg-[#FAF9F7]">
            <div className="mx-auto flex max-w-[760px] flex-col gap-4 px-4 py-6">
                <div className="flex items-baseline justify-between gap-3">
                    <div className="min-w-0">
                        <h1 className="text-2xl font-bold uppercase leading-tight tracking-[0.04em] text-[#151515]">
                            Legal News
                        </h1>
                        <p className="mt-1 text-sm font-normal text-[#5E5E5E]">
                            {selected ? newsCategoryLabel(selected) : 'The latest developments'}
                        </p>
                    </div>
                    {preview && (
                        <p className="text-right text-xs text-[#8A8780]">Sample preview. Not live news.</p>
                    )}
                </div>
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                <SearchField
                    action="/news"
                    id="news-search"
                    defaultValue={search}
                    hidden={hidden}
                    className="min-w-0 lg:flex-1"
                />
                <CategoryOptions
                    basePath="/news"
                    selected={selected ?? ''}
                    search={search}
                    className="lg:shrink-0 lg:flex-nowrap"
                    extraQuery={preview ? { preview: 'fixtures' } : undefined}
                    options={(
                        [
                            'mergers-acquisitions',
                            'banking-finance',
                            'competition-regulation',
                            'sports-deals-regulation',
                        ] as const
                    ).map((slug) => ({
                        value: slug,
                        label: NEWS_CATEGORIES.find((item) => item.slug === slug)?.shortLabel ?? slug,
                    }))}
                />
                </div>
            </div>
        </div>
    )
}
