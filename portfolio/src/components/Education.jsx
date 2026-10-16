import { education } from '../data/resume'
import { Reveal, Section } from './Reveal'

export default function Education() {
  return (
    <Section id="education" number="05" title="Education">
      <div className="edu__grid">
        {education.map((entry) => (
          <Reveal className="edu__item" key={entry.institution}>
            <h3 className="edu__inst">{entry.institution}</h3>
            <p className="edu__detail">{entry.detail}</p>
            <div className="edu__meta">
              {entry.period && <span>{entry.period}</span>}
              <span>{entry.location}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
