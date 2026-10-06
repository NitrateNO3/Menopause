import { track } from './analytics'

const endpoint = import.meta.env.VITE_FORMS_ENDPOINT

// Sends a form submission to the configured endpoint (e.g. a Google Apps Script
// web app that appends rows to a Sheet). text/plain + no-cors avoids a CORS
// preflight, which Apps Script cannot answer.
export async function submitForm(type, data) {
  const payload = {
    type,
    ...data,
    page: window.location.pathname,
    submittedAt: new Date().toISOString(),
  }

  track('generate_lead', { form_type: type })

  if (!endpoint) {
    console.info('[forms] VITE_FORMS_ENDPOINT not set. Submission not sent:', payload)
    return
  }

  await fetch(endpoint, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload),
  })
}

// Indian mobile numbers: 10 digits starting 6–9, optional +91 / 0 prefix.
export function normaliseIndianMobile(value) {
  const digits = value.replace(/\D/g, '').replace(/^(91|0)(?=\d{10}$)/, '')
  return /^[6-9]\d{9}$/.test(digits) ? digits : null
}

export const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
