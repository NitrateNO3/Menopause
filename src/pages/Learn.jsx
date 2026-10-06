import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { articles, categories, getArticle, readingTime } from '../content/articles'
import { feelings, stages, throughout } from '../content/learnPaths'
import { site } from '../site.config'
import { track } from '../lib/analytics'
import { bookSize, bookTone } from '../lib/books'
import Seo from '../components/Seo'
import Reveal from '../components/Reveal'
import Brandmark from '../components/Brandmark'
import ArticleCover from '../components/ArticleCover'
import Disclaimer from '../components/Disclaimer'
import { ArrowRight, Instagram, Search } from '../components/Icons'

const ALL = 'All'
const usedCategories = categories.filter((c) => articles.some((a) => a.category === c))
const numberOf = (slug) => String(articles.findIndex((a) => a.slug === slug) + 1).padStart(2, '0')

/* ---------- 1. "Lately, I've been…" ---------- */

function FeelingPicker() {
  const [picked, setPicked] = useState(null)
  const answerRef = useRef(null)
  const feeling = feelings.find((f) => f.id === picked)

  function pick(f) {
    setPicked(f.id)
    track('learn_feeling', { feeling: f.id })
    // On phones the answer sits below the options, so bring it into view.
    if (window.matchMedia('(max-width: 900px)').matches) {
      setTimeout(() => answerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50)
    }
  }

  return (
    <section className="feel">
      <div className="feel__bg" aria-hidden="true" />
      <div className="container feel__grid">
        <div className="feel__ask">
          <p className="eyebrow">Learn</p>
          <h1 className="feel__lead">
            Lately, <br className="feel__br" />
            I’ve been<span className="feel__dots">…</span>
          </h1>
          <div className="feel__options" role="group" aria-label="Choose what sounds like you">
            {feelings.map((f, i) => (
              <button
                key={f.id}
                className={`feel__option ${picked === f.id ? 'is-picked' : ''}`}
                aria-pressed={picked === f.id}
                onClick={() => pick(f)}
                style={{ animationDelay: `${150 + i * 60}ms` }}
              >
                {f.phrase}
              </button>
            ))}
          </div>
          <p className="feel__or">
            Or <a href="#journey">find yourself on the map</a>, or <a href="#library">browse all {articles.length} articles</a>.
          </p>
        </div>

        <div className="feel__answer" ref={answerRef} aria-live="polite">
          {feeling ? (
            <div className="answer" key={feeling.id}>
              <p className="answer__echo">“Lately, I’ve been {feeling.phrase}.”</p>
              <p className="answer__reply">{feeling.reply}</p>
              <p className="answer__label">Read next</p>
              <ul className="answer__reads">
                {feeling.slugs.map(getArticle).map((a) => (
                  <li key={a.slug}>
                    <Link to={`/learn/${a.slug}`} className="mini">
                      <span className="mini__thumb"><ArticleCover article={a} /></span>
                      <span className="mini__text">
                        <strong>{a.title}</strong>
                        <span>{a.category} · {readingTime(a)} min read</span>
                      </span>
                      <ArrowRight className="mini__arrow" width={18} height={18} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="answer answer--empty">
              <Brandmark animated className="answer__mark" />
              <p>
                Tap whatever sounds like you. <br />
                We’ll point you to the right read.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

/* ---------- 2. The journey map ---------- */

function StageLinks({ slugs }) {
  return (
    <ul className="journey__reads">
      {slugs.map(getArticle).map((a) => (
        <li key={a.slug}>
          <Link to={`/learn/${a.slug}`} title={a.title}>
            <span className="journey__num">{numberOf(a.slug)}</span>
            <span className="journey__label">{a.short || a.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}

const totalSize = stages.reduce((sum, s) => sum + s.size, 0)

// How far the lit-up track reaches for the chosen stage, as CSS variables
// (fraction of the free width before the stage's marker, plus gaps crossed).
function fillFor(index) {
  if (index < 0) return { '--f': 0, '--i': 0, '--extra': '0px' }
  const stage = stages[index]
  const before = stages.slice(0, index).reduce((sum, s) => sum + s.size, 0)
  return {
    '--f': (before + (stage.point ? stage.size / 2 : 0)) / totalSize,
    '--i': index,
    '--extra': stage.point ? '0px' : '30px',
  }
}

function HereButton({ active, onClick }) {
  return (
    <button className={`stage__here ${active ? 'is-active' : ''}`} aria-pressed={active} onClick={onClick}>
      <span className="stage__radio" aria-hidden="true" />
      {active ? 'You’re here' : 'I’m here'}
    </button>
  )
}

function Journey() {
  const [here, setHere] = useState(null)
  const [view, setView] = useState(0) // which card is in view on phones
  const rowRef = useRef(null)
  const hereIndex = stages.findIndex((s) => s.id === here)

  function toggle(id) {
    const next = here === id ? null : id
    setHere(next)
    if (next) track('learn_stage', { stage: next })
  }

  // Phones: the stages sit in a swipeable row; keep the step dots in sync with it.
  function onRowScroll() {
    const row = rowRef.current
    const card = row?.firstElementChild
    if (!card) return
    setView(Math.round(row.scrollLeft / (card.offsetWidth + 12)))
  }

  function goTo(i) {
    const row = rowRef.current
    const card = row?.children[i]
    if (card) row.scrollTo({ left: card.offsetLeft - row.offsetLeft, behavior: 'smooth' })
  }

  return (
    <section className="journey" id="journey">
      <Brandmark className="journey__watermark" />
      <div className="container journey__inner">
        <div className="journey__head">
          <div>
            <p className="eyebrow eyebrow--light">The journey</p>
            <h2 className="journey__title">Find yourself on the map.</h2>
          </div>
          <p className="journey__lead">
            <span className="journey__lead-text">
              Menopause itself is a single day. What most women feel happens in the years around it.{' '}
            </span>
            <span className="journey__hint">
              <span className="journey__hint-dot" aria-hidden="true" />
              Tap <strong>I’m here</strong> on the stage that sounds like you.
            </span>
          </p>
        </div>

        <div className="journey__steps" role="tablist" aria-label="Stages">
          {stages.map((s, i) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={view === i}
              className={`journey__step ${view === i ? 'is-view' : ''} ${here === s.id ? 'is-here' : ''} ${s.point ? 'is-point' : ''}`}
              onClick={() => goTo(i)}
            >
              <span className="journey__step-dot" aria-hidden="true" />
              {s.name}
            </button>
          ))}
        </div>

        <Reveal
          className={`journey__map ${here ? 'has-here' : ''}`}
          style={{ '--cols': stages.map((s) => `${s.size}fr`).join(' '), '--n': stages.length }}
        >
          <div className="journey__track" aria-hidden="true">
            <span className="journey__fill" style={fillFor(hereIndex)} />
            <span className="journey__spark" />
          </div>

          <div className="journey__row" ref={rowRef} onScroll={onRowScroll}>
            {stages.map((s, i) => {
              const active = here === s.id
              const state = active ? 'is-here' : here ? 'is-dim' : ''
              const bubble = active && <span className="stage__bubble">You are here</span>

              if (s.point) {
                return (
                  <div key={s.id} className={`stage-point ${state}`} style={{ '--i': i }}>
                    <span className="stage__marker stage__marker--point" aria-hidden="true">{bubble}</span>
                    <span className="stage-point__beam" aria-hidden="true" />
                    <p className="journey__when">{s.when}</p>
                    <h3 className="stage-point__name">{s.name}</h3>
                    <p className="journey__text">{s.text}</p>
                    <HereButton active={active} onClick={() => toggle(s.id)} />
                  </div>
                )
              }

              return (
                <article key={s.id} className={`stage ${state}`} style={{ '--i': i }}>
                  <span className="stage__marker" aria-hidden="true">{bubble}</span>
                  <span className="stage__ghost" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <p className="journey__when">{s.when}</p>
                  <h3 className="journey__name">{s.name}</h3>
                  <p className="journey__text">{s.text}</p>
                  <StageLinks slugs={s.slugs} />
                  <HereButton active={active} onClick={() => toggle(s.id)} />
                </article>
              )
            })}
          </div>

          <div className="journey__throughout">
            <Brandmark className="journey__throughout-mark" />
            <div className="journey__throughout-text">
              <h3>{throughout.name}</h3>
              <p>For the people around you, and your doctor.</p>
            </div>
            <StageLinks slugs={throughout.slugs} />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------- 3. The library ---------- */

function Mug() {
  return (
    <svg className="mug" viewBox="0 0 64 76" aria-hidden="true">
      <path className="mug__steam" d="M22 22c-4-5 4-8 0-14" />
      <path className="mug__steam mug__steam--2" d="M32 22c-4-5 4-8 0-14" />
      <path className="mug__steam mug__steam--3" d="M42 22c-4-5 4-8 0-14" />
      <path d="M50 40h4a9 9 0 0 1 0 18h-5" fill="none" stroke="var(--rose-deep)" strokeWidth="5" />
      <rect x="12" y="30" width="40" height="44" rx="9" fill="var(--rose-deep)" />
      <rect x="12" y="30" width="40" height="8" rx="4" fill="var(--rose)" />
    </svg>
  )
}

function Library() {
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(articles[0].slug)
  const ref = useRef(null)
  const deskRef = useRef(null)
  const selectedBeforeTap = useRef(null)

  const topic = usedCategories.includes(params.get('topic')) ? params.get('topic') : ALL
  const q = query.trim().toLowerCase()

  // Deep links like /learn?topic=Symptoms land straight on the filtered library.
  useEffect(() => {
    if (params.get('topic')) setTimeout(() => ref.current?.scrollIntoView({ block: 'start' }), 100)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const matches = useMemo(
    () =>
      new Set(
        articles
          .filter(
            (a) =>
              (topic === ALL || a.category === topic) &&
              (!q || `${a.title} ${a.excerpt} ${a.category}`.toLowerCase().includes(q)),
          )
          .map((a) => a.slug),
      ),
    [topic, q],
  )

  // Keep the preview on a book that matches the current filter.
  useEffect(() => {
    if (matches.size && !matches.has(selected)) setSelected([...matches][0])
  }, [matches, selected])

  const book = getArticle(selected)
  const bookIndex = articles.findIndex((a) => a.slug === selected)

  function onBookClick(e, slug) {
    // Touch screens can't hover: the first tap previews, the second opens.
    // (Focus fires before click, so compare with what was selected when the tap began.)
    if (window.matchMedia('(hover: none)').matches && selectedBeforeTap.current !== slug) {
      e.preventDefault()
      setSelected(slug)
      setTimeout(() => deskRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50)
    }
  }

  return (
    <section className="section library" id="library" ref={ref}>
      <div className="container">
        <div className="library__head">
          <div>
            <p className="eyebrow">The library</p>
            <h2 className="section__title">Take one off the shelf.</h2>
            <p className="library__lead">Short reads you can finish over a cup of chai.</p>
          </div>
          <div className="search library__search">
            <Search />
            <label htmlFor="article-search" className="sr-only">Search the library</label>
            <input
              id="article-search"
              type="search"
              placeholder="Search the library"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="library__topics" role="group" aria-label="Filter by topic">
          {[ALL, ...usedCategories].map((c) => (
            <button
              key={c}
              className={`library__topic ${topic === c ? 'is-active' : ''}`}
              aria-pressed={topic === c}
              onClick={() => setParams(c === ALL ? {} : { topic: c }, { replace: true, preventScrollReset: true })}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="library__room">
          <div className="shelf">
            <div className="shelf__books">
              {articles.map((a, i) => {
                const size = bookSize(i)
                const isMatch = matches.has(a.slug)
                return (
                  <Link
                    key={a.slug}
                    to={`/learn/${a.slug}`}
                    className={`book ${bookTone(i)} ${isMatch ? '' : 'is-out'} ${selected === a.slug ? 'is-selected' : ''}`}
                    style={{ '--w': `${size.w}px`, '--g': size.w, '--h': `${size.h}px` }}
                    aria-label={a.title}
                    tabIndex={isMatch ? 0 : -1}
                    onMouseEnter={() => isMatch && setSelected(a.slug)}
                    onFocus={() => setSelected(a.slug)}
                    onPointerDown={() => (selectedBeforeTap.current = selected)}
                    onClick={(e) => onBookClick(e, a.slug)}
                  >
                    <span className="book__num">{numberOf(a.slug)}</span>
                    <span className="book__title">{a.short || a.title}</span>
                    <Brandmark className="book__mark" />
                  </Link>
                )
              })}
              <div className="shelf__decor" aria-hidden="true">
                <div className="shelf__stack">
                  <span />
                  <span />
                  <span />
                </div>
                <Mug />
              </div>
            </div>
            <div className="shelf__plank" aria-hidden="true" />
            <p className="shelf__hint">
              <span className="shelf__hint--hover">Hover over a book to peek inside, click to read.</span>
              <span className="shelf__hint--touch">Tap a book to peek inside, tap again to read.</span>
            </p>
          </div>

          <div className="desk" ref={deskRef} aria-live="polite">
            {matches.size ? (
              <div className="desk__card" key={book.slug}>
                <ArticleCover article={book} />
                <div className="desk__body">
                  <p className="card__meta">
                    <span className="tag">{book.category}</span>
                    <span>{readingTime(book)} min read</span>
                  </p>
                  <h3 className="desk__title">{book.title}</h3>
                  <p className="desk__excerpt">{book.excerpt}</p>
                  <div className="desk__actions">
                    <Link to={`/learn/${book.slug}`} className="btn btn--primary">
                      Read article <ArrowRight />
                    </Link>
                    <span className="desk__count">
                      Book {String(bookIndex + 1).padStart(2, '0')} of {String(articles.length).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="desk__card desk__card--empty">
                <Brandmark className="desk__empty-mark" />
                <p>No books match that yet. Tell us on Instagram what you’d like us to write about.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Learn() {
  return (
    <>
      <Seo
        title="Learn about menopause"
        path="/learn"
        description="Simple, practical articles on perimenopause, menopause, hot flushes, sleep, mood, strength training and talking to your doctor."
      />

      <FeelingPicker />
      <Journey />
      <Library />

      <section className="section section--tight section--top-tight">
        <div className="container">
          <Reveal className="cta-band">
            <div className="cta-band__copy">
              <h2>Didn’t see your feeling here?</h2>
              <p>Tell us what you’re going through. Many of our articles start with a question from you.</p>
            </div>
            <div className="cta-band__actions">
              <a href={site.social.instagram} target="_blank" rel="noreferrer" className="btn btn--light btn--lg">
                <Instagram /> Ask on Instagram
              </a>
              <Link to="/contact" className="btn btn--outline-light btn--lg">
                Write to us <ArrowRight />
              </Link>
            </div>
          </Reveal>
          <Disclaimer className="disclaimer--boxed" />
        </div>
      </section>
    </>
  )
}
