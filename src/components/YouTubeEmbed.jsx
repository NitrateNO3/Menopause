import { useState } from 'react'
import { track } from '../lib/analytics'
import { Play } from './Icons'

// Loads only a thumbnail until clicked, so the page stays fast. Uses the privacy-enhanced domain.
export default function YouTubeEmbed({ id, title }) {
  const [playing, setPlaying] = useState(false)

  return (
    <div className="yt">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          className="yt__poster"
          onClick={() => {
            setPlaying(true)
            track('podcast_play', { video_id: id, video_title: title })
          }}
          aria-label={`Play: ${title}`}
        >
          <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" />
          <span className="yt__play"><Play width={30} height={30} /></span>
        </button>
      )}
    </div>
  )
}
