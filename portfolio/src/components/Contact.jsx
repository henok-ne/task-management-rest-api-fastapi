import { useState } from 'react'
import { profile } from '../data/resume'
import { Reveal, Section } from './Reveal'

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch (e) {
      setCopied(false)
    }
  }

  return (
    <Section id="contact" number="06" title="Contact">
      <Reveal className="contact__cta">
        Let’s build something <em>worth remembering.</em>
      </Reveal>

      <div className="email-row">
        <a className="email-row__addr link-underline" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
        <button
          className={`copy-btn${copied ? ' is-copied' : ''}`}
          onClick={copyEmail}
          aria-live="polite"
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      <div className="contact__links">
        <a className="link-underline" href={profile.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a className="link-underline" href={profile.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a className="link-underline" href={profile.cvFile} download>
          Résumé (PDF)
        </a>
        <a className="link-underline" href={profile.cvFileDocx} download>
          Résumé (.docx)
        </a>
        <a className="link-underline" href={`mailto:${profile.email}`}>
          Email
        </a>
      </div>
    </Section>
  )
}
