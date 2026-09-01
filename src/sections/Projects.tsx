import { useState } from 'react'
import { PROJECTS } from '../data'
import type { Project } from '../types'
import { Section, SectionHeading, Tag } from '../components/ui'
import { IcoGithub, IcoProduction } from '../components/icons'

/* ── Covers ───────────────────────────────────────────────────────────────
   Drop a cover into src/assets/projects named after the project's slug
   (e.g. cartograph.png) and it is picked up at build time — no code change.
   Vite resolves the glob statically, so a project without a file costs no
   request; it falls through to the generated cover below.                  */
const COVERS = import.meta.glob('../assets/projects/*.{png,jpg,jpeg,webp,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

const COVER_BY_SLUG: Record<string, string> = Object.fromEntries(
  Object.entries(COVERS).map(([path, url]) => [path.split('/').pop()!.replace(/\.[^.]+$/, ''), url]),
)

/* Deterministic stand-in for projects with no cover yet: a programming-themed
   panel — faint code behind the project's initials — seeded off the slug so a
   given project always gets the same one. */
const CODE_LINES = [
  'async fn main() -> Result<()> {',
  '  let svc = Service::bind(addr).await?;',
  'export default function App() {',
  '  return <Router routes={routes} />',
  'def handler(event, context):',
  '    return {"status": 200}',
  'go func() { ch <- collect(ctx) }()',
  'SELECT id, ts FROM events LIMIT 50;',
  'docker compose up -d --build',
  'kubectl apply -f deploy/prod.yaml',
  'pytest -q --cov=src --cov-fail-under=90',
  'git rebase -i origin/main',
  'impl Handler for Ingest { /* ... */ }',
  'const stream = await client.send(req)',
  'terraform plan -out=tfplan',
  'RUN cargo build --release --locked',
]

function hashOf(seed: string) {
  let hash = 0
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) % 100000
  return hash
}

function initialsOf(title: string) {
  return title
    .split(/[\s-]+/)
    .filter(w => /^[A-Za-z0-9]/.test(w))
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join('')
}

function GeneratedCover({ project, height }: { project: Project; height: string }) {
  const hash = hashOf(project.slug)
  const hue = hash % 360
  const lines = Array.from({ length: 7 }, (_, i) => CODE_LINES[(hash + i * 5) % CODE_LINES.length])

  return (
    <div
      className={`relative w-full ${height} overflow-hidden border-b border-white/10`}
      style={{
        backgroundImage: `linear-gradient(135deg, hsl(${hue} 48% 20%), hsl(${(hue + 45) % 360} 55% 10%))`,
      }}
      aria-hidden="true"
    >
      <pre className="absolute inset-0 p-3 font-mono text-[9px] leading-[1.7] text-white/[0.12] whitespace-pre select-none">
        {lines.join('\n')}
      </pre>
      <div className="absolute inset-0 bg-slate-950/25" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-3xl font-semibold tracking-[0.22em] text-white/35 select-none">
          {initialsOf(project.title)}
        </span>
      </div>
    </div>
  )
}

function ProjectCover({ project, tall }: { project: Project; tall?: boolean }) {
  const height = tall ? 'h-40 sm:h-56' : 'h-40'
  const src = project.image ?? COVER_BY_SLUG[project.slug]
  if (!src) return <GeneratedCover project={project} height={height} />
  return <img src={src} alt={project.title} className={`w-full ${height} object-cover`} />
}

function ProjectCard({ project, tall, flagship }: { project: Project; tall?: boolean; flagship?: boolean }) {
  const hasGithub = project.github.trim().length > 0
  const hasProjectUrl = project.projectUrl.trim().length > 0

  return (
    <div
      className={[
        'rounded-xl overflow-hidden border border-white/10 bg-slate-900/60 flex flex-col relative h-full',
        project.isInDevelopment ? 'project-under-development' : '',
        flagship ? 'project-flagship' : '',
      ].filter(Boolean).join(' ')}
    >
      {flagship && <span className="project-flagship-sheen" />}
      {project.isInDevelopment ? (
        <span className="project-dev-badge absolute top-3 right-3 z-10 text-[10px] uppercase tracking-[0.12em] px-2 py-1 rounded-full border border-indigo-300/40 text-indigo-200 bg-indigo-900/40 backdrop-blur-sm">
          Under Development
        </span>
      ) : (
        <span className="project-finished-badge absolute top-3 right-3 z-10 text-[10px] uppercase tracking-[0.12em] px-2 py-1 rounded-full border border-emerald-300/40 text-emerald-200 bg-emerald-900/35 backdrop-blur-sm">
          Finished
        </span>
      )}
      <ProjectCover project={project} tall={tall} />
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-white font-semibold text-lg mb-2">{project.title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-4">{project.desc}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map(t => <Tag key={t} label={t} />)}
        </div>
        {(hasGithub || hasProjectUrl) && (
          <div className="flex flex-wrap items-center gap-4 mt-auto">
            {hasGithub && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-sm transition-colors">
                <IcoGithub /> View on GitHub
              </a>
            )}
            {hasProjectUrl && (
              <a href={project.projectUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-sm transition-colors">
                <IcoProduction /> Visit this Project
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export function Projects() {
  const [showAll, setShowAll] = useState(false)

  const featured = PROJECTS.filter(p => p.isFeatured)
  const rest = PROJECTS.filter(p => !p.isFeatured)

  return (
    <Section id="projects">
      <SectionHeading>Projects</SectionHeading>

      {featured.length > 0 && (
        <div className={`grid gap-6 ${featured.length > 1 ? 'sm:grid-cols-2' : ''}`}>
          {featured.map((p, i) => (
            <ProjectCard key={p.slug} project={p} tall={featured.length === 1} flagship={i === 0} />
          ))}
        </div>
      )}

      {rest.length > 0 && (
        <>
          <button
            onClick={() => setShowAll(o => !o)}
            aria-expanded={showAll}
            className={`w-full flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-slate-900/40 hover:bg-slate-900/70 hover:border-indigo-400/30 text-indigo-400 hover:text-indigo-300 text-sm py-3 transition-colors ${featured.length > 0 ? 'mt-6' : ''}`}
          >
            <svg className={`w-4 h-4 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            {showAll ? 'Show fewer projects' : `Show all projects (${rest.length} more)`}
          </button>

          {showAll && (
            <div className="grid sm:grid-cols-2 gap-6 mt-6">
              {rest.map((p, i) => (
                <div key={p.slug} className="project-reveal h-full" style={{ animationDelay: `${Math.min(i, 8) * 45}ms` }}>
                  <ProjectCard project={p} />
                </div>
              ))}
            </div>
          )}
        </>
      )}

    </Section>
  )
}
