import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { SITE, STATS } from '../data'

function Typewriter({ text, speed = 45 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    let i = 0
    setDisplayed('')
    setDone(false)
    const id = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) { clearInterval(id); setDone(true) }
    }, speed)
    return () => clearInterval(id)
  }, [text, speed])

  return (
    <span>
      {displayed}
      {!done && <span className="typewriter-cursor" />}
    </span>
  )
}

function RoleRotator({ roles }: { roles: string[] }) {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex(i => (i + 1) % roles.length)
        setVisible(true)
      }, 600)
    }, 4000)
    return () => clearInterval(id)
  }, [roles.length])

  return (
    <span
      className="inline-block transition-all duration-500 ease-in-out"
      style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(6px)' }}
    >
      {roles[index]}
    </span>
  )
}

export function Hero() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-4 pt-14">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-indigo-700/15 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-48 h-48 rounded-full bg-violet-800/10 blur-3xl pointer-events-none" />

      <p className="text-indigo-400 text-xs tracking-[0.3em] uppercase mb-4"><RoleRotator roles={SITE.role} /></p>
      <h1 className="text-5xl sm:text-7xl font-bold text-white leading-tight mb-6 font-anta">
        {SITE.name.split(' ')[0]}{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
          {SITE.name.split(' ')[1]}
        </span>
      </h1>
      <p className="text-slate-400 max-w-lg text-base sm:text-lg mb-10">
        <Typewriter text={SITE.tagline} />
      </p>

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
