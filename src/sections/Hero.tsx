import { Link } from 'react-router-dom'
import { useEffect, useLayoutEffect, useState } from 'react'
import { SITE, STATS } from '../data'

/* useLayoutEffect logs a warning under renderToString, and the prerender pass in
   scripts/prerender.mjs renders this page on the server. */
const useBeforePaint = typeof window === 'undefined' ? useEffect : useLayoutEffect

function prefersReducedMotion() {
  return typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/* Starts *finished*, then rewinds before the first paint.
 *
 * The obvious version starts at '' and fills in over text.length * speed ms —
 * 7s for the current tagline. That is 7s in which the sentence does not exist in
 * the DOM, and a crawler reading the prerendered HTML (or Googlebot snapshotting
 * a render) sees an empty paragraph where the page's densest line should be.
 *
 * So the server emits the whole string, hydration matches it, and the rewind
 * happens in a layout effect — before the browser paints, so nothing flashes.
 * Readers who asked for reduced motion simply keep the finished text. */
function Typewriter({ text, speed = 45 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState(text)
  const [done, setDone] = useState(true)

  useBeforePaint(() => {
    if (prefersReducedMotion()) return
    setDisplayed('')
    setDone(false)
  }, [text])

  useEffect(() => {
    if (prefersReducedMotion()) return
    let i = 0
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

const NAME_WORDS = SITE.name.split(' ')
const NAME_TAIL = NAME_WORDS[NAME_WORDS.length - 1]
const NAME_HEAD = NAME_WORDS.slice(0, -1).join(' ')

export function Hero() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="relative z-10 min-h-[100svh] flex flex-col items-center justify-center text-center px-4 sm:px-6 py-20 pt-24">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-indigo-700/15 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-48 h-48 rounded-full bg-violet-800/10 blur-3xl pointer-events-none" />

      <p className="text-indigo-400 text-xs tracking-[0.3em] uppercase mb-4"><RoleRotator roles={SITE.role} /></p>
      {/* The page's one h1, and it has to carry the full legal name: the previous
          version took words [0] and [1] off SITE.name and silently dropped
          "Martínez", so the surname people actually search never appeared in the
          markup. The gradient falls on the last word, as before. */}
      <h1 className="text-[2.75rem] sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 font-anta break-words max-w-full">
        {NAME_HEAD}{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
          {NAME_TAIL}
        </span>
      </h1>
      <p className="text-slate-400 max-w-lg text-base sm:text-lg mb-10">
        <Typewriter key={SITE.tagline} text={SITE.tagline} />
      </p>

      <div className="flex flex-wrap justify-center gap-6 mb-10">
        {STATS.map(s => (
          <div key={s.label} className="text-center">
            <p className="text-2xl font-bold text-indigo-400">{s.value}</p>
            <p className="text-xs text-slate-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-3 flex-wrap justify-center w-full max-w-sm sm:max-w-none">
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
