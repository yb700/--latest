import { CONTACT_EMAIL, buildContactNotification, type ContactEmailInput } from './contact'

// FormSubmit accepts this address only from the activated contact page.
// A POST from the Vercel server is rejected after the database row is saved,
// which is what showed the visitor the red failure line. The browser on
// /contact already has that page as its referrer, so the form posts from there.
// application/x-www-form-urlencoded avoids a CORS preflight.
const FORMSUBMIT_AJAX_URL = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`

export type SendContactEmailResult =
    | { ok: true }
    | { ok: false; reason: 'send_failed' }

type SendContactEmailOptions = {
    fetchImpl?: typeof fetch
}

function formSubmitAccepted(payload: unknown): boolean {
    if (!payload || typeof payload !== 'object') return false
    const success = (payload as { success?: unknown }).success
    return success === true || success === 'true'
}

export async function sendContactEmail(
    input: ContactEmailInput,
    options: SendContactEmailOptions = {},
): Promise<SendContactEmailResult> {
    const notification = buildContactNotification(input)
    const fetchImpl = options.fetchImpl ?? fetch
    // FormSubmit prints ordinary fields and hides names that start with _.
    // The 19:54 mail therefore showed name and message only. Reply-To stays
    // FormSubmit until the form also sends a field named email; that field is
    // the plain line in the mail, and _replyto is the same address.
    const body = new URLSearchParams({
        name: notification.name,
        email: notification.replyTo,
        message: notification.text,
        _subject: notification.subject,
        _replyto: notification.replyTo,
        _honey: '',
    })

    try {
        const response = await fetchImpl(FORMSUBMIT_AJAX_URL, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            referrerPolicy: 'unsafe-url',
            body,
            signal: AbortSignal.timeout(15000),
        })

        const detail = await response.text().catch(() => '')
        let payload: unknown = null
        try {
            payload = detail ? JSON.parse(detail) : null
        } catch {
            payload = null
        }

        if (!response.ok || !formSubmitAccepted(payload)) {
            console.error('FormSubmit rejected the contact email', response.status, detail.slice(0, 500))
            return { ok: false, reason: 'send_failed' }
        }

        return { ok: true }
    } catch (error) {
        console.error('Contact email request failed', error)
        return { ok: false, reason: 'send_failed' }
    }
}
