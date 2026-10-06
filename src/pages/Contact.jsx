import { useState } from 'react'
import { site } from '../site.config'
import { isEmail, submitForm } from '../lib/forms'
import Seo from '../components/Seo'
import PhoneForm from '../components/PhoneForm'
import { ArrowRight, Check, Instagram, Mail, Phone } from '../components/Icons'

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [error, setError] = useState('')
  const [status, setStatus] = useState('idle')
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim()) return setError('Please tell us your name.')
    if (!isEmail(form.email)) return setError('Please enter a valid email address.')
    if (form.message.trim().length < 5) return setError('Please write a short message.')
    setError('')
    setStatus('sending')
    try {
      await submitForm('contact', { name: form.name.trim(), email: form.email.trim(), message: form.message.trim() })
      setStatus('done')
    } catch {
      setStatus('idle')
      setError('Something went wrong. Please try again.')
    }
  }

  if (status === 'done') {
    return (
      <div className="form-success" role="status">
        <span className="form-success__icon"><Check /></span>
        <div>
          <strong>Message sent. Thank you!</strong>
          <p>We read every message and will get back to you as soon as we can.</p>
        </div>
      </div>
    )
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="field-row">
        <div className="field">
          <label htmlFor="c-name">Name</label>
          <input id="c-name" autoComplete="name" value={form.name} onChange={set('name')} />
        </div>
        <div className="field">
          <label htmlFor="c-email">Email</label>
          <input id="c-email" type="email" autoComplete="email" value={form.email} onChange={set('email')} />
        </div>
      </div>
      <div className="field">
        <label htmlFor="c-message">Message</label>
        <textarea id="c-message" rows={4} value={form.message} onChange={set('message')} placeholder="A question, a topic idea, or just hello." />
      </div>
      {error && <p className="form__error" role="alert">{error}</p>}
      <button className="btn btn--primary btn--block" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </button>
      <p className="form__hint">Please don’t share personal medical details here. For medical concerns, consult a doctor.</p>
    </form>
  )
}

export default function Contact() {
  return (
    <section className="contact-page">
      <Seo
        title="Contact"
        path="/contact"
        description="Get in touch with Menopause India, suggest a podcast topic, or sign up for updates on your phone."
      />
      <div className="container contact-page__grid">
        <div className="contact-page__intro">
          <p className="eyebrow">Contact</p>
          <h1 className="contact-page__title">We’d love to hear from you.</h1>
          <p className="contact-page__lead">Questions, topic ideas, collaborations, or just to say hello.</p>

          <div className="contact-tile">
            <span className="contact-tile__icon"><Phone /></span>
            <div className="contact-tile__body">
              <h2>Get updates on your phone</h2>
              <p>New episodes, articles and community news.</p>
              <PhoneForm source="contact" inline />
            </div>
          </div>

          <a href={site.social.instagram} target="_blank" rel="noreferrer" className="contact-tile contact-tile--ink">
            <span className="contact-tile__icon"><Instagram /></span>
            <div className="contact-tile__body">
              <h2>Prefer Instagram?</h2>
              <p>DM us at {site.social.instagramHandle}</p>
            </div>
            <ArrowRight className="contact-tile__arrow" />
          </a>
        </div>

        <div className="panel contact-page__form">
          <div className="contact-page__form-head">
            <span className="panel__icon"><Mail /></span>
            <h2>Send us a message</h2>
          </div>
          <p>Your topic might become our next episode.</p>
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
