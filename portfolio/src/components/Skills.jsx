import { useState } from 'react'
import { skillGroups } from '../data/resume'
import { useAutoHeight } from '../hooks'
import { Reveal, Section } from './Reveal'

const total = skillGroups.reduce((sum, g) => sum + g.items.length, 0)

export default function Skills() {
  const [filter, setFilter] = useState('all')
  const gridRef = useAutoHeight(filter)

  const visible = filter === 'all' ? skillGroups : skillGroups.filter((g) => g.id === filter)

  return (
    <Section id="skills" number="04" title="Skills">
      <Reveal className="skills__filters" role="group" aria-label="Filter the capability index">
        <button
          className={`filter${filter === 'all' ? ' is-active' : ''}`}
          aria-pressed={filter === 'all'}
          onClick={() => setFilter('all')}
        >
          All ({total})
        </button>
        {skillGroups.map((g) => (
          <button
            key={g.id}
            className={`filter${filter === g.id ? ' is-active' : ''}`}
            aria-pressed={filter === g.id}
            onClick={() => setFilter(g.id)}
          >
            {g.name} ({g.items.length})
          </button>
        ))}
      </Reveal>

      <div className="skills__grid" ref={gridRef}>
        {visible.map((group, i) => (
          <Reveal className="skill-group" key={group.id} delay={i * 60}>
            <div className="skill-group__head">
              <h3 className="skill-group__name">{group.name}</h3>
              <span className="skill-group__count">
                {String(group.items.length).padStart(2, '0')}
              </span>
            </div>
            <ul className="skill-group__items">
              {group.items.map((item) => (
                <li className="pill" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
