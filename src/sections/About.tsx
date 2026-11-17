import { useState, useEffect, useRef } from 'react'
import { SITE, SKILL_GROUPS, YEARS_EXP } from '../data'
import { Section, SectionHeading } from '../components/ui'
import { canHover } from '../hooks/useMediaQuery'

/* ── Highlighted keyword ── */
function K({ children }: { children: React.ReactNode }) {
  return <span className="keyword-glow">{children}</span>
}

/* ── Expandable skill-group tag ── */
function ExpandableGroup({ label, items }: { label: string; items: string[] }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="relative w-full sm:w-auto"
      onMouseEnter={() => { if (canHover()) setOpen(true) }}
      onMouseLeave={() => { if (canHover()) setOpen(false) }}
    >
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        className={`inline-flex items-center justify-between sm:justify-start w-full sm:w-auto gap-1.5 text-xs px-3 py-2 min-h-[38px] sm:min-h-0 sm:py-1.5 rounded-full cursor-pointer select-none transition-all duration-300 ${
        open
          ? 'bg-transparent text-indigo-300 border border-indigo-400 shadow-lg shadow-indigo-500/10'
          : 'bg-indigo-900/60 text-indigo-300 border border-indigo-700/50'
      }`}>
        {label}
        <svg className={`w-3 h-3 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div className={`sm:hidden mt-2 transition-all duration-300 overflow-hidden ${
        open ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
      }`}>
        <div className="bg-slate-900/50 border border-indigo-500/30 rounded-lg p-2.5 flex flex-wrap gap-1.5 shadow-xl shadow-black/20">
          {items.map(item => (
            <span key={item} className="text-xs px-2 py-0.5 rounded-full bg-transparent text-indigo-300 border border-indigo-700/50 whitespace-nowrap">
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className={`hidden sm:block absolute top-full left-0 right-auto mt-1.5 z-20 transition-all duration-300 ${
        open ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1 pointer-events-none'
      }`}>
        <div className="bg-slate-950/80 backdrop-blur border border-indigo-500/30 rounded-lg p-2.5 flex flex-wrap gap-1.5 w-max max-w-[min(20rem,calc(100vw-2rem))] shadow-xl shadow-black/20">
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
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    let showTimer: ReturnType<typeof setTimeout>
    let hideTimer: ReturnType<typeof setTimeout>

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          showTimer = setTimeout(() => setShowHint(true), 1500)
          hideTimer = setTimeout(() => setShowHint(false), 7500)
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )

    observer.observe(el)
    return () => { observer.disconnect(); clearTimeout(showTimer); clearTimeout(hideTimer) }
  }, [])

  return (
    <Section id="about">
      <SectionHeading>About Me</SectionHeading>
      <div ref={sectionRef} className="grid sm:grid-cols-2 gap-8 sm:gap-10 items-start">

        {/* Bio */}
        <div>
          {/* A small round portrait beside the name: it puts a face to the text
              without adding a block to the section, so the two-column layout
              and its height are unchanged. The name stays on one line, so its
              size (and the portrait's) steps down where the column is narrowest
              (sm–md, when the section first splits into two columns). */}
          <div className="flex items-center gap-3 mb-3">
            <img
              src="/me.jpg"
              alt={`Portrait of ${SITE.name}`}
              width={64}
              height={64}
              loading="lazy"
              decoding="async"
              className="w-14 h-14 sm:w-10 sm:h-10 md:w-14 md:h-14 xl:w-16 xl:h-16 shrink-0 rounded-full object-cover object-[50%_30%] ring-2 ring-indigo-500/40 shadow-lg shadow-indigo-500/20"
            />
            <h3 className="min-[360px]:whitespace-nowrap text-[1.0625rem] min-[375px]:text-[1.125rem] sm:text-[0.96875rem] md:text-[1.125rem] lg:text-[1.375rem] xl:text-[1.5rem] font-semibold text-white">{SITE.name}</h3>
          </div>
          <p className="text-slate-400 leading-relaxed text-justify">
            <K>Senior Python engineer</K> with <K>{YEARS_EXP}+ years</K> building{' '}
            <K>back-end services</K>, <K>REST APIs</K>, and{' '}
            <K>microservices</K>. Most recently at <K>Allot</K> as{' '}
            <K>full-stack lead engineer</K>, building and testing a{' '}
            <K>cybersecurity</K> platform for ISPs,
            and before that at <K>Mercedes-Benz</K>, where I evolved
            large-scale <K>cloud services</K> with 90%+{' '}
            <K>automated test coverage</K>. I bring strong{' '}
            <K>testing</K>, <K>monitoring</K>, and daily{' '}
            <K>AI-assisted development</K> to every project.
          </p>
        </div>

        {/* Tech stack */}
        <div className="relative">
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-3">Tech Stack</p>

          {/* Hint popup */}
          <div className={`hint-popup ${showHint ? 'hint-visible' : ''}`}>
            Hover or tap tags to explore
          </div>

          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2">
            {SKILL_GROUPS.map(g => (
              <ExpandableGroup key={g.label} label={g.label} items={g.items} />
            ))}
          </div>
        </div>

      </div>
    </Section>
  )
}
