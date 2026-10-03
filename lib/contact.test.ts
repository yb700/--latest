import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
    CONTACT_EMAIL,
    CONTACT_SENDER_NAME,
    buildContactNotification,
    quoteDisplayName,
} from './contact'

const sample = {
    name: 'Bedra Ouendjeli',
    email: 'ouendjelizaia@gmail.com',
    subject: 'Employment law',
    message: 'I need to know more about the new rules on 0 hour contract.\n\nCould you help?\nMany thanks.\nBedra',
}

describe('contact notification', () => {
    it('uses the typed name once, as the reply address', () => {
        const notification = buildContactNotification(sample, 'hello@clearcutlaw.co.uk')

        assert.equal(notification.to, CONTACT_EMAIL)
        assert.equal(notification.from, `"${CONTACT_SENDER_NAME}" <hello@clearcutlaw.co.uk>`)
        assert.equal(notification.replyTo, '"Bedra Ouendjeli" <ouendjelizaia@gmail.com>')
        assert.equal(notification.from.includes('Bedra'), false)
        assert.equal(notification.replyTo.split('Bedra').length - 1, 1)
    })

    it('puts the website and the typed subject in the subject line', () => {
        const notification = buildContactNotification(sample, 'hello@clearcutlaw.co.uk')
        assert.equal(notification.subject, 'ClearCut Law website: Employment law')
    })

    it('uses the message as the body and does not add another name', () => {
        const notification = buildContactNotification(sample, 'hello@clearcutlaw.co.uk')
        assert.equal(notification.text, sample.message)
        assert.equal(notification.text.includes('Name:'), false)
        assert.equal(notification.text.includes('ouendjelizaia@gmail.com'), false)
        assert.equal(notification.text.startsWith('Bedra'), false)
    })

    it('keeps a subject with a line break on one line', () => {
        const notification = buildContactNotification({
            ...sample,
            subject: 'Employment\nlaw',
        }, 'hello@clearcutlaw.co.uk')
        assert.equal(notification.subject, 'ClearCut Law website: Employment law')
    })

    it('quotes a reply name that contains a quote', () => {
        assert.equal(quoteDisplayName('Bedra "Bee" Ouendjeli'), '"Bedra \\"Bee\\" Ouendjeli"')
        const notification = buildContactNotification({
            ...sample,
            name: 'Bedra "Bee"\nOuendjeli',
        }, 'hello@clearcutlaw.co.uk')
        assert.equal(notification.replyTo, '"Bedra \\"Bee\\" Ouendjeli" <ouendjelizaia@gmail.com>')
    })
})
