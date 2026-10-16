import { useEffect, useLayoutEffect, useRef, useState } from 'react'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* ---------------------------------------------------------------
   Theme — dark by default, persisted in localStorage
--------------------------------------------------------------- */
export function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark'
    try {
      const stored = window.localStorage.getItem('en-theme')
      if (stored === 'dark' || stored === 'light') return stored
    } catch (e) {
      /* storage blocked — fall through */
    }
    return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      window.localStorage.setItem('en-theme', theme)
    } catch (e) {
      /* ignore */
    }
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  return { theme, toggleTheme }
}

/* ---------------------------------------------------------------
   Scroll reveal — fade up 16px when the element enters the viewport
--------------------------------------------------------------- */
export function useReveal({ threshold = 0.12, rootMargin = '0px 0px -8% 0px' } = {}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold, rootMargin }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold, rootMargin])

  return [ref, visible]
}

/* ---------------------------------------------------------------
   Count-up — animates a number once it becomes active
--------------------------------------------------------------- */
export function useCountUp(target, active, duration = 1200) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) return
    if (prefersReducedMotion()) {
      setValue(target)
      return
    }
    let frame
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(Math.round(eased * target))
      if (p < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, active, duration])

  return value
}

/* ---------------------------------------------------------------
   Body scroll lock — for the modal
--------------------------------------------------------------- */
export function useLockBodyScroll(locked) {
  useEffect(() => {
    if (!locked) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [locked])
}

/* ---------------------------------------------------------------
   Escape key
--------------------------------------------------------------- */
export function useEscape(handler, active = true) {
  useEffect(() => {
    if (!active) return
    const onKey = (e) => {
      if (e.key === 'Escape') handler()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [handler, active])
}

/* ---------------------------------------------------------------
   Active section — highlights the rail dot for the section in view
--------------------------------------------------------------- */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!elements.length || typeof IntersectionObserver === 'undefined') return

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] }
    )
    elements.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [ids])

  return active
}

/* ---------------------------------------------------------------
   Measured auto-height — animates a container between two content
   heights without snapping (used by the skill filter)
--------------------------------------------------------------- */
export function useAutoHeight(dep) {
  const ref = useRef(null)
  const previous = useRef(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const to = el.scrollHeight
    const from = previous.current

    if (from !== null && from !== to && !prefersReducedMotion()) {
      el.style.height = `${from}px`
      void el.offsetHeight // force reflow
      el.style.height = `${to}px`
      const t = setTimeout(() => {
        el.style.height = ''
        previous.current = el.scrollHeight
      }, 280)
      previous.current = to
      return () => clearTimeout(t)
    }

    el.style.height = ''
    previous.current = el.scrollHeight
  }, [dep])

  return ref
}
