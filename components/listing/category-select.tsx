'use client'

import { useRouter } from 'next/navigation'

export type CategoryOption = {
    value: string
    label: string
}

interface CategorySelectProps {
    id: string
    basePath: string
    selected: string
    search: string
    options: CategoryOption[]
    extraQuery?: Record<string, string>
}

export function CategorySelect({
    id,
    basePath,
    selected,
    search,
    options,
    extraQuery,
}: CategorySelectProps) {
    const router = useRouter()

    function onChange(value: string) {
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
        router.push(query ? `${basePath}?${query}` : basePath)
    }

    return (
        <div>
            <label htmlFor={id} className="sr-only">
                Category
            </label>
            <select
                id={id}
                value={selected}
                onChange={(event) => onChange(event.target.value)}
                className="w-full rounded-[12px] border border-[#E1DED8] bg-white px-4 py-2.5 text-sm text-[#151515]"
            >
                <option value="">All Categories</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    )
}
