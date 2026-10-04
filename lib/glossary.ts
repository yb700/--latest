export type GlossaryEntry = {
    slug: string
    term: string
    definition: string
    postTitle: string
    postSlug: string
}

export const GLOSSARY: GlossaryEntry[] = [
    {
        slug: 'scheme-of-arrangement',
        term: 'scheme of arrangement',
        definition:
            'A court-approved agreement between a company and its shareholders or creditors. Takeovers often use it to buy the company.',
        postTitle: "DoorDash's Acquisition of Deliveroo",
        postSlug: 'doordashs-acquisition-of-deliveroo',
    },
    {
        slug: 'earn-out',
        term: 'earn-out',
        definition: 'Extra money paid after a sale if the business hits an agreed target.',
        postTitle: "Messi's Inter Miami Contract",
        postSlug:
            'messis-inter-miami-contract-designated-player-economics-public-salary-figures-and-the-2028-extension',
    },
    {
        slug: 'leveraged-buyout',
        term: 'leveraged buyout',
        definition: 'A takeover paid for mainly with borrowed money, often secured on the company being bought.',
        postTitle: 'The Glazers, Manchester United and the Buccaneers',
        postSlug: 'the-glazers-manchester-united-and-the-buccaneers',
    },
    {
        slug: 'rule-2-8',
        term: 'Rule 2.8',
        definition:
            'A Takeover Code rule that bars a bidder from bidding again for six months after it says it will not make an offer.',
        postTitle: "Rio Tinto and Glencore's Failed Merger",
        postSlug: 'rio-tinto-and-glencores-failed-merger',
    },
    {
        slug: 'behavioural-remedy',
        term: 'behavioural remedy',
        definition:
            'A promise about how a merged business will act, used instead of a sale of part of the business.',
        postTitle: 'Vodafone and Three Merger',
        postSlug: 'vodafonethree-merger-cma-approval-marks-shift-in-uk-competition-approach',
    },
    {
        slug: 'tender-offer',
        term: 'tender offer',
        definition: 'An offer sent straight to shareholders to buy their shares at a set price.',
        postTitle: 'Ineos Investment in Manchester United',
        postSlug: 'ineos-investment-in-manchester-united',
    },
    {
        slug: 'judicial-review',
        term: 'judicial review',
        definition: 'A court case that asks whether a public body stayed inside its legal powers.',
        postTitle: 'Visa, Mastercard and Revolut v PSR',
        postSlug: 'mastercard-visa-and-revolut-vs-the-psr-what-the-high-court-actually-decided',
    },
    {
        slug: 'private-credit',
        term: 'private credit',
        definition: 'Lending by investment funds rather than by a bank.',
        postTitle: "Virgin Atlantic's Heathrow Slot Financing",
        postSlug: 'secured-structured-finance-hsf-kramer-on-virgin-atlantics-745m-apollo-financing-heathrow-slots',
    },
    {
        slug: 'minority-stake',
        term: 'minority stake',
        definition: 'A holding of less than half the shares, so it does not by itself give majority ownership.',
        postTitle: 'Ineos Investment in Manchester United',
        postSlug: 'ineos-investment-in-manchester-united',
    },
    {
        slug: 'owners-and-directors-test',
        term: 'owners and directors test',
        definition: 'A check on whether a person is suitable to own or run a football club.',
        postTitle: 'The Independent Football Regulator',
        postSlug: 'the-independent-football-regulator',
    },
]

const LINK_PATTERNS: { slug: string; pattern: RegExp }[] = [
    {
        slug: 'owners-and-directors-test',
        pattern: /owners['\u2019]?,?\s+directors(?:['\u2019]?\s+and\s+senior\s+executives)?['\u2019]?\s+tests?/gi,
    },
    {
        slug: 'owners-and-directors-test',
        pattern: /owners['\u2019]?\s+and\s+directors['\u2019]?\s+tests?/gi,
    },
    {
        slug: 'owners-and-directors-test',
        pattern: /owners['\u2019]?\s+tests?/gi,
    },
    { slug: 'scheme-of-arrangement', pattern: /schemes? of arrangement/gi },
    { slug: 'leveraged-buyout', pattern: /leveraged buy-?outs?/gi },
    { slug: 'rule-2-8', pattern: /rule 2\.8/gi },
    { slug: 'behavioural-remedy', pattern: /behavioural remed(?:y|ies)/gi },
    { slug: 'tender-offer', pattern: /tender offers?/gi },
    { slug: 'judicial-review', pattern: /judicial reviews?/gi },
    { slug: 'private-credit', pattern: /private credit/gi },
    { slug: 'minority-stake', pattern: /minority stakes?/gi },
    { slug: 'earn-out', pattern: /earn-outs?/gi },
]

function glossaryHref(slug: string): string {
    return `/glossary#${slug}`
}

export type GlossaryPart =
    | { kind: 'text'; value: string }
    | { kind: 'link'; label: string; href: string }

/** Split glossary markdown into text and links for plain lines such as the summary and deal box. */
export function glossaryParts(text: string): GlossaryPart[] {
    return text
        .split(/(\[[^\]]+\]\([^)]+\))/g)
        .filter((piece) => piece.length > 0)
        .map((piece) => {
            const match = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(piece)
            if (!match) return { kind: 'text' as const, value: piece }
            return { kind: 'link' as const, label: match[1], href: match[2] }
        })
}

/**
 * Link the first mention of each glossary term. Later mentions stay as plain text.
 * Pass the same set across the summary, the deal box and the body so only the first mention links.
 */
export function linkGlossaryTerms(markdown: string, linked: Set<string> = new Set()): string {
    const pieces = markdown.split(/(\[[^\]]+\]\([^)]+\))/g)

    return pieces
        .map((piece) => {
            if (piece.startsWith('[')) return piece
            let next = piece

            for (const { slug, pattern } of LINK_PATTERNS) {
                if (linked.has(slug)) continue
                pattern.lastIndex = 0
                const match = pattern.exec(next)
                if (!match || match.index == null) continue
                const start = match.index
                const end = start + match[0].length
                next = `${next.slice(0, start)}[${match[0]}](${glossaryHref(slug)})${next.slice(end)}`
                linked.add(slug)
            }

            return next
        })
        .join('')
}

export function glossaryEntry(slug: string): GlossaryEntry | undefined {
    return GLOSSARY.find((entry) => entry.slug === slug)
}
