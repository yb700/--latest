import Link from 'next/link'
import { cn } from '@/lib/utils'

export type CategoryOption = {
    value: string
    label: string
}

interface CategoryOptionsProps {
    basePath: string
    selected: string
    search: string
    options: CategoryOption[]
    extraQuery?: Record<string, string>
}

function optionHref(
    basePath: string,
    value: string,
    search: string,
    extraQuery?: Record<string, string>
) {
    const params = new URLSearchParams()
    const term = search.trim()
    if (term) params.set('search', term)
    if (value) params.set('category', value)
    if (extraQuery) {
        for (const [key, entry] of Object.entries(extraQuery)) {
            if (entry) params.set(key, entry)
        }
    }
    const query = params.toString()
    return query ? `${basePath}?${query}` : basePath
}

export function CategoryOptions({
    basePath,
    selected,
    search,
    options,
    extraQuery,
}: CategoryOptionsProps) {
    return (
        <nav aria-label="Categories" className="flex flex-wrap gap-2">
            {options.map((option) => {
                const active = option.value === selected
                return (
                    <Link
                        key={option.value}
                        href={optionHref(basePath, option.value, search, extraQuery)}
                        aria-current={active ? 'page' : undefined}
                        className={cn(
                            'inline-flex min-h-10 items-center justify-center rounded-[12px] border px-4 text-sm font-medium',
                            active
                                ? 'border-[#151515] bg-[#151515] text-white'
                                : 'border-[#E7E4DF] bg-white text-[#151515]'
                        )}
                    >
                        {option.label}
                    </Link>
                )
            })}
        </nav>
    )
}
