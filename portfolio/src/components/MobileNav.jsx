import { useEffect, useState } from 'react'
import { navSections, profile } from '../data/resume'
import { IconGitHub, IconLinkedIn, IconMail, IconMoon, IconSun } from './Icons'

export default function MobileNav({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <header className="topbar">
        <a className="topbar__mark" href="#top">
          {profile.monogram}
        </a>
        <div className="topbar__right">
          <button
            className="rail__toggle"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <IconSun /> : <IconMoon />}
          </button>
          <button
            className="burger"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {open && (
        <div className="nav-overlay" id="mobile-menu">
          <nav aria-label="Section navigation">
            {navSections.map((s) => (
              <a
                key={s.id}
                className="nav-overlay__link"
                href={`#${s.id}`}
                onClick={() => setOpen(false)}
              >
                <span className="num">{s.number}</span>
                {s.label}
              </a>
            ))}
          </nav>
          <div className="nav-overlay__footer">
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
          </div>
        </div>
      )}
    </>
  )
}
