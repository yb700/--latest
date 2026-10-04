import { glossaryParts } from '@/lib/glossary'

/** Renders a plain line that may contain one glossary link. */
export function GlossaryText({ text }: { text: string }) {
    const parts = glossaryParts(text)

    return (
        <>
            {parts.map((part, index) =>
                part.kind === 'text' ? (
                    <span key={index}>{part.value}</span>
                ) : (
                    <a
                        key={`${part.href}-${index}`}
                        href={part.href}
                        className="text-[#151515] underline underline-offset-4"
                    >
                        {part.label}
                    </a>
                )
            )}
        </>
    )
}
