import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { CONTACT_EMAIL } from './contact'
import { contactMailGaps, sendContactEmail } from './contact-mail'

const sample = {
    name: 'Bedra Ouendjeli',
    email: 'ouendjelizaia@gmail.com',
    subject: 'Employment law',
    message: 'I need to know more about the new rules on 0 hour contract.',
}

describe('contact mail settings', () => {
    it('names both missing settings', () => {
        assert.deepEqual(contactMailGaps({}), ['RESEND_API_KEY', 'CONTACT_FROM_EMAIL'])
    })

    it('rejects a from address that is not a bare mailbox', () => {
        assert.deepEqual(
            contactMailGaps({
                RESEND_API_KEY: 're_test',
                CONTACT_FROM_EMAIL: 'ClearCut Law <hello@clearcutlaw.co.uk>',
            }),
            ['CONTACT_FROM_EMAIL'],
        )
    })
})

describe('send contact email', () => {
    it('does not call the mail service when the secret is missing', async () => {
        let called = false
        const result = await sendContactEmail(sample, {
            env: {},
            fetchImpl: async () => {
                called = true
                return new Response('{}', { status: 200 })
            },
        })

        assert.deepEqual(result, {
            ok: false,
            reason: 'not_configured',
            missing: ['RESEND_API_KEY', 'CONTACT_FROM_EMAIL'],
        })
        assert.equal(called, false)
    })

    it('posts one website email with the typed reply address', async () => {
        let captured: { url: string; init: RequestInit } | undefined
        const result = await sendContactEmail(sample, {
            env: {
                RESEND_API_KEY: 're_test_key',
                CONTACT_FROM_EMAIL: 'hello@clearcutlaw.co.uk',
            },
            fetchImpl: async (url, init) => {
                captured = { url: String(url), init: init ?? {} }
                return new Response(JSON.stringify({ id: 'email_1' }), { status: 200 })
            },
        })

        assert.deepEqual(result, { ok: true })
        assert.ok(captured)
        assert.equal(captured.url, 'https://api.resend.com/emails')
        const headers = captured.init.headers as Record<string, string>
        assert.equal(headers.Authorization, 'Bearer re_test_key')
        const body = JSON.parse(String(captured.init.body))
        assert.deepEqual(body.to, [CONTACT_EMAIL])
        assert.equal(body.from, '"ClearCut Law website" <hello@clearcutlaw.co.uk>')
        assert.equal(body.reply_to, '"Bedra Ouendjeli" <ouendjelizaia@gmail.com>')
        assert.equal(body.subject, 'ClearCut Law website: Employment law')
        assert.equal(body.text, sample.message)
        assert.equal('html' in body, false)
    })

    it('reports a provider failure without claiming the email was sent', async () => {
        const result = await sendContactEmail(sample, {
            env: {
                RESEND_API_KEY: 're_test_key',
                CONTACT_FROM_EMAIL: 'hello@clearcutlaw.co.uk',
            },
            fetchImpl: async () => new Response('no', { status: 403 }),
        })
        assert.deepEqual(result, { ok: false, reason: 'send_failed' })
    })
})
