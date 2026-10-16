import { useState } from 'react'
import { projects } from '../data/resume'
import { Reveal, Section } from './Reveal'
import ProjectModal from './ProjectModal'

export default function SelectedWork() {
  const [active, setActive] = useState(null)

  return (
    <Section id="work" number="03" title="Selected Work">
      <div className="work">
        {projects.map((project, index) => (
          <Reveal
            key={project.id}
            className={`work__row${index % 2 === 1 ? ' work__row--flip' : ''}`}
          >
            <div className="work__text">
              <p className="micro-label">
                <span className="work__num">Project {project.number}</span>
              </p>

              <h3 className="work__title">{project.title}</h3>
              <p className="work__desc">{project.oneLiner}</p>

              <div className="work__meta">
                <div>
                  <span className="k">Role</span>
                  {project.role}
                </div>
                <div>
                  <span className="k">Year</span>
                  {project.year}
                </div>
                <div>
                  <span className="k">Stack</span>
                  {project.stack.join(' · ')}
                </div>
              </div>

              <div className="work__links">
                {project.links.map((link) => (
                  <a
                    key={link.label}
                    className="link-underline"
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.label}
                    <span className="arrow" aria-hidden="true">
                      ↗
                    </span>
                  </a>
                ))}
              </div>

              <button
                type="button"
                className="btn btn--accent work__view"
                onClick={() => setActive(project)}
                aria-haspopup="dialog"
              >
                View case study
                <span aria-hidden="true">→</span>
              </button>
            </div>

            <aside className="work__aside" aria-hidden="true">
              <span className="work__aside-num">{project.number}</span>
              <ul className="work__aside-stack">
                {project.stack.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </aside>
          </Reveal>
        ))}
      </div>

      {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
    </Section>
  )
}
