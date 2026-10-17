import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getItem, setItem } from '../lib/storage'
import { track } from '../lib/analytics'
import Brandmark from './Brandmark'
import PhoneForm, { LEAD_KEY } from './PhoneForm'
import { Close } from './Icons'

// The popup opens automatically only on the home page, once per visit, after about 30 seconds
// or once the visitor has scrolled halfway down, whichever comes first. Dismissing it ("Maybe later",
// the close button or Escape) keeps it from opening by itself again for 7 days.
// Other pages never pop it up, but the "Get updates" buttons still open it anywhere.
// Set SKIP_IF_ALREADY_JOINED to false to also show it to people who have already shared their number.
const SKIP_IF_ALREADY_JOINED = true
const DELAY_MS = 30000
const SCROLL_TRIGGER = 0.5
const SNOOZE_DAYS = 7
const SNOOZE_KEY = 'mi_lead_snoozed_until'

const isSnoozed = () => Number(getItem(SNOOZE_KEY)) > Date.now()

const LeadContext = createContext({ openLead: () => {} })
export const useLead = () => useContext(LeadContext)

export function LeadProvider({ children }) {
  const [open, setOpen] = useState(false)
  const [source, setSource] = useState('auto')
  const { pathname } = useLocation()
  const autoTimer = useRef(null)
  const shownThisVisit = useRef(false)

  useEffect(() => {
    if (pathname !== '/' || shownThisVisit.current || isSnoozed()) return
    if (SKIP_IF_ALREADY_JOINED && getItem(LEAD_KEY) === 'submitted') return

    function show(trigger) {
      if (shownThisVisit.current) return
      shownThisVisit.current = true
      cleanup()
      setSource('auto')
      setOpen(true)
      track('lead_popup_shown', { trigger })
    }
    function onScroll() {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      if (scrollable > 0 && window.scrollY / scrollable >= SCROLL_TRIGGER) show('scroll')
    }
    function cleanup() {
      clearTimeout(autoTimer.current)
      window.removeEventListener('scroll', onScroll)
    }

    autoTimer.current = setTimeout(() => show('time'), DELAY_MS)
    window.addEventListener('scroll', onScroll, { passive: true })
    // Leaving the home page before either trigger cancels it.
    return cleanup
  }, [pathname])

  const openLead = useCallback((from = 'button') => {
    clearTimeout(autoTimer.current) // they opened it themselves, so skip the automatic one
    shownThisVisit.current = true
    setSource(from)
    setOpen(true)
  }, [])

  const close = useCallback((joined) => {
    setOpen(false)
    if (!joined) setItem(SNOOZE_KEY, String(Date.now() + SNOOZE_DAYS * 24 * 60 * 60 * 1000))
  }, [])

  return (
    <LeadContext.Provider value={{ openLead }}>
      {children}
      {open && <Modal onClose={close} source={source} />}
    </LeadContext.Provider>
  )
}

function Modal({ onClose, source }) {
  const dialogRef = useRef(null)
  const [done, setDone] = useState(false)
  const doneRef = useRef(false)
  const dismiss = useCallback(() => onClose(doneRef.current), [onClose])

  useEffect(() => {
    const prevFocus = document.activeElement
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialogRef.current?.focus({ preventScroll: true })

    function onKey(e) {
      if (e.key === 'Escape') dismiss()
      if (e.key !== 'Tab') return
      const focusables = dialogRef.current.querySelectorAll('button, input, a[href]')
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      prevFocus?.focus?.()
    }
  }, [dismiss])

  return (
    <div className="modal" onMouseDown={(e) => e.target === e.currentTarget && dismiss()}>
      <div className="modal__dialog" role="dialog" aria-modal="true" aria-labelledby="lead-title" ref={dialogRef} tabIndex={-1}>
        <button className="modal__close" onClick={dismiss} aria-label="Close">
          <Close />
        </button>
        <div className="modal__art" aria-hidden="true">
          <Brandmark animated />
          
        </div>
        <div className="modal__body">
          <p className="eyebrow">Join the circle</p>
          <h2 id="lead-title">You don’t have to figure this out alone.</h2>
          <p className="modal__lead">
            Leave your number and we’ll share new podcast episodes, articles and community updates with you.
          </p>
          <PhoneForm source={source} compact onDone={() => { doneRef.current = true; setDone(true) }} />
          <button className="modal__later" onClick={dismiss}>{done ? 'Close' : 'Maybe later'}</button>
        </div>
      </div>
    </div>
  )
}
