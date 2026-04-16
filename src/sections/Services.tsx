import { useState, useRef, useEffect } from 'react'
import { SERVICES } from '../data'
import { Section, SectionHeading } from '../components/ui'

function AccordionItem({ service, isOpen, onToggle }: {
  service: typeof SERVICES[number]
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
        <span className="text-xl shrink-0">{service.icon}</span>
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
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>
    </Section>
  )
}
