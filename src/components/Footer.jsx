import { Link } from 'react-router-dom'
import { episodes, nav, site } from '../site.config'
import NewsletterForm from './NewsletterForm'
import Disclaimer from './Disclaimer'
import { Instagram, YouTube } from './Icons'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__newsletter">
          <div>
            <p className="eyebrow">Newsletter</p>
            <h2 className="footer__heading">Good-to-know, straight to your inbox.</h2>
            <p>New articles and podcast episodes, written for women navigating midlife in India.</p>
          </div>
          <NewsletterForm source="footer" />
        </div>

        <div className="footer__grid">
          <div className="footer__brand">
            <img src="/brand/logo-primary-tagline.png" alt="Menopause India: Unpause India" width="320" height="80" loading="lazy" />
            <p>Menopause support for Indian women 35+.</p>
          </div>
          <div>
            <h3 className="footer__title">Explore</h3>
            <ul className="footer__links">
              {nav.map((n) => (
                <li key={n.to}><Link to={n.to}>{n.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="footer__title">Follow</h3>
            <ul className="footer__links">
              <li>
                <a href={site.social.instagram} target="_blank" rel="noreferrer">
                  <Instagram width={18} height={18} /> Instagram
                </a>
              </li>
              <li>
                <a href={`https://www.youtube.com/watch?v=${episodes[0].youtubeId}`} target="_blank" rel="noreferrer">
                  <YouTube width={18} height={18} /> Podcast on YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <Disclaimer />
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
