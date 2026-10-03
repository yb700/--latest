export const CONTACT_EMAIL = 'younas.f@outlook.com'

export const CONTACT_SENDER_NAME = 'ClearCut Law website'

export function contactMailtoHref(): string {
    return `mailto:${CONTACT_EMAIL}`
}

function oneLine(value: string): string {
    return value.replace(/[\r\n]+/g, ' ').trim()
}

export function quoteDisplayName(name: string): string {
    const clean = name
        .replace(/[\r\n]+/g, ' ')
        .replace(/[<>]/g, '')
        .trim()
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '\\"')
    return `"${clean}"`
}

export type ContactEmailInput = {
    name: string
    email: string
    subject: string
    message: string
}

export type ContactNotification = {
    to: string
    from: string
    replyTo: string
    subject: string
    text: string
}

export function buildContactNotification(input: ContactEmailInput, fromEmail: string): ContactNotification {
    const name = oneLine(input.name)
    const email = input.email.replace(/[\r\n\s<>"]/g, '')

    return {
        to: CONTACT_EMAIL,
        from: `${quoteDisplayName(CONTACT_SENDER_NAME)} <${fromEmail}>`,
        replyTo: `${quoteDisplayName(name)} <${email}>`,
        subject: `${CONTACT_SENDER_NAME}: ${oneLine(input.subject)}`,
        text: input.message.trim(),
    }
}
