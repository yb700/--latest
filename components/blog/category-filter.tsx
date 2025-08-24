'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'

interface Category {
    id: string
    name: string
    slug: string
}

interface CategoryFilterProps {
    categories: Category[]
    selectedCategory: string
    className?: string
}

export function CategoryFilter({ categories, selectedCategory, className }: CategoryFilterProps) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const handleCategoryChange = (categorySlug: string) => {
        const params = new URLSearchParams(searchParams)

        if (categorySlug === 'all') {
            params.delete('category')
        } else {
            params.set('category', categorySlug)
        }

        // Reset to first page when filtering
        params.delete('page')

        router.push(`/blog?${params.toString()}`)
    }

    return (
        <Select value={selectedCategory || 'all'} onValueChange={handleCategoryChange}>
            <SelectTrigger className={cn('w-full', className)}>
                <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                    <SelectItem key={category.id} value={category.slug}>
                        {category.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}


