import { Link } from 'react-router-dom'
import { articles } from '../content/articles'
import { episodes, site } from '../site.config'
import Seo from '../components/Seo'
import Brandmark from '../components/Brandmark'
import Reveal from '../components/Reveal'
import ArticleCard from '../components/ArticleCard'
import YouTubeEmbed from '../components/YouTubeEmbed'
import { useLead } from '../components/LeadModal'
import { ArrowRight, Instagram, Phone, Play } from '../components/Icons'

const thoughts = ['Hot flushes?', 'Can’t sleep?', 'Brain fog?', 'Mood swings?', 'Is this normal?']

const topics = ['Perimenopause', 'Hot flushes', 'Sleep', 'Mood', 'Strength', 'Bone health', 'Brain fog', 'Relationships', 'Doctor visits', 'Self-care']

const familiar = [
  { title: 'Periods acting differently', text: 'Closer together, further apart, heavier or lighter than before.', slug: 'perimenopause-menopause-postmenopause' },
  { title: 'Sudden waves of heat', text: 'Hot flushes by day, night sweats that wake you up.', slug: 'hot-flushes-practical-tips' },
  { title: 'Lying awake at 3 a.m.', text: 'Falling asleep is fine. Staying asleep is another story.', slug: 'sleep-mood-and-menopause' },
  { title: 'Feeling not like yourself', text: 'Irritable, anxious or teary, without a clear reason.', slug: 'sleep-mood-and-menopause' },
  { title: 'Words on the tip of your tongue', text: 'Losing your train of thought more often than you used to.', slug: 'signs-of-perimenopause' },
  { title: 'Aches and less strength', text: 'Stiff joints, and lifting things feels harder than it should.', slug: 'strength-training-after-40' },
]

export default function Home() {
  const { openLead } = useLead()
  const latest = episodes[0]
  const featured = articles.filter((a) => a.featured).slice(0, 3)

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
              <Link to="/learn" className="btn btn--primary btn--lg">
                Start learning <ArrowRight />
              </Link>
              <Link to="/podcast" className="btn btn--ghost btn--lg">
                <Play width={16} height={16} /> Watch the podcast
              </Link>
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
            <h2 className="section__title">You’re not imagining it.</h2>
            <p className="section__lead">
              Many changes in your late 30s, 40s and 50s can be linked to shifting hormones, and they’re rarely talked
              about at home. Tap one to learn more.
            </p>
          </Reveal>
          <div className="familiar">
            {familiar.map((f, i) => (
              <Reveal key={f.title} delay={i * 60}>
                <Link to={`/learn/${f.slug}`} className="familiar__card">
                  <span className="familiar__num">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                  <span className="familiar__arrow"><ArrowRight width={18} height={18} /></span>
                </Link>
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
            <h2 className="section__title">Real conversations, minus the awkwardness.</h2>
            <p className="section__lead">
              Menopause, explained in everyday language. Practical talks on fitness, health, emotions and
              everything in between.
            </p>
            <div className="podcast-feature__latest">
              <span className="label">Latest episode</span>
              <strong>{latest.title}</strong>
            </div>
            <Link to="/podcast" className="btn btn--light">
              All episodes <ArrowRight />
            </Link>
          </Reveal>
          <Reveal delay={120} className="podcast-feature__video">
            <YouTubeEmbed id={latest.youtubeId} title={latest.title} />
          </Reveal>
        </div>
      </section>

      {/* Articles */}
      <section className="section section--petal">
        <div className="container">
          <Reveal className="section__head section__head--row">
            <div>
              <p className="eyebrow">Learn</p>
              <h2 className="section__title">Start here.</h2>
            </div>
            <Link to="/learn" className="link-arrow">
              See all articles <ArrowRight width={18} height={18} />
            </Link>
          </Reveal>
          <div className="grid-3">
            {featured.map((a, i) => (
              <Reveal key={a.slug} delay={i * 80}>
                <ArticleCard article={a} />
              </Reveal>
            ))}
          </div>
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
