import { Link } from 'react-router-dom'
import { episodes, site } from '../site.config'
import Seo from '../components/Seo'
import Brandmark from '../components/Brandmark'
import Reveal from '../components/Reveal'
import YouTubeEmbed from '../components/YouTubeEmbed'
import { useLead } from '../components/LeadModal'
import { ArrowRight, Instagram, Phone, Play } from '../components/Icons'

const thoughts = ['Hot flushes?', 'Can’t sleep?', 'Brain fog?', 'Mood swings?', 'Is this normal?']

const topics = ['Perimenopause', 'Hot flushes', 'Sleep', 'Mood', 'Strength', 'Bone health', 'Brain fog', 'Relationships', 'Doctor visits', 'Self-care']

const familiar = [
  { title: 'Periods acting differently', text: 'Closer together, further apart, heavier or lighter than before.'},
  { title: 'Sudden waves of heat', text: 'Hot flushes by day, night sweats that wake you up.' },
  { title: 'Lying awake at 3 a.m.', text: 'Falling asleep is fine. Staying asleep is another story.'},
  { title: 'Feeling not like yourself', text: 'Irritable, anxious or teary, without a clear reason.' },
  { title: 'Words on the tip of your tongue', text: 'Losing your train of thought more often than you used to.' },
  { title: 'Aches and less strength', text: 'Stiff joints, and lifting things feels harder than it should.' },
]

const featuredGuides = [
  {
    title: 'Understanding Menopause',
    category: 'STAGES & CHANGES',
    description: 'A simple guide to the stages, fluctuating hormones, and what to expect throughout midlife.',
    type: 0,
  },
  {
    title: 'Managing Symptoms',
    category: 'COMFORT & CARE',
    description: 'Helpful information about hot flushes, mood changes, joint stiffness, and daily comfort.',
    type: 1,
  },
  {
    title: 'Sleep & Wellbeing',
    category: 'REST & ENERGY',
    description: 'Approachable habits and insights to support deeper sleep, ease anxiety, and restore vitality.',
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
  const latest = episodes[0]

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
              Honest conversations, a podcast and easy-to-read articles to help you understand perimenopause and
              menopause, and feel a lot less alone in it.
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
              It doesn’t all happen at once.
              <br />
              And it doesn’t look the same for everyone.
            </h2>
          </Reveal>
          <div className="grid-3">
            {familiar.map((item, i) => (
              <Reveal key={item.title} delay={i * 60}>
                <div className="card-familiar">
                  <span className="card-familiar__index">0{i + 1}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
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
              Menopause, explained in everyday language. Practical talks on
              fitness, health, emotions and everything in between.
            </p>
            <a
              href={`https://www.youtube.com/watch?v=${latest.youtubeId}`}
              className="btn btn--primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Watch on YouTube <ArrowRight width={18} height={18} />
            </a>
          </Reveal>

          <Reveal delay={120} className="podcast-feature__video">
            <YouTubeEmbed
              id={latest.youtubeId}
              title={latest.title}
            />
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
                  <Link to="/learn" className="home-journey-step">
                    <span className="home-journey-step__num">01</span>
                    <span>Perimenopause</span>
                  </Link>
                  <span className="home-journey-step__arrow" aria-hidden="true">→</span>
                  <Link to="/learn" className="home-journey-step home-journey-step--milestone">
                    <span className="home-journey-step__num">02</span>
                    <span>Menopause</span>
                  </Link>
                  <span className="home-journey-step__arrow" aria-hidden="true">→</span>
                  <Link to="/learn" className="home-journey-step">
                    <span className="home-journey-step__num">03</span>
                    <span>Postmenopause</span>
                  </Link>
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
            <blockquote className="quote">
              Two people reaching for each other, together forming an <em>M</em>. Because nobody should go through
              menopause alone.
            </blockquote>
            <p>
              For too long, menopause in India has been something women deal with quietly. Menopause India is here to
              change that, one honest conversation at a time.
            </p>
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
              <p>Follow along on Instagram for reels, memes and real talk, or get updates straight to your phone.</p>
            </div>
            <div className="cta-band__actions">
              <a href={site.social.instagram} target="_blank" rel="noreferrer" className="btn btn--light btn--lg">
                <Instagram /> {site.social.instagramHandle}
              </a>
              <button className="btn btn--outline-light btn--lg" onClick={() => openLead('home-cta')}>
                <Phone /> Get updates
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
