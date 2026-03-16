import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import {
  SITE, BIO, SKILL_GROUPS, SPECIALIZATIONS,
  EXPERIENCE, TEACHING,
  CV_EDUCATION, CV_CERTIFICATIONS, CV_LANGUAGES,
  // CV_VOLUNTEERING,
  // OPEN_SOURCE,
} from '../data'
import { IcoDownload } from '../components/icons'
import Footer from '../components/layout/Footer'

/* ── Inline GitHub SVG for CV header (matches CV font size) ── */
function CvGithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '12px', height: '12px', display: 'inline', verticalAlign: 'middle', marginRight: '3px' }}>
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

/* ── Dark/light mode toggle icon ── */
function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" strokeLinecap="round" />
    </svg>
  )
}

/* ── Theme-aware helpers ── */
interface ThemeColors {
  bg: string
  text: string
  muted: string
  accent: string
  accentLight: string
  border: string
  tagBg: string
  tagText: string
  headingBorder: string
  shadow: string
}

const LIGHT: ThemeColors = {
  bg: '#ffffff',
  text: '#1e1b4b',
  muted: '#374151',
  accent: '#4f46e5',
  accentLight: '#6366f1',
  border: '#e0e0e8',
  tagBg: '#eef2ff',
  tagText: '#4f46e5',
  headingBorder: '#e0e0e8',
  shadow: '0 4px 32px rgba(79,70,229,.10)',
}

const DARK: ThemeColors = {
  bg: '#0f0e1a',
  text: '#e2e0f0',
  muted: '#a0a0b8',
  accent: '#818cf8',
  accentLight: '#a5b4fc',
  border: '#2a2840',
  tagBg: 'rgba(99,102,241,0.15)',
  tagText: '#a5b4fc',
  headingBorder: '#2a2840',
  shadow: '0 4px 32px rgba(0,0,0,.30)',
}

function CvHeading({ children, t }: { children: React.ReactNode; t: ThemeColors }) {
  return (
    <h2 style={{
      fontFamily: 'sans-serif', fontSize: '7.5pt', fontWeight: 700,
      letterSpacing: '.12em', textTransform: 'uppercase' as const,
      color: t.accent, borderBottom: `1px solid ${t.headingBorder}`,
      paddingBottom: '3px', margin: '14px 0 8px',
      transition: 'color 0.5s, border-color 0.5s',
    }}>
      {children}
    </h2>
  )
}

function CvTag({ label, t }: { label: string; t: ThemeColors }) {
  return (
    <span style={{
      fontFamily: 'sans-serif', fontSize: '7.5pt',
      background: t.tagBg, color: t.tagText,
      borderRadius: '3px', padding: '1px 6px',
      transition: 'background 0.5s, color 0.5s',
    }}>
      {label}
    </span>
  )
}

