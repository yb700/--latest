import { CONTACT_EMAIL, buildContactNotification, type ContactEmailInput } from './contact'

// FormSubmit emails this address with no API key. The first accepted submission
// only sends an Activate Form link; later messages arrive after that link is opened.
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

    try {
        const response = await fetchImpl(FORMSUBMIT_AJAX_URL, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: notification.text,
                _subject: notification.subject,
                _replyto: notification.replyTo,
                _honey: '',
            }),
            signal: AbortSignal.timeout(10000),
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
