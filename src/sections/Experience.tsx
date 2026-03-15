import { useState } from 'react'
import { EXPERIENCE, TEACHING } from '../data'
import { Section, SectionHeading, Tag } from '../components/ui'

const HIGHLIGHT_COUNT = 3

function DetailsToggle({ details }: { details: string }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(o => !o)}
        className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1 mt-2"
      >
        <svg className={`w-3.5 h-3.5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
        {open ? 'Less details' : 'More details'}
      </button>
      <div className={`overflow-hidden transition-all duration-400 ease-in-out ${open ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
        <p className="text-slate-500 text-sm leading-relaxed text-justify">{details}</p>
      </div>
    </>
  )
}

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeading>Professional Experience</SectionHeading>

      {/* ── Work experience ── */}
      <div className="space-y-6">
        {EXPERIENCE.map((e, i) => (
          <div key={i} className={`rounded-xl border border-white/10 bg-slate-900/50 p-6${i === 0 ? ' first-card-highlight' : ''}`}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
              <div>
                {i === 0 && <p className="text-xs text-indigo-400 uppercase tracking-wider mb-1">Currently working</p>}
                <h3 className="text-white font-semibold text-lg">{e.role}</h3>
                <p className="text-indigo-400 text-sm">{e.company}</p>
              </div>
              <span className="text-xs text-slate-500 shrink-0">{e.period}</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed text-justify">{e.desc}</p>

            {e.details && <DetailsToggle details={e.details} />}

            <div className="flex flex-wrap gap-2 mt-3">
              {e.tags.slice(0, HIGHLIGHT_COUNT).map(t => (
                <span key={t} className="text-xs px-2 py-1 rounded-full bg-indigo-600/30 text-indigo-200 border border-indigo-500/40 font-medium">
                  {t}
                </span>
              ))}
              {e.tags.slice(HIGHLIGHT_COUNT).map(t => <Tag key={t} label={t} />)}
            </div>
          </div>
        ))}
      </div>

      {/* ── Teaching highlight ── */}
      <div className="mt-10 rounded-xl border border-indigo-500/20 bg-indigo-950/20 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
          <div>
            <p className="text-xs text-indigo-400 uppercase tracking-wider mb-1">Also teaching</p>
            <h3 className="text-white font-semibold text-lg">{TEACHING.role}</h3>
            <p className="text-indigo-400 text-sm">{TEACHING.company}</p>
          </div>
          <span className="text-xs text-slate-500 shrink-0">{TEACHING.period}</span>
        </div>
        <p className="text-slate-400 text-sm leading-relaxed text-justify">{TEACHING.desc}</p>
      </div>
    </Section>
  )
}
