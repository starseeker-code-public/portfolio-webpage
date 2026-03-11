import { BLOG_POSTS } from '../data'
import { Section, SectionHeading } from '../components/ui'
import { IcoExternal } from '../components/icons'

export function Blog() {
  return (
    <Section id="blog">
      <SectionHeading>Blog / Writing</SectionHeading>
      <div className="space-y-4">
        {BLOG_POSTS.map((p, i) => (
          <a key={i} href={p.url} target="_blank" rel="noopener noreferrer"
            className="flex items-start justify-between gap-4 rounded-xl border border-white/10 bg-slate-900/50 p-5 hover:border-indigo-700/60 transition-colors group">
            <div>
              <h3 className="text-white text-sm font-medium group-hover:text-indigo-300 transition-colors mb-1">{p.title}</h3>
              <p className="text-slate-500 text-xs">{p.date} · {p.readTime} read</p>
            </div>
            <IcoExternal />
          </a>
        ))}
      </div>
    </Section>
  )
}