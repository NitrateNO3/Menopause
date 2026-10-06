import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import Brandmark from '../components/Brandmark'

export default function NotFound() {
  return (
    <section className="not-found">
      <Seo title="Page not found" />
      <meta name="robots" content="noindex" />
      <div className="container not-found__inner">
        <Brandmark className="not-found__mark" />
        <h1>We couldn’t find that page.</h1>
        <p>It may have moved. Let’s get you back on track.</p>
        <div className="hero__actions">
          <Link to="/" className="btn btn--primary">Go home</Link>
          <Link to="/learn" className="btn btn--ghost">Browse articles</Link>
        </div>
      </div>
    </section>
  )
}
