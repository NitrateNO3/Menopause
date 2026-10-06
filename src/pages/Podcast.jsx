import { Link } from 'react-router-dom'
import { episodes, site } from '../site.config'
import Seo from '../components/Seo'
import Reveal from '../components/Reveal'
import YouTubeEmbed from '../components/YouTubeEmbed'
import { ArrowRight, Instagram, YouTube } from '../components/Icons'

const themes = ['Fitness & strength', 'Hormones, explained simply', 'Emotional wellbeing', 'Sleep', 'Relationships & family', 'Talking to your doctor']

export default function Podcast() {
  const [latest, ...rest] = episodes

  return (
    <>
      <Seo
        title="Podcast"
        path="/podcast"
        description="Watch the Menopause India podcast: honest conversations about menopause, fitness, health and emotions for Indian women 35+."
      />

      <section className="page-hero page-hero--ink">
        <div className="container page-hero__inner">
          <p className="eyebrow eyebrow--light">The podcast</p>
          <h1 className="page-hero__title">Pull up a chair. Let’s talk.</h1>
          <p className="page-hero__lead">
            Honest, easy-going conversations about menopause and midlife, in language that feels like a chat with a
            friend.
          </p>
        </div>
      </section>

      <section className="section section--overlap">
        <div className="container">
          <Reveal className="episode-hero">
            <YouTubeEmbed id={latest.youtubeId} title={latest.title} />
            <div className="episode-hero__copy">
              <span className="label">Latest episode</span>
              <h2>{latest.title}</h2>
              <p>{latest.summary}</p>
              <div className="tags">
                {latest.topics.map((t) => <span key={t} className="tag">{t}</span>)}
              </div>
              <a className="btn btn--primary" href={`https://www.youtube.com/watch?v=${latest.youtubeId}`} target="_blank" rel="noreferrer">
                <YouTube /> Watch on YouTube
              </a>
            </div>
          </Reveal>

          {rest.length > 0 && (
            <>
              <h2 className="section__title section__title--sm">More episodes</h2>
              <div className="grid-3">
                {rest.map((ep) => (
                  <div key={ep.youtubeId} className="episode">
                    <YouTubeEmbed id={ep.youtubeId} title={ep.title} />
                    <h3>{ep.title}</h3>
                    <p>{ep.summary}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <section className="section section--petal">
        <div className="container split split--center">
          <Reveal className="split__copy">
            <p className="eyebrow">What we talk about</p>
            <h2 className="section__title">The things nobody told us.</h2>
            <p className="section__lead">
              Each episode takes one part of the menopause journey and makes it easier to understand, and easier to
              talk about at home.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <ul className="theme-list">
              {themes.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <Reveal className="cta-band">
            <div className="cta-band__copy">
              <h2>Got a question you’d like us to cover?</h2>
              <p>Send us your topic ideas. Many episodes start with a question from our community.</p>
            </div>
            <div className="cta-band__actions">
              <a href={site.social.instagram} target="_blank" rel="noreferrer" className="btn btn--light btn--lg">
                <Instagram /> DM us on Instagram
              </a>
              <Link to="/contact" className="btn btn--outline-light btn--lg">
                Write to us <ArrowRight />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
