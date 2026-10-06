import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { articles, getArticle, readingTime } from '../content/articles'
import { site } from '../site.config'
import { track } from '../lib/analytics'
import { bookSize, bookTone } from '../lib/books'
import Seo from '../components/Seo'
import Brandmark from '../components/Brandmark'
import ArticleCover from '../components/ArticleCover'
import Disclaimer from '../components/Disclaimer'
import NewsletterForm from '../components/NewsletterForm'
import NotFound from './NotFound'
import { ArrowRight, Check, LinkIcon, WhatsApp } from '../components/Icons'

const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
const pad = (n) => String(n).padStart(2, '0')

function Block({ block, index, sectionNumber }) {
  switch (block.type) {
    case 'h2':
      return (
        <h2 id={slugify(block.text)}>
          <span className="read__h2-num" aria-hidden="true">{pad(sectionNumber)}</span>
          {block.text}
        </h2>
      )
    case 'ul':
      return <ul>{block.items.map((i) => <li key={i}>{i}</li>)}</ul>
    case 'callout':
      return (
        <aside className="note">
          <Brandmark className="note__mark" />
          <div>
            <p className="note__label">A gentle note</p>
            <p>{block.text}</p>
          </div>
        </aside>
      )
    default:
      return <p className={index === 0 ? 'read__lead' : undefined}>{block.text}</p>
  }
}

// The article shown as the book you just took off the shelf.
function BookCover({ article, index }) {
  return (
    <div className="bookcover" aria-hidden="true">
      <div className={`bookcover__book ${bookTone(index)}`}>
        <ArticleCover article={article} />
        <div className="bookcover__face">
          <span className="bookcover__num">Book {pad(index + 1)}</span>
          <span className="bookcover__title">{article.short || article.title}</span>
          <span className="bookcover__brand">
            <Brandmark /> Menopause India
          </span>
        </div>
      </div>
      <div className="bookcover__shadow" />
    </div>
  )
}

function ShareButtons({ article, url, compact = false }) {
  const [copied, setCopied] = useState(false)

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      track('share', { method: 'copy_link', item_id: article.slug })
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div className={`share-btns ${compact ? 'share-btns--compact' : ''}`}>
      <a
        className="btn btn--sm btn--whatsapp"
        href={`https://wa.me/?text=${encodeURIComponent(`${article.title} ${url}`)}`}
        target="_blank"
        rel="noreferrer"
        onClick={() => track('share', { method: 'whatsapp', item_id: article.slug })}
      >
        <WhatsApp width={18} height={18} /> {compact ? 'WhatsApp' : 'Share on WhatsApp'}
      </a>
      <button className="btn btn--sm btn--ghost" onClick={copyLink}>
        {copied ? <Check width={18} height={18} /> : <LinkIcon width={18} height={18} />} {copied ? 'Copied!' : 'Copy link'}
      </button>
    </div>
  )
}

function Feedback({ slug }) {
  const [answer, setAnswer] = useState(null)
  useEffect(() => setAnswer(null), [slug])

  function vote(helpful) {
    setAnswer(helpful)
    track('article_feedback', { item_id: slug, helpful })
  }

  return (
    <div className="finish">
      <Brandmark className="finish__mark" animated />
      <div className="finish__text">
        <p className="finish__title">That’s one off the shelf.</p>
        {answer === null ? (
          <div className="finish__ask">
            <span>Was this helpful?</span>
            <button className="finish__btn" onClick={() => vote(true)}>Yes, it was</button>
            <button className="finish__btn" onClick={() => vote(false)}>Not really</button>
          </div>
        ) : (
          <p className="finish__thanks" role="status">
            {answer
              ? 'Thank you! It means a lot to us.'
              : 'Thank you for telling us. We’d love to know what was missing. Send us a DM on Instagram.'}
          </p>
        )}
      </div>
    </div>
  )
}

