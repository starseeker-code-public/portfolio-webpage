import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { SITE } from '../../data'
import {
  IcoGithub, IcoLinkedin, IcoInstagram, IcoCodewars, IcoMail, IcoMenu, IcoClose,
} from '../icons'

const NAV_SECTIONS = ['About', 'Experience', 'Projects', 'Testimonials', 'Services', 'Contact']

const SOCIAL = [
  { key: 'github',    icon: <IcoGithub />,    href: SITE.social.github },
  { key: 'linkedin',  icon: <IcoLinkedin />,  href: SITE.social.linkedin },
  { key: 'instagram', icon: <IcoInstagram />, href: SITE.social.instagram },
  { key: 'codewars',  icon: <IcoCodewars />,  href: SITE.social.codewars },
  { key: 'email',     icon: <IcoMail />,      href: `mailto:${SITE.email}` },
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
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link to="/" className="text-indigo-400 font-bold tracking-widest text-sm shrink-0">
          {SITE.initials}
        </Link>

        {/* Desktop nav sections */}
        <ul className="hidden lg:flex gap-5 flex-1">
          {NAV_SECTIONS.map(l => (
            <li key={l}>
              <button onClick={() => scrollTo(l)}
                className="text-slate-400 hover:text-white text-xs tracking-wide transition-colors">
                {l}
              </button>
            </li>
          ))}
          <li>
            <Link to="/cv"
              className={`text-xs tracking-wide transition-colors ${location.pathname === '/cv' ? 'text-indigo-400' : 'text-slate-400 hover:text-white'}`}>
              CV
            </Link>
          </li>
        </ul>

        {/* Social icons — desktop */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          {SOCIAL.map(s => (
            <a key={s.key} href={s.href} target="_blank" rel="noopener noreferrer"
              className="text-slate-500 hover:text-indigo-400 transition-colors">
              {s.icon}
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button className="lg:hidden text-slate-400 ml-auto" onClick={() => setOpen(o => !o)}>
          {open ? <IcoClose /> : <IcoMenu />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden border-t border-white/5 px-4 pb-6" style={{ background: 'rgb(6, 5, 22)' }}>
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
          <div className="flex gap-5 pt-5">
            {SOCIAL.map(s => (
              <a key={s.key} href={s.href} target="_blank" rel="noopener noreferrer"
                className="text-slate-500 hover:text-indigo-400 transition-colors">
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}