import { useState, useEffect } from 'react'
import { SITE, SKILL_GROUPS } from '../data'
import { Section, SectionHeading } from '../components/ui'

/* ── Highlighted keyword ── */
function K({ children }: { children: React.ReactNode }) {
  return <span className="keyword-glow">{children}</span>
}

/* ── Expandable skill-group tag ── */
function ExpandableGroup({ label, items }: { label: string; items: string[] }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <span className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full cursor-default select-none transition-all duration-300 ${
        open
          ? 'bg-transparent text-indigo-300 border border-indigo-400 shadow-lg shadow-indigo-500/10'
          : 'bg-indigo-900/60 text-indigo-300 border border-indigo-700/50'
      }`}>
        {label}
        <svg className={`w-3 h-3 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </span>

      <div className={`absolute top-full left-0 mt-1.5 z-10 transition-all duration-300 ${
        open ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1 pointer-events-none'
      }`}>
        <div className="bg-transparent backdrop-blur border border-indigo-500/30 rounded-lg p-2.5 flex flex-wrap gap-1.5 max-w-xs shadow-xl shadow-black/20">
          {items.map(item => (
            <span key={item} className="text-xs px-2 py-0.5 rounded-full bg-transparent text-indigo-300 border border-indigo-700/50 whitespace-nowrap">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export function About() {
  const [showHint, setShowHint] = useState(false)

  useEffect(() => {
    const show = setTimeout(() => setShowHint(true), 1500)
    const hide = setTimeout(() => setShowHint(false), 5500)
    return () => { clearTimeout(show); clearTimeout(hide) }
  }, [])

  return (
    <Section id="about">
      <SectionHeading>About Me</SectionHeading>
      <div className="grid sm:grid-cols-2 gap-10 items-start">

        {/* Bio */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">{SITE.name}</h3>
          <p className="text-slate-400 leading-relaxed text-justify">
            <K>Senior Python engineer</K> with <K>7+ years</K> building{' '}
            <K>back-end services</K>, <K>REST APIs</K>, and{' '}
            <K>microservices</K>. Most recently at <K>Mercedes-Benz</K>,{' '}
            where I evolved large-scale <K>cloud services</K> with 90%+{' '}
            <K>automated test coverage</K>, and at <K>Frenetic</K>,{' '}
            where I <K>led</K> a major platform refactor scaling the{' '}
            <K>team</K> from 4 to 9 engineers. I bring strong{' '}
            <K>testing</K>, <K>monitoring</K>, and daily{' '}
            <K>AI-assisted development</K> to every project.
          </p>
        </div>

        {/* Tech stack */}
        <div className="relative">
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-3">Tech Stack</p>

          {/* Hint popup */}
          <div className={`hint-popup ${showHint ? 'hint-visible' : ''}`}>
            Hover tags to explore
          </div>

          <div className="flex flex-wrap gap-2">
            {SKILL_GROUPS.map(g => (
              <ExpandableGroup key={g.label} label={g.label} items={g.items} />
            ))}
          </div>
        </div>

      </div>
    </Section>
  )
}
