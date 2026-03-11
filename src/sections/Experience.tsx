import { EXPERIENCE } from '../data'
import { Section, SectionHeading, Tag } from '../components/ui'

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeading>Professional Experience</SectionHeading>
      <div className="space-y-6">
        {EXPERIENCE.map((e, i) => (
          <div key={i} className="rounded-xl border border-white/10 bg-slate-900/50 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
              <div>
                <h3 className="text-white font-semibold text-lg">{e.role}</h3>
                <p className="text-indigo-400 text-sm">{e.company}</p>
              </div>
              <span className="text-xs text-slate-500 shrink-0">{e.period}</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">{e.desc}</p>
            <div className="flex flex-wrap gap-2">
              {e.tags.map(t => <Tag key={t} label={t} />)}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}