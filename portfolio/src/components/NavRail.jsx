import { navSections, profile } from '../data/resume'
import { IconGitHub, IconLinkedIn, IconMail, IconMoon, IconSun } from './Icons'

export default function NavRail({ theme, onToggleTheme, activeId }) {
  return (
    <nav className="rail" aria-label="Section navigation">
      <a
        className="rail__monogram"
        href="#top"
        aria-label={`${profile.name} ${profile.nameAccent}, back to top`}
      >
        {profile.monogram}
      </a>

      <ul className="rail__nav">
        {navSections.map((s) => (
          <li key={s.id}>
            <a
              className={`rail__link${activeId === s.id ? ' is-active' : ''}`}
              href={`#${s.id}`}
              aria-label={s.label}
              aria-current={activeId === s.id ? 'true' : undefined}
            >
              <span className="rail__dot" />
              <span className="rail__tip" aria-hidden="true">
                {s.number} {s.label}
              </span>
            </a>
          </li>
        ))}
      </ul>

      <div className="rail__bottom">
        <a
          className="rail__icon"
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
        >
          <IconGitHub />
        </a>
        <a
          className="rail__icon"
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
        >
          <IconLinkedIn />
        </a>
        <a className="rail__icon" href={`mailto:${profile.email}`} aria-label="Email">
          <IconMail />
        </a>
        <button
          className="rail__toggle"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <IconSun /> : <IconMoon />}
        </button>
      </div>
    </nav>
  )
}
