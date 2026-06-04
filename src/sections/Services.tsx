import { useState, useRef, useEffect } from 'react'
import { SERVICES } from '../data'
import { Section, SectionHeading } from '../components/ui'

function ServiceIcon({ index }: { index: number }) {
  const gId = `sg${index}`
  const g = `url(#${gId})`

  const defs = (
    <defs>
      <linearGradient id={gId} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#a5b4fc" />
        <stop offset="100%" stopColor="#7c3aed" />
      </linearGradient>
    </defs>
  )

  const base = { viewBox: '0 0 24 24', fill: 'none' as const }

  switch (index) {
    case 0: return (
      <svg {...base}>
        {defs}
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill={g} />
        <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
    case 1: return (
      <svg {...base}>
        {defs}
        <polyline points="16 16 12 12 8 16" stroke={g} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="12" y1="12" x2="12" y2="21" stroke={g} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" stroke={g} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
    case 2: return (
      <svg {...base}>
        {defs}
        <line x1="3" y1="22" x2="21" y2="22" stroke={g} strokeWidth="2" strokeLinecap="round" />
        <line x1="6" y1="18" x2="6" y2="11" stroke={g} strokeWidth="2" strokeLinecap="round" />
        <line x1="10" y1="18" x2="10" y2="11" stroke={g} strokeWidth="2" strokeLinecap="round" />
        <line x1="14" y1="18" x2="14" y2="11" stroke={g} strokeWidth="2" strokeLinecap="round" />
        <line x1="18" y1="18" x2="18" y2="11" stroke={g} strokeWidth="2" strokeLinecap="round" />
        <line x1="3" y1="10" x2="21" y2="10" stroke={g} strokeWidth="2" strokeLinecap="round" />
        <path d="M3 10L12 3l9 7" stroke={g} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
    case 3: return (
      <svg {...base}>
        {defs}
        <polyline points="23 4 23 10 17 10" stroke={g} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="1 20 1 14 7 14" stroke={g} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" stroke={g} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
    case 4: return (
      <svg {...base}>
        {defs}
        <rect x="4" y="4" width="16" height="16" rx="2" stroke={g} strokeWidth="2" />
        <rect x="9" y="9" width="6" height="6" fill={g} />
        <line x1="9" y1="1" x2="9" y2="4" stroke={g} strokeWidth="2" strokeLinecap="round" />
        <line x1="15" y1="1" x2="15" y2="4" stroke={g} strokeWidth="2" strokeLinecap="round" />
        <line x1="9" y1="20" x2="9" y2="23" stroke={g} strokeWidth="2" strokeLinecap="round" />
        <line x1="15" y1="20" x2="15" y2="23" stroke={g} strokeWidth="2" strokeLinecap="round" />
        <line x1="20" y1="9" x2="23" y2="9" stroke={g} strokeWidth="2" strokeLinecap="round" />
        <line x1="20" y1="14" x2="23" y2="14" stroke={g} strokeWidth="2" strokeLinecap="round" />
        <line x1="1" y1="9" x2="4" y2="9" stroke={g} strokeWidth="2" strokeLinecap="round" />
        <line x1="1" y1="14" x2="4" y2="14" stroke={g} strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
    case 5: return (
      <svg {...base}>
        {defs}
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke={g} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9" cy="7" r="4" stroke={g} strokeWidth="2" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke={g} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke={g} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
    case 6: return (
      <svg {...base}>
        {defs}
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill={g} />
      </svg>
    )
    case 7: return (
      <svg {...base}>
        {defs}
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke={g} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="22 4 12 14.01 9 11.01" stroke={g} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
    default: return null
  }
}

function AccordionItem({ service, index, isOpen, onToggle }: {
  service: typeof SERVICES[number]
  index: number
  isOpen: boolean
  onToggle: () => void
}) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight)
    }
  }, [isOpen])

  return (
    <div
      className={`rounded-xl border bg-slate-900/50 transition-colors duration-300 ${
        isOpen ? 'border-indigo-700/60' : 'border-white/10 hover:border-white/20'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 px-5 py-4 text-left group"
      >
        <div className="w-10 h-10 rounded-xl bg-indigo-950/70 border border-indigo-700/25 flex items-center justify-center shrink-0 [&_svg]:w-5 [&_svg]:h-5 transition-colors duration-300 group-hover:border-indigo-600/40 group-hover:bg-indigo-950/90">
          <ServiceIcon index={index} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={`font-semibold text-sm transition-colors duration-300 ${
            isOpen ? 'text-indigo-300' : 'text-white group-hover:text-indigo-300'
          }`}>
            {service.title}
          </h3>
          <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">{service.desc}</p>
        </div>
        <svg
          className={`w-4 h-4 shrink-0 text-slate-500 transition-transform duration-300 ${
            isOpen ? 'rotate-180 text-indigo-400' : ''
          }`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
        style={{ maxHeight: isOpen ? `${height}px` : '0px' }}
      >
        <div ref={contentRef} className="px-5 pb-5 pt-0">
          <div className="border-t border-white/5 pt-4">
            <p className="text-slate-400 text-sm leading-relaxed text-justify">{service.details}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Services() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <Section id="services">
      <SectionHeading>Services</SectionHeading>
      <div className="grid gap-3">
        {SERVICES.map((s, i) => (
          <AccordionItem
            key={s.title}
            service={s}
            index={i}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>
    </Section>
  )
}
