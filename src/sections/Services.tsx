import { SERVICES } from '../data'
import { Section, SectionHeading } from '../components/ui'

export function Services() {
  return (
    <Section id="services">
      <SectionHeading>Services</SectionHeading>
      <div className="grid sm:grid-cols-2 gap-5">
        {SERVICES.map(s => (
          <div key={s.title} className="rounded-xl border border-white/10 bg-slate-900/50 p-6">
            <div className="text-3xl mb-3">{s.icon}</div>
            <h3 className="text-white font-semibold mb-2">{s.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}