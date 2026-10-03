export type InterviewNote = {
    whyItMatters: string
    useItTo: string
    likelyQuestion: string
}

/**
 * Copied from the website plan. The plan titles this note "INEOS Investment in Manchester United".
 * The live post is "Ineos Investment in Manchester United".
 */
const NOTES: Record<string, InterviewNote> = {
    'Kent v Apple': {
        whyItMatters:
            "The first UK opt-out class action to win after a full trial, against one of the world's largest companies.",
        useItTo:
            'show you understand the collective action regime and how litigation funding works, a growing area for disputes and competition teams.',
        likelyQuestion: '"Should litigation funders be able to profit from class actions?"',
    },
    'Vodafone and Three Merger': {
        whyItMatters:
            'The CMA cleared a four-to-three merger on behavioural commitments, including £11 billion of network investment, instead of requiring a sale of part of the business.',
        useItTo: 'talk about how merger control now balances competition against growth and investment.',
        likelyQuestion: '"Is the CMA becoming more deal-friendly?"',
    },
    "Apollo's Takeover of easyJet": {
        whyItMatters:
            "EU ownership rules shaped the whole deal. Apollo's funds hold no more than 49.9% so easyJet keeps its EU flying rights.",
        useItTo:
            'explain a Takeover Code process from rival bids to a Rule 2.7 firm offer and a scheme of arrangement, and how regulation shapes deal structure.',
        likelyQuestion: '"How would you structure a deal for a non-EU buyer of a European airline?"',
    },
    "Rio Tinto and Glencore's Failed Merger": {
        whyItMatters: 'Even with a clear strategic case, disagreements over price and control ended the talks at the deadline.',
        useItTo:
            'show you know the Takeover Code deadline and the six-month bar under Rule 2.8, core points for any corporate team.',
        likelyQuestion: '"Why do so many large mergers fail?"',
    },
    "Santander's Acquisition of TSB": {
        whyItMatters: "Sabadell's sale was driven as much by its defence against BBVA's hostile bid as by price.",
        useItTo:
            "show you understand how banks are valued, using price to tangible book value, and why a seller's wider position matters in a negotiation.",
        likelyQuestion: '"What is driving consolidation in UK banking?"',
    },
    'Visa, Mastercard and Revolut v PSR': {
        whyItMatters:
            'The High Court confirmed the PSR can cap cross-border card fees, which it estimates cost UK businesses up to £200 million a year.',
        useItTo:
            "show you understand judicial review as a way to test a regulator's powers, and how Brexit created the gap in the first place.",
        likelyQuestion: '"Should regulators set prices directly?"',
    },
    'Ineos Investment in Manchester United': {
        whyItMatters: 'Ratcliffe gained control of football operations with a minority stake, and the deal was funded entirely with equity.',
        useItTo:
            'explain the difference between ownership and control, and how share classes, a US tender offer and league approval had to fit together.',
        likelyQuestion: '"How can a minority investor secure real control?"',
    },
    "DMGT's Bid for the Telegraph": {
        whyItMatters: 'DMGT had an agreed deal, but the media plurality review gave Axel Springer time to win with a rival offer.',
        useItTo: 'talk about the risks between signing and completion in regulated sectors.',
        likelyQuestion: '"What can go wrong between signing a deal and completing it?"',
    },
    'The Independent Football Regulator': {
        whyItMatters:
            'English football clubs are now regulated by law, with a statutory owners test that can force an unsuitable owner to sell.',
        useItTo:
            'talk about regulatory due diligence in sports deals, and why buyers of Premier League clubs may now face two tests.',
        likelyQuestion: '"Will the regulator put investors off English football?"',
    },
    'AI in Law Firms': {
        whyItMatters:
            'Clients are pushing for fixed fees and rewarding firms that innovate, while the courts have made clear lawyers stay responsible for what AI produces.',
        useItTo:
            "answer the common question on technology in law with real examples on both sides: Harvey's growth and the Ayinde fake citations case.",
        likelyQuestion: '"How will AI change the role of a trainee?"',
    },
}

export function interviewNoteForTitle(title: string): InterviewNote | null {
    return NOTES[title] ?? null
}

export function interviewNoteTitles(): string[] {
    return Object.keys(NOTES)
}
