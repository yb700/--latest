export type DealStatus = 'Pending' | 'Completed' | 'Collapsed'

export type DealGlance = {
    parties?: string
    value?: string
    advisers?: string
    status?: DealStatus
    keyLaw?: string
}

/**
 * Facts taken from the published post. A field is omitted when the post does not state it.
 * Status is only Pending, Completed or Collapsed, and only when the post uses that outcome.
 */
const DEALS: Record<string, DealGlance> = {
    "Apollo's Takeover of easyJet": {
        parties: 'easyJet and Apollo',
        value: '£5.7 billion',
        keyLaw: 'Regulation (EC) No 1008/2008, Rule 2.7 and a scheme of arrangement',
    },
    'Vodafone and Three Merger': {
        parties: 'Vodafone and CK Hutchison',
        status: 'Completed',
        keyLaw: 'behavioural commitments accepted by the CMA',
    },
    "Rio Tinto and Glencore's Failed Merger": {
        parties: 'Rio Tinto and Glencore',
        value: 'a combined value of more than $200 billion',
        status: 'Collapsed',
        keyLaw: 'a scheme of arrangement and Rule 2.8 of the Takeover Code',
    },
    "Santander's Acquisition of TSB": {
        parties: 'Santander UK, TSB and Sabadell',
        value: '£2.65 billion',
        status: 'Completed',
    },
    'Visa, Mastercard and Revolut v PSR': {
        parties: 'Mastercard, Visa, Revolut and the Payment Systems Regulator',
        keyLaw: 'judicial review',
    },
    'Ineos Investment in Manchester United': {
        parties: 'Sir Jim Ratcliffe and the Glazer family',
        value: '$33 per share for a 25% stake and a $300 million capital injection, around $1.65 billion',
        advisers:
            'Slaughter and May and Paul Weiss for Ratcliffe, Latham and Watkins for Manchester United and Rothschild for the Glazers',
        status: 'Completed',
        keyLaw: "a US tender offer and the Owners' and Directors' Tests",
    },
    "DMGT's Bid for the Telegraph": {
        parties: 'DMGT, the Telegraph Media Group, Axel Springer and RedBird IMI',
        value: 'Axel Springer paid £575 million. DMGT had agreed a deal worth around £500 million.',
        keyLaw: 'laws banning foreign state ownership of UK newspapers',
    },
    'Kent v Apple': {
        parties: 'Dr Rachael Kent and Apple',
        value: 'damages estimated at around £1.5 billion',
        keyLaw: 'the UK opt-out collective action regime',
    },
    "Aviva's Acquisition of Direct Line": {
        parties: 'Aviva and Direct Line',
        value: '£3.7 billion',
        status: 'Completed',
        keyLaw: 'a court-sanctioned scheme',
    },
    "DoorDash's Acquisition of Deliveroo": {
        parties: 'DoorDash and Deliveroo',
        value: '£2.9 billion',
        status: 'Completed',
        keyLaw: 'a scheme of arrangement under Part 26 of the Companies Act 2006',
    },
    "NatWest's Acquisition of Evelyn Partners": {
        parties: 'NatWest, Evelyn Partners, Permira and Warburg Pincus',
        value: '£2.7 billion',
        advisers: 'Slaughter and May for NatWest, Macfarlanes for Evelyn and Linklaters for the sellers',
    },
    "Virgin Atlantic's Heathrow Slot Financing": {
        parties: 'Virgin Atlantic and Apollo',
        value: '$745 million',
        status: 'Completed',
        keyLaw: 'private credit',
    },
    "PIF's Sale of Al-Hilal to Kingdom Holding": {
        parties: 'the Public Investment Fund and Kingdom Holding',
        value: 'SAR 840 million, around $224 million',
        advisers: 'AS&H Clifford Chance for PIF and Latham & Watkins for Kingdom Holding',
        status: 'Completed',
    },
    "Daniel Kretinsky's Takeover of Royal Mail": {
        parties: 'EP Group and International Distribution Services',
        value: '£3.6 billion',
        status: 'Completed',
        keyLaw: 'a golden share',
    },
    "The Friedkin Group's Takeover of Everton": {
        parties: 'the Friedkin Group and Farhad Moshiri',
        value: 'reported to be worth more than £400 million',
        status: 'Completed',
    },
    "BHP's Failed Bid for Anglo American": {
        parties: 'BHP and Anglo American',
        value: 'around $49 billion',
        keyLaw: 'Rule 2.8 of the Takeover Code',
    },
    "FIFA's Failed World Cup Stake Sale and the Fallout for Infantino": {
        parties: 'FIFA',
        value: 'a new company valued at around $20 billion',
    },
    'Bezos-Backed Consortium Buys into Liverpool': {
        parties: 'Fenway Sports Group and 1892 Holdings',
        value: 'a valuation of more than $7 billion',
    },
    "OpenAI's $122 Billion Funding Round": {
        parties: 'OpenAI, Amazon, Nvidia and SoftBank',
        value: 'the round closed at $122 billion',
    },
    "Paramount's Acquisition of Warner Bros. Discovery": {
        parties: 'Paramount, Skydance and Warner Bros. Discovery',
        value: '$110 billion, backed by $40 billion of equity and $55 billion of debt',
        keyLaw: 'a tender offer',
    },
    "Messi's Inter Miami Contract": {
        parties: 'Lionel Messi and Inter Miami',
    },
    'Why Messi Left Barcelona': {
        parties: 'Lionel Messi and Barcelona',
        keyLaw: "La Liga's squad cost limit",
    },
    'The Glazers, Manchester United and the Buccaneers': {
        parties: 'the Glazer family and Manchester United',
        value: 'around £790 million',
        keyLaw: 'a leveraged buyout',
    },
    'Merricks v Mastercard and the £200 Million Settlement': {
        parties: 'Walter Merricks and Mastercard',
        value: 'a £200 million settlement',
        keyLaw: 'the UK opt-out class action system',
    },
    'Manchester City and the 115 Charges': {
        parties: 'Manchester City and the Premier League',
    },
    'Booking.com and the Price Parity Claims': {
        parties: 'Booking.com, European hotels and UK consumers',
        value: 'UK damages estimated at over £2 billion',
        advisers: 'Mishcon de Reya and counsel from Blackstone Chambers',
        keyLaw: 'a UK opt-out collective claim',
    },
    "Thames Water's Debt Crisis": {
        parties: 'Thames Water and its lenders',
        value: 'around £18.5 billion of debt',
    },
    'Nintendo v Playables and the R4 Card': {
        parties: 'Nintendo, Playables Ltd and Wai Dat Chan',
        keyLaw: 'section 296ZD of the Copyright, Designs and Patents Act 1988',
    },
    "The Diarra Ruling and FIFA's Transfer Rules": {
        parties: 'Lassana Diarra and FIFA',
        keyLaw: 'EU rules on the free movement of workers',
    },
    'The US Google Search Case': {
        parties: 'the US Department of Justice and Google',
    },
    'Sony and the Ownership of Digital Games': {
        parties: 'Andrew Garcia, Edward Heycock, Jason Mendoza, Josh Salinas and Sony Interactive Entertainment',
        keyLaw: 'California AB 2426',
    },
    "The Motor Finance Ruling and the FCA's Redress Scheme": {
        parties: 'the FCA and motor finance lenders',
        value: 'around £7.5 billion expected to be paid out',
        keyLaw: 'the FCA motor finance redress scheme',
    },
    'Record Sales of the Celtics and the Lakers': {
        parties: "a group led by Bill Chisholm for the Boston Celtics, and Mark Walter for the Los Angeles Lakers",
        value: 'the Celtics at $6.1 billion and the Lakers at $10 billion',
    },
}

export function dealGlanceForTitle(title: string): DealGlance | null {
    return DEALS[title] ?? null
}

export function dealGlanceTitles(): string[] {
    return Object.keys(DEALS)
}
