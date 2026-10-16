import { Link } from 'react-router-dom'
import { articles } from '../content/articles'
import { episodes, site } from '../site.config'
import { bookSize, bookTone } from '../lib/books'
import Seo from '../components/Seo'
import Brandmark from '../components/Brandmark'
import Reveal from '../components/Reveal'
import { ArrowRight, Check, Close, Instagram } from '../components/Icons'

const brushOffs = ['“It’s just the weather.”', '“You’re just stressed.”', '“That’s just age.”', '“Adjust kar lo.”']

const promises = [
  'Keep things simple, honest and easy to understand',
  'Listen to what you tell us, and talk about what matters to you',
  'Always encourage you to speak to a qualified doctor',
]
const nevers = [
  'Diagnose you or replace your doctor',
  'Sell you miracle cures or supplements',
  'Tell you there’s one “right” way to do menopause',
]

function MarkAnatomy() {
  return (
    <div className="anatomy">
      <div className="anatomy__art">
        <div className="anatomy__figure">
          <Brandmark />
          <span className="anatomy__pin anatomy__pin--her" aria-hidden="true">1</span>
          <span className="anatomy__pin anatomy__pin--hands" aria-hidden="true">2</span>
          <span className="anatomy__pin anatomy__pin--them" aria-hidden="true">3</span>
        </div>
      </div>
      <ol className="anatomy__notes">
        <li>
          <span className="anatomy__num">1</span>
          <div>
            <strong>Her</strong>
            <p>Every woman finding her way through midlife, in her own way.</p>
          </div>
        </li>
        <li>
          <span className="anatomy__num">2</span>
          <div>
            <strong>Reaching for each other</strong>
            <p>A hand held out, and a hand taking it. Support makes the difference.</p>
          </div>
        </li>
        <li>
          <span className="anatomy__num">3</span>
          <div>
            <strong>The people around her</strong>
            <p>A friend, a partner, a daughter, a doctor. Together they form the M.</p>
          </div>
        </li>
      </ol>
    </div>
  )
}

