import { useEffect, useRef } from 'react'
import { useEscape, useLockBodyScroll } from '../hooks'
import { IconClose } from './Icons'

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

export default function ProjectModal({ project, onClose }) {
  const panelRef = useRef(null)
  const closeRef = useRef(null)

  useLockBodyScroll(true)
  useEscape(onClose)

  // move focus into the dialog, restore it on close
  useEffect(() => {
    const previouslyFocused = document.activeElement
    closeRef.current?.focus()
    return () => {
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus()
    }
  }, [])

  // keep tab focus inside the dialog
  const onKeyDown = (event) => {
    if (event.key !== 'Tab') return
    const nodes = panelRef.current?.querySelectorAll(FOCUSABLE)
    if (!nodes?.length) return
    const first = nodes[0]
    const last = nodes[nodes.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  return (
    <div
      className="modal"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      onKeyDown={onKeyDown}
    >
      <div
        className="modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        ref={panelRef}
      >
        <button
          className="modal__close"
          onClick={onClose}
          aria-label="Close case study"
          ref={closeRef}
        >
          <IconClose />
        </button>

        <p className="micro-label modal__num">Project {project.number}</p>
        <h3 className="modal__title" id="modal-title">
          {project.title}
        </h3>

        <div className="modal__meta">
          <span>{project.role}</span>
          <span>{project.year}</span>
          <span>{project.stack.join(' · ')}</span>
        </div>

        <div className="modal__block">
          <h4>Problem</h4>
          <p>{project.modal.problem}</p>
        </div>
        <div className="modal__block">
          <h4>Solution</h4>
          <p>{project.modal.solution}</p>
        </div>
        <div className="modal__block">
          <h4>Impact</h4>
          <p>{project.modal.impact}</p>
        </div>

        <div className="modal__footer">
          {project.links.map((link) => (
            <a
              key={link.label}
              className="btn btn--accent"
              href={link.href}
              target="_blank"
              rel="noreferrer"
            >
              {link.label}
              <span aria-hidden="true">↗</span>
            </a>
          ))}
          <button className="btn btn--quiet" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
