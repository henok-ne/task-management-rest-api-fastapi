import { useReveal } from '../hooks'

export function Reveal({ as: Tag = 'div', delay = 0, className = '', style, children, ...rest }) {
  const [ref, visible] = useReveal()
  return (
    <Tag
      ref={ref}
      className={`reveal${visible ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export function Section({ id, number, title, children }) {
  return (
    <section className="section" id={id} aria-labelledby={`${id}-title`}>
      <div className="shell grid-12">
        <Reveal className="section__head">
          <p className="section__label micro-label">
            <span className="num">{number}</span>
            <span aria-hidden="true">—</span>
            <span>{title}</span>
          </p>
          <h2 className="section__title" id={`${id}-title`}>
            {title}
          </h2>
          <div className="section__rule" />
        </Reveal>
        {children}
      </div>
    </section>
  )
}
