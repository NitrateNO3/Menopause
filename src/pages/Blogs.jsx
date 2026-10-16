import { useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import Reveal from '../components/Reveal'
import Brandmark from '../components/Brandmark'
import { useLead } from '../components/LeadModal'
import { ArrowRight } from '../components/Icons'

const topics = [
  'Perimenopause',
  'Menopause basics',
  'Sleep & wellbeing',
  'Fitness & nutrition',
]

const articles = [
  {
    category: 'MENOPAUSE BASICS',
    title: 'Understanding Your Menopause Journey',
    description:
      'A simple introduction to perimenopause, menopause and the changes you may experience.',
    readTime: '5 min read',
  },
  {
    category: 'SLEEP & WELLBEING',
    title: 'Making Sense of Sleep Changes',
    description:
      'Explore common sleep challenges during midlife and practical ways to support better rest.',
    readTime: '4 min read',
  },
  {
    category: 'FITNESS & NUTRITION',
    title: 'Small Habits for Feeling Your Best',
    description:
      'Discover approachable habits that can support your wellbeing through midlife.',
    readTime: '6 min read',
  },
]

function BlogArtPattern({ type }) {
  if (type === 0) {
    return (
      <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" className="blog-cover-svg">
        <defs>
          <radialGradient id="art-glow-1" cx="70%" cy="30%" r="60%">
            <stop offset="0%" stopColor="var(--rose)" stopOpacity="0.32" />
            <stop offset="100%" stopColor="var(--rose)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="280" cy="90" r="110" fill="url(#art-glow-1)" />
        <ellipse cx="80" cy="60" rx="60" ry="70" fill="var(--blush)" opacity="0.4" />
        <ellipse cx="320" cy="140" rx="70" ry="80" fill="var(--rose)" opacity="0.22" />
        <path d="M30 170 Q130 110 210 160 T380 130" fill="none" stroke="var(--rose)" strokeWidth="6" strokeLinecap="round" opacity="0.28" />
        <circle cx="150" cy="40" r="12" fill="var(--blush)" opacity="0.6" />
      </svg>
    )
  }
  if (type === 1) {
    return (
      <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" className="blog-cover-svg">
        <defs>
          <radialGradient id="art-glow-2" cx="30%" cy="70%" r="60%">
            <stop offset="0%" stopColor="var(--rose)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--rose)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="120" cy="130" r="110" fill="url(#art-glow-2)" />
        <circle cx="310" cy="60" r="46" fill="var(--blush)" opacity="0.45" />
        <circle cx="90" cy="80" r="68" fill="var(--rose)" opacity="0.22" />
        <path d="M200 30 C270 70 290 150 360 180" fill="none" stroke="var(--blush)" strokeWidth="8" strokeLinecap="round" opacity="0.3" />
        <circle cx="230" cy="160" r="16" fill="var(--rose)" opacity="0.2" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" className="blog-cover-svg">
      <defs>
        <radialGradient id="art-glow-3" cx="70%" cy="70%" r="60%">
          <stop offset="0%" stopColor="var(--rose)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="var(--rose)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="290" cy="130" r="100" fill="url(#art-glow-3)" />
      <ellipse cx="100" cy="120" rx="70" ry="60" fill="var(--blush)" opacity="0.38" />
      <path d="M20 150 Q100 70 180 110 T360 70" fill="none" stroke="var(--rose)" strokeWidth="6" strokeLinecap="round" opacity="0.28" />
      <ellipse cx="280" cy="50" rx="40" ry="45" fill="var(--rose)" opacity="0.2" />
      <circle cx="65" cy="50" r="14" fill="var(--blush)" opacity="0.5" />
    </svg>
  )
}

export default function Blogs() {
  const [activeTopic, setActiveTopic] = useState(null)
  const { openLead } = useLead()

  const handleTopicClick = (topic) => {
    setActiveTopic((prev) => (prev === topic ? null : topic))
    const target = document.getElementById('articles')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const filteredArticles = activeTopic
    ? articles.filter((a) => a.category.toLowerCase() === activeTopic.toLowerCase())
    : articles

  return (
    <div className="blogs-page">
      <Seo
        title="Blog"
        path="/blogs"
        description="Honest, easy-to-understand reads about menopause, midlife and feeling more informed at every stage."
      />

      <section className="blogs-hero">
        <div className="blogs-hero__bg" aria-hidden="true">
          <span className="blob blogs-hero__blob blogs-hero__blob--1" />
          <span className="blob blogs-hero__blob blogs-hero__blob--2" />
        </div>
        <div className="container blogs-hero__grid">
          <div className="blogs-hero__copy">
            <p className="eyebrow">THE MENOPAUSE INDIA BLOG</p>
            <h1>
              Knowledge for your
              <br />
              <em>next chapter.</em>
            </h1>
            <p className="blogs-intro">
              Honest, easy-to-understand reads about menopause,
              midlife and feeling more informed at every stage.
            </p>
          </div>

          <div className="blogs-hero__art" aria-hidden="true">
            <span className="blogs-hero__ring" />
            <div className="blogs-hero__circle">
              <Brandmark animated />
            </div>
            <div className="blogs-hero__badge">
              <span className="blogs-hero__badge-dot" />
              <span>m.</span>
            </div>
          </div>
        </div>
      </section>

      <section className="blogs-content container">
        <div className="blog-topics-wrap">
          <p className="eyebrow">EXPLORE BY TOPIC</p>
          <div className="blog-topics" role="tablist" aria-label="Explore by topic">
            {topics.map((topic) => {
              const isActive = activeTopic === topic
              return (
                <button
                  key={topic}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`blog-topic ${isActive ? 'is-active' : ''}`}
                  onClick={() => handleTopicClick(topic)}
                >
                  <span className="blog-topic__dot" aria-hidden="true" />
                  {topic}
                </button>
              )
            })}
          </div>
        </div>

        <Reveal className="blogs-heading" id="articles">
          <div>
            <p className="eyebrow">READ, LEARN, FEEL EMPOWERED</p>
            <h2>Stories and guidance for you.</h2>
          </div>
          {activeTopic && (
            <button
              type="button"
              onClick={() => setActiveTopic(null)}
              className="blog-reset-filter"
            >
              Show all topics &times;
            </button>
          )}
        </Reveal>

        <div className="blog-grid">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article, index) => (
              <Reveal key={article.title} delay={index * 120} className="blog-card-wrap">
                <article className="blog-card">
                  <div className={`blog-card-art blog-card-art--${(index % 3) + 1}`} aria-hidden="true">
                    <div className="blog-card-art__svg-wrap">
                      <BlogArtPattern type={index % 3} />
                    </div>
                    <div className="blog-card-art__badge">
                      <span>m.</span>
                    </div>
                  </div>

                  <div className="blog-card-body">
                    <span className="blog-category">{article.category}</span>
                    <h3>{article.title}</h3>
                    <p className="blog-card-desc">{article.description}</p>
                    <div className="blog-card-footer">
                      <span className="blog-read-time">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        {article.readTime}
                      </span>
                      <span className="blog-coming-soon">
                        <span className="blog-coming-soon__dot" aria-hidden="true" />
                        Article coming soon
                      </span>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))
          ) : (
            <div className="blog-empty">
              <p className="blog-empty__title">Articles on {activeTopic} are coming soon.</p>
              <p className="blog-empty__text">We are preparing thoughtful stories and guidance for this topic.</p>
              <button type="button" onClick={() => setActiveTopic(null)} className="btn btn--ghost btn--sm">
                View all articles
              </button>
            </div>
          )}
        </div>

        <Reveal delay={150}>
          <div className="blogs-note">
            <div className="blogs-note__bg-art" aria-hidden="true">
              <Brandmark />
            </div>
            <div className="blogs-note__copy">
              <h2>More conversations, less confusion.</h2>
              <p>
                We're building a thoughtful library of resources
                to help you navigate menopause with confidence.
              </p>
            </div>
            <div className="blogs-note__action">
              <Link
                to="/#contact"
                onClick={() => openLead('blogs-note')}
                className="btn btn--primary btn--lg blogs-note__btn"
              >
                <span>Get updates</span>
                <ArrowRight />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
