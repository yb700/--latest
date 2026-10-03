import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { CONTACT_EMAIL } from './contact'
import { sendContactEmail } from './contact-mail'

const sample = {
    name: 'Bedra Ouendjeli',
    email: 'ouendjelizaia@gmail.com',
    subject: 'Employment law',
    message: 'I need to know more about the new rules on 0 hour contract.',
}

describe('send contact email', () => {
    it('posts one website email with the typed reply address', async () => {
        let captured: { url: string; init: RequestInit } | undefined
        const result = await sendContactEmail(sample, {
            fetchImpl: async (url, init) => {
                captured = { url: String(url), init: init ?? {} }
                return new Response(JSON.stringify({ success: 'true' }), { status: 200 })
            },
        })

        assert.deepEqual(result, { ok: true })
        assert.ok(captured)
        assert.equal(captured.url, `https://formsubmit.co/ajax/${CONTACT_EMAIL}`)
        assert.equal(captured.init.method, 'POST')
        assert.equal(captured.init.referrerPolicy, 'unsafe-url')
        assert.deepEqual(captured.init.headers, {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        })
        const body = new URLSearchParams(String(captured.init.body))
        assert.equal(body.get('name'), 'Bedra Ouendjeli')
        assert.equal(body.get('email'), 'ouendjelizaia@gmail.com')
        assert.equal(body.get('message'), sample.message)
        assert.equal(body.get('_subject'), 'ClearCut Law website: Employment law')
        assert.equal(body.get('_replyto'), 'ouendjelizaia@gmail.com')
        assert.equal(body.get('email'), body.get('_replyto'))
        assert.equal(body.get('_honey'), '')
        assert.equal(body.get('_autoresponse'), null)
        assert.equal(body.get('_cc'), null)
        assert.equal(body.get('email')?.includes('<'), false)
        assert.equal(body.get('_replyto')?.includes('<'), false)
    })

    it('reports a provider failure without claiming the email was sent', async () => {
        const result = await sendContactEmail(sample, {
            fetchImpl: async () => new Response('no', { status: 403 }),
        })
        assert.deepEqual(result, { ok: false, reason: 'send_failed' })
    })

    it('reports failure when FormSubmit does not accept the submission', async () => {
        const result = await sendContactEmail(sample, {
            fetchImpl: async () => new Response(JSON.stringify({ success: 'false' }), { status: 200 }),
        })
        assert.deepEqual(result, { ok: false, reason: 'send_failed' })
    })
})
