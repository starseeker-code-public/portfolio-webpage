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

  /* The part not typed yet stays in the flow, invisible. The paragraph is laid
     out at its FINAL size from the first frame, so the lines never re-wrap and
     the hero's vertical centring never shifts — everything around the tagline
     (portrait, stats, buttons) stays put while the text types. The text still
     exists exactly once in the DOM. */
  return (
    <span>
      {displayed}
      {!done && <span className="typewriter-cursor" />}
      <span className="invisible" aria-hidden="true">{text.slice(displayed.length)}</span>
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
      <p className="text-slate-400 max-w-3xl text-base sm:text-lg mb-6">
        <Typewriter key={SITE.tagline} text={SITE.tagline} />
      </p>

      {/* Stats and buttons keep their own layout; the portrait takes the space this
          row used to leave empty on its left, which also nudges them right of
          centre. On phones there is no width to share, so it stacks above them. */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-14 w-full">
        {/* Frame, galaxy-style: the photo sits in a tilted elliptical window, while
            two thin tilted orbits carry a small light each.
            The orbits sit behind the photo, so the lights pass out of sight on the
            far side of it. Everything here is decoration except the one photo. */}
        <div className="hero-portrait relative shrink-0 w-32 h-[170px] sm:w-36 sm:h-48 lg:w-44 lg:h-[235px]">
          <div className="hero-portrait-glow absolute -inset-4 rounded-full bg-gradient-to-br from-indigo-500/50 to-violet-500/40 blur-2xl pointer-events-none" />

          <div className="hero-orbit hero-orbit-a" aria-hidden="true"><span className="hero-orbit-dot" /></div>
          <div className="hero-orbit hero-orbit-b" aria-hidden="true"><span className="hero-orbit-dot" /></div>

          <div className="hero-frame absolute inset-y-0 inset-x-[5%] overflow-hidden ring-2 ring-indigo-400/40 shadow-xl shadow-indigo-500/25">
            <img
              src="/me-hero.jpg"
              alt={`Portrait of ${SITE.name}`}
              width={176}
              height={235}
              fetchPriority="high"
              decoding="async"
              className="hero-frame-img absolute inset-0 w-full h-full object-cover object-top"
            />
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex flex-wrap justify-center gap-8 mb-6">
            {STATS.map(s => (
              <div key={s.label} className="text-center">
                <p className="text-4xl font-bold text-indigo-400">{s.value}</p>
                <p className="text-sm text-slate-500 mt-1">{s.label}</p>
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
        </div>
      </div>
    </section>
  )
}
