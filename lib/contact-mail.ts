import { buildContactNotification, type ContactEmailInput } from './contact'

const RESEND_EMAILS_URL = 'https://api.resend.com/emails'

const BARE_EMAIL = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/

export type SendContactEmailResult =
    | { ok: true }
    | { ok: false; reason: 'not_configured'; missing: string[] }
    | { ok: false; reason: 'send_failed' }

type ContactMailEnv = {
    RESEND_API_KEY?: string
    CONTACT_FROM_EMAIL?: string
}

export function contactMailGaps(env: ContactMailEnv): string[] {
    const missing: string[] = []
    const apiKey = env.RESEND_API_KEY?.trim() ?? ''
    const fromEmail = env.CONTACT_FROM_EMAIL?.trim() ?? ''

    if (!apiKey) missing.push('RESEND_API_KEY')
    if (!fromEmail || !BARE_EMAIL.test(fromEmail)) missing.push('CONTACT_FROM_EMAIL')

    return missing
}

type SendContactEmailOptions = {
    env?: ContactMailEnv
    fetchImpl?: typeof fetch
}

export async function sendContactEmail(
    input: ContactEmailInput,
    options: SendContactEmailOptions = {},
): Promise<SendContactEmailResult> {
    const env = options.env ?? {
        RESEND_API_KEY: process.env.RESEND_API_KEY,
        CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL,
    }
    const missing = contactMailGaps(env)
    if (missing.length > 0) {
        return { ok: false, reason: 'not_configured', missing }
    }

    const notification = buildContactNotification(input, env.CONTACT_FROM_EMAIL!.trim())
    const fetchImpl = options.fetchImpl ?? fetch

    try {
        const response = await fetchImpl(RESEND_EMAILS_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${env.RESEND_API_KEY!.trim()}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from: notification.from,
                to: [notification.to],
                reply_to: notification.replyTo,
                subject: notification.subject,
                text: notification.text,
            }),
            signal: AbortSignal.timeout(10000),
        })

        if (!response.ok) {
            const detail = await response.text().catch(() => '')
            console.error('Resend rejected the contact email', response.status, detail.slice(0, 500))
            return { ok: false, reason: 'send_failed' }
        }

        return { ok: true }
    } catch (error) {
        console.error('Contact email request failed', error)
        return { ok: false, reason: 'send_failed' }
    }
}
