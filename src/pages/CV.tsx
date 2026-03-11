import { Link } from 'react-router-dom'
import {
  SITE, BIO, SKILL_GROUPS,
  EXPERIENCE,
  CV_EDUCATION, CV_CERTIFICATIONS, CV_LANGUAGES, CV_VOLUNTEERING,
  OPEN_SOURCE,
} from '../data'
import { IcoDownload, IcoPrint } from '../components/icons'

function CvHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontFamily: 'sans-serif', fontSize: '7.5pt', fontWeight: 700,
      letterSpacing: '.12em', textTransform: 'uppercase' as const,
      color: '#4f46e5', borderBottom: '1px solid #e0e0e8',
      paddingBottom: '3px', margin: '14px 0 8px',
    }}>
      {children}
    </h2>
  )
}

function CvTag({ label }: { label: string }) {
  return (
    <span style={{
      fontFamily: 'sans-serif', fontSize: '7.5pt',
      background: '#eef2ff', color: '#4f46e5',
      borderRadius: '3px', padding: '1px 6px',
    }}>
      {label}
    </span>
  )
}

export default function CV() {
  return (
    <>
      {/* ── Toolbar (hidden on print) ── */}
      <div className="no-print sticky top-0 z-50 bg-slate-950/90 backdrop-blur border-b border-white/5 px-4 h-14 flex items-center justify-between">
        <Link to="/" className="text-indigo-400 font-bold tracking-widest text-sm">
          {SITE.initials}
        </Link>
        <div className="flex items-center gap-3">
          <a href="/cv.pdf" download
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition-colors">
            <IcoDownload /> Download PDF
          </a>
          <button onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs transition-colors">
            <IcoPrint /> Print
          </button>
        </div>
      </div>

      {/* ── CV Document ── */}
      <div className="cv-page" style={{
        width: '210mm', minHeight: '297mm',
        margin: '24px auto', background: '#fff',
        padding: '14mm', boxShadow: '0 4px 32px rgba(79,70,229,.10)',
        fontFamily: 'Georgia, Times New Roman, serif',
        fontSize: '10.5pt', color: '#1e1b4b', lineHeight: '1.5',
      }}>

        {/* Header */}
        <header style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', paddingBottom: '10px', borderBottom: '2px solid #4f46e5', marginBottom: '12px' }}>
          <img src={SITE.photo} alt={SITE.name} style={{ width: '68px', height: '68px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #4f46e5', flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '22pt', fontWeight: 700, color: '#4f46e5', lineHeight: 1.1, fontFamily: 'sans-serif' }}>{SITE.name}</div>
            <div style={{ fontSize: '10.5pt', color: '#6b7280', fontFamily: 'sans-serif', marginTop: '2px', marginBottom: '7px' }}>{SITE.role}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '6px 18px', fontSize: '8.5pt', color: '#6b7280', fontFamily: 'sans-serif' }}>
              <span>📍 {SITE.location}</span>
              <span>📞 {SITE.phone}</span>
              <span>✉ <a href={`mailto:${SITE.email}`} style={{ color: '#4f46e5', textDecoration: 'none' }}>{SITE.email}</a></span>
              <span>🌐 <a href={SITE.website} style={{ color: '#4f46e5', textDecoration: 'none' }}>{SITE.website.replace('https://', '')}</a></span>
              <span>🐙 <a href={SITE.social.github} style={{ color: '#4f46e5', textDecoration: 'none' }}>{SITE.social.github.replace('https://', '')}</a></span>
              <span>🔗 <a href={SITE.social.linkedin} style={{ color: '#4f46e5', textDecoration: 'none' }}>{SITE.social.linkedin.replace('https://', '')}</a></span>
            </div>
          </div>
        </header>

        {/* Two-column body */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 34%', gap: '0 16px' }}>

          {/* LEFT */}
          <div>
            {/* Profile */}
            <CvHeading>Profile</CvHeading>
            <p style={{ fontSize: '9.5pt', color: '#374151', lineHeight: 1.5 }}>{BIO}</p>

            {/* Experience */}
            <CvHeading>Professional Experience</CvHeading>
            {EXPERIENCE.map((e, i) => (
              <div key={i} className="cv-entry" style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '4px' }}>
                  <span style={{ fontFamily: 'sans-serif', fontSize: '10pt', fontWeight: 700 }}>{e.role}</span>
                  <span style={{ fontFamily: 'sans-serif', fontSize: '8pt', color: '#6b7280', whiteSpace: 'nowrap' as const }}>{e.period}</span>
                </div>
                <div style={{ fontFamily: 'sans-serif', fontSize: '9pt', color: '#6366f1', marginBottom: '3px' }}>{e.company}</div>
                <div style={{ fontSize: '9.5pt', color: '#374151', lineHeight: 1.45 }}>{e.desc}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '4px', marginTop: '4px' }}>
                  {e.tags.map(t => <CvTag key={t} label={t} />)}
                </div>
              </div>
            ))}

            {/* Open Source */}
            <CvHeading>Open Source</CvHeading>
            {OPEN_SOURCE.map((r, i) => (
              <div key={i} className="cv-entry" style={{ marginBottom: '7px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontFamily: 'sans-serif', fontSize: '9.5pt', fontWeight: 700 }}>{r.name}</span>
                  <span style={{ fontFamily: 'sans-serif', fontSize: '8pt', color: '#6b7280' }}>★ {r.stars}</span>
                </div>
                <div style={{ fontSize: '9pt', color: '#374151' }}>{r.desc}</div>
              </div>
            ))}

            {/* Volunteering */}
            <CvHeading>Volunteering</CvHeading>
            {CV_VOLUNTEERING.map((v, i) => (
              <div key={i} className="cv-entry" style={{ marginBottom: '7px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'sans-serif', fontSize: '9pt', fontWeight: 600 }}>
                    {v.role} — <span style={{ color: '#6366f1' }}>{v.org}</span>
                  </span>
                  <span style={{ fontFamily: 'sans-serif', fontSize: '8pt', color: '#6b7280' }}>{v.period}</span>
                </div>
                <div style={{ fontSize: '9pt', color: '#374151' }}>{v.desc}</div>
              </div>
            ))}
          </div>

          {/* RIGHT */}
          <div>
            {/* Skills */}
            <CvHeading>Skills</CvHeading>
            {SKILL_GROUPS.map(g => (
              <div key={g.label} style={{ marginBottom: '6px' }}>
                <div style={{ fontFamily: 'sans-serif', fontSize: '8.5pt', fontWeight: 700, marginBottom: '3px' }}>{g.label}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '3px' }}>
                  {g.items.map(s => <CvTag key={s} label={s} />)}
                </div>
              </div>
            ))}

            {/* Languages */}
            <CvHeading>Languages</CvHeading>
            {CV_LANGUAGES.map((l, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'sans-serif', fontSize: '9pt', padding: '3px 0', borderBottom: i < CV_LANGUAGES.length - 1 ? '1px solid #e0e0e8' : 'none' }}>
                <span>{l.lang}</span>
                <span style={{ color: '#4f46e5', fontSize: '8.5pt' }}>{l.level}</span>
              </div>
            ))}

            {/* Education */}
            <CvHeading>Education</CvHeading>
            {CV_EDUCATION.map((e, i) => (
              <div key={i} style={{ marginBottom: '7px' }}>
                <div style={{ fontFamily: 'sans-serif', fontSize: '9pt', fontWeight: 600 }}>{e.degree}</div>
                <div style={{ fontFamily: 'sans-serif', fontSize: '8.5pt', color: '#6b7280' }}>{e.school} · {e.year}</div>
              </div>
            ))}

            {/* Certifications */}
            <CvHeading>Certifications</CvHeading>
            {CV_CERTIFICATIONS.map((c, i) => (
              <div key={i} style={{ marginBottom: '6px' }}>
                <div style={{ fontFamily: 'sans-serif', fontSize: '9pt', fontWeight: 600 }}>{c.name}</div>
                <div style={{ fontFamily: 'sans-serif', fontSize: '8pt', color: '#6b7280' }}>{c.issuer} · {c.year}</div>
              </div>
            ))}
          </div>

        </div>{/* /grid */}
      </div>{/* /cv-page */}
    </>
  )
}