import { OPEN_SOURCE } from '../data'
import { Section, SectionHeading, Tag } from '../components/ui'
import { IcoGithub, IcoStar } from '../components/icons'

const MOCK_REPOS = [
  {
    name: 'click',
    desc: 'Python composable command line interface toolkit — contributed CLI tutorial and docs glossary.',
    stars: 15800,
    github: 'https://github.com/pallets/click',
    tags: ['CLI', 'Python', 'Pallets'],
  },
  {
    name: 'poetry',
    desc: 'Python packaging and dependency management made easy — added test coverage and Windows author fix.',
    stars: 32400,
    github: 'https://github.com/python-poetry/poetry',
    tags: ['Packaging', 'Python', 'Dependencies'],
  },
  {
    name: 'rich',
    desc: 'Rich text and beautiful formatting in the terminal — fixed Windows stderr handle bug.',
    stars: 51200,
    github: 'https://github.com/Textualize/rich',
    tags: ['Terminal', 'Python', 'Formatting'],
  },
]

function RepoCard({ r }: { r: typeof MOCK_REPOS[number] }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-900/50 p-5 flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-white font-semibold text-sm">{r.name}</h3>
        <span className="flex items-center gap-1 text-xs text-slate-400"><IcoStar />{r.stars.toLocaleString()}</span>
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
  )
}

export function OpenSource() {
  const repos = OPEN_SOURCE.length > 0 ? OPEN_SOURCE : MOCK_REPOS

  return (
    <Section id="open-source">
      <SectionHeading>Open Source</SectionHeading>

      {OPEN_SOURCE.length === 0 && (
        <p className="text-slate-500 text-xs mb-5 tracking-wide uppercase">
          Preview — contributions coming soon
        </p>
      )}

      <div className="grid sm:grid-cols-3 gap-5">
        {repos.map(r => <RepoCard key={r.name} r={r} />)}
      </div>
    </Section>
  )
}
