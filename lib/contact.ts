export const CONTACT_EMAIL = 'younas.f@outlook.com'

export function contactMailtoHref(): string {
    return `mailto:${CONTACT_EMAIL}`
}

function oneLine(value: string): string {
    return value.replace(/[\r\n]+/g, ' ').trim()
}

export function buildContactMailto(input: {
    name: string
    email: string
    subject: string
    message: string
}): string {
    const body = [
        `Name: ${oneLine(input.name)}`,
        `Email: ${oneLine(input.email)}`,
        '',
        input.message.trim(),
    ].join('\r\n')

    const subject = encodeURIComponent(oneLine(input.subject))
    const encodedBody = encodeURIComponent(body)

    return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${encodedBody}`
}
