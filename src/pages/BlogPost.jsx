import { Fragment, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { blogs, getBlog, blogReadingTime } from '../content/blogs'
import { site } from '../site.config'
import Seo from '../components/Seo'
import Brandmark from '../components/Brandmark'
import Disclaimer from '../components/Disclaimer'
import NewsletterForm from '../components/NewsletterForm'
import NotFound from './NotFound'
import { ArrowRight } from '../components/Icons'

const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
const pad = (n) => String(n).padStart(2, '0')
const plain = (text) => text.replace(/\*\*/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')

// Renders **bold** and [text](/path) inside a paragraph.
function Inline({ text }) {
  return text.split(/(\*\*.+?\*\*)/g).map((part, i) => {
    const bold = part.startsWith('**') && part.endsWith('**')
    const inner = (bold ? part.slice(2, -2) : part).split(/(\[[^\]]+\]\([^)]+\))/g).map((bit, j) => {
      const m = bit.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
      return m ? <Link key={j} to={m[2]}>{m[1]}</Link> : <Fragment key={j}>{bit}</Fragment>
    })
    return bold ? <strong key={i}>{inner}</strong> : <Fragment key={i}>{inner}</Fragment>
  })
}

// Pulls question/answer pairs from the FAQ section for structured data.
function faqFrom(body) {
  const start = body.findIndex((b) => b.type === 'h2' && b.text.startsWith('Frequently asked'))
  if (start < 0) return []
  const faqs = []
  for (let i = start + 1; i < body.length && body[i].type !== 'h2'; i++) {
    if (body[i].type === 'h3' && body[i + 1]?.type === 'p') faqs.push({ q: body[i].text, a: plain(body[i + 1].text) })
  }
  return faqs
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = getBlog(slug)

  const sections = useMemo(
    () => (post ? post.body.filter((b) => b.type === 'h2').map((b) => ({ id: slugify(b.text), text: b.text })) : []),
    [post],
  )

  if (!post) return <NotFound />

  const url = `${site.url}/blogs/${post.slug}`
  const minutes = blogReadingTime(post)
  const faqs = faqFrom(post.body)
  const others = blogs.filter((b) => b.slug !== post.slug)
  let h2Count = 0

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      articleSection: post.category,
      keywords: post.keywords.join(', '),
      mainEntityOfPage: url,
      author: { '@type': 'Organization', name: site.name },
      publisher: { '@type': 'Organization', name: site.name, logo: { '@type': 'ImageObject', url: `${site.url}/brand/brandmark.png` } },
    },
  ]
  if (faqs.length) {
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    })
  }

  return (
    <>
      <Seo title={post.seoTitle} description={post.excerpt} path={`/blogs/${post.slug}`} type="article" jsonLd={jsonLd} />

      <article className="read" key={post.slug}>
        <header className="read__hero">
          <div className="container">
            <div className="read__hero-copy">
              <Link to="/blogs" className="read__back">
                <ArrowRight width={16} height={16} /> Back to the blog
              </Link>
              <p className="read__kicker">
                <span className="tag">{post.category}</span>
                <span>{minutes} min read</span>
              </p>
              <h1 className="read__title">{post.title}</h1>
              <p className="read__excerpt">{post.excerpt}</p>
              <p className="read__byline">
                <Brandmark className="read__byline-mark" />
                By the {site.name} team
              </p>
            </div>
          </div>
        </header>

        <div className="container read__layout">
          <div className="read__main">
            <nav className="chapters" aria-label="In this article">
              <p className="chapters__label">
                In this article <span>{sections.length} sections · {minutes} min</span>
              </p>
              <ol className="chapters__list">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`}>
                      <span className="chapters__num">{pad(i + 1)}</span>
                      <span className="chapters__text">{s.text}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="read__body">
              {post.body.map((b, i) => {
                if (b.type === 'h2') {
                  return (
                    <h2 key={i} id={slugify(b.text)}>
                      <span className="read__h2-num" aria-hidden="true">{pad(++h2Count)}</span>
                      {b.text}
                    </h2>
                  )
                }
                if (b.type === 'h3') return <h3 key={i}>{b.text}</h3>
                return (
                  <p key={i} className={i === 0 ? 'read__lead' : undefined}>
                    <Inline text={b.text} />
                  </p>
                )
              })}

              {post.references.length > 0 && (
                <section className="read__refs" aria-labelledby="medical-references">
                  <h2 id="medical-references">Medical references</h2>
                  <ol>
                    {post.references.map((r) => (
                      <li key={r.url}>
                        <a href={r.url} target="_blank" rel="noreferrer">{r.label}</a>
                      </li>
                    ))}
                  </ol>
                </section>
              )}
            </div>

            <Disclaimer className="disclaimer--boxed" />
          </div>
        </div>
      </article>

      <section className="section read-next">
        <div className="container">
          <p className="eyebrow">More from the blog</p>
          <div className="blog-more">
            {others.map((b) => (
              <Link key={b.slug} to={`/blogs/${b.slug}`} className="blog-more__card">
                <span className="blog-category">{b.category}</span>
                <h3>{b.title}</h3>
                <span className="blog-more__cta">
                  Read article <ArrowRight width={16} height={16} />
                </span>
              </Link>
            ))}
          </div>

          <div className="read__newsletter">
            <div>
              <h2>Liked this? Get the next one by email.</h2>
              <p>New reads and podcast episodes, now and then. Never spam.</p>
            </div>
            <NewsletterForm source={`blog:${post.slug}`} />
          </div>
        </div>
      </section>
    </>
  )
}
