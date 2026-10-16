import { bio, counters, dossier } from '../data/resume'
import { useCountUp, useReveal } from '../hooks'
import { Reveal, Section } from './Reveal'

function Counter({ value, label, note, active, delay }) {
  const current = useCountUp(value, active)
  return (
    <Reveal className="counter" delay={delay}>
      <p className="counter__num">{String(current).padStart(2, '0')}</p>
      <p className="counter__label">{label}</p>
      <p className="counter__note">{note}</p>
    </Reveal>
  )
}

export default function Profile() {
  const [countersRef, countersVisible] = useReveal({ threshold: 0.3 })

  return (
    <Section id="profile" number="01" title="Profile">
      <Reveal className="profile__bio" delay={40}>
        {bio.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </Reveal>

      <Reveal className="profile__dossier" delay={140}>
        <p className="dossier__title micro-label">Dossier</p>
        <dl>
          {dossier.map((row) => (
            <div className="dossier__row" key={row.label}>
              <dt>{row.label}</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <div className="counters" ref={countersRef}>
        {counters.map((c, i) => (
          <Counter key={c.label} {...c} active={countersVisible} delay={i * 90} />
        ))}
      </div>
    </Section>
  )
}
