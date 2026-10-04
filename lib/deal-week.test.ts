import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { dealWeekRows, previewDealOfTheWeek, selectDealOfTheWeek, type DealWeekSource } from './deal-week'
import { dealGlanceForTitle } from './deal-glance'

function source(partial: Pick<DealWeekSource, 'id' | 'title' | 'slug' | 'publishedAt'> & Partial<DealWeekSource>): DealWeekSource {
    return {
        excerpt: null,
        shortPreview: null,
        createdAt: partial.publishedAt ?? '2026-01-01T00:00:00.000Z',
        ...partial,
    }
}

describe('deal of the week', () => {
    it('shows Value, Status and Key law only when those facts exist', () => {
        const ineos = dealGlanceForTitle('Ineos Investment in Manchester United')
        assert.ok(ineos)
        assert.deepEqual(
            dealWeekRows(ineos).map((row) => row.label),
            ['Value', 'Status', 'Key law']
        )
        assert.equal(dealWeekRows(ineos).some((row) => row.label === 'Value' && row.value.includes('$33')), true)

        const messi = dealGlanceForTitle("Messi's Inter Miami Contract")
        assert.ok(messi)
        assert.deepEqual(dealWeekRows(messi), [])
    })

    it('picks the newest post that already has deal facts', () => {
        const chosen = selectDealOfTheWeek([
            source({
                id: 'general',
                title: 'AI in Law Firms',
                slug: 'ai-in-law-firms',
                publishedAt: '2026-10-02T00:00:00.000Z',
            }),
            source({
                id: 'parties-only',
                title: "Messi's Inter Miami Contract",
                slug: 'messi-inter-miami',
                publishedAt: '2026-10-01T00:00:00.000Z',
            }),
            source({
                id: 'santander',
                title: "Santander's Acquisition of TSB",
                slug: 'santander-tsb',
                publishedAt: '2026-09-01T00:00:00.000Z',
                shortPreview: 'Santander bought TSB.',
            }),
            source({
                id: 'ineos',
                title: 'Ineos Investment in Manchester United',
                slug: 'ineos-united',
                publishedAt: '2026-08-01T00:00:00.000Z',
            }),
        ])

        assert.equal(chosen?.title, "Santander's Acquisition of TSB")
        assert.equal(chosen?.href, '/blog/santander-tsb')
        assert.equal(chosen?.summary, 'Santander bought TSB.')
        assert.deepEqual(chosen?.rows.map((row) => row.label), ['Value', 'Status'])
        assert.equal(chosen?.sample, false)
    })

    it('builds a local preview from facts already in the repo', () => {
        const preview = previewDealOfTheWeek()
        assert.equal(preview.sample, true)
        assert.equal(preview.title, "Rio Tinto and Glencore's Failed Merger")
        assert.deepEqual(preview.rows.map((row) => row.label), ['Value', 'Status', 'Key law'])
        assert.match(preview.summary ?? '', /deadline/)
        assert.equal(preview.summary?.includes('—'), false)
    })
})
