import { OPEN_SOURCE } from '../data'
import { Section, SectionHeading, Tag } from '../components/ui'
import { IcoGithub, IcoStar } from '../components/icons'

export function OpenSource() {
  return (
    <Section id="open-source">
      <SectionHeading>Open Source</SectionHeading>
      <div className="grid sm:grid-cols-3 gap-5">
        {OPEN_SOURCE.map(r => (
          <div key={r.name} className="rounded-xl border border-white/10 bg-slate-900/50 p-5 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-white font-semibold text-sm">{r.name}</h3>
              <span className="flex items-center gap-1 text-xs text-slate-400"><IcoStar />{r.stars}</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed flex-1 mb-4">{r.desc}</p>
            <div className="flex flex-wrap gap-1 mb-4">
              {r.tags.map(t => <Tag key={t} label={t} />)}
            </div>
            <a href={r.github} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 text-xs transition-colors">
              <IcoGithub /> GitHub
            </a>
          </div>
        ))}
      </div>
    </Section>
  )
}