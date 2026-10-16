import { useEffect, useRef, useState } from 'react'
import { experience } from '../data/resume'
import { Reveal, Section } from './Reveal'

function ExperienceRow({ item, open, onToggle }) {
  const bodyRef = useRef(null)

  useEffect(() => {
    const el = bodyRef.current
    if (!el) return
    const apply = () => {
      el.style.maxHeight = open ? `${el.scrollHeight}px` : '0px'
    }
    apply()
    const t = setTimeout(apply, 60) // re-measure once fonts settle
    window.addEventListener('resize', apply)
    return () => {
      clearTimeout(t)
      window.removeEventListener('resize', apply)
    }
  }, [open])

  const panelId = `panel-${item.id}`
  const headId = `head-${item.id}`

  return (
    <Reveal className={`exp__row${open ? ' is-open' : ''}`}>
      <h3 style={{ margin: 0 }}>
        <button
          className="exp__head"
          id={headId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span className="exp__date">{item.period}</span>
          <span>
            <span className="exp__company">{item.company}</span>
            <span className="exp__role">{item.role}</span>
          </span>
          <span className="exp__plus" aria-hidden="true" />
        </button>
      </h3>

      <div
        className="exp__body"
        id={panelId}
        ref={bodyRef}
        role="region"
        aria-labelledby={headId}
        aria-hidden={!open}
      >
        <div className="exp__inner">
          <div>
            <p className="exp__meta">
              <span className="k">Based</span>
              {item.location}
            </p>
          </div>

          <div>
            <p className="exp__summary">{item.summary}</p>
            <ul className="exp__bullets">
              {item.achievements.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
            <div className="exp__tags">
              {item.stack.map((t) => (
                <span className="tag" key={t}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

export default function Experience() {
  const [openId, setOpenId] = useState(experience[0].id)

  return (
    <Section id="experience" number="02" title="Experience">
      <div className="exp">
        {experience.map((item) => (
          <ExperienceRow
            key={item.id}
            item={item}
            open={openId === item.id}
            onToggle={() => setOpenId(openId === item.id ? null : item.id)}
          />
        ))}
      </div>
    </Section>
  )
}
