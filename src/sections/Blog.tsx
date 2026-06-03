import { useBlogPosts } from '../data/blog'
import { Section, SectionHeading } from '../components/ui'
import { IcoExternal } from '../components/icons'
import type { BlogPost } from '../types'

function PostCard({ p }: { p: BlogPost }) {
  return (
    <a href={p.url} target="_blank" rel="noopener noreferrer"
      className="flex items-start justify-between gap-4 rounded-xl border border-white/10 bg-slate-900/50 p-5 hover:border-indigo-700/60 transition-colors group">
      <div>
        <h3 className="text-white text-sm font-medium group-hover:text-indigo-300 transition-colors mb-1">{p.title}</h3>
        <p className="text-slate-500 text-xs">{p.date} · {p.readTime} read</p>
      </div>
      <IcoExternal />
    </a>
  )
}

export function Blog() {
  const { posts, isLive } = useBlogPosts()

  return (
    <Section id="blog">
      <SectionHeading>Personal Blog</SectionHeading>

      {!isLive && (
        <p className="text-slate-500 text-xs mb-5 tracking-wide uppercase">
          Preview — posts coming soon
        </p>
      )}

      <div className="space-y-4">
        {posts.map((p, i) => <PostCard key={i} p={p} />)}
      </div>
    </Section>
  )
}