export default function About() {
  const shelf = articles.slice(0, 5)

  return (
    <>
      <Seo
        title="About"
        path="/about"
        description="Menopause India is a space for Indian women 35+ to understand perimenopause and menopause through honest conversations, a podcast and articles."
      />

      {/* 1. Hero */}
      <section className="ab-hero">
        <div className="container ab-hero__grid">
          <div>
            <p className="eyebrow">About us</p>
            <h1 className="ab-hero__title">
              Menopause shouldn’t be a <em>whisper.</em>
            </h1>
            <p className="ab-hero__lead">
              Every woman goes through it, yet so few of us talk about it. Menopause India is a warm, honest space to
              understand what’s changing, and to feel a lot less alone while it does.
            </p>
          </div>
          <div className="ab-hero__art" aria-hidden="true">
            <span className="ab-hero__ring" />
            <Brandmark animated />
          </div>
        </div>
      </section>

      {/* 2. The silence */}
      <section className="silence">
        <div className="container silence__inner">
          <p className="eyebrow eyebrow--light">Why we exist</p>
          <h2 className="silence__title">What most of us were told:</h2>
          <Reveal as="ul" className="silence__list">
            {brushOffs.map((line, i) => (
              <li key={line} style={{ '--i': i }}>
                <span>{line}</span>
              </li>
            ))}
          </Reveal>
          <Reveal className="silence__answer" style={{ '--i': brushOffs.length }}>
            What it might actually be: <strong>perimenopause.</strong> And it deserves a real conversation.
          </Reveal>
        </div>
      </section>

      {/* 3. Our mark */}
      <section className="section section--petal">
        <div className="container">
          <Reveal className="section__head section__head--center">
            <p className="eyebrow">Our mark</p>
            <h2 className="section__title">Nobody should go through it alone.</h2>
          </Reveal>
          <Reveal>
            <MarkAnatomy />
          </Reveal>
        </div>
      </section>

      {/* 4. Unpause */}
      <section className="section unpause">
        <div className="container unpause__grid">
          <Reveal className="unpause__word">
            <p className="unpause__eq">
              <span className="unpause__part">
                meno<small>month</small>
              </span>
              <span className="unpause__plus" aria-hidden="true">+</span>
              <span className="unpause__part">
                pause<small>pause</small>
              </span>
            </p>
            <p className="unpause__motto">
              <span className="unpause__un">Un</span>pause.
            </p>
          </Reveal>
          <Reveal delay={120} className="unpause__copy">
            <p className="eyebrow">Unpause India</p>
            <h2 className="section__title section__title--sm">A pause in periods. Not a pause on you.</h2>
            <p>
              The word menopause comes from the Greek for <em>month</em> and <em>pause</em>: a pause in monthly periods.
              That’s all it means.
            </p>
            <p>
              It isn’t a pause on your work, your relationships, your joy or your plans. That’s why our motto is{' '}
              <strong>Unpause India.</strong>
            </p>
          </Reveal>
        </div>
      </section>

      
{/* 5. What we do */}
<section className="section section--cream">
  <div className="container">
    <Reveal className="section__head">
      <p className="eyebrow">What we do</p>
      <h2 className="section__title">Learn. Listen. Connect.</h2>
    </Reveal>

    <div className="do">
      <Reveal>
        <Link to="/learn" className="do__card">
          <div className="do__visual do__visual--learn" aria-hidden="true">
            {shelf.map((a, i) => {
              const size = bookSize(i)
              return (
                <span
                  key={a.slug}
                  className={`do__book ${bookTone(i)}`}
                  style={{
                    width: size.w * 0.42,
                    height: size.h * 0.36,
                  }}
                />
              )
            })}
          </div>
          <h3>Learn</h3>
          <p>
            {articles.length} short, jargon-free reads on what’s happening in your body.
          </p>
          <span className="link-arrow">
            Open the library <ArrowRight width={16} height={16} />
          </span>
        </Link>
      </Reveal>

      <Reveal delay={80}>
        <a
          href={`https://www.youtube.com/watch?v=${episodes[0].youtubeId}`}
          target="_blank"
          rel="noreferrer"
          className="do__card"
        >
          <div className="do__visual do__visual--listen" aria-hidden="true">
            <span className="do__play" />
            <span className="do__wave">
              {Array.from({ length: 14 }, (_, i) => (
                <i key={i} style={{ '--i': i }} />
              ))}
            </span>
          </div>
          <h3>Listen</h3>
          <p>
            Podcast conversations on fitness, health and emotions in midlife.
          </p>
          <span className="link-arrow">
            Watch the latest episode <ArrowRight width={16} height={16} />
          </span>
        </a>
      </Reveal>

      <Reveal delay={160}>
        <a
          href={site.social.instagram}
          target="_blank"
          rel="noreferrer"
          className="do__card"
        >
          <div className="do__visual do__visual--connect" aria-hidden="true">
            <span className="do__bubble">Is this normal?</span>
            <span className="do__bubble do__bubble--reply">
              So normal. You’re not alone.
            </span>
          </div>
          <h3>Connect</h3>
          <p>
            Reels, memes and real talk with women going through the same thing.
          </p>
          <span className="link-arrow">
            {site.social.instagramHandle}{' '}
            <ArrowRight width={16} height={16} />
          </span>
        </a>
      </Reveal>
    </div>
  </div>
</section>


      {/* 6. A note from us */}
      <section className="section">
        <div className="container">
          <Reveal className="letter">
            <p className="eyebrow">A note from us</p>
            <h2 className="letter__title">Dear you,</h2>
            <p className="letter__lead">
              If you’ve been feeling not quite yourself and haven’t known why, we made this for you. Here’s what you
              can count on from us.
            </p>
            <div className="letter__cols">
              <div>
                <h3>We promise to</h3>
                <ul>
                  {promises.map((t) => (
                    <li key={t}><span className="letter__icon letter__icon--yes"><Check width={14} height={14} /></span>{t}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>We will never</h3>
                <ul>
                  {nevers.map((t) => (
                    <li key={t}><span className="letter__icon"><Close width={14} height={14} /></span>{t}</li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="letter__sign">
              With warmth,
              <span>
                <Brandmark /> Team Menopause India
              </span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="section section--tight section--top-tight">
        <div className="container">
          <Reveal className="cta-band">
            <div className="cta-band__copy">
              <h2>Not sure where to begin?</h2>
              <p>Tell us how you’ve been feeling, and we’ll point you to the right read.</p>
            </div>
            <div className="cta-band__actions">
              <Link to="/learn" className="btn btn--light btn--lg">
                Start here <ArrowRight />
              </Link>
              <a href={site.social.instagram} target="_blank" rel="noreferrer" className="btn btn--outline-light btn--lg">
                <Instagram /> Say hello
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
