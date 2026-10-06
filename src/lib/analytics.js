export function track(event, params = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', event, params)
  }
}

export function trackPageView(path) {
  track('page_view', { page_path: path, page_location: window.location.href, page_title: document.title })
}
