import { PROJECTS } from '../data'
import { Section, SectionHeading, Tag } from '../components/ui'
import { IcoGithub, IcoProduction } from '../components/icons'

export function Projects() {
  return (
    <Section id="projects">
      <SectionHeading>Projects</SectionHeading>
      <div className="grid sm:grid-cols-2 gap-6">
        {PROJECTS.map(p => {
          const hasGithub = p.github.trim().length > 0
          const hasProjectUrl = p.projectUrl.trim().length > 0

          return (
            <div key={p.title} className={`rounded-xl overflow-hidden border border-white/10 bg-slate-900/60 flex flex-col relative ${p.isInDevelopment ? 'project-under-development' : ''}`}>
              {p.isInDevelopment ? (
                <span className="project-dev-badge absolute top-3 right-3 z-10 text-[10px] uppercase tracking-[0.12em] px-2 py-1 rounded-full border border-indigo-300/40 text-indigo-200 bg-indigo-900/40 backdrop-blur-sm">
                  Under Development
                </span>
              ) : (
                <span className="project-finished-badge absolute top-3 right-3 z-10 text-[10px] uppercase tracking-[0.12em] px-2 py-1 rounded-full border border-emerald-300/40 text-emerald-200 bg-emerald-900/35 backdrop-blur-sm">
                  Finished
                </span>
              )}
              <img src={p.image} alt={p.title} className="w-full h-40 object-cover" />
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-white font-semibold text-lg mb-2">{p.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-4">{p.desc}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {p.tags.map(t => <Tag key={t} label={t} />)}
                </div>
                {(hasGithub || hasProjectUrl) && (
                  <div className="flex flex-wrap items-center gap-4 mt-auto">
                    {hasGithub && (
                      <a href={p.github} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-sm transition-colors">
                        <IcoGithub /> View on GitHub
                      </a>
                    )}
                    {hasProjectUrl && (
                      <a href={p.projectUrl} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-sm transition-colors">
                        <IcoProduction /> Visit this Project
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
      <p className="projects-coming-soon text-center text-sm text-indigo-400/70 mt-6 italic">
        More to come — updating my public GitHub
      </p>
    </Section>
  )
}