export default function Article() {
  const { slug } = useParams()
  const article = getArticle(slug)
  const index = articles.findIndex((a) => a.slug === slug)
  const bodyRef = useRef(null)
  const [progress, setProgress] = useState(0)

  const sections = useMemo(
    () => (article ? article.body.filter((b) => b.type === 'h2').map((b) => ({ id: slugify(b.text), text: b.text })) : []),
    [article],
  )

  // Reading progress across the article body.
  useEffect(() => {
    function onScroll() {
      const el = bodyRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const total = rect.height - window.innerHeight * 0.6
      const value = Math.min(1, Math.max(0, -rect.top / Math.max(total, 1) + 0.04))
      setProgress(value)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [slug])

  // Glide to a section, stopping just below the sticky header.
  function goToSection(e, id) {
    const el = document.getElementById(id)
    if (!el) return
    e.preventDefault()
    const headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h'), 10) || 0
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - headerH - 28, behavior: 'smooth' })
  }

  if (!article) return <NotFound />

  const url = `${site.url}/learn/${article.slug}`
  const next = articles[(index + 1) % articles.length]
  const others = articles.map((a, i) => ({ a, i })).filter(({ a }) => a.slug !== article.slug && a.slug !== next.slug)
  let h2Count = 0

  return (
    <>
      <Seo
        title={article.title}
        description={article.excerpt}
        path={`/learn/${article.slug}`}
        type="article"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: article.title,
          description: article.excerpt,
          articleSection: article.category,
          mainEntityOfPage: url,
          author: { '@type': 'Organization', name: site.name },
          publisher: { '@type': 'Organization', name: site.name, logo: { '@type': 'ImageObject', url: `${site.url}/brand/brandmark.png` } },
        }}
      />

      <div className="read-progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${progress})` }} />
      </div>

      <article className="read" key={article.slug}>
        {/* Header */}
        <header className="read__hero">
          <div className="container read__hero-grid">
            <div className="read__hero-copy">
              <Link to="/learn#library" className="read__back">
                <ArrowRight width={16} height={16} /> Back to the library
              </Link>
              <p className="read__kicker">
                <span className="tag">{article.category}</span>
                <span>{readingTime(article)} min read</span>
                <span aria-hidden="true">·</span>
                <span>Book {pad(index + 1)} of {pad(articles.length)}</span>
              </p>
              <h1 className="read__title">{article.title}</h1>
              <p className="read__excerpt">{article.excerpt}</p>
              <p className="read__byline">
                <Brandmark className="read__byline-mark" />
                By the {site.name} team
              </p>
            </div>
            <BookCover article={article} index={index} />
          </div>
        </header>

        {/* Body */}
        <div className="container read__layout">
          <div className="read__main" ref={bodyRef}>
            <nav className="chapters" aria-label="In this article">
              <p className="chapters__label">
                In this article <span>{sections.length} sections · {readingTime(article)} min</span>
              </p>
              <ol className="chapters__list">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} onClick={(e) => goToSection(e, s.id)}>
                      <span className="chapters__num">{pad(i + 1)}</span>
                      <span className="chapters__text">{s.text}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="read__body">
              {article.body.map((b, i) => (
                <Block key={i} block={b} index={i} sectionNumber={b.type === 'h2' ? ++h2Count : 0} />
              ))}
            </div>

            <Feedback slug={article.slug} />

            <div className="read__share">
              <span>Know someone who’d find this useful?</span>
              <ShareButtons article={article} url={url} />
            </div>

            <Disclaimer className="disclaimer--boxed" />
          </div>
        </div>
      </article>

      {/* What next */}
      <section className="section read-next">
        <div className="container">
          <p className="eyebrow">Next on the shelf</p>
          <Link to={`/learn/${next.slug}`} className="next-card">
            <ArticleCover article={next} />
            <div className="next-card__body">
              <p className="card__meta">
                <span className="tag">{next.category}</span>
                <span>{readingTime(next)} min read</span>
              </p>
              <h2 className="next-card__title">{next.title}</h2>
              <p className="next-card__excerpt">{next.excerpt}</p>
              <span className="btn btn--primary next-card__cta">
                Read next <ArrowRight />
              </span>
            </div>
          </Link>

          <div className="mini-shelf">
            <div className="mini-shelf__head">
              <h2>Or pick another</h2>
              <Link to="/learn#library" className="link-arrow">
                Whole library <ArrowRight width={18} height={18} />
              </Link>
            </div>
            <div className="mini-shelf__books">
              {others.map(({ a, i }) => {
                const size = bookSize(i)
                return (
                  <Link
                    key={a.slug}
                    to={`/learn/${a.slug}`}
                    className={`book ${bookTone(i)}`}
                    style={{ '--w': `${size.w}px`, '--g': size.w, '--h': `${size.h}px` }}
                    title={a.title}
                    aria-label={a.title}
                  >
                    <span className="book__num">{pad(i + 1)}</span>
                    <span className="book__title">{a.short || a.title}</span>
                    <Brandmark className="book__mark" />
                  </Link>
                )
              })}
            </div>
            <div className="shelf__plank" aria-hidden="true" />
          </div>

          <div className="read__newsletter">
            <div>
              <h2>Liked this? Get the next one by email.</h2>
              <p>New reads and podcast episodes, now and then. Never spam.</p>
            </div>
            <NewsletterForm source={`article:${article.slug}`} />
          </div>
        </div>
      </section>
    </>
  )
}
