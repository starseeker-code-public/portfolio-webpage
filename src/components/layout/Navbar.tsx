import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { SITE } from '../../data'
import {
  IcoGithub, IcoLinkedin, /* IcoInstagram, */ IcoCodewars, IcoMail, IcoWhatsapp, IcoDevto, IcoMenu, IcoClose,
} from '../icons'

const NAV_SECTIONS = ['About', 'Experience', 'Projects', 'Blog', 'Services', 'Testimonials', 'Open Source', 'Contact']

const SOCIAL = [
  { key: 'github',    icon: <IcoGithub />,    href: SITE.social.github },
  { key: 'email',     icon: <IcoMail />,      href: `mailto:${SITE.email}` },
  { key: 'linkedin',  icon: <IcoLinkedin />,  href: SITE.social.linkedin },
  { key: 'codewars',  icon: <IcoCodewars />,  href: SITE.social.codewars },
  { key: 'devto',     icon: <IcoDevto />,     href: SITE.social.devto },
  { key: 'whatsapp',  icon: <IcoWhatsapp />,  href: SITE.social.whatsapp },
  // { key: 'instagram', icon: <IcoInstagram />, href: SITE.social.instagram },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const scrollTo = (id: string) => {
    const el = document.getElementById(id.toLowerCase().replace(' ', '-'))
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    } else {
      // If on /cv, go home first then scroll
      navigate('/', { state: { scrollTo: id } })
    }
    setOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur border-b border-white/5" style={{ background: 'rgba(6, 5, 22, 0.88)' }}>
      <div className="max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link to="/" className="text-indigo-400 font-bold tracking-widest text-sm shrink-0">
          {SITE.initials}
        </Link>

        {/* Desktop nav sections */}
        <ul className="hidden md:flex md:gap-3 lg:gap-5 flex-1">
          {NAV_SECTIONS.map(l => (
            <li key={l}>
              <button onClick={() => scrollTo(l)}
                className="text-slate-400 hover:text-white text-[11px] lg:text-xs tracking-wide transition-colors whitespace-nowrap">
                {l}
              </button>
            </li>
          ))}
          <li>
            <Link to="/cv"
              className={`text-[11px] lg:text-xs tracking-wide transition-colors ${location.pathname === '/cv' ? 'text-indigo-400' : 'text-slate-400 hover:text-white'}`}>
              CV
            </Link>
          </li>
        </ul>

        {/* Social icons — desktop */}
        <div className="hidden sm:flex md:hidden lg:flex items-center shrink-0">
          {SOCIAL.map(s => (
            <a key={s.key} href={s.href} target="_blank" rel="noopener noreferrer"
              aria-label={s.key}
              className="flex items-center justify-center w-11 h-11 text-slate-500 hover:text-indigo-400 transition-colors">
              {s.icon}
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex items-center justify-center w-11 h-11 -mr-2 text-slate-400 ml-auto"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen(o => !o)}>
          {open ? <IcoClose /> : <IcoMenu />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-white/5 px-4 pb-6 max-h-[calc(100vh-3.5rem)] overflow-y-auto" style={{ background: 'rgb(6, 5, 22)' }}>
          {NAV_SECTIONS.map(l => (
            <button key={l} onClick={() => scrollTo(l)}
              className="block w-full text-left py-3 text-slate-300 hover:text-white text-sm border-b border-white/5">
              {l}
            </button>
          ))}
          <Link to="/cv" onClick={() => setOpen(false)}
            className="block w-full text-left py-3 text-slate-300 hover:text-white text-sm border-b border-white/5">
            CV
          </Link>
          <div className="flex flex-wrap gap-2 pt-4">
            {SOCIAL.map(s => (
              <a key={s.key} href={s.href} target="_blank" rel="noopener noreferrer"
                aria-label={s.key}
                className="flex items-center justify-center w-11 h-11 rounded-lg text-slate-500 hover:text-indigo-400 hover:bg-white/5 transition-colors">
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}