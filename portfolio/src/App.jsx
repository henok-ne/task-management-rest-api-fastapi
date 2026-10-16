import { navSections } from './data/resume'
import { useActiveSection, useTheme } from './hooks'
import NavRail from './components/NavRail'
import MobileNav from './components/MobileNav'
import Hero from './components/Hero'
import Profile from './components/Profile'
import Experience from './components/Experience'
import SelectedWork from './components/SelectedWork'
import Skills from './components/Skills'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'

// stable identity so the section observer is not rebuilt on every render
const SECTION_IDS = navSections.map((s) => s.id)

export default function App() {
  const { theme, toggleTheme } = useTheme()
  const activeId = useActiveSection(SECTION_IDS)

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="grain" aria-hidden="true" />

      <NavRail theme={theme} onToggleTheme={toggleTheme} activeId={activeId} />
      <MobileNav theme={theme} onToggleTheme={toggleTheme} />

      <div className="app">
        <main id="main">
          <Hero />
          <Profile />
          <Experience />
          <SelectedWork />
          <Skills />
          <Education />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}
