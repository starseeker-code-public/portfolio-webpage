import { PROJECTS } from '../data'
import { Section, SectionHeading, Tag } from '../components/ui'
import { IcoGithub } from '../components/icons'

export function Projects() {
  return (
    <Section id="projects">
      <SectionHeading>Projects</SectionHeading>
      <div className="grid sm:grid-cols-2 gap-6">
        {PROJECTS.map(p => (
          <div key={p.title} className="rounded-xl overflow-hidden border border-white/10 bg-slate-900/60 flex flex-col">
            <img src={p.image} alt={p.title} className="w-full h-40 object-cover" />
            <div className="p-5 flex flex-col flex-1">
              <h3 className="text-white font-semibold text-lg mb-2">{p.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-4">{p.desc}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {p.tags.map(t => <Tag key={t} label={t} />)}
              </div>
              <a href={p.github} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-sm transition-colors">
                <IcoGithub /> View on GitHub
              </a>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}