import { SITE, BIO, SKILLS } from '../data'
import { Section, SectionHeading, Tag } from '../components/ui'

export function About() {
  return (
    <Section id="about">
      <SectionHeading>About Me</SectionHeading>
      <div className="grid sm:grid-cols-2 gap-10 items-start">
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">{SITE.name}</h3>
          <p className="text-slate-400 leading-relaxed text-justify">{BIO}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-3">Tech Stack</p>
          <div className="flex flex-wrap gap-2">
            {SKILLS.map(s => <Tag key={s} label={s} />)}
          </div>
        </div>
      </div>
    </Section>
  )
}