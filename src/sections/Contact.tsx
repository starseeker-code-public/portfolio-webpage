import { SITE } from '../data'
import { Section, SectionHeading } from '../components/ui'
import { IcoGithub, IcoLinkedin, IcoInstagram, IcoCodewars, IcoMail } from '../components/icons'

export function Contact() {
  const links = [
    { label: 'GitHub',    icon: <IcoGithub />,    href: SITE.social.github },
    { label: 'LinkedIn',  icon: <IcoLinkedin />,  href: SITE.social.linkedin },
    { label: 'Instagram', icon: <IcoInstagram />, href: SITE.social.instagram },
    { label: 'Codewars',  icon: <IcoCodewars />,  href: SITE.social.codewars },
  ]

  return (
    <Section id="contact">
      <SectionHeading>Contact</SectionHeading>
      <p className="text-slate-400 mb-8 max-w-md">
        Have a project in mind or just want to talk Python? Feel free to reach out.
      </p>
      <div className="flex flex-col sm:flex-row flex-wrap gap-4">
        <a href={`mailto:${SITE.email}`}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm transition-colors">
          <IcoMail /> {SITE.email}
        </a>
        <a href={SITE.phoneUrl}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm transition-colors">
          📞 {SITE.phone}
        </a>
        <a href={SITE.locationUrl} target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm transition-colors">
          📍 {SITE.location}
        </a>
        {links.map(l => (
          <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm transition-colors">
            {l.icon} {l.label}
          </a>
        ))}
      </div>
    </Section>
  )
}