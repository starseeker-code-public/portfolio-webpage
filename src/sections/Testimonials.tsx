import { useState } from 'react'
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
  const total = TESTIMONIALS.length

  const prev = () => setActive(i => (i - 1 + total) % total)
  const next = () => setActive(i => (i + 1) % total)

  return (
    <Section id="testimonials">
      <SectionHeading>Testimonials</SectionHeading>

      {/* Arrows + carousel in a row — arrows stay fixed in place */}
      <div className="flex items-center gap-4 max-w-2xl mx-auto">
        <Arrow direction="left" onClick={prev} />

        <div className="relative flex-1 overflow-hidden">
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
                  zIndex: isActive ? 10 : 5,
                  pointerEvents: isActive ? 'auto' : 'none',
                  filter: isActive ? 'none' : 'blur(1.5px)',
                }}
              >
                <div className={`rounded-xl border p-6 flex flex-col transition-all duration-500 ${
                  isActive ? 'border-indigo-500/30 bg-slate-900/70' : 'border-white/5 bg-slate-900/30'
                }`}>
                  <p className="text-indigo-400 text-2xl mb-2 font-serif">"</p>
                  <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-5 text-justify">{t.text || <span className="italic text-slate-600">Testimonial coming soon...</span>}</p>
                  <div>
                    <p className="text-white text-sm font-semibold">{t.name}</p>
                    <p className="text-slate-500 text-xs">{t.role}</p>
                    <p className="text-slate-600 text-xs mt-1">{t.email} · {t.phone}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <Arrow direction="right" onClick={next} />
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-5">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === active ? 'bg-indigo-400 w-6' : 'bg-slate-700 hover:bg-slate-600'
            }`}
          />
        ))}
      </div>
    </Section>
  )
}
