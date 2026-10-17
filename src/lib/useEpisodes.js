import { useEffect, useState } from 'react'
import { episodes as fallback } from '../site.config'
import { getItem, setItem } from './storage'

const CACHE_KEY = 'mi_episodes'

function lastKnown() {
  try {
    const saved = JSON.parse(getItem(CACHE_KEY))
    return Array.isArray(saved) && saved.length ? saved : fallback
  } catch {
    return fallback
  }
}

// Newest episodes from /api/episodes (the YouTube feed). If the feed fails, keeps showing the
// last episodes that loaded in this browser, then the list in site.config.js.
export default function useEpisodes() {
  const [episodes, setEpisodes] = useState(lastKnown)

  useEffect(() => {
    let cancelled = false
    fetch('/api/episodes')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled || !data?.episodes?.length) return
        setEpisodes(data.episodes)
        setItem(CACHE_KEY, JSON.stringify(data.episodes))
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  return episodes
}
