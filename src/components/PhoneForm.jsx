import { useId, useState } from 'react'
import { normaliseIndianMobile, submitForm } from '../lib/forms'
import { setItem } from '../lib/storage'
import { Check } from './Icons'

export const LEAD_KEY = 'mi_phone_lead'

// `inline` drops the optional name and puts the number and button on one row.
export default function PhoneForm({ source = 'inline', onDone, compact = false, inline = false }) {
  const id = useId()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [consent, setConsent] = useState(false)
  const [error, setError] = useState('')
  const [status, setStatus] = useState('idle')

  async function handleSubmit(e) {
    e.preventDefault()
    const mobile = normaliseIndianMobile(phone)
    if (!mobile) return setError('Please enter a valid 10-digit Indian mobile number.')
    if (!consent) return setError('Please tick the box so we have your permission to contact you.')
    setError('')
    setStatus('sending')
    try {
      await submitForm('phone', {
        name: name.trim(),
        phone: `+91 ${mobile}`,
        consent: 'yes',
        source,
      })
      setItem(LEAD_KEY, 'submitted')
      setStatus('done')
      onDone?.()
    } catch {
      setStatus('idle')
      setError('Something went wrong. Please try again in a moment.')
    }
  }

  if (status === 'done') {
    return (
      <div className="form-success" role="status">
        <span className="form-success__icon"><Check /></span>
        <div>
          <strong>Thank you{name.trim() ? `, ${name.trim().split(' ')[0]}` : ''}!</strong>
          <p>You’re on the list. We’ll be in touch with new episodes and updates.</p>
        </div>
      </div>
    )
  }

  return (
    <form className={`form ${compact || inline ? 'form--compact' : ''}`} onSubmit={handleSubmit} noValidate>
      {!inline && (
      <div className="field">
        <label htmlFor={`${id}-name`}>Your first name <span className="field__optional">(optional)</span></label>
        <input id={`${id}-name`} type="text" autoComplete="given-name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      )}
      <div className="field">
        <label htmlFor={`${id}-phone`} className={inline ? 'sr-only' : undefined}>Mobile number</label>
        <div className={inline ? 'phone-row' : undefined}>
        <div className="phone-input">
          <span className="phone-input__prefix" aria-hidden="true">🇮🇳 +91</span>
          <input
            id={`${id}-phone`}
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            placeholder="98765 43210"
            maxLength={18}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            aria-invalid={error.includes('mobile') || undefined}
            required
          />
        </div>
        {inline && <SubmitButton status={status} />}
        </div>
      </div>
      <label className="checkbox">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
        <span>I agree to Menopause India contacting me on this number. I can opt out anytime.</span>
      </label>
      {error && <p className="form__error" role="alert">{error}</p>}
      {!inline && <SubmitButton status={status} block />}
    </form>
  )
}

function SubmitButton({ status, block = false }) {
  return (
    <button className={`btn btn--primary ${block ? 'btn--block' : ''}`} type="submit" disabled={status === 'sending'}>
      {status === 'sending' ? 'Saving…' : 'Keep me posted'}
    </button>
  )
}
