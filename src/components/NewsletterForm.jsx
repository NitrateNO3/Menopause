import { useId, useState } from 'react'
import { isEmail, submitForm } from '../lib/forms'

export default function NewsletterForm({ source = 'newsletter', dark = false }) {
  const id = useId()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!isEmail(email)) return setError('Please enter a valid email address.')
    setError('')
    setStatus('sending')
    try {
      await submitForm('newsletter', { email: email.trim(), consent: 'yes', source })
      setStatus('done')
    } catch {
      setStatus('idle')
      setError('Something went wrong. Please try again.')
    }
  }

  if (status === 'done') {
    return <p className={`newsletter__done ${dark ? 'is-dark' : ''}`} role="status">Thank you for subscribing! Look out for our next email.</p>
  }

  return (
    <form className={`newsletter ${dark ? 'newsletter--dark' : ''}`} onSubmit={handleSubmit} noValidate>
      <label htmlFor={`${id}-email`} className="sr-only">Email address</label>
      <div className="newsletter__row">
        <input
          id={`${id}-email`}
          type="email"
          autoComplete="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={!!error || undefined}
        />
        <button type="submit" className="btn btn--primary" disabled={status === 'sending'}>
          {status === 'sending' ? 'Joining…' : 'Subscribe'}
        </button>
      </div>
      {error && <p className="form__error" role="alert">{error}</p>}
      <p className="newsletter__note">Occasional emails with new articles and episodes. Unsubscribe anytime.</p>
    </form>
  )
}
