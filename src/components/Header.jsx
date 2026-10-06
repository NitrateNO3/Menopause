import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { nav } from '../site.config'
import Logo from './Logo'
import { useLead } from './LeadModal'
import { Close, Menu } from './Icons'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const { openLead } = useLead()

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
  }, [open])

  return (
    <header className={`header ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="container header__inner">
        <Logo />
        <nav className="nav" aria-label="Main">
          <ul id="main-nav" className="nav__list">
            {nav.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.to === '/'} className="nav__link">
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li className="nav__cta-mobile">
              <button className="btn btn--primary btn--block" onClick={() => { setOpen(false); openLead('menu') }}>
                Get updates
              </button>
            </li>
          </ul>
        </nav>
        <div className="header__actions">
          <button className="btn btn--primary btn--sm header__cta" onClick={() => openLead('header')}>
            Get updates
          </button>
          <button
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="main-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  )
}
