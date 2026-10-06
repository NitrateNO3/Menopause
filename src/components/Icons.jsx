const base = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }

export const ArrowRight = (p) => (
  <svg {...base} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
)
export const Play = (p) => (
  <svg {...base} {...p} fill="currentColor" stroke="none"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" /></svg>
)
export const Menu = (p) => (
  <svg {...base} {...p}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
)
export const Close = (p) => (
  <svg {...base} {...p}><path d="M6 6l12 12M18 6L6 18" /></svg>
)
export const Instagram = (p) => (
  <svg {...base} {...p}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" /></svg>
)
export const YouTube = (p) => (
  <svg {...base} {...p}><rect x="2.5" y="5" width="19" height="14" rx="4" /><path d="M10 9.2v5.6l4.8-2.8z" fill="currentColor" /></svg>
)
export const WhatsApp = (p) => (
  <svg {...base} {...p}><path d="M3.5 20.5l1.3-4.2A8.5 8.5 0 1 1 8 19.3z" /><path d="M9 8.8c.2 2.7 2.8 5.3 5.5 5.6l1.2-1.2-1.8-1-.9.8c-.9-.4-1.9-1.4-2.3-2.3l.8-.9-1-1.8z" fill="currentColor" stroke="none" /></svg>
)
export const LinkIcon = (p) => (
  <svg {...base} {...p}><path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1 1" /><path d="M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1-1" /></svg>
)
export const Phone = (p) => (
  <svg {...base} {...p}><rect x="6" y="2.5" width="12" height="19" rx="3" /><path d="M11 18h2" /></svg>
)
export const Mail = (p) => (
  <svg {...base} {...p}><rect x="3" y="5" width="18" height="14" rx="3" /><path d="M4 7l8 6 8-6" /></svg>
)
export const Search = (p) => (
  <svg {...base} {...p}><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
)
export const Check = (p) => (
  <svg {...base} {...p}><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
)
