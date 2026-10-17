import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { site } from '../site.config'
import Seo from '../components/Seo'
import Brandmark from '../components/Brandmark'
import Reveal from '../components/Reveal'
import YouTubeEmbed from '../components/YouTubeEmbed'
import { useLead } from '../components/LeadModal'
import useEpisodes from '../lib/useEpisodes'
import { ArrowRight, Instagram, Mail, Phone, Play } from '../components/Icons'

const thoughts = ['Always tired?', 'Can’t sleep?', 'Brain fog?', 'Mood swings?', 'Is it just me?', 'Is this normal?']

const topics = [
  'Perimenopause', 'Fatigue', 'Hot flushes', 'Sleep', 'Mood', 'Brain fog', 'Weight', 'Skin and hair',
  'Bone health', 'Heart health', 'Intimate health', 'Family support', 'Doctor visits', 'Myths',
]

// Simple line icons for the "Sound familiar" cards (24×24, drawn with currentColor).
const familiarIcons = {
  tired: <><rect x="2" y="7" width="17" height="10" rx="2.5" /><path d="M22 11v2" /><path d="M5.5 10.5v3" /></>,
  night: <><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" /><path d="M17 3v3M15.5 4.5h3" /></>,
  self: <><circle cx="12" cy="12" r="9" /><path d="M8.5 15.5c1.8-1.3 5.2-1.3 7 0" /><path d="M9 9.5h.01M15 9.5h.01" /></>,
  heat: <path d="M12 3c.6 3 3.2 4.6 4.6 6.8A6 6 0 1 1 6.5 13c0-1.6.7-2.9 1.6-3.8.2 1.6 1.1 2.6 2.4 2.8C10 9 10.5 5.5 12 3Z" />,
  weight: <><rect x="3.5" y="3.5" width="17" height="17" rx="4" /><path d="M8.5 10a5 5 0 0 1 7 0" /><path d="M12 12.5l1.3-2.2" /></>,
  dismissed: <><path d="M20 15a2 2 0 0 1-2 2H8l-4 3.5V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2Z" /><path d="M9 10.5h.01M12 10.5h.01M15 10.5h.01" /></>,
}

const familiar = [
  { icon: 'tired', title: 'Tired all the time', text: 'Worn out even after a full night’s sleep, and too drained to do what you used to.' },
  { icon: 'night', title: 'Lying awake at 3 a.m.', text: 'Falling asleep is fine. Staying asleep is another story.' },
  { icon: 'self', title: 'Not feeling like yourself', text: 'Irritable, anxious or teary, losing words and your train of thought. Like you don’t recognise yourself anymore.' },
  { icon: 'heat', title: 'Periods and heat acting up', text: 'Periods that change, hot flushes by day, night sweats that wake you up.' },
  { icon: 'weight', title: 'Weight that won’t budge', text: 'Eating well, moving the same, and still gaining. It isn’t your fault.' },
  { icon: 'dismissed', title: 'Told it’s “just your age”', text: 'Hearing “it’s stress” or “it’s all in your head” when you know something has changed.' },
]

const stages = [
  { name: 'Perimenopause', text: 'The years before your periods stop, when symptoms often begin.' },
  { name: 'Menopause', text: 'When you’ve gone 12 months without a period.', milestone: true },
  { name: 'Postmenopause', text: 'Life after, when bone and heart health matter more.' },
]

const featuredGuides = [
  {
    title: 'Which stage are you in?',
    category: 'START HERE',
    description: 'A simple guide to work out whether it’s perimenopause, menopause or after.',
    type: 0,
  },
  {
    title: 'Questions to ask your doctor',
    category: 'BEFORE YOUR VISIT',
    description: 'A short list to take to your appointment, so you leave with answers.',
    type: 1,
  },
  {
    title: 'Talking to your family about menopause',
    category: 'AT HOME',
    description: 'What to say, and what helps, for you and the people at home.',
    type: 2,
  },
]

