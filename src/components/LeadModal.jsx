import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getItem } from '../lib/storage'
import { track } from '../lib/analytics'
import Brandmark from './Brandmark'
import PhoneForm, { LEAD_KEY } from './PhoneForm'
import { Close } from './Icons'

// The popup opens automatically only on the home page: once per visit (each time the site is
// opened or refreshed), after the hero animation has played. Other pages never pop it up,
// but the "Get updates" buttons still open it anywhere.
// Set SKIP_IF_ALREADY_JOINED to false to also show it to people who have already shared their number.
const SKIP_IF_ALREADY_JOINED = true
const DELAY_MS = 2800

const LeadContext = createContext({ openLead: () => {} })
export const useLead = () => useContext(LeadContext)

export function LeadProvider({ children }) {
  const [open, setOpen] = useState(false)
  const [source, setSource] = useState('auto')
  const { pathname } = useLocation()
  const autoTimer = useRef(null)
  const shownThisVisit = useRef(false)

  useEffect(() => {
    if (pathname !== '/' || shownThisVisit.current) return
    if (SKIP_IF_ALREADY_JOINED && getItem(LEAD_KEY) === 'submitted') return
    autoTimer.current = setTimeout(() => {
      shownThisVisit.current = true
      setSource('auto')
      setOpen(true)
      track('lead_popup_shown')
    }, DELAY_MS)
    // Leaving the home page before the delay cancels it.
    return () => clearTimeout(autoTimer.current)
  }, [pathname])

  const openLead = useCallback((from = 'button') => {
    clearTimeout(autoTimer.current) // they opened it themselves, so skip the automatic one
    shownThisVisit.current = true
    setSource(from)
    setOpen(true)
  }, [])

  const close = useCallback(() => setOpen(false), [])

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

  useEffect(() => {
    const prevFocus = document.activeElement
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialogRef.current?.focus({ preventScroll: true })

    function onKey(e) {
      if (e.key === 'Escape') onClose()
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
  }, [onClose])

  return (
    <div className="modal" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal__dialog" role="dialog" aria-modal="true" aria-labelledby="lead-title" ref={dialogRef} tabIndex={-1}>
        <button className="modal__close" onClick={onClose} aria-label="Close">
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
          <PhoneForm source={source} compact onDone={() => setDone(true)} />
          <button className="modal__later" onClick={onClose}>{done ? 'Close' : 'Maybe later'}</button>
        </div>
      </div>
    </div>
  )
}