export default function CV() {
  const [dark, setDark] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  const [showPrintingOverlay, setShowPrintingOverlay] = useState(false)
  const cvRef = useRef<HTMLDivElement>(null)
  const overlayTimeoutRef = useRef<number | null>(null)
  const t = dark ? DARK : LIGHT
  const pageBg = dark ? '#060516' : '#eef2ff'

  useEffect(() => {
    return () => {
      if (overlayTimeoutRef.current !== null) {
        window.clearTimeout(overlayTimeoutRef.current)
      }
    }
  }, [])

  const waitForNextPaint = () =>
    new Promise<void>(resolve => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => resolve())
      })
    })

  const generatePDF = async () => {
    if (!cvRef.current || isGenerating) return

    const cvElement = cvRef.current
    const cvGridElement = cvElement.querySelector<HTMLElement>('.cv-grid')
    const previousCvStyle = cvElement.style.cssText
    const previousGridStyle = cvGridElement?.style.cssText ?? ''
    const previousDark = dark
    const exportScale = 2

    if (overlayTimeoutRef.current !== null) {
      window.clearTimeout(overlayTimeoutRef.current)
      overlayTimeoutRef.current = null
    }

    setShowPrintingOverlay(true)
    setIsGenerating(true)

    try {
      // Export must always use day mode for a consistent PDF result.
      if (previousDark) {
        setDark(false)
        await waitForNextPaint()
      }

      // Force desktop CV layout for export so small-screen responsive rules do not alter PDF structure.
      cvElement.style.transition = 'none'
      cvElement.style.setProperty('width', '210mm', 'important')
      cvElement.style.setProperty('min-height', '297mm', 'important')
      cvElement.style.setProperty('margin', '24px auto', 'important')
      cvElement.style.setProperty('padding', '14mm', 'important')
      cvElement.style.setProperty('font-size', '10.5pt', 'important')

      if (cvGridElement) {
        cvGridElement.style.setProperty('display', 'grid', 'important')
        cvGridElement.style.setProperty('grid-template-columns', '1fr 34%', 'important')
        cvGridElement.style.setProperty('gap', '0 16px', 'important')
      }

      await waitForNextPaint()

      const cvRect = cvElement.getBoundingClientRect()
      const breakCandidatesPx = Array.from(
        cvElement.querySelectorAll<HTMLElement>('[data-pdf-break-before], .cv-entry, h2, .section-no-break'),
      )
        .map(node => Math.round((node.getBoundingClientRect().top - cvRect.top) * exportScale))
        .filter(y => y > 0)
        .sort((a, b) => a - b)
        .filter((value, index, arr) => index === 0 || value !== arr[index - 1])

      const canvas = await html2canvas(cvElement, {
        scale: exportScale,
        useCORS: true,
        logging: false,
        backgroundColor: null,
        width: cvElement.scrollWidth,
        height: cvElement.scrollHeight,
        windowWidth: cvElement.scrollWidth,
        windowHeight: cvElement.scrollHeight,
        scrollX: 0,
        scrollY: -window.scrollY,
      })

      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
      const pageWidthMm = pdf.internal.pageSize.getWidth()
      const pageHeightMm = pdf.internal.pageSize.getHeight()
      const pageHeightPx = Math.floor((canvas.width * pageHeightMm) / pageWidthMm)

      let renderedHeightPx = 0
      let pageIndex = 0

      while (renderedHeightPx < canvas.height) {
        const remainingPx = canvas.height - renderedHeightPx
        let sliceHeightPx = Math.min(pageHeightPx, remainingPx)

        if (remainingPx > pageHeightPx) {
          const minSmartBreak = renderedHeightPx + Math.floor(pageHeightPx * 0.65)
          const maxSmartBreak = renderedHeightPx + pageHeightPx
          const smartBreak = breakCandidatesPx
            .filter(y => y > minSmartBreak && y < maxSmartBreak)
            .pop()

          if (smartBreak) {
            sliceHeightPx = smartBreak - renderedHeightPx
          }
        }

        if (sliceHeightPx <= 0) {
          sliceHeightPx = Math.min(pageHeightPx, remainingPx)
        }

        const sliceCanvas = document.createElement('canvas')
        sliceCanvas.width = canvas.width
        sliceCanvas.height = sliceHeightPx

        const sliceContext = sliceCanvas.getContext('2d')
        if (!sliceContext) {
          throw new Error('Could not create canvas context for PDF page')
        }

        sliceContext.fillStyle = '#ffffff'
        sliceContext.fillRect(0, 0, sliceCanvas.width, sliceCanvas.height)
        sliceContext.drawImage(
          canvas,
          0,
          renderedHeightPx,
          canvas.width,
          sliceHeightPx,
          0,
          0,
          sliceCanvas.width,
          sliceCanvas.height,
        )

        const imageData = sliceCanvas.toDataURL('image/jpeg', 1)
        const sliceHeightMm = (sliceHeightPx * pageWidthMm) / canvas.width

        if (pageIndex > 0) {
          pdf.addPage()
        }

        pdf.addImage(imageData, 'JPEG', 0, 0, pageWidthMm, sliceHeightMm, undefined, 'FAST')

        renderedHeightPx += sliceHeightPx
        pageIndex += 1
      }

      pdf.save(`CV_${SITE.name.replace(/\s+/g, '_')}.pdf`)
    } catch (error) {
      console.error('Error generating PDF:', error)
    } finally {
      cvElement.style.cssText = previousCvStyle
      if (cvGridElement) {
        cvGridElement.style.cssText = previousGridStyle
      }

      if (previousDark) {
        setDark(true)
      }
      setIsGenerating(false)

      overlayTimeoutRef.current = window.setTimeout(() => {
        setShowPrintingOverlay(false)
        overlayTimeoutRef.current = null
      }, 1000)
    }
  }

  return (
    <>
      <div
        className={`${showPrintingOverlay ? 'pointer-events-none select-none' : ''} min-h-screen transition-colors duration-500`}
        style={{ background: pageBg }}
      >
        {/* ── Toolbar (hidden on print) ── */}
        <div className="no-print cv-toolbar sticky top-0 z-50 bg-slate-950/90 backdrop-blur border-b border-white/5 px-4 h-14 flex items-center justify-between">
          <Link to="/" className="text-indigo-400 font-bold tracking-widest text-sm">
            {SITE.initials}
          </Link>
          <div className="cv-toolbar-actions flex items-center gap-3">
            <button onClick={() => setDark(d => !d)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition-colors"
              title={dark ? 'Light mode' : 'Dark mode'}>
              {dark ? <SunIcon /> : <MoonIcon />}
            </button>
            <a href="/recommendations/carta - maggioli.pdf" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition-colors">
              <IcoDownload /> Recommendation Letters
            </a>
            <button onClick={generatePDF} disabled={isGenerating || showPrintingOverlay}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs transition-colors disabled:opacity-70 disabled:cursor-not-allowed">
              <IcoDownload /> {showPrintingOverlay ? 'Generating PDF...' : 'Download PDF'}
            </button>
          </div>
        </div>

        {/* ── CV Document ── */}
        <div ref={cvRef} className="cv-page" style={{
          width: '210mm', minHeight: '297mm',
          margin: '24px auto', background: t.bg,
          padding: '14mm', boxShadow: t.shadow,
          fontFamily: 'Georgia, Times New Roman, serif',
          fontSize: '10.5pt', color: t.text, lineHeight: '1.5',
          transition: 'background 0.5s, color 0.5s, box-shadow 0.5s',
        }}>

        {/* Header */}
        <header style={{
          display: 'flex', alignItems: 'flex-start', gap: '14px',
          paddingBottom: '10px', borderBottom: `2px solid ${t.accent}`,
          marginBottom: '12px', transition: 'border-color 0.5s',
        }}>
          <img src={SITE.photo} alt={SITE.name} style={{
            width: '68px', height: '68px', borderRadius: '50%',
            objectFit: 'cover', border: `2px solid ${t.accent}`,
            flexShrink: 0, transition: 'border-color 0.5s',
          }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '22pt', fontWeight: 700, color: t.accent, lineHeight: 1.1, fontFamily: 'sans-serif', transition: 'color 0.5s' }}>{SITE.name}</div>
            <div style={{ fontSize: '10.5pt', color: t.muted, fontFamily: 'sans-serif', marginTop: '2px', marginBottom: '7px', transition: 'color 0.5s' }}>{SITE.role.join(' · ')}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '6px 18px', fontSize: '8.5pt', color: t.muted, fontFamily: 'sans-serif', transition: 'color 0.5s' }}>
              <span>📍 <a href={SITE.locationUrl} target="_blank" rel="noopener noreferrer" style={{ color: t.accent, textDecoration: 'none', transition: 'color 0.5s' }}>{SITE.fullAddress}</a></span>
              <span>📞 <a href={SITE.phoneUrl} style={{ color: t.accent, textDecoration: 'none', transition: 'color 0.5s' }}>{SITE.phone}</a></span>
              <span>✉ <a href={`mailto:${SITE.email}`} style={{ color: t.accent, textDecoration: 'none', transition: 'color 0.5s' }}>{SITE.email}</a></span>
              <span>🌐 <a href={SITE.website} style={{ color: t.accent, textDecoration: 'none', transition: 'color 0.5s' }}>{SITE.website.replace('https://', '')}</a></span>
              <span><CvGithubIcon /><a href={SITE.social.github} style={{ color: t.accent, textDecoration: 'none', transition: 'color 0.5s' }}>{SITE.social.github.replace('https://', '')}</a></span>
              <span>🔗 <a href={SITE.social.linkedin} style={{ color: t.accent, textDecoration: 'none', transition: 'color 0.5s' }}>{SITE.social.linkedin.replace('https://', '')}</a></span>
            </div>
          </div>
        </header>

        {/* Two-column body */}
        <div className="cv-grid">

          {/* LEFT */}
          <div>
            {/* Profile */}
            <div className="section-no-break">
            <CvHeading t={t}>Profile</CvHeading>
            <p style={{ fontSize: '9.5pt', color: t.muted, lineHeight: 1.5, textAlign: 'justify', transition: 'color 0.5s' }}>{BIO}</p>
            </div>

            {/* Experience */}
            <CvHeading t={t}>Professional Experience</CvHeading>

            {/* Current job (first entry) */}
            {EXPERIENCE.length > 0 && (() => {
              const e = EXPERIENCE[0]
              return (
                <div className="cv-entry section-no-break" style={{ marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '4px' }}>
                    <span style={{ fontFamily: 'sans-serif', fontSize: '10pt', fontWeight: 700, transition: 'color 0.5s' }}>{e.role}</span>
                    <span style={{ fontFamily: 'sans-serif', fontSize: '8pt', color: t.muted, whiteSpace: 'nowrap' as const, transition: 'color 0.5s' }}>{e.period}</span>
                  </div>
                  <div style={{ fontFamily: 'sans-serif', fontSize: '9pt', color: t.accentLight, marginBottom: '3px', transition: 'color 0.5s' }}>{e.company}</div>
                  <div style={{ fontSize: '9.5pt', color: t.muted, lineHeight: 1.45, textAlign: 'justify', transition: 'color 0.5s' }}>{e.desc}{e.details ? ` ${e.details}` : ''}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '4px', marginTop: '4px' }}>
                    {e.tags.map(tag => <CvTag key={tag} label={tag} t={t} />)}
                  </div>
                </div>
              )
            })()}

            {/* Teaching (second position) */}
            <div className="cv-entry section-no-break" style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '4px' }}>
                <span style={{ fontFamily: 'sans-serif', fontSize: '10pt', fontWeight: 700, transition: 'color 0.5s' }}>{TEACHING.role} <span style={{ fontSize: '7.5pt', fontWeight: 400, fontStyle: 'italic', color: t.muted }}>(also teach)</span></span>
                <span style={{ fontFamily: 'sans-serif', fontSize: '8pt', color: t.muted, whiteSpace: 'nowrap' as const, transition: 'color 0.5s' }}>{TEACHING.period}</span>
              </div>
              <div style={{ fontFamily: 'sans-serif', fontSize: '9pt', color: t.accentLight, marginBottom: '3px', transition: 'color 0.5s' }}>{TEACHING.company}</div>
              <div style={{ fontSize: '9.5pt', color: t.muted, lineHeight: 1.45, textAlign: 'justify', transition: 'color 0.5s' }}>{TEACHING.desc}</div>
            </div>

            {/* Separator between current roles and previous */}
            <div style={{ borderTop: `1px dashed ${t.border}`, margin: '4px 0 14px', transition: 'border-color 0.5s' }} />

            {/* Previous jobs */}
            {EXPERIENCE.slice(1).map((e, i) => (
              <div key={i} className="cv-entry section-no-break" style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '4px' }}>
                  <span style={{ fontFamily: 'sans-serif', fontSize: '10pt', fontWeight: 700, transition: 'color 0.5s' }}>{e.role}</span>
                  <span style={{ fontFamily: 'sans-serif', fontSize: '8pt', color: t.muted, whiteSpace: 'nowrap' as const, transition: 'color 0.5s' }}>{e.period}</span>
                </div>
                <div style={{ fontFamily: 'sans-serif', fontSize: '9pt', color: t.accentLight, marginBottom: '3px', transition: 'color 0.5s' }}>{e.company}</div>
                <div style={{ fontSize: '9.5pt', color: t.muted, lineHeight: 1.45, textAlign: 'justify', transition: 'color 0.5s' }}>{e.desc}{e.details ? ` ${e.details}` : ''}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '4px', marginTop: '4px' }}>
                  {e.tags.map(tag => <CvTag key={tag} label={tag} t={t} />)}
                </div>
              </div>
            ))}

            {/* Open Source (commented out per request)
            <CvHeading t={t}>Open Source</CvHeading>
            */}

            {/* Volunteering (commented out per request)
            <CvHeading t={t}>Volunteering</CvHeading>
            */}
          </div>

          {/* RIGHT */}
          <div>
            {/* Specialized in */}
            <div className="section-no-break">
            <CvHeading t={t}>Specialized In</CvHeading>
            <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '4px', marginBottom: '4px' }}>
              {SPECIALIZATIONS.map(s => (
                <span key={s} style={{
                  fontFamily: 'sans-serif', fontSize: '7.5pt', fontWeight: 600,
                  background: dark ? 'rgba(129,140,248,0.2)' : '#e0e7ff',
                  color: t.accent, borderRadius: '3px', padding: '2px 8px',
                  transition: 'background 0.5s, color 0.5s',
                }}>
                  {s}
                </span>
              ))}
            </div>
            </div>

            {/* Skills */}
            <div className="section-no-break" data-pdf-break-before="skills">
            <CvHeading t={t}>Skills</CvHeading>
            {SKILL_GROUPS.map(g => (
              <div key={g.label} style={{ marginBottom: '6px' }}>
                <div style={{ fontFamily: 'sans-serif', fontSize: '8.5pt', fontWeight: 700, marginBottom: '3px', transition: 'color 0.5s' }}>{g.label}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '3px' }}>
                  {g.items.map(s => <CvTag key={s} label={s} t={t} />)}
                </div>
              </div>
            ))}
            </div>

            {/* Languages */}
            <div className="section-no-break">
            <CvHeading t={t}>Languages</CvHeading>
            {CV_LANGUAGES.map((l, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between', fontFamily: 'sans-serif',
                fontSize: '9pt', padding: '3px 0',
                borderBottom: i < CV_LANGUAGES.length - 1 ? `1px solid ${t.border}` : 'none',
                transition: 'border-color 0.5s, color 0.5s',
              }}>
                <span>{l.lang}</span>
                <span style={{ color: t.accent, fontSize: '8.5pt', transition: 'color 0.5s' }}>{l.level}</span>
              </div>
            ))}
            </div>

            {/* Education */}
            <div className="section-no-break">
            <CvHeading t={t}>Education</CvHeading>
            {CV_EDUCATION.map((e, i) => (
              <div key={i} style={{ marginBottom: '7px' }}>
                <div style={{ fontFamily: 'sans-serif', fontSize: '9pt', fontWeight: 600, transition: 'color 0.5s' }}>{e.degree}</div>
                <div style={{ fontFamily: 'sans-serif', fontSize: '8.5pt', color: t.muted, transition: 'color 0.5s' }}>{e.school} · {e.year}</div>
              </div>
            ))}
            </div>

            {/* Certifications */}
            <div className="section-no-break" data-pdf-break-before="certifications">
            <CvHeading t={t}>Certifications</CvHeading>
            {CV_CERTIFICATIONS.map((c, i) => (
              <div key={i} style={{ marginBottom: '6px' }}>
                <div style={{ fontFamily: 'sans-serif', fontSize: '9pt', fontWeight: 600, transition: 'color 0.5s' }}>{c.name}</div>
                <div style={{ fontFamily: 'sans-serif', fontSize: '8pt', color: t.muted, transition: 'color 0.5s' }}>{c.issuer} · {c.year}</div>
              </div>
            ))}
            </div>
          </div>

        </div>{/* /grid */}
        </div>{/* /cv-page */}

        <div className="no-print">
          <Footer />
        </div>
      </div>

      {showPrintingOverlay && (
        <div className="fixed inset-0 z-[120] bg-slate-950/45 backdrop-blur-md flex items-center justify-center">
          <p
            className="text-white text-3xl md:text-5xl font-bold tracking-[0.2em] uppercase drop-shadow-[0_0_20px_rgba(255,255,255,0.35)]"
            style={{ fontFamily: 'Audiowide, sans-serif' }}
          >
            Printing PDF...
          </p>
        </div>
      )}
    </>
  )
}
