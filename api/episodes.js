// Vercel serverless function: returns the newest podcast episodes from YouTube's public RSS feed.
// No API key needed. Set YOUTUBE_PLAYLIST_ID (the "Menopause India Podcast" playlist) to show only
// podcast episodes; until then the whole channel feed is used.
// The response is cached on Vercel's edge for an hour, so new episodes appear without a redeploy.
const CHANNEL_ID = 'UCsf60WSQKe0i2wmo5MxC4Lg'

const decode = (s) =>
  s
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')

const pick = (xml, tag) => {
  const m = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`))
  return m ? decode(m[1].trim()) : ''
}

export default async function handler(req, res) {
  const playlist = process.env.YOUTUBE_PLAYLIST_ID
  const feed = playlist
    ? `https://www.youtube.com/feeds/videos.xml?playlist_id=${playlist}`
    : `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`

  try {
    const r = await fetch(feed)
    if (!r.ok) throw new Error(`Feed returned ${r.status}`)
    const xml = await r.text()
    const episodes = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)]
      .map(([, entry]) => ({
        youtubeId: pick(entry, 'yt:videoId'),
        title: pick(entry, 'title'),
        published: pick(entry, 'published'),
      }))
      .filter((e) => e.youtubeId)
      .slice(0, 4)

    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400')
    res.status(200).json({ episodes })
  } catch {
    // Short cache so a failed fetch is retried soon; the page falls back to the last episodes it knows.
    res.setHeader('Cache-Control', 's-maxage=300')
    res.status(502).json({ episodes: [] })
  }
}
