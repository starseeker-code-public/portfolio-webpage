import { TESTIMONIALS } from '../data'
import { Section, SectionHeading } from '../components/ui'

export function Testimonials() {
  return (
    <Section id="testimonials">
      <SectionHeading>Testimonials</SectionHeading>
      <div className="grid sm:grid-cols-3 gap-5">
        {TESTIMONIALS.map((t, i) => (
          <div key={i} className="rounded-xl border border-white/10 bg-slate-900/50 p-5 flex flex-col">
            <p className="text-indigo-400 text-xl mb-3">"</p>
            <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-4">{t.text}</p>
            <div>
              <p className="text-white text-sm font-semibold">{t.name}</p>
              <p className="text-slate-500 text-xs">{t.role}</p>
              <p className="text-slate-600 text-xs mt-1">{t.email} · {t.phone}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}