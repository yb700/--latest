import { CategorySelect } from '@/components/listing/category-select'
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
            <div className="mx-auto flex max-w-[720px] flex-col gap-4 px-4 py-6">
                <div className="flex items-baseline justify-between gap-3">
                    <div className="min-w-0">
                        <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8A8780]">Legal News</p>
                        <h1 className="text-2xl font-semibold leading-tight tracking-[-0.5px] text-[#151515]">
                            {selected ? newsCategoryLabel(selected) : 'The latest developments'}
                        </h1>
                    </div>
                    {preview && (
                        <p className="text-right text-xs text-[#8A8780]">Sample preview. Not live news.</p>
                    )}
                </div>
                <SearchField action="/news" id="news-search" defaultValue={search} hidden={hidden} />
                <CategorySelect
                    id="news-category"
                    basePath="/news"
                    selected={selected ?? ''}
                    search={search}
                    extraQuery={preview ? { preview: 'fixtures' } : undefined}
                    options={NEWS_CATEGORIES.map((category) => ({
                        value: category.slug,
                        label: category.shortLabel,
                    }))}
                />
            </div>
        </div>
    )
}
