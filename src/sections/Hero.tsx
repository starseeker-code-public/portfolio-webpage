import { Link } from 'react-router-dom'
import { SITE, STATS } from '../data'

export function Hero() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-4 pt-14">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-indigo-700/15 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-48 h-48 rounded-full bg-violet-800/10 blur-3xl pointer-events-none" />

      <p className="text-indigo-400 text-xs tracking-[0.3em] uppercase mb-4">{SITE.role}</p>
      <h1 className="text-5xl sm:text-7xl font-bold text-white leading-tight mb-6">
        {SITE.name.split(' ')[0]}{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
          {SITE.name.split(' ')[1]}
        </span>
      </h1>
      <p className="text-slate-400 max-w-lg text-base sm:text-lg mb-10">{SITE.tagline}</p>

      <div className="flex flex-wrap justify-center gap-6 mb-10">
        {STATS.map(s => (
          <div key={s.label} className="text-center">
            <p className="text-2xl font-bold text-indigo-400">{s.value}</p>
            <p className="text-xs text-slate-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-3 flex-wrap justify-center">
        <button onClick={() => scrollTo('projects')}
          className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors">
          View Projects
        </button>
        <Link to="/cv"
          className="px-6 py-3 rounded-lg border border-white/20 hover:border-indigo-500 text-slate-300 hover:text-white text-sm font-medium transition-colors">
          View CV
        </Link>
        <button onClick={() => scrollTo('contact')}
          className="px-6 py-3 rounded-lg border border-white/10 hover:border-white/30 text-slate-400 hover:text-white text-sm font-medium transition-colors">
          Contact
        </button>
      </div>
    </section>
  )
}