import { Badge } from '@/components/ui/badge'

interface Tag {
    id: string
    name: string
    slug: string
}

interface TagPillsProps {
    tags: Tag[]
}

export function TagPills({ tags }: TagPillsProps) {
    if (!tags || tags.length === 0) {
        return null
    }

    return (
        <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
                <Badge
                    key={tag.id}
                    variant="outline"
                    className="text-sm bg-gray-50 text-gray-700 border-gray-200"
                >
                    #{tag.name}
                </Badge>
            ))}
        </div>
    )
}


