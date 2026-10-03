export type SourceCitation = {
    publisher: string
    title: string
    date: string | null
    raw: string
}

export type SplitPost = {
    body: string
    sources: SourceCitation[]
    disclaimer: string | null
}

const CITATION =
    /^([^,\n]+),\s+['\u2018"](.+)['\u2019"](?:\s+\(([^)]+)\))?$/

const DISCLAIMER_PREFIX = 'this post is general information only'

function collapse(value: string): string {
    return value.replace(/\s+/g, ' ').trim()
}

function isRule(block: string): boolean {
    return /^(-{3,}|\*{3,}|_{3,})$/.test(block.trim())
}

function isDisclaimer(block: string): boolean {
    const plain = collapse(block).replace(/^[*_]+|[*_]+$/g, '').trim().toLowerCase()
    return plain.startsWith(DISCLAIMER_PREFIX)
}

export function parseCitation(block: string): SourceCitation | null {
    const text = collapse(block)
    const match = CITATION.exec(text)
    if (!match) return null

    const date = match[3]?.trim()
    return {
        publisher: match[1].trim(),
        title: match[2].trim(),
        date: date ? date : null,
        raw: text,
    }
}

/** Pull citation lines out of a post so the body, sources and disclaimer can render separately. */
export function splitPostContent(markdown: string): SplitPost {
    const lines = markdown.replace(/\r\n/g, '\n').split('\n')
    const body: string[] = []
    const sources: SourceCitation[] = []
    let disclaimer: string | null = null
    let paragraph: string[] = []

    const flushParagraph = () => {
        const block = paragraph.join('\n').trim()
        paragraph = []
        if (!block || isRule(block)) return
        body.push(block)
    }

    for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed) {
            flushParagraph()
            continue
        }

        if (isDisclaimer(trimmed)) {
            flushParagraph()
            disclaimer = collapse(trimmed).replace(/^[*_]+|[*_]+$/g, '').trim()
            continue
        }

        const citation = parseCitation(trimmed)
        if (citation) {
            flushParagraph()
            sources.push(citation)
            continue
        }

        if (isRule(trimmed)) {
            flushParagraph()
            continue
        }

        paragraph.push(line)
    }

    flushParagraph()

    return {
        body: body.join('\n\n'),
        sources,
        disclaimer,
    }
}
