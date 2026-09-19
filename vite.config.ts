import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

/* A *.pdf dropped into public/downloads becomes the CV download (newest wins). With none there,
   /cv keeps rendering the PDF in the browser. Resolved once per build and inlined via `define`. */
function staticCvPdf(): string | null {
  const dir = 'public/downloads'
  let pdfs: string[] = []
  try {
    pdfs = readdirSync(dir).filter(f => /\.pdf$/i.test(f))
  } catch {
    /* no folder: fall back to the in-browser generator */
  }
  if (pdfs.length === 0) return null
  pdfs.sort((a, b) => statSync(join(dir, b)).mtimeMs - statSync(join(dir, a)).mtimeMs)
  return encodeURI(`/downloads/${pdfs[0]}`)
}

export default defineConfig({
  plugins: [react()],
  define: { __CV_STATIC_PDF__: JSON.stringify(staticCvPdf()) },
})