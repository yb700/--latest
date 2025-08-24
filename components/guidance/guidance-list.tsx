import Link from 'next/link'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { formatDate } from '@/lib/utils'

interface Guidance {
    id: string
    question: string
    answer: string
    slug: string
    created_at: string
}

interface GuidanceListProps {
    guidance: Guidance[]
}

export function GuidanceList({ guidance }: GuidanceListProps) {
    return (
        <div className="space-y-4">
            {guidance.map((item) => (
                <Card key={item.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                        <Link href={`/guidance/${item.slug}`}>
                            <h3 className="text-lg font-semibold text-brand hover:text-brand-700 transition-colors line-clamp-2">
                                {item.question}
                            </h3>
                        </Link>
                        <div className="text-sm text-gray-500">
                            <time dateTime={item.created_at}>
                                {formatDate(item.created_at)}
                            </time>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <p className="text-gray-600 line-clamp-3">
                            {item.answer}
                        </p>
                        <Link
                            href={`/guidance/${item.slug}`}
                            className="inline-block mt-3 text-brand hover:text-brand-700 font-medium"
                        >
                            Read full answer →
                        </Link>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}


