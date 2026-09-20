/**
 * Turns the SPA shell into one real HTML document per route.
 *
 * Runs last in `npm run build`, after the client bundle is in dist/ and the SSR
 * bundle is in dist-ssr/. For each route in the sitemap it renders the React
 * tree to a string, drops it into #root, and swaps the <head> block for that
 * route's title, canonical, Open Graph tags and schema.org graph.
 *
 * Why bother, when Googlebot executes JavaScript: nothing else does. LinkedIn,
 * Slack, WhatsApp, X and the AI crawlers fetch the URL once and read whatever
 * came back — which, before this, was a <title> and an empty div.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')

/* pathToFileURL, not the bare path: on Windows an absolute path starts with a
   drive letter and Node's ESM loader reads "e:" as an unsupported URL scheme. */
const ssrBundle = pathToFileURL(join(`${dist}-ssr`, 'entry-server.js')).href
const {
  render, renderHeadTags, INDEXABLE_ROUTES, SEO_BLOCK_START, SEO_BLOCK_END,
} = await import(ssrBundle)

const template = readFileSync(join(dist, 'index.html'), 'utf8')

const ROOT_DIV = '<div id="root"></div>'
if (!template.includes(ROOT_DIV)) {
  throw new Error(
    `dist/index.html has no empty ${ROOT_DIV} to fill. It has most likely already been `
    + 'prerendered — this script consumes the shell it reads. Re-run `vite build` first.',
  )
}

const headBlock = new RegExp(`${SEO_BLOCK_START}[\\s\\S]*?${SEO_BLOCK_END}`)
if (!headBlock.test(template)) {
  throw new Error('dist/index.html is missing the seo markers; did the vite seo plugin run?')
}

for (const route of INDEXABLE_ROUTES) {
  const html = template
    .replace(headBlock, renderHeadTags(route))
    .replace(ROOT_DIV, `<div id="root">${render(route)}</div>`)

  /* '/' is dist/index.html; '/cv' is dist/cv/index.html, which Netlify serves
     for both /cv and /cv/ without touching the SPA fallback. */
  const outFile = route === '/'
    ? join(dist, 'index.html')
    : join(dist, route.replace(/^\//, ''), 'index.html')

  mkdirSync(dirname(outFile), { recursive: true })
  writeFileSync(outFile, html)

  const kb = (Buffer.byteLength(html) / 1024).toFixed(1)
  console.log(`prerendered ${route.padEnd(6)} -> ${outFile.slice(root.length + 1)} (${kb} kB)`)
}
