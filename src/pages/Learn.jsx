import { Link } from 'react-router-dom'
import { site } from '../site.config'
import Seo from '../components/Seo'
import Reveal from '../components/Reveal'
import Disclaimer from '../components/Disclaimer'

const stages = [
  {
    number: '01',
    phase: 'The Transition',
    title: 'Perimenopause',
    description:
      'Understand the changes that may begin before your periods stop.',
    details:
      'Hormone levels fluctuate unevenly, bringing changes in sleep, mood, and period patterns.',
  },
  {
    number: '02',
    phase: 'The Milestone',
    title: 'Menopause',
    isMilestone: true,
    description:
      'Learn about this transition and find practical information for everyday wellbeing.',
    details:
      'Reached when you have gone 12 months in a row without a period. A single moment looking back.',
  },
  {
    number: '03',
    phase: 'The Years After',
    title: 'Postmenopause',
    description:
      'Explore health and wellbeing in the years after menopause.',
    details:
      'Focusing on long-term strength, bone density, heart health, and vibrant everyday comfort.',
  },
]

const resources = [
  {
    title: 'Understanding Menopause',
    description: 'A simple guide to the stages and common changes.',
  },
  {
    title: 'Managing Symptoms',
    description: 'Helpful information about common symptoms and everyday comfort.',
  },
  {
    title: 'Sleep & Wellbeing',
    description: 'Learn about sleep, mood and looking after yourself.',
  },
  {
    title: 'Your Doctor Visit',
    description: 'Questions and notes to help you prepare for an appointment.',
  },
]

