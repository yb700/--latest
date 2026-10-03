export const CONTACT_EMAIL = 'younas.f@outlook.com'

export const CONTACT_SENDER_NAME = 'ClearCut Law website'

export function contactMailtoHref(): string {
    return `mailto:${CONTACT_EMAIL}`
}

function oneLine(value: string): string {
    return value.replace(/[\r\n]+/g, ' ').trim()
}

function plainMailbox(email: string): string {
    return email.replace(/[\r\n\s<>"]/g, '')
}

export type ContactEmailInput = {
    name: string
    email: string
    subject: string
    message: string
}

export type ContactNotification = {
    to: string
    name: string
    replyTo: string
    subject: string
    text: string
}

export function buildContactNotification(input: ContactEmailInput): ContactNotification {
    return {
        to: CONTACT_EMAIL,
        name: oneLine(input.name),
        replyTo: plainMailbox(input.email),
        subject: `${CONTACT_SENDER_NAME}: ${oneLine(input.subject)}`,
        text: input.message.trim(),
    }
}
