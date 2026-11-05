# Public APIs for drafting

Drafting reference only. This note is not a page on the site, nothing in the app imports it, and it must not be moved into `app/` or `public/`.

Source list: [public-apis/public-apis](https://github.com/public-apis/public-apis).

Shortlist for posts on UK sports deals, mergers and acquisitions, banking and finance, and competition. Use an API to find a number, a filing, a fixture or a company record, then check the primary source (the filing, the judgment, or [legislation.gov.uk](https://www.legislation.gov.uk)) before it goes into a post.

Odds feeds, highlight videos, fantasy stats, and the duplicate news and foreign-exchange APIs on the source list are left out.

Auth is what a read needs: **none**, **key**, or **OAuth**. Where that differs from the Auth column on the source list, it is called out under the table.

## Sport deals

| API | Returns | Auth | Use on a post |
| --- | --- | --- | --- |
| [Football-Data.org](https://www.football-data.org) | Fixtures, results and league tables. The free tier includes the Premier League and the Championship. | key | The fixture, result or table position named in a club-sale post. |

## Mergers and acquisitions

| API | Returns | Auth | Use on a post |
| --- | --- | --- | --- |
| [UK Companies House](https://developer.company-information.service.gov.uk/) | Company profile, officers, persons with significant control, filing history and charges. | key | The company number, latest accounts and persons with significant control for the bid vehicle. |
| [The Gazette](https://www.thegazette.co.uk/data) | Official notices, including insolvency, striking off, capital changes, and takeovers and transfers. | none | The notice of a share allotment, striking-off or insolvency for a party to the deal. |
| [OpenCorporates](https://api.opencorporates.com/documentation/API-Reference) | Company and officer records from many national registers. | key | Whether a director of the UK buyer also appears on a company overseas. |
| [SEC EDGAR](https://www.sec.gov/edgar/sec-api-documentation) | Filing history and extracted accounts for US public companies. | none | The 8-K or 6-K a US-listed buyer filed on the day it agreed to buy a UK business. |
| [Alpha Vantage](https://www.alphavantage.co/) | Current and historical share prices. | key | The bidder's closing price on the announcement date. |
| [OpenSanctions](https://www.opensanctions.org/docs/api/) | Sanctions, crime and politically exposed person records. | key | Whether a named buyer or director is on a sanctions or PEP list before the ownership section is written. |

## Banking and finance

| API | Returns | Auth | Use on a post |
| --- | --- | --- | --- |
| [Frankfurter](https://www.frankfurter.app/docs) | Daily exchange rates, including historical European Central Bank rates. | none | The sterling value of a euro or dollar headline price on the announcement date. |
| [Finance Clearly Tax Rates](https://financeclearly.com/tax-rates-api/) | Current UK and US tax rates, allowances and thresholds, including corporation tax and stamp duty. | none | The main corporation tax rate, or the stamp duty band, when the post describes how the deal is taxed. Check the figure on GOV.UK. |
| [FRED](https://fred.stlouisfed.org/docs/api/fred/) | Economic series from the Federal Reserve Bank of St. Louis, including UK inflation and government-bond yields. | key | A UK CPI or gilt-yield figure as the macro number in a banking post. |

## Competition and regulation

| API | Returns | Auth | Use on a post |
| --- | --- | --- | --- |
| [Bidledger](https://jaydemks.github.io/bidledger/api.html) | Open EU public tenders, rebuilt daily from the Official Journal, with a link to the TED notice. | none | The TED notice id and the buyer when a post is about a public contract or a complaint over a tender. |
| [Ayes and Noes](https://ayesandnoes.co.uk/developers) | Commons MPs, parties and division results. | none | The aye and no totals on a division about a football-governance or finance bill. |
| [UK Legislation Changes](https://uk-legal-changes.pages.dev/docs) | Amendment history for a limited set of UK provisions, taken from legislation.gov.uk. | none | The date a tracked provision last changed, before the post cites the current text. It does not cover the whole statute book. |
| [The Guardian](https://open-platform.theguardian.com/) | Guardian articles by tag and section. | key | The dated Guardian report of a CMA decision or a takeover, for the source list next to the primary document. |

## Auth, where the source list disagrees

- Companies House is listed as OAuth. Reading a public company record needs a key. OAuth is for filing on someone's behalf.
- The Gazette is listed as OAuth. Reading a published notice needs no auth. OAuth is for placing a notice.
- OpenSanctions is listed as no auth. The API now requires a key. A free key is available for journalism and research.
- SEC EDGAR needs no key. Requests should send a User-Agent that names the caller.
- Ayes and Noes needs no key for light use. A free key only lifts the daily cap.
