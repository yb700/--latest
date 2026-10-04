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
    'legal tech valuations surge in 2026 because of ai':
        'https://broadbandbreakfast.com/legal-tech-valuations-surge-in-2026-because-of-ai/',
    'easyjet agrees $7.7 billion takeover by apollo as castlelake walks away':
        'https://cyprus-mail.com/2026/08/06/easyjet-agrees-7-7-billion-takeover-by-apollo-as-castlelake-walks-away',
    "us firm can't fully own european airline":
        'https://www.insideflyer.com/posts/us-firm-cant-fully-own-european-airline/',
    "cma approves aviva's takeover of dlg as court sanctions scheme":
        'https://www.insurancetimes.co.uk/news/cma-approves-avivas-takeover-of-dlg-as-court-sanctions-scheme/1455674.article',
    'aviva, direct line compete in fragmented uk markets, cma says':
        'https://www.mlex.com/mlex/articles/2374490/aviva-direct-line-compete-in-fragmented-uk-markets-cma-says',
    'banco santander now 3rd largest uk deposit taker as completes tsb buy':
        'https://www.ajbell.co.uk/news/articles/banco-santander-now-3rd-largest-uk-deposit-taker-completes-tsb-buy',
    'bezos, bhatia, saverin buy liverpool stake at $7 billion valuation':
        'https://www.sportico.com/business/team-sales/2026/jeff-bezos-liverpool-stake-bhatia-saverin-1234941903/',
    'liverpool owners sell stake to jeff bezos-backed consortium':
        'https://www.espn.com/soccer/story/_/id/49610494/liverpool-owners-fsg-sell-stake-consortium-jeff-bezos-amit-bhatia',
    'liverpool: key questions answered as amit bhatia, jeff bezos and eduardo saverin agree purchase of strategic minority stake':
        'https://www.skysports.com/football/news/13566630/liverpool-key-questions-answered-as-jeff-bezos-and-amit-bhatia-close-in-on-purchasing-strategic-minority-stake',
    'statement regarding proposal for anglo american plc':
        'https://announcements.asx.com.au/asxpdf/20240530/pdf/06425mlrptx66p.pdf',
    'bhp gives up on anglo american deal after rejections':
        'https://african.business/2024/05/resources/bhp-gives-up-on-anglo-american-deal-after-rejections',
    'bhp drops anglo american takeover bid as shareholder support ebbs':
        'https://www.euronews.com/2024/05/30/bhp-drops-anglo-american-takeover-bid-as-shareholder-support-ebbs',
    'over 10,000 european hotels now part of landmark collective action against booking.com':
        'https://www.hotrec.eu/en/news_over-10-000-european-hotels-now-part-of-landmark-collective-action-against-booking-com.html',
    'more than 10,000 european hotels seek billions in claims against booking.com':
        'https://travelweekly.co.uk/news/more-than-10000-european-hotels-seek-billions-in-claims-against-bookingcom',
    'consumer champion instructs mishcon de reya to bring class action against booking.com on behalf of millions of uk consumers':
        'https://www.mishcon.com/news/consumer-champion-instructs-mishcon-de-reya-to-bring-class-action-against-bookingcom-on-behalf-of-millions-of-uk-consumers',
    "billionaire kretinsky's royal mail takeover bid gets uk stamp of approval":
        'https://www.euronews.com/business/2024/12/16/billionaire-kretinskys-royal-mail-takeover-bid-gets-uk-stamp-of-approval',
    "kretinsky's ep group agrees to terms with uk government over royal mail deal":
        'https://www.rte.ie/news/business/2024/1216/1486687-uk-approves-kretinskys-bid-for-royal-mail-parent-ft/',
    'czech billionaire daniel kretinsky takes charge of royal mail after £3.6b takeover':
        'https://www.malaymail.com/news/money/2025/06/27/czech-billionaire-daniel-kretinsky-takes-charge-of-royal-mail-after-36b-takeover/181947',
    'axel springer ousts dmgt with deal to buy telegraph for £575m':
        'https://pressgazette.co.uk/news/axel-springer-ousts-dmgt-with-deal-to-buy-telegraph-for-575m/',
    'uk approves takeover of telegraph newspaper by german publishing giant axel springer':
        'https://www.euronews.com/my-europe/2026/04/14/uk-approves-takeover-of-telegraph-newspaper-by-german-publishing-giant-axel-springer',
    'government approval for £575m telegraph takeover':
        'https://www.insidermedia.com/news/national/government-approval-for-575m-telegraph-takeover',
    'scheme becomes effective':
        'https://www.investegate.co.uk/announcement/rns/deliveroo-class-a--roo/scheme-becomes-effective/9145893',
    'deliveroo reaches agreement on £2.9bn doordash takeover':
        'https://www.cityam.com/deliveroo-reaches-agreement-on-2-9bn-doordash-takeover/',
    'doordash completes £2.9bn deliveroo takeover in uk expansion':
        'https://www.newfoodmagazine.com/doordash-completes-29bn-deliveroo-takeover-in-uk-expansion/846031.article',
    'infantino scraps fifa world cup sell-off plan after backlash':
        'https://www.espn.com/soccer/story/_/id/49500782/fifa-world-cup-investment-private-gianni-infantino',
    'uefa declares loss of confidence in fifa president infantino':
        'https://www.kingfut.com/2026/08/01/uefa-declares-loss-of-confidence-in-fifa-president-infantino/',
    "fifa's infantino under threat of no-confidence vote by regional bodies":
        'https://www.aljazeera.com/sports/2026/8/20/fifas-infantino-under-threat-of-no-confidence-vote-by-regional-bodies',
    'manchester united: qatari businessman sheikh jassim withdraws from process to buy club':
        'https://www.skysports.com/football/news/11095/12984553/manchester-united-qatari-businessman-sheikh-jassim-withdrawing-from-process-to-buy-club',
    "application of the new premier league owners' and directors' test":
        'https://www.nortonrosefulbright.com/en-gb/knowledge/publications/751ff735/application-of-the-new-premier-league-owners-and-directors-test',
    'cat finds apple abused dominance: first uk collective proceedings win':
        'https://www.lexisnexis.com/en-gb/legal/news/uk-class-action-regime-comes-of-age-with-apple-ruling',
    'man city guilty of almost all of the 115 financial charges, premier league says':
        'https://www.nbcnews.com/sports/soccer/man-city-guilty-almost-115-financial-charges-premier-league-says-rcna600523',
    'premier league commission finds manchester city guilty on 114 charges: club vows to be relentless and appeal':
        'https://www.cbssports.com/soccer/news/manchester-city-premier-league-commission-guilty-114-charges/',
    "man city's premier league charges: what's the latest and what comes next?":
        'https://www.aljazeera.com/sports/2026/9/29/man-citys-premier-league-charges-whats-the-latest-and-what-comes-next',
    'manchester city 115 charges verdict expected this month with senior figures bracing themselves':
        'https://www.goal.com/en-gb/lists/manchester-city-115-charges-verdict-expected-this-month-senior-figures-bracing-themselves/bltdf271d8367a8ec78',
    'merricks v mastercard (settlement approval decision)':
        'https://www.slaughterandmay.com/insights/new-insights/merricks-v-mastercard-settlement-approval-decision/',
    'tribunal approves landmark £200m mastercard settlement':
        'https://www.legalfutures.co.uk/latest-news/tribunal-approves-landmark-200m-mastercard-settlement',
    'cat approves £200m mastercard settlement amid bitter funding dispute':
        'https://www.globallegalpost.com/news/cat-approves-ps200m-mastercard-settlement-amid-bitter-funding-dispute-488724585',
    "breaking down lionel messi's inter miami contract":
        'https://www.fastcompany.com/91030230/breaking-down-lionel-messi-inter-miami-contract',
    'nintendo v playables [2010] ewhc 1932 (ch)':
        'https://8newsquare.co.uk/case/nintendo-v-playables-2010-ewhc-1932-ch/',
    'proposed acquisition of warner bros. discovery by paramount skydance':
        'https://en.wikipedia.org/wiki/Proposed_acquisition_of_Warner_Bros._Discovery_by_Paramount_Skydance',
    'warner bros shareholders back $110bn merger with paramount skydance':
        'https://www.reuters.com/legal/transactional/warner-bros-shareholders-back-110-billion-merger-with-paramount-skydance-2026-04-23/',
    "natwest acquires uk's evelyn partners in £2.7 billion deal":
        'https://www.wealthbriefing.com/html/article.php/natwest-acquires-uk%27s-evelyn-partners-in-2.7-billion-deal',
    "trio of city firms guide natwest's £2.7bn evelyn partners acquisition":
        'https://www.globallegalpost.com/news/trio-of-city-firms-guide-natwests-ps27bn-evelyn-partners-acquisition-773478388',
    'natwest enters £2.7bn deal to acquire evelyn partners':
        'https://www.privatebankerinternational.com/news/natwest-acquire-evelyn-partners/',
    'as&h clifford chance and latham advise as saudi pif sells majority stake in al-hilal sfc for sar 840 million':
        'https://www.law-middleeast.com/deals/ash-clifford-chance-and-latham-advise-as-saudi-pif-sells-majority-stake-in-al-hilal-sfc-for-sar-840-million',
    'pif sells $224m stake in al-hilal to kingdom holding':
        'https://www.insideworldfootball.com/2026/09/02/pif-sells-224m-stake-in-al-hilal-to-kingdom-holding/',
    'private equity enters nfl ownership: league approves historic investment':
        'https://frontofficesports.com/newsletter/nfl-opens-doors-to-private-equity/',
    'nfl cautiously votes through private equity involvement from approved firms':
        'https://www.sportcal.com/news/nfl-cautiously-votes-through-private-equity-involvement-from-approved-firms/',
    'nba approves sale of boston celtics to bill chisholm for record $6.1 billion':
        'https://www.cbsnews.com/boston/news/nba-approves-sale-boston-celtics-bill-chisholm/',
    'nba approves sale of boston celtics to a bill chisholm-led investment group':
        'https://www.wionews.com/sports/nba-approves-sale-of-boston-celtics-to-a-bill-chisholm-led-investment-group-1755140436932',
    'rio tinto, glencore scrap mining mega-merger':
        'https://www.mining.com/rio-tinto-glencore-scrap-260b-mining-mega-merger/',
    'rio walks away from glencore mega merger on price impasse':
        'https://www.bloomberg.com/news/articles/2026-02-05/rio-tinto-glencore-said-to-abandon-merger-talks-over-price',
    'statement regarding glencore plc':
        'https://www.riotinto.com/en/news/releases/2026/statement-regarding-glencore-plc-glencore',
    'pif and atp announce multi-year strategic partnership to accelerate the growth of global tennis':
        'https://www.prnewswire.com/news-releases/pif-and-atp-announce-multi-year-strategic-partnership-to-accelerate-the-growth-of-global-tennis-302074257.html',
    "saudi arabia's pif becomes first naming rights partner for wta rankings in multiyear deal":
        'https://www.tennis.com/news/articles/saudi-arabia-pif-becomes-first-naming-rights-partner-wta-rankings-multiyear-deal',
    "saudi investment fund pif buys into men's tennis in strategic deal with atp":
        'https://www.al-monitor.com/originals/2024/02/saudi-investment-fund-pif-buys-mens-tennis-strategic-deal-atp',
    'virgin atlantic uses heathrow slots as collateral for $745m apollo loan':
        'https://www.cityam.com/virgin-atlantic-uses-heathrow-slots-as-collateral-for-745m-apollo-loan/',
    'virgin atlantic borrows $745m against heathrow slots to upgrade fleet':
        'https://travellingforbusiness.co.uk/news/virgin-atlantic-borrows-745m-heathrow-slots-upgrade-fleet/',
    'openai raises $110bn from softbank, nvidia, amazon':
        'https://www.sharecast.com/news/international-companies/openai-raises-110bn-from-softbank-nvidia-amazon--21873720.html',
    'openai closes $122bn funding round at $852bn valuation':
        'https://www.verdict.co.uk/openai-122bn-funding-round/',
    'openai nears $100bn funding milestone in record-breaking round':
        'https://www.storyboard18.com/digital/openai-nears-100bn-funding-milestone-in-record-breaking-round-90076.htm',
    'sony argues reasonable consumers would not be misled into believing they own digital games in class action motion':
        'https://www.tomshardware.com/video-games/console-gaming/playstation-store-buy-button-class-action-may-never-reach-a-courtroom',
    "once a champion for physical media, sony is now telling playstation customers they don't actually own the digital video games they paid $70 for":
        'https://fortune.com/2026/09/01/sony-playstation-dont-actually-own-digital-games-grand-theft-auto-analog-media-gen-z/',
    "sony says reasonable consumers know they don't own the digital games they buy":
        'https://www.videogameschronicle.com/news/sony-says-reasonable-consumers-know-they-dont-own-the-digital-games-they-buy/',
    "uk's thames water awaits latest court ruling in survival battle":
        'https://www.reuters.com/world/uk/uks-thames-water-awaits-latest-court-ruling-survival-battle-2025-03-17/',
    'thames water considers creditor-led recapitalisation proposal':
        'https://insolvency-insider.co.uk/p/thames-water-considers-creditor-led-recapitalisation-proposal',
    'london & valley water offers uk government golden share in revised thames water rescue proposal':
        'https://www.watermagazine.co.uk/2026/07/21/london-valley-water-offers-uk-government-golden-share-in-revised-thames-water-rescue-proposal/',
    "ecj decision in the diarra case: some of fifa's players transfer rules are incompatible with eu law":
        'https://www.whitecase.com/insight-alert/ecj-decision-diarra-case-some-fifas-players-transfer-rules-are-incompatible-eu-law',
    "european union: court of justice invalidates parts of fifa's soccer transfer system":
        'https://www.loc.gov/item/global-legal-monitor/2024-10-29/european-union-court-of-justice-invalidates-parts-of-fifas-soccer-transfer-system/',
    'diarra v. fifa: cjeu strengthens freedom of movement of football players in eu':
        'https://www.schoenherr.eu/content/diarra-v-fifa-cjeu-strengthens-freedom-of-movement-of-football-players-in-eu',
    'friedkin group completes everton takeover, becomes 10th english top-flight club under american ownership':
        'https://www.malaymail.com/news/sports/2024/12/20/friedkin-group-completes-everton-takeover-becomes-10th-english-top-flight-club-under-american-ownership/160519',
    'everton enter exclusive takeover talks with friedkin group':
        'https://www.espn.com/soccer/story/_/id/40400389/everton-enter-exclusive-takeover-talks-friedkin-group',
    'laporta: i hoped messi would offer to play for free':
        'https://www.malaymail.com/news/sports/2021/10/08/laporta-i-hoped-messi-would-offer-to-play-for-free/2011829',
    "football club owners take heed: inside the ifr's new owners, directors and senior executives test":
        'https://www.lewissilkin.com/insights/2026/02/03/football-club-owners-take-heed-inside-the-ifrs-new-owners-directors-and-senior-102mffg',
    'the uk football governance act 2025: key changes for owners and investors':
        'https://www.dechert.com/knowledge/onpoint/2026/4/the-uk-football-governance-act-2025--key-changes-for-owners-and-.html',
    'football clubs concerned as efl set to axe its rogue owners test':
        'https://www.cityam.com/football-clubs-concerned-as-efl-set-to-axe-its-rogue-owners-test/',
    "motor finance: uk supreme court allows lenders' appeal in large part":
        'https://www.kirkland.com/publications/kirkland-alert/2025/08/motor-finance-uk-supreme-court-allows-lenders-appeal-in-large-part',
    'fca publishes motor finance redress scheme policy statement':
        'https://www.slaughterandmay.com/insights/new-insights/fca-publishes-motor-finance-redress-scheme-policy-statement/',
    'in a major antitrust ruling, a judge lets google keep chrome but levies other penalties':
        'https://www.npr.org/2025/09/02/nx-s1-5478625/google-chrome-doj-antitrust-ruling',
    'federal court orders remedies in google antitrust case, rejects doj call for breakup':
        'https://www.dlapiper.com/en-us/insights/publications/2025/09/federal-court-orders-remedies-in-google-antitrust-case',
    'high court backs uk watchdog in £200m visa and mastercard fee battle':
        'https://www.lawyer-monthly.com/2026/01/high-court-psr-visa-mastercard-interchange-fee-ruling/',
    'nintendo company ltd & anor v playables ltd & anor [2010] ewhc 1932 (ch)':
        'https://caselaw.nationalarchives.gov.uk/ewhc/ch/2010/1932',
    'google avoids breakup, but has to give up exclusive search deals in antitrust trial':
        'https://techcrunch.com/2025/09/02/google-avoids-breakup-but-has-to-give-up-exclusive-search-deals-in-antitrust-trial/',
    'lionel messi shocked and surprised at barcelona contract collapse':
        'https://www.skysports.com/football/news/11833/12374082/lionel-messi-shocked-and-surprised-at-barcelona-contract-collapse',
    "messi split from barcelona reveals laliga's pay limits":
        'https://www.sportico.com/leagues/soccer/2021/messi-split-from-barcelona-1234636446/',
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
