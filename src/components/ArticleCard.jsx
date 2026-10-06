import { Link } from 'react-router-dom'
import { readingTime } from '../content/articles'
import ArticleCover from './ArticleCover'
import { ArrowRight } from './Icons'

export default function ArticleCard({ article }) {
  return (
    <article className="card">
      <Link to={`/learn/${article.slug}`} className="card__link">
        <ArticleCover article={article} />
        <div className="card__body">
          <p className="card__meta">
            <span className="tag">{article.category}</span>
            <span>{readingTime(article)} min read</span>
          </p>
          <h3 className="card__title">{article.title}</h3>
          <p className="card__excerpt">{article.excerpt}</p>
          <span className="card__more">Read article <ArrowRight width={16} height={16} /></span>
        </div>
      </Link>
    </article>
  )
}
