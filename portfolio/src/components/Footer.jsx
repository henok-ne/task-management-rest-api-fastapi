import { profile } from '../data/resume'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer__inner">
        <span>
          © {new Date().getFullYear()} {profile.name} {profile.nameAccent}
        </span>
        <span>Editorial Noir — React, no frameworks</span>
        <a href={profile.github} target="_blank" rel="noreferrer">
          Source on GitHub
        </a>
      </div>
    </footer>
  )
}
