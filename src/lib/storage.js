// localStorage can throw in private mode or when blocked; never let that break the page.
export function getItem(key) {
  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

export function setItem(key, value) {
  try {
    window.localStorage.setItem(key, value)
  } catch {
    /* ignore */
  }
}