function ResourceCover({ type }) {
  if (type === 0) {
    return (
      <svg viewBox="0 0 380 180" fill="none" className="home-guide-svg" aria-hidden="true">
        <defs>
          <radialGradient id="h-glow-1" cx="70%" cy="30%" r="60%">
            <stop offset="0%" stopColor="var(--rose)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--rose)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="260" cy="80" r="95" fill="url(#h-glow-1)" />
        <circle cx="90" cy="60" r="50" fill="var(--blush)" opacity="0.4" />
        <path d="M30 140 Q 130 90, 210 130 T 360 110" stroke="var(--rose)" strokeWidth="4" strokeLinecap="round" opacity="0.3" />
        <ellipse cx="290" cy="110" rx="45" ry="50" fill="var(--rose)" opacity="0.2" />
        <circle cx="150" cy="40" r="12" fill="var(--blush)" opacity="0.6" />
      </svg>
    )
  }
  if (type === 1) {
    return (
      <svg viewBox="0 0 380 180" fill="none" className="home-guide-svg" aria-hidden="true">
        <defs>
          <radialGradient id="h-glow-2" cx="30%" cy="70%" r="60%">
            <stop offset="0%" stopColor="var(--rose)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--rose)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="110" cy="110" r="95" fill="url(#h-glow-2)" />
        <circle cx="280" cy="60" r="40" fill="var(--blush)" opacity="0.45" />
        <circle cx="90" cy="70" r="55" fill="var(--rose)" opacity="0.2" />
        <path d="M180 30 C 240 70, 270 130, 340 150" stroke="var(--blush)" strokeWidth="6" strokeLinecap="round" opacity="0.35" />
        <circle cx="210" cy="130" r="14" fill="var(--rose)" opacity="0.2" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 380 180" fill="none" className="home-guide-svg" aria-hidden="true">
      <defs>
        <radialGradient id="h-glow-3" cx="70%" cy="70%" r="60%">
          <stop offset="0%" stopColor="var(--rose)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="var(--rose)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="270" cy="110" r="90" fill="url(#h-glow-3)" />
      <ellipse cx="90" cy="100" rx="55" ry="48" fill="var(--blush)" opacity="0.4" />
      <path d="M20 130 Q 90 60, 170 100 T 340 70" stroke="var(--rose)" strokeWidth="5" strokeLinecap="round" opacity="0.3" />
      <ellipse cx="260" cy="45" rx="32" ry="38" fill="var(--rose)" opacity="0.2" />
      <circle cx="60" cy="45" r="12" fill="var(--blush)" opacity="0.55" />
    </svg>
  )
}

export default function Home() {
  const { openLead } = useLead()
  const [latest, ...more] = useEpisodes()

  return (
    <>
      <Seo path="/" />

      {/* Hero */}
      <section className="hero">
        <div className="hero__bg" aria-hidden="true">
          <span className="blob blob--1" />
          <span className="blob blob--2" />
        </div>
        <div className="container hero__grid">
          <div className="hero__copy">
            <p className="kicker">
              <Brandmark className="kicker__mark" />
              <span>
                Made for Indian women, <em>35 and beyond</em>
              </span>
            </p>
            <h1 className="hero__title">
              Let’s talk about menopause. <em>Openly.</em>
            </h1>
            <p className="hero__lead">
              Menopause explained in simple words, for Indian women. What’s happening, why, and what you can do about
              it. You’re not imagining it, and you’re not alone.
            </p>
            <div className="hero__actions">
              <Link to="/blogs" className="btn btn--primary btn--lg">
                Start learning <ArrowRight />
              </Link>

              <a
                className="btn btn--ghost btn--lg"
                href={`https://www.youtube.com/watch?v=${latest.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                ▶ Watch the podcast
              </a>
            </div>
            <p className="hero__tagline">{site.tagline}</p>
          </div>

          <div className="hero__art" aria-hidden="true">
            <div className="hero__circle">
              <Brandmark />
            </div>
            {thoughts.map((t, i) => (
              <span key={t} className={`bubble bubble--${i + 1}`}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Topic ribbon */}
      <div className="ribbon-wrap">
        <div className="ribbon" aria-label="Topics we talk about">
          <div className="ribbon__track">
            {[...topics, ...topics].map((t, i) => (
              <span key={i} aria-hidden={i >= topics.length || undefined}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Sound familiar */}
      <section className="section">
        <div className="container">
          <Reveal className="section__head">
            <p className="eyebrow">Sound familiar?</p>
            <h2 className="section__title">
              It’s not in your head.
              <br />
              And it’s not just you.
            </h2>
            <p className="section__lead">
              Menopause doesn’t arrive all at once, and it looks different for every woman.
            </p>
          </Reveal>
          <div className="grid-3">
            {familiar.map((item, i) => (
              <Reveal key={item.title} delay={i * 60}>
                <div className="card-familiar">
                  <span className="card-familiar__index" aria-hidden="true">0{i + 1}</span>
                  <span className="card-familiar__icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      {familiarIcons[item.icon]}
                    </svg>
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="familiar-close">If you nodded at even one of these, you’re in the right place.</p>
          </Reveal>
        </div>
      </section>

      {/* Podcast */}
      <section className="section section--ink">
        <div className="container podcast-feature">
          <Reveal className="podcast-feature__copy">
            <p className="eyebrow eyebrow--light">The podcast</p>
            <h2 className="section__title">
              Real conversations, minus the awkwardness.
            </h2>
            <p className="section__lead">
              Doctors, experts and real women, talking about menopause the way Indian women actually live it. We ask
              the questions you’re shy to ask, in simple words.
            </p>
            <p className="podcast-feature__note">Every episode adds a page to our menopause dictionary for Indian women.</p>
            <div className="podcast-feature__actions">
              <a href={site.social.youtube} className="btn btn--primary" target="_blank" rel="noopener noreferrer">
                Watch on YouTube <ArrowRight width={18} height={18} />
              </a>
              <Link to="/contact#message" className="podcast-feature__ask">
                Send your question for the next episode
              </Link>
            </div>
          </Reveal>

          <Reveal delay={120} className="podcast-feature__video">
            {latest ? (
              <>
                <p className="podcast-feature__label">Latest episode</p>
                <YouTubeEmbed id={latest.youtubeId} title={latest.title} />
                {more.length > 0 && (
                  <div className="episode-strip">
                    {more.slice(0, 3).map((ep) => (
                      <a
                        key={ep.youtubeId}
                        className="episode-mini"
                        href={`https://www.youtube.com/watch?v=${ep.youtubeId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="episode-mini__thumb">
                          <img src={`https://i.ytimg.com/vi/${ep.youtubeId}/mqdefault.jpg`} alt="" loading="lazy" />
                          <Play width={18} height={18} />
                        </span>
                        <span className="episode-mini__title">{ep.title}</span>
                        {ep.published && (
                          <time className="episode-mini__date" dateTime={ep.published}>
                            {new Date(ep.published).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </time>
                        )}
                      </a>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <a href={site.social.youtube} className="episode-empty" target="_blank" rel="noopener noreferrer">
                <Play width={28} height={28} />
                <span>Watch the Menopause India podcast on YouTube</span>
              </a>
            )}
          </Reveal>
        </div>
      </section>

      {/* Resource Library & Learn Section */}
      <section className="section section--petal">
        <div className="container">
          <Reveal className="section__head section__head--row">
            <div>
              <p className="eyebrow">The Resource Library</p>
              <h2 className="section__title">Guides for your journey.</h2>
            </div>
            <Link to="/learn#resources" className="link-arrow">
              Explore the library <ArrowRight width={18} height={18} />
            </Link>
          </Reveal>

          <div className="grid-3">
            {featuredGuides.map((g, i) => (
              <Reveal key={g.title} delay={i * 80}>
                <article className="home-guide-card">
                  <Link to="/learn#resources" className="home-guide-card__link">
                    <div className={`home-guide-card__art home-guide-card__art--${g.type + 1}`} aria-hidden="true">
                      <ResourceCover type={g.type} />
                      <div className="home-guide-card__badge">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
                          <path d="M6 6h10" />
                          <path d="M6 10h10" />
                        </svg>
                        <span>PDF GUIDE</span>
                      </div>
                    </div>

                    <div className="home-guide-card__body">
                      <div className="home-guide-card__meta">
                        <span className="tag">{g.category}</span>
                        <span className="home-guide-card__status">
                          <span className="home-guide-card__dot" aria-hidden="true" />
                          Coming soon
                        </span>
                      </div>
                      <h3 className="home-guide-card__title">{g.title}</h3>
                      <p className="home-guide-card__desc">{g.description}</p>
                      
                      <div className="home-guide-card__footer">
                        <span className="home-guide-card__action">
                          View in library <ArrowRight width={16} height={16} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <div className="home-journey-companion">
              <div className="home-journey-companion__inner">
                <div className="home-journey-companion__info">
                  <span className="home-journey-companion__badge">3 STAGES</span>
                  <p>From perimenopause to postmenopause, understand your journey at your pace.</p>
                </div>
                <div className="home-journey-companion__steps">
                  {stages.map((st, i) => (
                    <Fragment key={st.name}>
                      {i > 0 && <span className="home-journey-step__arrow" aria-hidden="true">→</span>}
                      <Link to="/learn" className={`home-journey-step${st.milestone ? ' home-journey-step--milestone' : ''}`}>
                        <span className="home-journey-step__head">
                          <span className="home-journey-step__num">0{i + 1}</span>
                          <span>{st.name}</span>
                        </span>
                        <span className="home-journey-step__text">{st.text}</span>
                      </Link>
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mark story */}
      <section className="section">
        <div className="container mark-story">
          <Reveal className="mark-story__art">
            <Brandmark />
          </Reveal>
          <Reveal delay={100} className="mark-story__copy">
            <p className="eyebrow">Why we’re here</p>
            <h2 className="section__title">Built with Indian women, not just for them.</h2>
            <blockquote className="quote">
              Two people reaching for each other, forming an <em>M</em>. One is you. The other is whoever you need that
              day.
            </blockquote>
            <p>
              It started with a conversation with my mother. She didn’t know what was happening to her body, and neither
              did the women around her. So I started asking questions, of doctors, experts and women like her.
              Menopause India is what came out of it, one honest conversation at a time.
            </p>
            <p className="mark-story__signature">Inakshi, founder</p>
            <Link to="/about" className="link-arrow">
              Our story <ArrowRight width={18} height={18} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Community CTA */}
      <section className="section section--tight">
        <div className="container">
          <Reveal className="cta-band">
            <div className="cta-band__copy">
              <h2>Join the conversation.</h2>
              <p>
                Follow us on Instagram for reels and real talk, or get updates straight to your phone. Got a question
                you’re shy to ask? Send it to us, and it could be in our next episode.
              </p>
            </div>
            <div className="cta-band__actions">
              <a href={site.social.instagram} target="_blank" rel="noreferrer" className="btn btn--light btn--lg">
                <Instagram /> {site.social.instagramHandle}
              </a>
              <button className="btn btn--outline-light btn--lg" onClick={() => openLead('home-cta')}>
                <Phone /> Get updates
              </button>
              <Link to="/contact#message" className="cta-band__ask">
                <Mail width={18} height={18} /> Send your question
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
