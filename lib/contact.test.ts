import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
    CONTACT_EMAIL,
    buildContactNotification,
} from './contact'

const sample = {
    name: 'Bedra Ouendjeli',
    email: 'ouendjelizaia@gmail.com',
    subject: 'Employment law',
    message: 'I need to know more about the new rules on 0 hour contract.\n\nCould you help?\nMany thanks.\nBedra',
}

describe('contact notification', () => {
    it('uses the typed name once and the plain email as the reply address', () => {
        const notification = buildContactNotification(sample)

        assert.equal(notification.to, CONTACT_EMAIL)
        assert.equal(notification.name, 'Bedra Ouendjeli')
        assert.equal(notification.replyTo, 'ouendjelizaia@gmail.com')
        assert.equal(notification.replyTo.includes('Bedra'), false)
        assert.equal(notification.replyTo.includes('<'), false)
    })

    it('puts the website and the typed subject in the subject line', () => {
        const notification = buildContactNotification(sample)
        assert.equal(notification.subject, 'ClearCut Law website: Employment law')
    })

    it('uses the message as the body and does not add another name', () => {
        const notification = buildContactNotification(sample)
        assert.equal(notification.text, sample.message)
        assert.equal(notification.text.includes('Name:'), false)
        assert.equal(notification.text.includes('ouendjelizaia@gmail.com'), false)
        assert.equal(notification.text.startsWith('Bedra'), false)
    })

    it('keeps a subject with a line break on one line', () => {
        const notification = buildContactNotification({
            ...sample,
            subject: 'Employment\nlaw',
        })
        assert.equal(notification.subject, 'ClearCut Law website: Employment law')
    })

    it('keeps a name with a quote on one line and does not wrap the reply address', () => {
        const notification = buildContactNotification({
            ...sample,
            name: 'Bedra "Bee"\nOuendjeli',
            email: 'ouendjelizaia@gmail.com',
        })
        assert.equal(notification.name, 'Bedra "Bee" Ouendjeli')
        assert.equal(notification.replyTo, 'ouendjelizaia@gmail.com')
    })
})
