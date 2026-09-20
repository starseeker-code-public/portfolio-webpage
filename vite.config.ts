import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import {
  renderHeadTags, renderRobots, renderSitemap, render404,
  SEO_BLOCK_START, SEO_BLOCK_END,
} from './src/data/seo'

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

/* Bakes the crawler-facing <head> into index.html and emits robots.txt and
   sitemap.xml, all from src/data/seo.ts. Those two files have to be real files
   in dist/: the SPA rewrite in netlify.toml would otherwise answer /robots.txt
   with the React shell, and a robots.txt served as text/html is a robots.txt
   Google cannot read. Netlify serves a matching static file ahead of any
   redirect rule, so their mere existence is the fix. */
function seo(): Plugin {
  /* The SSR pass (`vite build --ssr`) produces no index.html and needs no
     robots.txt; without this guard it would litter dist-ssr/ with both. */
  let isSsrBuild = false

  return {
    name: 'portfolio-seo',
    /* 'pre' so the marker is replaced before Vite injects the bundle tags. */
    enforce: 'pre',
    configResolved(config) {
      isSsrBuild = Boolean(config.build.ssr)
    },
    transformIndexHtml(html) {
      const block = new RegExp(`${SEO_BLOCK_START}[\\s\\S]*?${SEO_BLOCK_END}`)
      if (!block.test(html)) {
        throw new Error(`index.html is missing the ${SEO_BLOCK_START} … ${SEO_BLOCK_END} markers`)
      }
      return html.replace(block, renderHeadTags('/'))
    },
    generateBundle() {
      if (isSsrBuild) return
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: renderRobots() })
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: renderSitemap() })
      this.emitFile({ type: 'asset', fileName: '404.html', source: render404() })
    },
  }
}

export default defineConfig({
  plugins: [react(), seo()],
  define: { __CV_STATIC_PDF__: JSON.stringify(staticCvPdf()) },
})
