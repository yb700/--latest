import { GlossaryText } from '@/components/blog/glossary-text'
import type { DealGlance } from '@/lib/deal-glance'

const FIELDS: { key: keyof DealGlance; label: string }[] = [
    { key: 'parties', label: 'Parties' },
    { key: 'value', label: 'Value' },
    { key: 'advisers', label: 'Advisers' },
    { key: 'status', label: 'Status' },
    { key: 'keyLaw', label: 'Key law' },
]

export function DealGlanceBox({ deal }: { deal: DealGlance }) {
    const rows = FIELDS.filter((field) => deal[field.key])

    if (rows.length === 0) return null

    return (
        <aside className="mb-8 rounded-xl border border-[#E7E4DF] bg-[#FAF9F7] p-4 sm:p-5">
            <h2 className="mb-3 text-sm font-semibold text-[#151515]">Deal at a glance</h2>
            <dl className="space-y-3">
                {rows.map((field) => (
                    <div key={field.key}>
                        <dt className="text-xs font-medium uppercase tracking-wide text-[#8A8780]">{field.label}</dt>
                        <dd className="mt-1 text-[#151515]">
                            <GlossaryText text={String(deal[field.key])} />
                        </dd>
                    </div>
                ))}
            </dl>
        </aside>
    )
}
