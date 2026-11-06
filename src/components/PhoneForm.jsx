import { useId, useState } from 'react'
import { normaliseIndianMobile, submitForm } from '../lib/forms'
import { setItem } from '../lib/storage'
import { Check } from './Icons'

export const LEAD_KEY = 'mi_phone_lead'

// `inline` drops the optional name and puts the number and button on one row.
export default function PhoneForm({ source = 'inline', onDone, compact = false, inline = false, guide = false }) {
  const id = useId()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [contact, setContact] = useState(true)
  const [updates, setUpdates] = useState(false)
  const [error, setError] = useState('')
  const [status, setStatus] = useState('idle')

  async function handleSubmit(e) {
    e.preventDefault()
    const mobile = normaliseIndianMobile(phone)
    if (!mobile) return setError('Please enter a valid 10-digit Indian mobile number.')
    if (!email.trim()) return setError('Please enter your email address.')
    if (!contact) return setError('Please tick the box so we have your permission to contact you.')
    setError('')
    setStatus('sending')
    try {
      await submitForm('phone', {
        name: name.trim(),
        phone: `+91 ${mobile}`,
        email: email.trim(),
        whatsapp: whatsapp ? `+91 ${normaliseIndianMobile(whatsapp)}` : '',
        consent: contact ? 'yes' : 'no',
        updates: updates ? 'yes' : 'no',
        source,
        guide: guide ? 'yes' : 'no',
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
        <label htmlFor={`${id}-name`}>Your first name </label>
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

      <div className="field">
        <label htmlFor={`${id}-email`}>Email address</label>
        <input
          id={`${id}-email`}
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="field">
        <label htmlFor={`${id}-whatsapp`}>WhatsApp number <span className="field__optional">(optional)</span></label>
        <div className="phone-input">
          <span className="phone-input__prefix" aria-hidden="true">🇮🇳 +91</span>
          <input
            id={`${id}-whatsapp`}
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            placeholder="Same as above, or leave blank"
            maxLength={18}
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
          />
        </div>
      </div>

      <label className="checkbox">
        <input type="checkbox" checked={contact} onChange={(e) => setContact(e.target.checked)} />
        <span>
          I agree to Menopause India contacting me on this number and email. I can opt out anytime.
        </span>
      </label>
      <label className="checkbox checkbox--optional">
        <input type="checkbox" checked={updates} onChange={(e) => setUpdates(e.target.checked)} />
        <span>Send me the latest articles and podcast episodes.</span>
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
