import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { trackPageView } from '../lib/analytics'

// Scrolls to top (or to #section) and records a GA page view on every route change.
export default function RouteEffects() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    // Links like /learn#library land on that section; everything else starts at the top.
    const target = hash && document.getElementById(hash.slice(1))
    if (target) setTimeout(() => target.scrollIntoView({ block: 'start' }), 60)
    else window.scrollTo(0, 0)
    // Wait a tick so the new page's <title> is in place.
    const t = setTimeout(() => trackPageView(pathname), 50)
    return () => clearTimeout(t)
  }, [pathname])
  return null
}