function StageVisual({ type }) {
  if (type === 0) {
    return (
      <svg viewBox="0 0 200 48" fill="none" className="stage-svg" aria-hidden="true">
        <path d="M10 24 Q 55 8, 100 24 T 190 24" stroke="var(--rose)" strokeWidth="2.8" strokeLinecap="round" opacity="0.65" />
        <path d="M10 32 Q 55 16, 100 32 T 190 32" stroke="var(--blush)" strokeWidth="2" strokeLinecap="round" opacity="0.55" strokeDasharray="4 4" />
        <circle cx="55" cy="15" r="4.5" fill="var(--rose)" opacity="0.8" />
        <circle cx="145" cy="33" r="4" fill="var(--blush)" />
      </svg>
    )
  }
  if (type === 1) {
    return (
      <svg viewBox="0 0 200 48" fill="none" className="stage-svg" aria-hidden="true">
        <circle cx="100" cy="24" r="20" fill="var(--petal)" stroke="var(--rose)" strokeWidth="2" opacity="0.85" />
        <circle cx="100" cy="24" r="12" fill="var(--rose)" opacity="0.25" />
        <circle cx="100" cy="24" r="5" fill="var(--rose)" />
        <line x1="24" y1="24" x2="72" y2="24" stroke="var(--blush)" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
        <line x1="128" y1="24" x2="176" y2="24" stroke="var(--blush)" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 200 48" fill="none" className="stage-svg" aria-hidden="true">
      <path d="M44 38 A 56 56 0 0 1 156 38" stroke="var(--rose)" strokeWidth="2.8" strokeLinecap="round" opacity="0.65" />
      <path d="M62 38 A 38 38 0 0 1 138 38" stroke="var(--blush)" strokeWidth="2.2" strokeLinecap="round" opacity="0.75" />
      <path d="M80 38 A 20 20 0 0 1 120 38" stroke="var(--rose-deep)" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
      <circle cx="100" cy="14" r="3.5" fill="var(--rose)" />
    </svg>
  )
}

export default function Learn() {
  const scrollToResources = () => {
    const el = document.getElementById('resources')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <>
      <Seo
        title="Learn about menopause"
        path="/learn"
        description="Explore the menopause journey and find helpful PDF resources."
      />

      <section className="section learn-journey">
        <div className="learn-journey__bg" aria-hidden="true">
          <span className="blob learn-journey__blob learn-journey__blob--1" />
          <span className="blob learn-journey__blob learn-journey__blob--2" />
          <span className="blob learn-journey__blob learn-journey__blob--3" />
          <div className="learn-journey__mesh" />
          <div className="learn-journey__ring" />
        </div>

        <div className="container">
          <div className="learn-journey__header">
            <div className="learn-journey__copy">
              <p className="eyebrow">YOUR JOURNEY, YOUR PACE</p>
              <h1 className="section__title">
                Every journey is <em>different.</em>
              </h1>
              <p className="learn-intro">
                Understand the stages of menopause and explore simple resources
                to help you feel more informed at every milestone.
              </p>
            </div>

            <div className="scroll-explore-wrap">
              <button
                type="button"
                className="scroll-explore"
                onClick={scrollToResources}
                aria-label="Scroll to Resource Library"
              >
                <span className="scroll-explore__track">
                  <span className="scroll-explore__dot" />
                </span>
                <span className="scroll-explore__label">
                  <span className="scroll-explore__eyebrow">RESOURCE LIBRARY</span>
                  <span className="scroll-explore__title">Scroll to explore</span>
                </span>
                <span className="scroll-explore__arrow" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5v14M19 12l-7 7-7-7" />
                  </svg>
                </span>
              </button>
            </div>
          </div>

          <div className="journey-grid" id="journey-stages">
            <div className="journey-track-rail" aria-hidden="true">
              <div className="journey-track-line" />
              <div className="journey-track-spark" />
            </div>

            {stages.map((stage, idx) => (
              <div
                key={stage.number}
                className={`journey-card-col ${stage.isMilestone ? 'is-milestone' : ''}`}
                style={{ '--i': idx }}
              >
                <div className="journey-card">
                  <div className="journey-card__header">
                    <div className="journey-card__marker">
                      <span className="journey-number">{stage.number}</span>
                      <span className="journey-marker-ring" />
                      {stage.isMilestone && <span className="journey-milestone-pulse" />}
                    </div>
                    <span className="journey-phase-tag">{stage.phase}</span>
                  </div>

                  <div className="journey-card__art" aria-hidden="true">
                    <StageVisual type={idx} />
                  </div>

                  <div className="journey-card__body">
                    <h2>{stage.title}</h2>
                    <p className="journey-card__desc">{stage.description}</p>
                    <p className="journey-card__details">{stage.details}</p>
                  </div>

                  <div className="journey-card__footer">
                    <span className="journey-card__step-info">
                      <span className="journey-card__step-dot" />
                      <span>Phase {stage.number} of 03</span>
                    </span>
                    {stage.isMilestone && (
                      <span className="journey-card__badge">12 months milestone</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section learn-resources" id="resources">
        <div className="container">
          <Reveal>
            <p className="eyebrow">THE RESOURCE LIBRARY</p>
            <h2 className="section__title">Helpful guides, in one place.</h2>
            <p className="learn-intro">
              Explore our upcoming downloadable guides, designed to make
              menopause information easier to understand.
            </p>
          </Reveal>

          <div className="resource-grid">
            {resources.map((resource) => (
              <Reveal key={resource.title} className="resource-card">
                <span className="resource-label">PDF GUIDE</span>
                <h3>{resource.title}</h3>
                <p>{resource.description}</p>
                <span className="resource-coming-soon">
                  Coming soon
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <Reveal className="cta-band">
            <div className="cta-band__copy">
              <h2>Have a question?</h2>
              <p>
                We would love to hear what information would help you.
              </p>
            </div>
            <div className="cta-band__actions">
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noreferrer"
                className="btn btn--light btn--lg"
              >
                Ask on Instagram
              </a>
              <Link
                to="/contact"
                className="btn btn--outline-light btn--lg"
              >
                Contact us
              </Link>
            </div>
          </Reveal>

          <Disclaimer className="disclaimer--boxed" />
        </div>
      </section>
    </>
  )
}
