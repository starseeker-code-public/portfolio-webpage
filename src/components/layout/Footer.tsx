import { SITE } from '../../data'

export default function Footer() {
  return (
    <footer className="relative z-10 text-center py-8 text-slate-600 text-xs border-t border-white/5">
      © {new Date().getFullYear()} {SITE.name} — Built with React & Tailwind
    </footer>
  )
}