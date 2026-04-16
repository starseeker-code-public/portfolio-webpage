import { SITE } from '../data'
import { useRandomQuote } from '../data/quotes'
import { Section, SectionHeading } from '../components/ui'
import { IcoGithub, IcoLinkedin, IcoInstagram, IcoCodewars, IcoMail, IcoWhatsapp, IcoDevto } from '../components/icons'

const SOCIAL_LINKS = [
  { label: 'GitHub',    icon: <IcoGithub />,    href: SITE.social.github },
  { label: 'LinkedIn',  icon: <IcoLinkedin />,  href: SITE.social.linkedin },
  { label: 'Codewars',  icon: <IcoCodewars />,  href: SITE.social.codewars },
  { label: 'DEV.to',    icon: <IcoDevto />,     href: SITE.social.devto },
  { label: 'WhatsApp',  icon: <IcoWhatsapp />,  href: SITE.social.whatsapp },
  { label: 'Instagram', icon: <IcoInstagram />, href: SITE.social.instagram },
]

export function Contact() {
  const quote = useRandomQuote()

  return (
    <Section id="contact">
      <SectionHeading>Contact</SectionHeading>

      <p className="text-slate-400 text-sm mb-6 max-w-lg">
        Have a project in mind or just want to talk Python? Feel free to reach out.
      </p>

      {quote && (
        <p className="text-slate-500 text-xs italic mb-8 max-w-lg">
          "{quote.q}" — {quote.a}
        </p>
      )}

      <div className="flex flex-col sm:flex-row flex-wrap gap-3">
        <a href={`mailto:${SITE.email}`}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm transition-colors">
          <IcoMail /> {SITE.email}
        </a>
        <a href={SITE.phoneUrl}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm transition-colors">
          📞 {SITE.phone}
        </a>
        <a href={SITE.social.whatsapp} target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm transition-colors">
          <IcoWhatsapp /> WhatsApp
        </a>
        <a href={SITE.locationUrl} target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm transition-colors">
          📍 {SITE.location}
        </a>
      </div>

      <div className="flex flex-wrap gap-3 mt-4">
        {SOCIAL_LINKS.map(l => (
          <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm transition-colors">
            {l.icon} {l.label}
          </a>
        ))}
      </div>
    </Section>
  )
}
