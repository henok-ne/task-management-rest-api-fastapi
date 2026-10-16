import { profile } from '../data/resume'

export default function Hero() {
  return (
    <header className="hero" id="top">
      <div className="shell grid-12 hero__grid">
        <div className="hero__left">
          <div className="hero__eyebrow">
            <span className="hero__status">{profile.status}</span>
            <span className="micro-label">{profile.title}</span>
          </div>

          <h1 className="hero__name">
            <span className="line">{profile.name}</span>
            <span className="line">
              <em>{profile.nameAccent}</em>
            </span>
          </h1>

          <div className="hero__underline" aria-hidden="true" />

          <p className="hero__sub">
            {profile.title}
            <span className="sep" aria-hidden="true">
              /
            </span>
            {profile.location}
            <span className="sep" aria-hidden="true">
              /
            </span>
            {profile.availability}
          </p>

          <div className="hero__links">
            <a className="link-underline" href="#work">
              <span className="idx">01</span>View Work
            </a>
            <a className="link-underline" href={profile.cvFile} download>
              <span className="idx">02</span>Download CV
            </a>
            <a className="link-underline" href={profile.cvFileDocx} download>
              <span className="idx">03</span>Word (.docx)
            </a>
            <a className="link-underline" href={`mailto:${profile.email}`}>
              <span className="idx">04</span>Email Me
            </a>
          </div>
        </div>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <span>Scroll</span>
        <span className="track" />
      </div>
    </header>
  )
}
