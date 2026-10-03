/** Citation titles whose real article was found. Anything else stays plain text. */
const SOURCE_URLS: Record<string, string> = {
    'acquisition of easyjet updates':
        'https://www.easyjet.com/en/news/airline/article/acquisition-of-easyjet-updates',
    'santander to acquire tsb from sabadell for £2.65 billion':
        'https://www.santander.com/en/press-room/press-releases/2025/07/santander-to-acquire-tsb-from-sabadell-for-2-65-billion',
    'santander uk completes cash acquisition of tsb banking':
        'https://www.santander.co.uk/about-santander/media-centre/press-releases/santander-uk-completes-cash-acquisition-of-tsb-banking',
    'fca confirms motor finance redress scheme':
        'https://www.fca.org.uk/news/statements/fca-confirms-motor-finance-redress-scheme',
    "manchester united plc and trawlers ltd announce the successful completion of sir jim ratcliffe's minority investment":
        'https://www.businesswire.com/news/home/20240220946628/en',
    "cat rules unanimously in favour of dr kent against apple's app store":
        'https://www.hausfeld.com/news/cat-rules-unanimously-in-favour-of-dr-kent-against-apple-s-app-store-and-consumers-and-businesses-are-owed-approx-15-billion',
    'apple loses landmark uk lawsuit over app store commissions':
        'https://www.aljazeera.com/economy/2025/10/23/apple-loses-landmark-uk-lawsuit-over-app-store-commissions',
    'vodafone / ck hutchison jv merger inquiry':
        'https://www.gov.uk/cma-cases/vodafone-slash-ck-hutchison-jv-merger-inquiry',
    'mastercard, visa and revolut v payment systems regulator [2026] ewhc 64 (admin)':
        'https://www.judiciary.uk/judgments/mastercard-visa-and-revolut-v-payment-systems-regulator/',
    'nintendo v playables: piracy and ds home-brewing':
        'https://www.scl.org/1889-nintendo-v-playables-piracy-and-ds-home-brewing/',
    'apollo and virgin atlantic complete $745m asset-backed financing solution':
        'https://www.apollo.com/insights-news/pressreleases/2025/11/apollo-and-virgin-atlantic-complete-745m-asset-backed-financing-solution',
    'pif and kingdom holding company (khc) sign agreement for khc to acquire 70% of al-hilal club company':
        'https://www.pif.gov.sa/en/news-and-insights/press-releases/2026/pif-and-kingdom-holding-company-khc-sign-agreement-for-khc-to-acquire-70-of-al-hilal-club-company/',
    'vodafone-three merger: what you need to know':
        'https://www.which.co.uk/news/article/vodafone-three-merger-what-you-need-to-know-akikb9q10IRI',
    'vodafone/three merger approved with behavioural commitments':
        'https://www.cliffordchance.com/briefings/2025/03/vodafone-three-merger-approved-with-behavioural-commitments.html',
    'lawyers escape contempt proceedings over fake case citations':
        'https://www.lawgazette.co.uk/news/lawyers-escape-contempt-proceedings-over-fake-case-citations/5123511.article',
    'court issues stark warning to lawyers over ai-generated fake cases':
        'https://www.legalfutures.co.uk/latest-news/court-issues-stark-warning-to-lawyers-over-ai-generated-fake-cases',
}

export function normalizeSourceTitle(title: string): string {
    return title
        .toLowerCase()
        .replace(/[\u2018\u2019]/g, "'")
        .replace(/\s+/g, ' ')
        .trim()
}

export function sourceUrlForTitle(title: string): string | null {
    return SOURCE_URLS[normalizeSourceTitle(title)] ?? null
}
