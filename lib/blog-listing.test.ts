import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
    cardPreview,
    comparePostsNewestFirst,
    formatBlogCardDate,
    formatBlogCardMeta,
    readingMinutes,
    resolveFeaturedPostId,
    selectRotatedPost,
    ukDayNumber,
} from './blog-listing'

function posts(count: number) {
    return Array.from({ length: count }, (_, index) => ({ id: `p${index}` }))
}

describe('reading time', () => {
    it('rounds up at 200 words a minute', () => {
        assert.equal(readingMinutes(0), 1)
        assert.equal(readingMinutes(1), 1)
        assert.equal(readingMinutes(200), 1)
        assert.equal(readingMinutes(201), 2)
        assert.equal(readingMinutes(400), 2)
    })
})

describe('UK day number', () => {
    it('changes at midnight in London during British Summer Time', () => {
        const before = ukDayNumber(new Date('2026-10-01T22:30:00.000Z'))
        const after = ukDayNumber(new Date('2026-10-01T23:30:00.000Z'))
        assert.equal(after - before, 1)
    })

    it('changes at midnight in London during Greenwich Mean Time', () => {
        const before = ukDayNumber(new Date('2026-11-01T23:30:00.000Z'))
        const after = ukDayNumber(new Date('2026-11-02T00:30:00.000Z'))
        assert.equal(after - before, 1)
    })
})

describe('daily rotation', () => {
    it('starts at the newest post and wraps', () => {
        const list = posts(4)
        assert.equal(selectRotatedPost(list, 0)?.id, 'p0')
        assert.equal(selectRotatedPost(list, 3)?.id, 'p3')
        assert.equal(selectRotatedPost(list, 4)?.id, 'p0')
    })

    it('does not repeat the same post on consecutive days', () => {
        for (const count of [2, 3, 27]) {
            const list = posts(count)
            for (let day = 10_000; day < 10_400; day += 1) {
                const today = selectRotatedPost(list, day)
                const tomorrow = selectRotatedPost(list, day + 1)
                assert.notEqual(today?.id, tomorrow?.id)
            }
        }
    })

    it('keeps the only published post when there is no alternative', () => {
        const list = posts(1)
        assert.equal(selectRotatedPost(list, 5)?.id, 'p0')
        assert.equal(selectRotatedPost(list, 6)?.id, 'p0')
    })

    it('lets a pin override the rotation and ignores an unknown pin', () => {
        const list = posts(5)
        assert.equal(resolveFeaturedPostId(list, 1, 'p4'), 'p4')
        assert.equal(resolveFeaturedPostId(list, 1, 'missing'), selectRotatedPost(list, 1)?.id)
        assert.equal(resolveFeaturedPostId(list, 1, null), selectRotatedPost(list, 1)?.id)
    })
})

describe('card text', () => {
    it('formats the date and read time like the spec example', () => {
        assert.equal(formatBlogCardDate('2026-09-15T12:00:00.000Z'), '15 Sep 2026')
        assert.equal(formatBlogCardMeta('2026-09-15T12:00:00.000Z', 3), '15 Sep 2026 · 3 min read')
    })

    it('uses the UK day when UTC is still the previous month', () => {
        assert.equal(formatBlogCardDate('2026-03-31T23:30:00.000Z'), '1 Apr 2026')
    })

    it('prefers the short preview and otherwise keeps the description for a two-line fallback', () => {
        assert.deepEqual(cardPreview({ shortPreview: 'One sentence.', excerpt: 'Full description.' }), {
            text: 'One sentence.',
            limitToTwoLines: false,
        })
        assert.deepEqual(cardPreview({ shortPreview: null, excerpt: 'Full description.' }), {
            text: 'Full description.',
            limitToTwoLines: true,
        })
        assert.equal(cardPreview({ shortPreview: null, excerpt: null }), null)
    })
})

describe('newest-first order', () => {
    it('sorts by published date then created date', () => {
        const rows = [
            { id: 'older', publishedAt: '2026-01-01T00:00:00.000Z', createdAt: '2026-01-01T00:00:00.000Z' },
            { id: 'newer', publishedAt: '2026-02-01T00:00:00.000Z', createdAt: '2026-02-01T00:00:00.000Z' },
        ]
        const sorted = [...rows].sort(comparePostsNewestFirst)
        assert.deepEqual(sorted.map((row) => row.id), ['newer', 'older'])
    })
})
