import { useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import Reveal from '../components/Reveal'
import Brandmark from '../components/Brandmark'
import { useLead } from '../components/LeadModal'
import { ArrowRight } from '../components/Icons'
import { blogs, blogTopics, blogReadingTime } from '../content/blogs'
import BlogArt from '../components/BlogArt'

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
    ? blogs.filter((a) => a.category === activeTopic)
    : blogs

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
            {blogTopics.map((topic) => {
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
              <Reveal key={article.slug} delay={index * 120} className="blog-card-wrap">
                <Link to={`/blogs/${article.slug}`} className="blog-card">
                  <div className={`blog-card-art blog-card-art--${(index % 3) + 1}`} aria-hidden="true">
                    <div className="blog-card-art__svg-wrap">
                      <BlogArt slug={article.slug} className="blog-cover-svg" />
                    </div>
                  </div>

                  <div className="blog-card-body">
                    <span className="blog-category">{article.category}</span>
                    <h3>{article.title}</h3>
                    <p className="blog-card-desc">{article.excerpt}</p>
                    <div className="blog-card-footer">
                      <span className="blog-read-time">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        {blogReadingTime(article)} min read
                      </span>
                      <span className="blog-card-more">
                        Read article <ArrowRight width={16} height={16} />
                      </span>
                    </div>
                  </div>
                </Link>
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
              <button
                type="button"
                onClick={() => openLead('blogs-note')}
                className="btn btn--primary btn--lg blogs-note__btn"
              >
                <span>Get updates</span>
                <ArrowRight />
              </button>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
