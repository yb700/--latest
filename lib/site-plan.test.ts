import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { BLOG_CATEGORY_PRESENTATION, sectionSlugForTitle } from './blog-categories'
import { dealGlanceForTitle, dealGlanceTitles } from './deal-glance'
import { GLOSSARY, linkGlossaryTerms } from './glossary'
import { interviewNoteForTitle, interviewNoteTitles } from './interview-notes'
import { splitPostContent } from './post-content'
import { titleAndExcerptFilter } from './post-search'
import { sourceUrlForTitle } from './source-urls'

const KENT = `On 23 October, the Competition Appeal Tribunal ruled that Apple had abused its dominant position.

Hausfeld, 'CAT rules unanimously in favour of Dr Kent against Apple's App Store' (October 2025)
LexisNexis, 'CAT finds Apple abused dominance: first UK collective proceedings win' (October 2025)

---

*This post is general information only and is not legal advice.*`

describe('post sources', () => {
    it('splits citations from the body and keeps an apostrophe inside the title', () => {
        const split = splitPostContent(KENT)
        assert.equal(split.sources.length, 2)
        assert.equal(split.sources[0].title, "CAT rules unanimously in favour of Dr Kent against Apple's App Store")
        assert.equal(split.sources[0].date, 'October 2025')
        assert.equal(split.sources[1].publisher, 'LexisNexis')
        assert.match(split.body, /Competition Appeal Tribunal/)
        assert.equal(split.body.includes('Hausfeld'), false)
        assert.equal(split.disclaimer, 'This post is general information only and is not legal advice.')
    })

    it('links a source title only when the article was found', () => {
        assert.ok(sourceUrlForTitle("CAT rules unanimously in favour of Dr Kent against Apple's App Store"))
        assert.ok(sourceUrlForTitle('CAT finds Apple abused dominance: first UK collective proceedings win'))
        assert.ok(sourceUrlForTitle('High Court Backs UK Watchdog in £200m Visa and Mastercard Fee Battle'))
        assert.ok(sourceUrlForTitle('Nintendo Company Ltd & Anor v Playables Ltd & Anor [2010] EWHC 1932 (Ch)'))
        assert.equal(sourceUrlForTitle('High Court confirms PSR power to cap card fees'), null)
        assert.ok(sourceUrlForTitle('Warner Bros shareholders back $110bn merger with Paramount Skydance'))
    })

    it('drops an access date and keeps the publication date', () => {
        const split = splitPostContent(
            "Publisher, 'Some article' (October 2025) (accessed 4 October 2026)\n\nPublisher, 'Another article' (May 2024, accessed 1 June 2024)"
        )
        assert.equal(split.sources[0].date, 'October 2025')
        assert.equal(split.sources[1].date, 'May 2024')
        assert.equal(split.sources[0].raw.includes('accessed'), true)
    })
})

describe('deal at a glance', () => {
    it('leaves general posts without a box', () => {
        assert.equal(dealGlanceForTitle('AI in Law Firms'), null)
        assert.equal(dealGlanceForTitle('The Independent Football Regulator'), null)
        assert.equal(dealGlanceForTitle('Private Equity Enters the NFL'), null)
        assert.equal(dealGlanceForTitle("Saudi Arabia's Move into Tennis and Football"), null)
    })

    it('uses only the allowed status words', () => {
        for (const title of dealGlanceTitles()) {
            const status = dealGlanceForTitle(title)?.status
            if (status) assert.ok(['Pending', 'Completed', 'Collapsed'].includes(status))
        }
        assert.equal(dealGlanceForTitle("Rio Tinto and Glencore's Failed Merger")?.status, 'Collapsed')
        assert.equal(dealGlanceForTitle("Apollo's Takeover of easyJet")?.status, undefined)
    })
})

describe('interview notes', () => {
    it('covers the ten posts and uses the live Ineos title', () => {
        assert.equal(interviewNoteTitles().length, 10)
        assert.ok(interviewNoteForTitle('Ineos Investment in Manchester United'))
        assert.equal(interviewNoteForTitle('INEOS Investment in Manchester United'), null)
        assert.equal(interviewNoteForTitle('Liverpool'), null)
        assert.match(
            interviewNoteForTitle('Kent v Apple')?.whyItMatters ?? '',
            /world's largest companies/
        )
    })
})

describe('glossary links', () => {
    it('links the first mention of a term and leaves later mentions alone', () => {
        const linked = linkGlossaryTerms(
            'The deal uses a scheme of arrangement. A later scheme of arrangement stays plain. Behavioural commitments stay plain.'
        )
        assert.equal(linked.split('/glossary#scheme-of-arrangement').length - 1, 1)
        assert.match(linked, /Behavioural commitments/)
        assert.equal(linked.includes('/glossary#behavioural-remedy'), false)
    })

    it('links the owners and directors wording used in the posts', () => {
        const linked = linkGlossaryTerms("The Premier League keeps its own Owners' and Directors' Test.")
        assert.match(linked, /\/glossary#owners-and-directors-test/)
    })

    it('links a term once across the summary and the body', () => {
        const linked = new Set<string>()
        const summary = linkGlossaryTerms('The deal uses a scheme of arrangement.', linked)
        const body = linkGlossaryTerms('A later scheme of arrangement stays plain.', linked)
        assert.match(summary, /\/glossary#scheme-of-arrangement/)
        assert.equal(body.includes('/glossary'), false)
    })

    it('starts with the ten planned terms', () => {
        assert.deepEqual(
            GLOSSARY.map((entry) => entry.term),
            [
                'scheme of arrangement',
                'earn-out',
                'leveraged buyout',
                'Rule 2.8',
                'behavioural remedy',
                'tender offer',
                'judicial review',
                'private credit',
                'minority stake',
                'owners and directors test',
            ]
        )
    })
})

describe('section labels', () => {
    it('uses Sport and never Sports', () => {
        assert.equal(BLOG_CATEGORY_PRESENTATION['sports-deals-and-regulation'].label, 'Sport')
        assert.equal(BLOG_CATEGORY_PRESENTATION['sports-deals-and-regulation'].fullName, 'Sport Deals and Regulation')
        assert.equal(sectionSlugForTitle('Vodafone and Three Merger'), 'competition-and-regulation')
        assert.equal(sectionSlugForTitle('AI in Law Firms'), 'competition-and-regulation')
        assert.equal(sectionSlugForTitle("Apollo's Takeover of easyJet"), null)
    })
})

describe('search', () => {
    it('searches titles and excerpts and not the full post', () => {
        const filter = titleAndExcerptFilter('easyJet')
        assert.equal(filter, 'title.ilike.%easyJet%,excerpt.ilike.%easyJet%')
        assert.equal(filter?.includes('content'), false)
    })
})
