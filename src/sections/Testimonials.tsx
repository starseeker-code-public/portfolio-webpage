import { useState, useEffect } from 'react'
import { TESTIMONIALS } from '../data'
import { Section, SectionHeading } from '../components/ui'

function Arrow({ direction, onClick }: { direction: 'left' | 'right'; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="shrink-0 w-10 h-10 rounded-full border border-white/10 bg-slate-900/80 backdrop-blur flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500/40 transition-all"
    >
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d={direction === 'left' ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'} />
      </svg>
    </button>
  )
}

export function Testimonials() {
  const [active, setActive] = useState(0)
  const [showNote, setShowNote] = useState(false)
  const total = TESTIMONIALS.length

  const prev = () => setActive(i => (i - 1 + total) % total)
  const next = () => setActive(i => (i + 1) % total)

  useEffect(() => {
    const t = setTimeout(() => setShowNote(true), 2000)
    return () => clearTimeout(t)
  }, [])

  return (
    <Section id="testimonials">
      <SectionHeading>Testimonials</SectionHeading>

      {/* Arrows flank the card from sm up; below that they would eat ~110px of a
          328px row and squeeze the quote into a ~168px column, so they move
          under the card instead. */}
      <div className="flex items-center gap-4 max-w-2xl mx-auto">
        <div className="hidden sm:block">
          <Arrow direction="left" onClick={prev} />
        </div>

        <div className="relative flex-1 min-w-0 overflow-hidden">
          {TESTIMONIALS.map((t, i) => {
            const offset = i - active
            const isActive = offset === 0
            let pos = offset
            if (pos > Math.floor(total / 2)) pos -= total
            if (pos < -Math.floor(total / 2)) pos += total

            return (
              <div
                key={i}
                className="transition-all duration-500 ease-in-out"
                style={{
                  position: isActive ? 'relative' : 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  opacity: isActive ? 1 : 0.3,
                  transform: `translateX(${pos * 60}px) scale(${isActive ? 1 : 0.92})`,
                  width: '100%',
                  zIndex: isActive ? 10 : 5,
                  pointerEvents: isActive ? 'auto' : 'none',
                  filter: isActive ? 'none' : 'blur(1.5px)',
                }}
              >
                <div className={`rounded-xl border p-4 sm:p-6 flex flex-col transition-all duration-500 ${
                  isActive ? 'border-indigo-500/30 bg-slate-900/70' : 'border-white/5 bg-slate-900/30'
                }`}>
                  <p className="text-indigo-400 text-2xl mb-2 font-serif">"</p>
                  <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-5 text-justify">{t.text || <span className="italic text-slate-600">Testimonial coming soon...</span>}</p>
                  <div>
                    <p className="text-white text-sm font-semibold">{t.name}</p>
                    <p className="text-slate-500 text-xs">{t.role}</p>
                    <p className="text-slate-600 text-xs mt-1 break-words">{t.email} · {t.phone}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="hidden sm:block">
          <Arrow direction="right" onClick={next} />
        </div>
      </div>

      {/* Dots, flanked by the arrows on phones */}
      <div className="flex justify-center items-center gap-2 mt-5">
        <div className="sm:hidden mr-2">
          <Arrow direction="left" onClick={prev} />
        </div>
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === active ? 'bg-indigo-400 w-6' : 'bg-slate-700 hover:bg-slate-600 w-2'
            }`}
          />
        ))}
        <div className="sm:hidden ml-2">
          <Arrow direction="right" onClick={next} />
        </div>
      </div>

      {/* Delayed recommendation note */}
      <div className={`transition-opacity duration-700 ${showNote ? 'opacity-100' : 'opacity-0'}`}>
        <p className="text-center text-slate-500 text-xs mt-6 border border-white/5 rounded-lg px-4 py-3 bg-slate-900/30 max-w-md mx-auto">
          I also have two written recommendation letters and several LinkedIn recommendations — available on my CV.
        </p>
      </div>
    </Section>
  )
}
