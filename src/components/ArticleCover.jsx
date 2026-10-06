import { articles } from '../content/articles'

// Illustrated covers built from the brandmark's shapes, so articles look on-brand without stock photos.
const themes = [
  { bg: 'var(--petal)', a: 'var(--blush)', b: 'var(--rose)' },
  { bg: '#fde3ec', a: 'var(--rose)', b: 'var(--ink)' },
  { bg: 'var(--ink)', a: 'var(--rose)', b: 'var(--blush)' },
  { bg: '#ffd6e5', a: '#fff', b: 'var(--rose)' },
  { bg: 'var(--cream-deep)', a: 'var(--blush)', b: 'var(--rose-deep)' },
  { bg: 'var(--rose)', a: 'var(--blush)', b: '#fff' },
]

export default function ArticleCover({ article, large = false }) {
  const i = Math.max(0, articles.findIndex((a) => a.slug === article.slug))
  const t = themes[i % themes.length]
  return (
    <div className={`cover ${large ? 'cover--large' : ''}`} style={{ background: t.bg }} aria-hidden="true">
      <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice">
        {i % 3 === 0 && (
          <>
            <ellipse cx="300" cy="70" rx="46" ry="54" fill={t.a} />
            <path d="M255 132H345V260H255Z" fill={t.a} />
            <path d="M255 132L180 220L210 245L255 196Z" fill={t.b} />
            <circle cx="90" cy="180" r="70" fill={t.b} opacity="0.18" />
          </>
        )}
        {i % 3 === 1 && (
          <>
            <circle cx="110" cy="120" r="78" fill={t.a} opacity="0.9" />
            <circle cx="210" cy="120" r="78" fill={t.b} opacity="0.75" />
            <ellipse cx="320" cy="60" rx="24" ry="28" fill={t.a} />
          </>
        )}
        {i % 3 === 2 && (
          <>
            <path d="M40 260V110L140 190L240 110V260" fill="none" stroke={t.a} strokeWidth="44" strokeLinejoin="round" />
            <ellipse cx="320" cy="80" rx="40" ry="46" fill={t.b} />
            <ellipse cx="282" cy="56" rx="22" ry="26" fill={t.b} />
          </>
        )}
      </svg>
    </div>
  )
}
