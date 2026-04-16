import { BLOG_POSTS } from '../data'
import { Section, SectionHeading } from '../components/ui'
import { IcoExternal } from '../components/icons'

const MOCK_POSTS = [
  {
    title: 'Why I switched from Celery to asyncio queues for I/O-bound tasks',
    date: 'Mar 2026',
    url: '#',
    readTime: '8 min',
  },
  {
    title: 'Lessons from refactoring 2 million lines of Python at Frenetic',
    date: 'Feb 2026',
    url: '#',
    readTime: '12 min',
  },
  {
    title: 'Using Claude Code daily as a senior engineer — what actually works',
    date: 'Jan 2026',
    url: '#',
    readTime: '6 min',
  },
]

function PostCard({ p }: { p: typeof MOCK_POSTS[number] }) {
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
  const posts = BLOG_POSTS.length > 0 ? BLOG_POSTS : MOCK_POSTS

  return (
    <Section id="blog">
      <SectionHeading>Personal Blog</SectionHeading>

      {BLOG_POSTS.length === 0 && (
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
